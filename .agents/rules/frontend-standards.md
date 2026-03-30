---
trigger: always_on
---

# Frontend Development Standards

This document establishes the performance, quality, and resilience standards for the Africa DevOps Summit Hub. Agents and developers should adhere to these guidelines to maintain a high-quality codebase.

## 1. Performance Optimization

### Rendering & Memoization
- **Use `React.memo`**: Major page sections and UI components that are likely to re-render due to parent state changes (e.g., Navbar, Footer, Hero sections) SHOULD be memoized.
- **Memoize Data Processing**: Filtering, sorting, or complex mapping of data arrays (especially speakers and schedule data) SHOULD use `useMemo`.
- **Optimize Callbacks**: Event handlers passed to memoized children SHOULD use `useCallback` when profiling shows it prevents unnecessary re-renders.
- **Profiling**: Always profile using React DevTools before applying memoization to ensure it measurably improves performance.

### Virtualization
- **Virtualization Guidance**: Any list or grid exceeding 50–100 items (e.g., full photo galleries) SHOULD consider using `react-window` for improved scroll performance and memory usage.
- **API Convention**: Use `FixedSizeGrid` or `FixedSizeList` with the `itemData` pattern for item rendering.

### Lazy Loading
- **Page Level**: All pages MUST be lazy-loaded in `App.tsx`.
- **Component Level**: Large, non-critical components that meet objective thresholds (e.g., bundle size >50KB, initial render time >100ms, DOM node count >300) should be lazy-loaded and wrapped in `Suspense`. Measure using Vite/Rollup visualizer for bundle size, React Profiler/Lighthouse for render time, and DOM inspector for node count. We recommend automated checks in CI using these tools.

## 2. Code Quality & Standards

### TypeScript
- **Discourage `any`**: The use of `any` is strongly discouraged. Define explicit interfaces or types for all data.
    - *Exceptions*: Allowed for third-party libraries without types, complex migration steps, or quick debugging helpers. Document exceptions with a comment.
- **Model IDs**: Use the `EntityId` type for all identifiers. `EntityId` is a primitive type representable as `string | number`.
    - *Example*: `type EntityId = string | number;` (Refer to `src/types/index.ts` for the canonical definition).
- **Strict Props**: Pass specific props instead of spreading large objects where possible.

### Linting & Formatting
- **ESLint**: Run `npm run lint` before committing. All errors should be fixed.
- **Prettier**: Code MUST be formatted according to `.prettierrc`.
- **Line Endings**: Always use Unix-style (`LF`) line endings.

## 3. Resilience & UX

### Error Boundaries
- **Section Isolation**: Wrap major feature sections in the local `ErrorBoundary` component located at `src/components/ui/ErrorBoundary.tsx`.
    - *Usage Example*:
      ```tsx
      import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
      
      <ErrorBoundary 
        fallback={<p>Custom Error Message</p>}
        onError={(err, info) => logToService(err, info)}
      >
        <MyComplexSection />
      </ErrorBoundary>
      ```

### Accessibility (A11y)
- **Status Indicators**: Loaders MUST have `role="status"`. Redundant `aria-live` or `aria-label` should be avoided if the context is clear.
- **Descriptions**: Use `aria-label` for interactive elements without visible text.
- **Decoration**: Mark decorative elements with `aria-hidden="true"`.

### Loading Patterns
- **Skeletons**: Prefer custom Skeletons over generic spinners to reduce Cumulative Layout Shift (CLS).
- **Suspense Transitions**: Use per-page `Suspense` fallbacks to allow the shell to remain interactive.

## 4. Asset Management
- **ImageKit**: Use the ImageKit proxy/CDN for all images.
- **Lazy Images**: Use the `useLazyImage` hook (defined in `src/hooks/useLazyImage.ts`) for images below the fold.
    - *Usage Example*:
      ```tsx
      const { ref, isVisible, isLoaded } = useLazyImage();
      return <img ref={ref} src={isVisible ? actualSrc : placeholder} ... />;
      ```

## 5. Documentation & Knowledge

Maintaining up-to-date documentation is critical for project health and long-term maintenance.

- **Mandatory Documentation**: Every new feature, architectural change, or system update MUST be accompanied by new or updated documentation in the `docs/` directory.
- **Relevant Documentation Files**:
    - **Architectural Changes**: Update `docs/architecture.md`.
    - **New UI Components**: Document in `docs/ui-components.md`.
    - **Security Updates**: Document in `docs/security.md`.
    - **ImageKit/Asset Changes**: Update `docs/imagekit.md` for ImageKit config changes, `docs/imagekit-gallery.md` for gallery UI/usage changes, and both when applicable.
- **Format**: Documentation should be clear, concise, and follow the existing patterns in the `docs/` directory.
- **Knowledge Base**: Updates to internal standards should be reflected here in `.agents/rules/frontend-standards.md`.

## 6. Security & XSS Prevention

To prevent Cross-Site Scripting (XSS) and other injection attacks, follow these mandatory practices:

### Centralized Sanitization
- **Avoid Raw `dangerouslySetInnerHTML`**: Never use this property directly.
- **Use `SafeHtml`**: Use the `SafeHtml` component from `src/components/SafeHtml.tsx` for all HTML rendering. It applies `sanitizeHtml` (DOMPurify) before rendering.
- **Plain Text**: Use `sanitizeText` from `src/utils/sanitize.ts` for any user-provided string displayed in the UI.

### Safe Links & URLs
- **Use `SafeLink`**: Use `SafeLink` from `src/components/SafeLink.tsx` instead of `<a>` for any link with a dynamic or user-controllable `href`. 
    - It automatically validates protocols (`http`, `https`, `mailto`, `tel`) and adds `rel="noopener noreferrer"` for external links.
- **Type Safety**: Use the `SafeUrl` branded type from `src/types/safe.ts` for props and functions that require validated URLs. Cast using `toSafeUrl(url)`.

### User Input & State
- **`useSafeInput` Hook**: Use this hook instead of `useState` for any string state that originates from user input or external APIs and is rendered back to the UI. 

### Environment Configuration
- **Centralized Access**: All environment variables MUST be accessed via `src/config/env.ts`. Direct use of `import.meta.env` is prohibited outside this file.
- **Runtime Validation**: The `validateEnv()` function MUST be called at the application entry point (`main.tsx`) to catch configuration errors and security violations early.
- **Secret Detection**: Never prefix sensitive keys (API secrets, private tokens) with `VITE_`.

### Enforcement & Build Safety
- **ESLint**: The `eslint-plugin-no-unsanitized` rule is active.
- **Production Stripping**: Production builds drop `console.log`, `console.debug`, and `debugger` statements.
