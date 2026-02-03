# Maintain Workflow

Unified asset maintenance workflow for optimizing, harmonizing, and validating Copilot customization assets.

## Overview

The Maintain workflow consolidates previous maintenance prompts (OptimizeAndFormat, HarmonizeAndValidate) into a single, configurable entry point.

## Modes

### Optimize Mode
Focus: Token efficiency and clarity
- Reduce duplication across assets
- Improve clarity of instructions and documentation
- Format consistently according to framework standards

### Harmonize Mode
Focus: Cross-reference binding
- Add metadata (version tags, timestamps)
- Establish inter-asset links (agent↔instruction, prompt↔instruction)
- Standardize terminology across assets

### Validate Mode
Focus: Quality assurance
- Schema compliance (YAML front matter, structure)
- Link integrity (cross-references resolve correctly)
- Handoff chain validation (all targets exist)

### All Mode (Default)
Runs optimize → harmonize → validate in sequence for complete maintenance.

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  Maintain Workflow                                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Phase 1: Analysis                                          │
│  ├── Scan TARGET_PATH                                       │
│  ├── Filter by FOCUS (prompts/instructions/agents/all)      │
│  └── Inventory assets                                       │
│                                                             │
│  Phase 2: Processing (MODE-specific)                        │
│  ├── optimize: token reduction, clarity, formatting         │
│  ├── harmonize: metadata, cross-refs, terminology           │
│  ├── validate: schema, links, handoffs                      │
│  └── all: optimize → harmonize → validate                   │
│                                                             │
│  Phase 3: Verification                                      │
│  └── VerificationAgent validates all changes                │
│                                                             │
│  Phase 4: Documentation                                     │
│  └── Generate maintenance report                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Usage Examples

### Full maintenance on .github/
```
/Maintain TARGET_PATH: ".github", MODE: "all"
```

### Validate only, report without fixing
```
/Maintain TARGET_PATH: ".github", MODE: "validate", REPORT_ONLY: "true"
```

### Harmonize prompts only
```
/Maintain TARGET_PATH: ".github/prompts", MODE: "harmonize", FOCUS: "prompts"
```

### Optimize with warnings only
```
/Maintain TARGET_PATH: ".github", MODE: "optimize", SEVERITY: "warn"
```

## Key Files

| File | Purpose |
|------|---------|
| `dev/prompts/Maintain.prompt.md` | Prompt entry point |
| `.github/instructions/OptimizeAndFormat.instructions.md` | Optimization rules |
| `.github/instructions/HarmonizeAssets.instructions.md` | Harmonization rules |
| `.github/agents/VerificationAgent.agent.md` | Validation + harmonization agent |

## Related Workflows

- **QuickChange**: For targeted code/config changes (not asset maintenance)
- **BootstrapRepo**: For generating new assets from scratch

---

*CopilotCustomizer Developer Documentation*
