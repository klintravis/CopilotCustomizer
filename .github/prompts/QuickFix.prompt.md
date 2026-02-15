---
description: Fast minimal-diff change with single approval gate and automated verification
argument-hint: Describe the change you want to make
agent: CopilotCustomizer
---

## QuickFix (v1.0)

```
✨ PROMPT ACTIVATED: QuickFix (v1.0)
   Purpose: Fast minimal-diff changes with single approval gate
   Agent: CopilotCustomizer (interactive mode)
   Skills Engaged: repo-analysis, planning, documentation
   Agents Engaged: Editor, Verifier
   Input: CHANGE_REQUEST, REASON, ACCEPTANCE_CRITERIA, SCOPE
   Workflow: Analysis → Planning (gate) → Implementation → Verification → Documentation
   User Interactions: 1 (confirm plan)
   Output: Minimal changes with validation and summary
```

### Task Intent
Perform a small, targeted change with a fast approval gate and automated verification and documentation, minimizing touched files.

### Variable Block
```
CHANGE_REQUEST: "${input:change_request:Brief description of change needed}"
REASON: "{REASON}"
ACCEPTANCE_CRITERIA: "{ACCEPTANCE_CRITERIA}"
SCOPE (or "auto-detect"): "${input:target_path:/absolute/path/to/file or folder}"
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

### Orchestration Chain
```
QuickChange → CopilotCustomizer orchestrator → repo-analysis skill → planning skill → [USER GATE] → Editor → Verifier → documentation skill → Complete
```

### Notes
- Optimized for small diffs (typos, minor refactors, config/documentation tweaks)
- For asset maintenance (optimize, harmonize, validate), use `/Maintain`

### Framework References
*Framework: [Framework.instructions.md](../instructions/Framework.instructions.md)*

---

**Workflow Type**: Fast one-shot change with guardrails  
**User Interactions**: 2 (submit + approve plan)  
**Framework**: CopilotCustomizer unified orchestration
