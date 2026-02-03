# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-02-02

### Changed
- **Renamed workflow prompts for clarity**:
  - `NewWorkflow.prompt.md` → `NewHandoffChain.prompt.md` (simple sequential A→B→C workflows)
  - `NewWorkflowSystem.prompt.md` → `NewOrchestratedSystem.prompt.md` (conductor + subagent systems)
  - `GenerateWorkflow.instructions.md` → `GenerateHandoffChain.instructions.md`
- **Consolidated HarmonizationAgent into VerificationAgent**:
  - VerificationAgent now handles both validation AND harmonization
  - Added `edit` tool to VerificationAgent
  - Updated workflow to include harmonization phase
  - Agent count reduced from 7 to 6
- **Merged dev maintenance prompts into unified Maintain prompt**:
  - `OptimizeAndFormat.prompt.md` + `HarmonizeAndValidate.prompt.md` → `Maintain.prompt.md`
  - Configurable modes: optimize, harmonize, validate, all
  - Dev prompt count reduced from 4 to 2

### Removed
- `HarmonizationAgent.agent.md` (functionality absorbed into VerificationAgent)
- `OptimizeAndFormat.prompt.md` (replaced by Maintain with mode: optimize)
- `HarmonizeAndValidate.prompt.md` (replaced by Maintain with mode: harmonize/validate)
- `AgentResume.prompt.md` (deprecated)

### Added
- `dev/prompts/Maintain.prompt.md` - Unified maintenance workflow
- `dev/docs/workflows/Maintain.md` - Documentation for Maintain workflow
- `dev/docs/workflows/QuickChange.md` - Documentation for QuickChange workflow

### Updated
- All documentation updated to reflect new names and consolidated structure
- Bootstrap workflow chain simplified: AssetGenerator → VerificationAgent (includes harmonization)
- README agent count: 7 → 6 agents
- README dev prompt count: 4 → 2 prompts

## [1.1.0] - 2026-01-31

### Added
- Enterprise coding standards system (`.github/standards/`)
- Multi-agent orchestration skill
- Orchestrated system generation (`NewWorkflowSystem`)

### Changed
- Skills-first generation approach
- Enhanced BootstrapRepo with orchestration assessment

## [1.0.0] - 2026-01-15

### Added
- Initial release of CopilotCustomizer framework
- 6 cross-platform skills
- 7 workflow agents (including HarmonizationAgent)
- 14 instruction files
- 9 user prompts + 4 dev prompts
- 4 templates
- Multi-workspace pattern support
- Bootstrap automation workflow
