# CopilotCustomizer Architecture

> VS Code GitHub Copilot customization framework for asset generation and management

---

## Overview

**CopilotCustomizer is a toolbox framework** - use it to enhance ANY repository with cross-platform **Agent Skills**, custom agents, instructions, and prompts.

**Skills First**: Agent Skills (open standard at [agentskills.io](https://agentskills.io)) are portable across VS Code, GitHub Copilot CLI, Claude, Cursor, and more.

**Pattern**: Don't copy → Use as workspace #2 → Generate into target repo → Close when done

---

## Asset Architecture

### Asset Types & Locations

| Asset | Location | Portability | Purpose |
|-------|----------|-------------|---------|
| **Skills** | `.github/skills/*/SKILL.md` | Cross-platform | Portable AI capabilities |
| **Agents** | `.github/agents/*.agent.md` | VS Code only | Role-based specialists |
| **Instructions** | `.github/instructions/*.instructions.md` | VS Code/GitHub | Coding standards |
| **Prompts** | `.github/prompts/*.prompt.md` | VS Code | Slash command templates |
| **Templates** | `.github/templates/*.template.md` | Any | Document formats |

---

## Current Inventory

### Skills (3 total)
Cross-platform capabilities using [agentskills.io](https://agentskills.io) standard:

| Skill | Purpose |
|-------|---------|
| `repository-analysis` | Repository structure and tech stack detection |
| `copilot-asset-design` | Asset architecture and validation |
| `technical-documentation` | Documentation generation patterns |

### Agents (6 total)
VS Code workflow orchestration:

| Agent | Purpose |
|-------|---------|
| `BootstrapRepo` | Repository bootstrap entry point |
| `AssetPlanner` | Asset recommendation and specification |
| `AssetGenerator` | Multi-asset creation engine |
| `ChangeExecutor` | Precise file operations |
| `VerificationAgent` | Schema validation & harmonization |
| `CopilotCustomizer` | Main interactive mode |

### Instructions (9 total)
Generation and quality patterns:

**Generation Frameworks:**
- `GenerateSkill` - Create Agent Skills
- `GenerateCopilotAgent` - Create VS Code agents
- `GeneratePrompt` - Create prompt templates
- `GenerateInstructions` - Create instruction files
- `GenerateWorkflow` - Create multi-agent workflows
- `GenerateAgentsFile` - Create AGENTS.md files

**Quality Patterns:**
- `FormatAssets` - Asset formatting
- `RepoReview` - Repository analysis
- `WorkflowValidation` - Workflow integrity

### Prompts (14 total)
Slash commands for user interaction:

**Core Workflows:**
- `BootstrapRepo` - Full repository setup
- `RepoReview` - Repository analysis
- `UpdateCopilotCustomizer` - Framework maintenance

**Asset Generation:**
- `NewSkill` - Create new skill
- `NewCopilotAgent` - Create new agent
- `NewInstructions` - Create instructions
- `NewPrompt` - Create prompt
- `NewWorkflow` - Create workflow
- `NewAgentsFile` - Create AGENTS.md

**Maintenance:**
- `MaintainAssets` - Unified maintenance (format, harmonize, optimize)
- `FormatAssets` - Format assets
- `QuickChange` - Fast minimal changes
- `SecurityToolingAudit` - Security audit
- `WorkflowIntegrityCheck` - Validate workflows
- `AgentResume` - Universal agent helper

### Templates (7 total)
Standardized document formats:

| Template | Purpose |
|----------|---------|
| `Analysis.template.md` | Universal analysis framework |
| `ImplementationPlan.template.md` | Project planning |
| `ProgressLog.template.md` | Status tracking |
| `TestStrategy.template.md` | Test planning |
| `SecurityReview.template.md` | Security assessments |
| `ChangeLog.template.md` | Release notes |
| `AssetInventory.template.md` | Asset catalog |

---

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
    └── .github/
        ├── agents/         ← Uses these to generate
        ├── instructions/
        ├── prompts/
        ├── skills/
        └── templates/
```

**Workflow**: Add CopilotCustomizer to workspace → Run `/BootstrapRepo` → Assets generate in your project → Close CopilotCustomizer

### Workflow Chain

```
BootstrapRepo
  ↓ [repository-analysis skill]
AssetPlanner (recommendations)
  ↓ [USER GATE: confirm plan]
AssetGenerator (create assets)
  ↓ [automatic]
VerificationAgent (validate & harmonize)
  ↓
COMPLETE
```

### Asset Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| **Agents** | `{Role}.agent.md` | `ChangeExecutor.agent.md` |
| **Instructions** | `{Action}.instructions.md` | `GenerateSkill.instructions.md` |
| **Prompts** | `{Verb}{Object}.prompt.md` | `NewCopilotAgent.prompt.md` |
| **Skills** | `{lowercase-hyphen}/SKILL.md` | `repository-analysis/SKILL.md` |
| **Templates** | `{Format}.template.md` | `ImplementationPlan.template.md` |

---

## Documentation

| Document | Purpose |
|----------|---------|
| [QUICKSTART.md](QUICKSTART.md) | 5-minute setup |
| [README.md](README.md) | Overview + key commands |
| [HOW-TO.md](HOW-TO.md) | Complete reference |
| [SKILLS-MIGRATION.md](SKILLS-MIGRATION.md) | Agent Skills guide |
| [MULTI-WORKSPACE.md](MULTI-WORKSPACE.md) | Setup patterns |
| [EXAMPLES.md](EXAMPLES.md) | Real-world examples |
| [.github/ASSETS.md](.github/ASSETS.md) | Asset reference |

---

## Summary

| Category | Count |
|----------|-------|
| **Skills** | 3 |
| **Agents** | 6 |
| **Instructions** | 9 |
| **Prompts** | 14 |
| **Templates** | 7 |
| **Total Assets** | 39 |

---

<p align="center">
<strong>Framework Version</strong>: 2.0 | <strong>VS Code</strong>: 1.106+ | <strong>Standard</strong>: agentskills.io
</p>
