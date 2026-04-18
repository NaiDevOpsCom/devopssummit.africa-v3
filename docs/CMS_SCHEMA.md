# Content Model And CMS Roadmap

This document describes the current content sources in the repository and identifies the parts of the site that are strong candidates for eventual CMS management.

## Current Source Of Truth

The application is still primarily data-file driven.

| File                              | Content type                                             | Current status |
| --------------------------------- | -------------------------------------------------------- | -------------- |
| `src/data/speakers.ts`            | upcoming and archived speakers by year                   | static         |
| `src/data/sponsors.ts`            | sponsor records and sponsor testimonials                 | static         |
| `src/data/faqs.ts`                | FAQ categories and entries                               | static         |
| `src/data/tickets.ts`             | ticket tiers                                             | static         |
| `src/data/team.ts`                | organizing team                                          | static         |
| `src/data/benefits.ts`            | landing-page benefits                                    | static         |
| `src/data/summitData.ts`          | summit stats, dates, growth metrics, past summit details | static         |
| `src/data/gallery.generated.json` | gallery images by year                                   | generated      |

## Current Entity Shapes

The canonical TypeScript interfaces currently live mostly in [src/types/index.ts](file:///c:/Users/jlc254/Music/devopssummit.africa-v3/src/types/index.ts), with a few additional interfaces defined locally such as [src/data/faqs.ts](file:///c:/Users/jlc254/Music/devopssummit.africa-v3/src/data/faqs.ts) and [src/data/summitData.ts](file:///c:/Users/jlc254/Music/devopssummit.africa-v3/src/data/summitData.ts).

### Speakers

`src/data/speakers.ts` contains two practical speaker shapes inside one file:

- upcoming speakers for the next summit
- archived speakers for past summits

That distinction matters for future CMS work because the field requirements are different even if the current TypeScript interface is shared.

### Sponsors

Sponsors are grouped by year and currently include:

- `id`
- `name`
- `logoUrl`
- `packageTier`

Sponsor testimonials are stored in the same file but are a separate content concern.

### FAQs

FAQs are a good example of stable, low-complexity content:

- category
- question
- answer

They are likely to remain manageable as static data unless non-developers need frequent updates.

This works today, but it is a likely future split point if the content becomes more editorial.

### Tickets

Defined in [src/data/tickets.ts](file:///c:/Users/jlc254/Music/devopssummit.africa-v3/src/data/tickets.ts):

- `id`: unique identifier
- `name`: tier name (e.g., "Pro Pass")
- `price`: display price string (e.g., "$50")
- `priceNote`: optional context (e.g., "Virtual")
- `features`: array of strings describing perks
- `ctaLabel`: text for the action button

### Team

Defined in [src/data/team.ts](file:///c:/Users/jlc254/Music/devopssummit.africa-v3/src/data/team.ts):

- `id`: unique identifier
- `name`: member name
- `role`: organizational role
- `imageUrl`: Cloudinary or static URL
- `linkedinUrl`: full LinkedIn profile URL

### Benefits

Defined in [src/data/benefits.ts](file:///c:/Users/jlc254/Music/devopssummit.africa-v3/src/data/benefits.ts):

- `id`: unique identifier
- `icon`: Lucide icon name string
- `title`: benefit headline
- `description`: supporting detail text

## Image Field Notes

Image handling is mixed today:

- many speaker, sponsor, and team records still reference existing static image URLs directly
- ImageKit is the active integration for gallery sync and reusable image tooling (see [ImageKit Setup Docs](./imagekit.md))

If a CMS is added later, image strategy should be normalized intentionally rather than piecemeal.

## Best CMS Candidates

These content types are the strongest candidates for migration first:

### High priority

- current-year speakers
- schedule/session data
- current sponsors
- blog or announcements, if introduced

### Medium priority

- past summit recaps
- sponsor testimonials with editorial approval flow
- team content if ownership broadens beyond developers

- FAQs
- benefits
- ticket tiers

These items are lower priority because they are currently stable and simple, but could be migrated into the CMS if editorial needs change.

## Recommended Future CMS Entities

If the project adopts a CMS, start with a small set of explicit entities:

- `speaker`
- `session` (planned; see note below)
- `sponsor`
- `post`
- `pastSummit`

Avoid migrating everything at once. The biggest win will come from moving frequently updated, organizer-owned content first.

> [!NOTE]
> The `session` entity is planned for the future CMS but is not currently present in the [Current Source Of Truth](#current-source-of-truth) table as it has no existing static data file.

## Migration Guardrails

When moving content from TypeScript files to a CMS:

1. keep the frontend data contract typed
2. introduce a query layer rather than calling the CMS directly from pages
3. migrate one content domain at a time
4. keep build and preview workflows documented as part of the migration
5. update `CONTENT_GUIDE.md`, `architecture.md`, and `README.md` in the same change

## What Should Stay In Code For Now

These areas are still good fits for repository-managed content:

- ticket tier display logic
- benefit cards tied closely to layout
- static legal/policy pages
- build-time integration config

## Related Docs

- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)
- [architecture.md](./architecture.md)
- [prd.md](./prd.md)
- [imagekit.md](./imagekit.md)
