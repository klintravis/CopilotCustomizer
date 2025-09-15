mode: ask
## AGENTS.md Scaffold Prompt (v1.0)

Chat Mode Binding: `chatmodes/CopilotCustomizer.chatmode.md`

Paired Instructions: `instructions/GenerateAgent.instructions.md`

Task Intent: Generate a concise, actionable `AGENTS.md` (or `.agent.md`) file that guides coding agents with build/test commands, code style, PR rules, security notes, and optional per-package overrides for monorepos.

### Usage Instructions
1. Fill only required variables; others are inferred.
2. Receive clarifiers or `ready-to-generate` + plan; then reply `confirm`.
3. Use refinement commands to adjust size, depth, or scope.

### Variable Block (only 2 required)
---
Project Name [REQUIRED]: "{PROJECT_NAME}"
Primary Agent Tasks (≤20 words) [REQUIRED]: "{PRIMARY_TASKS}"
Build Command (default: inferred): "{BUILD_CMD}"
Test Command (default: inferred): "{TEST_CMD}"
Lint Command (default: inferred): "{LINT_CMD}"
Style Rules (comma list | default: inferred): "{STYLE_RULES}"
PR Title Format (default: [<project>] <Title>): "{PR_TITLE}"
Security Notes (default: none): "{SECURITY_NOTES}"
Monorepo (yes|no | default: no): {IS_MONOREPO}
Per-Package Pattern (default: packages/*): "{PACKAGE_GLOB}"
Risk Sensitivity (low|medium|high | default: medium): {RISK_SENSITIVITY}
Token Priority (brevity|balance|detail | default: brevity): {TOKEN_PRIORITY}
---

### Validation Rules
- Require `{PROJECT_NAME}` and `{PRIMARY_TASKS}`.
- Omitted commands -> infer (`pnpm` if standard, else `npm run ...`).
- `{IS_MONOREPO}`=yes -> add nested AGENTS.md + filter examples.
- `{RISK_SENSITIVITY}`=high -> include Security checklist.
- `{TOKEN_PRIORITY}`=brevity -> bullet/tables first.
- No dangling placeholders.

### Generation Gate
Respond with clarifying questions OR `ready-to-generate` plus a compact section list. Wait for `confirm` before emitting the `AGENTS.md`.

### Output Requirements (On Confirm)
Produce a complete `AGENTS.md` (or `.agent.md`) containing:
1. Title and short purpose line
2. Quick Start (install, build, test, lint)
3. Code Style (lint/format rules synopsis)
4. Testing Instructions (commands, focus flags, CI notes)
5. PR Instructions (title format, pre-commit checks)
6. Security Considerations (only if risk is high or notes provided)
7. Monorepo Guidance (only if monorepo=true): per-package commands and nested AGENTS.md rules
8. Conflict Resolution Note: explicit chat > nearest AGENTS.md > global instructions
9. Example commands (copy-pasteable)
10. Version note `v1.0`

### Default Refinement Commands
`refine: concise`, `refine: optimize`, `refine: expand`, `refine: risks`

### Internal Quality Checklist
- Mandatory variables set; commands present or inferred
- Conflict resolution note included
- No placeholders
- Token strategy matches `{TOKEN_PRIORITY}`

### Example (Minimal Input)
```
{PROJECT_NAME}=Acme Web
{PRIMARY_TASKS}=Implement features, run tests, open PRs
```
Auto-infers: `pnpm` commands (or npm), style rules, PR title format; adds monorepo section only if requested.

### Version Note
Conforms to `NewPrompt.prompt.md` schema intent (v1.0).
