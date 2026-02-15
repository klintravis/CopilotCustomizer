---
applyTo: 'AGENTS.md'
description: 'Standardized framework for creating AGENTS.md files that guide AI coding agents with clear, actionable project instructions and development workflows'
---

# AGENTS.md Workspace File Guide (v1.0)

**Paired Prompt**: [NewAgentsFile.prompt.md](../prompts/NewAgentsFile.prompt.md)

### Purpose
Standardized approach for creating workspace `AGENTS.md` files that guide AI coding agents with clear, actionable project instructions.

**Distinction**: Creates workspace `AGENTS.md` for AI coding agent guidance, NOT VS Code `.agent.md` custom agent files.

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

### Standards Integration
When enterprise coding standards are present in `.github/standards/`, incorporate relevant principles naturally:
- Reflect testing practices in Testing section
- Align code style guidance with matched standards
- Include security practices in Security section
- Reference applicable CI/CD conventions in PR Instructions

Never explicitly reference `.github/standards/` files in the generated AGENTS.md — synthesize principles seamlessly.

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: commands` | Update build/test/lint commands |
| `refine: style` | Adjust code style guidelines |
| `refine: security` | Enhance security practices |
| `refine: monorepo` | Add or refine monorepo guidance |

### Output Requirements
- Save to: `CopilotCustomizer/output/agents/`
- Pattern: `<name> - agent - <YYYY-MM-DD>.md`
- Include: `OutputPath`, `GeneratedAt`, `SourceInstruction`, `Type: agent`
- Include ready-to-run Quick Start commands

---

## Processing Metadata

- **Standards Version**: VS Code Copilot v2025.11 (Custom Instructions latest)
- **Role**: Framework for generating AGENTS.md coding guidance files
- **Scope**: Applies to AGENTS.md files in external repositories
- **Distinction**: Workspace guidance files, not VS Code .agent.md custom agents

*Generated following CopilotCustomizer instruction generation standards*

---

## Change History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-01-15 | Initial release |

*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*  
*VS Code: [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)*  
*Coding Agent: [Copilot Coding Agent](https://code.visualstudio.com/docs/copilot/copilot-coding-agent)*