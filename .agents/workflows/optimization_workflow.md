---
description: Ensure new features meet performance and quality standards
---
# Optimization and Quality Workflow

Use this workflow when implementing new components or modifying existing ones to ensure they meet the project's high standards.

1. **Plan for Performance**
   - Check if the component will render repeatedly (tabs, scroll-linked animations). If yes, consider using `React.memo`.
   - Identify if the component handles large datasets (>50 items). If yes, consider `react-window` virtualization.
   - Determine if the component is below the fold. If yes, use `useLazyImage` and lazy loading.

2. **Implement with Resilience**
   - Wrap the new feature or section in an `ErrorBoundary`.
   - Ensure a robust `Loading` fallback (Skeleton or Spinner) is defined.
   - Avoid using `any`; use explicit TypeScript interfaces whenever possible.

3. **Verify Compliance**
   - Run `npm run lint` to catch ESLint and Prettier violations.
   - Check for unnecessary re-renders using React DevTools (if applicable).
   - Verify that all new images are served via ImageKit and optimized.

4. **Documentation**
   - **Update `docs/`**: Ensure any architectural or feature changes are reflected in relevant files within the `docs/` directory (e.g., `architecture.md`, `ui-components.md`).
   - **Memoization**: Add `displayName` to memoized components for easier debugging.
   - **System Updates**: Update `README.md` or `.agents/instructions/frontend_standards.md` if any new high-level standards or patterns are introduced.
