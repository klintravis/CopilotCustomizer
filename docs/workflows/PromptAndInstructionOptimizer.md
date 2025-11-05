# PromptAndInstructionOptimizer Workflow

Optimize prompts and instruction files for clarity, token efficiency, and consistency while preserving behavior.

## Overview
Plans and applies safe, minimal-risk optimizations, then verifies improvements against audit dimensions.

## Variables
```
TARGET_PROMPTS: [".github/prompts/Example.prompt.md"]
TARGET_INSTRUCTIONS: [".github/instructions/Example.instructions.md"]
GOAL: "both"   # token|clarity|both
```

## Handoff Chain
```
PromptAndInstructionOptimizer → RepoAnalyzer → ImplementationPlanner → [USER GATE] → ChangeExecutor → VerificationAgent → DocumentationGenerator → Complete
```

### Workflow Chain
```
┌────────────────────────────────────────────────────┐
│ User Input                                         │
│ (TARGET_PROMPTS, TARGET_INSTRUCTIONS, GOAL)        │
└───────────┬────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────────────┐
│ RepoAnalyzer                                       │
└───────────┬────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────────────┐
│ ImplementationPlanner                              │
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
│ DocumentationGenerator                             │
└───────────┬────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────────────┐
│ Workflow Complete                                  │
└────────────────────────────────────────────────────┘
```

## Workflow Phases
1) Analysis — assess verbosity, duplication, schema compliance
2) Planning — propose optimization plan with diffs and expected savings (user approval required)
3) Implementation — apply conservative improvements
4) Verification — audit improvements; ensure links intact
5) Documentation — summarize changes and measured token savings

## Acceptance Criteria
- Measurable token reduction and/or clarity improvements
- No broken links; schema compliance maintained
- Verification passes audit dimensions

## How to Run
1. Open `.github/prompts/PromptAndInstructionOptimizer.prompt.md` in Copilot Chat
2. Set TARGET_* lists and GOAL
3. Submit → Review plan → Type `confirm`

## References
- Optimization: `../../.github/instructions/AssetOptimization.instructions.md`
- Audit: `../../.github/instructions/CopilotAudit.instructions.md`
- Framework: `../../.github/instructions/CopilotFramework.instructions.md`
