# BootstrapRepo Workflow

Fully autonomous asset generation for a target repository in the same workspace with a single approval gate, from analysis through documentation.

## Overview

Orchestrates complete lifecycle: validate target repository path, analyze tech stack (using repository-analysis skill), propose assets, generate them on confirm, and validate schema and links.

**Handoff Visibility**: Each agent displays a notification when it starts processing, showing its purpose and next step. This helps users understand the workflow progress and confirms handoffs are working correctly.

## Variables

```
REPOSITORY_PATH: "C:\\path\\to\\repo"
```

## Handoff Chain

```
BootstrapRepo → [repository-analysis skill] → AssetPlanner → [USER GATE] → AssetGenerator → VerificationAgent → Complete
```

### Workflow Chain

```
┌──────────────────────────────────────┐
│ User Input                           │
│ (REPOSITORY_PATH)                    │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ BootstrapRepo Agent                  │
│ (uses repository-analysis skill)     │
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
│ (validates & harmonizes)             │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Workflow Complete                    │
└──────────────────────────────────────┘
```

## Workflow Phases

1. **Analysis** — validate target repo path and detect tech stack using repository-analysis skill
2. **Planning** — propose assets and specs; wait for user confirm
3. **Implementation** — generate skills, agents, instructions, prompts, and AGENTS.md
4. **Verification** — schema/YAML validation, link checks, and cross-reference harmonization

## Acceptance Criteria

- Repository path validated (not CopilotCustomizer)
- Tech stack detected or manual context accepted
- Recommended assets generated on confirmation
- 100% schema compliance and cross-references resolved
- Summary documentation created with asset inventory

## How to Run

1. Use the `/BootstrapRepo` slash command with inline variables
2. Set `REPOSITORY_PATH`
3. Submit → Review plan → Type `confirm`

## References

- Skills: `.github/skills/repository-analysis/SKILL.md`
- Formatting: `.github/instructions/FormatAssets.instructions.md`
- Asset Generation: `.github/instructions/GenerateSkill.instructions.md`

## Notes

- Intended for a different repository in the same VS Code workspace; avoid running it on this CopilotCustomizer folder
- Uses cross-platform skills for repository analysis (repository-analysis skill)
- Assets are generated in skills-first priority order
