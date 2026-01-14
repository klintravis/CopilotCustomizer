---
agent: CopilotCustomizer
---

<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : NewAgentsFile Prompt
Asset Type    : Prompt
Asset Version : v1.0
Invoked At    : {timestamp}
Invocation ID : prompt-newagentsfile-{timestamp-hash}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Prompt Ready | Awaiting variable substitution
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->

# AGENTS.md Workspace File Generator (v1.0)

**Paired Instructions**: [GenerateAgentsFile.instructions.md](../instructions/GenerateAgentsFile.instructions.md)

### Task Intent
Generate concise, actionable `AGENTS.md` workspace files.

## Variable Block

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `prompt/newagentsfile` |
| **Version** | `v1.0` |
| **Created** | `2026-01-14` |
| **Last Modified** | `2026-01-14` |
| **Maintained By** | `CopilotCustomizer` |
| **Status** | `Active` |
| **Category** | `Templates & Generation` |
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

## Traceability & Audit

### Invocation Log
This section tracks when and how this asset is used.

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
*Traceability System v1.0 - Asset tracking enabled*
