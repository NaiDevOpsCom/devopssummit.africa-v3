import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ImageKitProvider } from "@/components/ImageKitProvider";
import App from "./App.tsx";
import "./index.css";
import { validateEnv } from "@/config/validateEnv";
import * as Env from "@/config/env";

// Validate environment variables at startup
validateEnv();

if (Env.POSTHOG_KEY) {
  // Defer analytics initialization so it never blocks FCP/LCP
  setTimeout(() => {
    import("posthog-js").then((mod) => {
      const posthog = mod.default;
      posthog.init(Env.POSTHOG_KEY, {
        api_host: Env.POSTHOG_HOST,
      });
    });
  }, 2500);
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ImageKitProvider>
      <App />
    </ImageKitProvider>
  </HelmetProvider>,
);
