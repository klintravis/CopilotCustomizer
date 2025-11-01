---
agent: CopilotCustomizer
---

## Update CopilotCustomizer Entry Point (v1.0)

### Task Intent
Initiate automated change workflow: analysis → planning → implementation → verification → documentation.

### Variable Block
```
CHANGE_REQUEST: "{CHANGE_REQUEST}"
REASON: "{REASON}"
ACCEPTANCE_CRITERIA: "{ACCEPTANCE_CRITERIA}"
SCOPE (or "auto-detect"): "{SCOPE}"
```

### Workflow Phases
**Phase 1: Analysis** (Auto) - Repository scan, dependency analysis
**Phase 2: Planning** (Auto → Gate) - Implementation plan → **USER REVIEW**
**Phase 3: Implementation** (Auto) - Execute changes atomically
**Phase 4: Verification** (Auto) - Validate against criteria
**Phase 5: Documentation** (Auto) - Generate change summary

Reply `confirm` after Phase 2 to proceed.

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: scope` | Adjust files/areas to be modified |
| `refine: approach` | Change implementation strategy |
| `refine: validation` | Enhance verification criteria |
| `refine: docs` | Improve documentation detail level |

### Handoff Chain
```
UpdateCopilotCustomizer → RepoAnalyzer → ImplementationPlanner → [USER GATE] → ChangeExecutor → VerificationAgent → DocumentationGenerator → Complete
```

### Notes
- **Single User Break**: Only after planning phase for efficiency
- **Reuses Instructions**: Leverages existing framework instructions
- **Lightweight Agents**: Minimal specialized logic, maximum instruction reuse
- **Auto-Verification**: Built-in validation against acceptance criteria

---

**Workflow Type**: Automated change implementation with quality gate  
**User Interactions**: 2 (submit + approve plan)  
**Framework**: CopilotCustomizer ecosystem integration
