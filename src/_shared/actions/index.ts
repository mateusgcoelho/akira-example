import { getSession } from "./$get-session";
import { signIn } from "./$sign-in";
import { signOut } from "./$sign-out";
import { signUp } from "./$sign-up";

export const authActions = {
  signIn,
  signOut,
  signUp,
  getSession,
};
