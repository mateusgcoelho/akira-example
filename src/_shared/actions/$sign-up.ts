"use server";

import { auth } from "@/lib/better-auth";

export const signUp = async ({
  name,
  email,
  password,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
      callbackURL: "/dashboard/tasks",
    },
  });

  return result;
};
