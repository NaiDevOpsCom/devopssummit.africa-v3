# Contributing

Thanks for helping improve the Africa DevOps Summit website. This guide covers the day-to-day workflow for code, content, and documentation contributions.

## Ground Rules

- Prefer small, focused pull requests
- Follow existing patterns before introducing new abstractions
- Keep accessibility, responsiveness, and readability in scope for UI work
- Do not commit secrets or rely on undocumented environment variables
- If a change affects docs, update the relevant docs in the same PR

## Branch Strategy

The repository uses two long-lived branches:

- `main`: production-ready releases
- `staging`: active integration branch

Use these branch prefixes:

- `feat/<name>` for new features
- `fix/<name>` for bug fixes
- `chore/<name>` for tooling or dependency work
- `docs/<name>` for documentation-only work
- `content/<name>` for summit copy or data updates
- `hotfix/<name>` for urgent fixes starting from `main`

Normal work should branch from `staging` and open a pull request back into `staging`.

## Local Setup

### Prerequisites

- Node.js `^20.19.0 || >=22.12.0`
- npm

### Install

```sh
git clone git@github.com:NaiDevOpsCom/devopssummit.africa-v3.git
cd devopssummit.africa-v3
git checkout staging
npm ci
cp .env.example .env.local
```

Then start the app:

```sh
npm run dev
```

The dev server runs on `http://localhost:8080`.

## Where To Make Changes

| Change type                | Start here                                                 |
| -------------------------- | ---------------------------------------------------------- |
| New route or page behavior | `src/pages` and `src/App.tsx`                              |
| Shared UI                  | `src/components/ui`                                        |
| Homepage sections          | `src/components/landing`                                   |
| Navbar or footer           | `src/components/layout`                                    |
| Summit content             | `src/data`                                                 |
| Environment variables      | `src/config/env.ts` and `src/config/validateEnv.ts`        |
| ImageKit gallery sync      | `scripts/fetch-gallery.ts` and `src/lib/imagekit.paths.ts` |
| Documentation              | `README.md` and `docs/`                                    |

## Development Workflow

1. Sync `staging`

```sh
git checkout staging
git pull origin staging
```

2. Create a branch

```sh
git checkout -b feat/your-change
```

3. Make the change

4. Run the relevant checks

```sh
npm run typecheck
npm run lint
npm run test
npm run build
```

5. Push and open a PR against `staging`

## Testing Expectations

At minimum, contributors should validate the work they touched.

### For code changes

- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run build`

### For UI-heavy changes

- run the app locally
- verify the affected pages on mobile and desktop widths
- include screenshots or a short recording in the PR

### For documentation-only changes

- keep links, commands, and branch names accurate
- run Prettier if formatting changed substantially

See [testing.md](./testing.md) for the full test and CI matrix.

## Code Style

### TypeScript and React

- prefer explicit types over `any`
- use function components and hooks
- use the `@/` path alias for imports inside `src`
- keep components focused and composable

### Styling

- use Tailwind utilities and existing tokens
- prefer semantic tokens and shared patterns over one-off values
- preserve accessibility when customizing interactive components

### Data and config

- keep summit content in `src/data`
- keep environment access centralized in `src/config/env.ts`
- do not place secrets in `VITE_` variables

### Safety wrappers

- use `SafeHtml` for raw HTML
- use safe link handling for untrusted URLs

## Pull Request Checklist

Before requesting review, make sure the PR:

- targets the correct branch
- explains what changed and why
- includes screenshots for visible UI changes
- updates docs if behavior, setup, or architecture changed
- does not include unrelated refactors

## Content And Documentation Changes

If you are editing summit copy, speaker data, sponsor data, or FAQs, start with [CONTENT_GUIDE.md](./CONTENT_GUIDE.md).

If you are improving docs, keep the following aligned:

- `README.md`
- `docs/architecture.md`
- `docs/contributing.md`
- `docs/testing.md`
- `docs/environments.md`

## Hotfix Flow

For urgent production fixes:

1. branch from `main`
2. open a PR into `main`
3. coordinate with maintainers to bring the fix back into `staging`

Keep hotfix PRs tightly scoped.
