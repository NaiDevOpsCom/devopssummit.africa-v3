const CLOUDINARY_UPLOAD_SEGMENT = "/image/upload/";

type CloudinaryTransformOptions = {
  width?: number;
  height?: number;
  aspectRatio?: "1:1" | "4:3" | "16:9";
  crop?: "fill" | "fit" | "limit" | "thumb";
  gravity?: "auto" | "face" | "faces" | "center";
  quality?: "auto" | "auto:eco" | "auto:good" | number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
};

const DEFAULT_WIDTHS = [320, 480, 640, 768, 960, 1200, 1440] as const;

function serializeTransform({
  width,
  height,
  aspectRatio,
  crop,
  gravity,
  quality = "auto:eco",
  format = "auto",
}: CloudinaryTransformOptions): string {
  return [
    format && `f_${format}`,
    quality && `q_${quality}`,
    width && `w_${width}`,
    height && `h_${height}`,
    aspectRatio && `ar_${aspectRatio}`,
    crop && `c_${crop}`,
    gravity && `g_${gravity}`,
  ]
    .filter(Boolean)
    .join(",");
}

export function buildCloudinaryUrl(
  src: string,
  transform: CloudinaryTransformOptions = {},
): string {
  if (!src.includes(CLOUDINARY_UPLOAD_SEGMENT)) return src;

  const index = src.indexOf(CLOUDINARY_UPLOAD_SEGMENT);

  const prefix = src.slice(0, index);
  const suffix = src.slice(index + CLOUDINARY_UPLOAD_SEGMENT.length);
  const serialized = serializeTransform(transform);
  if (!serialized) return src;

  const cleanedSuffix = suffix.replace(/^(?:[a-z]_[^/]+,?)+\//, "");
  return `${prefix}${CLOUDINARY_UPLOAD_SEGMENT}${serialized}/${cleanedSuffix}`;
}

export function buildCloudinarySrcSet(
  src: string,
  options: CloudinaryTransformOptions = {},
  widths: readonly number[] = DEFAULT_WIDTHS,
): string {
  return widths
    .map((width) => `${buildCloudinaryUrl(src, { ...options, width })} ${width}w`)
    .join(", ");
}
