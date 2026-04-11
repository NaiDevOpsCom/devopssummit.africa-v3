# Changelog

All notable changes to the Africa DevOps Summit website are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> This changelog is maintained manually. Update it when a PR introduces a notable user-facing, architectural, or tooling change.

---

## [Unreleased]

### Changed

- Documentation refresh across `README.md` and `docs/` to align the project stack, hosting model, testing workflow, content editing guidance, and architecture notes with the current codebase.

---

## [0.3.0] - 2026-03-15

### Summary

Documentation overhaul ahead of broader community contribution.

### Added

- `docs/architecture.md`
- `docs/contributing.md`
- `docs/security.md`
- `.env.example`
- expanded `README.md`

### Changed

- contributor workflow and project docs were rewritten for community onboarding

---

## [0.2.0] - 2025-12-01

### Summary

MVP feature complete with the core event pages and historical summit experience.

### Added

- `/past-summits`
- `/sponsorship`
- `/schedule`
- `/faqs`
- `/code-of-conduct`
- `/privacy-policy`
- environment validation and safe HTML rendering helpers
- ImageKit gallery sync script

### Changed

- navigation behavior for homepage hash links and route links
- design tokens moved to CSS variables in `index.css`

### Fixed

- mobile menu layering issues
- navbar active state on `/past-summits`

---

## [0.1.0] - 2025-09-01

### Summary

Initial scaffold and first working version of the v3 site.

### Added

- Vite + React + TypeScript project scaffold
- Tailwind styling system
- shadcn/ui configuration
- homepage and supporting static routes
- shared data model in `src/data` and `src/types`

[Unreleased]: https://github.com/NaiDevOpsCom/devopssummit.africa-v3/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/NaiDevOpsCom/devopssummit.africa-v3/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/NaiDevOpsCom/devopssummit.africa-v3/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/NaiDevOpsCom/devopssummit.africa-v3/releases/tag/v0.1.0
