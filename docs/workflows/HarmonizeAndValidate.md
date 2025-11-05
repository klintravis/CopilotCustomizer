# HarmonizeAndValidate Workflow

Harmonize related assets and validate cross-references, handoff chains, and schema consistency.

## Overview
Ideal after creating or modifying agents, prompts, or instructions. Ensures links, references, and workflow handoffs are coherent.

## Variables
```
ASSETS: [".github/prompts/Foo.prompt.md", ".github/instructions/Bar.instructions.md"]
MODE: "standard"   # conservative|standard
```

## Handoff Chain
```
HarmonizeAndValidate → RepoAnalyzer → HarmonizationAgent → WorkflowValidator → DocumentationGenerator → Complete
```

### Workflow Chain
```
┌──────────────────────────────────────┐
│ User Input                           │
│ (ASSETS, MODE)                       │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ RepoAnalyzer                         │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ HarmonizationAgent                   │
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
1) Analysis — inspect targets and relationships
2) Planning — minimal harmonization proposal
3) Implementation — apply link and metadata harmonization
4) Verification — validate links, handoffs, schema
5) Documentation — before/after link map and summary

## Acceptance Criteria
- Cross-references accurate and functional
- WorkflowValidator passes handoff integrity checks
- Summary includes link map and changes applied

## How to Run
1. Open `.github/prompts/HarmonizeAndValidate.prompt.md` in Copilot Chat
2. Provide ASSETS list and MODE
3. Submit and review results

## References
- Framework: `../../.github/instructions/CopilotFramework.instructions.md`
- Workflow Validation: `../../.github/instructions/WorkflowValidation.instructions.md`
