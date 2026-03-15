import React, { useMemo } from "react";
import { imagekitConfig, DELIVERY_DEFAULTS } from "@/lib/imagekit.config";
import { ImageKitContext } from "@/context/ImageKitContext";
import type { ImageKitContextValue } from "@/context/ImageKitContext";
import type { ImageKitConfig } from "@/types/imagekit.types";

interface ImageKitProviderProps {
  children: React.ReactNode;
  config?: Partial<ImageKitConfig>;
}

// Helper to check if a value is a plain object literal (not class instance, Date, etc.)
function isPlainObject(value: unknown): boolean {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

function deepMerge<T extends Record<string, unknown>, U extends Record<string, unknown>>(
  base: T,
  override: U,
): T & U {
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;
    const baseValue = result[key];
    if (isPlainObject(baseValue) && isPlainObject(value)) {
      result[key] = deepMerge(
        baseValue as Record<string, unknown>,
        value as Record<string, unknown>,
      );
    } else {
      result[key] = value;
    }
  }
  return result as T & U;
}

export const ImageKitProvider: React.FC<ImageKitProviderProps> = ({
  children,
  config: configOverride,
}) => {
  // Serialise the override to a stable string so useMemo can detect changes
  // without refs or render-phase side effects. ImageKitConfig only contains
  // plain serialisable string values, so JSON.stringify is safe here.
  const configKey = configOverride ? JSON.stringify(configOverride) : null;

  const mergedConfig = useMemo((): Readonly<ImageKitConfig> => {
    if (!configOverride) return imagekitConfig;
    return deepMerge(
      imagekitConfig as Record<string, unknown>,
      configOverride as Record<string, unknown>,
    ) as unknown as ImageKitConfig;
    // configKey is the stable serialised version of configOverride used as dep
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configKey]);

  const value = useMemo<ImageKitContextValue>(
    () => ({
      config: mergedConfig,
      defaults: DELIVERY_DEFAULTS,
    }),
    [mergedConfig],
  );

  return <ImageKitContext.Provider value={value}>{children}</ImageKitContext.Provider>;
};
