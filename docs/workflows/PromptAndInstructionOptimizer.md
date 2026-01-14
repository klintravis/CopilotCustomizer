# PromptAndInstructionOptimizer Workflow

Optimize prompts and instruction files for clarity, token efficiency, and consistency while preserving behavior.

## Overview

Plans and applies safe, minimal-risk optimizations, then verifies improvements. Uses skills for analysis and VerificationAgent for validation.

## Variables

```
TARGET_PROMPTS: [".github/prompts/Example.prompt.md"]
TARGET_INSTRUCTIONS: [".github/instructions/Example.instructions.md"]
GOAL: "both"   # token|clarity|both
```

## Handoff Chain

```
PromptAndInstructionOptimizer → [repository-analysis skill] → AssetPlanner → [USER GATE] → ChangeExecutor → VerificationAgent → Complete
```

### Workflow Chain

```
┌────────────────────────────────────────────────────┐
│ User Input                                         │
│ (TARGET_PROMPTS, TARGET_INSTRUCTIONS, GOAL)        │
└───────────┬────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────────────┐
│ Analysis                                           │
│ (uses repository-analysis skill)                   │
└───────────┬────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────────────┐
│ AssetPlanner                                       │
└───────────┬─────────────────[confirm]──────────────┘
            ↓
┌────────────────────────────────────────────────────┐
│ ChangeExecutor                                     │
└───────────┬────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────────────┐
│ VerificationAgent                                  │
└───────────┬────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────────────┐
│ Workflow Complete                                  │
└────────────────────────────────────────────────────┘
```

## Workflow Phases

1. **Analysis** — assess verbosity, duplication, schema compliance using repository-analysis skill
2. **Planning** — propose optimization plan with diffs and expected savings (user approval required)
3. **Implementation** — apply conservative improvements via ChangeExecutor
4. **Verification** — audit improvements via VerificationAgent; ensure links intact

## Acceptance Criteria

- Measurable token reduction and/or clarity improvements
- No broken links; schema compliance maintained
- Verification passes audit dimensions

## How to Run

1. Use the `/MaintainAssets` slash command with optimize mode
2. Set TARGET_* lists and GOAL
3. Submit → Review plan → Type `confirm`

## References

- Skills: `.github/skills/repository-analysis/SKILL.md`
- Formatting: `.github/instructions/FormatAssets.instructions.md`
