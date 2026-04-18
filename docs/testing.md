# Testing

This project uses automated checks in local development and GitHub Actions to keep the site stable, fast, and safe.

## Test Stack

| Tool            | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| Vitest          | Unit and component testing                           |
| Testing Library | User-focused React interaction tests                 |
| jsdom           | Browser-like environment for component tests         |
| Storybook       | Isolated UI development and visual review            |
| Chromatic       | Hosted Storybook review workflow                     |
| Lighthouse CI   | Performance, accessibility, and best-practice checks |

## Test File Locations

All tests live in a single canonical directory:

- `src/tests/`

New tests should be added to `src/tests/`. Follow the naming pattern already used in that directory (e.g., `MyComponent.test.tsx`, `myHook.test.ts`).

## Common Commands

```sh
npm run test
npm run test:watch
npm run test:coverage
npm run test:ui
```

### Related quality commands

```sh
npm run typecheck
npm run lint
npm run build
```

## What The Current Suite Covers

The existing tests focus on:

- environment validation
- utility helpers
- ImageKit helpers and paths
- selected UI and landing-page components

The app also has Storybook stories for reusable UI and a CI workflow that enforces build-time quality gates.

## Vitest Configuration Highlights

The test runner is configured in `vitest.config.ts` with:

- `jsdom` as the environment
- global test APIs enabled
- setup file: `src/tests/setup.ts`
- coverage provider: `v8`
- coverage reports: text, lcov, html

### Coverage thresholds

CI will fail if coverage drops below:

- lines: 60%
- branches: 55%
- functions: 60%
- statements: 60%

Generated shadcn-style UI files and some bootstrap files are excluded from coverage to keep the threshold focused on project-owned logic.

## CI Quality Gates

The GitHub Actions workflow currently runs:

- TypeScript type checking
- ESLint
- Prettier check
- Vitest with coverage
- production build verification
- npm audit
- Gitleaks secret scan
- bundle size budgets
- Lighthouse CI on qualifying pull requests

The workflow file is [`.github/workflows/ci.yml`](../.github/workflows/ci.yml).

## When To Add Tests

Add or update tests when you:

- change data transformation logic
- touch custom hooks
- add conditional rendering or validation logic
- fix a user-facing bug that can regress

For purely presentational tweaks, manual QA plus Storybook review may be enough, but use judgment.

## Manual QA Checklist

For UI changes, verify:

- desktop and mobile layouts
- navigation and route transitions
- loading and empty states
- links and CTAs
- accessibility-sensitive interactions such as dialogs, menus, and accordions

## Storybook Notes

Use Storybook when working on reusable UI. The main commands are:

```sh
npm run storybook
npm run build-storybook
```

If you add a reusable component, consider adding or updating a story so visual behavior is easier to review.

## Troubleshooting

### Tests fail because env vars are missing

Provide the same required public ImageKit variables you use for local development, or run through the existing npm scripts that match CI expectations.

### Coverage drops unexpectedly

Check whether your new files are included by the test glob but excluded from coverage rules, or whether a refactor moved logic into an untested branch.

### Build passes locally but fails in CI

Compare your local commands with the CI commands, especially:

- `npm run build`
- `npm run test:coverage`
- any job-specific env vars in `.github/workflows/ci.yml`
