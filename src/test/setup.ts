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
Object.defineProperty(globalThis, "matchMedia", {
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
class MockResizeObserver {
  callback: any;
  constructor(callback: any) {
    this.callback = callback;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  trigger(entries: any[]) {
    if (this.callback) {
      this.callback(entries, this);
    }
  }
}
globalThis.ResizeObserver = MockResizeObserver as any;

// ── IntersectionObserver ─────────────────────────────────────────────────────
// Required by lazy loading, useDynamicBackground
class MockIntersectionObserver {
  callback: any;
  root: any = null;
  rootMargin: string = "";
  thresholds: any[] = [];
  constructor(callback: any, options?: any) {
    this.callback = callback;
    if (options) {
      this.root = options.root || null;
      this.rootMargin = options.rootMargin || "";
      if (options.threshold === undefined) {
        this.thresholds = [];
      } else if (Array.isArray(options.threshold)) {
        this.thresholds = options.threshold;
      } else {
        this.thresholds = [options.threshold];
      }
    }
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = () => [];
}
globalThis.IntersectionObserver = MockIntersectionObserver as any;

// ── MutationObserver ─────────────────────────────────────────────────────────
// Required by lazy loading
class MockMutationObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
}
globalThis.MutationObserver = MockMutationObserver as any;

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

// ── Media Elements ───────────────────────────────────────────────────────────
// Required by Hero background video
HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
HTMLMediaElement.prototype.pause = vi.fn();
HTMLMediaElement.prototype.load = vi.fn();
HTMLMediaElement.prototype.setAttribute = vi.fn();

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
