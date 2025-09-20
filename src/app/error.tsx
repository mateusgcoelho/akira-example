"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="flex items-center justify-center min-h-screen bg-destructive/10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive">
            Algo deu errado!
          </h2>
          <p className="text-destructive mt-2">
            Ocorreu um erro inesperado. Tente novamente.
          </p>
          <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 bg-destructive text-white rounded-lg"
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}
