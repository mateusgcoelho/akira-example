"use client";

import { authActions } from "@/_shared/actions";
import { Button } from "@/_shared/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Header({
  user,
}: {
  user: { name: string; email: string };
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authActions.signOut();
      router.push("/");
      toast.success("Logout realizado com sucesso!");
    } catch {
      toast.error("Erro ao sair. Tente novamente.");
    }
  };

  return (
    <header>
      <nav className="w-full h-16 flex items-center justify-between px-4 border-b border-border bg-background">
        <h1 className="text-xl font-bold cursor-pointer">Exemplo Código</h1>

        <div className="flex items-center gap-6">
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>

          <Button onClick={handleSignOut} variant="destructive" size="sm">
            Sair
          </Button>
        </div>
      </nav>
    </header>
  );
}
