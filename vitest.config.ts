// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname === "undefined" ? path.dirname(fileURLToPath(import.meta.url)) : __dirname;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
  test: {
    // ── Environment ────────────────────────────────────────────────
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/tests/setup.ts"],

    // ── Which files to test ────────────────────────────────────────
    // Single source of truth — no duplication inside projects
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: [
      "src/components/ui/**", // shadcn generated — never test these
      "node_modules/**",
      "dist/**",
      "storybook-static/**",
    ],

    // ── Coverage ───────────────────────────────────────────────────
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "coverage",
      exclude: [
        "src/components/ui/**", // shadcn — not your code
        "src/tests/**", // test utilities themselves
        "src/**/*.d.ts",
        "src/main.tsx", // entry point, nothing to unit test
        "src/App.tsx", // routing shell — covered by e2e
        "src/**/*.stories.{ts,tsx}",
      ],
      // ── Thresholds — CI fails if these drop ───────────────────────
      thresholds: {
        lines: 60, // start achievable, raise 5% each sprint
        branches: 55,
        functions: 60,
        statements: 60,
      },
    },

    // ── Reporter ───────────────────────────────────────────────────
    // verbose shows each test name + pass/fail — useful in CI logs
    reporters: process.env.CI ? ["verbose", "github-actions"] : ["verbose"],
  },
});
