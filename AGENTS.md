# CopilotCustomizer

A comprehensive VS Code GitHub Copilot customization framework for asset generation, harmonization, formatting, and optimization.

## Overview

**CopilotCustomizer is a toolbox framework** - use it to enhance ANY repository with **Agent Skills** (cross-platform capabilities), custom agents, instructions, and prompts. Works via VS Code multi-workspace pattern: keep CopilotCustomizer separate, use it to generate assets in your actual projects.

**Skills First**: Agent Skills (open standard at agentskills.io) are portable across VS Code, GitHub Copilot CLI, Claude, Cursor, and more. CopilotCustomizer generates Skills alongside traditional VS Code-specific assets.

**Pattern**: Don't copy → Use as workspace #2 → Generate into target repo → Close when done

## Documentation

For setup and usage, see:
- [QUICKSTART.md](QUICKSTART.md) - Get started in 5 minutes
- [README.md](../README.md) - Overview + key commands
- [HOW-TO.md](HOW-TO.md) - Complete commands reference
- [HOW-TO.md](HOW-TO.md) - Complete commands reference and skills guide

## Asset Architecture

### Asset Types & Hierarchy

| Asset | Location | Type | Purpose |
|-------|----------|------|---------|
| **Skills** | `.github/skills/*/SKILL.md` | Cross-platform | Portable AI capabilities |
| **Standards** | `.github/standards/**/*.md` | Configuration | Enterprise coding standards |
| **Agents** | `.github/agents/*.agent.md` | VS Code-specific | Role-based specialists |
| **Instructions** | `.github/instructions/*.instructions.md` | VS Code/GitHub | Coding standards |
| **Prompts** | `.github/prompts/*.prompt.md` | VS Code | Slash commands |

### Current Inventory

**Active Agents** (7 total - VS Code workflow orchestration):
- `BootstrapRepo.agent.md` - Repository bootstrap entry point
- `AssetPlanner.agent.md` - Asset recommendation and specification
- `AssetGenerator.agent.md` - Multi-asset creation engine
- `HarmonizationAgent.agent.md` - Cross-reference binding
- `ChangeExecutor.agent.md` - Precise file operations
- `VerificationAgent.agent.md` - Schema validation
- `CopilotCustomizer.agent.md` - Main interactive mode

**Skills** (core cross-platform capabilities):
- `repository-analysis/SKILL.md` - Repository understanding methodology
- `implementation-planning/SKILL.md` - Strategic planning patterns
- `copilot-asset-design/SKILL.md` - Asset architecture validation
- `technical-documentation/SKILL.md` - Documentation generation
- `deployment-automation/SKILL.md` - CI/CD and deployment strategies
- `multi-agent-orchestration/SKILL.md` - Conductor/subagent orchestration patterns

**Note**: Bootstrap automatically generates **project-specific skills** (e.g., `nodejs-patterns/`, `react-frontend/`) alongside core skills when analyzing your repository.

**Instructions** (see `.github/instructions/` for current inventory):
- Generation frameworks: `GenerateSkill`, `GenerateCopilotAgent`, `GeneratePrompt`, `GenerateInstructions`, `GenerateWorkflow`, `GenerateAgentsFile`
- Orchestration: `GenerateOrchestratedSystem`
- Standards: `ResolveStandards`
- Quality patterns: `CopilotFramework`, `CopilotAudit`, `CopilotSecurity`, `HarmonizeAssets`, `RepoReview`, `OptimizeAndFormat`

**Prompts** (see `.github/prompts/` for current inventory):
- Core workflows: `BootstrapRepo`, `RepoReview`
- Asset generation: `NewSkill`, `NewCopilotAgent`, `NewInstructions`, `NewPrompt`, `NewWorkflow`, `NewWorkflowSystem`, `NewAgentsFile`
- Maintenance: `OptimizeAndFormat`, `HarmonizeAndValidate`, `QuickChange`
- Utilities: `AgentResume`

**Templates** (4 files - document formats):
- `Analysis.template.md`, `ImplementationPlan.template.md`, `OrchestrationPlan.template.md`, `ChangeLog.template.md`

## Design Patterns

### Multi-Workspace Pattern

```
VS Code Workspace
├── your-project/           ← Your actual project
│   ├── src/
│   ├── .github/            ← Generated assets here
│   │   ├── skills/
│   │   ├── agents/
│   │   ├── instructions/
│   │   └── prompts/
│   └── AGENTS.md
└── CopilotCustomizer/      ← The framework (read-only)
    ├── .github/
    │   ├── agents/         ← Uses these to generate
    │   ├── instructions/
    │   ├── prompts/
    │   ├── skills/
    │   └── templates/
    └── README.md
```

**Workflow**: Add CopilotCustomizer to workspace → Run `/BootstrapRepo` → Assets generate in your project → Close CopilotCustomizer

### Enterprise Standards Pattern

Standards in `.github/standards/` define organizational coding conventions. During generation, the `ResolveStandards` instruction matches standards by tech stack and scope, then passes matched principles to downstream agents. Generated assets reflect these principles naturally — no verbatim copying or direct references.

```
.github/standards/
├── languages/       ← Tech-match standards (TypeScript, Python, etc.)
├── frameworks/      ← Tech-match standards (React, Express, etc.)
└── practices/       ← Always-apply standards (code review, naming, etc.)
```

### Skills-First Strategy

**Execution Flow**:
```
User Request
    ↓
Skill Phase (cross-platform analysis/planning)
    ↓
Agent Phase (VS Code file operations)
    ↓
Skill Phase (cross-platform documentation)
```

**Example** (QuickChange):
1. Use `repository-analysis` skill to understand repo
2. Use `implementation-planning` skill to design solution
3. Handoff to `@ChangeExecutor` agent for file changes
4. Handoff to `@VerificationAgent` agent for validation
5. Use `technical-documentation` skill for summaries

### Asset Naming Conventions

- **Agents**: `{Role}{Agent}.agent.md` (e.g., `ChangeExecutor.agent.md`)
- **Instructions**: `{Action}.instructions.md` (e.g., `GenerateSkill.instructions.md`)
- **Prompts**: `{Verb}{Object}.prompt.md` (e.g., `NewCopilotAgent.prompt.md`)
- **Skills**: `{lowercase-with-hyphens}/SKILL.md` (e.g., `deployment-automation/SKILL.md`)
- **Templates**: `{Format}.template.md` (e.g., `ImplementationPlan.template.md`)