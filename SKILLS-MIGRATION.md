# CopilotCustomizer Skills Migration

## Overview

CopilotCustomizer has been updated to emphasize **Agent Skills** - the new cross-platform capability format introduced by VS Code that works across multiple AI platforms.

**Date**: January 11, 2026  
**Changes**: De-emphasized workflows, prioritized Skills generation  
**Impact**: Improved portability, cross-platform compatibility

---

## What Changed

### Before (Workflow-Heavy)
- Heavy emphasis on multi-agent workflows
- 8 workflow documentation files in `docs/workflows/`
- **11 agents** (complex, overwhelming)
- Agent-centric asset generation
- VS Code-specific approach

### After (Skills-First)
- **Agent Skills** as primary capability delivery
- Cross-platform portable capabilities (agentskills.io standard)
- **6 agents** (streamlined) + **3 Skills** (portable)
- Skills + Agents + Instructions + Prompts
- Multi-platform support (VS Code, CLI, Claude, Cursor, etc.)

### Agent Reduction
**Converted 3 agents to Skills** for cross-platform portability:
- RepoAnalyzer → **repository-analysis** skill
- WorkflowValidator → **copilot-asset-design** skill
- DocumentationGenerator → **technical-documentation** skill

**Result**: 45% fewer agents, improved portability

---

## What Are Agent Skills?

**Agent Skills** are folders containing instructions, scripts, and resources that AI agents can load on-demand to perform specialized tasks.

### Key Characteristics

| Feature | Description |
|---------|-------------|
| **Format** | `.github/skills/{skill-name}/SKILL.md` |
| **Standard** | Open standard at agentskills.io |
| **Portability** | Works across VS Code, GitHub Copilot CLI, Claude, Cursor |
| **Content** | Instructions + scripts + examples + resources |
| **Loading** | Progressive disclosure (3-level: discovery → instructions → resources) |
| **Activation** | Automatic based on prompt relevance |

### Structure
```
.github/skills/
└── skill-name/           # Lowercase with hyphens
    ├── SKILL.md          # Required: name, description, instructions
    ├── examples/         # Optional: example files
    ├── scripts/          # Optional: helper scripts
    └── resources/        # Optional: documentation, templates
```

### SKILL.md Format
```markdown
---
name: skill-name
description: What this skill does and when to use it (max 1024 chars)
---

# Skill Purpose
[Instructions, examples, and usage guidance]
```

---

## Skills vs Other Assets

| Asset Type | Purpose | Portability | When to Use |
|------------|---------|-------------|-------------|
| **Skills** | Specialized capabilities | Cross-platform (open standard) | Capabilities that should work everywhere |
| **Agents** | AI specialists | VS Code only | VS Code-specific tool access, handoffs |
| **Instructions** | Coding standards | VS Code/GitHub | Project-wide guidelines |
| **Prompts** | Task templates | VS Code only | Reusable parameterized templates |

---

## What's New

### New Skills Created (3 skills from agents)

1. **[repository-analysis](.github/skills/repository-analysis/SKILL.md)**
   - Repository structure and pattern analysis
   - Tech stack detection methodology
   - Dependency mapping strategies
   - **Converted from**: RepoAnalyzer agent

2. **[copilot-asset-design](.github/skills/copilot-asset-design/SKILL.md)**
   - Asset architecture patterns
   - Quality validation criteria
   - Integration strategies
   - **Converted from**: WorkflowValidator agent

3. **[technical-documentation](.github/skills/technical-documentation/SKILL.md)**
   - Documentation patterns and generation
   - API documentation templates
   - Change summary formats
   - **Converted from**: DocumentationGenerator agent

### New Generation Instructions

1. **[GenerateSkill.instructions.md](.github/instructions/GenerateSkill.instructions.md)**
   - Complete framework for creating Agent Skills
   - SKILL.md format specification
   - Progressive disclosure patterns
   - Cross-platform compatibility guidelines

2. **[NewSkill.prompt.md](.github/prompts/NewSkill.prompt.md)**
   - Slash command: `/NewSkill`
   - Generates Skills with examples and scripts
   - Tech stack-aware templates
   - Multi-platform verification

### Updated Files

1. **[README.md](README.md)**
   - Skills-first messaging
   - Cross-platform benefits highlighted
   - Updated asset hierarchy

2. **[AGENTS.md](AGENTS.md)**
   - Skills-First Strategy section
   - Asset generation hierarchy
   - Updated BootstrapRepo description

3. **[BootstrapRepo.prompt.md](.github/prompts/BootstrapRepo.prompt.md)**
   - Now generates Skills as priority
   - Updated examples show Skills generation
   - Modified timings (3-4 minutes vs 2-3)

4. **[AssetPlanner.agent.md](.github/agents/AssetPlanner.agent.md)**
   - Skills recommendation framework
   - Priority decision tree (Skills vs Agents)
   - Updated specification template

5. **[QUICKSTART.md](QUICKSTART.md)**
   - Updated timings
   - Added Skills to result description

---

## How to Use Skills

### Generate a Skill

```
/NewSkill SKILL_NAME: "api-testing", PURPOSE: "Automated API testing with Jest"
```

**Result**: Creates `.github/skills/api-testing/` with:
- `SKILL.md` - Instructions and examples
- `examples/` - Sample test files
- `scripts/` - Helper utilities (optional)

### Enable Skills in VS Code

Skills support is in preview. Enable it:

1. Open VS Code Settings (`Ctrl+,`)
2. Search for: `chat.useAgentSkills`
3. Check the box to enable

Or add to `settings.json`:
```json
{
  "chat.useAgentSkills": true
}
```

### How Skills Work

**Progressive Disclosure** (3 levels):

1. **Discovery** (Always loaded)
   - Skill `name` and `description` from YAML
   - AI knows what skills exist

2. **Instructions** (Loaded on match)
   - Full SKILL.md body content
   - Activated when prompt matches description

3. **Resources** (On-demand)
   - Scripts, examples, templates
   - Loaded only when referenced

**Benefit**: Install many skills without consuming context. Only relevant content loads automatically.

---

## Migration Guide

### For Existing Projects

If you already used CopilotCustomizer (before Skills support):

1. **No Breaking Changes**
   - Existing agents, instructions, prompts still work
   - Workflows still function (but de-emphasized in docs)

2. **Add Skills** (Recommended)
   ```
   /NewSkill SKILL_NAME: "your-capability", PURPOSE: "description"
   ```

3. **Re-Bootstrap** (Optional - for complete Skills support)
   ```
   /BootstrapRepo REPOSITORY_PATH: "/path/to/your-project"
   ```
   - Will add Skills alongside existing assets
   - Won't overwrite existing files

### For New Projects

Use BootstrapRepo - Skills are now generated by default:
```
/BootstrapRepo REPOSITORY_PATH: "/path/to/new-project"
```

Generates:
- 🆕 Skills (3-5 based on tech stack)
- Agents (3-5 VS Code specialists)
- Instructions (2-4 coding standards)
- Prompts (2-3 task templates)

---

## Decision Tree: Skill vs Agent

### Choose Skill When:
✅ Capability should work across multiple AI platforms  
✅ Need to include scripts, examples, or resources  
✅ Want automatic activation based on user context  
✅ Building specialized workflows (testing, debugging, deployment)

### Choose Agent When:
✅ Need VS Code-specific tool access (terminal, file system)  
✅ Require handoff workflows between multiple agents  
✅ Building role-based specialists with strict tool permissions

### Example: Testing

**Skill** (`testing-workflows/`):
- Test structure patterns
- Best practices documentation
- Example test files
- Works in VS Code, CLI, Claude, Cursor

**Agent** (`TestOrchestrator.agent.md`):
- Uses VS Code terminal to run tests
- Integrates with file system to create test files
- Hands off to coverage analysis agent
- VS Code only

**Best Practice**: Create Skill for test patterns, Agent for test automation.

---

## Cross-Platform Benefits

Skills work across these platforms:

| Platform | Status | Notes |
|----------|--------|-------|
| VS Code | ✅ Preview | Enable `chat.useAgentSkills` setting |
| GitHub Copilot CLI | ✅ Supported | Auto-loads from `.github/skills/` |
| GitHub Copilot Agent | ✅ Supported | Used during automated coding |
| Claude (Anthropic) | ✅ Supported | Original Skills creator |
| Cursor | ✅ Supported | Cross-platform compatibility |
| Goose | ✅ Supported | Open source agent |
| Others | ✅ Growing | Any agentskills.io compatible agent |

**Portability**: Create once, use everywhere.

---

## Common Skill Patterns

### Testing Skill
```yaml
---
name: webapp-testing
description: Automated web application testing with Playwright. Use when creating or debugging end-to-end tests.
---

# Web Application Testing
[Instructions for test structure, execution, debugging...]
```

### API Development Skill
```yaml
---
name: api-development
description: RESTful API development patterns with Express/FastAPI. Use when building API endpoints.
---

# API Development
[Endpoint patterns, error handling, validation...]
```

### Debugging Skill
```yaml
---
name: troubleshooting-cicd
description: Debug CI/CD pipeline failures by analyzing logs and suggesting fixes.
---

# CI/CD Troubleshooting
[Log analysis patterns, common issues, solutions...]
```

---

## Resources

### Documentation
- **Agent Skills Standard**: https://agentskills.io/
- **VS Code Docs**: https://code.visualstudio.com/docs/copilot/customization/agent-skills
- **Example Skills**: https://github.com/anthropics/skills

### CopilotCustomizer Assets
- **Generate Skill**: `/NewSkill` prompt
- **Instructions**: [GenerateSkill.instructions.md](.github/instructions/GenerateSkill.instructions.md)
- **Examples**: Generated by BootstrapRepo workflow

### Community
- **Awesome Copilot**: https://github.com/github/awesome-copilot
- **VS Code Insiders**: Early access to Skills features

---

## FAQ

### Do I need to migrate existing projects?
No. Existing agents/instructions/prompts continue to work. Skills are additive.

### Can Skills replace agents?
Not entirely. Skills provide cross-platform capabilities, but agents offer VS Code-specific tool access and handoff workflows.

### How do I enable Skills in VS Code?
Set `"chat.useAgentSkills": true` in VS Code settings. (Preview feature)

### Where are Skills stored?
- Project: `.github/skills/` (recommended)
- User profile: `~/.github/skills/` (personal)
- Legacy: `.claude/skills/` (backward compatibility)

### Do Skills work without VS Code?
Yes! That's the key benefit. Use same skills in CLI, Claude, Cursor, etc.

### How many Skills should I create?
Start with 3-5 core capabilities for your tech stack. Skills are lightweight when not loaded.

### Can I share Skills across projects?
Yes! Store in user profile (`~/.github/skills/`) or create a Skills repository to share.

---

## Next Steps

1. **Enable Skills**: Set `chat.useAgentSkills: true` in VS Code
2. **Generate Skills**: Use `/NewSkill` or `/BootstrapRepo`
3. **Test Portability**: Try Skills in CLI or other platforms
4. **Share**: Contribute to community skill repositories

---

## Summary

**What**: Agent Skills support added to CopilotCustomizer  
**Why**: Cross-platform portability, open standard, automatic activation  
**Impact**: Skills are now the primary capability delivery mechanism  
**Compatibility**: Existing assets unchanged, Skills are additive  
**Migration**: Optional re-bootstrap for full Skills support  

**Skills-First Strategy**: Generate portable capabilities that work across all AI platforms, supplement with VS Code-specific agents when needed.

---

**Updated**: January 11, 2026  
**Framework**: CopilotCustomizer v1.1  
**Standard**: Agent Skills (agentskills.io)
