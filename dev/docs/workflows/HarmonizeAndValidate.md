# HarmonizeAndValidate Workflow

Harmonize related assets and validate cross-references, handoff chains, and schema consistency.

## Overview
Ideal after creating or modifying agents, prompts, or instructions. Ensures links, references, and workflow handoffs are coherent.

## Variables
```
ASSETS: [".github/prompts/Foo.prompt.md", ".github/instructions/Bar.instructions.md"]
MODE: "standard"   # conservative|standard
CHECKS: "all"      # links|handoffs|schema|all
SECURITY_SCOPE: "none" # none|tools|mcp|all
```

## Handoff Chain
```
HarmonizeAndValidate → repository-analysis skill → HarmonizationAgent → VerificationAgent → technical-documentation skill → Complete
```

### Workflow Chain
```
┌──────────────────────────────────────┐
│ User Input                           │
│ (ASSETS, MODE)                       │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ repository-analysis skill             │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ HarmonizationAgent                   │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ VerificationAgent                    │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ technical-documentation skill        │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Workflow Complete                    │
└──────────────────────────────────────┘
```

## Workflow Phases
1) Analysis — inspect targets and relationships
2) Planning — minimal harmonization proposal
3) Implementation — apply link and metadata harmonization
4) Verification — validate links, handoffs, schema
5) Documentation — before/after link map and summary

## Acceptance Criteria
- Cross-references accurate and functional
- Links/handoffs/schema validation passes (as requested by CHECKS)
- Summary includes link map and changes applied

## How to Run
1. Use the `/HarmonizeAndValidate` slash command with inline variables
2. Provide ASSETS list and MODE
3. Submit and review results

## References
- Framework: `../../../.github/instructions/CopilotFramework.instructions.md`
- Harmonization: `../../../.github/instructions/HarmonizeAssets.instructions.md`
- Slash command: `dev/prompts/HarmonizeAndValidate.prompt.md`
