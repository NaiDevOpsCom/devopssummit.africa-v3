# ImageKit Integration

This guide covers the runtime ImageKit integration used by the frontend.

## What ImageKit Does In This Repo

ImageKit is used for:

- frontend image delivery helpers
- shared image configuration
- build-time gallery synchronization

Not every image in the repo currently comes from ImageKit. Some existing speaker, sponsor, and team images are still static URLs from older sources. ImageKit is the active integration layer for optimized delivery and gallery management.

## Main Files

| File                                  | Role                                              |
| ------------------------------------- | ------------------------------------------------- |
| `src/components/ImageKitProvider.tsx` | wraps the ImageKit context provider               |
| `src/components/IKImage.tsx`          | shared image component for ImageKit-backed assets |
| `src/context/ImageKitContext.ts`      | context definition                                |
| `src/hooks/useImageKit.ts`            | hook for ImageKit behavior                        |
| `src/hooks/useImageKitContext.ts`     | context access helper                             |
| `src/hooks/useLazyImage.ts`           | lazy-image behavior                               |
| `src/lib/imagekit.config.ts`          | default integration config                        |
| `src/lib/imagekit.paths.ts`           | shared folder/path helpers                        |
| `src/utils/imagekit.utils.ts`         | URL and transformation helpers                    |

## Required Public Variables

Runtime delivery depends on:

- `VITE_IMAGEKIT_URL_ENDPOINT`
- `VITE_IMAGEKIT_PUBLIC_KEY`

These are validated at startup by `src/config/validateEnv.ts`.

## Typical Flow

1. `main.tsx` mounts `ImageKitProvider`
2. shared hooks and components read ImageKit config from context
3. UI components build delivery URLs and render optimized images

## When To Use The ImageKit Layer

Use the existing ImageKit helpers when:

- rendering gallery images
- adding new optimized media delivery behavior
- building responsive image or lazy-loading flows

You do not need to force every legacy static image through ImageKit immediately. Keep migrations deliberate and scoped.

## Testing

ImageKit helpers are covered by tests in the repo's Vitest suite. Run:

```sh
npm run test
```

If you are changing path or transformation helpers, also run:

```sh
npm run test:coverage
```

## Related Docs

- [imagekit-gallery.md](./imagekit-gallery.md)
- [environments.md](./environments.md)
- [testing.md](./testing.md)
