// src/tests/useSafeInput.test.ts
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSafeInput } from "@/hooks/useSafeInput";

describe("useSafeInput", () => {
  // ── Initial value ────────────────────────────────────────────────
  it("initialises with a sanitized empty string by default", () => {
    const { result } = renderHook(() => useSafeInput());
    expect(result.current[0]).toBe("");
  });

  it("sanitizes the initial value on mount", () => {
    const { result } = renderHook(() => useSafeInput("<script>alert('xss')</script>"));
    // Script tag must be stripped — never stored raw
    expect(result.current[0]).not.toContain("<script>");
  });

  // ── String updates ───────────────────────────────────────────────
  it("stores plain text unchanged", () => {
    const { result } = renderHook(() => useSafeInput());
    act(() => result.current[1]("Hello Golden"));
    expect(result.current[0]).toBe("Hello Golden");
  });

  it("strips script tags from setValue input", () => {
    const { result } = renderHook(() => useSafeInput());
    act(() => result.current[1]("<script>document.cookie</script>"));
    expect(result.current[0]).not.toContain("<script>");
  });

  it("strips inline event handlers", () => {
    const { result } = renderHook(() => useSafeInput());
    act(() => result.current[1]('<img src=x onerror="alert(1)">'));
    expect(result.current[0]).not.toContain("onerror");
  });

  it("strips javascript: protocol links", () => {
    const { result } = renderHook(() => useSafeInput());
    act(() => result.current[1]('<a href="javascript:alert(1)">click</a>'));
    expect(result.current[0]).not.toContain("javascript:");
  });

  // ── Functional updates ───────────────────────────────────────────
  it("supports functional updater pattern", () => {
    const { result } = renderHook(() => useSafeInput("hello"));
    act(() => result.current[1]((prev) => prev + " world"));
    expect(result.current[0]).toBe("hello world");
  });

  it("sanitizes the result of a functional updater", () => {
    const { result } = renderHook(() => useSafeInput("safe"));
    act(() => result.current[1]((prev) => prev + "<script>alert(1)</script>"));
    expect(result.current[0]).not.toContain("<script>");
  });

  // ── Return type ──────────────────────────────────────────────────
  it("returns a tuple of [string, setter]", () => {
    const { result } = renderHook(() => useSafeInput());
    expect(typeof result.current[0]).toBe("string");
    expect(typeof result.current[1]).toBe("function");
  });
});
