import React, { forwardRef, useEffect, useMemo, type CSSProperties } from "react";
import * as Env from "@/config/env";
import { useImageKit } from "@/hooks/useImageKit";
import { useLazyImage } from "@/hooks/useLazyImage";
import { DELIVERY_DEFAULTS } from "@/lib/imagekit.config";
import type { IKImageProps } from "@/types/imagekit.types";

const ErrorFallback = forwardRef<
  HTMLDivElement,
  { alt: string; style?: CSSProperties; className?: string }
>(({ alt, style, className }, ref) => (
  <div
    ref={ref}
    role="img"
    aria-label={alt}
    className={className}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f3f4f6",
      color: "#9ca3af",
      fontSize: "0.75rem",
      fontFamily: "monospace",
      borderRadius: "inherit",
      ...style,
    }}
  >
    ⚠ image unavailable
  </div>
));

ErrorFallback.displayName = "IKImageErrorFallback";

const TRANSPARENT_PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

export const IKImage = forwardRef<HTMLImageElement, IKImageProps>(
  (
    {
      path,
      transformation,
      lazy = true,
      lqip = DELIVERY_DEFAULTS.lqip,
      srcSetBreakpoints = DELIVERY_DEFAULTS.srcSetBreakpoints,
      alt,
      className,
      style,
      width,
      height,
      sizes,
      ...rest
    },
    forwardedRef,
  ) => {
    const { buildUrl, buildSrcSet, lqip: buildLqip } = useImageKit();
    const {
      ref: wrapperRef,
      isVisible,
      isLoaded,
      hasError,
      onLoad,
      onError,
    } = useLazyImage({ disabled: !lazy });

    const baseTransformation = useMemo(
      () => (Array.isArray(transformation) ? transformation[0] : transformation),
      [transformation],
    );
    const mergedTransformation = useMemo(
      () => ({
        format: DELIVERY_DEFAULTS.format,
        quality: DELIVERY_DEFAULTS.quality,
        ...(baseTransformation ?? {}),
      }),
      [baseTransformation],
    );
    const transformationList = useMemo(
      () =>
        Array.isArray(transformation)
          ? [mergedTransformation, ...transformation.slice(1)]
          : [mergedTransformation],
      [transformation, mergedTransformation],
    );

    const fullSrc = buildUrl(path, transformationList);
    const srcSet = buildSrcSet(path, srcSetBreakpoints, {
      format: DELIVERY_DEFAULTS.format,
      quality: DELIVERY_DEFAULTS.quality,
      ...(baseTransformation ?? {}),
    });
    const lqipSrc = lqip?.active ? buildLqip(path, lqip.quality, lqip.blur) : undefined;

    const debugImages = Env.DEBUG_IMAGES;

    useEffect(() => {
      if (!debugImages) return;
      console.info("[IKImage] Debug info:", {
        path,
        fullSrc,
        srcSet,
        lqipSrc,
        isVisible,
        isLoaded,
        hasError,
        transformationList,
      });
    }, [
      debugImages,
      path,
      fullSrc,
      srcSet,
      lqipSrc,
      isVisible,
      isLoaded,
      hasError,
      transformationList,
    ]);

    if (hasError) {
      return (
        <ErrorFallback
          alt={alt}
          className={className}
          style={{ width, height, ...(style as CSSProperties) }}
        />
      );
    }

    return (
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          display: "inline-block",
          overflow: "hidden",
          width,
          height,
          borderRadius: "inherit",
        }}
      >
        {lqip?.active && lqipSrc && (
          <img
            src={lqipSrc}
            aria-hidden="true"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: `blur(${(lqip.blur ?? 6) * 2}px)`,
              transform: "scale(1.05)",
              transition: "opacity 0.4s ease",
              opacity: isLoaded ? 0 : 1,
              pointerEvents: "none",
            }}
          />
        )}
        <img
          ref={forwardedRef}
          src={isVisible ? fullSrc : TRANSPARENT_PLACEHOLDER}
          srcSet={isVisible ? srcSet : undefined}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          className={className}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.4s ease",
            opacity: isLoaded || !lazy ? 1 : 0,
            ...(style as CSSProperties),
          }}
          onLoad={onLoad}
          onError={onError}
          loading={!lazy ? "eager" : undefined}
          decoding="async"
          {...rest}
        />
      </div>
    );
  },
);

IKImage.displayName = "IKImage";
