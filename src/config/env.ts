/**
 * Central environment configuration.
 * All access to import.meta.env happens HERE and nowhere else.
 */

// ─── Internal helpers ─────────────────────────────────────────────────────────
export const requireEnv = (key: keyof ImportMetaEnv, description: string): string => {
  const value = import.meta.env[key];
  if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
    throw new Error(
      `[Config] Missing required environment variable: ${key}\n` +
        `Description: ${description}\n` +
        `Add it to your .env.local file or Cloudflare Pages dashboard.`,
    );
  }
  return String(value);
};

const optionalEnv = (key: keyof ImportMetaEnv, fallback = ""): string =>
  String(import.meta.env[key] ?? fallback);

// ─── Runtime environment detection ───────────────────────────────────────────
type AppEnv = "production" | "staging" | "preview" | "development";

const resolveAppEnv = (): AppEnv => {
  if (import.meta.env.MODE === "test") return "development";

  const hostname = globalThis.window === undefined ? "" : globalThis.window.location.hostname;

  // ── Production ────────────────────────────────────────────
  if (hostname === "devopssummit.africa" || hostname === "www.devopssummit.africa") {
    return "production";
  }

  // ── Staging ───────────────────────────────────────────────
  if (
    hostname === "staging.devopssummit.africa" ||
    hostname === "devopssummit-africa-v3-staging.pages.dev"
  ) {
    return "staging";
  }

  // ── Feature branch previews ───────────────────────────────
  if (hostname.endsWith(".pages.dev")) {
    return "preview";
  }

  // ── Local development ─────────────────────────────────────
  const explicit = optionalEnv("VITE_APP_ENV");
  if (["production", "staging", "preview", "development"].includes(explicit)) {
    return explicit as AppEnv;
  }

  return import.meta.env.PROD ? "production" : "development";
};

export const APP_ENV: AppEnv = resolveAppEnv();
export const IS_PRODUCTION = APP_ENV === "production";
export const IS_STAGING = APP_ENV === "staging";
export const IS_PREVIEW = APP_ENV === "preview";
export const IS_DEVELOPMENT = APP_ENV === "development";
export const IS_TEST = import.meta.env.MODE === "test";

// Convenience — non-production covers staging + preview + dev
export const IS_NON_PRODUCTION = !IS_PRODUCTION;

// ─── App ──────────────────────────────────────────────────────────────────────
export const APP_NAME = optionalEnv("VITE_APP_NAME", "Africa DevOps Summit");
export const APP_VERSION = optionalEnv("VITE_APP_VERSION", "1.0.0");

// ─── PostHog ──────────────────────────────────────────────────────────────────
export const POSTHOG_KEY =
  import.meta.env.VITE_PUBLIC_POSTHOG_KEY || import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN || "";
export const POSTHOG_HOST = optionalEnv("VITE_PUBLIC_POSTHOG_HOST", "https://us.i.posthog.com");

// ─── ImageKit ─────────────────────────────────────────────────────────────────
export const IMAGEKIT_URL_ENDPOINT = optionalEnv("VITE_IMAGEKIT_URL_ENDPOINT");
export const IMAGEKIT_PUBLIC_KEY = optionalEnv("VITE_IMAGEKIT_PUBLIC_KEY");

// ─── API ──────────────────────────────────────────────────────────────────────
export const API_BASE_URL = optionalEnv("VITE_API_BASE_URL", "");

// ─── Third-party (future) ─────────────────────────────────────────────────────
export const STRIPE_PUBLISHABLE_KEY = optionalEnv("VITE_STRIPE_PUBLISHABLE_KEY");
export const SENTRY_DSN = optionalEnv("VITE_SENTRY_DSN");

// ─── Feature flags ────────────────────────────────────────────────────────────
// Devtools and debug logging never show in production
export const ENABLE_DEVTOOLS = import.meta.env.VITE_ENABLE_DEVTOOLS === "true" && IS_NON_PRODUCTION;

export const DEBUG_IMAGES = import.meta.env.VITE_DEBUG_IMAGES === "true" && IS_NON_PRODUCTION;
