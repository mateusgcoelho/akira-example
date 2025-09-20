import { posthogConfig } from "@/config/posthog";
import { PostHog } from "posthog-node";

export const posthogServerClient = new PostHog(posthogConfig.apiKey, {
  host: posthogConfig.host,
  flushAt: 1,
  flushInterval: 0,
});
