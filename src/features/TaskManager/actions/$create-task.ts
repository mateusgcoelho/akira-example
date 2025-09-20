"use server";

import { CreateTaskDTO } from "@/_shared/dtos/create-task.dto";
import { auth } from "@/lib/better-auth";
import { posthogServerClient } from "@/lib/posthog-server";
import { prismaClient } from "@/lib/prisma";
import { headers } from "next/headers";

export async function createTask(data: CreateTaskDTO) {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });
  if (!user) throw new Error("usuário não autenticado");

  const task = await prismaClient.task.create({
    include: { createdBy: true },
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      createdBy: { connect: { id: user.id } },
      expiresAt: data.expiresAt,
    },
  });

  posthogServerClient.capture({
    event: "task_created",
    distinctId: user.email,
    properties: {
      task_id: task.id,
      title: task.title,
      priority: task.priority,
      status: task.status,
      created_at: task.createdAt,
    },
  });

  return task;
}
