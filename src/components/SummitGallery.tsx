import React, { useState, useRef, useCallback } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FixedSizeGrid as Grid, type GridChildComponentProps } from "react-window";
import { AutoSizer } from "react-virtualized-auto-sizer";
import { useGalleryImages } from "@/hooks/useGalleryImages";
import { useLazyImage } from "@/hooks/useLazyImage";
import { summitGallery as fallbackGallery } from "@/data/summitExperience";
import { IS_DEVELOPMENT } from "@/config/env";

// Module-level shuffle seed to ensure render purity while allowing change-on-refresh
const SHUFFLE_SEED = Math.random();

/**
 * Deterministic PRNG (Mulberry32)
 */
function createPRNG(seed: number) {
  let s = seed;
  return function () {
    let t = (s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Seeded Fisher-Yates Shuffle
 */
function seededShuffle<T>(array: T[], seed: number): T[] {
  const result = [...array];
  const random = createPRNG(seed * 1000000); // Scale seed for mulberry32
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ─── GalleryThumb ─────────────────────────────────────────────────────────────
interface GalleryThumbProps {
  src: string;
  index: number;
  total: number;
  onClick: () => void;
  btnRef: (el: HTMLButtonElement | null) => void;
}

const GalleryThumb: React.FC<GalleryThumbProps> = ({ src, index, total, onClick, btnRef }) => {
  const {
    ref: observerRef,
    isVisible,
    isLoaded,
    hasError,
    onLoad,
    onError,
  } = useLazyImage({
    disabled: index < 3,
  });

  // Combine btnRef and observerRef
  const setRefs = useCallback(
    (el: HTMLButtonElement | null) => {
      btnRef(el);
      observerRef(el); // Attach observer to the button wrapper
    },
    [btnRef, observerRef],
  );

  return (
    <button
      ref={setRefs}
      aria-label={`Open photo ${index + 1} of ${total}`}
      onClick={onClick}
      className="group relative aspect-[3/2] rounded-xl overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {!isLoaded && !hasError && <div className="absolute inset-0 bg-muted animate-pulse" />}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xs select-none">
          Failed to load
        </div>
      )}

      {isVisible && !hasError && (
        <img
          src={src}
          alt={`Summit ${index + 1} of ${total}`}
          onLoad={onLoad}
          onError={onError}
          className={`w-full h-full object-cover transition-all duration-300
            group-hover:scale-105
            ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      )}

      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
    </button>
  );
};

// ─── SummitGallery ────────────────────────────────────────────────────────────
interface SummitGalleryProps {
  year: string;
}

const SummitGallery: React.FC<SummitGalleryProps> = ({ year }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [fullGalleryIndex, setFullGalleryIndex] = useState<number | null>(null);

  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Correct data source: summitGallery from summitExperience as fallback
  const fallback = (fallbackGallery[Number(year)] || []).map((img) => img.src);
  /**
   * Data Source Logic:
   * 1. Check generated gallery data (from ImageKit) for the given year.
   * 2. Fall back to local summitGallery data if ImageKit data is missing.
   */
  const { images, source } = useGalleryImages(year, fallback);

  /**
   * Deterministic Preview Logic:
   * We show a 3x3 grid (9 images). We use a seeded shuffle to ensure that
   * while the preview feels "random" to the user, it remains pure and consistent
   * for the given build/refresh, avoiding React hydration mismatch or pure-render violations.
   */
  const previewImages = React.useMemo(() => {
    if (!images.length) return [];
    return seededShuffle(images, SHUFFLE_SEED).slice(0, 9);
  }, [images]);

  // State reset handled by key prop in parent

  const memoizedItemData = React.useMemo(
    () => ({ images, setFullGalleryIndex }),
    [images, setFullGalleryIndex],
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        const idx = lightboxIndex;
        setLightboxIndex(null);
        setTimeout(() => triggerRefs.current[idx ?? 0]?.focus(), 50);
      }
    },
    [lightboxIndex],
  );

  const handleKeyDown = useCallback(
    (
      e: React.KeyboardEvent,
      list: string[],
      setter: React.Dispatch<React.SetStateAction<number | null>>,
      current: number | null,
    ) => {
      if (current === null) return;
      if (e.key === "ArrowRight") setter((i) => Math.min(list.length - 1, (i ?? 0) + 1));
      if (e.key === "ArrowLeft") setter((i) => Math.max(0, (i ?? 0) - 1));
    },
    [],
  );

  // Removed internal year tab navigation (handled by parent Tabs)

  return (
    <section>
      <SectionHeader title="Photo Gallery" subtitle="Moments captured from the summit." />

      <div className="max-w-5xl mx-auto">
        {source === "fallback" && images.length > 0 && IS_DEVELOPMENT && (
          <p className="text-xs text-amber-500 mb-3 text-right">
            ⚠ Using fallback images — run{" "}
            <code className="bg-muted px-1 rounded">npm run fetch-gallery</code> to load from
            ImageKit
          </p>
        )}

        <section aria-label={`${year} Summit Gallery Preview`}>
          {images.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              No photos available for {year} yet.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {previewImages.map((src, i) => (
                  <GalleryThumb
                    key={`${year}-preview-${i}`}
                    src={src}
                    index={i}
                    total={previewImages.length}
                    onClick={() => setLightboxIndex(i)}
                    btnRef={(el) => {
                      triggerRefs.current[i] = el;
                    }}
                  />
                ))}
              </div>

              {images.length > 9 && source === "imagekit" && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setIsViewAllOpen(true)}
                    className="px-8 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20"
                  >
                    View All Photos
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Preview Lightbox */}
        <Dialog open={lightboxIndex !== null} onOpenChange={handleOpenChange}>
          <DialogContent
            className="max-w-4xl p-0 overflow-hidden bg-foreground/95"
            onKeyDown={(e) => handleKeyDown(e, previewImages, setLightboxIndex, lightboxIndex)}
          >
            <DialogHeader className="sr-only">
              <DialogTitle>
                Preview
                {lightboxIndex !== null ? `${lightboxIndex + 1} of ${previewImages.length}` : ""}
              </DialogTitle>
            </DialogHeader>

            {lightboxIndex !== null && (
              <>
                <img
                  src={previewImages[lightboxIndex]}
                  alt={`Summit ${lightboxIndex + 1} of ${previewImages.length}, enlarged`}
                  className="w-full h-auto"
                />

                <div className="flex items-center justify-between px-4 py-2 bg-foreground/80">
                  <button
                    onClick={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
                    disabled={lightboxIndex === 0}
                    aria-label="Previous photo"
                    className="text-background text-sm disabled:opacity-30 hover:opacity-80 transition-opacity"
                  >
                    ← Prev
                  </button>

                  <span className="text-background text-sm tabular-nums">
                    {lightboxIndex + 1} / {previewImages.length}
                  </span>

                  <button
                    onClick={() =>
                      setLightboxIndex((i) => Math.min(previewImages.length - 1, (i ?? 0) + 1))
                    }
                    disabled={lightboxIndex === previewImages.length - 1}
                    aria-label="Next photo"
                    className="text-background text-sm disabled:opacity-30 hover:opacity-80 transition-opacity"
                  >
                    Next →
                  </button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* View All Modal */}
        <Dialog open={isViewAllOpen} onOpenChange={setIsViewAllOpen}>
          <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {year} Summit Gallery — Full Collection
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 mt-4 pr-2">
              <div className="h-full w-full">
                {images.length > 0 && (
                  <AutoSizer
                    renderProp={({ height, width }: { height?: number; width?: number }) => {
                      const containerWidth = width || 1000;
                      const containerHeight = height || 600;
                      const cols = Math.max(2, Math.floor(containerWidth / 180));
                      const rows = Math.ceil(images.length / cols);

                      return (
                        <Grid
                          columnCount={cols}
                          columnWidth={containerWidth / cols}
                          height={containerHeight}
                          width={containerWidth}
                          rowCount={rows}
                          rowHeight={200}
                          className="custom-scrollbar"
                          itemData={memoizedItemData}
                        >
                          {({ columnIndex, rowIndex, style, data }: GridChildComponentProps) => {
                            const idx = rowIndex * cols + columnIndex;
                            const src = data.images[idx];
                            if (!src) return null;
                            return (
                              <div style={style} className="p-1">
                                <button
                                  onClick={() => data.setFullGalleryIndex(idx)}
                                  className="w-full h-full rounded-lg overflow-hidden bg-muted hover:ring-2 hover:ring-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                  <img
                                    src={src}
                                    alt={`Gallery item ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                </button>
                              </div>
                            );
                          }}
                        </Grid>
                      );
                    }}
                  />
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsViewAllOpen(false)}
                className="px-6 py-2 rounded-full border border-border hover:bg-muted transition-colors text-sm font-medium"
              >
                Close Gallery
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Full Gallery Lightbox */}
        <Dialog
          open={fullGalleryIndex !== null}
          onOpenChange={(open) => {
            if (!open) setFullGalleryIndex(null);
          }}
        >
          <DialogContent
            className="max-w-5xl p-0 overflow-hidden bg-foreground/95 z-[60]"
            onKeyDown={(e) => handleKeyDown(e, images, setFullGalleryIndex, fullGalleryIndex)}
          >
            <DialogHeader className="sr-only">
              <DialogTitle>
                Gallery
                {fullGalleryIndex !== null ? `${fullGalleryIndex + 1} of ${images.length}` : ""}
              </DialogTitle>
            </DialogHeader>

            {fullGalleryIndex !== null && (
              <>
                <img
                  src={images[fullGalleryIndex]}
                  alt={`Gallery ${fullGalleryIndex + 1} of ${images.length}, enlarged`}
                  className="w-full h-auto"
                />

                <div className="flex items-center justify-between px-4 py-2 bg-foreground/80">
                  <button
                    onClick={() => setFullGalleryIndex((i) => Math.max(0, (i ?? 0) - 1))}
                    disabled={fullGalleryIndex === 0}
                    aria-label="Previous image"
                    className="text-background text-sm disabled:opacity-30 hover:opacity-80 transition-opacity"
                  >
                    ← Prev
                  </button>
                  <span className="text-background text-sm tabular-nums">
                    {fullGalleryIndex + 1} / {images.length}
                  </span>
                  <button
                    onClick={() =>
                      setFullGalleryIndex((i) => Math.min(images.length - 1, (i ?? 0) + 1))
                    }
                    disabled={fullGalleryIndex === images.length - 1}
                    aria-label="Next image"
                    className="text-background text-sm disabled:opacity-30 hover:opacity-80 transition-opacity"
                  >
                    Next →
                  </button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default SummitGallery;
