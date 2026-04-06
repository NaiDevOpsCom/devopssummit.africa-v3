import storybook from "eslint-plugin-storybook";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import noUnsanitized from "eslint-plugin-no-unsanitized";

export default tseslint.config(
  // ── Ignored paths ────────────────────────────────────────────────────
  {
    ignores: [
      "dist",
      "storybook-static",
      "src/components/ui/**",
      "coverage",
      "*.config.js",
      "scripts/**",
      "public/**",
    ],
  },

  // ── Base: all TS/TSX source files ────────────────────────────────────
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
      noUnsanitized.configs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettier,
    },
    rules: {
      // ── Prettier ────────────────────────────────────────────────────
      // Changed from "warn" → "error" so formatting failures block CI
      "prettier/prettier": ["error", {}, { usePrettierrc: true }],

      // ── React Hooks ─────────────────────────────────────────────────
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // ── TypeScript ──────────────────────────────────────────────────
      // Changed from "warn" → "error" — unused vars are dead code
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Explicit any is a type safety escape hatch — warn, don't error
      // (your codebase has noImplicitAny: false so this is gradual)
      "@typescript-eslint/no-explicit-any": "warn",

      // Ban @ts-ignore, allow @ts-expect-error (forces you to say WHY)
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": true,
          "ts-expect-error": "allow-with-description",
          minimumDescriptionLength: 10,
        },
      ],

      // Enforce `import type` for type-only imports (better tree-shaking)
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // Disallow empty functions without a comment explaining why
      "@typescript-eslint/no-empty-function": [
        "error",
        { allow: ["arrowFunctions"] }, // () => {} in callbacks is fine
      ],

      // ── General Code Quality ────────────────────────────────────────
      // Block console.log in production code
      // Use console.warn/error for real issues, or a logger utility
      "no-console": [
        "error",
        { allow: ["warn", "error", "info"] },
      ],

      // debugger statements must never reach a commit
      "no-debugger": "error",

      // Prevents accidental fall-through in switch (tsconfig has this off)
      "no-fallthrough": "error",

      // Catch returning from a Promise without await
      "no-async-promise-executor": "error",

      // Avoid reassigning function params — common source of bugs
      "no-param-reassign": [
        "warn",
        {
          props: true,
          ignorePropertyModificationsFor: [
            "acc",
            "state",
          ],
        },
      ],

      // Prefer const over let where variable is never reassigned
      "prefer-const": "error",

      // Disallow var entirely
      "no-var": "error",

      // Require === over == always
      eqeqeq: ["error", "always", { null: "ignore" }],
    },
  },

  // ── Relaxed rules for test files ─────────────────────────────────────
  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}", "src/test/**/*.{ts,tsx}"],
    rules: {
      // Tests legitimately use any for mocks
      "@typescript-eslint/no-explicit-any": "off",
      // Tests use console for debugging
      "no-console": "off",
      // Tests can have empty mock functions
      "@typescript-eslint/no-empty-function": "off",
      // no-unsanitized is irrelevant in test files
      "no-unsanitized/method": "off",
      "no-unsanitized/property": "off",
    },
  },

  // ── Storybook stories ─────────────────────────────────────────────────
  ...storybook.configs["flat/recommended"],
);