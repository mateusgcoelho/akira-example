"use client";

import { authActions } from "@/_shared/actions";
import { Button } from "@/_shared/components/ui/button";
import { Input } from "@/_shared/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SignInFormData, signInSchema } from "./schemas/signInSchema";

export default function SignInPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await authActions.signIn(data);
      router.replace("/dashboard");
      toast.success("Login realizado com sucesso!");
    } catch {
      toast.error("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Fazer login</h2>
          <p className="text-sm text-muted-foreground">
            Entre com suas credenciais
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Digite seu email"
                disabled={isSubmitting}
                className={cn(errors.email && "border-destructive")}
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
                className={cn(errors.password && "border-destructive")}
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
            <Link
              href="/sign-up"
              className="font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Criar conta
            </Link>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              loading={isSubmitting}
            >
              <span>Acessar</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
