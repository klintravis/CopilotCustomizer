---
description: Generate an AGENTS.md workspace guidance file for a project
argument-hint: Optionally provide the project name and primary tasks
agent: CopilotCustomizer
name: NewAgentsFile
model: Claude Sonnet 4.5 (copilot)
tools: ['execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
---

# AGENTS.md Workspace File Generator (v1.0)

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

### Workflow Phases

**Phase 1: Repository Analysis** (Auto) — Scan project structure, detect tech stack, identify conventions  
**Phase 2: Context Gathering** (Auto) — Extract package.json, build configs, test framework  
**Phase 3: Generation** (Auto) — Create AGENTS.md with project-specific guidance  
**Phase 4: Validation** (Auto) — Verify all commands are executable and references valid

### Example Invocations

**Generate with defaults** (infers everything):
```
/NewAgentsFile
```

**Specify project focus**:
```
/NewAgentsFile projectName: "MyApp", primaryTasks: "API development, testing"
```

**For a specific project**:
```
/NewAgentsFile primaryTasks: "CI/CD, deployment automation"
```

## Refinement Commands
| Command | Action |
|---------|--------|
| `refine: concise` | Compress to essentials |
| `refine: optimize` | Enhance clarity |
| `refine: expand` | Add examples |

**Generated using**: [AgentsFile.instructions.md](../instructions/AgentsFile.instructions.md)

---

*VS Code Copilot Customization Framework v1.0*