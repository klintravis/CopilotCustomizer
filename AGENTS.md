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

### Skills (5 total)
Cross-platform capabilities using [agentskills.io](https://agentskills.io) standard:

| Skill | Purpose |
|-------|---------|
| `repository-analysis` | Repository structure and tech stack detection |
| `implementation-planning` | Strategic planning and risk mitigation |
| `copilot-asset-design` | Asset architecture and validation |
| `technical-documentation` | Documentation generation patterns |
| `deployment-automation` | CI/CD and deployment strategies |

### Agents (7 total)
VS Code workflow orchestration:

| Agent | Purpose |
|-------|---------|
| `BootstrapRepo` | Repository bootstrap entry point |
| `AssetPlanner` | Asset recommendation and specification |
| `AssetGenerator` | Multi-asset creation engine |
| `HarmonizationAgent` | Cross-reference binding |
| `ChangeExecutor` | Precise file operations |
| `VerificationAgent` | Schema validation |
| `CopilotCustomizer` | Main interactive mode |

### Instructions (14 total)
Generation and quality patterns:

**Generation Frameworks:**
- `GenerateSkill` - Create Agent Skills
- `GenerateCopilotAgent` - Create VS Code agents
- `GeneratePrompt` - Create prompt templates
- `GenerateInstructions` - Create instruction files
- `GenerateWorkflow` - Create multi-agent workflows
- `GenerateAgentsFile` - Create AGENTS.md files

**Quality Patterns:**
- `CopilotFramework` - Universal framework patterns
- `CopilotAudit` - Quality assurance
- `CopilotSecurity` - Security patterns
- `FormatAssets` - Asset formatting
- `HarmonizeAssets` - Cross-reference binding
- `RepoReview` - Repository analysis
- `WorkflowValidation` - Workflow integrity
- `AssetOptimization` - Token efficiency

### Prompts (16 total)
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
- `AssetOptimization` - Optimize assets
- `FormatAssets` - Format assets
- `HarmonizeAssets` - Harmonize cross-references
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

### Skills-First Strategy

```
User Request
    ↓
Skill Phase (cross-platform analysis/planning)
    ↓
Agent Phase (VS Code file operations)
    ↓
Skill Phase (cross-platform documentation)
```

**Example (BootstrapRepo)**:
1. Use `repository-analysis` skill to understand repo
2. Use `implementation-planning` skill to design solution
3. Handoff to `@AssetGenerator` agent for file creation
4. Handoff to `@VerificationAgent` for validation
5. Use `technical-documentation` skill for report

### Asset Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| **Agents** | `{Role}.agent.md` | `ChangeExecutor.agent.md` |
| **Instructions** | `{Action}.instructions.md` | `GenerateSkill.instructions.md` |
| **Prompts** | `{Verb}{Object}.prompt.md` | `NewCopilotAgent.prompt.md` |
| **Skills** | `{lowercase-hyphen}/SKILL.md` | `deployment-automation/SKILL.md` |
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
| **Skills** | 5 |
| **Agents** | 7 |
| **Instructions** | 14 |
| **Prompts** | 16 |
| **Templates** | 7 |
| **Total Assets** | 49 |

---

<p align="center">
<strong>Framework Version</strong>: 1.1 | <strong>VS Code</strong>: 1.106+ | <strong>Standard</strong>: agentskills.io
</p>
