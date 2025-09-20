import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Titulo é obrigatório"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).catch("MEDIUM"),
  expiresAt: z.date("Data de expiração inválida"),
});

export type TaskFormData = z.infer<typeof taskSchema>;
