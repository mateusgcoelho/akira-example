import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email("Formato de email inválido").min(1, "Email é obrigatório"),

  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
