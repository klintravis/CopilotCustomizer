---
agent: CopilotCustomizer
---

<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : PromptAndInstructionOptimizer Prompt
Asset Type    : Prompt
Asset Version : v1.0
Invoked At    : {timestamp}
Invocation ID : prompt-promptandinstructionoptimizer-{timestamp-hash}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Prompt Ready | Awaiting variable substitution
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->

## PromptAndInstructionOptimizer (v1.0)

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `prompt/promptandinstructionoptimizer` |
| **Version** | `v1.0` |
| **Created** | `2026-01-14` |
| **Last Modified** | `2026-01-14` |
| **Maintained By** | `CopilotCustomizer` |
| **Status** | `Active` |
| **Category** | `Templates & Generation` |

### Task Intent
Optimize prompts and instruction files for clarity, token efficiency, and consistency while preserving behavior.

### Variable Block
```
TARGET_PROMPTS: ["{PROMPT_PATH_1}", "{PROMPT_PATH_2}"]
TARGET_INSTRUCTIONS: ["{INSTR_PATH_1}", "{INSTR_PATH_2}"]
GOAL: "{GOAL}" # token|clarity|both (default: both)
```

### Workflow Phases
**Phase 1: Analysis** (Auto) - Assess verbosity, duplication, and schema compliance
**Phase 2: Planning** (Auto → Gate) - Propose optimization plan with diffs and savings → **USER REVIEW**
**Phase 3: Implementation** (Auto) - Apply safe, minimal-risk optimizations
**Phase 4: Verification** (Auto) - Audit improvements vs `CopilotAudit.instructions.md`; ensure no broken links
**Phase 5: Documentation** (Auto) - Summarize changes, token savings, and rationale

Reply `confirm` after Phase 2 to proceed.

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: scope` | Adjust TARGET_* lists |
| `refine: approach` | Choose conservative vs aggressive optimization |
| `refine: validation` | Add acceptance checks (e.g., content preservation tests) |
| `refine: docs` | Control change log detail and metrics |

### Handoff Chain
```
PromptAndInstructionOptimizer → RepoAnalyzer → ImplementationPlanner → [USER GATE] → ChangeExecutor → VerificationAgent → DocumentationGenerator → Complete
```

### Notes
- Leverages `AssetOptimization.instructions.md` and audit dimensions
- Prioritizes token reduction without losing clarity or links
- See docs: `docs/workflows/PromptAndInstructionOptimizer.md`

---

**Workflow Type**: Optimization with quality gate  
**User Interactions**: 2 (submit + approve plan)  
**Framework**: CopilotCustomizer optimization + audit

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
- Expected outcome: Execution of PromptAndInstructionOptimizer Prompt functionality
- Related assets: See related prompts in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---
*Traceability System v1.0 - Asset tracking enabled*
