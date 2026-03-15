import { describe, it, expect } from "vitest";
import {
  IMAGEKIT_ENDPOINT,
  buildImageKitUrl,
  buildSrcSet,
  buildLqipUrl,
} from "../utils/imagekit.utils";

describe("ImageKit Utils", () => {
  const testPath = "/ads2025/test.jpg";
  const endpoint = IMAGEKIT_ENDPOINT;

  describe("buildImageKitUrl", () => {
    it("should return base URL when no transformation is provided", () => {
      expect(buildImageKitUrl(testPath)).toBe(`${endpoint}${testPath}`);
    });

    it("should handle paths without leading slash", () => {
      expect(buildImageKitUrl("ads2025/test.jpg")).toBe(`${endpoint}${testPath}`);
    });

    it("should apply single transformation correctly", () => {
      const url = buildImageKitUrl(testPath, { width: 300 });
      expect(url).toBe(`${endpoint}/tr:w-300${testPath}`);
    });

    it("should apply multiple transformations correctly", () => {
      const url = buildImageKitUrl(testPath, { width: 300, quality: 80 });
      expect(url).toContain(`${endpoint}/tr:`);
      expect(url).toContain("w-300");
      expect(url).toContain("q-80");
      expect(url).toContain(testPath);
    });

    it("should apply multiple transformation blocks correctly", () => {
      const url = buildImageKitUrl(testPath, [{ width: 300 }, { blur: 10 }]);
      expect(url).toBe(`${endpoint}/tr:w-300:bl-10${testPath}`);
    });

    it("should handle empty transformation object", () => {
      const url = buildImageKitUrl(testPath, {});
      expect(url).toContain(endpoint);
      expect(url).toContain(testPath);
    });

    it("should handle empty transformation array", () => {
      const url = buildImageKitUrl(testPath, []);
      expect(url).toContain(endpoint);
      expect(url).toContain(testPath);
    });

    it("should handle path with query parameters and special characters", () => {
      const pathWithParams = "/ads2025/test.jpg?foo=1&bar=2";
      const url = buildImageKitUrl(pathWithParams, { width: 300 });
      expect(url).toContain(`${endpoint}/tr:`);
      expect(url).toContain("w-300");
    });

    it("should handle undefined path", () => {
      expect(() => buildImageKitUrl(undefined as unknown as string)).toThrow();
    });

    it("should handle null path", () => {
      expect(() => buildImageKitUrl(null as unknown as string)).toThrow();
    });
  });

  describe("buildSrcSet", () => {
    it("should generate correct srcset string", () => {
      const widths = [300, 600];
      const srcset = buildSrcSet(testPath, widths);
      expect(srcset).toContain(`${endpoint}/tr:w-300${testPath} 300w`);
      expect(srcset).toContain(`${endpoint}/tr:w-600${testPath} 600w`);
    });

    it("should handle empty widths array", () => {
      const srcset = buildSrcSet(testPath, []);
      expect(srcset).toBe("");
    });

    it("should handle widths with non-integer values", () => {
      const widths = [300.5, 600.7];
      const srcset = buildSrcSet(testPath, widths);
      // Should handle floats appropriately
      expect(srcset).toContain(endpoint);
      expect(srcset).toContain(testPath);
    });

    it("should handle duplicate widths", () => {
      const widths = [300, 300, 600];
      const srcset = buildSrcSet(testPath, widths);
      // Should include duplicates or deduplicate based on implementation
      expect(srcset).toContain("300w");
      expect(srcset).toContain("600w");
    });

    it("should handle path with special characters in srcset", () => {
      const pathWithParams = "/ads2025/test.jpg?foo=1";
      const widths = [300];
      const srcset = buildSrcSet(pathWithParams, widths);
      expect(srcset).toContain(endpoint);
      expect(srcset).toContain("300w");
    });
  });

  describe("buildLqipUrl", () => {
    it("should generate correct LQIP URL", () => {
      const url = buildLqipUrl(testPath);
      expect(url).toBe(`${endpoint}/tr:w-20,q-20,bl-6,f-auto${testPath}`);
    });

    it("should handle path with query params", () => {
      const pathWithParams = "/ads2025/test.jpg?foo=1";
      const url = buildLqipUrl(pathWithParams);
      expect(url).toContain(endpoint);
      expect(url).toContain("/tr:");
      expect(url).toContain("w-20");
      expect(url).toContain("f-auto");
    });

    it("should handle custom quality and blur parameters", () => {
      const url = buildLqipUrl(testPath, 30, 8);
      expect(url).toContain(`${endpoint}/tr:`);
      expect(url).toContain("q-30");
      expect(url).toContain("bl-8");
    });

    it("should handle undefined/null path", () => {
      expect(() => buildLqipUrl(undefined as unknown as string)).toThrow();
      expect(() => buildLqipUrl(null as unknown as string)).toThrow();
    });

    it("should handle empty path", () => {
      const url = buildLqipUrl("");
      expect(url).toContain(endpoint);
      expect(url).toContain("/tr:");
    });
  });
});
