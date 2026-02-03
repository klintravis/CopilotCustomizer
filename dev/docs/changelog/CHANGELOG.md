# Changelog

All notable changes to the CopilotCustomizer framework.

## [v1.1] - 2026-01-31

### Enterprise Coding Standards
- Added `.github/standards/` system for defining organizational coding conventions
- Standards influence generated assets naturally (never copied verbatim)
- YAML frontmatter schema with `scope` (always/tech-match) and `priority` (high/medium/low)
- 43 standards files across 8 categories: languages (9), frameworks (8), testing (5), databases (4), architecture (5), security (4), practices (5), devops (3)
- New `ResolveStandards.instructions.md` for pipeline integration

### Multi-Agent Orchestration
- New `multi-agent-orchestration` skill for conductor/subagent patterns
- `/NewWorkflowSystem` slash command for generating orchestrated systems
- Orchestra (3-5 agents), Atlas (5-10 agents), and Custom patterns
- TDD lifecycle enforcement, quality gates, plan file architecture
- New `OrchestrationPlan.template.md` for plan tracking

### Activation Logging
- All skills, agents, and prompts now display activation notifications
- Standardized logging format across all asset types

### Maintenance Simplification
- Consolidated overlapping prompts into `OptimizeAndFormat` and `HarmonizeAndValidate`
- Removed 4 legacy agents (converted to cross-platform skills)
- Removed 8 legacy prompts and 3 legacy instructions (consolidated)
- Kept `QuickChange` for quick edits

## [v1.0.1] - 2025-11-15

### VS Code 1.106 Compatibility
- Updated to VS Code 1.106 agent metadata (target, name, argument-hint, mcp-servers)
- Migrated terminology: "Chat modes" to "Custom agents"
- Added security enhancements: post-approval, source-level trust, workspace MCP config
- Confirmed `.agent.md` as standard format
- No breaking changes

## [v1.0] - 2025-11-01

### Initial Release
- 7 agents, 14 instructions, 13 prompts, 6 skills, 4 templates
- Agent-first architecture with `.agent.md` format
- Multi-workspace toolbox pattern
- BootstrapRepo autonomous workflow
- Skills-first cross-platform strategy (agentskills.io)
- Complete documentation suite

---

**Framework**: CopilotCustomizer
**Compliance**: VS Code GitHub Copilot Customization v1.108+
**Last Updated**: 2026-01-31
