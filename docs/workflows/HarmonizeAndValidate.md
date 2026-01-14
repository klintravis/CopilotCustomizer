# HarmonizeAndValidate Workflow

Harmonize related assets and validate cross-references, handoff chains, and schema consistency.

## Overview

Ideal after creating or modifying agents, prompts, or instructions. Ensures links, references, and workflow handoffs are coherent. Uses VerificationAgent for validation and harmonization.

## Variables

```
ASSETS: [".github/prompts/Foo.prompt.md", ".github/instructions/Bar.instructions.md"]
MODE: "standard"   # conservative|standard
```

## Handoff Chain

```
HarmonizeAndValidate → [repository-analysis skill] → VerificationAgent → Complete
```

### Workflow Chain

```
┌──────────────────────────────────────┐
│ User Input                           │
│ (ASSETS, MODE)                       │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Analysis                             │
│ (uses repository-analysis skill)     │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ VerificationAgent                    │
│ (validates & harmonizes)             │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Workflow Complete                    │
└──────────────────────────────────────┘
```

## Workflow Phases

1. **Analysis** — inspect targets and relationships using repository-analysis skill
2. **Harmonization** — apply link and metadata harmonization via VerificationAgent
3. **Verification** — validate links, handoffs, schema via VerificationAgent
4. **Summary** — generate before/after link map and summary

## Acceptance Criteria

- Cross-references accurate and functional
- VerificationAgent passes handoff integrity checks
- Summary includes link map and changes applied

## How to Run

1. Use the `/MaintainAssets` slash command with harmonize mode
2. Provide ASSETS list and MODE
3. Submit and review results

## References

- Skills: `.github/skills/repository-analysis/SKILL.md`
- Workflow Validation: `.github/instructions/WorkflowValidation.instructions.md`
- Formatting: `.github/instructions/FormatAssets.instructions.md`
