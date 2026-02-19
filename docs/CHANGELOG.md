# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2026-02-19

### Added
- **Pipeline orchestration pattern**: New multi-orchestrator workflow where a Pipeline Controller chains sub-orchestrators through lifecycle stages (planning, implementation, testing, review, etc.), each with access to a shared pool of all specialist subagents
- **Shared agent pool concept**: Every sub-orchestrator can invoke any specialist — the `agents` YAML array lists ALL shared specialists, enabling cross-stage specialist access
- **Pluggable stage architecture**: New lifecycle stages can be inserted into a Pipeline without restructuring existing sub-orchestrators or specialists
- **Two-level quality gates**: Inter-stage gates (enforced by Pipeline Controller between stages) and intra-stage gates (enforced by sub-orchestrators within stages)
- **Pipeline plan file**: `plans/PIPELINE-PLAN.md` template with stage definitions, shared agent pool manifest, and stage-level state tracking
- **Pipeline example**: `example-pipeline-system.md` in orchestration skill examples showing a complete Pipeline pattern implementation
- **New `/NewMultiAgent` variables**: `stages` (lifecycle stages) and `sharedAgents` (shared specialist roles) for pipeline pattern generation

### Changed
- **Orchestration skill**: Added Pipeline to Pattern Decision Matrix, Pipeline Controller design, Sub-Orchestrator design, Shared Agent Pool rules, and Pluggable Stage guidance
- **Orchestration instructions**: Added Pipeline Pattern Generation Rules (controller, sub-orchestrators, shared pool, stage handoff protocol, pluggable insertion rules, quality gate schema)
- **OrchestrationPlan template**: Extended with Pipeline Stages section (stage definitions, inter-stage gates, shared pool manifest, stage-level state tracking)
- **Planner agent**: Added `pipeline` tier to orchestration assessment with auto-include criteria (6+ agents, distinct lifecycle stages, pluggable workflow)
- **Generator agent**: Added Pipeline System generation step and Pipeline-specific quality assurance checks
- **Verifier agent**: Added Pipeline System Validation checklist (controller→sub-orchestrators→specialists validation chain)
- **CopilotCustomizer agent**: Added Pipeline system creation routing entry
- **NewMultiAgent prompt**: Added `pipeline` pattern with new variables, usage example, and updated output descriptions
- **All documentation**: Updated ARCHITECTURE, HOW-TO, EXAMPLES, README, AGENTS.md, and copilot-instructions with Pipeline pattern coverage

## [1.5.0] - 2026-02-15

### Changed
- **Documentation restructure**: Moved `QUICKSTART.md`, `HOW-TO.md`, `EXAMPLES.md`, `ARCHITECTURE.md`, `CHANGELOG.md` from root/dev/ to `docs/` folder for improved organization
- **Evolve plan tracking**: Introduced `docs/plans/` (gitignored) as standardized location for Evolve improvement plans with status lifecycle and audit trail
- **Updated all doc references**: Fixed 16+ broken cross-references across root files, documentation, and `.github/` assets following restructure

### Added
- **Plan tracking convention**: Standardized naming, structure, and status lifecycle for Evolve plans documented in ToolkitOps.instructions.md
- **Plan persistence**: Evolve agent and prompt now document plan archival workflow in `docs/plans/`

## [1.4.0] - 2026-02-15

### Added
- **Agent Hooks guidance** (Preview): 8 lifecycle events documented in Framework.instructions.md with configuration examples, use cases, and design principles
- **Claude compatibility**: Cross-tool agent/skill/instruction format support in AgentAuthoring, SkillAuthoring, and InstructionAuthoring instructions
- **Skills as Slash Commands**: `user-invokable`, `disable-model-invocation`, `argument-hint` fields with decision table in SkillAuthoring.instructions.md
- **`chatSkills` contribution point**: Extension packaging guide for distributing skills via VS Code Marketplace
- **MCP Apps**: Rich interactive UI capability documented in Framework.instructions.md
- **Organization-wide assets**: Org-level instructions and agents pattern in Framework.instructions.md
- **Chat diagnostics reference**: Added diagnostics view step to Verifier workflow
- **`/init` command**: Quick alternative bootstrap documented in QUICKSTART.md
- **Instruction `name` field**: Display name support in InstructionAuthoring.instructions.md
- **Claude folder detection**: Bootstrap and Generator agents detect `.claude/` folders for cross-tool generation

### Changed
- **AgentAuthoring schema**: Added `agents` field, `handoffs.send`, `handoffs.model` parameters; deprecated `infer` field with migration path
- **SkillAuthoring schema**: Added invocation control fields, slash command pattern, updated GA status references
- **Framework.instructions.md**: Added Agent Hooks, MCP Apps, Organization-Wide Assets, and expanded documentation sources

### Deprecated
- **`infer` frontmatter field**: Use `user-invokable` + `disable-model-invocation` instead (migration path documented)

## [1.3.0] - 2026-02-14

### Changed
- **Consolidated instruction files**: Merged CopilotAudit into CopilotFramework; merged HarmonizeAssets and OptimizeAndFormat into new AssetMaintenance
- **Merged dev documentation**: Combined dev/AGENTS.md and dev/ASSETS.md into comprehensive dev/ARCHITECTURE.md
- **Reduced bloat across assets**: Trimmed ~2,000 lines of redundant content, verbose examples, and duplicated boilerplate
- **Standardized consistency**: Fixed tool naming, variable syntax, heading levels, and schema versions across all assets
- **Streamlined documentation**: Condensed HOW-TO.md from 1,520 to 889 lines while preserving all essential content

### Asset File Renames
- **Agents**: No renames (7 files stable) — *Note: HarmonizationAgent removed in v1.2.0 was functionally replaced by enhanced Verifier with harmonization capability; agent count remained at 7*
- **Instructions**: `ResolveStandards.instructions.md` → `Standards.instructions.md`, `CopilotFramework.instructions.md` → `Framework.instructions.md`, `CopilotSecurity.instructions.md` → `Security.instructions.md`, `AssetMaintenance.instructions.md` → `Maintenance.instructions.md`, `ToolkitMaintenance.instructions.md` → `ToolkitOps.instructions.md` — Reduced from 13 to 12 files via consolidation mergers
- **Prompts**: `BootstrapRepo.prompt.md` → `Bootstrap.prompt.md`, `RepoReview.prompt.md` → `Review.prompt.md`, `NewCopilotAgent.prompt.md` → `NewAgent.prompt.md`, `QuickChange.prompt.md` → `QuickFix.prompt.md`; Note: Evolve.prompt.md represents consolidated functionality, not a direct rename
- **Skills**: `repository-analysis/` → `repo-analysis/`, `implementation-planning/` → `planning/`, `copilot-asset-design/` → `asset-design/`, `technical-documentation/` → `documentation/`, `multi-agent-orchestration/` → `orchestration/`

### Fixed
- **Critical**: Removed 80-line duplicate section in GenerateCopilotAgent.instructions.md
- **Critical**: Fixed corrupted output template in Verifier.agent.md
- **Critical**: Corrected relative paths (../../ → ../) in Verifier.agent.md
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
- **Consolidated HarmonizationAgent into Verifier**:
  - Verifier now handles both validation AND harmonization
  - Added `edit` tool to Verifier
  - Updated workflow to include harmonization phase
  - Agent count reduced from 7 to 6
- **Merged dev maintenance prompts into unified Maintain prompt**:
  - `OptimizeAndFormat.prompt.md` + `HarmonizeAndValidate.prompt.md` → `Maintain.prompt.md`
  - Configurable modes: optimize, harmonize, validate, all
  - Dev prompt count reduced from 4 to 2

### Removed
- `HarmonizationAgent.agent.md` (functionality absorbed into Verifier)
- `OptimizeAndFormat.prompt.md` (replaced by Maintain with mode: optimize)
- `HarmonizeAndValidate.prompt.md` (replaced by Maintain with mode: harmonize/validate)
- `AgentResume.prompt.md` (deprecated)

### Added
- `dev/prompts/Maintain.prompt.md` - Unified maintenance workflow
- `dev/docs/workflows/Maintain.md` - Documentation for Maintain workflow
- `dev/docs/workflows/QuickChange.md` - Documentation for QuickChange workflow

### Updated
- All documentation updated to reflect new names and consolidated structure
- Bootstrap workflow chain simplified: Generator → Verifier (includes harmonization)
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
- 6 cross-platform skills (asset-design, deployment-automation, documentation, orchestration, planning, repo-analysis)
- 7 workflow agents (CopilotCustomizer orchestrator, Bootstrap, Planner, Generator, Editor, Verifier, Evolve)
- 12 instruction files
- 10 user prompts
- 4 templates
- Multi-workspace pattern support
- Bootstrap automation workflow with autonomous orchestration
