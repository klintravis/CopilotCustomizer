# OptimizeAndFormat Workflow

Consolidated maintenance workflow to optimize and/or format Copilot customization assets and verify schema/link integrity.

## Overview
Use this after editing agents, prompts, instructions, or when you want to reduce duplication and keep assets compliant.

## Variables
```
TARGET_PATH: ".github"         # folder, file, or glob
MODE: "both"                  # optimize|format|both
SEVERITY: "fix"               # warn|fix
REPORT_ONLY: "false"          # true|false
FOCUS: "all"                  # prompts|instructions|agents|all
```

## Handoff Chain
```
OptimizeAndFormat → repository-analysis skill → ChangeExecutor → VerificationAgent → technical-documentation skill → Complete
```

## Workflow Phases
1) Analysis — inventory assets in scope and detect drift
2) Planning — propose minimal safe edits for MODE/SEVERITY
3) Implementation — apply fixes unless REPORT_ONLY=true
4) Verification — schema/YAML compliance + link checks
5) Documentation — short report of findings and changes

## Acceptance Criteria
- Schema compliance verified for changed assets
- Links and referenced filenames resolve
- Only minimal, scope-appropriate changes applied

## How to Run
1. Use the `/OptimizeAndFormat` slash command with inline variables
2. Submit; optionally set REPORT_ONLY=true for a dry run

## References
- Framework: `../../../.github/instructions/CopilotFramework.instructions.md`
- Optimize & format: `../../../.github/instructions/OptimizeAndFormat.instructions.md`
- Slash command: `dev/prompts/OptimizeAndFormat.prompt.md`
