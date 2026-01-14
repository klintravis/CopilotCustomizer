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
WorkflowIntegrityCheck → [repository-analysis skill] → VerificationAgent → Complete
```

### Workflow Chain

```
┌──────────────────────────────────────┐
│ User Input                           │
│ (WORKFLOW, STRICT)                   │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Analysis                             │
│ (uses repository-analysis skill)     │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ VerificationAgent                    │
│ (validates workflows)                │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Workflow Complete                    │
└──────────────────────────────────────┘
```

## Workflow Phases

1. **Analysis** — detect workflows and components using repository-analysis skill
2. **Verification** — execute integrity checks via VerificationAgent; STRICT mode applies
3. **Summary** — pass/fail matrix and failure reasons

## Acceptance Criteria

- Clear matrix showing workflow status
- Failure reasons documented for any failing checks
- Suitable for CI consumption

## How to Run

1. Use the `/WorkflowIntegrityCheck` slash command with inline variables
   - Example: `/WorkflowIntegrityCheck WORKFLOW: "all", STRICT: "true"`
2. Set WORKFLOW and STRICT
3. Submit and review the matrix

## References

- Workflow Validation: `.github/instructions/WorkflowValidation.instructions.md`
- Skills: `.github/skills/repository-analysis/SKILL.md`
