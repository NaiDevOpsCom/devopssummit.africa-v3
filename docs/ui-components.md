# UI Components

This guide explains how UI is organized in the repository and where new components should live.

## Component Layers

| Location                 | Purpose                                                    |
| ------------------------ | ---------------------------------------------------------- |
| `src/pages`              | Route-level pages that assemble sections and page metadata |
| `src/components/layout`  | Global shell pieces such as the navbar and footer          |
| `src/components/landing` | Homepage-only sections                                     |
| `src/components/ui`      | Shared primitives and reusable building blocks             |
| `src/components`         | Cross-cutting components that do not fit a single layer    |
| `src/stories`            | Storybook examples and isolated UI documentation           |

## Key Shared Components

### `SEO.tsx`

Page-level head metadata wrapper built on `react-helmet-async`.

Use it near the top of a route component to set:

- title
- description
- canonical URL
- Open Graph metadata
- robots directives

### `SafeHtml.tsx`

Use this when rendering rich text or HTML from data or external systems. It sanitizes content before rendering.

### `SafeLink.tsx`

Use this for untrusted external URLs. It sanitizes the href and applies safe external link attributes when needed.

### `IKImage.tsx`

Shared ImageKit-aware image component for optimized image delivery behavior.

### `SummitGallery.tsx`

Past summit gallery rendering, backed by generated ImageKit gallery data.

### `ErrorBoundary.tsx`, `Loading.tsx`, toast wrappers

These provide consistent app-shell UX for loading states, error handling, and notifications.

## Authoring Guidelines

### Add a new page-specific section when

- the component only belongs to one page
- the naming is tied to that page's content structure
- reuse outside that page is unlikely

Example: a homepage hero or sponsor CTA section belongs in `src/components/landing`.

### Add a new shared UI component when

- it will be reused across routes
- it represents a generic pattern such as a card, badge, section header, or wrapper
- it should have a stable API independent of one page's copy

### Add a cross-cutting component in `src/components` when

- it provides app behavior rather than generic presentation
- it integrates with external systems or shared concerns
- it wraps infrastructure-like logic such as SEO, safe rendering, or routing helpers

## shadcn/ui and Radix Rules

The project uses shadcn/ui conventions on top of Radix primitives.

Guidelines:

- prefer extending existing primitives before inventing parallel versions
- keep accessibility intact when styling interactive primitives
- if a component is clearly generated boilerplate, avoid manual rework unless the repo already treats it as owned code

If you add a new shadcn-style primitive, document it with a Storybook story where practical.

## Styling Rules

- use Tailwind utilities and existing design tokens
- prefer semantic tokens from `src/index.css`
- avoid scattering brand colors or spacing values throughout components
- test layouts on both mobile and desktop widths

## Typical Page Composition

Most pages follow this structure:

1. import SEO and layout helpers
2. import route-specific sections or shared cards
3. render `Navbar`
4. render the page content inside `main`
5. render `Footer`

That pattern keeps route assembly easy to scan and makes shared layout behavior consistent.

## Storybook

Use `src/stories` for isolated component examples, especially when:

- building a new reusable component
- refining interaction states
- documenting prop combinations for future contributors

Run Storybook with:

```sh
npm run storybook
```

## Related Docs

- [architecture.md](./architecture.md)
- [testing.md](./testing.md)
- [contributing.md](./contributing.md)
