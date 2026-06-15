I'm a QA Automation Engineer building my skills in CI/CD for test automation. I have basic knowledge of GitHub Actions and Playwright, but I need a comprehensive, detailed guide on CI/CD best practices specifically for E2E test automation projects.

Please cover the following topics in depth, with practical YAML examples for GitHub Actions and Playwright where applicable. Assume I'm learning — explain the "why" behind each practice, not just the "what."

---

### 1. Repository Architecture
- When should E2E tests live in the same repo as the app vs. a separate repo?
- Pros and cons of each approach
- How does the choice affect CI/CD setup?

### 2. Trigger Strategies
- What events should trigger E2E tests? (push, PR, schedule, manual, deploy)
- How to set up `repository_dispatch` so that the app repo triggers tests in a separate test repo after deployment
- How to use `workflow_dispatch` with inputs for manual runs (environment selection, test suite selection)
- Best practices for cron schedules (when, how often, for which environments)

### 3. Environment Management
- How to map branches to environments (develop → staging, main → prod) in the context of app repos
- How to handle environment selection when the test repo is separate from the app repo
- GitHub Environments: what they are, how to scope secrets per environment
- Repository secrets vs. Environment secrets: when to use which
- How to pass environment-specific config (URLs, credentials, feature flags) to tests

### 4. Test Suite Segmentation
- How to split tests into smoke, regression, and full suites
- How to use tags/grep patterns (@smoke, @regression, @critical) to run subsets
- Which suite to run on which trigger:
  - PR validation → smoke only
  - Post-deploy to staging → full regression
  - Post-deploy to prod → smoke only
  - Daily schedule → full regression on prod
- How to parameterize the workflow to accept a "suite" input

### 5. Single vs. Multiple Workflow Files
- When to keep one parameterized workflow vs. splitting into separate files
- Rule of thumb: one workflow per purpose, not per environment
- Concrete examples of when splitting is justified (different triggers, different runners, different teams, different step sequences)
- Example multi-workflow setup for a mature project

### 6. Reporting and Notifications
- Best practices for test report emails (dynamic subject with pass/fail status, test counts, environment name)
- How to parse Playwright JSON reporter output in CI to extract test counts
- How to deploy HTML reports to GitHub Pages
- How to send conditional notifications (email, Slack) with test results summary
- What information should a good test report notification include?

### 7. Parallelism, Retries, and Performance
- Workers configuration for CI vs. local
- Retry strategies: when to retry, how many times, CI-only retries
- Sharding: how to split tests across multiple CI machines
- Caching node_modules and Playwright browsers to speed up runs

### 8. Security in CI
- Managing credentials (never commit .env files, use secrets)
- App Passwords for email notifications (Gmail SMTP)
- Principle of least privilege for GitHub tokens
- How to handle secrets when tests are triggered from forks (PR security)

### 9. End-to-End Example
Provide a complete, production-ready example that includes:
- A single parameterized GitHub Actions workflow YAML that supports:
  - Push to main → runs smoke tests on staging
  - Daily schedule → runs full regression on staging
  - Manual dispatch → lets user pick environment (test/staging/prod) and suite (smoke/regression/all)
  - repository_dispatch → triggered by app repo after deploy, receives environment and suite as payload
- Playwright config with JSON + HTML reporters
- A parse step that reads Playwright JSON stats and builds a dynamic email subject/body
- Email notification with pass/fail emoji, test counts, environment label, report link, and commit info

### 10. Maturity Model
Describe the stages a test automation CI/CD setup typically goes through as it matures:
- Stage 1: Manual runs, no CI
- Stage 2: Basic CI (push triggers, single environment)
- Stage 3: Multi-environment with parameterized workflows
- Stage 4: App-repo-triggered tests, suite segmentation, reporting
- Stage 5: Sharding, dashboards, trend tracking, alerting

For each stage, explain what to focus on and when it makes sense to move to the next stage.

---

Format the guide with clear headings, tables where useful, and annotated YAML/code examples. Prioritize practical, actionable advice over theory.
