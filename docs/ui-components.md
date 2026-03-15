# UI Components Documentation

## SEO Component

**File:** `src/components/SEO.tsx`

### Overview

A reusable, typed SEO component built with `react-helmet-async` that manages `<head>` metadata for every page. It supports page titles, meta descriptions, Open Graph tags, Twitter Cards, canonical URLs, and robots directives.

### Props (`SEOProps`)

| Prop           | Type                                 | Default                 | Description                                          |
| -------------- | ------------------------------------ | ----------------------- | ---------------------------------------------------- |
| `title`        | `string`                             | Site name only          | Page title (appended with `\| Africa DevOps Summit`) |
| `description`  | `string`                             | —                       | Meta description (recommended <160 chars)            |
| `keywords`     | `string`                             | —                       | Comma-separated keywords                             |
| `canonicalUrl` | `string`                             | `/`                     | Path relative to site root (e.g. `/about`)           |
| `ogType`       | `"website" \| "article" \| "event"`  | `"website"`             | Open Graph content type                              |
| `ogImage`      | `string`                             | Default OG image        | Full URL to share image                              |
| `twitterCard`  | `"summary" \| "summary_large_image"` | `"summary_large_image"` | Twitter card format                                  |
| `noIndex`      | `boolean`                            | `false`                 | Adds `noindex,nofollow` robots directive             |

### Usage

```tsx
import SEO from "@/components/SEO";

const MyPage = () => (
  <>
    <SEO
      title="About Us"
      description="Learn about the Africa DevOps Summit."
      keywords="DevOps, Africa, conference"
      canonicalUrl="/about"
    />
    {/* page content */}
  </>
);
```

### Adding SEO to a New Page

1. Import `SEO` from `@/components/SEO`
2. Place `<SEO ... />` as the first child inside the page component
3. Provide unique `title`, `description`, and `canonicalUrl`
4. Keep titles under 60 characters, descriptions under 160

### Architecture

- `react-helmet-async` is wrapped in `<HelmetProvider>` in `src/main.tsx`
- Each page's `<SEO>` replaces the default `<title>` and meta tags from `index.html`
- Constants `SITE_NAME` and `SITE_URL` are defined in `SEO.tsx` — update them if the domain changes

---

## Footer Component

**File:** `src/components/layout/Footer.tsx`

### Structure

The footer uses a responsive 3-column grid layout (`lg:grid-cols-3`):

| Column              | Content                                                         |
| ------------------- | --------------------------------------------------------------- |
| **Brand & Contact** | Logo, tagline, email, phone, social media icons                 |
| **Quick Links**     | Navigation links to key pages (uses React Router `<Link>`)      |
| **Summit Venue**    | Google Maps embed, venue details, date/time, external maps link |

### Design System Usage

- Background: `bg-dark-bg` (maps to `--dark-bg` token)
- Text: `text-primary-foreground`, `text-muted-foreground`
- Accents: `text-primary` for icons and links
- Cards: `bg-card-dark` for social icon backgrounds
- Spacing: `section-padding` utility, consistent `py-16` vertical padding
- Typography: `font-heading` (Sora) for titles, body text inherits Inter

---

## Event Location Map Section

### How It Works

The map uses a **Google Maps Embed iframe** — a zero-dependency, lightweight approach that requires no API key for basic embeds.

```html
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
/>
```

### Features

- Displays the venue with a pin marker
- Responsive width (`w-full`) with fixed 180px height
- Lazy-loaded for performance (`loading="lazy"`)
- "Open in Google Maps" external link for navigation
- Venue details: name, address, date, and time displayed below the map

### How to Update the Venue Location

All venue configuration is in a single `EVENT_VENUE` object at the top of `Footer.tsx`:

```typescript
const EVENT_VENUE = {
  name: "Africa DevOps Summit 2026", // Event name
  venue: "Sarit Expo Centre", // Venue name
  address: "Nairobi, Kenya", // City/Country
  date: "October 16–17, 2026", // Event dates
  time: "8:00 AM – 5:00 PM EAT", // Event time
  mapQuery: "Sarit+Expo+Centre,+Nairobi,+Kenya", // URL-encoded search query
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=...", // External link
};
```

**To change the venue:**

1. Update `venue`, `address`, `date`, and `time` with new values
2. Update `mapQuery` with the URL-encoded venue name and location
3. Update `mapsUrl` — use format: `https://www.google.com/maps/search/?api=1&query=<URL-encoded venue>`
4. For a more precise embed, get a new embed URL from [Google Maps](https://www.google.com/maps):
   - Search for the venue → Share → Embed a map → Copy the `src` URL
   - Replace the iframe `src` value

### Security & Performance

- No API keys stored in client code
- `referrerPolicy="no-referrer-when-downgrade"` for privacy
- `loading="lazy"` defers iframe load until visible
- `allowFullScreen={false}` prevents unnecessary fullscreen capability
