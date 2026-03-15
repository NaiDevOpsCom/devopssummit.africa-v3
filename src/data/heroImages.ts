/**
 * Centralized list of hero and background images from ImageKit ads2025 folder.
 * These are used across the application for section backgrounds.
 */
export const ADS2025_HERO_IMAGES = [
  "https://ik.imagekit.io/nairobidevops/ads2025/IMG_6554.JPG",
  "https://ik.imagekit.io/nairobidevops/ads2025/IMG_6738.JPG",
  "https://ik.imagekit.io/nairobidevops/ads2025/IMG_6619.JPG",
  "https://ik.imagekit.io/nairobidevops/ads2025/IMG_6615.JPG",
  "https://ik.imagekit.io/nairobidevops/ads2025/IMG_6584.JPG",
] as const;

export type HeroImage = (typeof ADS2025_HERO_IMAGES)[number];

export const FALLBACK_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
