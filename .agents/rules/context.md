---
trigger: always_on
---

# Africa DevOps Summit — Agent Context Overview

> [!IMPORTANT]
> **This file is an overview.** Due to character limits, the full, single source of truth for all AI coding agents is located at `.agents/CONTEXT.md`.
> **YOU MUST ALWAYS USE THE `view_file` TOOL TO READ `.agents/CONTEXT.md` AT THE START OF ANY TASK.**
> It contains the complete project structure, component patterns, testing rules, and design system.

> Last updated: March 2026

---

## 1. What This Project Is

The **Africa DevOps Summit** website (`devopssummit.africa`) is Africa's premier DevOps, Cloud & SRE conference website. It is the event's primary digital presence — handling marketing, speaker showcases, schedule, ticket information, sponsor engagement, and past summit archives.

**This is a frontend-only static SPA.** There is no backend server, no database, no server-side rendering, and no API owned by this project. Everything compiles to a flat `dist/` folder deployed to cPanel shared hosting.

**The community behind it:** The site is maintained by a mix of core organizers, volunteers, and open source contributors from the African DevOps community. Code quality, accessibility, and contributor experience matter as much as features.

---

## 2. Tech Stack — Exactly This, Nothing Else

| Layer          | Technology           | Version | Notes                                                                                           |
| -------------- | -------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| Framework      | React                | 18.x    | Functional components + hooks only. No class components.                                        |
| Language       | TypeScript           | 5.x     | Strict mode. No `any`. No type assertions unless unavoidable.                                   |
| Build Tool     | Vite                 | 8.x     | Dev server at `http://localhost:5173`                                                           |
| Styling        | Tailwind CSS         | 4.x     | Utility-first. Semantic tokens only. No raw color values.                                       |
| UI Components  | shadcn/ui            | Latest  | Built on Radix UI. Generated into `src/components/ui/`.                                         |
| Animations     | Framer Motion        | Latest  | `fadeUp` variant pattern. Respect `prefers-reduced-motion`.                                     |
| Routing        | React Router DOM     | v7      | Client-side SPA routing. `<Link>` and `useNavigate` only. Imports come from `react-router-dom`. |
| Icons          | Lucide React         | Latest  | Import individually. Never import the entire library.                                           |
| Fonts          | Sora + Inter         | —       | Via Google Fonts. `font-heading` = Sora. `font-body` = Inter.                                   |
| Sanitization   | DOMPurify            | Latest  | Via `SafeHtml` component. Never use `dangerouslySetInnerHTML` directly.                         |
| Image CDN      | Cloudinary           | —       | `nairobidevops` account. Full URLs in data files.                                               |
| Server state   | TanStack React Query | v5      | Installed and configured. Use for all CMS/API calls. Do NOT remove.                             |
| Env validation | Custom               | —       | `src/config/validateEnv.ts`. Runs at app boot in `main.tsx`.                                    |

### What is NOT in this project

Do not suggest, install, or reference any of the following — they are not used and should not be added without an explicit architectural decision:

- ❌ Next.js, Remix, Astro, Nuxt, SvelteKit — this is Vite + React, not a meta-framework
- ❌ Redux, Zustand, Jotai, MobX — no global state library; use React `useState`
- ❌ Axios — use native `fetch` or React Query
- ❌ Styled Components, CSS Modules, Emotion — Tailwind only
- ❌ Jest — use Vitest as the testing framework (see Section 11)
- ❌ Express, Fastify, any server framework — there is no backend
- ❌ Prisma, Mongoose, any ORM — there is no database
- ❌ `next/image`, `next/link`, `next/router` — wrong framework
- ❌ Lovable, Supabase — legacy scaffolding references, not in use

---

## 3. Full Project Context

This file is truncated to adhere to system limits.

**For full project details, you are REQUIRED to read `.agents/CONTEXT.md` using your `view_file` tool.**
It includes:

1. Complete Project Structure.
2. Routing Maps.
3. Design System & CSS Variables.
4. Component Patterns (e.g., `SpeakerCard`).
5. Testing Protocols (Vitest constraints).

Do not formulate plans or write code before consulting the full `CONTEXT.md`.
