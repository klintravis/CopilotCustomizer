# Developer / Maintenance Tools

This directory contains **developer-facing** prompts and documentation used to maintain the CopilotCustomizer framework itself. They are separated from `.github/` so they don't appear in the VS Code slash-command palette alongside user-facing commands.

## Dev Prompts

These prompts are for framework maintainers, not end users:

| Prompt | Purpose |
|--------|---------|
| `prompts/OptimizeAndFormat.prompt.md` | Optimize, format, and validate Copilot assets |
| `prompts/HarmonizeAndValidate.prompt.md` | Harmonize cross-references and validate integrity |
| `prompts/QuickChange.prompt.md` | Fast minimal-diff changes with approval gate |
| `prompts/AgentResume.prompt.md` | Universal agent resume/continuation helper |

### How to Use Dev Prompts

**Option A — Temporary copy** (recommended for one-off use):
1. Copy the prompt file into `.github/prompts/`
2. Use it as a normal slash command
3. Remove the copy when done

**Option B — `#file:` reference in chat**:
1. In Copilot Chat, type `#file:dev/prompts/OptimizeAndFormat.prompt.md`
2. Follow with your request

## Dev Documentation

| Document | Purpose |
|----------|---------|
| `ASSETS.md` | Complete asset reference (types, schemas, inventory) |
| `AGENTS.md` | Architecture, asset inventory, and design patterns |
| `docs/changelog/CHANGELOG.md` | Framework version history |
| `docs/workflows/OptimizeAndFormat.md` | OptimizeAndFormat workflow details |
| `docs/workflows/HarmonizeAndValidate.md` | HarmonizeAndValidate workflow details |
| `docs/workflows/QuickChange.md` | QuickChange workflow details |

## User-Facing Tools

User-facing slash commands and infrastructure remain in `.github/`:

- **Prompts** (slash commands): `.github/prompts/` — BootstrapRepo, RepoReview, New*
- **Agents**: `.github/agents/` — 7 workflow agents
- **Instructions**: `.github/instructions/` — 14 coding/generation rules
- **Skills**: `.github/skills/` — 6 cross-platform capabilities
- **Templates**: `.github/templates/` — 4 document formats

See [HOW-TO.md](../HOW-TO.md) for the full command reference.
