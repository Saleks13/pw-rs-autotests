# Project: pw-rs-autotests

Playwright + TypeScript E2E test automation for the RestStep application.

## Architecture

- **Pattern**: Page Object Model (POM)
- **Pages**: `pages/` — organized by feature (onboarding, overview, transactions, reports, welcome)
- **Shared components**: `pages/page-components/` — header, footer, nav bars
- **Fixtures**: `fixtures/` — base fixture extended by feature fixtures (onboarding, overview)
- **Tests**: `tests/auth/` (require login) and `tests/no-auth/` (public pages)
- **Test data**: `testData/testData.json` — per-environment config, loaded via `testData/testDataLoader.ts`
- **Localization**: `localization/` — JSON files (en.json, de.json), loaded via `utils/localizationLoader.ts`

## Environment

- Controlled via `ENV` variable: `test` (default) or `prod`
- Credentials and URLs in `.env.test` / `.env.prod` (gitignored, never commit)
- `envLoader.ts` loads the correct `.env` file based on `ENV`
- `baseURL` comes from `process.env.BASE_URL` (single source of truth)

## Running tests

```bash
npm test              # all tests (test env)
npm run test:headed   # with browser visible
npm run test:auth     # auth-required tests only
npm run test:no-auth  # public page tests only
npm run test:prod     # all tests against prod
npm run test:report   # open last HTML report
```

## CI/CD

- Workflow: `.github/workflows/playwright-tests.yml`
- Triggers: push to main, daily cron (05:00 UTC), manual dispatch with environment dropdown
- Secrets are in GitHub Environments (`.env.test`, `.env.prod`) and Repository secrets (email config)
- Reports: HTML deployed to GitHub Pages, email notification with test counts

## Git conventions

- Do not include Co-Authored-By lines in commit messages
- Write concise commit messages in imperative mood
- Never commit `.env` files or credentials

## Code conventions

- TypeScript strict mode (`tsconfig.json`)
- Test IDs follow pattern: `#PREFIX-NNNN` (e.g., `#MNB-0001`, `#SU-0002`)
- Tags: `@smoke` for smoke tests
- Playwright projects: `setup`, `chromium-auth`, `chromium-no-auth`
