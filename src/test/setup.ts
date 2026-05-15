import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// ── ResizeObserver ───────────────────────────────────────────────────────────
// Required by radix-ui components (ScrollArea, NavigationMenu, etc.)
class MockResizeObserver {
  callback: ResizeObserverCallback;
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  trigger(entries: ResizeObserverEntry[]) {
    if (this.callback) {
      this.callback(entries, this);
    }
  }
}
globalThis.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// ── IntersectionObserver ─────────────────────────────────────────────────────
// Required by lazy loading, useDynamicBackground
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  root: Element | Document | null = null;
  rootMargin: string = "";
  thresholds: number[] = [];
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    if (options) {
      this.root = options.root ?? null;
      this.rootMargin = options.rootMargin ?? "";
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
  takeRecords = (): IntersectionObserverEntry[] => [];
}
globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

// ── MutationObserver ─────────────────────────────────────────────────────────
// Required by lazy loading
class MockMutationObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
}
globalThis.MutationObserver = MockMutationObserver as unknown as typeof MutationObserver;

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
