# CMS Schema Documentation

> **Africa DevOps Summit — `devopssummit.africa-v3`**
> Last reviewed: March 2026

This document is the authoritative reference for all content schemas in the project — both the current TypeScript data model and the planned CMS content model.

It serves two audiences:
- **Developers** — accurate field-level documentation of every data type, known issues, and improvement recommendations
- **Future CMS implementors** — CMS-agnostic schema definitions ready to be mapped to any headless CMS (Sanity, Contentful, Strapi, etc.)

---

## Table of Contents

- [Current Data Architecture](#current-data-architecture)
- [Content Type Schemas](#content-type-schemas)
  - [Speaker](#1-speaker)
  - [Sponsor](#2-sponsor)
  - [SponsorTestimonial](#3-sponsortestimonial)
  - [PastSummit & SummitHighlight](#4-pastsummit--summithighlight)
  - [GrowthMetric](#5-growthmetric)
  - [TeamMember](#6-teammember)
  - [FAQItem](#7-faqitem)
  - [Ticket](#8-ticket)
  - [Benefit](#9-benefit)
  - [Stat](#10-stat)
  - [Testimonial](#11-testimonial)
  - [Session ⚠️ Missing](#12-session--missing-type)
- [Known Issues & Improvement Recommendations](#known-issues--improvement-recommendations)
- [CMS Migration Plan](#cms-migration-plan)
  - [What moves to CMS](#what-moves-to-cms)
  - [What stays in TypeScript](#what-stays-in-typescript)
  - [CMS-Agnostic Schema Definitions](#cms-agnostic-schema-definitions)
  - [Blog & Announcements Schema](#blog--announcements-schema)
  - [Migration Steps](#migration-steps)

---

## Current Data Architecture

All content currently lives in static TypeScript files under `src/data/`. Shared interfaces are defined in `src/types/index.ts`.

### File map

| File | Exports | Used by |
|---|---|---|
| `src/data/speakers.ts` | `speakers: Record<number, Speaker[]>` | Landing page, Schedule page, Past Summits page |
| `src/data/sponsors.ts` | `sponsors: Record<number, Sponsor[]>`, `sponsorTestimonials: SponsorTestimonial[]` | Landing page, Sponsorship page, Past Summits page |
| `src/data/summitData.ts` | `pastSummitsData: Record<number, PastSummit>`, `growthMetrics: GrowthMetric[]` | Past Summits page |
| `src/data/team.ts` | `team: TeamMember[]` | Landing page |
| `src/data/faqs.ts` | `faqs: FAQItem[]`, `faqCategories`, `homepageFaqs` | FAQs page, Landing page |
| `src/data/tickets.ts` | `tickets: Ticket[]` | Landing page |
| `src/data/benefits.ts` | `benefits: Benefit[]` | Landing page |
| `src/data/stats.ts` | `stats: Stat[]` | Landing page |

### Year-keyed pattern

Several data types use `Record<number, T[]>` or `Record<number, T>` to organise content by summit year. This is the established pattern — follow it when adding new year data:

```ts
// Pattern used by speakers, sponsors, and pastSummitsData
export const speakers: Record<number, Speaker[]> = {
  2026: [ /* current year */ ],
  2025: [ /* past edition */ ],
  2024: [ /* past edition */ ],
};
```

---

## Content Type Schemas

### 1. Speaker

**File:** `src/data/speakers.ts`
**Interface:** `src/types/index.ts → Speaker`
**Structure:** `Record<number, Speaker[]>` — keyed by summit year

> ⚠️ **Known issue:** The `Speaker` interface serves two distinct use cases with different field requirements. See [Known Issues](#known-issues--improvement-recommendations) for the recommended fix.

#### Field reference

| Field | Type | Required | Nullable | Use context | Description |
|---|---|---|---|---|---|
| `id` | `string` | ✅ | ❌ | All years | Unique identifier. Format: `"YEAR-TYPE#"` e.g. `"2026-k1"` (keynote), `"2026-p1"` (panelist), `"2026-s1"` (speaker), `"2025-1"` (past, sequential) |
| `name` | `string` | ✅ | ❌ | All years | Full name as the speaker uses it professionally |
| `designation` | `string \| null` | ✅ | ✅ | All years | Job title in title case. `null` if unknown |
| `company` | `string \| null` | ⬜ | ✅ | All years | Official company name. `null` if independent or unknown |
| `imageUrl` | `string \| null` | ✅ | ✅ | All years | Full Cloudinary URL. `null` if photo not yet available |
| `eventRole` | `string \| null` | ⬜ | ✅ | **2026 only** | One of: `"Keynote Speaker"`, `"Panelist"`, `"Speaker"` |
| `isKeynote` | `boolean` | ⬜ | ❌ | All years | `true` for keynote speakers only. Omit entirely for non-keynotes |
| `topic` | `string \| null` | ⬜ | ✅ | **Past years only** | Exact talk title as delivered |
| `videoUrl` | `HttpUrl \| null` | ⬜ | ✅ | **Past years only** | Recording URL (YouTube, Vimeo, etc.). `null` if not available |
| `slidesUrl` | `HttpUrl \| null` | ⬜ | ✅ | **Past years only** | Link to presentation slides. `null` if not available |
| `twitter` | `string \| null` | ⬜ | ✅ | Future | Handle format: `"@handle"`. Not yet in interface — planned addition |
| `linkedin` | `string \| null` | ⬜ | ✅ | Future | Handle format: `"in/handle"`. Not yet in interface — planned addition |
| `github` | `string \| null` | ⬜ | ✅ | Future | Handle format: `"@handle"`. Not yet in interface — planned addition |

#### ID conventions

| Role | Format | Example |
|---|---|---|
| Current year keynote | `"YEAR-kN"` | `"2026-k1"`, `"2026-k2"` |
| Current year panelist | `"YEAR-pN"` | `"2026-p1"`, `"2026-p2"` |
| Current year speaker | `"YEAR-sN"` | `"2026-s1"` … `"2026-s8"` |
| Past summit speaker | `"YEAR-N"` | `"2025-1"` … `"2025-17"` |

#### Image URL pattern

```
https://res.cloudinary.com/nairobidevops/image/upload/v[VERSION]/[FILENAME].[ext]
```

Example: `https://res.cloudinary.com/nairobidevops/image/upload/v1773388830/Newton_Kipng_kir9fo.jpg`

---

### 2. Sponsor

**File:** `src/data/sponsors.ts`
**Interface:** `src/types/index.ts → Sponsor`
**Structure:** `Record<number, Sponsor[]>` — keyed by summit year

#### Field reference

| Field | Type | Required | Nullable | Description |
|---|---|---|---|---|
| `id` | `number` | ✅ | ❌ | Numeric, sequential within each year. Note: IDs reset to `1` each year — they are not globally unique |
| `name` | `string` | ✅ | ❌ | Official organisation name |
| `logoUrl` | `string` | ✅ | ❌ | Full Cloudinary URL. SVG preferred, PNG/WebP accepted. Must have transparent background |
| `packageTier` | `string` | ⬜ | ✅ | Sponsorship tier. See tier values below |

#### Package tier values

The `packageTier` field accepts a defined set of tiers plus an open string for custom arrangements:

| Value | Description | Seen in data |
|---|---|---|
| `"Platinum"` | Top tier | 2024, 2025, 2026 |
| `"Gold"` | Second tier | Not yet used |
| `"Silver"` | Third tier | 2024 |
| `"Bronze"` | Fourth tier | 2024, 2025 |
| `"Community"` | Community/in-kind partner | 2024, 2025 |
| `"Venue Partner"` | Custom — venue provider | 2025 (Zetech University) |
| `"Refreshments Partner"` | Custom — in-kind refreshments | 2025 (Red Bull) |
| `string` | Any other custom arrangement | Open — document in PR |

> ⚠️ **Known gap:** `Sponsor` has no `websiteUrl` field. Sponsor logos currently cannot link to the sponsor's website. See [Known Issues](#known-issues--improvement-recommendations).

---

### 3. SponsorTestimonial

**File:** `src/data/sponsors.ts` → `sponsorTestimonials`
**Interface:** `src/types/index.ts → SponsorTestimonial`

#### Field reference

| Field | Type | Required | Nullable | Description |
|---|---|---|---|---|
| `id` | `number` | ✅ | ❌ | Sequential numeric ID |
| `quote` | `string` | ✅ | ❌ | The testimonial text. Plain text only, no HTML |
| `name` | `string` | ✅ | ❌ | Full name of the person giving the testimonial |
| `role` | `string` | ✅ | ❌ | Job title only (e.g. `"CTO"`) — do not include company name here |
| `company` | `string` | ✅ | ❌ | Company name |
| `image` | `string` | ⬜ | ✅ | Photo URL. Optional — a fallback avatar is shown if absent |
| `verified` | `boolean` | ⬜ | ✅ | Whether the quote has been approved for publication |

> ⚠️ **Data quality note:** All 8 current entries have `verified: false` — these are placeholder/draft testimonials pending marketing/legal approval. **Do not treat these as real sponsor quotes until `verified: true`.** Before the Sponsorship page goes live, all displayed testimonials must be verified with the actual sponsors.

---

### 4. PastSummit & SummitHighlight

**File:** `src/data/summitData.ts`
**Interfaces:** `PastSummit`, `SummitHighlight` (defined locally in `summitData.ts`, not in `index.ts`)
**Structure:** `Record<number, PastSummit>` — keyed by summit year

> ⚠️ **Known issue:** `PastSummit` and `SummitHighlight` are defined locally in `summitData.ts` rather than in `src/types/index.ts`. These should be moved to the shared types file for consistency.

#### PastSummit field reference

| Field | Type | Required | Description |
|---|---|---|---|
| `year` | `number` | ✅ | Summit year — matches the Record key |
| `theme` | `string` | ✅ | Official theme title for that edition |
| `themeDescription` | `string` | ✅ | 2–3 sentence elaboration of the theme |
| `date` | `string` | ✅ | Human-readable date range. Format: `"Month D–D, YYYY"` e.g. `"November 7–8, 2025"` |
| `venue` | `string` | ✅ | Venue name e.g. `"Zetech University"` |
| `location` | `string` | ✅ | City and country e.g. `"Nairobi, Kenya"` |
| `attendees` | `string` | ✅ | Formatted attendance figure e.g. `"500+"` |
| `countries` | `string` | ✅ | Formatted country count e.g. `"9+"` |
| `reportUrl` | `string` | ✅ | URL to downloadable event report. Use `"#"` as placeholder until available |
| `videoUrl` | `string` | ✅ | URL to event recap video. Use `"#"` as placeholder until available |
| `highlights` | `SummitHighlight[]` | ✅ | 3–5 highlight cards for the edition |
| `testimonials` | `Testimonial[]` | ⬜ | Not currently in the interface — planned addition. See [Known Issues](#known-issues--improvement-recommendations) |

> ⚠️ **TODOs in data:** Both 2024 and 2025 entries have `reportUrl: "#"` and `videoUrl: "#"`. These must be replaced with real URLs before the Past Summits page is considered production-ready.

#### SummitHighlight field reference

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | ✅ | Short highlight title e.g. `"Platform Engineering Track"` |
| `description` | `string` | ✅ | 1–2 sentences describing the highlight |
| `icon` | `string` | ✅ | Lucide icon name as a string e.g. `"server"`, `"users"`, `"cloud"`. See [Known Issues](#known-issues--improvement-recommendations) |

**Lucide icons currently in use:**

`"server"` · `"users"` · `"code"` · `"cloud"` · `"rocket"` · `"box"` · `"layers"` · `"message-circle"`

---

### 5. GrowthMetric

**File:** `src/data/summitData.ts` → `growthMetrics`
**Interface:** `GrowthMetric` (defined locally in `summitData.ts`)

Used to render the year-on-year growth chart on the Past Summits page.

#### Field reference

| Field | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | ✅ | Metric name e.g. `"Attendees"`, `"Speakers"`, `"Countries"`, `"Sessions"` |
| `values` | `{ year: string; value: number }[]` | ✅ | Array of year/value pairs. `year` is stored as a string (`"2024"`, `"2025"`) |

> ⚠️ **Known inconsistency:** `year` is a `string` here (`"2024"`) but is a `number` everywhere else in the codebase. See [Known Issues](#known-issues--improvement-recommendations).

**Current data:**

| Metric | 2024 | 2025 |
|---|---|---|
| Attendees | 200 | 500 |
| Speakers | 8 | 15 |
| Countries | 5 | 9 |
| Sessions | 12 | 25 |

When adding a new year, append to each metric's `values` array:
```ts
{ year: "2026", value: 1000 }
```

---

### 6. TeamMember

**File:** `src/data/team.ts`
**Interface:** `src/types/index.ts → TeamMember`

#### Field reference

| Field | Type | Required | Nullable | Description |
|---|---|---|---|---|
| `id` | `number` | ✅ | ❌ | Sequential numeric ID |
| `name` | `string` | ✅ | ❌ | Full name |
| `role` | `string` | ✅ | ❌ | Role within the organising team e.g. `"UI/UX Designer"` |
| `imageUrl` | `string` | ✅ | ❌ | Full Cloudinary URL. Unlike `Speaker.imageUrl`, this field is non-nullable — a photo is required |
| `linkedinUrl` | `HttpUrl \| null` | ⬜ | ✅ | Full LinkedIn profile URL e.g. `"https://www.linkedin.com/in/..."` |

> ⚠️ **Inconsistency:** `TeamMember.linkedinUrl` stores a **full URL** while the planned `Speaker.linkedin` field stores a **handle** (`"in/handle"`). These should be standardised. See [Known Issues](#known-issues--improvement-recommendations).

---

### 7. FAQItem

**File:** `src/data/faqs.ts`
**Interface:** Defined locally in `faqs.ts` (not in `index.ts`)

#### Field reference

| Field | Type | Required | Description |
|---|---|---|---|
| `question` | `string` | ✅ | The question. Must end with `?` |
| `answer` | `string` | ✅ | The answer. Plain text, 2–5 sentences |
| `category` | `string` | ✅ | Must exactly match one of the `faqCategories` values |

#### Categories

```ts
export const faqCategories = [
  "General",
  "Tickets & Registration",
  "Speakers & Content",
  "Venue & Travel",
  "Sponsorship",
  "Community",
] as const;
```

> ⚠️ **Known issue:** `FAQItem` is defined locally in `faqs.ts` rather than in `src/types/index.ts`. Should be moved for consistency.

---

### 8. Ticket

**Interface:** `src/types/index.ts → Ticket`

> This type is owned by the development team. Content changes to ticket tiers require a developer — do not edit without coordinating with a maintainer, as pricing and feature lists are tightly coupled to the UI layout.

#### Field reference

| Field | Type | Required | Nullable | Description |
|---|---|---|---|---|
| `id` | `EntityId` | ✅ | ❌ | Unique identifier |
| `name` | `string` | ✅ | ❌ | Tier name e.g. `"Community"`, `"Regular"`, `"VIP"` |
| `price` | `string` | ✅ | ❌ | Display price string e.g. `"Free"`, `"KES 2,500"` |
| `priceNote` | `string` | ⬜ | ✅ | Optional note below the price e.g. `"Early bird ends March 31"` |
| `features` | `string[]` | ✅ | ❌ | List of included benefits. Displayed as a feature list in the UI |
| `ctaLabel` | `string` | ✅ | ❌ | Button label e.g. `"Register Free"`, `"Get Ticket"` |

---

### 9. Benefit

**Interface:** `src/types/index.ts → Benefit`

#### Field reference

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `EntityId` | ✅ | Unique identifier |
| `icon` | `string` | ✅ | Lucide icon name as a string. Loosely typed — see [Known Issues](#known-issues--improvement-recommendations) |
| `title` | `string` | ✅ | Short benefit title |
| `description` | `string` | ✅ | 1–2 sentence description |

---

### 10. Stat

**Interface:** `src/types/index.ts → Stat`

Simple key-value metrics displayed on the landing page.

| Field | Type | Required | Description |
|---|---|---|---|
| `value` | `string` | ✅ | Formatted metric value e.g. `"500+"`, `"2 Days"` |
| `label` | `string` | ✅ | Metric label e.g. `"Attendees"`, `"Speakers"` |

---

### 11. Testimonial

**Interface:** `src/types/index.ts → Testimonial`

> Note: This interface exists in `index.ts` but is **not currently linked** to any data file or used in `PastSummit`. It is a forward-looking type intended for attendee testimonials on the Past Summits page.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `EntityId` | ✅ | Unique identifier |
| `quote` | `string` | ✅ | The testimonial text |
| `name` | `string` | ✅ | Attendee full name |
| `role` | `string` | ✅ | Job title |
| `company` | `string` | ✅ | Company name |

---

### 12. Session ⚠️ Missing Type

> **Gap:** The `Session` content type does not exist anywhere in the codebase. The `/schedule` page uses `speakers[2026]` to render speaker information on session cards, but there is no typed `Session` object representing a conference slot with time, track, room, and speaker reference.

**Recommended interface to add to `src/types/index.ts`:**

```ts
export type SessionFormat =
  | "Keynote"
  | "Talk"
  | "Workshop"
  | "Panel"
  | "Lightning Talk"
  | "Unconference";

export type SessionTrack =
  | "Platform Engineering"
  | "DevSecOps"
  | "Cloud Native"
  | "SRE & Observability"
  | "AI/MLOps"
  | "Community & Culture";

export interface Session {
  id: EntityId;
  title: string;
  speakerId: EntityId | EntityId[] | null; // null for breaks, panels with multiple speakers
  day: 1 | 2;
  startTime: string;         // "09:00" — 24hr format
  endTime: string;           // "09:45"
  format: SessionFormat;
  track: SessionTrack | null; // null for keynotes / all-hands sessions
  room: string | null;        // null for main-stage sessions
  description?: string | null;
  isBreak?: boolean;          // true for lunch, coffee breaks, etc.
}
```

And a corresponding data file `src/data/schedule.ts`:

```ts
export const schedule: Record<number, Session[]> = {
  2026: [ /* sessions */ ],
};
```

The Schedule page should look up speaker details by joining `session.speakerId` against `speakers[year]`.

---

## Known Issues & Improvement Recommendations

These are real issues in the current codebase, documented here so they can be addressed incrementally. Each item includes a priority and a recommended fix.

---

### Issue 1 — `Speaker` interface overloaded with two distinct shapes

**Priority:** 🔴 High

**Problem:** The `Speaker` interface is used for both upcoming speakers (who have `eventRole`) and past summit speakers (who have `topic`, `videoUrl`, `slidesUrl`). These are genuinely different objects. Using one interface for both makes fields optional when they shouldn't be, allows incorrect combinations, and confuses contributors.

**Recommended fix:** Split into two interfaces:

```ts
// For upcoming/current year speakers
export interface UpcomingSpeaker {
  id: EntityId;
  name: string;
  designation: string | null;
  company: string | null;
  imageUrl: string | null;
  eventRole: "Keynote Speaker" | "Panelist" | "Speaker";
  isKeynote?: boolean;
  twitter?: string | null;
  linkedin?: string | null;
  github?: string | null;
}

// For past summit speakers (archived)
export interface PastSpeaker {
  id: EntityId;
  name: string;
  designation: string | null;
  company: string | null;
  imageUrl: string | null;
  topic: string;
  videoUrl: HttpUrl | null;
  slidesUrl?: HttpUrl | null;
  isKeynote?: boolean;
  twitter?: string | null;
  linkedin?: string | null;
  github?: string | null;
}
```

Update `speakers.ts` to use `Record<number, UpcomingSpeaker[]>` for 2026 and `Record<number, PastSpeaker[]>` for 2025 and earlier.

---

### Issue 2 — `Speaker.imageUrl` type is `HttpUrl | string | null`

**Priority:** 🔴 High

**Problem:** `HttpUrl | string | null` is semantically meaningless — `string` is a superset of `HttpUrl`, so the type constraint provides zero validation. Any string passes. This was likely intended to be `HttpUrl | null`.

**Recommended fix:**
```ts
// Before
imageUrl: HttpUrl | string | null;

// After
imageUrl: HttpUrl | null;
```

---

### Issue 3 — `Sponsor` has no `websiteUrl` field

**Priority:** 🔴 High

**Problem:** Sponsor logos are displayed without a link to the sponsor's website. This is a missed expectation — sponsors expect their logo to be clickable.

**Recommended fix:** Add to the `Sponsor` interface:
```ts
export interface Sponsor {
  id: EntityId;
  name: string;
  logoUrl: string;
  websiteUrl: HttpUrl | null;  // ← add this
  packageTier?: "Platinum" | "Gold" | "Silver" | "Bronze" | "Community" | (string & {});
}
```
And update all existing sponsor entries to include `websiteUrl`.

---

### Issue 4 — `Session` type is missing entirely

**Priority:** 🔴 High

**Problem:** The Schedule page has no typed data model. Session data appears to be hardcoded directly in the component rather than sourced from a data file. This makes content updates impossible without touching component code.

**Recommended fix:** Add the `Session` interface and `src/data/schedule.ts` as documented in [Section 12](#12-session--missing-type).

---

### Issue 5 — `id` type is inconsistent across content types

**Priority:** 🟡 Medium

**Problem:** Different content types use different `id` formats with no consistency:
- `Speaker` — string (`"2026-k1"`, `"2025-1"`)
- `Sponsor` — number (`1`, `2`, `3`) — resets each year, not globally unique
- `TeamMember` — number (`1`, `2`, `3`)
- `Ticket`, `Benefit`, `Testimonial` — `EntityId` (either)

A non-unique `id` (sponsors resetting to `1` each year) breaks any code that tries to look up a sponsor by ID across years.

**Recommended fix:** Standardise all IDs as strings and make them globally unique:
```ts
// Sponsor IDs — year-prefixed for global uniqueness
id: "2025-sponsor-1"  // instead of id: 1
```

---

### Issue 6 — `PastSummit` and `SummitHighlight` not in `src/types/index.ts`

**Priority:** 🟡 Medium

**Problem:** These interfaces are defined locally in `summitData.ts` rather than the shared types file. `FAQItem` has the same issue. This fragments the type system and makes it harder for contributors to get a complete picture of the data model.

**Recommended fix:** Move `PastSummit`, `SummitHighlight`, `GrowthMetric`, and `FAQItem` into `src/types/index.ts` and import them in the data files.

---

### Issue 7 — `icon` fields are untyped strings

**Priority:** 🟡 Medium

**Problem:** `SummitHighlight.icon` and `Benefit.icon` store Lucide icon names as plain strings. There is no validation that the icon name is valid — a typo (`"srever"` instead of `"server"`) fails silently at runtime with no error.

**Recommended fix:** Define a union type of valid icon names:
```ts
export type LucideIconName =
  | "server"
  | "users"
  | "code"
  | "cloud"
  | "rocket"
  | "box"
  | "layers"
  | "message-circle"
  | "shield"
  | "cpu"
  | "git-branch"
  | "terminal";
  // extend as needed
```

Then type the fields:
```ts
icon: LucideIconName;
```

---

### Issue 8 — `GrowthMetric.year` is `string`, everything else uses `number`

**Priority:** 🟡 Medium

**Problem:** `GrowthMetric.values` uses `{ year: string; value: number }[]` with year as `"2024"` (string), while `speakers`, `sponsors`, and `pastSummitsData` all use `Record<number, ...>` with year as `2024` (number). Inconsistent types cause friction when trying to correlate data across files.

**Recommended fix:**
```ts
// Before
values: { year: string; value: number }[]

// After
values: { year: number; value: number }[]
```

---

### Issue 9 — `TeamMember.linkedinUrl` stores full URL, speakers will use handle

**Priority:** 🟡 Medium

**Problem:** `TeamMember.linkedinUrl` is typed as `HttpUrl` and stores `"https://www.linkedin.com/in/..."`. The planned social link fields for `Speaker` will store handles (`"in/handle"`). These are inconsistent — one is a full URL, one is a path fragment.

**Recommended fix:** Standardise social links across all content types as handles:
```ts
// Consistent handle format across Speaker, TeamMember, etc.
linkedin: "in/mercy-kabingu-54a45a15b"  // not the full URL
```
Update the `TeamMember` interface:
```ts
linkedinUrl?: string | null;  // rename to linkedin, store handle not full URL
```

---

### Issue 10 — `PastSummit` has no `Testimonial[]`

**Priority:** 🟢 Low

**Problem:** The `Testimonial` interface exists in `index.ts` but is not connected to `PastSummit`. The Past Summits page likely needs attendee testimonials per edition, but there is no data structure to hold them.

**Recommended fix:** Add a `testimonials` field to `PastSummit`:
```ts
export interface PastSummit {
  // ... existing fields
  testimonials?: Testimonial[];
}
```
And populate with real attendee quotes per edition.

---

### Issue 11 — All `SponsorTestimonial.verified` are `false`

**Priority:** 🟢 Low (but important before public launch)

**Problem:** All 8 sponsor testimonials in `sponsors.ts` are placeholder entries with `verified: false`. The application renders them without any `verified` guard, meaning unverified quotes are potentially visible in production.

**Recommended fix:** Add a `verified` check in the component rendering testimonials:
```tsx
const visibleTestimonials = sponsorTestimonials.filter(t => t.verified);
```
And obtain approval from each named sponsor before setting `verified: true`.

---

## CMS Migration Plan

### What moves to CMS

When a CMS is adopted, these content types are strong candidates for migration — they change per edition, are updated by non-developers, or have rich media requirements:

| Content Type | Reason to move | Priority |
|---|---|---|
| Blog / Announcements | Entirely new type — no static equivalent | 🔴 First |
| Speaker profiles (current year) | Updated every year by organizers | 🟡 Second |
| Conference schedule / sessions | Updated every year, time-sensitive | 🟡 Second |
| Sponsor profiles | Updated every year, logo uploads needed | 🟡 Second |
| Past summit data | Rich media — photos, videos, recaps | 🟢 Third |
| Sponsor testimonials | Requires approval workflow | 🟢 Third |

### What stays in TypeScript

These types should remain as static TypeScript files — they change infrequently, are tightly coupled to UI logic, or require developer review anyway:

| Content Type | Reason to keep |
|---|---|
| Ticket tiers | Tightly coupled to UI layout and pricing logic |
| Attendance benefits | Rarely changes, coupled to icon components |
| Stats | Requires developer verification |
| Team members | Small, infrequent changes |
| FAQs | Small, infrequent changes — though CMS is feasible |
| Code of Conduct / Privacy Policy | Legal content — developer review required |

---

### CMS-Agnostic Schema Definitions

The following schemas are defined independently of any CMS platform. They can be mapped to Sanity, Contentful, Strapi, or any other headless CMS. Field types use generic terms rather than CMS-specific primitives.

---

#### Speaker (CMS version)

```
Content type: speaker
```

| Field name | CMS field type | Required | Notes |
|---|---|---|---|
| `id` | Short text | ✅ | Auto-generated by CMS |
| `name` | Short text | ✅ | |
| `designation` | Short text | ✅ | |
| `company` | Short text | ⬜ | |
| `photo` | Image / Media | ✅ | Stored in CMS media library |
| `eventRole` | Dropdown | ✅ | Options: Keynote Speaker, Panelist, Speaker |
| `isKeynote` | Boolean | ⬜ | Default: false |
| `talkTitle` | Short text | ⬜ | For current year only |
| `talkDescription` | Long text | ⬜ | Abstract / session description |
| `twitter` | Short text | ⬜ | Handle: `@handle` |
| `linkedin` | Short text | ⬜ | Handle: `in/handle` |
| `github` | Short text | ⬜ | Handle: `@handle` |
| `year` | Number | ✅ | Summit year e.g. `2026` |
| `videoUrl` | URL | ⬜ | Post-event: recording link |
| `slidesUrl` | URL | ⬜ | Post-event: slides link |

---

#### Sponsor (CMS version)

```
Content type: sponsor
```

| Field name | CMS field type | Required | Notes |
|---|---|---|---|
| `id` | Short text | ✅ | Auto-generated |
| `name` | Short text | ✅ | Official organisation name |
| `logo` | Image / Media | ✅ | SVG or PNG with transparent background |
| `websiteUrl` | URL | ✅ | Full URL including `https://` |
| `packageTier` | Dropdown | ✅ | Platinum, Gold, Silver, Bronze, Community, Custom |
| `customTierLabel` | Short text | ⬜ | Only if packageTier is "Custom" — e.g. "Venue Partner" |
| `year` | Number | ✅ | Summit year |

---

#### Session (CMS version)

```
Content type: session
```

| Field name | CMS field type | Required | Notes |
|---|---|---|---|
| `id` | Short text | ✅ | Auto-generated |
| `title` | Short text | ✅ | Session title |
| `speaker` | Reference → Speaker | ⬜ | Link to Speaker entry. Null for breaks |
| `day` | Dropdown | ✅ | Day 1, Day 2 |
| `startTime` | Short text | ✅ | 24hr format: `"09:00"` |
| `endTime` | Short text | ✅ | 24hr format: `"09:45"` |
| `format` | Dropdown | ✅ | Keynote, Talk, Workshop, Panel, Lightning Talk, Unconference |
| `track` | Dropdown | ⬜ | Platform Engineering, DevSecOps, Cloud Native, SRE & Observability, AI/MLOps, Community & Culture |
| `room` | Short text | ⬜ | Null for main-stage sessions |
| `description` | Long text | ⬜ | Session abstract |
| `isBreak` | Boolean | ⬜ | True for lunch, coffee breaks, networking slots |
| `year` | Number | ✅ | Summit year |

---

### Blog & Announcements Schema

The Blog / Announcements section is the primary CMS-first content type. It does not exist yet in the codebase — this schema defines it from scratch.

```
Content type: post
```

| Field name | CMS field type | Required | Notes |
|---|---|---|---|
| `id` | Short text | ✅ | Auto-generated |
| `title` | Short text | ✅ | Post title |
| `slug` | Slug | ✅ | URL-safe identifier auto-generated from title e.g. `"2026-cfp-now-open"` |
| `type` | Dropdown | ✅ | `"Blog Post"` or `"Announcement"` |
| `summary` | Short text | ✅ | 1–2 sentence summary shown in listing cards. Max 160 chars |
| `body` | Rich text | ✅ | Full post content. Supports headings, links, images, code blocks |
| `coverImage` | Image / Media | ⬜ | Featured image shown in listing and at top of post |
| `author` | Short text | ✅ | Author name |
| `authorRole` | Short text | ⬜ | Author job title or role within the team |
| `publishedAt` | Date & time | ✅ | Publication date — can be scheduled in the future |
| `tags` | Multi-select | ⬜ | e.g. `["CFP", "Announcements", "Recap", "Community"]` |
| `isPublished` | Boolean | ✅ | Draft/published toggle. Default: false |
| `isFeatured` | Boolean | ⬜ | Pin to top of blog listing. Default: false |

**Slug convention:** `YYYY-short-description` — e.g. `"2026-cfp-now-open"`, `"2025-summit-recap"`.

**Routing:** Posts will be served at `/blog/[slug]` — a new route to be added to `App.tsx` when this feature is built.

---

### Migration Steps

When a CMS is selected, follow these steps to migrate content:

1. **Choose and configure the CMS** — document the provider, API endpoint, and auth method in `docs/ARCHITECTURE.md`

2. **Update `src/config/env.ts`** — add CMS API URL and public API key as `VITE_` variables. Add private keys as build-time only (no `VITE_` prefix). Update `.env.example`

3. **Migrate Blog/Announcements first** — this is a new content type with no existing static data. It is the lowest-risk migration and the best way to validate the CMS integration before touching existing data

4. **Create React Query hooks** — write typed fetch hooks in `src/hooks/` for each CMS content type (e.g. `useSpeakers`, `useSessions`, `useSponsors`). Use `@tanstack/react-query` which is already installed

5. **Migrate one content type at a time** — Speaker → Session → Sponsor → PastSummit. For each:
   - Export existing data from the TypeScript file
   - Import into the CMS using their import tool or API
   - Write the query hook
   - Update the page component to use the hook instead of the static import
   - Delete the static data file once the CMS version is verified in production

6. **Update this document** — mark migrated types as "CMS-managed" and document the CMS field mappings and any schema differences

7. **Update `CONTENT_GUIDE.md`** — replace the TypeScript editing instructions with CMS dashboard instructions for each migrated content type

---

*This document should be updated whenever a new content type is added, a schema is changed, or a content type is migrated to a CMS.*