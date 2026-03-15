# ImageKit Gallery Integration

This document outlines the architecture, configuration, and workflow for the dynamic gallery system powered by [ImageKit](https://imagekit.io/).

## 1. Overview

The gallery implementation utilizes a **build-time synchronization** strategy. Instead of fetching images directly from the ImageKit API at runtime (which would increase page load time and API costs), a specialized script fetches and caches the image URLs into a local JSON file during the build or development process.

### Key Components

- **`scripts/fetch-gallery.ts`**: The "sync engine" that crawls ImageKit folders and generates the data.
- **`src/lib/imagekit.paths.ts`**: The "source of truth" for folder-to-year mappings.
- **`src/data/gallery.generated.json`**: The generated static asset used by the frontend.
- **`src/components/SummitGallery.tsx`**: The UI component that renders the images.

---

## 2. ImageKit Folder Organization

Images are organized by summit years within the ImageKit Media Library. The application expects folder names to contain the 4-digit year of the summit.

**Example Structure:**

- `/ads2024/` (Africa DevOps Summit 2024)
- `/ads2025/` (Africa DevOps Summit 2025)
- `/ads2026/` (illustrative example for a future summit — this folder does not yet exist)

> [!NOTE]
> The folder name itself is configurable in `src/lib/imagekit.paths.ts`, but the logic automatically extracts the year from the name for the UI.

---

## 3. Configuration & Security

### Environment Variables

To sync the gallery, add the following to your `.env.local`:

```bash
# Private Key (Keep secret, ONLY in .env.local)
IMAGEKIT_PRIVATE_KEY="private_..."
```

The frontend variables (`VITE_IMAGEKIT_URL_ENDPOINT`, etc.) are managed via `src/config/env.ts` and loaded from `.env`.

### Security Considerations

- **Private Key Scope**: The `IMAGEKIT_PRIVATE_KEY` is ONLY used by the `fetch-gallery.ts` script on the server/build machine. It is **never** bundled into the client-side code.
- **Frontend Access**: The frontend only accesses public ImageKit URLs via the generated JSON. No secret keys are exposed to the browser.
- **Warning**: Never commit your `.env` file to version control; add `.env` to your `.gitignore` and use `.env.example` as a template for new developers.

---

## 4. How Synchronization Works

The sync process happens in two main scenarios:

1. **Locally**: Manually by running `npm run fetch-gallery` (required whenever you change ImageKit folder content or `IK_FOLDERS` config).
2. **Production**: Automatically during the CI/CD build process (via the `prebuild` hook in `package.json`).

> [!TIP]
> `npm run dev` does **not** automatically sync the gallery to keep the startup time fast. Always run the sync script after making changes in ImageKit.

### The Fetch Logic

1. The script reads `IK_FOLDERS` from `src/lib/imagekit.paths.ts`.
2. For each folder, it makes a paginated request to the ImageKit `/v1/files` API.
3. It collects all image URLs and saves them to `src/data/gallery.generated.json`.

---

## 5. Adding a New Summit Gallery

Follow these steps to add a new year of photos:

1. **Upload Photos**: Create a new folder in ImageKit (e.g., `ads2026`) and upload your images there.
2. **Update Paths**: Open `src/lib/imagekit.paths.ts` and add your folder key to `IK_FOLDERS`:
   ```typescript
   export const IK_FOLDERS = {
     // ...
     ads2026: "ads2026", // Key: Path
   } as const;
   ```
3. **Run Sync**: Run `npm run fetch-gallery` to update the local cache.
4. **Verify**: The new year will automatically appear in the `PastSummits` tabs, and the `SummitGallery` component will render the new photos.

---

## 6. Automatic Updates

- **Adding Images**: If you add new images to an existing folder in ImageKit, they will appear in the application the next time a build is triggered or the fetch script is run.
- **Randomization**: The gallery uses a **Seeded Fisher-Yates Shuffle**. This means the 3x3 preview grid will look "fresh" but remain consistent within a single build, ensuring high-quality previews are always shown first.

---

## 7. Troubleshooting

- **Missing Images**: Ensure the `IMAGEKIT_PRIVATE_KEY` is correct in your `.env.local` and that the folder path matches `src/lib/imagekit.paths.ts`.
- **Build Resilience**: Our "Smart Caching" logic prevents build failures if keys are missing. It will warn and skip the fetch, preserving existing data in `src/data/gallery.generated.json`.
- **Placeholder Warnings**: If you see "Using fallback images" in development, it means the generated JSON is empty. Run `npm run fetch-gallery` with valid credentials to populate it.
