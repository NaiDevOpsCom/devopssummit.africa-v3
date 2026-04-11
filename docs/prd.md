# Product Requirements Document

This PRD summarizes what the Africa DevOps Summit website is for, what it currently ships, and where the product is expected to evolve next.

## Product Overview

The site is the public web presence for the Africa DevOps Summit. It supports four main jobs:

- explain the event clearly to attendees
- help visitors decide to register or sponsor
- showcase speakers, summit history, and community credibility
- give organizers a maintainable place to publish summit content

The current implementation is a static React application with no application backend.

## Primary Audiences

- DevOps engineers, SREs, platform engineers, and cloud practitioners
- engineering leaders and hiring teams
- sponsors and ecosystem partners
- community members exploring previous summit editions
- contributors maintaining the website and summit content

## Product Goals

### Inform

Visitors should quickly understand:

- what the summit is
- when and where it is happening
- who should attend
- where to find answers about logistics, sponsors, and tickets

### Convert

The site should move visitors toward:

- ticket purchase or registration
- sponsor inquiry
- deeper trust through past-summit proof points

### Represent the community well

The site should feel credible, welcoming, and polished on mobile and desktop.

## Current Product Scope

### Routes

The app currently includes:

- `/`
- `/about`
- `/schedule`
- `/sponsorship`
- `/past-summits`
- `/faqs`
- `/code-of-conduct`
- `/privacy-policy`
- `*` not found fallback

### Key homepage sections

- hero
- about
- upcoming event
- speakers preview
- tickets
- benefits
- sponsors
- FAQ preview
- team

### Historical and credibility features

- past summit metadata
- archived speakers and sponsors
- image gallery
- growth metrics

## Content Strategy

The site currently uses a hybrid content model:

- static TypeScript content in `src/data`
- generated gallery data from ImageKit
- future CMS-friendly architecture through React Query and typed data boundaries

This keeps the current editing workflow simple while leaving room for later CMS adoption.

## Technical Constraints

- static SPA, no server runtime in this repo
- browser-side routing only
- environment variables are baked into the build when prefixed with `VITE_`
- any public-host deployment must support SPA rewrites
- security headers and static asset handling must be preserved across hosts

## Non-Functional Requirements

### Performance

- fast initial load on mobile networks
- static asset optimization through Vite and compression
- Lighthouse CI coverage for qualifying PRs

### Accessibility

- keyboard-friendly navigation
- semantic structure
- accessible primitives through Radix/shadcn-style components
- readable contrast and responsive layouts

### Maintainability

- documentation must stay aligned with the repo
- summit content should remain easy to update
- CI should catch regressions in type safety, formatting, tests, and build quality

## Success Signals

The repository does not currently track all business KPIs in code, but the website should support measurement of:

- traffic to summit pages
- ticket CTA engagement
- sponsor CTA engagement
- page performance and accessibility
- contributor onboarding speed

## Product Roadmap

### Near term

- keep summit content current for upcoming editions
- improve documentation and contributor onboarding
- continue performance and quality enforcement in CI
- refine gallery and historical summit content

### Medium term

- move more frequently changing content to a CMS
- make the schedule and speaker workflows less data-file heavy
- expand analytics and observability where it adds value

### Longer term

- richer editorial workflows for organizers
- more dynamic summit content
- stronger self-serve operations for non-developer contributors

## Open Product Questions

These are still worth revisiting as the project evolves:

- which content should move to a CMS first
- how ticketing and sponsorship workflows should deepen over time
- whether future deployment needs preview and release tooling beyond the current static host setup
- how much historical summit content should be treated as first-class editorial content

## Related Docs

- [README.md](../README.md)
- [architecture.md](./architecture.md)
- [CMS_SCHEMA.md](./CMS_SCHEMA.md)
- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)
