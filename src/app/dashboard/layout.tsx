import Header from "@/_components/header";
import { auth } from "@/lib/better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentHeaders = await headers();
  const session = await auth.api.getSession({
    headers: currentHeaders,
  });

  if (!session) {
    return redirect("/");
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header user={user} />
      <section className="w-full flex-1 p-4 flex flex-col">{children}</section>
    </main>
  );
}
