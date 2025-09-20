import { auth } from "@/lib/better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignInPage from "../features/SignIn/page";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <SignInPage />;
  }

  return redirect("/dashboard/tasks");
}
