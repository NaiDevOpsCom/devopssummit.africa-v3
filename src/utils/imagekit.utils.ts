import { imagekitConfig, DELIVERY_DEFAULTS } from "@/lib/imagekit.config";
import type { IKFolderPath } from "@/lib/imagekit.paths";
import { ikPath } from "@/lib/imagekit.paths";
import type { ImageKitTransformation } from "@/types/imagekit.types";
import { IS_DEVELOPMENT } from "@/config/env";

export const IMAGEKIT_ENDPOINT = imagekitConfig.urlEndpoint;

const PARAM_MAP: Record<string, string> = {
  width: "w",
  height: "h",
  aspectRatio: "ar",
  cropMode: "c",
  quality: "q",
  format: "f",
  progressive: "pr",
  focus: "fo",
  x: "x",
  y: "y",
  blur: "bl",
  grayscale: "e-grayscale",
  rotate: "rt",
  flip: "fl",
  contrast: "e-contrast",
  brightness: "e-brightness",
  saturation: "e-saturation",
  sharpen: "e-sharpen",
  border: "b",
  radius: "r",
  backgroundColor: "bg",
  dpr: "dpr",
  defaultImage: "di",
  named: "n",
};

function serialise(t: ImageKitTransformation): string {
  if (t.raw) return t.raw;
  const parts: string[] = [];
  for (const [key, value] of Object.entries(t)) {
    if (key === "raw" || value == null) continue;
    const param = PARAM_MAP[key];
    if (!param) {
      if (IS_DEVELOPMENT) {
        console.warn(`[ImageKit] Unknown transformation key: "${key}".`);
      }
      continue;
    }
    if (typeof value === "boolean") {
      if (value) parts.push(param);
    } else {
      parts.push(`${param}-${value}`);
    }
  }
  return parts.join(",");
}

export function buildImageKitUrl(
  path: string,
  transformation?: ImageKitTransformation | ImageKitTransformation[],
): string {
  const normPath = path.startsWith("/") ? path : `/${path}`;
  if (!transformation) return `${IMAGEKIT_ENDPOINT}${normPath}`;
  const transformations = Array.isArray(transformation) ? transformation : [transformation];
  const trString = transformations.map(serialise).filter(Boolean).join(":");
  if (!trString) return `${IMAGEKIT_ENDPOINT}${normPath}`;
  return `${IMAGEKIT_ENDPOINT}/tr:${trString}${normPath}`;
}

export function buildSrcSet(
  path: string,
  widths: readonly number[] = [...DELIVERY_DEFAULTS.srcSetBreakpoints],
  baseTransformation?: ImageKitTransformation,
): string {
  return widths
    .map((w) => {
      const url = buildImageKitUrl(path, {
        ...baseTransformation,
        width: w,
      });
      return `${url} ${w}w`;
    })
    .join(", ");
}

export function buildLqipUrl(
  path: string,
  quality: number = DELIVERY_DEFAULTS.lqip.quality,
  blur: number = DELIVERY_DEFAULTS.lqip.blur,
): string {
  return buildImageKitUrl(path, {
    width: 20,
    quality,
    blur,
    format: "auto",
  });
}

export function buildAvatarUrl(path: string, size: number = 40): string {
  return buildImageKitUrl(path, {
    width: size,
    height: size,
    cropMode: "maintain_ratio",
    focus: "face",
    format: "auto",
    radius: "max",
    quality: 85,
  });
}

export function buildOgImageUrl(path: string): string {
  return buildImageKitUrl(path, {
    width: 1200,
    height: 630,
    cropMode: "maintain_ratio",
    focus: "auto",
    quality: 90,
    format: "jpg",
  });
}

export interface FolderScope {
  readonly folder: IKFolderPath;
  url: (
    filename: string,
    transformation?: ImageKitTransformation | ImageKitTransformation[],
  ) => string;
  srcset: (
    filename: string,
    widths?: readonly number[],
    baseTransformation?: ImageKitTransformation,
  ) => string;
  lqip: (filename: string, quality?: number, blur?: number) => string;
  avatar: (filename: string, size?: number) => string;
  og: (filename: string) => string;
  path: (filename: string) => string;
}

export function createFolderScope(folder: IKFolderPath): FolderScope {
  return {
    folder,
    path: (filename: string) => ikPath(folder, filename),
    url: (filename, transformation) => buildImageKitUrl(ikPath(folder, filename), transformation),
    srcset: (filename, widths, baseTransformation) =>
      buildSrcSet(ikPath(folder, filename), widths, baseTransformation),
    lqip: (filename, quality, blur) => buildLqipUrl(ikPath(folder, filename), quality, blur),
    avatar: (filename, size) => buildAvatarUrl(ikPath(folder, filename), size),
    og: (filename) => buildOgImageUrl(ikPath(folder, filename)),
  };
}
