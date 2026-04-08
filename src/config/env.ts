/**
 * Central environment configuration.
 * All access to import.meta.env happens HERE and nowhere else.
 */

/**
 * Helper for critical required environment variables.
 * Throws an error immediately if the variable is missing or empty.
 * For non-critical/optional variables, use optionalEnv().
 */
export const requireEnv = (key: keyof ImportMetaEnv, description: string): string => {
  const value = import.meta.env[key];
  if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
    // Only throw for critical variables that the app cannot function without
    throw new Error(
      `[Config] Missing required environment variable: ${key}\n` +
        `Description: ${description}\n` +
        `Add it to your .env file.`,
    );
  }
  return String(value);
};

const optionalEnv = (key: keyof ImportMetaEnv, fallback = ""): string => {
  return String(import.meta.env[key] ?? fallback);
};

// ─── App ────────────────────────────────────────────────────────────────────
export const APP_NAME = optionalEnv("VITE_APP_NAME", "Africa DevOps Summit");
export const APP_VERSION = optionalEnv("VITE_APP_VERSION", "1.0.0");

// ─── PostHog ────────────────────────────────────────────────────────────────
// Handle both naming conventions seen in codebase
export const POSTHOG_KEY =
  import.meta.env.VITE_PUBLIC_POSTHOG_KEY || import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN || "";
export const POSTHOG_HOST = optionalEnv("VITE_PUBLIC_POSTHOG_HOST", "https://us.i.posthog.com");

// ─── ImageKit ───────────────────────────────────────────────────────────────
// We use optionalEnv here to avoid breaking CI/builds if secrets are missing.
// Strict validation is performed at runtime in validateEnv().
export const IMAGEKIT_URL_ENDPOINT = optionalEnv("VITE_IMAGEKIT_URL_ENDPOINT");
export const IMAGEKIT_PUBLIC_KEY = optionalEnv("VITE_IMAGEKIT_PUBLIC_KEY");

// ─── API ─────────────────────────────────────────────────────────────────────
export const API_BASE_URL = optionalEnv("VITE_API_BASE_URL", "");

// ─── Third-party ─────────────────────────────────────────────────────────────
export const STRIPE_PUBLISHABLE_KEY = optionalEnv("VITE_STRIPE_PUBLISHABLE_KEY");
export const SENTRY_DSN = optionalEnv("VITE_SENTRY_DSN");

// ─── Feature Flags ────────────────────────────────────────────────────────────
export const ENABLE_DEVTOOLS = import.meta.env.VITE_ENABLE_DEVTOOLS === "true";

// ─── Runtime helpers ─────────────────────────────────────────────────────────
export const IS_PRODUCTION = import.meta.env.PROD;
export const IS_DEVELOPMENT = import.meta.env.DEV;
export const DEBUG_IMAGES = IS_DEVELOPMENT && optionalEnv("VITE_DEBUG_IMAGES", "false") === "true";
export const IS_TEST = import.meta.env.MODE === "test";
