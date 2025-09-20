"use client";

import { Button } from "@/_shared/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFoundError() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">
            Página Não Encontrada
          </h2>
          <p className="text-primary">
            A página que você está procurando não existe.
          </p>
        </div>
        <Button onClick={() => router.replace("/")}>
          Voltar para a página inicial
        </Button>
      </div>
    </div>
  );
}
