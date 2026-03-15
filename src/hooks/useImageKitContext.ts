import { useContext } from "react";
import { ImageKitContext } from "@/context/ImageKitContext";
import { imagekitConfig, DELIVERY_DEFAULTS } from "@/lib/imagekit.config";
import type { ImageKitContextValue } from "@/context/ImageKitContext";

const STABLE_IMAGEKIT_CONTEXT: ImageKitContextValue = {
  config: imagekitConfig,
  defaults: DELIVERY_DEFAULTS,
};

/**
 * Access the nearest ImageKit context value.
 * Returns a fallback context with default ImageKit configuration if used outside
 * an ImageKitProvider. In development, a warning is logged if context is missing.
 */
export function useImageKitContext(): ImageKitContextValue {
  const ctx = useContext(ImageKitContext);

  if (!ctx) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[ImageKit] useImageKitContext was used outside an ImageKitProvider. " +
          "Using STABLE_IMAGEKIT_CONTEXT as fallback. Consider wrapping your app with ImageKitProvider.",
      );
    }
    return STABLE_IMAGEKIT_CONTEXT;
  }

  return ctx;
}
