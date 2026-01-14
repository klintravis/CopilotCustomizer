---
agent: CopilotCustomizer
---

<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : AssetOptimization Prompt
Asset Type    : Prompt
Asset Version : v1.0
Invoked At    : {timestamp}
Invocation ID : prompt-assetoptimization-{timestamp-hash}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Prompt Ready | Awaiting variable substitution
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->

## Asset Optimization Prompt (v1.0-h1)

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `prompt/assetoptimization` |
| **Version** | `v1.0` |
| **Created** | `2026-01-14` |
| **Last Modified** | `2026-01-14` |
| **Maintained By** | `CopilotCustomizer` |
| **Status** | `Active` |
| **Category** | `Templates & Generation` |

**Paired Instructions**: [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md)

### Task Intent
Optimize VS Code Copilot customization assets while preserving links and structure.

### Variable Block
---
**Asset Path** [REQUIRED]: "{ASSET_PATH}"
---

### Validation Rules
- Required: `{ASSET_PATH}` must exist and be readable
- Asset type and optimization strategy determined automatically
- All links, references, and structure preserved

### Generation Gate
Before optimization, respond with:
- Asset type detection and current structure analysis
- Identified links/references that must be preserved  
- Proposed optimization areas and potential risks
- `ready-to-generate` confirmation request

Only proceed with full optimization after explicit `confirm`.

### Output Requirements
Optimize based on asset type (agent/instructions/prompt):
- Preserve: version numbers, YAML front matter, cross-references, paired relationships
- Optimize: token efficiency, clarity, section organization
- Maintain: all links, build commands, critical metadata

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: preserve-refs` | Re-validate links intact |
| `refine: optimize` | Enhance token efficiency |
| `refine: validate` | Check schema compliance |

**Generated using**: [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md)

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
- Expected outcome: Execution of AssetOptimization Prompt functionality
- Related assets: See related prompts in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---
*Traceability System v1.0 - Asset tracking enabled*
