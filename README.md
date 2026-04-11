# Africa DevOps Summit

Official website for the Africa DevOps Summit, a community-led conference for DevOps, Cloud, SRE, platform engineering, and modern software delivery across Africa.

[Live site](https://devopssummit.africa) · [Architecture](./docs/architecture.md) · [Contributing](./docs/contributing.md) · [Testing](./docs/testing.md) · [Content guide](./docs/CONTENT_GUIDE.md)

## Project Overview

This repository contains a static frontend application built for the summit's public web presence. It is responsible for:

- Marketing the event and sharing summit information
- Publishing speakers, sponsors, FAQs, and historical summit content
- Driving ticket and sponsorship conversions through external links and downloadable assets
- Providing an accessible, performant experience on mobile and desktop

The project does not run an application backend. It builds to a static `dist/` bundle and relies on browser-side routing plus third-party services such as ImageKit and PostHog.

## Stack

### Core app

- React 18
- TypeScript 5
- Vite 8
- React Router DOM 7
- TanStack React Query 5

### UI and styling

- Tailwind CSS 4
- Radix UI primitives
- shadcn/ui conventions
- Framer Motion
- Lucide React

### Content and integrations

- Static TypeScript data in `src/data`
- ImageKit for image delivery and gallery sync
- PostHog for optional analytics/session capture
- DOMPurify for safe HTML rendering

### Quality and tooling

- ESLint
- Prettier
- Vitest + Testing Library + jsdom
- Storybook + Chromatic
- Lighthouse CI
- Husky
- GitHub Actions CI

## Architecture At A Glance

```text
src/
├── main.tsx                  # App bootstrap and global providers
├── App.tsx                   # Router, React Query, toasts, error boundary
├── pages/                    # Route-level pages
├── components/
│   ├── layout/               # Navbar, footer, shared layout pieces
│   ├── landing/              # Homepage sections
│   └── ui/                   # Reusable UI primitives and wrappers
├── data/                     # Static content and summit metadata
├── hooks/                    # Custom React hooks
├── config/                   # Environment access and validation
├── lib/                      # Shared utilities and integration config
├── context/                  # React context providers
├── utils/                    # Small framework-agnostic helpers
├── types/                    # Shared TypeScript types
├── test/ and tests/          # Vitest suites and test utilities
└── stories/                  # Storybook stories
```

For a fuller walkthrough, see [docs/architecture.md](./docs/architecture.md).

## Getting Started

### Prerequisites

- Node.js `^20.19.0 || >=22.12.0`
- npm

### Installation

```sh
git clone git@github.com:NaiDevOpsCom/devopssummit.africa-v3.git
cd devopssummit.africa-v3
npm ci
cp .env.example .env.local
```

Fill in the required values in `.env.local`, then start the dev server:

```sh
npm run dev
```

The Vite dev server is configured for `http://localhost:8080`.

## Environment Variables

Environment variables are validated at app startup in `src/config/validateEnv.ts`.

### Required for local development

- `VITE_IMAGEKIT_URL_ENDPOINT`
- `VITE_IMAGEKIT_PUBLIC_KEY`

### Optional but supported

- `VITE_APP_ENV`
- `VITE_APP_NAME`
- `VITE_APP_VERSION`
- `VITE_PUBLIC_POSTHOG_KEY` or `VITE_PUBLIC_POSTHOG_TOKEN`
- `VITE_PUBLIC_POSTHOG_HOST`
- `VITE_API_BASE_URL`
- `VITE_ENABLE_DEVTOOLS`
- `VITE_DEBUG_IMAGES`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_SENTRY_DSN`

### Build-time only

- `IMAGEKIT_PRIVATE_KEY`

Never prefix secrets with `VITE_`. Any `VITE_` variable is bundled into the browser build.

See [docs/environments.md](./docs/environments.md) for the full environment model.

## Scripts

| Command                   | Purpose                                                 |
| ------------------------- | ------------------------------------------------------- |
| `npm run dev`             | Start the local Vite dev server                         |
| `npm run build`           | Run typecheck, lint, format check, and production build |
| `npm run build:bundle`    | Run `vite build` only                                   |
| `npm run preview`         | Preview the built app locally                           |
| `npm run typecheck`       | Run TypeScript with `--noEmit`                          |
| `npm run lint`            | Run ESLint                                              |
| `npm run lint:fix`        | Autofix lint issues where possible                      |
| `npm run format`          | Format the repo with Prettier                           |
| `npm run format:check`    | Check formatting only                                   |
| `npm run test`            | Run the Vitest suite                                    |
| `npm run test:watch`      | Run Vitest in watch mode                                |
| `npm run test:coverage`   | Run tests with coverage reporting                       |
| `npm run test:ui`         | Open the Vitest UI                                      |
| `npm run storybook`       | Start Storybook locally                                 |
| `npm run build-storybook` | Build Storybook statically                              |
| `npm run gallery:fetch`   | Refresh `src/data/gallery.generated.json` from ImageKit |
| `npm run lighthouse`      | Run Lighthouse against the configured app target        |

## Testing And Quality Gates

Before opening a pull request, run the checks relevant to your changes:

```sh
npm run typecheck
npm run lint
npm run test
npm run build
```

CI additionally runs coverage, security checks, bundle budgets, and Lighthouse on qualifying pull requests. See [docs/testing.md](./docs/testing.md) and [`.github/workflows/ci.yml`](./.github/workflows/ci.yml).

## Deployment Notes

The application is deployed as a static site. The repository currently includes:

- `public/_headers` and `public/_redirects` for Cloudflare Pages-style hosting
- `vercel.json` for Vercel-compatible rewrites

Whatever host is used, it must support:

- Serving the built `dist/` directory
- Rewriting all application routes to `index.html`
- Applying security headers at the edge or host layer

## Documentation Map

| File                                                   | Purpose                                                                   |
| ------------------------------------------------------ | ------------------------------------------------------------------------- |
| [docs/architecture.md](./docs/architecture.md)         | Runtime architecture, `src/` map, hosting model, and integration overview |
| [docs/contributing.md](./docs/contributing.md)         | Branching, setup, validation, and PR expectations                         |
| [docs/testing.md](./docs/testing.md)                   | Test strategy, commands, CI gates, and coverage expectations              |
| [docs/environments.md](./docs/environments.md)         | Environment detection and variable reference                              |
| [docs/security.md](./docs/security.md)                 | Security practices, vulnerability reporting, and config rules             |
| [docs/CONTENT_GUIDE.md](./docs/CONTENT_GUIDE.md)       | How to update summit content safely                                       |
| [docs/CMS_SCHEMA.md](./docs/CMS_SCHEMA.md)             | Current content model and future CMS candidates                           |
| [docs/imagekit.md](./docs/imagekit.md)                 | Runtime ImageKit integration                                              |
| [docs/imagekit-gallery.md](./docs/imagekit-gallery.md) | Build-time gallery sync workflow                                          |
| [docs/ui-components.md](./docs/ui-components.md)       | UI component map and component authoring rules                            |
| [docs/prd.md](./docs/prd.md)                           | Product goals, current scope, and roadmap                                 |
| [docs/CHANGELOG.md](./docs/CHANGELOG.md)               | Notable project changes                                                   |
| [docs/code-of-conduct.md](./docs/code-of-conduct.md)   | Community and contribution standards                                      |

## Contributing

All feature work should branch from `staging` and open pull requests back into `staging`. Production releases are promoted into `main` by maintainers.

Read [docs/contributing.md](./docs/contributing.md) before making non-trivial changes. If you are only updating event copy or summit data, [docs/CONTENT_GUIDE.md](./docs/CONTENT_GUIDE.md) is the quickest path.

## License

Released under the [MIT License](./LICENSE).
