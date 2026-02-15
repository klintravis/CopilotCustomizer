---
description: Fast minimal-diff change with single approval gate and automated verification
argument-hint: Describe the change you want to make
agent: CopilotCustomizer
name: QuickFix
model: Claude Sonnet 4.5 (copilot)
tools: ['execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
---

## QuickFix (v1.0)

### Task Intent
Perform a small, targeted change with a fast approval gate and automated verification and documentation, minimizing touched files.

### Variable Block
---
**Change Request** [REQUIRED]: ${input:changeRequest:Brief description of change needed}
**Scope** [OPTIONAL]: ${input:targetPath:/absolute/path/to/file or folder or "auto-detect"}
---

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
QuickFix → CopilotCustomizer orchestrator → repo-analysis skill → planning skill → [USER GATE] → Editor → Verifier → documentation skill → Complete
```

### Example Invocations

**Fix a typo**:
```
/QuickFix changeRequest: "Fix typo in README: 'analize' should be 'analyze'"
```

**Update configuration**:
```
/QuickFix changeRequest: "Change port from 3000 to 8080 in server config", targetPath: "src/config"
```

**Refactor a function name**:
```
/QuickFix changeRequest: "Rename getUserData() to fetchUserProfile() for clarity"
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
