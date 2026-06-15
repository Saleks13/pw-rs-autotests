# Prompt: Comprehensive Guide to Claude Code Setup and Configuration

Use this prompt in a new Claude conversation to get a detailed guide.

---

```
I'm a QA Automation Engineer learning to use Claude Code (Anthropic's CLI tool) effectively. I work on Playwright + TypeScript E2E test automation projects. I need a comprehensive, beginner-friendly guide covering all Claude Code configuration mechanisms.

For each topic, explain: what it is, why it matters, where files are stored, how to set it up step by step, and provide practical examples using a Playwright test automation project as context.

---

## Part 1: CLAUDE.md — Project Instructions

1. What is CLAUDE.md and why does it exist?
2. Where can it be placed and what are the scoping rules?
   - Project root (`./CLAUDE.md`)
   - Inside `.claude/` directory (`.claude/CLAUDE.md`)
   - User-level (`~/.claude/CLAUDE.md`)
   - Managed/org-level (system paths)
   - How do these scopes interact? What takes precedence?
3. What should go into CLAUDE.md vs. what should NOT be there?
4. How to use `@path/to/file` imports for modular instructions?
5. How to use `.claude/rules/` directory for splitting rules into separate files?
6. Best practices for keeping CLAUDE.md effective (length limits, specificity, structure)
7. Provide a complete example CLAUDE.md for a Playwright test automation project that includes:
   - Project architecture (Page Object Model, fixtures, test data)
   - Running tests (npm scripts, environment switching)
   - Code conventions (naming, file structure, TypeScript strict mode)
   - Git conventions (commit style, what not to commit)
   - CI/CD context (GitHub Actions workflow)

---

## Part 2: Memory System — How Claude Remembers

1. What is Claude Code's memory system and how does it differ from CLAUDE.md?
   - CLAUDE.md = static instructions YOU write
   - Memory = dynamic learnings CLAUDE saves for itself
2. Types of memory Claude can store:
   - **User memory** — who you are, your role, preferences
   - **Feedback memory** — corrections and confirmed approaches
   - **Project memory** — ongoing work context, deadlines, decisions
   - **Reference memory** — pointers to external resources
3. Where are memory files stored? Explain the directory structure:
   - `~/.claude/projects/<project>/memory/`
   - `MEMORY.md` index file (first 200 lines loaded per session)
   - Individual topic files referenced from MEMORY.md
4. What should and should NOT be saved to memory?
   - DO: preferences, role info, feedback, external resource locations
   - DON'T: code patterns (derive from code), git history (use git log), debugging fixes (they're in the code)
5. How to manage memory:
   - `/memory` command — view, toggle, open folder
   - Manually editing/deleting memory files
   - Asking Claude to "remember" or "forget" something
6. How does memory interact with context limits?
7. Provide examples of good vs. bad memory entries for a QA automation context

---

## Part 3: Skills / Slash Commands — Reusable Workflows

1. What are skills and how do they differ from CLAUDE.md instructions?
   - Skills = loaded on-demand, saving context space
   - CLAUDE.md = always loaded
2. Built-in skills that ship with Claude Code — list and explain each:
   - `/batch`, `/claude-api`, `/debug`, `/loop`, `/simplify`, etc.
3. Custom skills — how to create your own:
   - Directory structure: `<skill-name>/SKILL.md`
   - Where to place them:
     - Personal: `~/.claude/skills/<name>/SKILL.md`
     - Project: `.claude/skills/<name>/SKILL.md`
   - SKILL.md frontmatter fields explained:
     - `name`, `description`, `disable-model-invocation`, `user-invocable`
     - `allowed-tools`, `model`, `effort`, `context`, `agent`, `paths`
   - String substitutions: `$ARGUMENTS`, `$0`, `$1`, `${CLAUDE_SKILL_DIR}`
4. Controlling invocation:
   - Manual only (`disable-model-invocation: true`) — for risky operations
   - Auto only (`user-invocable: false`) — for background knowledge
   - Both (default)
5. Provide 5 practical custom skill examples for a Playwright test automation project:
   - A skill to generate a new Page Object class from a URL
   - A skill to create a new test spec file with proper structure and tags
   - A skill to review test code for flaky patterns (hard waits, race conditions)
   - A skill to generate test data fixtures
   - A skill to analyze test failures from CI logs
6. For each example, provide the complete SKILL.md file with frontmatter and instructions

---

## Part 4: Hooks — Deterministic Automation

1. What are hooks and how do they differ from skills?
   - Hooks = always run (deterministic), triggered by events
   - Skills = Claude decides when to use (non-deterministic)
2. Where are hooks configured? (settings.json at different scopes)
3. Hook events — explain each with practical use cases:
   - `SessionStart` — setup tasks when Claude starts
   - `UserPromptSubmit` — pre-process user input
   - `PreToolUse` — validate/block before tool runs
   - `PostToolUse` — auto-format after edits, run linters
   - `PermissionRequest` — auto-approve safe operations
   - `Stop` — cleanup when Claude finishes
   - `Notification` — desktop alerts
   - Other events: `SubagentStart/Stop`, `FileChanged`, `PreCompact/PostCompact`
4. Hook types:
   - `command` — shell scripts
   - `http` — webhook calls
   - `prompt` — single LLM decision
   - `agent` — subagent verification
5. Matchers — how to filter which hooks fire
6. Exit codes and their meaning (0 = proceed, 2 = block, other = proceed with warning)
7. Provide practical hook examples for test automation:
   - Auto-run `npx playwright test --list` after editing a spec file to verify it compiles
   - Block edits to `.env` files
   - Auto-format TypeScript files after edits with prettier
   - Send desktop notification when CI-triggered tests complete
   - Validate that new test files follow naming convention

---

## Part 5: Settings Files — Permissions and Configuration

1. What are settings files and the 4-level scope system:
   - Managed (org-wide, admin-controlled)
   - Project (`.claude/settings.json` — shared via git)
   - Local (`.claude/settings.local.json` — personal, gitignored)
   - User (`~/.claude/settings.json` — personal, all projects)
2. Precedence: Managed > Project > Local > User
3. Key settings explained with examples:
   - `permissions.allow` / `permissions.deny` — tool access control
   - `model` — default model selection
   - `effortLevel` — how much thinking Claude does
   - `env` — environment variables
   - `autoMemoryEnabled` — toggle memory
   - `excludedFiles` — files Claude should never read/edit
   - `sandbox` — file system restrictions
4. Permission rule syntax with practical examples:
   - `"Bash(npm *)"` — allow only npm commands
   - `"Edit(*.ts)"` — allow editing only TypeScript
   - `"Bash(rm -rf *)"` — deny dangerous commands
5. Provide a recommended settings.json for a Playwright test automation project

---

## Part 6: MCP Servers — External Integrations

1. What is MCP (Model Context Protocol)?
2. How MCP servers extend Claude's capabilities
3. Transport types: stdio, HTTP, SSE
4. Configuration in `.mcp.json` files (project and user level)
5. Common MCP servers useful for QA automation:
   - GitHub MCP — interact with issues, PRs, Actions
   - Playwright MCP — browser automation within Claude
   - Database MCP — query test databases
6. Provide a complete `.mcp.json` example for a test automation project

---

## Part 7: Subagents — Specialized AI Assistants

1. What are subagents and when to use them?
2. Where to define them: `.claude/agents/<name>/CLAUDE.md`
3. Frontmatter options: `name`, `description`, `tools`, `model`, `memory`, `hooks`
4. How subagents differ from skills
5. Provide examples useful for test automation:
   - A "test-reviewer" agent that checks test quality
   - A "failure-analyzer" agent that investigates test failures
   - An "explore" agent for codebase navigation

---

## Part 8: Putting It All Together — Complete Project Setup

Show the complete recommended directory structure for a Playwright test automation project:

```
project-root/
├── CLAUDE.md
├── .mcp.json
├── .claude/
│   ├── settings.json
│   ├── settings.local.json
│   ├── rules/
│   ├── skills/
│   ├── agents/
│   └── hooks/
```

For each file/directory, explain:
- What goes there
- When to create it (immediately vs. as needed)
- Whether it should be committed to git

Provide a maturity model:
- **Level 1 (Start here)**: Just CLAUDE.md — project instructions
- **Level 2 (After a week)**: Add settings.json for permissions, memory starts building
- **Level 3 (When patterns emerge)**: Create custom skills for repetitive tasks
- **Level 4 (For team use)**: Add hooks for automation, MCP for integrations
- **Level 5 (Advanced)**: Custom subagents, plugin development

---

## Part 9: Cheat Sheet

Provide a quick-reference table:

| What I want to do | Where to configure | Example |
|---|---|---|
| Set project coding rules | CLAUDE.md | "Use 2-space indentation" |
| Remember my preferences | Memory (automatic) | "User prefers terse responses" |
| Create reusable workflow | .claude/skills/ | Skill to scaffold test files |
| Auto-format on save | Hooks in settings.json | PostToolUse → prettier |
| Block dangerous commands | settings.json permissions | deny: ["Bash(rm -rf *)"] |
| Connect to GitHub | .mcp.json | GitHub MCP server |
| Specialized AI helper | .claude/agents/ | test-failure-analyzer |

---

Format the entire guide with clear headings, annotated code examples, comparison tables, and step-by-step instructions. Use a Playwright + TypeScript test automation project as the running example throughout. Make sure a person with zero Claude Code experience can follow along and set up everything from scratch.
```
