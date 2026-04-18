# Architecture

This document describes how the Africa DevOps Summit website is put together today. It focuses on the code and runtime behavior that contributors need to understand before changing features, content, or build tooling.

## System Overview

The site is a static single-page application built with React, Vite, and TypeScript.

- There is no application backend in this repository
- Most content is imported from `src/data` at build time
- Routing is client-side through React Router
- The final output is a static `dist/` directory
- Third-party services are used for image delivery, analytics, and build-time gallery sync

At startup, the app validates public environment variables, initializes optional analytics, mounts shared providers, and then renders the router.

## Runtime Stack

| Layer         | Technology           | Notes                            |
| ------------- | -------------------- | -------------------------------- |
| Framework     | React                | See [versions.md](./versions.md) |
| Language      | TypeScript           | See [versions.md](./versions.md) |
| Bundler       | Vite                 | See [versions.md](./versions.md) |
| Routing       | React Router DOM     | See [versions.md](./versions.md) |
| Server state  | TanStack React Query | See [versions.md](./versions.md) |
| Styling       | Tailwind CSS         | See [versions.md](./versions.md) |
| UI primitives | Radix UI + shadcn/ui | See [versions.md](./versions.md) |
| Animation     | Framer Motion        | See [versions.md](./versions.md) |
| SEO           | react-helmet-async   | Page-level head management       |
| Analytics     | PostHog              | Optional, controlled by env vars |
| Sanitization  | DOMPurify            | See [versions.md](./versions.md) |

## App Bootstrap

### `src/main.tsx`

This is the true runtime entry point. It is responsible for:

- importing global CSS
- validating environment variables
- initializing PostHog when configured
- mounting `HelmetProvider`
- mounting `PostHogProvider`
- mounting `ImageKitProvider`

### `src/App.tsx`

This file composes the app shell:

- `QueryClientProvider`
- tooltip and toast providers
- `BrowserRouter`
- `ScrollToTop`
- `ErrorBoundary`
- lazy route registration

The routes are currently:

- `/`
- `/about`
- `/schedule`
- `/sponsorship`
- `/code-of-conduct`
- `/privacy-policy`
- `/faqs`
- `/past-summits`
- `*` for not found

## Source Tree Map

```text
src/
├── main.tsx
├── App.tsx
├── index.css
├── components/
│   ├── layout/         # site-wide shell components
│   ├── landing/        # homepage sections
│   ├── ui/             # reusable primitives and wrappers
│   └── *.tsx           # shared cross-cutting components
├── pages/              # route-level pages
├── data/               # summit content and metadata
├── hooks/              # reusable React hooks
├── config/             # env access and validation
├── lib/                # shared utilities and integration config
├── context/            # React context definitions
├── utils/              # small non-React helpers
├── types/              # shared TS types
├── tests/              # Vitest suites and test setup
└── stories/            # Storybook stories
```

## Component Architecture

### `src/pages`

Each file in `src/pages` owns one route and assembles page-level sections. Pages are the place to wire data, SEO metadata, and large-scale layout.

### `src/components/layout`

Global shell elements such as the navbar and footer live here. Keep these generic and route-agnostic where possible.

### `src/components/landing`

Homepage sections are split into focused components such as `Hero`, `About`, `Speakers`, and `Tickets`. These are page-specific, not general-purpose primitives.

### `src/components/ui`

This folder contains reusable UI building blocks. Some files are generated or derived from shadcn/ui conventions, while others are custom wrappers used throughout the app. Treat this folder as the shared component layer.

### `src/components`

Top-level components outside the nested folders usually provide cross-cutting behavior, such as:

- `SEO.tsx`
- `SafeHtml.tsx`
- `SafeLink.tsx`
- `SummitGallery.tsx`
- `IKImage.tsx`
- `ScrollToTop.tsx`

## Content Model

The site currently uses a mixed content approach.

### Static TypeScript data

Most summit content is stored directly in `src/data`, including:

- speakers
- sponsors
- FAQs
- tickets
- benefits
- team members
- summit details and historical summit data

This keeps the current implementation simple and fast for local development.

### Generated content

Gallery data is generated into `src/data/gallery.generated.json` by the ImageKit sync script. This lets the Past Summits gallery behave like static data at runtime while still being refreshed from ImageKit during builds.

### External content and services

- ImageKit powers image delivery and gallery sync
- PostHog powers optional analytics
- future CMS work is anticipated, and React Query is already wired in to support it

## Environment And Config Layer

Environment access is centralized in `src/config/env.ts`.

Rules:

- do not access `import.meta.env` directly in random components
- add new public variables through `env.ts`
- validate required runtime variables in `validateEnv.ts`
- never put secrets in `VITE_` variables

At runtime the app derives `APP_ENV` from the hostname first, then falls back to `VITE_APP_ENV` or Vite mode. That makes production, staging, preview, and local environments behave differently without maintaining separate builds for each hostname.

## Performance And Build Strategy

The Vite configuration includes several production-focused optimizations:

- manual vendor chunking for common dependency groups
- gzip and brotli compression
- PWA manifest and service worker generation
- optional bundle analysis with `rollup-plugin-visualizer`
- `oxc` minification

The gallery sync script runs automatically before `build:bundle` unless `SKIP_GALLERY_FETCH=true` is set.

## Testing Strategy

The project uses:

- Vitest for unit and component tests
- Testing Library for React interactions
- jsdom as the browser-like test environment
- Storybook for isolated UI review
- Lighthouse CI for performance checks in CI

Coverage thresholds are defined in `vitest.config.ts`, and CI also enforces linting, type safety, security scans, and bundle budgets.

See [testing.md](./testing.md) for the operational testing guide.

## Hosting Model

This repository is designed for static hosting, not a long-running Node server.

Current host-facing files show compatibility with:

- Cloudflare Pages via `public/_headers` and `public/_redirects`
- Vercel via `vercel.json`

The important requirements are:

- serve `dist/`
- rewrite application routes to `index.html`
- apply security headers
- allow public assets such as the service worker and manifest

If the team changes hosts, update the deployment docs rather than reworking the app architecture unless the host requires a different runtime model.

## Key Contributor Rules

- Put route-level work in `src/pages`
- Put reusable UI in `src/components/ui`
- Put summit copy and metadata in `src/data`
- Put env access in `src/config/env.ts`
- Use `SafeHtml` for rendering raw HTML
- Use `SafeLink` or equivalent safe link behavior for untrusted URLs
- Keep generated gallery data out of manual edits unless you are intentionally fixing generated content

## Related Docs

- [README.md](../README.md)
- [contributing.md](./contributing.md)
- [testing.md](./testing.md)
- [environments.md](./environments.md)
- [imagekit.md](./imagekit.md)
- [imagekit-gallery.md](./imagekit-gallery.md)
