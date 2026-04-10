# Environments — Africa DevOps Summit

## CF Free Plan Setup

All deployments share one set of environment variables in the CF dashboard.
The app detects which environment it's running in from the hostname at runtime.

| Environment | URL                             | Branch  | Auto-detected?                |
| ----------- | ------------------------------- | ------- | ----------------------------- |
| Production  | devopssummit.africa             | main    | ✅ hostname match             |
| Staging     | staging.devopssummit.africa     | staging | ✅ hostname match             |
| Preview     | \*.pages.dev                    | feat/\* | ✅ .pages.dev suffix          |
| Local Dev   | localhost:5173 / localhost:4000 | any     | ✅ VITE_APP_ENV in .env.local |

## Per-environment behaviour (runtime, not build-time)

| Feature           | Production            | Staging | Preview | Local  |
| ----------------- | --------------------- | ------- | ------- | ------ |
| PostHog recording | ✅ 20% sample         | ✅ 100% | ✅ 100% | ❌ off |
| Devtools          | ❌                    | ✅      | ✅      | ✅     |
| Debug images      | ❌                    | ✅      | ✅      | ✅     |
| Console logs      | ❌ stripped by ESLint | ✅      | ✅      | ✅     |

## Adding a new environment variable

1. Add to `.env.example` with description
2. Add to `src/config/env.ts` with `optionalEnv()` or `requireEnv()`
3. If required at runtime, validate in `src/config/validateEnv.ts`
4. Set real value in CF Pages dashboard
5. Add to `.env.local` locally
