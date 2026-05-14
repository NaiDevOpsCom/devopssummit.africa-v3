# Product Requirements Document (PRD)

> **Africa DevOps Summit — Website Revamp**
> Last updated: March 2026
> Status: 🟡 MVP Done — Actively Iterating

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [Target Audience](#3-target-audience)
4. [Tech Stack](#4-tech-stack)
5. [Project Structure](#5-project-structure)
6. [Content Strategy](#6-content-strategy)
7. [Pages & Features](#7-pages--features)
8. [User Flows](#8-user-flows)
9. [Design System](#9-design-system)
10. [Deployment & Hosting](#10-deployment--hosting)
11. [Contributing Guide](#11-contributing-guide)
12. [Open Questions & TODOs](#12-open-questions--todos)
13. [Future Roadmap](#13-future-roadmap)

---

## 1. Project Overview

**Africa DevOps Summit** is Africa's premier DevOps, Cloud & SRE conference. This repository contains the official conference website — a frontend-only React application that serves as the event's primary digital presence.

The website handles:
- Marketing and event promotion
- Speaker and schedule showcasing
- Ticket sales (currently via external provider)
- Sponsor engagement and acquisition
- Community building and past edition archiving

The site is a **public-facing, community-driven project**. It is maintained by a mix of core organizers, volunteers, and open source contributors. This PRD is the single source of truth for what the site is, how it works, and where it's going.

---

## 2. Goals & Success Metrics

### Primary Goals

| Goal | Description |
|---|---|
| **Inform** | Give attendees all the information they need to attend the summit |
| **Convert** | Drive ticket purchases and sponsor inquiries |
| **Credibility** | Showcase past editions to build trust with new attendees and sponsors |
| **Community** | Serve as a home for the African DevOps community year-round |

### Success Metrics

| Metric | Target (to be defined) |
|---|---|
| Unique monthly visitors | `TODO: set target` |
| Ticket conversion rate | `TODO: set target` |
| Sponsor inquiry volume | `TODO: set target` |
| Newsletter sign-up count | `TODO: set target` |
| Bounce rate | `TODO: set target` |
| Average session duration | `TODO: set target` |

---

## 3. Target Audience

| Segment | Description |
|---|---|
| **DevOps & SRE Engineers** | Practitioners looking for learning, networking, and career growth |
| **Software Developers** | Full-stack, backend, and frontend engineers embracing DevOps culture |
| **Tech Leaders** | CTOs, Engineering Managers, VPs of Engineering scouting talent and trends |
| **Students & New Grads** | Aspiring professionals entering the DevOps space |
| **Sponsors & Partners** | Companies targeting Africa's engineering talent pipeline |
| **Community Contributors** | Open source contributors and meetup organizers in the African tech ecosystem |

---

## 4. Tech Stack

This is a **frontend-only** application. There is no dedicated backend server.

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | [React](https://react.dev/) 18+ | UI component library |
| **Build Tool** | [Vite](https://vitejs.dev/) | Fast dev server and bundler |
| **Language** | TypeScript | Strict typing enforced throughout |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| **Component Library** | [shadcn/ui](https://ui.shadcn.com/) | Accessible, unstyled component primitives |
| **Content** | Static + CMS (mixed) | See [Content Strategy](#6-content-strategy) |
| **Package Manager** | `TODO: confirm — npm / pnpm / yarn` | |
| **Linting** | `TODO: confirm — ESLint + Prettier?` | |

### Key Constraints

- **No backend/server-side rendering** — the site is a static SPA deployed to shared hosting
- All API calls (e.g. CMS, ticketing) are client-side only
- Environment variables are build-time only (Vite `import.meta.env`)
- No sensitive secrets should ever be committed to the repository

---

## 5. Project Structure

> **Note for contributors:** The structure below reflects the intended architecture. Update this section if it drifts from the actual repo layout.

```
africa-devops-summit/
├── public/                  # Static assets (images, fonts, favicons)
│   └── assets/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # shadcn/ui generated components (do not edit manually)
│   │   └── shared/          # Custom shared components (Navbar, Footer, etc.)
│   ├── pages/               # Route-level page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Schedule.tsx
│   │   ├── Sponsorship.tsx
│   │   ├── PastSummits.tsx
│   │   ├── FAQ.tsx
│   │   ├── CodeOfConduct.tsx
│   │   └── PrivacyPolicy.tsx
│   ├── data/                # Static content and mock data (JSON / TS)
│   ├── lib/                 # Utility functions and helpers
│   ├── hooks/               # Custom React hooks
│   ├── types/               # Shared TypeScript interfaces and types
│   ├── styles/              # Global styles and Tailwind config overrides
│   ├── App.tsx              # Root component and router setup
│   └── main.tsx             # Application entry point
├── .env.example             # Example environment variables (commit this)
├── .env.local               # Local secrets (never commit)
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── components.json          # shadcn/ui configuration
├── PRD.md                   # This document
└── README.md                # Quick-start guide for contributors
```

> `TODO: Confirm and update this structure once the repo is shared with contributors.`

---

## 6. Content Strategy

The site uses a **mixed content model** — some content is hardcoded (static), some is pulled from a CMS.

### Static Content (Hardcoded / TypeScript)

Used for content that changes infrequently or is tightly coupled to UI logic:

- Site configuration (event name, year, dates)
- Navigation links
- FAQ entries
- Code of Conduct and Privacy Policy text
- Sponsorship tier definitions and benefit tables
- Ticket tier definitions

Static content lives in `/src/data/` as `.ts` or `.json` files and is typed via interfaces in `/src/types/`.

### CMS-Managed Content

Used for content that changes per edition or requires non-developer updates:

- Speaker profiles (name, bio, photo, social links, talk title)
- Schedule/programme sessions
- Past summit recaps, photos, and testimonials
- Sponsor logos and profiles
- Blog posts / announcements (future)

> `TODO: Confirm CMS provider (e.g. Sanity, Contentful, Notion API, Markdown/MDX files). Document the CMS schema and access instructions here once decided.`

### Content Update Workflow

1. **Static content** — edit the relevant file in `/src/data/`, open a PR, get review, merge
2. **CMS content** — update via CMS dashboard; no code change or deployment needed
3. **Images** — optimise before adding (use WebP where possible, keep files under 200KB)

---

## 7. Pages & Features

### 7.1 Landing Page (`/`)

The primary marketing page. High traffic, high conversion priority.

**Sections:**

| Section | Description | Content Source |
|---|---|---|
| Hero | Event name, tagline, date, location, primary CTA ("Get Tickets") | Static |
| About | Short event summary and value proposition | Static |
| Upcoming Event | Date, venue, countdown timer | Static |
| Speakers Preview | 6–8 featured speakers with headshots and titles | CMS |
| Ticket Tiers | Pricing cards with tier benefits | Static |
| Attendance Benefits | Why you should attend (icons + copy) | Static |
| Sponsor Logos | Logo grid of current sponsors | CMS |
| Sponsor CTA | "Become a Sponsor" banner with link to `/sponsorship` | Static |
| Organising Team | Photos and names of core organisers | Static / CMS |
| FAQ Preview | Top 4–5 FAQs with link to full `/faqs` page | Static |

---

### 7.2 About (`/about`)

Tells the story of the summit and the community behind it.

**Sections:**

| Section | Description | Content Source |
|---|---|---|
| Mission & Vision | What the summit stands for | Static |
| Core Values | Innovation, Community, Diversity, Excellence | Static |
| Who Attends | Audience breakdown with visual indicators | Static |
| Nairobi DevOps Community | Spotlight on the organising community | Static / CMS |
| Journey Timeline | Visual timeline: 2024 → 2025 → 2026 | Static |

---

### 7.3 Schedule (`/schedule`)

Full two-day conference programme.

**Sections:**

| Section | Description | Content Source |
|---|---|---|
| Day Tabs | Toggle between Day 1 and Day 2 | — |
| Session Cards | Time, title, speaker, track, room | CMS |
| Speaker Profiles | Keynotes, panelists, workshop facilitators | CMS |
| Download Programme | Link to downloadable PDF | Static (file in `/public`) |
| Add to Calendar | `.ics` file download or Google Calendar link | Static |

**Notes for contributors:**
- Sessions should be typed via a `Session` interface in `/src/types/`
- Tracks should be defined as an enum or constant for consistency
- The schedule must be responsive — consider mobile-first card layout vs. desktop table

---

### 7.4 Sponsorship (`/sponsorship`)

Converts prospective sponsors into inquiries.

**Sections:**

| Section | Description | Content Source |
|---|---|---|
| Why Sponsor | Metrics, audience reach, value narrative | Static |
| Audience Breakdown | Visual progress bars by segment | Static |
| Sponsorship Tiers | Community, Silver, Gold, Platinum — benefits table | Static |
| Benefits Overview | Shared benefits across all tiers | Static |
| Past Sponsor Testimonials | Quotes from previous sponsors | CMS |
| Contact CTA | Email link + sponsor deck download button | Static |

**Sponsorship Tier Summary:**

| Tier | `TODO: price` | Key Benefits |
|---|---|---|
| Community | — | Logo on website, social mention |
| Silver | — | + Booth space, programme listing |
| Gold | — | + Speaking slot, email feature |
| Platinum | — | + All Gold + premier branding, exclusive access |

> `TODO: Finalise tier pricing and benefits table with the organising team.`

---

### 7.5 Past Summits (`/past-summits`)

Builds credibility by showcasing past editions.

**Sections:**

| Section | Description | Content Source |
|---|---|---|
| Year Selector | Tab toggle: 2024, 2025 | — |
| Edition Overview | Theme, date, venue, attendance metrics | CMS |
| Event Recap | Embedded video + written recap | CMS |
| Highlights | Key moments from the edition | CMS |
| Speaker Archive | Full speaker list for that year | CMS |
| Photo Gallery | Grid with lightbox viewer | CMS |
| Community Testimonials | Attendee quotes | CMS |
| Sponsor Highlights | Sponsors for that edition | CMS |
| Growth Visualisation | Year-on-year metrics chart | Static / CMS |

**Notes for contributors:**
- Each year's data should be isolated (e.g. `data/past-summits/2024.ts`) for easy extension
- The photo gallery lightbox should be keyboard accessible
- Video embeds should be lazy-loaded

---

### 7.6 FAQs (`/faqs`)

**Content source:** Static (`/src/data/faqs.ts`)

FAQs are grouped by category (e.g. Tickets, Venue, Speaking, Sponsorship). Uses an accordion component from shadcn/ui. Searchable filtering is a stretch goal.

---

### 7.7 Code of Conduct (`/code-of-conduct`)

Long-form text page. Static content. Include a clear incident reporting contact (email or form link).

---

### 7.8 Privacy Policy (`/privacy-policy`)

Long-form text page. Static content. Must be kept up to date with any new data collection integrations (e.g. analytics, newsletter sign-ups).

---

## 8. User Flows

### Attendee Flow
```
Homepage → Browse Speakers & Schedule → Review Ticket Tiers → Click "Get Tickets" → External ticketing page
```

### Sponsor Flow
```
Homepage or /sponsorship → Review audience metrics & tiers → Download sponsor deck OR click email CTA → Organiser follow-up
```

### Community Explorer Flow
```
/past-summits → Toggle year → Watch recap / view photos → Read testimonials → Navigate to upcoming event
```

### Contributor Flow
```
README.md → PRD.md → Clone repo → npm install → npm run dev → Pick an open GitHub Issue → Open PR
```

---

## 9. Design System

### Component Library

- **shadcn/ui** is the base component library. Components are generated into `/src/components/ui/` — **do not manually edit these files**. Re-run the shadcn CLI to update them.
- Custom components live in `/src/components/shared/` and must be built with Tailwind utility classes only.

### Tailwind Configuration

- All design tokens (colors, spacing, typography) are defined in `tailwind.config.ts`
- Do not use arbitrary Tailwind values (e.g. `w-[347px]`) — define custom tokens in the config instead
- Dark mode: `TODO: confirm strategy — class-based or media-query`

### Brand Tokens

> `TODO: Fill in once brand guidelines are confirmed.`

```ts
// tailwind.config.ts — example structure to complete
colors: {
  brand: {
    primary: 'TODO',      // e.g. '#FF6B00' (orange)
    secondary: 'TODO',    // e.g. '#1A1A2E' (dark navy)
    accent: 'TODO',
    background: 'TODO',
    surface: 'TODO',
    text: 'TODO',
  }
}
```

### Typography

> `TODO: Confirm font choices and add to config.`

| Role | Font | Notes |
|---|---|---|
| Display / Headings | `TODO` | Used for hero text and section titles |
| Body | `TODO` | Used for paragraphs and UI text |
| Mono | `TODO` | Used for code snippets if any |

### Accessibility Standards

- All interactive elements must be keyboard navigable
- Images must have descriptive `alt` text
- Colour contrast must meet **WCAG 2.1 AA** minimum
- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`)
- shadcn/ui components are built on Radix UI primitives and are accessible by default — do not override ARIA attributes without reason

---

## 10. Deployment & Hosting

- **Target:** cPanel shared hosting (static site deployment)
- **Build output:** `dist/` directory generated by `vite build`
- **Deploy steps:**
  1. Run `npm run build` locally or in CI
  2. Upload contents of `dist/` to the cPanel `public_html` directory via FTP or File Manager
  3. Ensure `.htaccess` is configured for SPA routing (all paths redirect to `index.html`)

### SPA Routing on cPanel

Because this is a React SPA, all routes must be handled client-side. Add the following `.htaccess` to the `public_html` root:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

### Environment Variables

- Use `.env.local` for local development (never commit this file)
- Use `.env.example` to document required variables (always keep this updated)
- For production on cPanel, environment variables must be baked in at build time — store them securely and inject during the CI/CD build step

> `TODO: Document CI/CD pipeline once set up (e.g. GitHub Actions → build → FTP deploy to cPanel).`

---

## 11. Contributing Guide

### Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/TODO_ORG/TODO_REPO.git
cd africa-devops-summit

# 2. Install dependencies
npm install        # or pnpm install

# 3. Copy environment variables
cp .env.example .env.local
# Fill in any required values in .env.local

# 4. Start the development server
npm run dev

# 5. Open in browser
# http://localhost:5173
```

> `TODO: Confirm package manager, repo URL, and any required .env values.`

### Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code — protected, requires PR review |
| `dev` | Integration branch for active development |
| `feat/your-feature` | Feature branches — branch off `dev` |
| `fix/your-fix` | Bug fix branches — branch off `dev` |

### Pull Request Process

1. Branch off `dev` using the naming convention above
2. Keep PRs focused — one feature or fix per PR
3. Ensure `npm run build` passes with no errors before opening a PR
4. Fill in the PR template (link to issue, screenshots for UI changes)
5. Request review from at least one core maintainer
6. Squash and merge into `dev`

### Code Standards

- **TypeScript** — no `any` types; define interfaces in `/src/types/`
- **Components** — functional components with hooks only; no class components
- **Styling** — Tailwind classes only; no inline styles, no external CSS files except globals
- **Naming** — PascalCase for components, camelCase for functions/variables, kebab-case for files
- **Imports** — use absolute path aliases (e.g. `@/components/`) not relative `../../../`

### Adding a shadcn/ui Component

```bash
npx shadcn@latest add <component-name>
# e.g. npx shadcn@latest add dialog
```

This generates the component into `/src/components/ui/`. Do not manually edit files in that folder.

### Updating CMS Content

> `TODO: Document CMS access, schema, and update process once CMS is confirmed.`

### Reporting Issues

- Use GitHub Issues with the appropriate label (`bug`, `enhancement`, `content`, `design`)
- For content corrections, use the `content` label and describe the current vs. expected text
- For security issues, do **not** open a public issue — email `TODO: security contact email` directly

---

## 12. Open Questions & TODOs

These are items that need decisions or information from the core team before they can be implemented or documented.

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | What is the 2026 conference date and venue? | Organising team | ⬜ Open |
| 2 | What is the GitHub organisation and repo URL? | Core team | ⬜ Open |
| 3 | What are the confirmed brand colours and fonts? | Design lead | ⬜ Open |
| 4 | What are the ticket tiers, pricing, and ticketing platform? | Organising team | ⬜ Open |
| 5 | Which CMS has been chosen (Sanity, Contentful, MDX, etc.)? | Core team | ⬜ Open |
| 6 | What integrations are needed at launch (analytics, newsletter, etc.)? | Core team | ⬜ Open |
| 7 | What is the package manager for this project (npm / pnpm / yarn)? | Core team | ⬜ Open |
| 8 | Is dark mode in scope for this version? | Design lead | ⬜ Open |
| 9 | What is the CI/CD pipeline for deploying to cPanel? | DevOps lead | ⬜ Open |
| 10 | Who has cPanel access and what is the deployment process for non-devs? | Infra lead | ⬜ Open |
| 11 | Is there a staging environment or is it deploy-straight-to-prod? | Infra lead | ⬜ Open |
| 12 | What is the security/incident reporting contact email? | Organising team | ⬜ Open |

---

## 13. Future Roadmap

Features and improvements planned beyond the current MVP:

### Short-term (Next iteration)
- [ ] CI/CD pipeline — automated build and FTP deploy to cPanel on merge to `main`
- [ ] Newsletter sign-up form (Mailchimp / ConvertKit integration)
- [ ] Search/filter on `/faqs` page
- [ ] Improved mobile navigation (drawer/hamburger menu)
- [ ] Optimised image loading (lazy load, WebP conversion)

### Medium-term
- [ ] Online ticket purchasing (Stripe, Luma, or Eventbrite integration)
- [ ] Speaker CFP (Call for Papers) submission form
- [ ] Blog / news section for event updates and community content
- [ ] Multilingual support — Swahili and French
- [ ] CMS migration for all dynamic content (if not already done)

### Long-term / Vision
- [ ] User authentication and personalised schedule builder
- [ ] Live event streaming integration
- [ ] Attendee networking platform (pre-event matchmaking)
- [ ] CMS-driven site management (non-dev content updates for all sections)
- [ ] Native mobile app or PWA

---

## Appendix

### Glossary

| Term | Definition |
|---|---|
| **SPA** | Single Page Application — the entire site is one HTML file; routing is handled in the browser by React Router |
| **CMS** | Content Management System — a tool that lets non-developers update website content |
| **shadcn/ui** | A component library that generates accessible, unstyled React components into your codebase |
| **Vite** | The build tool that compiles and bundles the React + TypeScript code for the browser |
| **cPanel** | A web hosting control panel used to manage shared hosting — where the built site files are uploaded |
| **`.htaccess`** | An Apache server configuration file needed to make SPA routing work on cPanel hosting |

### Key Contacts

| Role | Name | Contact |
|---|---|---|
| Project Lead | `TODO` | `TODO` |
| Design Lead | `TODO` | `TODO` |
| DevOps / Infra Lead | `TODO` | `TODO` |
| CMS / Content Lead | `TODO` | `TODO` |
| Sponsorship Lead | `TODO` | `TODO` |

---

*This PRD is a living document. If you make a significant architectural or product decision, update this file as part of your PR.*