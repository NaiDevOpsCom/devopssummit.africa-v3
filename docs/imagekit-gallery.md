# ImageKit Gallery Sync

The past-summits gallery is populated through a build-time sync step instead of runtime API calls.

## Why The Gallery Is Generated At Build Time

Fetching gallery images ahead of time keeps the runtime app simpler:

- no private key in the browser
- no gallery API latency on page load
- predictable static data for the `PastSummits` page

The generated output behaves like any other local data file once the build finishes.

## Main Files

| File                               | Role                                                   |
| ---------------------------------- | ------------------------------------------------------ |
| `scripts/fetch-gallery.ts`         | queries ImageKit and writes the generated gallery data |
| `src/lib/imagekit.paths.ts`        | source of truth for gallery folder mappings            |
| `src/data/gallery.generated.json`  | generated gallery JSON consumed by the app             |
| `src/components/SummitGallery.tsx` | UI for rendering gallery content                       |

## Commands

### Manual refresh

```sh
npm run gallery:fetch
```

### Production build

`npm run build` eventually triggers `build:bundle`, which runs the gallery sync automatically through `prebuild:bundle`.

## Required Secret

The sync script uses:

- `IMAGEKIT_PRIVATE_KEY`

This variable must never be prefixed with `VITE_`.

## CI Behavior

Build verification in CI uses:

```text
SKIP_GALLERY_FETCH=true
```

When this flag is set, the script skips remote fetching and makes sure a fallback generated file exists so the build can still complete.

## Adding A New Gallery Year

1. Create or confirm the folder in ImageKit
2. Add the folder to `IK_FOLDERS` in `src/lib/imagekit.paths.ts`
3. Confirm the derived year mapping is unique
4. Run `npm run gallery:fetch`
5. Verify the new year appears in the Past Summits experience

## Failure Behavior

The script is designed to be resilient:

- if `IMAGEKIT_PRIVATE_KEY` is missing, it preserves existing gallery data where possible
- if fetching fails for a year that already has cached data, it keeps the old data instead of failing immediately
- if generation is skipped in CI, it writes a minimal stub when needed

## Troubleshooting

### No images appear for a year

- check the folder mapping in `src/lib/imagekit.paths.ts`
- confirm the year can be extracted from the folder key
- run `npm run gallery:fetch` locally with a valid `IMAGEKIT_PRIVATE_KEY`

### Build fails on gallery generation

- verify `IMAGEKIT_PRIVATE_KEY`
- check ImageKit API access from the build environment
- use `SKIP_GALLERY_FETCH=true` only for environments where cached or stub data is acceptable

## Related Docs

- [imagekit.md](./imagekit.md)
- [environments.md](./environments.md)
