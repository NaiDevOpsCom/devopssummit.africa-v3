import { useRef, useState, useEffect, useCallback } from "react";
import { IS_DEVELOPMENT } from "@/config/env";

export interface UseLazyImageOptions {
  rootMargin?: string;
  threshold?: number;
  disabled?: boolean;
}

export interface UseLazyImageReturn {
  ref: (node: HTMLImageElement | HTMLDivElement | HTMLButtonElement | null) => void;
  isVisible: boolean;
  isLoaded: boolean;
  hasError: boolean;
  onLoad: () => void;
  onError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

// Shared default — import this in consumers instead of repeating the string
export const LAZY_ROOT_MARGIN = "200px 0px";

export function useLazyImage({
  rootMargin = LAZY_ROOT_MARGIN,
  threshold = 0,
  disabled = false,
}: UseLazyImageOptions = {}): UseLazyImageReturn {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(disabled);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const ref = useCallback(
    (node: HTMLImageElement | HTMLDivElement | HTMLButtonElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node) return;

      if (disabled || isVisible) {
        if (disabled) setIsVisible(true);
        return;
      }

      if (typeof IntersectionObserver === "undefined") {
        setIsVisible(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin, threshold },
      );

      observer.observe(node);
      observerRef.current = observer;
    },
    [disabled, isVisible, rootMargin, threshold],
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  // Synchronize state when disabled prop changes (idiomatic React sync-to-props)
  const [prevDisabled, setPrevDisabled] = useState(disabled);
  if (disabled !== prevDisabled) {
    setPrevDisabled(disabled);
    if (disabled) {
      setIsVisible(true);
      setIsLoaded(false);
      setHasError(false);
    }
  }

  const onLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const onError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    if (IS_DEVELOPMENT) {
      console.warn("[useLazyImage] Image failed to load:", (e.target as HTMLImageElement).src);
    }
  }, []);

  return { ref, isVisible, isLoaded, hasError, onLoad, onError };
}
