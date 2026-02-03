---
agent: CopilotCustomizer
---

## Maintain (v1.0)

```
✨ PROMPT ACTIVATED: Maintain (v1.0)
   Purpose: Unified asset maintenance workflow
   Agent: CopilotCustomizer (interactive mode)
   Skills Engaged: repository-analysis, technical-documentation
   Agents Engaged: VerificationAgent (includes harmonization)
   Input: TARGET_PATH, MODE, SEVERITY, REPORT_ONLY
   Workflow: Analysis → Mode-specific processing → Verification → Documentation
   Output: Maintained assets with validation report
```

### Task Intent
Unified maintenance workflow for optimizing, harmonizing, and validating Copilot customization assets.

### Variable Block
```
TARGET_PATH: "{TARGET_PATH}" # folder, file, or glob; default: ".github"
MODE: "{MODE}" # optimize|harmonize|validate|all (default: all)
SEVERITY: "{SEVERITY}" # warn|fix (default: fix)
REPORT_ONLY: "{REPORT_ONLY}" # true|false (default: false)
FOCUS: "{FOCUS}" # prompts|instructions|agents|all (default: all)
```

### Modes
| Mode | Purpose | Actions |
|------|---------|---------|
| **optimize** | Token efficiency & clarity | Reduce duplication, improve clarity, format consistently |
| **harmonize** | Cross-reference binding | Add metadata, establish inter-asset links, standardize terminology |
| **validate** | Quality assurance | Schema compliance, link integrity, handoff chain validation |
| **all** | Complete maintenance | Run optimize → harmonize → validate in sequence |

### Workflow Phases
**Phase 1: Analysis** (Auto) - Inventory assets under TARGET_PATH filtered by FOCUS
**Phase 2: Processing** (Auto) - Execute MODE-specific maintenance
**Phase 3: Verification** (Auto) - Validate results via VerificationAgent
**Phase 4: Documentation** (Auto) - Generate maintenance report

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: scope` | Narrow TARGET_PATH / FOCUS |
| `refine: mode` | Switch between optimize/harmonize/validate/all |
| `refine: severity` | Toggle warn/fix |
| `refine: docs` | Expand or compress report detail |

### Handoff Chain
```
Maintain → repository-analysis skill → MODE processing → VerificationAgent → technical-documentation skill → Complete
```

### Notes
- Combines OptimizeAndFormat + HarmonizeAndValidate into single entry point
- Uses VerificationAgent for all validation (includes harmonization capability)
- Non-destructive mode available via REPORT_ONLY=true
- See docs: `dev/docs/workflows/Maintain.md`

---
**Workflow Type**: Unified asset maintenance
**User Interactions**: 1 (submit; report auto-generated)
**Framework**: CopilotCustomizer consolidated maintenance
