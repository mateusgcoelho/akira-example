"use client";

import { authActions } from "@/_shared/actions";
import { Button } from "@/_shared/components/ui/button";
import { Input } from "@/_shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SignUpFormData, signUpSchema } from "./schemas/signUpSchema";

export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await authActions.signUp(data);
      router.replace("/");
      toast.success("Cadastro realizado com sucesso!");
    } catch {
      toast.error("Erro ao fazer cadastro. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Criar conta</h2>
          <p className="text-sm text-muted-foreground">
            Já possui uma conta?{" "}
            <Link
              href="/"
              className="font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Entrar
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                {...register("name")}
                id="name"
                type="text"
                placeholder="Digite seu nome"
                disabled={isSubmitting}
                className={errors.name ? "border-destructive" : ""}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Digite seu email"
                disabled={isSubmitting}
                className={errors.email ? "border-destructive" : ""}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Digite sua senha"
                disabled={isSubmitting}
                className={errors.password ? "border-destructive" : ""}
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              loading={isSubmitting}
            >
              <span>Cadastrar</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
