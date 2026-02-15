````prompt
---
description: Unified asset maintenance — optimize, harmonize, and validate Copilot customization assets
argument-hint: All inputs optional — runs with smart defaults
agent: CopilotCustomizer
---

## Maintain (v1.0)

```
✨ PROMPT ACTIVATED: Maintain (v1.0)
   Purpose: Unified asset maintenance workflow
   Agent: CopilotCustomizer (orchestrated mode)
   Skills Engaged: repo-analysis, documentation
   Agents Engaged: Verifier (includes harmonization)
   Input: TARGET_PATH, MODE, SEVERITY, REPORT_ONLY
   Workflow: Analysis → Mode-specific processing → Verification → Documentation
   Output: Maintained assets with validation report
```

### Task Intent
Unified maintenance workflow for optimizing, harmonizing, and validating Copilot customization assets.

### Variable Block
---
**Target Path** [OPTIONAL]: ${input:targetPath:folder, file, or glob (default: .github)}
**Mode** [OPTIONAL]: ${input:mode:optimize, harmonize, validate, or all (default: all)}
**Severity** [OPTIONAL]: ${input:severity:warn or fix (default: fix)}
**Report Only** [OPTIONAL]: ${input:reportOnly:true or false (default: false)}
**Focus** [OPTIONAL]: ${input:focus:prompts, instructions, agents, or all (default: all)}
---

### Modes
| Mode | Purpose | Actions |
|------|---------|---------|
| **optimize** | Token efficiency & clarity | Reduce duplication, improve clarity, format consistently |
| **harmonize** | Cross-reference binding | Add metadata, establish inter-asset links, standardize terminology |
| **validate** | Quality assurance | Schema compliance, link integrity, orchestration chain validation |
| **all** | Complete maintenance | Run optimize → harmonize → validate in sequence |

### Workflow Phases
**Phase 1: Analysis** (Auto) - Inventory assets under TARGET_PATH filtered by FOCUS
**Phase 2: Processing** (Auto) - Execute MODE-specific maintenance
**Phase 3: Verification** (Auto) - Validate results via Verifier
**Phase 4: Documentation** (Auto) - Generate maintenance report

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: scope` | Narrow TARGET_PATH / FOCUS |
| `refine: mode` | Switch between optimize/harmonize/validate/all |
| `refine: severity` | Toggle warn/fix |
| `refine: docs` | Expand or compress report detail |

### Orchestration Chain
```
Maintain → CopilotCustomizer orchestrator → repo-analysis skill → MODE processing → Verifier → documentation skill → Complete
```

### Notes
- Combines Maintenance operations into single entry point
- Uses Verifier for all validation (includes harmonization capability)
- Non-destructive mode available via REPORT_ONLY=true

### Framework References
*Paired Instructions: [Maintenance.instructions.md](../instructions/Maintenance.instructions.md)*
*Framework: [Framework.instructions.md](../instructions/Framework.instructions.md)*

---
**Workflow Type**: Unified asset maintenance
**User Interactions**: 1 (submit; report auto-generated)
**Framework**: CopilotCustomizer unified orchestration

````
