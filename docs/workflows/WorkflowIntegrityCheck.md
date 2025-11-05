# WorkflowIntegrityCheck Workflow

Validate that agents, prompts, and instructions form coherent, testable workflows with sound handoffs.

## Overview
Useful after changes to assets or before PRs/CI gates to ensure workflow integrity and link health.

## Variables
```
WORKFLOW: "all"   # "all" or a specific workflow name
STRICT: "true"    # true|false (warnings become failures when true)
```

## Handoff Chain
```
WorkflowIntegrityCheck → RepoAnalyzer → WorkflowValidator → DocumentationGenerator → Complete
```

### Workflow Chain
```
┌──────────────────────────────────────┐
│ User Input                           │
│ (WORKFLOW, STRICT)                   │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ RepoAnalyzer                         │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ WorkflowValidator                    │
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
1) Analysis — detect workflows and components
2) Planning — prepare validation plan
3) Implementation — none (validation-only)
4) Verification — execute integrity checks; STRICT mode applies
5) Documentation — pass/fail matrix and failure reasons

## Acceptance Criteria
- Clear matrix showing workflow status
- Failure reasons documented for any failing checks
- Suitable for CI consumption

## How to Run
1. Open `.github/prompts/WorkflowIntegrityCheck.prompt.md` in Copilot Chat
2. Set WORKFLOW and STRICT
3. Submit and review the matrix

## References
- Workflow Validation: `../../.github/instructions/WorkflowValidation.instructions.md`
- Framework: `../../.github/instructions/CopilotFramework.instructions.md`
