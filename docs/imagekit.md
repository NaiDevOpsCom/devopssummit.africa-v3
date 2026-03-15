# ImageKit Image Delivery — Technical Documentation

**Scope:** Frontend image fetching and delivery only  
**Stack:** React · TypeScript · Vite  
**Last updated:** 2026-03-10

---

## 1. Overview

This integration connects the application to [ImageKit.io](https://imagekit.io) — a cloud media platform that delivers, transforms, and optimizes images via URL parameters.

## 2. Architecture

Components -> Hooks -> Utils -> Lib/Config -> Types

- Components: UI building blocks that render images and loading states (e.g., `IKImage.tsx`, `ImageKitProvider.tsx`).
- Hooks: Custom React hooks that wrap ImageKit behavior and state (e.g., `useImageKit.ts`, `useLazyImage.ts`).
- Utils: Shared helpers for URL building and transformations (e.g., `imagekit.utils.ts`, `imagekit.paths.ts`).
- Lib/Config: Integration configuration and defaults (e.g., `imagekit.config.ts`).
- Types: TypeScript interfaces and union types for transforms and config (e.g., `imagekit.types.ts`).

## 3. Maintenance

To add a new folder, update `src/lib/imagekit.paths.ts`.
To change delivery defaults, update `src/lib/imagekit.config.ts`.

## 4. Testing

To ensure and verify that images are being correctly fetched from ImageKit.io, the project includes a dedicated test suite located in `src/tests`.

### Included Tests

- **Utility Tests (`imagekit.utils.test.ts`)**: Verifies URL endpoint prefixing, transformation serialization (width, quality, blur), and specialized builders like LQIP and srcset.
- **Path Tests (`imagekit.paths.test.ts`)**: Ensures folder and filename concatenation handles edge cases like leading slashes correctly.

### Running Tests

Run the following command in the project root:

```bash
npm test src/tests
```

All tests must pass to verify that the ImageKit integration is functioning correctly and delivering optimized assets as intended.
