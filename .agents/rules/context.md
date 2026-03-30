---
trigger: always_on
---

# Africa DevOps Summit — Agent Context

> **This is the single source of truth for all AI coding agents.**
> Read this entire file before generating any code, suggesting any changes,
> or answering any questions about this codebase.
> Last updated: March 2026

---

## 1. What This Project Is

The **Africa DevOps Summit** website (`devopssummit.africa`) is Africa's premier DevOps, Cloud & SRE conference website. It is the event's primary digital presence — handling marketing, speaker showcases, schedule, ticket information, sponsor engagement, and past summit archives.

**This is a frontend-only static SPA.** There is no backend server, no database, no server-side rendering, and no API owned by this project. Everything compiles to a flat `dist/` folder deployed to cPanel shared hosting.

**The community behind it:** The site is maintained by a mix of core organizers, volunteers, and open source contributors from the African DevOps community. Code quality, accessibility, and contributor experience matter as much as features.

---

## 2. Tech Stack — Exactly This, Nothing Else

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | React | 18.x | Functional components + hooks only. No class components. |
| Language | TypeScript | 5.x | Strict mode. No `any`. No type assertions unless unavoidable. |
| Build Tool | Vite | 5.x | Dev server at `http://localhost:5173` |
| Styling | Tailwind CSS | 3.x | Utility-first. Semantic tokens only. No raw color values. |
| UI Components | shadcn/ui | Latest | Built on Radix UI. Generated into `src/components/ui/`. |
| Animations | Framer Motion | Latest | `fadeUp` variant pattern. Respect `prefers-reduced-motion`. |
| Routing | React Router DOM | v6 | Client-side SPA routing. `<Link>` and `useNavigate` only. |
| Icons | Lucide React | Latest | Import individually. Never import the entire library. |
| Fonts | Sora + Inter | — | Via Google Fonts. `font-heading` = Sora. `font-body` = Inter. |
| Sanitization | DOMPurify | Latest | Via `SafeHtml` component. Never use `dangerouslySetInnerHTML` directly. |
| Image CDN | Cloudinary | — | `nairobidevops` account. Full URLs in data files. |
| Server state | TanStack React Query | v5 | Installed and configured. Use for all CMS/API calls. Do NOT remove. |
| Env validation | Custom | — | `src/config/validateEnv.ts`. Runs at app boot in `main.tsx`. |

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

## 3. Project Structure — Where Everything Lives

```
devopssummit.africa-v3/
├── .agents/
│   └── rules/
│       └── context.md               ← YOU ARE HERE — single source of truth for agents
│
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       ├── feature_request.md
│       ├── content_update.md
│       └── config.yml
│
├── docs/
│   ├── ARCHITECTURE.md          ← System design, ADRs, deployment
│   ├── CMS_SCHEMA.md            ← All content type schemas + known data issues
│   └── CONTENT_GUIDE.md         ← How to update data files (for non-developers)
│
├── public/                      ← Static assets served as-is (images, PDFs, favicons)
│   └── assets/
│
├── src/
│   ├── assets/                  ← Bundled static images (imported in components)
│   │
│   ├── components/
│   │   ├── landing/             ← Homepage-only section components
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Speakers.tsx
│   │   │   ├── Tickets.tsx
│   │   │   ├── Sponsors.tsx
│   │   │   └── [other sections]
│   │   ├── layout/              ← Global layout wrappers — used on every page
│   │   │   ├── Navbar.tsx       ← Dual-mode: hash scroll (homepage) + route nav
│   │   │   └── Footer.tsx
│   │   └── ui/                  ← TWO CATEGORIES — see note below
│   │       ├── SafeHtml.tsx     ← Custom — DOMPurify wrapper. Edit freely.
│   │       ├── SectionHeader.tsx ← Custom — consistent section titles. Edit freely.
│   │       ├── SpeakerCard.tsx  ← Custom — speaker display. Edit freely.
│   │       ├── TicketCard.tsx   ← Custom — ticket tier card. Edit freely.
│   │       ├── BenefitCard.tsx  ← Custom — benefit item. Edit freely.
│   │       ├── StatBox.tsx      ← Custom — metric display. Edit freely.
│   │       ├── TeamCard.tsx     ← Custom — team member card. Edit freely.
│   │       └── [accordion, button, dialog, tabs...] ← shadcn GENERATED — NEVER edit
│   │
│   ├── config/
│   │   ├── env.ts               ← Centralized env access — use Env.X, not import.meta.env
│   │   └── validateEnv.ts       ← Startup validation — runs before React mounts
│   │
│   ├── data/                    ← Static TypeScript content files
│   │   ├── speakers.ts          ← Record<number, Speaker[]> keyed by year
│   │   ├── sponsors.ts          ← Record<number, Sponsor[]> + sponsorTestimonials
│   │   ├── summitData.ts        ← Record<number, PastSummit> + GrowthMetric[]
│   │   ├── faqs.ts              ← FAQItem[] + faqCategories + homepageFaqs
│   │   ├── tickets.ts           ← Ticket[] — do not edit without developer review
│   │   ├── benefits.ts          ← Benefit[]
│   │   ├── stats.ts             ← Stat[]
│   │   └── team.ts              ← TeamMember[]
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx       ← Breakpoint detection
│   │   └── use-toast.ts         ← shadcn toast hook
│   │
│   ├── lib/
│   │   └── utils.ts             ← cn() class merger + misc helpers
│   │
│   ├── pages/                   ← One file per route
│   │   ├── Index.tsx            ← /
│   │   ├── AboutUs.tsx          ← /about
│   │   ├── Schedule.tsx         ← /schedule
│   │   ├── Sponsorship.tsx      ← /sponsorship
│   │   ├── PastSummits.tsx      ← /past-summits
│   │   ├── CodeOfConduct.tsx    ← /code-of-conduct
│   │   ├── PrivacyPolicy.tsx    ← /privacy-policy
│   │   ├── FAQs.tsx             ← /faqs
│   │   └── NotFound.tsx         ← * (404)
│   │
│   ├── scripts/
│   │   └── fetch-gallery.ts     ← Build-time ImageKit sync. Not bundled into app.
│   │
│   ├── test/                    ← Test files
│   │
│   ├── types/
│   │   └── index.ts             ← ALL shared TypeScript interfaces live here
│   │
│   ├── App.tsx                  ← Router config + QueryClientProvider
│   ├── main.tsx                 ← Entry point — calls validateEnv() before mounting
│   └── index.css                ← Global styles + CSS design tokens (HSL variables)
│
├── .env.example                 ← Committed — documents all required variables
├── .env.local                   ← NEVER committed — local secrets
├── tailwind.config.ts           ← Design tokens — add custom tokens here
├── tsconfig.json                ← TypeScript config — strict mode enabled
├── vite.config.ts               ← Vite config — includes @/ path alias
├── components.json              ← shadcn/ui config
├── PRD.md                       ← Product requirements document
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── SECURITY.md
└── LICENSE
```

---

## 4. Routing — All Routes

| Route | Component | Notes |
|---|---|---|
| `/` | `Index.tsx` | Landing page — homepage sections |
| `/about` | `AboutUs.tsx` | Mission, values, community, timeline |
| `/schedule` | `Schedule.tsx` | Two-day programme |
| `/sponsorship` | `Sponsorship.tsx` | Sponsor tiers and inquiry |
| `/past-summits` | `PastSummits.tsx` | Year-tabbed past editions |
| `/code-of-conduct` | `CodeOfConduct.tsx` | Static text page |
| `/privacy-policy` | `PrivacyPolicy.tsx` | Static text page |
| `/faqs` | `FAQs.tsx` | Accordion by category |
| `*` | `NotFound.tsx` | 404 fallback |

### Navbar navigation modes
The `Navbar` component operates in two modes:
- **On `/`** — hash-based scroll: `#speakers`, `#tickets`, `#schedule`, etc.
- **On all other routes** — React Router `<Link>` navigation

When linking from a non-home page to a homepage section, navigate to `/#section-id` not just `#section-id`.

---

## 5. Design System — Use These Exactly

### CSS Variables → Tailwind Tokens

All design tokens are HSL-based CSS variables defined in `src/index.css`. Always use Tailwind semantic tokens — never raw color values.

| CSS Variable | Tailwind Usage | Purpose |
|---|---|---|
| `--background` | `bg-background` / `text-background` | Page background |
| `--foreground` | `text-foreground` | Primary text |
| `--primary` | `bg-primary` / `text-primary` | Brand blue (`217 91% 60%`) |
| `--secondary` | `bg-secondary` / `text-secondary` | Accent cyan (`199 89% 60%`) |
| `--muted` | `bg-muted` | Subtle backgrounds |
| `--muted-foreground` | `text-muted-foreground` | Secondary / subdued text |
| `--dark-bg` | `bg-dark-bg` | Dark section backgrounds (`222 47% 11%`) |
| `--card-dark` | `bg-card-dark` | Dark card backgrounds |
| `--destructive` | `bg-destructive` / `text-destructive` | Error and warning states |
| `--border` | `border-border` | Borders |

```tsx
// ✅ Always correct
<div className="bg-background text-foreground border-border">
<h2 className="text-primary font-heading">
<section className="bg-dark-bg">

// ❌ Never do this
<div className="bg-white text-gray-900 border-gray-200">
<div style={{ backgroundColor: '#1a1a2e' }}>
<div className="bg-[#FF6B00]">
```

### Typography

```tsx
// Headings — Sora font
<h1 className="font-heading font-bold text-4xl">
<h2 className="font-heading font-semibold text-2xl">

// Body — Inter font
<p className="font-body text-base">
```

### Utility Classes

```tsx
// Responsive horizontal padding — use on all page sections
<section className="section-padding">

// Gradient text — primary to secondary
<span className="text-gradient">Africa DevOps Summit</span>
```

### Responsive Breakpoints

Always test and implement at all three:

| Breakpoint | Width | Tailwind prefix |
|---|---|---|
| Mobile | 375px | (default, no prefix) |
| Tablet | 768px | `md:` |
| Desktop | 1280px | `lg:` or `xl:` |

---

## 6. Component Patterns — Replicate These Exactly

### Page component structure

Every page must follow this exact pattern:

```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

// Animation variants — define at module level, not inside component
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function MyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="section-padding py-16">
          <div className="container mx-auto">
            <SectionHeader
              title="Section Title"
              subtitle="Supporting description here"
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* content */}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

### Component declaration — plain function, never React.FC

```tsx
// ✅ Correct
interface SpeakerCardProps {
  name: string;
  designation: string | null;
  imageUrl: string | null;
}

export default function SpeakerCard({ name, designation, imageUrl }: SpeakerCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-card-dark border border-border">
      {imageUrl && (
        <div className="aspect-w-1 aspect-h-1 w-full bg-muted">
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-heading font-semibold text-lg text-foreground">{name}</h3>
        {designation && <p className="font-body text-sm text-muted-foreground">{designation}</p>}
      </div>
    </div>
  );
}
```

---

## 11. Testing

- **Framework**: Use `Vitest` (not Jest) for all unit, hook, and utility tests. Vitest is configured in the repository and runs seamlessly via Vite.
- **Location**: Test files should be placed inside the `src/test/` directory or alongside components with `.test.tsx` or `.test.ts` extension.
- **Utilities**: Make use of React Testing Library for component-level tests.
