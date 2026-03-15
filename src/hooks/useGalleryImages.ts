import { useMemo } from "react";

// Generated at build time by scripts/fetch-gallery.ts
// Falls back to empty object if file doesn't exist yet
let generated: Record<string, string[]> = {};
try {
  generated = (await import("../data/gallery.generated.json")).default;
} catch {
  // File doesn't exist yet — run `npm run fetch-gallery` to generate it
}

export function useGalleryImages(
  year: string,
  fallback: string[],
): {
  images: string[];
  source: "imagekit" | "fallback";
} {
  return useMemo(() => {
    const fetched = generated[year];
    if (fetched && fetched.length > 0) {
      return { images: fetched, source: "imagekit" };
    }
    return { images: fallback, source: "fallback" };
  }, [year, fallback]);
}
