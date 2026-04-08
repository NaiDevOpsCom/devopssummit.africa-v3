import { useMemo } from "react";

type GalleryImagesByYear = Record<string, string[]>;

// Generated at build time by scripts/fetch-gallery.ts.
// import.meta.glob keeps the import optional without using top-level await.
const galleryModules = import.meta.glob<{ default: GalleryImagesByYear }>(
  "../data/gallery.generated.json",
  { eager: true },
);
const generated =
  galleryModules["../data/gallery.generated.json"]?.default ?? ({} satisfies GalleryImagesByYear);

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
