// src/utils/sanitize.ts
import DOMPurify from "dompurify";

/**
 * Sanitizes raw HTML string before injecting into the DOM.
 * Use ONLY when dangerouslySetInnerHTML is truly unavoidable.
 */
export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    USE_PROFILES: { html: true }, // allow basic HTML tags
    FORBID_TAGS: ["script", "style", "iframe", "form", "object", "embed"],
    // Defense-in-depth: redundant as DOMPurify handles these, but kept for explicit policy
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover"],
  });
};

/**
 * Strict sanitizer — strips ALL HTML, returns plain text only.
 * Use for names, titles, comments, any user text you display as text.
 */
export const sanitizeText = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};

/**
 * Validates a URL is safe (http/https, mailto, tel).
 * Blocks javascript:, data:, vbscript: and other dangerous protocols.
 */
export const isSafeUrl = (url: string): boolean => {
  if (!url) return false;

  // Handle protocols that don't follow the Standard URL format (like mailto:, tel:)
  const normalized = url.toLowerCase().trim();
  if (normalized.startsWith("mailto:") || normalized.startsWith("tel:")) {
    return true;
  }

  // Explicitly block protocol-relative URLs
  if (normalized.startsWith("//")) {
    return false;
  }

  try {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol);
  } catch {
    // If it's not a full URL, it might be an internal path (starting with / or #)
    return url.startsWith("/") || url.startsWith("#");
  }
};

/**
 * Returns the URL if safe, otherwise returns a fallback.
 */
export const sanitizeUrl = (url: string, fallback = "#"): string => {
  return isSafeUrl(url) ? url : fallback;
};
