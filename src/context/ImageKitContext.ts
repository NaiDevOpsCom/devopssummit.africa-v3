import { createContext, useContext } from "react";
import type { ImageKitConfig } from "@/types/imagekit.types";
import { DELIVERY_DEFAULTS } from "@/lib/imagekit.config";

export interface ImageKitContextValue {
  config: ImageKitConfig;
  defaults: typeof DELIVERY_DEFAULTS;
}

export const ImageKitContext = createContext<ImageKitContextValue | null>(null);

export function useImageKitContext(): ImageKitContextValue {
  const ctx = useContext(ImageKitContext);
  if (!ctx) {
    throw new Error("[ImageKit] useImageKitContext must be used within an ImageKitProvider.");
  }
  return ctx;
}
