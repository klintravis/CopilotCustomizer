# CopilotCustomizer

> Generate tech-stack-specific AI customization in 5 minutes

**Uses**: [Agent Skills](https://agentskills.io) (cross-platform) + VS Code agents

## What You Get

- 🌍 **Cross-Platform Skills** - Work in VS Code, CLI, Claude, Cursor
- 🤖 **VS Code Agents** - Tech-specific AI specialists
- 📋 **Instructions** - Project coding standards
- ⚡ **Prompts** - Slash commands for common tasks
- 🔍 **Traceability** - Built-in asset tracking and invocation alerts

## Quick Start

1. **Add to workspace**: File → Add Folder → CopilotCustomizer
2. **Run**: `/BootstrapRepo REPOSITORY_PATH: "/your/project"`
3. **Confirm**: Type `confirm` when prompted

**Time**: ~5 minutes | **Result**: Complete customization in `.github/`

## Documentation

| Guide | Purpose |
|-------|---------|
| **[QUICKSTART.md](QUICKSTART.md)** | 5-minute setup ← **Start here** |
| **[SKILLS-MIGRATION.md](SKILLS-MIGRATION.md)** | Agent Skills explained |
| **[EXAMPLES.md](EXAMPLES.md)** | Real-world examples |
| **[AGENTS.md](AGENTS.md)** | Architecture + asset inventory |
| **[HOW-TO.md](HOW-TO.md)** | All commands + troubleshooting |
| **[MULTI-WORKSPACE.md](MULTI-WORKSPACE.md)** | Setup patterns |

## Key Commands

```bash
/BootstrapRepo REPOSITORY_PATH: "/path"        # Full setup
/RepoReview TARGET_PATH: "/path"               # Analyze project
/NewSkill SKILL_NAME: "name", PURPOSE: "desc"  # New skill
/NewCopilotAgent AGENT_NAME: "name"            # New agent
```

See [HOW-TO.md](HOW-TO.md) for all commands.

## Architecture

See [AGENTS.md](AGENTS.md) for:
- Asset inventory (4 skills, 7 agents, 13+ instructions)
- Handoff workflows
- Framework patterns

## License

MIT License - see [LICENSE](LICENSE) 