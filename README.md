# CopilotCustomizer

> **Transform any codebase into an AI-enhanced development environment**

GitHub Copilot is powerful, but generic. Your team needs AI that understands *your* stack, *your* patterns, and *your* standards. CopilotCustomizer generates a complete, production-ready customization layer in minutes—no configuration complexity, no manual setup.

**Five powerful asset types working together**: Cross-platform Skills + VS Code Agents + Coding Instructions + Slash Commands + Enterprise Standards

## What You Get

- 🌍 **Cross-Platform Skills** - Portable AI capabilities that work in VS Code, GitHub CLI, Claude, Cursor, and more. Define domain knowledge once, use everywhere. Based on the open [agentskills.io](https://agentskills.io) standard.
- 🤖 **VS Code Agents** - Specialized AI experts with orchestrated workflows. Automatic handoffs, parallel execution, and tool access tailored to your tech stack.
- 📋 **Instructions** - Project-specific coding standards that guide all AI interactions. Automatically applied to matching files—no manual prompting needed.
- ⚡ **Prompts** - Interactive slash commands for common workflows. Structured templates with variables, parameters, and refinement options.
- 🏢 **Enterprise Standards** - Organization-wide coding conventions that naturally influence generated assets. Define once, enforce everywhere.

## Why CopilotCustomizer?

**Problems it solves**:
- ❌ Generic AI responses that don't match your codebase patterns or conventions
- ❌ Repeating the same context and requirements in every Copilot conversation
- ❌ Inconsistent code quality across team members and AI-generated code
- ❌ No systematic way to encode tribal knowledge into your AI development tools
- ❌ Time-consuming manual effort to maintain AI customizations as your stack evolves

**What makes it different**:
- ✅ **Autonomous generation** - Analyzes your repo and generates tailored assets automatically in 3-4 minutes
- ✅ **True orchestration** - Agents coordinate via handoffs with context preservation, not just isolated specialists
- ✅ **Skills-first architecture** - Portable capabilities work across VS Code, GitHub CLI, Claude, Cursor, and beyond
- ✅ **Quality built-in** - Automatic schema validation, cross-reference binding, and integrity verification
- ✅ **Enterprise-ready** - Standards system for organization-wide consistency and scalable governance

**Perfect for**: 
- Teams wanting AI that deeply understands their codebase and coding standards
- Solo developers seeking consistent, high-quality AI assistance across projects
- Organizations needing to encode best practices into AI-powered development workflows

## Quick Start

1. **Add to workspace**: `File` → `Add Folder to Workspace` → Select CopilotCustomizer directory
2. **Generate assets**: Open Copilot Chat (`Ctrl+Shift+I` or `Cmd+Shift+I`) and run:
   ```
   /BootstrapRepo REPOSITORY_PATH: "/absolute/path/to/your-project"
   ```
3. **Confirm generation**: Review the analysis, then type `confirm` (or click the confirm button in VS Code 1.109+)

The framework analyzes your repository, detects your tech stack, and generates Skills, Agents, Instructions, Prompts, and Standards tailored to your codebase—all saved in `your-project/.github/`.

**Time**: ~3-4 minutes | **Result**: Production-ready AI customization | **No code changes**: Only adds AI guidance files

## Documentation

| Guide | Purpose |
|-------|---------|
| **[QUICKSTART.md](QUICKSTART.md)** | 5-minute setup guide ← **Start here** |
| **[EXAMPLES.md](EXAMPLES.md)** | Real-world examples with React, Python, .NET, Node.js, and more |
| **[HOW-TO.md](HOW-TO.md)** | Complete commands reference + troubleshooting |
| **[dev/AGENTS.md](dev/AGENTS.md)** | Architecture deep-dive + asset inventory |

## Key Commands

All commands work via slash commands in Copilot Chat or natural language:

```bash
# Complete setup - analyzes repo and generates all assets
/BootstrapRepo REPOSITORY_PATH: "/path/to/project"

# Analyze project - understand tech stack and recommend improvements
/RepoReview TARGET_PATH: "/path/to/project"

# Create individual assets
/NewSkill SKILL_NAME: "name", PURPOSE: "description"
/NewCopilotAgent AGENT_NAME: "name", DOMAIN: "area"
/NewInstructions DOMAIN: "area", APPLY_TO: "**/*.ts"
/NewPrompt PURPOSE: "template goal"

# Advanced workflows
/NewHandoffChain WORKFLOW_NAME: "name"
/NewOrchestratedSystem SYSTEM_NAME: "name", SYSTEM_PATTERN: "orchestra"
/NewAgentsFile REPOSITORY_PATH: "/path/to/project"
```

**Tip**: Type `/` in Copilot Chat to see all available commands with auto-completion.

See [HOW-TO.md](HOW-TO.md) for detailed command documentation and advanced usage patterns.

## Architecture

CopilotCustomizer uses an **orchestrated agent system** where a central coordinator (CopilotCustomizer agent) intelligently routes work to specialized subagents. All five asset types work synergistically to create a cohesive AI development environment.

**Core Components**:
- **Central Orchestrator** - Routes workflows to specialized subagents
- **6 Specialized Agents** - BootstrapRepo, AssetPlanner, AssetGenerator, ChangeExecutor, VerificationAgent
- **6 Core Skills** - repository-analysis, implementation-planning, copilot-asset-design, technical-documentation, deployment-automation, multi-agent-orchestration
- **14 Instructions** - Generation frameworks, quality patterns, standards resolution
- **11 User Prompts** - Interactive commands for common workflows
- **Enterprise Standards** - Organization-wide conventions (43 standards across 8 categories)

**Key Patterns**:
- **Multi-Workspace Pattern** - CopilotCustomizer stays separate, generates into your projects
- **Skills-First Strategy** - Cross-platform analysis and planning before VS Code-specific operations
- **Quality Gates** - Automatic schema validation, harmonization, and integrity verification
- **Handoff Orchestration** - Guided workflows with context preservation (VS Code 1.109+)

See [dev/AGENTS.md](dev/AGENTS.md) for complete architecture documentation:
- Full asset inventory with file counts and purposes
- Enterprise standards system details  
- Agent handoff workflows and orchestration patterns
- Bootstrap automation workflow breakdown

## Developer Tools

Maintenance commands (`/Maintain`, `/QuickChange`) live in [`dev/`](dev/README.md) to keep the VS Code slash-command palette clean and focused on user workflows. See [dev/README.md](dev/README.md) for developer tool usage.

## Requirements

**Recommended**:
- **VS Code 1.109+** - Full feature support including Skills (GA), orchestration controls, parallel subagent execution, and enhanced handoffs
- **GitHub Copilot** subscription (Individual, Business, or Enterprise)

**Minimum**:
- VS Code 1.106+ with GitHub Copilot extension

**No additional dependencies required** - Framework uses pure Markdown with YAML frontmatter.

## License

MIT License - See [LICENSE](LICENSE) for details.

---

**Built for modern AI-powered development** | **Enterprise-ready** | **Open Source** 