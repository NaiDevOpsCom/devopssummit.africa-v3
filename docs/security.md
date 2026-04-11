# Security

This project is a static frontend application, so most security work here is about protecting the client bundle, public configuration, external integrations, and content rendering.

## Reporting A Vulnerability

Please do not open a public issue for security problems.

Use one of these private paths:

- the repository's private vulnerability reporting flow, if enabled
- a direct maintainer contact channel
- the project security address once provisioned

Current placeholder contact in project docs: `security@devopssummit.africa`

When reporting, include:

- what the issue is
- how to reproduce it
- the likely impact
- any screenshots or proof of concept that help confirm the issue

## Current Security Controls

### Public env validation

`src/config/validateEnv.ts` runs at startup and protects against:

- missing required public variables
- malformed environment values
- secret-looking values accidentally placed in `VITE_` variables

This is especially important because `VITE_` variables are bundled into the browser build.

### Safe HTML rendering

Use `SafeHtml` when rendering HTML content from outside the component source. It sanitizes content with DOMPurify before rendering.

Do not use raw `dangerouslySetInnerHTML` for content pulled from data or integrations.

### Safe links

Use safe link handling for untrusted URLs. `SafeLink` sanitizes the URL and applies `rel="noopener noreferrer"` for external targets.

### Security headers

The project includes `public/_headers` with edge/security headers for static hosting platforms that support them. That file currently covers:

- CSP
- HSTS
- clickjacking protection
- MIME sniffing protection
- referrer policy
- permissions policy
- cross-origin policies

If you add a new third-party domain for scripts, frames, images, or network calls, update `public/_headers` in the same PR.

### Secret and dependency scanning

CI runs:

- `npm audit --audit-level=high`
- Gitleaks against repository history

If you add a dependency or external integration, assume the security jobs need to keep passing without special exemptions.

## Scope

### In scope

- the static application code in this repository
- public environment handling
- content rendering and sanitization
- build-time scripts, including gallery sync
- deployed site behavior on official domains and preview environments

### Out of scope

- vulnerabilities in third-party vendor platforms themselves
- denial-of-service attacks
- social engineering against maintainers
- issues in dependencies that belong upstream unless this repo exposes them through configuration or usage

## Contributor Rules

- never commit `.env.local`
- never put secrets in `VITE_` variables
- centralize new env access in `src/config/env.ts`
- validate required runtime values in `src/config/validateEnv.ts`
- sanitize raw HTML before rendering
- review CSP and allowed origins when adding third-party services

## Local Security Checklist

Before merging a security-sensitive change:

```sh
npm run lint
npm run test
npm run build
```

Also verify:

- no secret values were added to tracked files
- no new external domain is missing from `public/_headers`
- raw HTML and untrusted links still pass through safe wrappers

## Common Risk Areas In This Repo

### Environment leaks

The biggest recurring risk in a Vite app is exposing secrets by prefixing them with `VITE_`. Treat every `VITE_` variable as public.

### Third-party content and URLs

Speaker bios, sponsor links, or future CMS content can introduce unsafe HTML or unsafe URLs if they bypass the existing wrappers.

### Static hosting misconfiguration

The app depends on route rewrites and security headers. If the deployment target changes, verify that:

- SPA rewrites still work
- `_headers` or equivalent host-level security headers are still applied
- service worker and manifest files remain reachable

## Related Files

- `src/config/env.ts`
- `src/config/validateEnv.ts`
- `src/components/SafeHtml.tsx`
- `src/components/SafeLink.tsx`
- `public/_headers`
- `public/_redirects`
