# QuickChange Workflow

Fast, minimal-diff change workflow with a single approval gate and automated verification.

## Overview
Use QuickChange for typos, small refactors, config nits, or documentation tweaks. It scans impact, proposes a tiny plan, applies the change, verifies, and documents.

## Variables
```
CHANGE_REQUEST: "Short description of the exact change"
REASON: "Why this change is needed"
ACCEPTANCE_CRITERIA: "Observable outcomes to verify the change"
SCOPE (or "auto-detect"): "Folder(s) or files to limit changes"
```

## Handoff Chain
```
QuickChange → RepoAnalyzer → ImplementationPlanner → [USER GATE] → ChangeExecutor → VerificationAgent → DocumentationGenerator → Complete
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
│ QuickChange                          │
└───────────┬──────────────────────────┘
			↓
┌──────────────────────────────────────┐
│ RepoAnalyzer                         │
└───────────┬──────────────────────────┘
			↓
┌──────────────────────────────────────┐
│ ImplementationPlanner                │
└───────────┬───────────[confirm]──────┘
			↓
┌──────────────────────────────────────┐
│ ChangeExecutor                       │
└───────────┬──────────────────────────┘
			↓
┌──────────────────────────────────────┐
│ VerificationAgent                    │
└───────────┬──────────────────────────┘
			↓
┌──────────────────────────────────────┐
│ DocumentationGenerator               │
└───────────┬──────────────────────────┘
			↓
┌──────────────────────────────────────┐
│ Workflow Complete                    │
└──────────────────────────────────────┘
```

## Workflow Phases
1) Analysis — impact scan and dependency check
2) Planning — minimal implementation plan with explicit file list (user approval required)
3) Implementation — atomic change within SCOPE only
4) Verification — lints/build (if applicable) + textual checks vs acceptance criteria
5) Documentation — concise change summary and results

## Acceptance Criteria
- Only files in SCOPE are changed
- VerificationAgent confirms acceptance criteria
- Build/lint passes when applicable
- Change summary generated

## How to Run
1. Open `.github/prompts/QuickChange.prompt.md` in Copilot Chat
2. Fill the variable block
3. Submit → Review plan → Type `confirm`

## References
- Framework: `../../.github/instructions/CopilotFramework.instructions.md`
- Audit: `../../.github/instructions/CopilotAudit.instructions.md`
- Security: `../../.github/instructions/CopilotSecurity.instructions.md`

## Notes
- Prefer this for changes that can be safely reviewed and merged quickly
- For larger efforts, use `UpdateCopilotCustomizer.prompt.md`
