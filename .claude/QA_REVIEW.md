# Automation QA Best Practices Review
## Project: pw-rs-autotests (Playwright / TypeScript)

---

## Resolved Issues

| # | Issue | Resolution |
|---|-------|------------|
| 1 | Credentials committed to git | `.env*` added to `.gitignore`, files not tracked. User rotated passwords |
| 2 | CI workflow: dead env step | Removed the misleading "Set environment variables" step |
| 3 | Branch trigger typo in workflow | Fixed `-main` → `- main` |
| 4 | `npx playwright install` missing `--with-deps` | Changed to `npx playwright install --with-deps chromium` |
| 5 | `workers: 1` on CI | Updated to `workers: process.env.CI ? 3 : 1` |
| 6 | `retries: 1` in both CI and local | Updated to `retries: process.env.CI ? 1 : 0` |
| 7 | No `tsconfig.json` | Added with `strict: true`, `moduleResolution: Node` |
| 8 | No npm scripts | Added `test`, `test:headed`, `test:debug`, `test:ui`, `test:auth`, `test:no-auth`, `test:report`, `test:prod` |
| 9 | `.auth/` not gitignored | Verified — already correctly ignored |
| 10 | Hardcoded email in workflow | Replaced with `${{ secrets.REPORT_EMAIL }}` |
| 11 | Hardcoded values in `Utils.newRandomUser()` | Moved to `REGISTRATION` block in `testData.json`, loaded via `TestDataLoader` |
| 12 | Incomplete German translation | Skipped — known issue |
| 13 | Logic bug in `mainNavBar.component.ts` | Fixed manually by user |
| 14 | Typo in filename `transctionsBase` | Renamed to `transactionsBase.page.ts`, all imports updated |
| 15 | Broken import paths (spaces) | Fixed `page components` → `page-components` in reports.page.ts and organizations.page.ts |
| 16 | Screenshot storage unbounded | Not an issue — CI uses fresh agents each run |
| 17 | Redundant check in `envLoader.ts` | Removed dead `if (!ENV)` block (unreachable due to `\|\|` fallback) |
| 18 | Empty test `#MNB-0002` | Removed by user |
| 19 | Typo `selectLefalForm` | Renamed to `selectLegalForm` in page + test |
| 20 | Unused `page` parameter in `#SU-0002` | Fixed by user |
| 21 | `PhoneCodes` enum duplicate values | Fixed to map to distinct option indices (1-5) |
| 22 | `baseURL` two sources of truth | Consolidated to `.env.*` file only, removed `BASE_URL` from `testData.json` |

---

## All issues resolved. No remaining issues.

---

## CI/CD Readiness Summary

| Area | Status |
|------|--------|
| Secret management | :white_check_mark: `.env*` gitignored, secrets in GitHub |
| Workflow trigger | :white_check_mark: Branch trigger fixed |
| Browser install | :white_check_mark: `--with-deps chromium` |
| Parallelism | :white_check_mark: workers=3 on CI |
| Retries | :white_check_mark: Retries only on CI |
| TypeScript config | :white_check_mark: `tsconfig.json` with strict mode |
| npm scripts | :white_check_mark: Developer-friendly scripts added |
| Artifact upload | :white_check_mark: HTML report uploaded correctly |
| Auth state handling | :white_check_mark: Storage state reuse is correct |
| Environment switching | :white_check_mark: ENV var pattern works |
| Reporting | :white_check_mark: GitHub Pages deploy + email via secret |
