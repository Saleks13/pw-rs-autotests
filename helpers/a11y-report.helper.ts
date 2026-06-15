import type { TestInfo } from "@playwright/test";
import type { AxeResults, ImpactValue, NodeResult, Result } from "axe-core";

const DEFAULT_SNIPPET_MAX_LENGTH = 280;
const UNKNOWN_IMPACT = "unknown";

const IMPACT_PRIORITY: Record<NonNullable<ImpactValue> | typeof UNKNOWN_IMPACT, number> = {
  critical: 0,
  serious: 1,
  moderate: 2,
  minor: 3,
  unknown: 4,
};

export const A11Y_SUMMARY_ATTACHMENT_NAME = "A11Y violations summary";
export const A11Y_RAW_ATTACHMENT_NAME = "A11Y raw axe results";

export function cleanText(value?: string | null): string {
  return value?.replace(/\s+/g, " ").trim() ?? "";
}

export function truncate(value: string, maxLength = DEFAULT_SNIPPET_MAX_LENGTH): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
}

function getImpactLabel(impact?: ImpactValue): NonNullable<ImpactValue> | typeof UNKNOWN_IMPACT {
  return impact ?? UNKNOWN_IMPACT;
}

function formatTargetSelector(target: NodeResult["target"]): string {
  if (!target.length) {
    return "N/A";
  }

  return target
    .map((selectorPart) => (Array.isArray(selectorPart) ? selectorPart.join(" >> ") : selectorPart))
    .join(" -> frame -> ");
}

function compareViolations(left: Result, right: Result): number {
  const impactDifference =
    IMPACT_PRIORITY[getImpactLabel(left.impact)] - IMPACT_PRIORITY[getImpactLabel(right.impact)];

  if (impactDifference !== 0) {
    return impactDifference;
  }

  return left.id.localeCompare(right.id);
}

function formatNode(node: NodeResult, index: number, snippetMaxLength: number): string[] {
  const htmlSnippet = truncate(cleanText(node.html) || "N/A", snippetMaxLength);
  const failureSummary = cleanText(node.failureSummary) || "N/A";

  return [
    `Node ${index + 1}`,
    `Target: ${formatTargetSelector(node.target)}`,
    `HTML: ${htmlSnippet}`,
    `Failure summary: ${failureSummary}`,
  ];
}

export function formatA11yViolations(
  violations: readonly Result[],
  snippetMaxLength = DEFAULT_SNIPPET_MAX_LENGTH,
): string {
  if (violations.length === 0) {
    return "Total violations: 0";
  }

  const sortedViolations = [...violations].sort(compareViolations);
  const lines: string[] = [`Total violations: ${sortedViolations.length}`];

  sortedViolations.forEach((violation, violationIndex) => {
    lines.push("");
    lines.push(`Violation ${violationIndex + 1} of ${sortedViolations.length}`);
    lines.push(`Rule ID: ${violation.id}`);
    lines.push(`Impact: ${getImpactLabel(violation.impact)}`);
    lines.push(`Help: ${cleanText(violation.help) || "N/A"}`);
    lines.push(`Description: ${cleanText(violation.description) || "N/A"}`);
    lines.push(`Help URL: ${violation.helpUrl || "N/A"}`);
    lines.push(`Affected nodes: ${violation.nodes.length}`);

    violation.nodes.forEach((node, nodeIndex) => {
      lines.push("");
      lines.push(...formatNode(node, nodeIndex, snippetMaxLength));
    });

    if (violationIndex < sortedViolations.length - 1) {
      lines.push("");
      lines.push("-".repeat(80));
    }
  });

  return lines.join("\n");
}

export async function attachA11yReport(
  testInfo: TestInfo,
  results: AxeResults,
  snippetMaxLength = DEFAULT_SNIPPET_MAX_LENGTH,
): Promise<string> {
  const summary = formatA11yViolations(results.violations, snippetMaxLength);
  const rawResults = JSON.stringify(results, null, 2);

  await testInfo.attach(A11Y_SUMMARY_ATTACHMENT_NAME, {
    body: Buffer.from(summary, "utf-8"),
    contentType: "text/plain",
  });

  await testInfo.attach(A11Y_RAW_ATTACHMENT_NAME, {
    body: Buffer.from(rawResults, "utf-8"),
    contentType: "application/json",
  });

  return summary;
}
