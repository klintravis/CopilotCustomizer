---
agent: CopilotCustomizer
---

<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : NewPrompt Prompt
Asset Type    : Prompt
Asset Version : v1.0
Invoked At    : {timestamp}
Invocation ID : prompt-newprompt-{timestamp-hash}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Prompt Ready | Awaiting variable substitution
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->

# NewPrompt.prompt.md

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `prompt/newprompt` |
| **Version** | `v1.0` |
| **Created** | `2026-01-14` |
| **Last Modified** | `2026-01-14` |
| **Maintained By** | `CopilotCustomizer` |
| **Status** | `Active` |
| **Category** | `Templates & Generation` |

**Paired Instructions**: [GeneratePrompt.instructions.md](../instructions/GeneratePrompt.instructions.md)

### Task Intent
Generate `*.prompt.md` files.

### Variable Block
---
**Domain** [REQUIRED]: "{DOMAIN}"
**Goal** [REQUIRED]: "{GOAL}"
---

### Validation Rules
- Required: `{DOMAIN}` and `{GOAL}`
- All other details (variables, output sections, refinement commands) inferred from domain and goal

### Generation Gate
Respond first with either:
- A list of clarifying questions (if any required fields weak or missing), or
- `ready-to-generate` and a compact summary of intended structure.
Only after I reply `confirm` should you output the full prompt file markdown.

### Output Requirements
Generate complete `*.prompt.md` with:
- Mode line, Title, Task Intent, Usage, Variable Block, Clarification, Output Specification, Refinement Commands, Quality Checklist, Example, Version Note
- Default refinement: `refine: concise`, `refine: expand`, `refine: optimize`, `refine: risks`

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: concise` | Compress output |
| `refine: expand` | Add details |
| `refine: optimize` | Remove redundancy |

**Generated using**: [GeneratePrompt.instructions.md](../instructions/GeneratePrompt.instructions.md)

---

*VS Code Copilot Customization Framework v1.0*