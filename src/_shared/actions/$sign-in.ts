"use server";

import { auth } from "@/lib/better-auth";

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: "/dashboard/tasks",
    },
  });

  return result;
};
