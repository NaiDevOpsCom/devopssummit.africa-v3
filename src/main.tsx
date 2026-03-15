import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ImageKitProvider } from "@/components/ImageKitProvider";
import App from "./App.tsx";
import "./index.css";
import { validateEnv } from "@/config/validateEnv";
import * as Env from "@/config/env";
import posthog from "posthog-js";
import { PostHogProvider } from "@posthog/react";

// Validate environment variables at startup
validateEnv();

if (Env.POSTHOG_KEY) {
  posthog.init(Env.POSTHOG_KEY, {
    api_host: Env.POSTHOG_HOST,
  });
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <PostHogProvider client={posthog}>
      <ImageKitProvider>
        <App />
      </ImageKitProvider>
    </PostHogProvider>
  </HelmetProvider>,
);
