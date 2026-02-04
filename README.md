# CopilotCustomizer

> **Transform any codebase into an AI-enhanced development environment**

GitHub Copilot is powerful, but generic. Your team needs AI that understands *your* stack, *your* patterns, and *your* standards. CopilotCustomizer generates a complete, production-ready customization layer in minutes—no setup complexity, no manual configuration.

**Five powerful patterns working together**: Cross-platform Skills + VS Code Agents + Coding Instructions + Slash Commands + Enterprise Standards

## What You Get

- 🌍 **Cross-Platform Skills** - Portable AI capabilities that work in VS Code, CLI, Claude, Cursor, and more. Define domain knowledge once, use everywhere.
- 🤖 **VS Code Agents** - Specialized AI experts for your tech stack. Orchestrated workflows with automatic handoffs between agents.
- 📋 **Instructions** - Project-specific coding standards that guide all AI interactions. Apply rules automatically based on file patterns.
- ⚡ **Prompts** - Structured slash commands for common workflows. Reusable templates with variables and refinement commands.
- 🏢 **Enterprise Standards** - Organization-wide coding conventions that influence every generated asset. Define once, enforce everywhere.

## Why CopilotCustomizer?

**Problems it solves**:
- ❌ Generic AI responses that don't match your codebase patterns
- ❌ Repeating the same context in every Copilot conversation
- ❌ Inconsistent code quality across team members and AI generations
- ❌ No way to encode tribal knowledge into AI tools
- ❌ Manual effort to maintain AI customizations as your stack evolves

**What makes it different**:
- ✅ **Autonomous generation** - Analyzes your repo, generates tailored assets automatically
- ✅ **True orchestration** - Agents coordinate via handoffs, not just isolated specialists
- ✅ **Cross-platform first** - Skills work beyond VS Code (CLI, Claude, Cursor, etc.)
- ✅ **Quality built-in** - Schema validation, harmonization, and verification gates
- ✅ **Enterprise-ready** - Standards system for org-wide consistency

**Best for**: Teams wanting AI that knows their codebase intimately. Solo developers who want consistent, high-quality AI assistance.

## Quick Start

1. **Add to workspace**: File → Add Folder → CopilotCustomizer
2. **Run**: `/BootstrapRepo REPOSITORY_PATH: "/your/project"`
3. **Confirm**: Type `confirm` when prompted

The framework analyzes your repository, detects your tech stack, and generates Skills, Agents, Instructions, Prompts, and Standards tailored to your codebase.

**Time**: ~5 minutes | **Result**: Complete customization in `.github/`

## Documentation

| Guide | Purpose |
|-------|---------|
| **[QUICKSTART.md](QUICKSTART.md)** | 5-minute setup ← **Start here** |
| **[EXAMPLES.md](EXAMPLES.md)** | Real-world examples |
| **[AGENTS.md](dev/AGENTS.md)** | Architecture + asset inventory |
| **[HOW-TO.md](HOW-TO.md)** | All commands + troubleshooting |

## Key Commands

```bash
/BootstrapRepo REPOSITORY_PATH: "/path"        # Full setup
/RepoReview TARGET_PATH: "/path"               # Analyze project
/NewSkill SKILL_NAME: "name", PURPOSE: "desc"  # New skill
/NewCopilotAgent AGENT_NAME: "name"            # New agent
/NewOrchestratedSystem SYSTEM_NAME: "name", SYSTEM_PATTERN: "orchestra", REPOSITORY_PATH: "/path"  # Orchestrated system
```

See [HOW-TO.md](HOW-TO.md) for all commands.

## Architecture

CopilotCustomizer uses an **orchestrated agent system** where a central coordinator routes work to specialized subagents. All five asset types (Skills, Agents, Instructions, Prompts, Standards) work together to create a cohesive AI development environment.

See [dev/AGENTS.md](dev/AGENTS.md) for:
- Complete asset inventory (6 core skills, 6 agents, 14 instructions, 9 user prompts + 2 dev prompts, 4 templates)
- Enterprise standards system architecture (`.github/standards/`)
- Agent handoff workflows and orchestration patterns
- Full bootstrap automation workflow details

## Developer Tools

Maintenance commands (Maintain, QuickChange) live in [`dev/`](dev/README.md) to keep the VS Code slash-command palette clean. See [dev/README.md](dev/README.md) for usage.

## License

MIT License - see [LICENSE](LICENSE) 