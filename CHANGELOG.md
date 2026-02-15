# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-02-14

### Changed
- **Consolidated instruction files**: Merged CopilotAudit into CopilotFramework; merged HarmonizeAssets and OptimizeAndFormat into new AssetMaintenance
- **Merged dev documentation**: Combined dev/AGENTS.md and dev/ASSETS.md into comprehensive dev/ARCHITECTURE.md
- **Reduced bloat across assets**: Trimmed ~2,000 lines of redundant content, verbose examples, and duplicated boilerplate
- **Standardized consistency**: Fixed tool naming, variable syntax, heading levels, and schema versions across all assets
- **Streamlined documentation**: Condensed HOW-TO.md from 1,520 to 889 lines while preserving all essential content

### Asset File Renames
- **Agents**: No renames (7 files stable)
- **Instructions**: `ResolveStandards.instructions.md` → `Standards.instructions.md`, `CopilotFramework.instructions.md` → `Framework.instructions.md`, `CopilotSecurity.instructions.md` → `Security.instructions.md`, `AssetMaintenance.instructions.md` → `Maintenance.instructions.md`, `ToolkitMaintenance.instructions.md` → `ToolkitOps.instructions.md`
- **Prompts**: `BootstrapRepo.prompt.md` → `Bootstrap.prompt.md`, `RepoReview.prompt.md` → `Review.prompt.md`, `NewCopilotAgent.prompt.md` → `NewAgent.prompt.md`, `QuickChange.prompt.md` → `QuickFix.prompt.md`, `EvolveTool.prompt.md` → `Evolve.prompt.md`
- **Skills**: `repository-analysis/` → `repo-analysis/`, `implementation-planning/` → `planning/`, `copilot-asset-design/` → `asset-design/`, `technical-documentation/` → `documentation/`, `multi-agent-orchestration/` → `orchestration/`

### Fixed
- **Critical**: Removed 80-line duplicate section in GenerateCopilotAgent.instructions.md
- **Critical**: Fixed corrupted output template in VerificationAgent.agent.md
- **Critical**: Corrected relative paths (../../ → ../) in VerificationAgent.agent.md
- **Critical**: Removed contradictory `edit` tool from CopilotCustomizer.agent.md

### Removed
- **Archived**: dev/docs/plans/ToolkitEvolution-AssetPlan.md (completed implementation plan)
- **Instructions** (2): CopilotAudit, HarmonizeAssets, OptimizeAndFormat → merged into surviving files
- **Dev Docs** (2): dev/AGENTS.md, dev/ASSETS.md → merged into dev/ARCHITECTURE.md

### Performance
- Total line reduction: ~3,400 lines (~30% decrease across core assets)
- Instruction files: 15 → 13
- Agent files: Average 20% size reduction
- Prompt files: Average 30% size reduction

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
- Enhanced Bootstrap with orchestration assessment

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
