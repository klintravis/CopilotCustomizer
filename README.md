# CopilotCustomizer

> **Generate tech-stack-specific AI customization in 5 minutes**

[![VS Code](https://img.shields.io/badge/VS%20Code-1.106+-blue?logo=visualstudiocode)](https://code.visualstudio.com/)
[![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Required-green?logo=github)](https://github.com/features/copilot)
[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-agentskills.io-purple)](https://agentskills.io)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## What is CopilotCustomizer?

A **toolbox framework** that generates AI customization assets for ANY repository. Built on the [Agent Skills](https://agentskills.io) open standard for **cross-platform portability**.

```
Your Project + CopilotCustomizer = AI that understands YOUR codebase
```

### Key Features

| Feature | Description |
|---------|-------------|
| **Cross-Platform Skills** | Work in VS Code, GitHub Copilot CLI, Claude, Cursor |
| **VS Code Agents** | Specialized AI experts for your tech stack |
| **Custom Instructions** | Project coding standards auto-applied to matching files |
| **Prompt Templates** | Slash commands for common development tasks |
| **Zero Lock-in** | Skills use open standard - take them anywhere |

---

## Quick Start

### 1. Add to Workspace
```
File → Add Folder to Workspace → Select CopilotCustomizer
```

### 2. Generate Assets
Open Copilot Chat (`Ctrl+Shift+I`) and run:
```
/BootstrapRepo REPOSITORY_PATH: "/path/to/your-project"
```

### 3. Confirm
Review the plan, then type: `confirm`

**Result**: Complete customization in `your-project/.github/` in ~5 minutes.

> **See [QUICKSTART.md](QUICKSTART.md) for the full walkthrough**

---

## Skills: Cross-Platform AI Capabilities

**Skills are the foundation** - portable capabilities that work across multiple AI platforms.

| Skill | Purpose | Works In |
|-------|---------|----------|
| [**repository-analysis**](.github/skills/repository-analysis/SKILL.md) | Codebase structure & tech stack detection | VS Code, CLI, Claude, Cursor |
| [**implementation-planning**](.github/skills/implementation-planning/SKILL.md) | Strategic planning & risk mitigation | VS Code, CLI, Claude, Cursor |
| [**copilot-asset-design**](.github/skills/copilot-asset-design/SKILL.md) | Asset architecture & validation | VS Code, CLI, Claude, Cursor |
| [**technical-documentation**](.github/skills/technical-documentation/SKILL.md) | Change summaries & API docs | VS Code, CLI, Claude, Cursor |
| [**deployment-automation**](.github/skills/deployment-automation/SKILL.md) | CI/CD pipelines & deployment strategies | VS Code, CLI, Claude, Cursor |

**Why Skills Matter**: Create once, use everywhere. Same skill works in VS Code, command line, Claude Desktop, or Cursor.

> **Learn more: [SKILLS-MIGRATION.md](SKILLS-MIGRATION.md)**

---

## Asset Types

```
.github/
├── skills/           # Cross-platform capabilities (agentskills.io)
├── agents/           # VS Code AI specialists
├── instructions/     # Coding standards (auto-applied)
├── prompts/          # Slash command templates
└── templates/        # Document formats
```

### What Gets Generated

| Asset Type | Count | Example |
|------------|-------|---------|
| **Skills** | 3-5 | `api-testing/SKILL.md` |
| **Agents** | 3-5 | `APIExpert.agent.md` |
| **Instructions** | 2-4 | `TestingPatterns.instructions.md` |
| **Prompts** | 2-3 | `GenerateEndpoint.prompt.md` |

Assets are **tailored to your tech stack** - React, Python, .NET, Go, Rust, PHP, and more.

---

## Key Commands

```bash
# Full repository setup
/BootstrapRepo REPOSITORY_PATH: "/path"

# Analyze existing project
/RepoReview TARGET_PATH: "/path"

# Create individual assets
/NewSkill SKILL_NAME: "api-testing", PURPOSE: "Jest API testing"
/NewCopilotAgent AGENT_NAME: "DatabaseExpert", DOMAIN: "PostgreSQL"
/NewInstructions DOMAIN: "Testing", APPLY_TO: "**/*.test.ts"

# Maintenance
/AssetOptimization TARGET_PATH: "/path/.github"
/HarmonizeAssets
/WorkflowIntegrityCheck STRICT: "true"
```

---

## How It Works

```
┌─────────────────────────────────────────────────────────┐
│  VS Code Workspace (Multi-Root)                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────┐    ┌─────────────────────────────┐ │
│  │ Your Project    │    │ CopilotCustomizer           │ │
│  │                 │    │ (The Toolbox)               │ │
│  │ src/            │    │                             │ │
│  │ tests/          │◄───│ Generates assets INTO       │ │
│  │ .github/        │    │ your project, not copied    │ │
│  │   skills/       │    │                             │ │
│  │   agents/       │    │ Close when done generating  │ │
│  │   instructions/ │    │                             │ │
│  └─────────────────┘    └─────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Pattern**: Add as workspace #2 → Generate into target repo → Close when done

---

## Documentation

| Document | Purpose |
|----------|---------|
| [**QUICKSTART.md**](QUICKSTART.md) | 5-minute setup guide |
| [**SKILLS-MIGRATION.md**](SKILLS-MIGRATION.md) | Agent Skills deep dive |
| [**EXAMPLES.md**](EXAMPLES.md) | Real-world tech stack examples |
| [**HOW-TO.md**](HOW-TO.md) | Complete command reference |
| [**AGENTS.md**](AGENTS.md) | Architecture & asset inventory |
| [**MULTI-WORKSPACE.md**](MULTI-WORKSPACE.md) | Setup patterns |

---

## Framework Inventory

### Skills (5)
Cross-platform capabilities using [agentskills.io](https://agentskills.io) standard.

### Agents (7)
VS Code workflow orchestration:
- `BootstrapRepo` - Repository setup entry point
- `AssetPlanner` - Recommendation engine
- `AssetGenerator` - Multi-asset creation
- `HarmonizationAgent` - Cross-reference binding
- `ChangeExecutor` - File operations
- `VerificationAgent` - Schema validation
- `CopilotCustomizer` - Main interactive mode

### Instructions (14)
Generation and quality patterns for asset creation.

### Prompts (16)
Slash commands for workflows and asset generation.

### Templates (7)
Standardized document formats.

---

## Best Practices

**DO**:
- Use absolute paths in `REPOSITORY_PATH`
- Keep CopilotCustomizer in separate workspace folder
- Close CopilotCustomizer when not generating
- Commit `.github/` folder to share with team

**DON'T**:
- Copy CopilotCustomizer into your project
- Modify framework files directly
- Use relative paths (can be ambiguous)

---

## Requirements

- **VS Code** 1.106+ with GitHub Copilot extension
- **GitHub Copilot** subscription (Individual/Business/Enterprise)
- **No additional dependencies** - pure Markdown framework

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Use `/UpdateCopilotCustomizer` for changes
4. Submit a pull request

---

## Resources

- [VS Code Copilot Customization](https://code.visualstudio.com/docs/copilot/customization/overview)
- [Agent Skills Standard](https://agentskills.io)
- [GitHub Awesome Copilot](https://github.com/github/awesome-copilot)
- [GitHub Copilot Docs](https://docs.github.com/copilot)

---

## License

MIT License - see [LICENSE](LICENSE)

---

<p align="center">
  <strong>CopilotCustomizer</strong> - Enterprise-ready AI customization framework
  <br>
  <em>Skills-first | Cross-platform | Zero dependencies</em>
</p>
