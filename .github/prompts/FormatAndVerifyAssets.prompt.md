---
agent: CopilotCustomizer
---

<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : FormatAndVerifyAssets Prompt
Asset Type    : Prompt
Asset Version : v1.0
Invoked At    : {timestamp}
Invocation ID : prompt-formatandverifyassets-{timestamp-hash}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Prompt Ready | Awaiting variable substitution
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->

## FormatAndVerifyAssets (v1.0)

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `prompt/formatandverifyassets` |
| **Version** | `v1.0` |
| **Created** | `2026-01-14` |
| **Last Modified** | `2026-01-14` |
| **Maintained By** | `CopilotCustomizer` |
| **Status** | `Active` |
| **Category** | `Templates & Generation` |

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
FormatAndVerifyAssets → RepoAnalyzer → ChangeExecutor (FormatAssets) → VerificationAgent → DocumentationGenerator → Complete
```

### Notes
- Uses existing `FormatAssets.instructions.md` and verification checks
- Non-destructive mode available via REPORT_ONLY=true
- See docs: `docs/workflows/FormatAndVerifyAssets.md`

---

**Workflow Type**: Formatting and validation pass  
**User Interactions**: 1 (submit; report auto-generated)  
**Framework**: CopilotCustomizer formatting + verification

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
- Expected outcome: Execution of FormatAndVerifyAssets Prompt functionality
- Related assets: See related prompts in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---
*Traceability System v1.0 - Asset tracking enabled*
