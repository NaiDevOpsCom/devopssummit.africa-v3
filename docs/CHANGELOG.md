# Changelog

All notable changes to the Africa DevOps Summit website are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **How this file is updated:**
> This changelog is maintained manually by the core team. Update this file as part of any PR that introduces a notable change. When merging to `main`, the release entry should be finalised and dated.
> See [CONTRIBUTING.md](./CONTRIBUTING.md) for commit conventions that map to changelog categories.

---

## [Unreleased]

Changes merged to `main` but not yet tagged as a release are listed here.
Move entries to a versioned release section when cutting a release.

### Added
- 

### Changed
- 

### Fixed
- 

### Removed
- 

---

## [0.3.0] — 2026-03-15

### Summary
Documentation overhaul — contributor-facing docs fully rewritten and expanded ahead of opening the project to community contributions.

### Added
- `PRD.md` — full product requirements document covering all pages, tech stack, content strategy, deployment, and open TODOs
- `CONTRIBUTING.md` — complete contributor guide covering setup, branching, commit conventions, PR process, code standards, shadcn/ui usage, and content contribution workflow
- `SECURITY.md` — security policy covering vulnerability reporting, attack surface overview, env var discipline, XSS prevention, CSP guidance for cPanel, and severity reference
- `docs/ARCHITECTURE.md` — architecture documentation covering system overview, folder structure, design system, state management, content model, build/deployment, testing expectations, and ADRs
- `README.md` — updated project README with badges, full table of contents, Node.js version requirement, available scripts table, contributing section, and documentation index
- `.env.example` — documents all required environment variables with dummy values
- Architecture Decision Records (ADRs) 001–005 documenting key technical decisions

### Changed
- `README.md` contributing section updated to reflect clone-and-PR workflow (no fork required) and issue/discussion-first contribution model

---

## [0.2.0] — 2025-12-01

### Summary
MVP feature complete — all core pages built and content populated for the 2026 summit.

### Added
- `/past-summits` page with year selector tabs, photo gallery with lightbox, speaker archive, and testimonials for 2024 and 2025 editions
- `/sponsorship` page with tier comparison table, audience breakdown, and sponsor CTA
- `/schedule` page with two-day programme, session cards, and speaker profiles
- `/faqs` page with accordion grouped by category
- `/code-of-conduct` and `/privacy-policy` static pages
- `SafeHtml` component for DOMPurify-sanitised HTML rendering
- `src/config/env.ts` and `src/config/validateEnv.ts` — centralized env access and startup validation
- `src/scripts/fetch-gallery.ts` — ImageKit gallery sync script with graceful fallback
- Framer Motion animations on all page sections (`fadeUp` variant)
- `SectionHeader`, `SpeakerCard`, `TicketCard`, `BenefitCard`, `StatBox`, `TeamCard` shared UI components

### Changed
- Navbar updated to support dual-mode navigation: hash-based scroll on homepage, route-based navigation on all other pages
- Design tokens migrated to HSL-based CSS variables in `index.css`

### Fixed
- Mobile menu overlay z-index conflict with hero section
- Navbar active state incorrect on `/past-summits` route

---

## [0.1.0] — 2025-09-01

### Summary
Initial project scaffold and core pages — first working version of the v3 website.

### Added
- Project scaffolded with Vite + React 18 + TypeScript
- Tailwind CSS configured with custom design tokens (brand blue, accent cyan, dark backgrounds)
- shadcn/ui installed and configured (`components.json`)
- Sora (headings) + Inter (body) typography via Google Fonts
- React Router DOM v6 routing with all page routes registered
- TanStack React Query installed and `QueryClientProvider` added to app tree
- Framer Motion installed
- DOMPurify installed
- `/` landing page with Hero, About, Speakers preview, Ticket tiers, Sponsor logos, FAQ preview, and Organising team sections
- `/about` page with mission, vision, core values, audience breakdown, and journey timeline
- `src/data/` static data files: `speakers.ts`, `sponsors.ts`, `tickets.ts`, `benefits.ts`, `faqs.ts`, `stats.ts`, `team.ts`, `pastSummits.ts`
- `src/types/index.ts` with shared TypeScript interfaces
- `src/hooks/use-mobile.tsx` and `use-toast.ts`
- `src/lib/utils.ts` with `cn()` class merger utility
- `NotFound` 404 page
- MIT License

---

## Changelog Categories Reference

When adding entries, use these standard categories:

| Category | Use for |
|---|---|
| `Added` | New features, pages, components, or documentation |
| `Changed` | Updates to existing functionality, design, or content |
| `Deprecated` | Features that will be removed in a future release |
| `Removed` | Features or files that have been deleted |
| `Fixed` | Bug fixes |
| `Security` | Security patches or vulnerability fixes |

---

## Versioning Guide

This project uses [Semantic Versioning](https://semver.org/):

| Version bump | When to use |
|---|---|
| `MAJOR` (x.0.0) | Breaking structural changes — e.g. full redesign, major routing change, CMS migration |
| `MINOR` (0.x.0) | New pages, significant new features, or notable content additions |
| `PATCH` (0.0.x) | Bug fixes, copy corrections, minor styling tweaks, dependency updates |

Pre-launch versions use `0.x.x`. The site will move to `1.0.0` at the first stable public launch.

---

## Automation Note

This changelog is currently maintained manually. When the CI/CD pipeline is set up (see [PRD open TODOs](./PRD.md#12-open-questions--todos)), consider adopting [`git-cliff`](https://git-cliff.org/) or [`release-please`](https://github.com/googleapis/release-please) to auto-draft entries from Conventional Commit messages. The format used here is fully compatible with both tools.

[Unreleased]: https://github.com/NaiDevOpsCom/devopssummit.africa-v3/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/NaiDevOpsCom/devopssummit.africa-v3/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/NaiDevOpsCom/devopssummit.africa-v3/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/NaiDevOpsCom/devopssummit.africa-v3/releases/tag/v0.1.0