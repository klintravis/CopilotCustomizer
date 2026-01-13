---
agent: CopilotCustomizer
---

## PromptAndInstructionOptimizer (v1.0)

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
PromptAndInstructionOptimizer → repository-analysis skill → implementation-planning skill → [USER GATE] → ChangeExecutor → VerificationAgent → technical-documentation skill → Complete
```

### Notes
- Leverages `AssetOptimization.instructions.md` and audit dimensions
- Prioritizes token reduction without losing clarity or links
- See docs: `docs/workflows/PromptAndInstructionOptimizer.md`

---

**Workflow Type**: Optimization with quality gate  
**User Interactions**: 2 (submit + approve plan)  
**Framework**: CopilotCustomizer optimization + audit
