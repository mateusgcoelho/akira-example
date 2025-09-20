import { authActions } from "@/_shared/actions";
import SignUpPage from "@/features/SignUp/page";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await authActions.getSession();
  if (session) {
    return redirect("/dashboard/tasks");
  }

  return <SignUpPage />;
}
