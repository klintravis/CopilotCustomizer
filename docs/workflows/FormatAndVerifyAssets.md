# FormatAndVerifyAssets Workflow

Standardize, format, and validate Copilot customization assets in a single automated pass.

## Overview
Runs formatting per repository standards and verifies schema compliance and cross-references. Supports report-only or auto-fix modes.

## Variables
```
TARGET_PATH: "."             # Root to scan
SEVERITY: "fix"              # warn|fix
REPORT_ONLY: "false"         # true|false
```

## Handoff Chain
```
FormatAndVerifyAssets → RepoAnalyzer → ChangeExecutor (FormatAssets) → VerificationAgent → DocumentationGenerator → Complete
```

### Workflow Chain
```
┌──────────────────────────────────────┐
│ User Input                           │
│ (TARGET_PATH, SEVERITY, REPORT_ONLY) │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ RepoAnalyzer                         │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ ChangeExecutor (FormatAssets)        │
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
1) Analysis — inventory assets under TARGET_PATH
2) Planning — propose normalization/formatting actions
3) Implementation — apply fixes unless REPORT_ONLY=true
4) Verification — schema + cross-reference checks
5) Documentation — summary of changes and findings

## Acceptance Criteria
- Assets formatted per standards
- Verification report has 0 blocking issues
- Summary report generated

## How to Run
1. Open `.github/prompts/FormatAndVerifyAssets.prompt.md` in Copilot Chat
2. Set variables (TARGET_PATH, SEVERITY, REPORT_ONLY)
3. Submit and review the generated report

## References
- Formatting: `../../.github/instructions/FormatAssets.instructions.md`
- Framework: `../../.github/instructions/CopilotFramework.instructions.md`
- Audit: `../../.github/instructions/CopilotAudit.instructions.md`
