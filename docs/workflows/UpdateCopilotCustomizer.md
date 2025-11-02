# UpdateCopilotCustomizer Workflow

Automated change workflow for CopilotCustomizer repository: analysis → planning → implementation → verification → documentation.

## Overview
Use UpdateCopilotCustomizer for structured changes to the CopilotCustomizer framework itself. It analyzes the repository, generates an implementation plan, executes changes after approval, validates outcomes, and documents results.

## Variables
```
CHANGE_REQUEST: "Description of the change to implement"
REASON: "Justification for this change"
ACCEPTANCE_CRITERIA: "Measurable outcomes to validate success"
SCOPE (or "auto-detect"): "Files/folders to modify"
```

## Handoff Chain
```
UpdateCopilotCustomizer → RepoAnalyzer → ImplementationPlanner → [USER GATE] → ChangeExecutor → VerificationAgent → DocumentationGenerator → Complete
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
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ RepoAnalyzer                         │
│ (Repository scan, dependency check)  │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ ImplementationPlanner                │
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
│ DocumentationGenerator               │
│ (Create change summary)              │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Workflow Complete                    │
└──────────────────────────────────────┘
```

## Workflow Phases
1) **Analysis** (Auto) — Repository scan, dependency analysis, impact assessment
2) **Planning** (Auto → Gate) — Implementation plan with explicit file modifications → **USER REVIEW**
3) **Implementation** (Auto) — Execute changes atomically within defined scope
4) **Verification** (Auto) — Validate against acceptance criteria, run lints/builds if applicable
5) **Documentation** (Auto) — Generate comprehensive change summary

## Acceptance Criteria
- Changes limited to specified SCOPE
- All acceptance criteria validated by VerificationAgent
- No unintended modifications outside SCOPE
- Build/lint passes (if applicable)
- Change documentation generated
- Cross-references and dependencies maintained

## How to Run
1. Open `.github/prompts/UpdateCopilotCustomizer.prompt.md` in Copilot Chat
2. Fill the variable block with change details
3. Submit → Review implementation plan
4. Type `confirm` to proceed with execution

## Refinement Commands
| Command | Action |
|---------|--------|
| `refine: scope` | Adjust files/areas to be modified |
| `refine: approach` | Change implementation strategy |
| `refine: validation` | Enhance verification criteria |
| `refine: docs` | Improve documentation detail level |

## References
- Framework: `../../.github/instructions/CopilotFramework.instructions.md`
- Audit: `../../.github/instructions/CopilotAudit.instructions.md`
- Security: `../../.github/instructions/CopilotSecurity.instructions.md`

## Notes
- **Single User Break**: Only after planning phase for efficiency
- **Reuses Instructions**: Leverages existing framework instructions
- **Lightweight Agents**: Minimal specialized logic, maximum instruction reuse
- **Auto-Verification**: Built-in validation against acceptance criteria
- For quick typo fixes, prefer `QuickChange.prompt.md` instead
- This workflow targets CopilotCustomizer repository improvements

---
**Workflow Type**: Automated change implementation with quality gate  
**User Interactions**: 2 (submit + approve plan)  
**Duration**: <5 minutes for typical changes
