# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2026-04-02

### Removed
- **Custom hooks infrastructure**: Deleted `.github/hooks/`, `.github/scripts/`, and `.github/logs/` directories — hooks are now fully native in VS Code (since v1.110)
- **Lifecycle logging system**: Removed `subagent-tracking.json`, `log-orchestration.js`, session logs — no longer needed with native VS Code hooks

### Changed
- **Version compliance updated**: Bumped from VS Code Copilot v1.109 to v1.112 across all assets
- **Deprecated field renames**: `user-invokable` → `user-invocable`, `memory` → `vscode/memory` across all agent files
- **Framework.instructions.md**: Replaced detailed custom hooks section with native hooks reference; added Agent Plugins guidance
- **Simplified copilot-instructions.md**: Removed lifecycle logging sections, added Agent Plugins and monorepo customization references
- **All agent files**: Updated frontmatter for v1.112 compliance (user-invocable, vscode/memory)
- **All authoring instructions**: Updated with new VS Code 1.110-1.112 features (agent-scoped hooks, new tools, plugins, sandboxing)
- **Generator agent**: Updated tool selection guide with browser and refactoring tools; plugin generation awareness
- **Bootstrap agent**: Added monorepo detection; removed obsolete hook references
- **Planner agent**: Added agent plugin assessment criteria
- **Verifier agent**: Added validation rules for agent-scoped hooks, new tool names, deprecated field detection

### Added
- **Agent Plugins guidance**: New section in Framework.instructions.md for VS Code v1.110+ plugin bundles
- **Monorepo customization awareness**: References to v1.112 monorepo support
- **Chat Customizations Editor**: References to native VS Code customization management UI
- **`/NewPlugin` prompt**: New slash command for generating Agent Plugin packages (skills + agents + hooks + MCP bundles)
- **Agent-scoped hooks guidance**: AgentAuthoring.instructions.md now documents frontmatter `hooks:` key for per-agent lifecycle automation
- **New tools catalog**: Added `rename`, `usages`, `getDiagnostics`, and browser tools (`openBrowserPage`, `screenshotPage`, etc.) to agent tool selection guides
- **Explore subagent awareness**: Orchestration patterns updated for native read-only research agent
- **Autonomy tiers documentation**: Default, Bypass Approvals, and Autopilot modes documented in orchestration guidance
- **MCP/terminal sandboxing**: Security.instructions.md now covers `sandboxEnabled` and terminal sandbox settings
- **Monorepo detection**: Bootstrap agent now detects monorepo structure and recommends nested customizations
- **Native `/create-*` commands reference**: Framework.instructions.md documents VS Code's built-in creation commands
- **Agent Debug Panel reference**: ToolkitOps.instructions.md now covers debug panel for customization troubleshooting

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
