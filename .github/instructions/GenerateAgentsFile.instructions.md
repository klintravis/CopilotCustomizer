---
applyTo: 'AGENTS.md'
description: 'Standardized framework for creating AGENTS.md files that guide AI coding agents with clear, actionable project instructions and development workflows'
---

# AGENTS.md Workspace File Guide (v1.0)

**Paired Prompt**: [NewAgentsFile.prompt.md](../prompts/NewAgentsFile.prompt.md)

### Purpose
Standardized approach for creating workspace `AGENTS.md` files that guide AI coding agents with clear, actionable project instructions.

**Distinction**: Creates workspace `AGENTS.md` for AI coding agent guidance, NOT VS Code `.agent.md` chat mode files.

### Conflict Resolution
Explicit chat > nearest AGENTS.md > global custom instructions

### Recommended Sections
| Section | Required | Purpose |
|---------|----------|---------|
| Project Overview | Yes | Summary, tech, goals |
| Quick Start | Yes | Install, build, test, lint |
| Code Style | Yes | Lint/format rules |
| Testing | Yes | Run tests, CI |
| PR Instructions | Yes | Title, checks, CI |
| Security | Conditional | Secrets, permissions |
| Monorepo | Conditional | Package commands |

### Template
```markdown
# AGENTS.md — {PROJECT_NAME}
{PRIMARY_TASKS}

## Quick Start
- Install: `pnpm install`
- Build: `{BUILD_CMD}`
- Test: `{TEST_CMD}`
- Lint: `{LINT_CMD}`

## Code Style
- Formatter/Lint: {STYLE_RULES}
- Strictness: {STRICTNESS}

## Testing
- Full: `{TEST_CMD}`
- Focus: `{TEST_FOCUS}`

## PR Instructions
- Title: `{PR_TITLE}`
- Pre-commit: `pnpm lint && pnpm test`

## Security
- Secrets via environment, never committed
- Least privilege for tokens

## Monorepo
- Per-package: `pnpm -F <pkg> test`
```

### Quality Checklist
- [ ] Commands runnable
- [ ] Style/PR rules match conventions
- [ ] Security notes included
- [ ] Monorepo guidance when applicable
- [ ] Cross-references functional

### Output Requirements
- Save to: `CopilotCustomizer/output/agents/`
- Pattern: `<name> - agent - <YYYY-MM-DD>.md`
- Include: `OutputPath`, `GeneratedAt`, `SourceInstruction`, `Type: agent`
- Include ready-to-run Quick Start commands

*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*  
*VS Code: [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)*  
*Coding Agent: [Copilot Coding Agent](https://code.visualstudio.com/docs/copilot/copilot-coding-agent)*