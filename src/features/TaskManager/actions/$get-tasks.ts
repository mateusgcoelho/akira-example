"use server";

import { auth } from "@/lib/better-auth";
import { prismaClient } from "@/lib/prisma";
import { headers } from "next/headers";

export async function getTasks() {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });
  if (!user) throw new Error("usuário não autenticado");

  const tasks = await prismaClient.task.findMany({
    include: { createdBy: true },
    orderBy: { createdAt: "desc" },
  });

  tasks.sort((a, b) => {
    const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return tasks;
}
