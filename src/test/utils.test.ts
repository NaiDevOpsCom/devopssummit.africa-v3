import { describe, it, expect } from "vitest";
import { getInitials } from "@/utils/getInitials";

describe("getInitials", () => {
  it("should handle empty string", () => {
    expect(getInitials("")).toBe("");
  });

  it("should handle null/undefined-ish input", () => {
    expect(getInitials(null as unknown as string)).toBe("");
  });

  it("should handle single name", () => {
    expect(getInitials("James")).toBe("J");
  });

  it("should handle two names", () => {
    expect(getInitials("James Kariuki")).toBe("JK");
  });

  it("should handle multiple names and limit to 2", () => {
    expect(getInitials("James Kariuki Mwangi")).toBe("JK");
  });

  it("should handle extra whitespace", () => {
    expect(getInitials("  James   Kariuki  ")).toBe("JK");
  });

  it("should handle leading/trailing spaces with empty parts", () => {
    expect(getInitials(" James ")).toBe("J");
  });
});
