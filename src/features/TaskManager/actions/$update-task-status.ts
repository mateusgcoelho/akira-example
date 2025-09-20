"use server";

import { UpdateTaskStatusDTO } from "@/_shared/dtos/update-task.dto";
import { auth } from "@/lib/better-auth";
import { posthogServerClient } from "@/lib/posthog-server";
import { prismaClient } from "@/lib/prisma";
import { headers } from "next/headers";

export async function updateTaskStatus(tasks: UpdateTaskStatusDTO[]) {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });
  if (!user) throw new Error("usuário não autenticado");

  await prismaClient.$transaction(async (prisma) => {
    for (const task of tasks) {
      await prisma.task.update({
        where: {
          id: task.id,
        },
        data: {
          status: task.status,
        },
      });
    }
  });

  for (const task of tasks) {
    if (task.status != "DONE") {
      continue;
    }

    posthogServerClient.capture({
      event: "task_completed",
      distinctId: user.email,
      properties: {
        task_id: task.id,
        updated_at: new Date(),
      },
    });
  }
}
