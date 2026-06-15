import { test, expect } from "../../fixtures/base.fixture";
import AxeBuilder from "@axe-core/playwright";
import { attachA11yReport, A11Y_RAW_ATTACHMENT_NAME, A11Y_SUMMARY_ATTACHMENT_NAME } from "../../helpers/a11y-report.helper";

test("#A11Y-0001 - Overview page has no accessibility violations.", async ({ page, overviewGeneral }, testInfo) => {
  await overviewGeneral.goto();

  const results = await new AxeBuilder({ page })
    // Example for CI-only WCAG A/AA coverage:
    // .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  if (results.violations.length > 0) {
    await attachA11yReport(testInfo, results);
  }

  const readableMessage = [
    `Accessibility violations detected: ${results.violations.length}.`,
    `See the "${A11Y_SUMMARY_ATTACHMENT_NAME}" and "${A11Y_RAW_ATTACHMENT_NAME}" attachments in the Playwright HTML report.`,
  ].join(" ");

  expect(results.violations, readableMessage).toHaveLength(0);
});
