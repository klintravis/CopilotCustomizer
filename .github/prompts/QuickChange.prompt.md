---
agent: CopilotCustomizer
---

## QuickChange (v1.0)

```
✨ PROMPT ACTIVATED: QuickChange (v1.0)
   Purpose: Fast minimal-diff changes with single approval gate
   Agent: CopilotCustomizer (interactive mode)
   Skills Engaged: repository-analysis, implementation-planning, technical-documentation
   Agents Engaged: ChangeExecutor, VerificationAgent
   Input: CHANGE_REQUEST, REASON, ACCEPTANCE_CRITERIA, SCOPE
   Workflow: Analysis → Planning (gate) → Implementation → Verification → Documentation
   User Interactions: 1 (confirm plan)
   Output: Minimal changes with validation and summary
```

### Task Intent
Perform a small, targeted change with a fast approval gate and automated verification and documentation, minimizing touched files.

### Variable Block
```
CHANGE_REQUEST: "{CHANGE_REQUEST}"
REASON: "{REASON}"
ACCEPTANCE_CRITERIA: "{ACCEPTANCE_CRITERIA}"
SCOPE (or "auto-detect"): "{SCOPE}"
```

### Workflow Phases
**Phase 1: Analysis** (Auto) - Rapid scan of impacted files and dependencies
**Phase 2: Planning** (Auto → Gate) - Minimal implementation plan with explicit file list → **USER REVIEW**
**Phase 3: Implementation** (Auto) - Apply atomic change within SCOPE only
**Phase 4: Verification** (Auto) - Validate against acceptance criteria; run lint/build if applicable
**Phase 5: Documentation** (Auto) - Generate concise change summary

Reply `confirm` after Phase 2 to proceed.

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: scope` | Adjust files/areas to be modified |
| `refine: approach` | Change implementation strategy (e.g., refactor vs. minimal patch) |
| `refine: validation` | Enhance verification criteria and checks |
| `refine: docs` | Adjust documentation depth/details |

### Handoff Chain
```
QuickChange → repository-analysis skill → implementation-planning skill → [USER GATE] → ChangeExecutor → VerificationAgent → technical-documentation skill → Complete
```

### Notes
- Optimized for small diffs (typos, minor refactors, config/documentation tweaks)
- For asset maintenance (optimize/format), use `OptimizeAndFormat.prompt.md`
- For cross-asset linkage work (harmonize/validate), use `HarmonizeAndValidate.prompt.md`
- See docs: `docs/workflows/QuickChange.md`

---

**Workflow Type**: Fast one-shot change with guardrails  
**User Interactions**: 2 (submit + approve plan)  
**Framework**: Reuses CopilotCustomizer instructions and agents
