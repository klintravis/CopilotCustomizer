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
   /Bootstrap REPOSITORY_PATH: "/absolute/path/to/your-project"
   ```
3. **Confirm generation**: Review the analysis, then type `confirm` (or click the confirm button in VS Code 1.109+)

The framework analyzes your repository, detects your tech stack, and generates Skills, Agents, Instructions, Prompts, and Standards tailored to your codebase—all saved in `your-project/.github/`.

**Time**: ~3-4 minutes | **Result**: Production-ready AI customization | **No code changes**: Only adds AI guidance files

## Documentation

| Guide | Purpose |
|-------|---------|
| **[QUICKSTART.md](docs/QUICKSTART.md)** | 5-minute setup guide ← **Start here** |
| **[EXAMPLES.md](docs/EXAMPLES.md)** | Real-world examples with React, Python, .NET, Node.js, and more |
| **[HOW-TO.md](docs/HOW-TO.md)** | Complete commands reference + troubleshooting |
| **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** | Architecture deep-dive + asset inventory |

All commands work via slash commands in Copilot Chat or natural language:

```bash
# Complete setup - analyzes repo and generates all assets
/Bootstrap REPOSITORY_PATH: "/path/to/project"

# Analyze project - understand tech stack and recommend improvements
/Review TARGET_PATH: "/path/to/project"

# Create individual assets
/NewSkill SKILL_NAME: "name", PURPOSE: "description"
/NewAgent AGENT_NAME: "name", DOMAIN: "area"
/NewInstructions DOMAIN: "area", APPLY_TO: "**/*.ts"
/NewPrompt PURPOSE: "template goal"

# Advanced workflows
/NewMultiAgent SYSTEM_NAME: "name", COMPLEXITY: "linear"
/NewMultiAgent SYSTEM_NAME: "name", COMPLEXITY: "orchestra"
/NewAgentsFile REPOSITORY_PATH: "/path/to/project"
```

**Tip**: Type `/` in Copilot Chat to see all available commands with auto-completion.

See [HOW-TO.md](docs/HOW-TO.md) for detailed command documentation and advanced usage patterns.

## Architecture

CopilotCustomizer uses an **orchestrated agent system** where a unified orchestrator (CopilotCustomizer agent) programmatically routes all work—including both external repository operations and toolkit self-improvement—to specialized subagents via the `agent` tool.

**Core Components**:
- **Unified Orchestrator** — Routes all workflows (user repos + toolkit) to specialized subagents
- **7 Agents** — CopilotCustomizer (orchestrator), Bootstrap, Planner, Generator, Editor, Verifier, Evolve
- **6 Core Skills** — repo-analysis, planning, asset-design, documentation, deployment-automation, orchestration
- **12 Instructions** — Generation frameworks, quality patterns, standards resolution, toolkit maintenance
- **11 Prompts** — Interactive commands for workflows, asset generation, maintenance, and toolkit evolution
- **Enterprise Standards** — Organization-wide conventions (43 standards across 8 categories)

**Key Patterns**:
- **Multi-Workspace Pattern** — CopilotCustomizer stays separate, generates into your projects
- **Skills-First Strategy** — Cross-platform analysis and planning before VS Code-specific operations
- **Quality Gates** — Automatic schema validation, harmonization, and integrity verification
- **Programmatic Orchestration** — All subagent invocation via `agent` tool (no manual handoffs)

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for complete architecture documentation:
- Full asset inventory with file counts and purposes
- Enterprise standards system details  
- Agent handoff workflows and orchestration patterns
- Bootstrap automation workflow breakdown

## Maintenance & Toolkit Evolution

All maintenance and toolkit evolution commands are available as standard slash commands:

- `/Maintain` — Unified asset maintenance via AssetMaintenance instruction (optimize, harmonize, format, validate)
- `/QuickFix` — Fast minimal-diff changes with single approval gate
- `/Evolve` — Monitor VS Code Copilot releases, audit toolkit assets, review documentation, optimize performance, and implement feature requests

**Toolkit Self-Improvement**: Use `/Evolve` to evolve the framework itself. The CopilotCustomizer orchestrator routes these requests to the Evolve specialist subagent.

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