import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ImageKitProvider } from "@/components/ImageKitProvider";
import App from "./App.tsx";
import "./index.css";
import { validateEnv } from "@/config/validateEnv";
// Validate environment variables at startup
validateEnv();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ImageKitProvider>
      <App />
    </ImageKitProvider>
  </HelmetProvider>,
);
