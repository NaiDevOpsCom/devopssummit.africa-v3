# Content Guide

> **Africa DevOps Summit — `devopssummit.africa-v3`**
> For organizers, volunteers, and contributors updating event content.

This guide explains how to add, edit, or remove content on the Africa DevOps Summit website. All content covered here lives in TypeScript data files inside the `src/data/` folder — no CMS dashboard, no backend. You edit a file, open a pull request, and it goes live when merged.

**You do not need to understand React or TypeScript deeply to follow this guide.** The files follow a strict repeating pattern — you are copying and editing existing entries, not writing logic.

---

## Table of Contents

- [Before You Start](#before-you-start)
- [How Content Changes Work](#how-content-changes-work)
- [Writing Style Guide](#writing-style-guide)
- [Speakers (`src/data/speakers.ts`)](#speakers-srcdataspeakersts)
  - [Understanding the file structure](#understanding-the-file-structure)
  - [2026 speaker fields reference](#2026-speaker-fields-reference)
  - [Past summit speaker fields reference](#past-summit-speaker-fields-reference)
  - [Adding a new 2026 speaker](#adding-a-new-2026-speaker)
  - [Adding a past summit speaker](#adding-a-past-summit-speaker)
  - [Editing an existing speaker](#editing-an-existing-speaker)
  - [Removing a speaker](#removing-a-speaker)
  - [Speaker image URLs](#speaker-image-urls)
  - [Social handle format](#social-handle-format)
- [FAQs (`src/data/faqs.ts`)](#faqs-srcdatafaqsts)
  - [Understanding the file structure](#understanding-the-faq-file-structure)
  - [FAQ fields reference](#faq-fields-reference)
  - [Adding a new FAQ](#adding-a-new-faq)
  - [Editing an existing FAQ](#editing-an-existing-faq)
  - [Removing an FAQ](#removing-an-faq)
  - [Adding a new FAQ category](#adding-a-new-faq-category)
  - [Homepage FAQ selection](#homepage-faq-selection)
- [Sponsors (`src/data/sponsors.ts`)](#sponsors-srcdatasponsorts)
- [Submitting Your Changes](#submitting-your-changes)
- [Content Checklist](#content-checklist)
- [Getting Help](#getting-help)

---

## Before You Start

### What you need

- A code editor — [VS Code](https://code.visualstudio.com/) is recommended (free, works on all platforms)
- [Git](https://git-scm.com/) installed
- The repository cloned locally — follow the [Getting Started](../README.md#getting-started) steps in the README
- Write access to the repository, or permission to open a pull request

### What you are editing

All content in this guide lives in the `src/data/` folder:

```
src/data/
├── speakers.ts     ← Speaker profiles, organised by year
├── faqs.ts         ← FAQ questions, answers, and categories
├── sponsors.ts     ← Sponsor names, logos, tiers, and links
├── tickets.ts      ← Ticket tiers (rarely changes — involves a developer)
├── team.ts         ← Organising team members
├── benefits.ts     ← Attendance benefit items
└── stats.ts        ← Summit metrics
```

This guide covers `speakers.ts`, `faqs.ts`, and `sponsors.ts` — the three files most frequently updated by non-developer contributors.

### The golden rule

> **Copy an existing entry. Edit the values. Never edit the structure.**

Every data file is a list of objects that follow the same shape. The safest approach is always to copy an existing entry, paste it in the right place, and change the values inside it. Do not rename fields, remove fields, or change the surrounding brackets and braces.

---

## How Content Changes Work

```
Edit file in src/data/  →  Open a Pull Request  →  Review  →  Merge to main  →  Deploy  →  Live
```

1. Make your edits in the relevant `src/data/` file
2. Run `npm run dev` locally to verify your change looks correct in the browser
3. Open a pull request against `main` with the label `content`
4. A maintainer will review and merge
5. The site is redeployed and the change goes live

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full PR process. For content PRs specifically, always include a brief description of what changed — e.g. *"Added 3 new 2026 speakers and updated Sarah Johnson's image URL."*

---

## Writing Style Guide

Consistency in copy makes the site feel polished and professional. Follow these rules when writing or editing any text content.

### Tone

- **Community-first, professional** — warm and inclusive, not corporate or stiff
- Write as if you're talking to a fellow practitioner, not a press release audience
- Avoid marketing superlatives: *"world-class"*, *"cutting-edge"*, *"revolutionary"* — be specific instead

### Formatting rules

| Rule | ✅ Correct | ❌ Wrong |
|---|---|---|
| Names | Use full name as the speaker provided it | Do not shorten or anglicise names |
| Designations | Title case | `devops engineer` → `DevOps Engineer` |
| Company names | Match the company's official capitalisation | `safaricom` → `Safaricom PLC` |
| Talk titles | Title case | `how to deploy on kubernetes` → `How to Deploy on Kubernetes` |
| Abbreviations | Spell out on first use | `SRE (Site Reliability Engineering)` |
| Ampersands | Use *and* in prose; `&` is fine in titles | FAQ answers: use *and* |
| Punctuation | No trailing exclamation marks in titles | `Deploying at Scale!` → `Deploying at Scale` |
| Oxford comma | Always use it | `DevOps, Cloud, and SRE` not `DevOps, Cloud and SRE` |

### Length guidelines

| Content | Recommended length |
|---|---|
| Speaker bio (if added in future) | 50–100 words |
| Talk title | 5–15 words |
| FAQ question | One clear sentence, ends with `?` |
| FAQ answer | 2–5 sentences — enough to be genuinely helpful, short enough to scan |
| Company name | As officially written — no truncation |

---

## Speakers (`src/data/speakers.ts`)

### Understanding the file structure

The speakers file exports a single `speakers` object organised by year:

```ts
export const speakers: Record<number, Speaker[]> = {
  2026: [ /* current year speakers */ ],
  2025: [ /* past summit speakers */ ],
  2024: [ /* past summit speakers */ ],
};
```

- `speakers[2026]` — displayed on the Landing Page and Schedule Page
- `speakers[2025]` and `speakers[2024]` — displayed on the Past Summits page

> ⚠️ **Important:** The shape of a 2026 speaker object is different from a past summit speaker object. They use different fields. Always copy from the correct year section.

---

### 2026 Speaker fields reference

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | ✅ | Unique identifier. Format: `"2026-k1"` (keynote), `"2026-p1"` (panelist), `"2026-s1"` (speaker) |
| `name` | `string` | ✅ | Full name as the speaker uses it professionally |
| `designation` | `string` | ✅ | Job title — title case (e.g. `"SRE Lead"`) |
| `company` | `string \| null` | ✅ | Company name — use `null` if independent/unknown |
| `imageUrl` | `string \| null` | ✅ | Full image URL — see [Speaker image URLs](#speaker-image-urls) |
| `eventRole` | `string` | ✅ | One of: `"Keynote Speaker"`, `"Panelist"`, `"Speaker"` |
| `isKeynote` | `boolean` | ⚠️ | Only include if `true`. Omit entirely for non-keynote speakers |
| `twitter` | `string \| null` | ⬜ | Twitter/X handle — format: `"@handle"`. Use `null` if none |
| `linkedin` | `string \| null` | ⬜ | LinkedIn handle — format: `"in/handle"`. Use `null` if none |
| `github` | `string \| null` | ⬜ | GitHub handle — format: `"@handle"`. Use `null` if none |

---

### Past summit speaker fields reference

Past summit speakers (2025, 2024) use a different shape — they record what was presented, not what is upcoming:

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | ✅ | Format: `"2025-1"`, `"2025-2"` — increment from last entry |
| `name` | `string` | ✅ | Full name |
| `designation` | `string` | ✅ | Job title at time of the summit |
| `company` | `string \| null` | ✅ | Company at time of the summit. Use `null` if unknown |
| `imageUrl` | `string \| null` | ✅ | Full Cloudinary URL, or `null` if no photo available |
| `topic` | `string` | ✅ | Exact talk title as delivered |
| `videoUrl` | `string \| null` | ✅ | YouTube or recording URL. Use `null` if not available |
| `slidesUrl` | `string \| null` | ⬜ | Link to slides (Google Slides, Speaker Deck, etc.). Use `null` if not available |
| `isKeynote` | `boolean` | ⬜ | Only include if `true`. Omit for regular speakers |

---

### Adding a new 2026 speaker

1. Open `src/data/speakers.ts`
2. Find the `2026: [` section
3. Decide the speaker's role and choose the correct ID prefix:
   - Keynote → `"2026-k3"` (increment from last keynote ID)
   - Panelist → `"2026-p3"` (increment from last panelist ID)
   - Speaker → `"2026-s9"` (increment from last speaker ID)
4. Copy the template below, paste it after the last entry in the `2026` array, and fill in the values:

**Template — regular speaker:**
```ts
{
  id: "2026-s9",
  name: "Full Name Here",
  designation: "Job Title Here",
  company: "Company Name Here",
  imageUrl: "https://res.cloudinary.com/nairobidevops/image/upload/v.../filename.jpg",
  eventRole: "Speaker",
  twitter: "@twitterhandle",
  linkedin: "in/linkedinhandle",
  github: null,
},
```

**Template — keynote speaker:**
```ts
{
  id: "2026-k3",
  name: "Full Name Here",
  designation: "Job Title Here",
  company: "Company Name Here",
  imageUrl: "https://res.cloudinary.com/nairobidevops/image/upload/v.../filename.jpg",
  eventRole: "Keynote Speaker",
  isKeynote: true,
  twitter: "@twitterhandle",
  linkedin: "in/linkedinhandle",
  github: null,
},
```

**Real example — existing entry for reference:**
```ts
{
  id: "2026-s3",
  name: "Grace Nduta",
  designation: "Platform Engineer",
  company: "Safaricom",
  imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
  eventRole: "Speaker",
  twitter: "@gracenduta",
  linkedin: "in/gracenduta",
  github: null,
},
```

> 💡 **Commas matter.** Every entry in the list must end with a `,` — including the last one. If you forget the comma, the build will fail.

---

### Adding a past summit speaker

When archiving a completed summit (e.g. adding 2026 speakers to the historical record after the event):

1. Find the correct year section — or add a new year block if it doesn't exist:
   ```ts
   2026: [
     /* entries will move here after the event */
   ],
   ```
2. Copy the past summit template:

```ts
{
  id: "2026-1",
  name: "Full Name Here",
  designation: "Job Title",
  company: "Company Name",
  imageUrl: "https://res.cloudinary.com/nairobidevops/image/upload/v.../filename.jpg",
  topic: "Exact Talk Title as Delivered",
  videoUrl: null,
  slidesUrl: null,
  isKeynote: true,
},
```

Remove `isKeynote` entirely if the speaker was not a keynote.

---

### Editing an existing speaker

Find the speaker by searching for their `name` value in the file (`Ctrl+F` / `Cmd+F`). Edit only the field value — the part inside the quotes — not the field name itself.

**Example — updating an image URL:**
```ts
// Before
imageUrl: "https://images.unsplash.com/photo-placeholder?w=400",

// After
imageUrl: "https://res.cloudinary.com/nairobidevops/image/upload/v.../grace_nduta.jpg",
```

**Example — adding social handles to an existing speaker:**
```ts
// Before
{
  id: "2026-s3",
  name: "Grace Nduta",
  designation: "Platform Engineer",
  company: "Safaricom",
  imageUrl: "https://...",
  eventRole: "Speaker",
},

// After
{
  id: "2026-s3",
  name: "Grace Nduta",
  designation: "Platform Engineer",
  company: "Safaricom",
  imageUrl: "https://...",
  eventRole: "Speaker",
  twitter: "@gracenduta",
  linkedin: "in/gracenduta",
  github: null,
},
```

---

### Removing a speaker

Delete the entire object from the opening `{` to the closing `},` — including the trailing comma. Do not leave orphaned commas or blank lines.

```ts
// Remove this entire block including the trailing comma:
{
  id: "2026-s5",
  name: "Speaker To Remove",
  ...
},
```

> ⚠️ If removing a keynote speaker, make sure no other part of the schedule references their `id`. Search for the ID string in the codebase before deleting.

---

### Speaker image URLs

All speaker images should be uploaded to Cloudinary under the `nairobidevops` account and referenced as full Cloudinary URLs:

```
https://res.cloudinary.com/nairobidevops/image/upload/v[VERSION]/[FILENAME].[ext]
```

**Real example:**
```
https://res.cloudinary.com/nairobidevops/image/upload/v1773388830/Newton_Kipng_kir9fo.jpg
```

**Image requirements before uploading:**

| Requirement | Value |
|---|---|
| Dimensions | Minimum 400×400px, ideally 800×800px |
| Aspect ratio | Square (1:1) |
| Format | JPG or WebP preferred. PNG accepted |
| File size | Under 300KB — compress at [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/) before uploading |
| Subject framing | Face clearly visible and centred — the UI crops to a circle |
| File naming | `Firstname_Lastname_shortcode.ext` — match the Cloudinary naming convention |

If a speaker photo is not yet available, use `null`:
```ts
imageUrl: null,
```
The UI will display a placeholder avatar automatically.

---

### Social handle format

Social links are stored as **handles, not full URLs**. The application constructs the full URLs automatically.

| Platform | Field | Format | Example |
|---|---|---|---|
| Twitter / X | `twitter` | `"@handle"` | `"@gracenduta"` |
| LinkedIn | `linkedin` | `"in/handle"` | `"in/gracenduta"` |
| GitHub | `github` | `"@handle"` | `"@gracenduta"` |

If a speaker does not have a profile on a platform, use `null` — do not use an empty string:
```ts
// ✅ Correct
twitter: null,

// ❌ Wrong
twitter: "",
```

Do not include the full URL:
```ts
// ✅ Correct
linkedin: "in/gracenduta",

// ❌ Wrong
linkedin: "https://linkedin.com/in/gracenduta",
```

---

## FAQs (`src/data/faqs.ts`)

### Understanding the FAQ file structure

The FAQ file has three parts:

```ts
// 1. The FAQItem interface — defines the shape (do not edit)
export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

// 2. The category list — controls what categories exist
export const faqCategories = [
  "General",
  "Tickets & Registration",
  "Speakers & Content",
  "Venue & Travel",
  "Sponsorship",
  "Community",
] as const;

// 3. The FAQ entries — the actual questions and answers
export const faqs: FAQItem[] = [
  { category: "General", question: "...", answer: "..." },
  ...
];

// 4. Homepage FAQ selection — controls which FAQs appear on the homepage
export const homepageFaqs = faqs.filter((_, i) => [0, 1, 2, 5, 6, 8].includes(i));
```

FAQs are displayed grouped by category on the `/faqs` page. The order within each category follows the order in the `faqs` array.

---

### FAQ fields reference

| Field | Type | Required | Description |
|---|---|---|---|
| `category` | `string` | ✅ | Must exactly match one of the values in `faqCategories` — case-sensitive |
| `question` | `string` | ✅ | The question — ends with `?`. One sentence, clearly phrased |
| `answer` | `string` | ✅ | The answer — 2–5 sentences. Plain text only, no HTML or markdown |

---

### Adding a new FAQ

1. Open `src/data/faqs.ts`
2. Find the category section where the new FAQ belongs — entries are grouped by category using comments (e.g. `/* ── General ── */`)
3. Paste a new entry within that category group:

```ts
{
  category: "General",
  question: "Your question here?",
  answer:
    "Your answer here. Keep it clear and concise — 2 to 5 sentences is ideal. Write in plain text with no special formatting.",
},
```

**Real example:**
```ts
{
  category: "Venue & Travel",
  question: "Is parking available at the venue?",
  answer:
    "Yes, the Sarit Expo Centre has ample parking available for attendees. Parking is paid and managed by the venue. We recommend arriving early on Day 1 as spaces fill up quickly.",
},
```

> 💡 **Long answers:** If your answer is long, you can split it across multiple lines using a template literal or concatenation. The safest way is to end the opening quote on the same line as `answer:` and break at natural sentence boundaries, as shown in the existing entries.

---

### Editing an existing FAQ

Search for the question text (`Ctrl+F` / `Cmd+F`), then edit the `answer` value. Do not change the `category` or `question` field names — only the values inside the quotes.

**Example — updating a hotel code:**
```ts
// Before
answer: "Use code ADS2026 when booking for the discounted rate.",

// After
answer: "Use code ADS2027 when booking for the discounted rate.",
```

---

### Removing an FAQ

Delete the entire object from `{` to `},`. Then check whether that FAQ was referenced in `homepageFaqs` by its index — see [Homepage FAQ selection](#homepage-faq-selection) below.

---

### Adding a new FAQ category

If none of the existing six categories fit your new FAQ, you can add a new one:

1. Add the new category name to `faqCategories`:
   ```ts
   export const faqCategories = [
     "General",
     "Tickets & Registration",
     "Speakers & Content",
     "Venue & Travel",
     "Sponsorship",
     "Community",
     "Workshops",   // ← new category added here
   ] as const;
   ```

2. Use the exact same string as the `category` value in your FAQ entries:
   ```ts
   {
     category: "Workshops",
     question: "Do workshops require separate registration?",
     answer: "Yes, workshops have limited capacity and require a separate registration ...",
   },
   ```

> ⚠️ The category string in your FAQ entry must **exactly match** the string in `faqCategories` — including capitalisation and spacing. A mismatch will cause the FAQ to not appear under any category header.

---

### Homepage FAQ selection

The homepage displays a subset of FAQs defined by this line at the bottom of `faqs.ts`:

```ts
export const homepageFaqs = faqs.filter((_, i) => [0, 1, 2, 5, 6, 8].includes(i));
```

The numbers in the array are the **index positions** (starting from 0) of FAQs in the main `faqs` array. So index `0` is the first FAQ, index `1` is the second, and so on.

**When you add or remove FAQs, these index numbers shift.** If you add a new FAQ before index position `5`, what was at position `5` is now at position `6`, and the homepage selection will be wrong.

**How to update the homepage selection after adding/removing FAQs:**

1. Count the positions of the FAQs you want on the homepage (0-indexed from the top of the `faqs` array)
2. Update the numbers in the filter accordingly:

```ts
// Example: show FAQs at positions 0, 1, 2, 6, 7, 9
export const homepageFaqs = faqs.filter((_, i) => [0, 1, 2, 6, 7, 9].includes(i));
```

If you are unsure which FAQs to show on the homepage, leave the selection as-is and note it in your PR for a maintainer to review.

---

## Sponsors (`src/data/sponsors.ts`)

> `TODO: Paste the current sponsor interface and a sample entry from src/data/sponsors.ts here so this section can be completed with accurate field documentation.`

The sponsors file follows the same pattern as speakers and FAQs — a list of objects, one per sponsor, organised by tier. The general rules apply:

- Copy an existing entry to add a new sponsor
- Set `logoUrl` to the full Cloudinary URL of the sponsor's logo
- Set `tier` to exactly one of the defined tier names: `"Platinum"`, `"Gold"`, `"Silver"`, or `"Community"`
- Set `websiteUrl` to the full URL including `https://`
- Use `null` for any optional field that is not available

**Sponsor logo requirements:**

| Requirement | Value |
|---|---|
| Format | SVG preferred. PNG or WebP accepted |
| Background | Transparent background required |
| Width | Minimum 400px wide |
| File size | Under 100KB |
| File naming | `sponsor-company-name-year.svg` |

Upload logos to Cloudinary under `nairobidevops` before adding the URL to the file.

---

## Submitting Your Changes

Once you have made your edits, submit them for review as a pull request:

### Step 1 — Verify your changes locally

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and navigate to the page affected by your change. Confirm it looks correct — no broken layouts, no missing images, no placeholder text.

### Step 2 — Check for errors

```sh
npm run build
```

If this command fails, there is likely a syntax error in the file you edited — a missing comma, an unclosed quote, or a mismatched bracket. Read the error message carefully; it will point to the line number.

**Common mistakes and how to fix them:**

| Symptom | Likely cause | Fix |
|---|---|---|
| `build` fails with `Unexpected token` | Missing or extra comma | Check the entry above and below where you made changes |
| `build` fails with `is not assignable to type` | Wrong value type | Check the fields reference — `null` vs `""` vs omitting the field |
| Image not showing | Wrong URL format or typo | Copy the URL directly from Cloudinary, do not type it manually |
| FAQ not appearing under correct heading | Category string mismatch | Check spelling and capitalisation matches `faqCategories` exactly |
| Homepage FAQ wrong | Index positions shifted | Recount positions and update `homepageFaqs` |

### Step 3 — Open a pull request

1. Create a branch:
   ```sh
   git checkout -b content/add-2026-speakers
   ```
2. Commit your changes:
   ```sh
   git add src/data/speakers.ts
   git commit -m "content: add 3 new 2026 speaker profiles"
   ```
3. Push and open a PR against `main`:
   ```sh
   git push origin content/add-2026-speakers
   ```
4. In the PR description, briefly list what changed:
   - Which file(s) were edited
   - What was added, changed, or removed
   - Any follow-up actions needed (e.g. *"Image URL for speaker 3 is a placeholder — will update when photo is received"*)
5. Add the `content` label to the PR

---

## Content Checklist

Before submitting a content PR, run through this checklist:

**Speakers**
- [ ] `id` is unique and follows the correct format for the year and role
- [ ] `name` matches exactly how the speaker uses their name professionally
- [ ] `designation` is in title case
- [ ] `company` matches the company's official capitalisation, or is `null`
- [ ] `imageUrl` is a full Cloudinary URL (or `null` if not yet available)
- [ ] `eventRole` is exactly `"Keynote Speaker"`, `"Panelist"`, or `"Speaker"`
- [ ] `isKeynote: true` is present for keynotes and omitted for everyone else
- [ ] Social handles use `"@handle"` or `"in/handle"` format, not full URLs
- [ ] Every entry ends with a trailing comma `,`
- [ ] `npm run build` passes

**FAQs**
- [ ] `category` exactly matches one of the values in `faqCategories`
- [ ] `question` ends with `?`
- [ ] `answer` is 2–5 sentences in plain text
- [ ] If FAQs were added or removed, `homepageFaqs` index positions are still correct
- [ ] `npm run build` passes

**Sponsors**
- [ ] Logo is uploaded to Cloudinary with a transparent background
- [ ] `tier` matches one of the defined tier names exactly
- [ ] `websiteUrl` includes `https://`
- [ ] `npm run build` passes

---

## Getting Help

Stuck on a content change? Here is how to get help:

- 💬 **GitHub Discussions** — [Ask a question](https://github.com/NaiDevOpsCom/devopssummit.africa-v3/discussions) — the team is friendly and responsive
- 🐛 **GitHub Issues** — [Report a content issue](https://github.com/NaiDevOpsCom/devopssummit.africa-v3/issues/new) with the `content` label
- 📧 **Email the team** — `TODO: hello@devopssummit.africa`

If your change is urgent (e.g. a speaker name spelling correction before a public announcement), note `[URGENT]` in your PR title and tag a maintainer directly.

---

*This guide covers `speakers.ts`, `faqs.ts`, and `sponsors.ts`. For changes to ticket tiers, team members, or site configuration, coordinate with a developer — those files have tighter coupling to the UI.*