export const posthogConfig = {
  apiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
};
