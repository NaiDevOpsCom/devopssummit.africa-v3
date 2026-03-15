import { useState, useEffect, useCallback } from "react";

/**
 * Hook for cycling through a list of background images.
 * Provides the current image, a function to change the image, and handles the interval.
 *
 * @param images Array of image URLs to cycle through
 * @param interval Duration in milliseconds between changes (default 8000ms)
 * @returns { currentImage: string, nextImage: () => void, index: number }
 */
export function useDynamicBackground(images: readonly string[], interval = 8000) {
  // Start with a random index to have a different image on page refresh, guard against empty array
  const [index, setIndex] = useState(() =>
    images.length > 0 ? Math.floor(Math.random() * images.length) : 0,
  );

  const currentSafeIndex = images.length > 0 ? index % images.length : 0;

  const nextImage = useCallback(() => {
    if (images.length === 0) return;
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      // Only change if the document is visible to save resources
      if (document.visibilityState === "visible") {
        nextImage();
      }
    }, interval);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Immediate update on tab return for dynamic feel
        nextImage();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [images.length, interval, nextImage]);

  return {
    currentImage: images.length > 0 ? images[currentSafeIndex] : "",
    index: currentSafeIndex,
    nextImage,
  };
}
