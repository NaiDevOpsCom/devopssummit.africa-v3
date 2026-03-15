import { describe, it, expect } from "vitest";
import { ikPath } from "../lib/imagekit.paths";

describe("ikPath", () => {
  it("should concatenate folder and filename correctly", () => {
    expect(ikPath("/ads2024", "image.jpg")).toBe("/ads2024/image.jpg");
  });

  it("should handle filename with leading slash", () => {
    expect(ikPath("/ads2025", "/test.png")).toBe("/ads2025/test.png");
  });

  it("should normalize folder and filename with extra slashes", () => {
    expect(ikPath("/ads/2025/", "/conference.jpg")).toBe("/ads/2025/conference.jpg");
  });

  it("should handle empty folder", () => {
    expect(ikPath("", "image.jpg")).toBe("/image.jpg");
  });

  it("should handle empty filename", () => {
    expect(ikPath("/ads2025", "")).toBe("/ads2025");
  });

  it("should handle folder without leading slash", () => {
    expect(ikPath("folder", "image.jpg")).toBe("/folder/image.jpg");
  });

  it("should handle multiple consecutive slashes in folder", () => {
    expect(ikPath("/a//b/", "//c.jpg")).toBe("/a/b/c.jpg");
  });

  it("should handle filename containing subdirectories", () => {
    expect(ikPath("/root", "sub/image.jpg")).toBe("/root/sub/image.jpg");
  });
});
