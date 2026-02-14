# Developer / Maintenance Tools

This directory contains **developer-facing** prompts and documentation for maintaining the CopilotCustomizer framework itself. These tools are separated from `.github/` to keep the VS Code slash-command palette clean and focused on user-facing workflows.

## Why Separate Dev Tools?

**Problem**: Including maintenance prompts in `.github/prompts/` clutters the slash-command palette for end users who only need generation commands.

**Solution**: Dev tools live here and can be used via:
- **Temporary copy** to `.github/prompts/` when needed
- **Direct file reference** using `#file:dev/prompts/PromptName.prompt.md` in Copilot Chat

This keeps the user experience clean while maintaining full maintainer capabilities.

## Dev Prompts

These prompts are **for framework maintainers**, not end users:

| Prompt | Purpose | When to Use |
|--------|---------|-------------|
| `prompts/Maintain.prompt.md` | Unified maintenance workflow (optimize, harmonize, validate) | Monthly audits, after major changes, quality improvements |
| `prompts/QuickChange.prompt.md` | Fast minimal-diff changes with single approval gate | Tiny fixes, typo corrections, quick updates |

**Key Differences from User Prompts**:
- **Maintain** - Comprehensive quality improvements with configurable modes (optimize, harmonize, validate, all)
- **QuickChange** - Surgical precision edits with minimal changes and user approval checkpoint

### How to Use Dev Prompts

**Method 1 — Temporary Copy** (recommended for frequent use):
1. Copy the prompt file into `.github/prompts/`
   ```bash
   # Windows PowerShell
   Copy-Item "dev\prompts\Maintain.prompt.md" ".github\prompts\"
   
   # macOS/Linux
   cp dev/prompts/Maintain.prompt.md .github/prompts/
   ```
2. Use it as a normal slash command: `/Maintain`
3. Remove the copy when done to keep palette clean
   ```bash
   # Windows PowerShell
   Remove-Item ".github\prompts\Maintain.prompt.md"
   
   # macOS/Linux
   rm .github/prompts/Maintain.prompt.md
   ```

**Method 2 — Direct File Reference** (quick one-off usage):
1. In Copilot Chat, reference the file directly:
   ```
   #file:dev/prompts/Maintain.prompt.md
   Run maintenance on .github/agents/ with mode: all
   ```
2. Follow with your specific request
3. No cleanup needed

**Examples**:

```bash
# Monthly quality audit (Method 1 - after copying to .github/prompts/)
/Maintain TARGET_PATH: ".github", MODE: "all"

# Quick typo fix (Method 2 - direct reference)
#file:dev/prompts/QuickChange.prompt.md
Fix typo in APIExpert.agent.md line 45: "recieve" → "receive"

# Optimize specific assets (Method 1)
/Maintain TARGET_PATH: ".github/agents", MODE: "optimize"
```

## Dev Documentation

Comprehensive technical documentation for framework maintainers:

| Document | Purpose | Key Information |
|----------|---------|-----------------|
| `ASSETS.md` | Complete asset reference | Types, schemas, frontmatter specifications, file counts |
| `AGENTS.md` | Architecture and design patterns | Orchestration flows, subagent hierarchy, naming conventions |
| `docs/changelog/CHANGELOG.md` | Framework version history | Release notes, breaking changes, migration guides |
| `docs/workflows/Maintain.md` | Maintain workflow details | Mode configurations, quality gates, harmonization logic |
| `docs/workflows/QuickChange.md` | QuickChange workflow details | Approval patterns, minimal-diff strategies, guardrails |

**When to Reference**:
- **ASSETS.md** - Understanding asset schemas, adding new asset types
- **AGENTS.md** - Designing new orchestration patterns, understanding agent hierarchy
- **Workflows** - Implementing or modifying maintenance procedures

## User-Facing Tools

User-facing assets remain in `.github/` for automatic discovery by VS Code:

**Structure**:
```
.github/
├── agents/           ← 6 workflow agents (CopilotCustomizer orchestrator + 5 subagents)
├── instructions/     ← 14 generation and quality frameworks
├── prompts/          ← 11 user commands (bootstrap, generation, review, workflows)
├── skills/           ← 6 cross-platform capabilities (repository-analysis, etc.)
├── standards/        ← 43 enterprise standards across 8 categories
└── templates/        ← 4 document formats (analysis, plans, changelogs)
```

**User Command Categories**:
1. **Core Workflows** - BootstrapRepo, RepoReview
2. **Asset Generation** - NewSkill, NewCopilotAgent, NewInstructions, NewPrompt
3. **Advanced Workflows** - NewHandoffChain, NewOrchestratedSystem, NewAgentsFile

See [HOW-TO.md](../HOW-TO.md) for complete user command reference and usage patterns.

---

## Maintenance Best Practices

### Regular Maintenance Schedule

**Monthly** (Recommended):
```bash
# Copy Maintain prompt temporarily
Copy-Item "dev\prompts\Maintain.prompt.md" ".github\prompts\"

# Run full maintenance
/Maintain TARGET_PATH: ".github", MODE: "all"

# Clean up
Remove-Item ".github\prompts\Maintain.prompt.md"
```

**After Major Changes**:
```bash
# Validate workflow integrity
/Maintain TARGET_PATH: ".github", MODE: "validate"
```

**Before Releases**:
```bash
# Optimize and harmonize
/Maintain TARGET_PATH: ".github", MODE: "optimize"
/Maintain TARGET_PATH: ".github", MODE: "harmonize"
```

### Quick Fixes Workflow

For small typos or minor corrections:
1. Use `#file:dev/prompts/QuickChange.prompt.md` reference
2. Specify exact change needed
3. Review single approval checkpoint
4. Verify change is minimal and precise

### Documentation Updates

**Keep synchronized**:
- Update `CHANGELOG.md` with meaningful changes
- Refresh `ASSETS.md` when adding/removing assets
- Update `AGENTS.md` when architecture evolves
- Sync asset counts across README files

### Asset Inventory Audits

Periodically verify actual files match documented counts:
```bash
# Windows PowerShell
(Get-ChildItem .github\agents\*.agent.md).Count
(Get-ChildItem .github\skills\*\SKILL.md).Count
(Get-ChildItem .github\standards\**\*.md -Exclude README.md).Count

# macOS/Linux
ls .github/agents/*.agent.md | wc -l
ls .github/skills/*/SKILL.md | wc -l
find .github/standards -name "*.md" ! -name "README.md" | wc -l
```

---

**Maintainer Focus**: Quality, consistency, and keeping the user experience clean and efficient.
