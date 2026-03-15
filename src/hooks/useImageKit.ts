import { useCallback, useMemo } from "react";
import {
  buildImageKitUrl,
  buildSrcSet,
  buildLqipUrl,
  buildAvatarUrl,
  buildOgImageUrl,
  createFolderScope,
  type FolderScope,
} from "@/utils/imagekit.utils";
import { DELIVERY_DEFAULTS } from "@/lib/imagekit.config";
import type { IKFolderPath } from "@/lib/imagekit.paths";
import type { ImageKitTransformation, UseImageKitReturn } from "@/types/imagekit.types";

export function useImageKit(): UseImageKitReturn {
  const buildUrl = useCallback(
    (path: string, transformation?: ImageKitTransformation | ImageKitTransformation[]): string =>
      buildImageKitUrl(path, transformation),
    [],
  );
  const buildSrcSetMemo = useCallback(
    (path: string, widths?: readonly number[], transformation?: ImageKitTransformation): string =>
      buildSrcSet(path, widths, transformation),
    [],
  );
  const lqip = useCallback(
    (path: string, quality?: number, blur?: number): string => buildLqipUrl(path, quality, blur),
    [],
  );
  const avatar = useCallback(
    (path: string, size?: number): string => buildAvatarUrl(path, size),
    [],
  );
  const ogImage = useCallback((path: string): string => buildOgImageUrl(path), []);

  return useMemo(
    () => ({
      buildUrl,
      buildSrcSet: buildSrcSetMemo,
      lqip,
      avatar,
      ogImage,
      defaults: DELIVERY_DEFAULTS,
    }),
    [buildUrl, buildSrcSetMemo, lqip, avatar, ogImage],
  );
}

export function useIKFolder(folder: IKFolderPath): FolderScope {
  return useMemo(() => createFolderScope(folder), [folder]);
}
