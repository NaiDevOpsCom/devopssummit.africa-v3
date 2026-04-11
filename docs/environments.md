# Environments

This project uses a mix of build-time and runtime environment handling.

## How Environment Detection Works

The app resolves its runtime environment in `src/config/env.ts` using:

1. Vite test mode
2. the current browser hostname
3. `VITE_APP_ENV` as a local override
4. Vite's `PROD` flag as a final fallback

That means one build can still behave differently depending on where it is hosted, as long as the hostnames match the expected environment rules.

## Runtime Environments

| Environment   | Trigger                                                                     | Notes                             |
| ------------- | --------------------------------------------------------------------------- | --------------------------------- |
| `production`  | `devopssummit.africa` or `www.devopssummit.africa`                          | Main public site                  |
| `staging`     | `staging.devopssummit.africa` or `devopssummit-africa-v3-staging.pages.dev` | Shared pre-production environment |
| `preview`     | any `*.pages.dev` hostname not matched above                                | Feature preview environments      |
| `development` | local fallback or `VITE_APP_ENV=development`                                | Local development                 |

## Local Development

### Defaults

- Vite dev server host: `::`
- Vite dev server port: `8080`
- HMR overlay: disabled

### Typical setup

```sh
cp .env.example .env.local
npm run dev
```

## Variable Reference

### Required public variables

These must exist for the app to start successfully:

| Variable                     | Purpose                                  |
| ---------------------------- | ---------------------------------------- |
| `VITE_IMAGEKIT_URL_ENDPOINT` | Public ImageKit delivery endpoint        |
| `VITE_IMAGEKIT_PUBLIC_KEY`   | Public ImageKit key used by the frontend |

### Optional public variables

| Variable                      | Purpose                                  |
| ----------------------------- | ---------------------------------------- |
| `VITE_APP_ENV`                | Local override for environment detection |
| `VITE_APP_NAME`               | Human-readable app name                  |
| `VITE_APP_VERSION`            | Release/version metadata                 |
| `VITE_PUBLIC_POSTHOG_KEY`     | PostHog project key                      |
| `VITE_PUBLIC_POSTHOG_TOKEN`   | Legacy alias supported by the code       |
| `VITE_PUBLIC_POSTHOG_HOST`    | PostHog API host                         |
| `VITE_API_BASE_URL`           | Future API base URL                      |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Future Stripe integration                |
| `VITE_SENTRY_DSN`             | Future Sentry integration                |
| `VITE_ENABLE_DEVTOOLS`        | Enables non-production debug tools       |
| `VITE_DEBUG_IMAGES`           | Enables non-production image debugging   |

### Build-time only variables

| Variable               | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `IMAGEKIT_PRIVATE_KEY` | Used by `scripts/fetch-gallery.ts` to query ImageKit |
| `SKIP_GALLERY_FETCH`   | Skips gallery sync during CI or special builds       |

Never prefix secrets with `VITE_`.

## Validation Rules

`src/config/validateEnv.ts` enforces:

- presence of required ImageKit variables
- valid `VITE_APP_ENV` values
- warnings for missing production-only observability metadata
- detection of secret-looking values inside `VITE_` variables

If validation fails, the app throws at startup.

## Environment-Specific Behavior

| Behavior                                | Production | Staging | Preview | Development |
| --------------------------------------- | ---------- | ------- | ------- | ----------- |
| PostHog enabled when configured         | Yes        | Yes     | Yes     | Yes         |
| Devtools via `VITE_ENABLE_DEVTOOLS`     | No         | Yes     | Yes     | Yes         |
| Image debugging via `VITE_DEBUG_IMAGES` | No         | Yes     | Yes     | Yes         |

The code enforces these feature flags by combining the environment with each variable, so non-production tools do not leak into production accidentally.

## Adding A New Variable

1. Add the variable to `.env.example`
2. Add access in `src/config/env.ts`
3. Add validation in `src/config/validateEnv.ts` if it is required or security-sensitive
4. Document it in this file if contributors need to know about it
5. Set it in the host or CI system as needed

## CI Notes

GitHub Actions supplies stub values for some jobs so tests and builds can run without production secrets. For example:

- ImageKit values are stubbed for tests
- gallery sync is skipped for build verification using `SKIP_GALLERY_FETCH=true`

If you introduce a new required variable, update CI at the same time.
