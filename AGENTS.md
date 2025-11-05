# CopilotCustomizer

A comprehensive VS Code GitHub Copilot customization framework for asset generation, harmonization, formatting, and optimization.

## Overview

**CopilotCustomizer is a toolbox framework** - use it to enhance ANY repository with custom AI agents, instructions, and prompts. Works via VS Code multi-workspace pattern: keep CopilotCustomizer separate, use it to generate assets in your actual projects.

**Pattern**: Don't copy → Use as workspace #2 → Generate into target repo → Close when done

## Quick Start

### Multi-Workspace Setup (Recommended)

```bash
# 1. Open your project in VS Code
code /path/to/your-project

# 2. Add CopilotCustomizer as second workspace folder
# File → Add Folder to Workspace → select CopilotCustomizer

# 3. Use prompts to generate assets
# In Copilot Chat, type:
/BootstrapRepo REPOSITORY_PATH: "/path/to/your-project"
# Review and type: confirm

# 4. Assets created in YOUR project (not CopilotCustomizer)
# Close CopilotCustomizer folder when done
```

**See**: 
- [QUICKSTART.md](QUICKSTART.md) - 5-minute setup guide
### Documentation

| Document | Purpose |
|----------|---------|
| **[QUICKSTART.md](QUICKSTART.md)** | 5-minute setup guide ← **Start here** |
| **[EXAMPLES.md](EXAMPLES.md)** | Real-world tech stack examples |
| **[MULTI-WORKSPACE.md](MULTI-WORKSPACE.md)** | Detailed multi-workspace patterns |
| **[HOW-TO.md](HOW-TO.md)** | Technical reference |
| **[.github/ASSETS.md](.github/ASSETS.md)** | Complete asset reference | NewInstructions.prompt.md - Add coding rules
# - NewPrompt.prompt.md - Create template
# All assets generated in YOUR project, not CopilotCustomizer
```

## How It Works

### The Multi-Workspace Pattern

**Two Folders, One Workspace**:
```
VS Code Workspace
├── 📁 your-actual-project/     ← Work here, assets created here
│   ├── src/
│   ├── .github/                ← Generated customizations appear here
│   │   ├── agents/
│   │   ├── instructions/
│   │   └── prompts/
│   └── AGENTS.md
└── 📁 CopilotCustomizer/       ← The toolbox (read-only)
    └── .github/prompts/        ← Use these to generate assets
```

**Workflow**:
1. Open both folders in VS Code workspace
2. Use CopilotCustomizer prompts in Copilot Chat
3. Assets generate in YOUR project
4. Close CopilotCustomizer folder
5. Your project has customization forever

**Benefits**:
- ✅ CopilotCustomizer stays pristine
- ✅ Same toolbox for all projects
- ✅ Easy updates (`git pull` in CopilotCustomizer)
- ✅ No file copying needed

## Agents Inventory
- **RepoAnalyzer**: Repository analysis and tech stack detection
- **ImplementationPlanner**: Strategic planning with quality gate
- **ChangeExecutor**: Precise change implementation
- **VerificationAgent**: Schema and acceptance criteria validation
- **DocumentationGenerator**: Comprehensive change summaries
- **BootstrapRepo**: Repository bootstrap entry point (same workspace)
- **AssetPlanner**: Asset recommendation and specification
- **AssetGenerator**: Multi-asset creation engine
- **HarmonizationAgent**: Cross-reference binding and metadata
- **WorkflowValidator**: Workflow integrity and handoff chain validation
- **CopilotCustomizer**: Main customization architect

## Templates Inventory
- **Analysis.template.md**: Universal analysis framework
- **ImplementationPlan.template.md**: Project planning format
- **ProgressLog.template.md**: Quick progress tracking
- **TestStrategy.template.md**: Test planning and TDD workflows
- **SecurityReview.template.md**: Security assessments and OWASP audits
- **ChangeLog.template.md**: Release notes and change documentation
- **AssetInventory.template.md**: Asset catalog and compliance tracking

## Code Style
- **YAML**: `applyTo` (required for instructions), `description` (required for agents)
- **Markdown**: H2 main sections, H3 subsections
- **References**: `[filename](path/to/file.md)`
- **Naming**: `PascalCase.{agent|instructions|prompt}.md`

## Available Prompts (Slash Commands)

Use slash commands directly in Copilot Chat. See the centralized cheat sheet:

- `HOW-TO.md` → "Slash Command Cheat Sheet"

Highlights:
- `/BootstrapRepo REPOSITORY_PATH: "/path"` — Full setup
- `/RepoReview TARGET_PATH: "/path"` — Analysis
- `/NewCopilotAgent ...` · `/NewInstructions ...` · `/NewPrompt ...`

All prompts generate assets in YOUR project, not in CopilotCustomizer.

## Testing
```bash
# Validate your project's generated assets
# In Copilot Chat, type:
/RepoReview TARGET_PATH: "/path/to/your-project"
# Review validation results
```

## PR Instructions
**Title**: `[CopilotCustomizer] Brief description`

**Checklist**:
- [ ] Schema validation passes (run "refine: audit" in CopilotCustomizer mode)
- [ ] Cross-references intact
- [ ] Documentation updated
- [ ] No broken links
- [ ] Workflow handoffs validated (use WorkflowValidator for workflows)

**Modification Rules**: Preserve cross-references, maintain schema compliance, test in clean VS Code environment

## Conflict Resolution
1. Explicit Chat Instructions
2. Nearest AGENTS.md
3. Global Instructions

## Workflows

### BootstrapRepo
**Purpose**: Fully autonomous asset generation for a target repository in the same workspace  
**Entry Point**: [BootstrapRepo.prompt.md](.github/prompts/BootstrapRepo.prompt.md)  
**Documentation**: [BootstrapRepo Workflow](docs/workflows/BootstrapRepo.md)

**Usage**:
```
/BootstrapRepo REPOSITORY_PATH: "/path/to/repo"
```

**Workflow**: Analysis → Planning → [Confirm] → Generation → Validation → Harmonization → Documentation  
**Duration**: <5 minutes | **User Input**: 2 interactions (start + confirm)

**Agents Involved**:
- BootstrapRepo (entry)
- RepoAnalyzer (analysis)
- AssetPlanner (recommendations)
- AssetGenerator (creation)
- VerificationAgent (validation x2)
- HarmonizationAgent (binding)
- DocumentationGenerator (reporting)

### Internal Repository Optimization
**Purpose**: CopilotCustomizer repository maintenance and improvement  
**Entry Point**: CopilotCustomizer chat mode  
**Agents**: RepoAnalyzer, ImplementationPlanner, ChangeExecutor, VerificationAgent

## Example Commands
```bash
# BootstrapRepo (most common)
# In Copilot Chat, type:
/BootstrapRepo REPOSITORY_PATH: "/Users/dev/my-api-project"
# Review and type: confirm
# Result: Complete customization generated in your project

# Create Individual Asset
# In Copilot Chat, type:
/NewCopilotAgent AGENT_NAME: "DatabaseExpert", DOMAIN: "PostgreSQL"
# Review and type: confirm
# Result: New agent created in your project's .github/agents/

# Analyze Your Repository
# In Copilot Chat, type:
/RepoReview TARGET_PATH: "/path/to/your-project"
# Review recommendations

# Optimize Assets
# In Copilot Chat, type:
/AssetOptimization TARGET_PATH: "/path/to/your-project/.github"
# Review and confirm improvements

# Format Assets
# In Copilot Chat, type:
/FormatAssets TARGET_PATH: "/path/to/your-project/.github"
# Review formatting changes

# All prompts available as slash commands in Copilot Chat
# All assets generated in: your-project/.github/
```

---
**Version**: v1.0 | **Framework**: VS Code GitHub Copilot Customization