---
agent: CopilotCustomizer
---

# AGENTS.md Workspace File Generator (v1.0)

**Paired Instructions**: [GenerateAgentsFile.instructions.md](../instructions/GenerateAgentsFile.instructions.md)

### Task Intent
Generate concise, actionable `AGENTS.md` workspace files.

## Variable Block
---
**Project Name** [REQUIRED]: "{PROJECT_NAME}"
**Primary Tasks** [REQUIRED]: "{PRIMARY_TASKS}"
---

## Validation
- Required: `{PROJECT_NAME}` and `{PRIMARY_TASKS}`
- All other details (commands, style rules, monorepo settings) inferred from project context

### Output Requirements
Generate complete `AGENTS.md` with:
- Title, Quick Start (install/build/test/lint), Code Style, Testing, PR Instructions, Conflict Resolution, Example Commands
- Conditional: Security (high risk), Monorepo Guidance (if monorepo=true)

## Refinement Commands
| Command | Action |
|---------|--------|
| `refine: concise` | Compress to essentials |
| `refine: optimize` | Enhance clarity |
| `refine: expand` | Add examples |

**Generated using**: [GenerateAgentsFile.instructions.md](../instructions/GenerateAgentsFile.instructions.md)

---

*VS Code Copilot Customization Framework v1.0*