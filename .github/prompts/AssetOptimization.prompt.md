---
agent: CopilotCustomizer
---

## Asset Optimization Prompt (v1.0-h1)

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

*VS Code Copilot Customization Framework v1.0*