import { betterAuthConfig } from "@/config/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
import { prismaClient } from "./prisma";

export const authClient = createAuthClient({
  baseURL: betterAuthConfig.baseURL,
});

export const auth = betterAuth({
  database: prismaAdapter(prismaClient, {
    provider: "postgresql",
    usePlural: true,
    debugLogs: false,
  }),
  baseURL: betterAuthConfig.baseURL,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
