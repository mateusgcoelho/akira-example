"use server";

import { auth } from "@/lib/better-auth";
import { posthogServerClient } from "@/lib/posthog-server";
import { prismaClient } from "@/lib/prisma";
import { headers } from "next/headers";

export async function deleteTask(id: string) {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });
  if (!user) throw new Error("usuário não autenticado");

  await prismaClient.task.delete({
    where: {
      id,
    },
  });

  posthogServerClient.capture({
    event: "task_deleted",
    distinctId: user.email,
    properties: {
      task_id: id,
      deleted_at: new Date(),
    },
  });
}
