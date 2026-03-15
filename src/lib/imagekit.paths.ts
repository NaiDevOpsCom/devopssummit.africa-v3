export const IK_FOLDERS = {
  ads2024: "/ads2024",
  ads2025: "/ads2025",
} as const;

export type IKFolderKey = keyof typeof IK_FOLDERS;
export type IKFolderPath = (typeof IK_FOLDERS)[IKFolderKey];

/**
 * Maps display years to ImageKit folder keys.
 *
 * Logic:
 * 1. Iterates over IK_FOLDERS keys.
 * 2. Extracts the first 4-digit number (e.g., "ads2024" -> "2024").
 * 3. Throws if a year collision is detected (preventing silent data loss).
 *
 * @see docs/imagekit-gallery.md for the full integration guide.
 */
export const GALLERY_YEAR_MAP: Record<string, IKFolderKey> = Object.keys(IK_FOLDERS).reduce(
  (acc, key) => {
    const yearMatch = key.match(/\d{4}/);
    if (yearMatch) {
      const year = yearMatch[0];
      if (acc[year]) {
        throw new Error(
          `GALLERY_YEAR_MAP Collision: Year ${year} is mapped to multiple folders: "${acc[year]}" and "${key}". Please ensure folder names in IK_FOLDERS have unique years.`,
        );
      }
      acc[year] = key as IKFolderKey;
    }
    return acc;
  },
  {} as Record<string, IKFolderKey>,
);

export function ikPath(folder: IKFolderKey | IKFolderPath, filename: string): string {
  const folderPath =
    folder in IK_FOLDERS ? IK_FOLDERS[folder as IKFolderKey] : (folder as IKFolderPath);

  const normalized = folderPath.replace(/\/+/g, "/").replace(/^\/+/, "").replace(/\/+$/, "");
  const normalizedFolder = normalized ? `/${normalized}` : "";
  const clean = filename.replace(/\/+/g, "/").replace(/^\/+/, "");

  if (!clean) return normalizedFolder || "/";
  if (!normalizedFolder) return `/${clean}`;
  return `${normalizedFolder}/${clean}`;
}
