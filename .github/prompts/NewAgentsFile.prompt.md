---
agent: CopilotCustomizer
---

<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: NewAgentsFile Prompt (Prompt) v1.0
   STATUS: Prompt Ready — Awaiting execution
════════════════════════════════════════════════════════════════════════════ -->

# AGENTS.md Workspace File Generator (v1.0)

**Paired Instructions**: [GenerateAgentsFile.instructions.md](../instructions/GenerateAgentsFile.instructions.md)

### Task Intent
Generate concise, actionable `AGENTS.md` workspace files.

## Variable Block

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

**Log Entry Format**:
```
[YYYY-MM-DD HH:MM:SS UTC] - Invoked by: {user/system} | Context: {brief description}
```

**Recent Invocations**:
_Manual logging - update this section when invoked_
- [2026-01-14] Added traceability system

### Usage Guidelines
- This asset should be invoked when: Prompt-specific workflows are needed
- Expected outcome: Execution of NewAgentsFile Prompt functionality
- Related assets: See related prompts in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---

---

## Audit
Last invoked: [Manual log]
Change history: v1.0 (2026-01-14) - Added traceability
