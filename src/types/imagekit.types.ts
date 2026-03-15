import type React from "react";

export type ImageKitFormat = "auto" | "webp" | "avif" | "jpg" | "png";

export type ImageKitFocus =
  | "auto"
  | "face"
  | "center"
  | "top"
  | "left"
  | "bottom"
  | "right"
  | "top_left"
  | "top_right"
  | "bottom_left"
  | "bottom_right";

export type ImageKitCropMode =
  | "resize"
  | "force"
  | "at_max"
  | "at_min"
  | "maintain_ratio"
  | "pad_resize"
  | "extract";

export interface ImageKitTransformation {
  width?: number;
  height?: number;
  aspectRatio?: string;
  cropMode?: ImageKitCropMode;
  quality?: number;
  format?: ImageKitFormat;
  progressive?: boolean;
  focus?: ImageKitFocus;
  x?: number;
  y?: number;
  blur?: number;
  grayscale?: boolean;
  rotate?: 0 | 90 | 180 | 270;
  flip?: "h" | "v" | "hv";
  contrast?: number;
  brightness?: number;
  saturation?: number;
  sharpen?: number;
  border?: string;
  radius?: number | "max";
  backgroundColor?: string;
  dpr?: number;
  defaultImage?: string;
  named?: string;
  raw?: string;
}

export interface IKImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  path: string;
  transformation?: ImageKitTransformation | ImageKitTransformation[];
  lazy?: boolean;
  lqip?: {
    active: boolean;
    quality?: number;
    blur?: number;
  };
  srcSetBreakpoints?: readonly number[];
  alt: string;
}

export interface ImageKitConfig {
  urlEndpoint: string;
  publicKey?: string;
  authenticationEndpoint?: string;
}

export interface UseImageKitReturn {
  buildUrl: (
    path: string,
    transformation?: ImageKitTransformation | ImageKitTransformation[],
  ) => string;
  buildSrcSet: (
    path: string,
    widths?: readonly number[],
    transformation?: ImageKitTransformation,
  ) => string;
  lqip: (path: string, quality?: number, blur?: number) => string;
  avatar: (path: string, size?: number) => string;
  ogImage: (path: string) => string;
  defaults: {
    format: ImageKitFormat;
    quality: number;
    progressive: boolean;
    lqip: { active: boolean; quality: number; blur: number };
    srcSetBreakpoints: readonly number[];
  };
}
