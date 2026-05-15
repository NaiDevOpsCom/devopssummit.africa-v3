import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

describe("validateEnv", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("VITE_APP_ENV", "development");
    vi.stubEnv("VITE_IMAGEKIT_URL_ENDPOINT", "https://ik.imagekit.io/test");
    vi.stubEnv("VITE_IMAGEKIT_PUBLIC_KEY", "public_test");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should not throw if environment is valid", async () => {
    const { validateEnv } = await import("../config/validateEnv");
    expect(() => validateEnv()).not.toThrow();
  });

  it("should throw if VITE_IMAGEKIT_URL_ENDPOINT is missing", async () => {
    vi.stubEnv("VITE_IMAGEKIT_URL_ENDPOINT", "");
    const { validateEnv } = await import("../config/validateEnv");
    expect(() => validateEnv()).toThrow(/VITE_IMAGEKIT_URL_ENDPOINT is missing/);
  });

  it("should throw if a security violation is found", async () => {
    vi.stubEnv("VITE_SERVICE_KEY", "sk_test_123");
    const { validateEnv } = await import("../config/validateEnv");
    expect(() => validateEnv()).toThrow(/SECURITY:/);
  });
});
