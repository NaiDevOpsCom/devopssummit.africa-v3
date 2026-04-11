# Content Guide

This guide is for organizers, volunteers, and contributors who need to update summit content without changing application logic.

## Content Model Today

Most site content is still managed directly in `src/data` as TypeScript exports. The main files are:

| File                     | What it controls                                             |
| ------------------------ | ------------------------------------------------------------ |
| `src/data/speakers.ts`   | current and past speaker records by year                     |
| `src/data/sponsors.ts`   | sponsor logos, tiers, and sponsor testimonials               |
| `src/data/faqs.ts`       | FAQ categories, entries, and homepage FAQ subset             |
| `src/data/tickets.ts`    | ticket tiers and CTA labels                                  |
| `src/data/team.ts`       | organizing team members                                      |
| `src/data/summitData.ts` | summit dates, stats, growth metrics, and past summit details |
| `src/data/benefits.ts`   | landing-page benefit cards                                   |

Gallery content is handled differently: it is generated from ImageKit into `src/data/gallery.generated.json`.

## Before You Edit

- copy an existing entry instead of inventing a new structure
- change values, not object shape
- keep trailing commas and matching brackets intact
- run the site locally if you changed visible content

If you are editing copy only, you usually do not need to understand React, but you do need to preserve valid TypeScript syntax.

## Common Content Tasks

### Update speakers

File: `src/data/speakers.ts`

The file is grouped by year:

- `2026` contains upcoming summit speakers
- `2025` and `2024` contain archived summit speakers

Guidelines:

- preserve the year grouping
- keep IDs unique within the year
- keep optional fields as `null` when the value is unknown
- preserve the image URL format already used by the file

Upcoming speaker entries use fields such as:

- `id`
- `name`
- `designation`
- `company`
- `imageUrl`
- `eventRole`
- `isKeynote`

Archived speaker entries use fields such as:

- `id`
- `name`
- `designation`
- `company`
- `imageUrl`
- `topic`
- `videoUrl`
- `slidesUrl`

### Update sponsors

File: `src/data/sponsors.ts`

Sponsors are also grouped by year. Each sponsor entry currently contains:

- `id`
- `name`
- `logoUrl`
- `packageTier`

Sponsor testimonials live in the same file under `sponsorTestimonials`.

Guidelines:

- keep year groupings intact
- preserve the existing tier wording
- preserve the current logo URL format already used in the data
- note that testimonial entries are currently marked with `verified`

### Update FAQs

File: `src/data/faqs.ts`

This file includes:

- `faqCategories`
- `faqs`
- `homepageFaqs`

Important rule: `homepageFaqs` is index-based. If you add or remove FAQ entries, re-check the homepage selection logic so it still points at the intended entries.

### Update tickets, team, and summit metadata

Files:

- `src/data/tickets.ts`
- `src/data/team.ts`
- `src/data/summitData.ts`

These files drive key landing-page and historical summit sections. Update them carefully and verify the related page after editing.

## Gallery Updates

Past summit gallery images are not edited manually in data files.

To refresh gallery content:

1. update ImageKit folders if needed
2. update `src/lib/imagekit.paths.ts` if a new year is being added
3. run:

```sh
npm run gallery:fetch
```

This updates the generated gallery JSON used by the app.

## Writing Guidelines

- keep tone clear, professional, and community-centered
- avoid hype-heavy language unless it reflects approved event copy
- use title case for names, roles, and talk titles where appropriate
- prefer complete, scannable sentences in FAQs

## Local Verification

For content changes, the usual minimum check is:

```sh
npm run build
```

For visible page changes, also run:

```sh
npm run dev
```

Then open the relevant page and confirm:

- no broken layout
- no missing image
- no obvious copy or punctuation issues
- no incorrect year or tier labels

## Pull Request Flow

Content changes should normally:

1. branch from `staging`
2. open a PR back into `staging`
3. explain which content files changed
4. include screenshots if the change is visible

Useful branch names:

- `content/update-2026-speakers`
- `content/refresh-faqs`
- `content/add-2025-gallery`

## When To Ask For Developer Help

Ask a developer to pair with you if the content change requires:

- changing component layout
- changing field names or object shapes
- adding a new route
- adding a new integration or environment variable

## Related Docs

- [README.md](../README.md)
- [contributing.md](./contributing.md)
- [CMS_SCHEMA.md](./CMS_SCHEMA.md)
- [imagekit-gallery.md](./imagekit-gallery.md)
