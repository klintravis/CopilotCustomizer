---
agent: CopilotCustomizer
---

## FormatAndVerifyAssets (v1.0)

### Task Intent
Standardize, format, and validate Copilot customization assets in one pass, producing a report and optional fixes.

### Variable Block
```
TARGET_PATH: "{TARGET_PATH}"
SEVERITY: "{SEVERITY}" # one of: warn|fix (default: fix)
REPORT_ONLY: "{REPORT_ONLY}" # true|false (default: false)
```

### Workflow Phases
**Phase 1: Analysis** (Auto) - Inventory assets under TARGET_PATH
**Phase 2: Planning** (Auto) - Propose formatting/normalization actions
**Phase 3: Implementation** (Auto) - Apply `FormatAssets` actions unless REPORT_ONLY=true
**Phase 4: Verification** (Auto) - Validate schema compliance and cross-references
**Phase 5: Documentation** (Auto) - Generate summary report of changes and findings

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: scope` | Limit TARGET_PATH or file patterns |
| `refine: approach` | Toggle report-only vs fix; adjust severity |
| `refine: validation` | Add extra checks (schema versions, link checks) |
| `refine: docs` | Expand or compress reporting detail |

### Handoff Chain
```
FormatAndVerifyAssets → repository-analysis skill → ChangeExecutor (FormatAssets) → VerificationAgent → technical-documentation skill → Complete
```

### Notes
- Uses existing `FormatAssets.instructions.md` and verification checks
- Non-destructive mode available via REPORT_ONLY=true
- See docs: `docs/workflows/FormatAndVerifyAssets.md`

---

**Workflow Type**: Formatting and validation pass  
**User Interactions**: 1 (submit; report auto-generated)  
**Framework**: CopilotCustomizer formatting + verification
