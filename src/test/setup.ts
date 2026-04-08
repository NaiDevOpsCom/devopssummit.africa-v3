// src/test/setup.ts
import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// ── Cleanup after every test ─────────────────────────────────────────────────
// Prevents state leaking between tests
afterEach(() => {
  cleanup();
});

// ── matchMedia ───────────────────────────────────────────────────────────────
// jsdom doesn't implement matchMedia — required by next-themes + use-mobile hook
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

// ── ResizeObserver ───────────────────────────────────────────────────────────
// Required by radix-ui components (ScrollArea, NavigationMenu, etc.)
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// ── IntersectionObserver ─────────────────────────────────────────────────────
// Required by lazy loading, useDynamicBackground
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: "",
  thresholds: [],
}));

// ── Canvas ───────────────────────────────────────────────────────────────────
// Required by Hero component — avoids "getContext is not a function" errors
HTMLCanvasElement.prototype.getContext = vi.fn(
  () =>
    ({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      fillStyle: "",
      strokeStyle: "",
      lineWidth: 0,
    }) as unknown as CanvasRenderingContext2D,
) as unknown as typeof HTMLCanvasElement.prototype.getContext;

// ── import.meta.env defaults for tests ──────────────────────────────────────
// Keep the required runtime validation keys aligned with validateEnv().
const validateEnvDefaults = {
  VITE_IMAGEKIT_URL_ENDPOINT: "https://ik.imagekit.io/test",
  VITE_IMAGEKIT_PUBLIC_KEY: "test_public_key",
} as const;

Object.entries(validateEnvDefaults).forEach(([key, value]) => {
  vi.stubEnv(key, value);
});

vi.stubEnv("VITE_APP_NAME", "Africa DevOps Summit");
vi.stubEnv("VITE_APP_VERSION", "0.0.0-test");
vi.stubEnv("VITE_PUBLIC_POSTHOG_KEY", "");
vi.stubEnv("VITE_PUBLIC_POSTHOG_HOST", "https://us.i.posthog.com");
