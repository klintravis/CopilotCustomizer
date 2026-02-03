---
agent: CopilotCustomizer
---

## OptimizeAndFormat (v1.0)

```
✨ PROMPT ACTIVATED: OptimizeAndFormat (v1.0)
   Purpose: Consolidated formatting and optimization workflow
   Agent: CopilotCustomizer (interactive mode)
   Skills Engaged: repository-analysis, technical-documentation
   Agents Engaged: ChangeExecutor, VerificationAgent
   Input: TARGET_PATH, MODE (optimize|format|both), SEVERITY, REPORT_ONLY, FOCUS
   Workflow: Analysis → Planning → Implementation → Verification → Documentation
   Output: Optimized and formatted assets with validation report
```

### Task Intent
Consolidated flow to optimize and/or format Copilot customization assets with schema validation and cross-reference safety.

This replaces overlapping maintenance prompts (formatting, optimization, and related checks) with a single predictable entry point.

### Variable Block
```
TARGET_PATH: "{TARGET_PATH}" # folder, file, or glob; default: ".github"
MODE: "{MODE}" # optimize|format|both (default: both)
SEVERITY: "{SEVERITY}" # warn|fix (default: fix)
REPORT_ONLY: "{REPORT_ONLY}" # true|false (default: false)
FOCUS: "{FOCUS}" # prompts|instructions|agents|all (default: all)
```

### Workflow Phases
**Phase 1: Analysis** (Auto) - Inventory assets under TARGET_PATH filtered by FOCUS
**Phase 2: Planning** (Auto) - Determine safe, minimal changes for MODE and SEVERITY
**Phase 3: Implementation** (Auto) - Apply changes unless REPORT_ONLY=true
**Phase 4: Verification** (Auto) - Validate schema compliance and cross-references
**Phase 5: Documentation** (Auto) - Summarize changes, findings, and any follow-ups

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: scope` | Narrow TARGET_PATH / FOCUS |
| `refine: approach` | Switch MODE, SEVERITY, REPORT_ONLY |
| `refine: validation` | Tighten schema/link checks |
| `refine: docs` | Expand or compress report detail |

### Handoff Chain
```
OptimizeAndFormat → repository-analysis skill → ChangeExecutor → VerificationAgent → technical-documentation skill → Complete
```

### Notes
- Uses `OptimizeAndFormat.instructions.md` for merged optimization + formatting rules
- Non-destructive mode available via REPORT_ONLY=true

---

**Workflow Type**: Optimization + formatting + validation
**User Interactions**: 1 (submit; report auto-generated)
**Framework**: CopilotCustomizer consolidated maintenance
