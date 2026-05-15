import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const selectedProjects = process.argv.flatMap((arg, index, argv) => {
  if (arg.startsWith("--project=")) {
    return [arg.slice("--project=".length)];
  }

  if (arg === "--project" && argv[index + 1]) {
    return [argv[index + 1]];
  }

  return [];
});

const includeStorybookProject =
  selectedProjects.length === 0 || selectedProjects.includes("storybook");

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          setupFiles: ["./src/test/setup.ts"],
          include: ["src/**/*.{test,spec}.{ts,tsx}"],
        },
      },
      ...(includeStorybookProject
        ? [
            {
              extends: true,
              plugins: [
                // The plugin will run tests for the stories defined in your Storybook config
                // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
                storybookTest({
                  configDir: path.join(dirname, ".storybook"),
                }),
              ],
              test: {
                name: "storybook",
                browser: {
                  enabled: true,
                  headless: true,
                  provider: playwright({}),
                  instances: [
                    {
                      browser: "chromium",
                    },
                  ],
                },
                setupFiles: [".storybook/vitest.setup.ts"],
              },
            },
          ]
        : []),
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
});
