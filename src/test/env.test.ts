import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

describe("env config", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("requireEnv throws if missing", async () => {
    vi.stubEnv("VITE_TEST_MISSING", "");
    const { requireEnv } = await import("../config/env");
    expect(() =>
      requireEnv("VITE_TEST_MISSING" as Parameters<typeof requireEnv>[0], "desc"),
    ).toThrow();
  });

  it("requireEnv returns value if present", async () => {
    vi.stubEnv("VITE_TEST_PRESENT", "some_value");
    const { requireEnv } = await import("../config/env");
    expect(requireEnv("VITE_TEST_PRESENT" as Parameters<typeof requireEnv>[0], "desc")).toBe(
      "some_value",
    );
  });

  it("resolveAppEnv resolves development if MODE is test", async () => {
    vi.stubEnv("MODE", "test");
    const { APP_ENV } = await import("../config/env");
    expect(APP_ENV).toBe("development");
  });
});
