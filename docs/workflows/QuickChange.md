# QuickChange Workflow

Fast, minimal-diff change workflow with a single approval gate and automated verification.

## Overview

Use QuickChange for typos, small refactors, config nits, or documentation tweaks. It scans impact, proposes a tiny plan, applies the change, and verifies.

## Variables

```
CHANGE_REQUEST: "Short description of the exact change"
REASON: "Why this change is needed"
ACCEPTANCE_CRITERIA: "Observable outcomes to verify the change"
SCOPE (or "auto-detect"): "Folder(s) or files to limit changes"
```

## Handoff Chain

```
QuickChange → [repository-analysis skill] → AssetPlanner → [USER GATE] → ChangeExecutor → VerificationAgent → Complete
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
│ (uses repository-analysis skill)     │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ AssetPlanner                         │
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
│ Workflow Complete                    │
└──────────────────────────────────────┘
```

## Workflow Phases

1. **Analysis** — impact scan and dependency check using repository-analysis skill
2. **Planning** — minimal implementation plan with explicit file list (user approval required)
3. **Implementation** — atomic change within SCOPE only via ChangeExecutor
4. **Verification** — lints/build (if applicable) + checks vs acceptance criteria via VerificationAgent

## Acceptance Criteria

- Only files in SCOPE are changed
- VerificationAgent confirms acceptance criteria
- Build/lint passes when applicable
- Change summary generated

## How to Run

1. Use the `/QuickChange` slash command with inline variables
2. Submit → Review plan → Type `confirm`

## References

- Skills: `.github/skills/repository-analysis/SKILL.md`
- Formatting: `.github/instructions/FormatAssets.instructions.md`

## Notes

- Prefer this for changes that can be safely reviewed and merged quickly
- For larger efforts, use `/UpdateCopilotCustomizer`
