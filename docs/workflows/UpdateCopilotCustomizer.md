# UpdateCopilotCustomizer Workflow

Automated change workflow for CopilotCustomizer repository: analysis → planning → implementation → verification.

## Overview

Use UpdateCopilotCustomizer for structured changes to the CopilotCustomizer framework itself. It analyzes the repository using the repository-analysis skill, plans changes, executes them after approval, and validates outcomes.

## Variables

```
CHANGE_REQUEST: "Description of the change to implement"
REASON: "Justification for this change"
ACCEPTANCE_CRITERIA: "Measurable outcomes to validate success"
SCOPE (or "auto-detect"): "Files/folders to modify"
```

## Handoff Chain

```
UpdateCopilotCustomizer → [repository-analysis skill] → AssetPlanner → [USER GATE] → ChangeExecutor → VerificationAgent → Complete
```

### Workflow Chain

```
┌──────────────────────────────────────┐
│ User Input                           │
│ (CHANGE_REQUEST, REASON,             │
│  ACCEPTANCE_CRITERIA, SCOPE)         │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ UpdateCopilotCustomizer (Entry)      │
│ (uses repository-analysis skill)     │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ AssetPlanner                         │
│ (Generate plan with file list)       │
└───────────┬───────────[confirm]──────┘
            ↓
┌──────────────────────────────────────┐
│ ChangeExecutor                       │
│ (Execute changes atomically)         │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ VerificationAgent                    │
│ (Validate against acceptance)        │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Workflow Complete                    │
└──────────────────────────────────────┘
```

## Workflow Phases

1. **Analysis** (Auto) — Repository scan using repository-analysis skill, impact assessment
2. **Planning** (Auto → Gate) — Implementation plan with explicit file modifications → **USER REVIEW**
3. **Implementation** (Auto) — Execute changes atomically within defined scope
4. **Verification** (Auto) — Validate against acceptance criteria, run lints/builds if applicable

## Acceptance Criteria

- Changes limited to specified SCOPE
- All acceptance criteria validated by VerificationAgent
- No unintended modifications outside SCOPE
- Build/lint passes (if applicable)
- Cross-references and dependencies maintained

## How to Run

1. Use the `/UpdateCopilotCustomizer` slash command with inline variables
   - Example:
     ```
     /UpdateCopilotCustomizer CHANGE_REQUEST: "Update docs for slash commands",
     REASON: "Remove legacy prompt editing flow",
     ACCEPTANCE_CRITERIA: "No docs instruct opening prompts; all examples use / commands",
     SCOPE: "docs/**"
     ```
2. Submit → Review implementation plan
3. Type `confirm` to proceed with execution

## Refinement Commands

| Command | Action |
|---------|--------|
| `refine: scope` | Adjust files/areas to be modified |
| `refine: approach` | Change implementation strategy |
| `refine: validation` | Enhance verification criteria |
| `refine: docs` | Improve documentation detail level |

## References

- Skills: `.github/skills/repository-analysis/SKILL.md`
- Formatting: `.github/instructions/FormatAssets.instructions.md`
- Workflow Validation: `.github/instructions/WorkflowValidation.instructions.md`

## Notes

- **Single User Break**: Only after planning phase for efficiency
- **Reuses Skills**: Leverages repository-analysis skill for analysis
- **Lightweight Agents**: Minimal specialized logic, maximum skill reuse
- **Auto-Verification**: Built-in validation against acceptance criteria
- For quick typo fixes, prefer `/QuickChange` instead
- This workflow targets CopilotCustomizer repository improvements

---

**Workflow Type**: Automated change implementation with quality gate
**User Interactions**: 2 (submit + approve plan)
**Duration**: <5 minutes for typical changes
