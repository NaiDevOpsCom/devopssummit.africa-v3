/// <reference types="vite/client" />

interface ImportMetaEnv {
  // ✅ App identity
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;

  // ✅ PostHog
  readonly VITE_PUBLIC_POSTHOG_TOKEN?: string;
  readonly VITE_PUBLIC_POSTHOG_KEY?: string;
  readonly VITE_PUBLIC_POSTHOG_HOST: string;

  // ✅ ImageKit
  readonly VITE_IMAGEKIT_URL_ENDPOINT: string;
  readonly VITE_IMAGEKIT_PUBLIC_KEY: string;

  // ✅ API endpoints — public URLs only, never keys
  readonly VITE_API_BASE_URL: string;
  readonly VITE_WEBSOCKET_URL: string;

  // ✅ Third-party PUBLIC keys only (publishable/public, not secret)
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_SENTRY_DSN: string;

  // ✅ Feature flags
  readonly VITE_ENABLE_DEVTOOLS: "true" | "false";
  readonly VITE_FEATURE_NEW_DASHBOARD: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
