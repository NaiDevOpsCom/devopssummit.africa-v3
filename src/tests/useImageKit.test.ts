// src/tests/useImageKit.test.ts
import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useImageKit, useIKFolder } from "@/hooks/useImageKit";

describe("useImageKit", () => {
  // ── Hook shape ───────────────────────────────────────────────────
  it("returns all expected methods", () => {
    const { result } = renderHook(() => useImageKit());
    expect(typeof result.current.buildUrl).toBe("function");
    expect(typeof result.current.buildSrcSet).toBe("function");
    expect(typeof result.current.lqip).toBe("function");
    expect(typeof result.current.avatar).toBe("function");
    expect(typeof result.current.ogImage).toBe("function");
    expect(result.current.defaults).toBeDefined();
  });

  // ── buildUrl ─────────────────────────────────────────────────────
  it("buildUrl returns a non-empty string for a valid path", () => {
    const { result } = renderHook(() => useImageKit());
    const url = result.current.buildUrl("/speakers/john-doe.jpg");
    expect(typeof url).toBe("string");
    expect(url.length).toBeGreaterThan(0);
  });

  it("buildUrl includes the image path", () => {
    const { result } = renderHook(() => useImageKit());
    const url = result.current.buildUrl("/speakers/john-doe.jpg");
    expect(url).toContain("john-doe.jpg");
  });

  it("buildUrl with transformation returns a string", () => {
    const { result } = renderHook(() => useImageKit());
    const url = result.current.buildUrl("/speakers/john-doe.jpg", {
      width: 400,
      height: 400,
    });
    expect(typeof url).toBe("string");
    expect(url.length).toBeGreaterThan(0);
  });

  // ── lqip ─────────────────────────────────────────────────────────
  it("lqip returns a string", () => {
    const { result } = renderHook(() => useImageKit());
    const url = result.current.lqip("/gallery/photo.jpg");
    expect(typeof url).toBe("string");
  });

  // ── avatar ───────────────────────────────────────────────────────
  it("avatar returns a string", () => {
    const { result } = renderHook(() => useImageKit());
    const url = result.current.avatar("/team/golden.jpg", 64);
    expect(typeof url).toBe("string");
  });

  // ── ogImage ──────────────────────────────────────────────────────
  it("ogImage returns a string", () => {
    const { result } = renderHook(() => useImageKit());
    const url = result.current.ogImage("/og/summit-banner.jpg");
    expect(typeof url).toBe("string");
  });

  // ── Referential stability (memoization) ──────────────────────────
  it("returns the same function references across re-renders", () => {
    const { result, rerender } = renderHook(() => useImageKit());
    const first = result.current.buildUrl;
    rerender();
    expect(result.current.buildUrl).toBe(first);
  });
});

describe("useIKFolder", () => {
  it("returns a folder scope object", () => {
    const { result } = renderHook(() => useIKFolder("/gallery"));
    expect(result.current).toBeDefined();
  });

  it("returns stable reference across re-renders", () => {
    const { result, rerender } = renderHook(() => useIKFolder("/gallery"));
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});
