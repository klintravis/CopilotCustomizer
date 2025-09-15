## Agent File Authoring Guide (Harmony v1.0)

### Purpose
Define a standardized approach to creating `AGENTS.md` (or `.agent.md`) files that guide coding agents (including GitHub Copilot coding agent) with clear, actionable project instructions.

### Scope & Positioning
- Audience: AI coding agents and tools; complements `README.md` for humans.
- Relationship: Align with custom instructions, prompt files, and chat modes; avoid duplicating policy text—link when possible.
- Conflict Resolution Order: explicit chat instruction > nearest `AGENTS.md`/`.agent.md` in the directory tree > global custom instructions.

### Canonical Sections (Recommended Order)
| # | Section | Required | Purpose |
|---|---------|---------|---------|
| 1 | Project Overview | Yes | One-paragraph summary, key tech, goals |
| 2 | Quick Start | Yes | Install, build, test, lint commands (copy-pasteable) |
| 3 | Code Style | Yes | Lint/format rules, strictness, conventions |
| 4 | Testing Instructions | Yes | How to run tests locally and in CI; focus flags |
| 5 | PR Instructions | Yes | Title format, pre-commit checks, CI expectations |
| 6 | Security Considerations | Conditional | Secrets, permissions, data handling, risky ops |
| 7 | Monorepo Guidance | Conditional | Per-package commands; nested `AGENTS.md` precedence |
| 8 | Troubleshooting | Optional | Common failures, logs, rebuild steps |
| 9 | Appendix | Optional | Links to custom instructions, prompts, chat modes |

### Authoring Rules
1. Provide copy-pasteable commands (`pnpm` if standard, else `npm`).
2. Prefer bullets/tables; fence commands. Mark assumptions `(assumed)`.
3. Monorepo: include filter examples and note nearest-file precedence.
4. Never include secrets; link to vault/process docs.

### Skeleton Template
```markdown
# AGENTS.md — {PROJECT_NAME}
Short purpose: {PRIMARY_TASKS}

## Quick Start
- Install: `pnpm install` (assumed)
- Build: `{BUILD_CMD}`
- Test: `{TEST_CMD}`
- Lint: `{LINT_CMD}`

## Code Style
- Formatter/Lint: {STYLE_RULES}
- Type/Strictness: {STRICTNESS}

## Testing Instructions
- Full suite: `{TEST_CMD}`
- Focus single: `{TEST_FOCUS}`
- CI: artifacts, coverage thresholds (assumed)

## PR Instructions
- Title: `{PR_TITLE}`
- Pre-commit: `pnpm lint && pnpm test`
- All checks green before merge

## Security Considerations
- Secrets via environment/CI, never committed
- Least privilege for tokens; review permissions

## Monorepo Guidance
- Per-package: `pnpm -F <pkg> test`
- Nested AGENTS.md: nearest file takes precedence

## Conflict Resolution
Explicit chat > nearest AGENTS.md/.agent.md > global custom instructions

## References
- VS Code customization overview
- Copilot coding agent docs
- agents.md examples
```

### Quality Checklist
- Commands runnable; no placeholders.
- Style/PR rules match repo.
- Security notes if sensitive data/processes.
- Monorepo guidance when applicable.
- Conflict resolution noted.

### Change Management
- Version in file header or repo change log.
- Update when build/test/CI rules change.

### Notes
Keep AGENTS.md brief and actionable; link to deeper docs when needed.

### Output Enforcement (ENFORCED)
- All generated `AGENTS.md` artifacts MUST be written to `CopilotCustomizer/output/agents/`.
- File name pattern: `<repo-or-folder-name> - agent - <YYYY-MM-DD>.md`. Example: `CopilotCustomizer - agent - 2025-09-13.md`.
- Each generated file must include front-matter or top metadata with these keys: `OutputPath`, `GeneratedAt`, `SourceInstruction`, `Type: agent`.
- The `OutputPath` value must be the relative path under the repository root (e.g. `CopilotCustomizer/output/agents/CopilotCustomizer - agent - 2025-09-13.md`).
- Include a small `Ready-to-run` section containing any copy/paste commands (install/build/test) so maintainers can run the Quick Start immediately.

### Example (authoring agents -> output)
- Generated file path: `CopilotCustomizer/output/agents/CopilotCustomizer - agent - 2025-09-13.md`
- Front-matter snippet:
  ```yaml
  OutputPath: CopilotCustomizer/output/agents/CopilotCustomizer - agent - 2025-09-13.md
  GeneratedAt: 2025-09-13T12:00:00Z
  SourceInstruction: instructions/GenerateAgent.instructions.md
  Type: agent
  ```
