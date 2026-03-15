// src/types/safe.ts

/**
 * A branded string type for URLs that have been validated.
 * Forces all URL-accepting functions to only accept validated URLs.
 */
export type SafeUrl = string & { readonly __brand: "SafeUrl" };

/**
 * Cast a string to SafeUrl only after validation.
 * Throws if the URL is unsafe.
 */
export const toSafeUrl = (url: string): SafeUrl => {
  try {
    const parsed = new URL(url);
    if (!["https:", "http:"].includes(parsed.protocol)) {
      throw new Error(`Unsafe protocol: ${parsed.protocol}`);
    }
    return parsed.href as SafeUrl;
  } catch (err) {
    throw new Error(
      `Invalid or unsafe URL: ${url} - ${err instanceof Error ? err.message : String(err)}`,
      { cause: err },
    );
  }
};
