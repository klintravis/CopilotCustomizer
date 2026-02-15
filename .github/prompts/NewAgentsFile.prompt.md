---
description: Generate an AGENTS.md workspace guidance file for a project
argument-hint: Optionally provide the project name and primary tasks
agent: CopilotCustomizer
---

# AGENTS.md Workspace File Generator (v1.0)

```
✨ PROMPT ACTIVATED: NewAgentsFile (Asset Generator)
   Purpose: Generate workspace-level AGENTS.md guidance files
   Standard: VS Code/GitHub workspace documentation
   Instructions: AgentsFile.instructions.md
   Input: PROJECT_NAME, PRIMARY_TASKS
   Output: Complete AGENTS.md with quick start, style guide, testing, PR guidelines
   Scope: Workspace-wide developer guidance
```

**Paired Instructions**: [AgentsFile.instructions.md](../instructions/AgentsFile.instructions.md)

### Task Intent
Generate concise, actionable `AGENTS.md` workspace files.

## Variable Block
---
**Project Name** [OPTIONAL]: ${input:projectName:inferred from folder name}
**Primary Tasks** [OPTIONAL]: ${input:primaryTasks:e.g., API development, testing, CI/CD}
---

## Validation
- All inputs optional — both `projectName` and `primaryTasks` are inferred from repository context
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

**Generated using**: [AgentsFile.instructions.md](../instructions/AgentsFile.instructions.md)

---

*VS Code Copilot Customization Framework v1.0*