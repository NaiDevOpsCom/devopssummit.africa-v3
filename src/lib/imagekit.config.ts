import type { ImageKitConfig } from "@/types/imagekit.types";
import { IMAGEKIT_URL_ENDPOINT, IMAGEKIT_PUBLIC_KEY } from "@/config/env";

/**
 * ImageKit configuration derived from centralized environment variables.
 * These are validated at startup in main.tsx.
 */
export const imagekitConfig: Readonly<ImageKitConfig> = Object.freeze({
  urlEndpoint: IMAGEKIT_URL_ENDPOINT.replace(/\/$/, ""), // Ensure no trailing slash
  publicKey: IMAGEKIT_PUBLIC_KEY,
});

/**
 * Helper to get config (kept for backward compatibility).
 */
export function getImageKitConfig(): Readonly<ImageKitConfig> {
  return imagekitConfig;
}

export const DELIVERY_DEFAULTS = {
  format: "auto",
  quality: 80,
  progressive: true,
  lqip: {
    active: true,
    quality: 20,
    blur: 6,
  },
  srcSetBreakpoints: [320, 480, 768, 1024, 1280, 1920],
} as const;
