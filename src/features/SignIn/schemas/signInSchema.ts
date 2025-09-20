import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Formato de email inválido").min(1, "Email é obrigatório"),

  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type SignInFormData = z.infer<typeof signInSchema>;
