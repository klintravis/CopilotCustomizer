# BootstrapRepo Workflow

Fully autonomous asset generation for a target repository in the same workspace with a single approval gate, from analysis through documentation.

## Overview
Orchestrates complete lifecycle: validate target repository path, analyze tech stack, propose assets, generate them on confirm, validate schema and links, harmonize, and document results.

## Variables
```
REPOSITORY_PATH: "C:\\path\\to\\repo"
```

## Handoff Chain
```
BootstrapRepo → RepoAnalyzer → AssetPlanner → [USER GATE] → AssetGenerator → VerificationAgent → HarmonizationAgent → VerificationAgent → DocumentationGenerator → Complete
```

### Workflow Chain
```
┌──────────────────────────────────────┐
│ User Input                           │
│ (REPOSITORY_PATH)                    │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ BootstrapRepo                        │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ RepoAnalyzer                         │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ AssetPlanner                         │
└───────────┬───────────[confirm]──────┘
            ↓
┌──────────────────────────────────────┐
│ AssetGenerator                       │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ VerificationAgent                    │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ HarmonizationAgent                   │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ VerificationAgent (Final)            │
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
1) Analysis — validate target repo path and detect tech stack
2) Planning — propose assets and specs; wait for user confirm
3) Implementation — generate agents, instructions, prompts, and AGENTS.md
4) Verification — schema/YAML/tool approvals and link checks; harmonize cross-references
5) Documentation — bootstrap report, asset inventory, and quick start

## Acceptance Criteria
- Repository path validated (not CopilotCustomizer)
- Tech stack detected or manual context accepted
- Recommended assets generated on confirmation
- 100% schema compliance and cross-references resolved
- Summary documentation created with asset inventory

## How to Run
1. Open `.github/prompts/BootstrapRepo.prompt.md` in Copilot Chat
2. Set `REPOSITORY_PATH`
3. Submit → Review plan → Type `confirm`

## References
- Framework: `../../.github/instructions/CopilotFramework.instructions.md`
- Audit: `../../.github/instructions/CopilotAudit.instructions.md`
- Security: `../../.github/instructions/CopilotSecurity.instructions.md`
- Formatting: `../../.github/instructions/FormatAssets.instructions.md`

## Notes
- Intended for a different repository in the same VS Code workspace; avoid running it on this CopilotCustomizer folder
