---
applyTo: '**/*.agent.md'
description: 'Standardized framework for creating AGENTS.md files that guide AI coding agents with clear, actionable project instructions and development workflows'
---

# Agent File Authoring Guide (v1.0)

**Schema Compliance**: VS Code Custom Instructions Schema v1.0  
**Asset Type**: Instructions | **Domain**: Agent File Generation  
**Paired Prompt**: [NewAgent.prompt.md](../prompts/NewAgent.prompt.md) - AGENTS.md generation workflow  
**Framework Integration**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization architecture

## Purpose

Define a standardized approach to creating `AGENTS.md` (or `.agent.md`) files that guide coding agents (including GitHub Copilot coding agent) with clear, actionable project instructions and development workflows.

## Scope & Positioning

- **Audience**: AI coding agents and tools; complements `README.md` for humans
- **Relationship**: Align with custom instructions, prompt files, and chat modes; avoid duplicating policy text—link when possible
- **Conflict Resolution Order**: explicit chat instruction > nearest `AGENTS.md`/`.agent.md` in the directory tree > global custom instructions

## Canonical Sections (Recommended Order)

| # | Section | Required | Purpose |
|---|---------|----------|---------|
| 1 | Project Overview | Yes | One-paragraph summary, key tech, goals |
| 2 | Quick Start | Yes | Install, build, test, lint commands (copy-pasteable) |
| 3 | Code Style | Yes | Lint/format rules, strictness, conventions |
| 4 | Testing Instructions | Yes | How to run tests locally and in CI; focus flags |
| 5 | PR Instructions | Yes | Title format, pre-commit checks, CI expectations |
| 6 | Security Considerations | Conditional | Secrets, permissions, data handling, risky operations |
| 7 | Monorepo Guidance | Conditional | Per-package commands; nested `AGENTS.md` precedence |
| 8 | Troubleshooting | Optional | Common failures, logs, rebuild steps |
| 9 | Appendix | Optional | Links to custom instructions, prompts, chat modes |

## Authoring Rules

1. **Command Clarity**: Provide copy-pasteable commands (`pnpm` if standard, else `npm`)
2. **Format Preference**: Use bullets/tables; fence commands. Mark assumptions `(assumed)`
3. **Monorepo Support**: Include filter examples and note nearest-file precedence
4. **Security**: Never include secrets; link to vault/process documentation

## Skeleton Template

```markdown
# AGENTS.md — {PROJECT_NAME}
Short purpose: {PRIMARY_TASKS}

## Quick Start
- Install: `pnpm install` (assumed)
- Build: `{BUILD_CMD}`
- Test: `{TEST_CMD}`
- Lint: `{LINT_CMD}`

## Code Style
- Formatter/Lint: {STYLE_RULES}
- Type/Strictness: {STRICTNESS}

## Testing Instructions
- Full suite: `{TEST_CMD}`
- Focus single: `{TEST_FOCUS}`
- CI: artifacts, coverage thresholds (assumed)

## PR Instructions
- Title: `{PR_TITLE}`
- Pre-commit: `pnpm lint && pnpm test`
- All checks green before merge

## Security Considerations
- Secrets via environment/CI, never committed
- Least privilege for tokens; review permissions

## Monorepo Guidance
- Per-package: `pnpm -F <pkg> test`
- Nested AGENTS.md: nearest file takes precedence

## Conflict Resolution
Explicit chat > nearest AGENTS.md/.agent.md > global custom instructions

## References
- VS Code customization overview
- Copilot coding agent docs
- agents.md examples
```

## Quality Checklist

- [ ] Commands runnable; no placeholders
- [ ] Style/PR rules match repository conventions
- [ ] Security notes included if sensitive data/processes involved
- [ ] Monorepo guidance provided when applicable
- [ ] Conflict resolution hierarchy noted
- [ ] All template variables properly defined
- [ ] Cross-references to related assets functional

## Change Management

- **Versioning**: Include version in file header or repository change log
- **Update Triggers**: Modify when build/test/CI rules change
- **Maintenance**: Regular review of command validity and tool updates

## Output Enforcement

**File Generation Requirements**:
- All generated `AGENTS.md` artifacts **MUST** be written to `CopilotCustomizer/output/agents/`
- **File Name Pattern**: `<repo-or-folder-name> - agent - <YYYY-MM-DD>.md`
- **Example**: `CopilotCustomizer - agent - 2025-09-15.md`

**Required Metadata**:
Each generated file must include front-matter or top metadata with these keys:
- `OutputPath`: Relative path under repository root
- `GeneratedAt`: ISO timestamp of generation
- `SourceInstruction`: Reference to this instruction file
- `Type`: `agent`

**Ready-to-Run Section**:
Include copy/paste commands (install/build/test) for immediate Quick Start execution.

## Example Implementation

**Generated File Path**: `CopilotCustomizer/output/agents/CopilotCustomizer - agent - 2025-09-15.md`

**Front-Matter Template**:
```yaml
OutputPath: CopilotCustomizer/output/agents/CopilotCustomizer - agent - 2025-09-15.md
GeneratedAt: 2025-09-15T12:00:00Z
SourceInstruction: instructions/GenerateAgent.instructions.md
Type: agent
```

## Workflow Integration

**Generation Process**: Execute via [NewAgent.prompt.md](../prompts/NewAgent.prompt.md) for consistent agent file creation following this framework.

**Quality Assurance**: Use [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) refinement commands:
- `refine: audit` - Validate structure and completeness
- `refine: optimize` - Enhance clarity and actionability
- `refine: concise` - Streamline for essential information only

## Best Practices

### Content Guidelines
- **Brevity**: Keep AGENTS.md concise and actionable
- **Linking**: Reference deeper documentation rather than duplicating content
- **Assumptions**: Clearly mark assumed dependencies or configurations
- **Validation**: Ensure all commands are tested and functional

### Template Usage
- **Variable Consistency**: Use consistent naming patterns for template variables
- **Example Values**: Provide realistic example values for guidance
- **Conditional Sections**: Include only relevant sections for specific project types
- **Cross-References**: Link to related customization assets when applicable

## Standards Compliance & Processing Metadata

**VS Code Copilot Compliance**: Custom Instructions Schema - Full compliance achieved  
**Schema Requirements**: 
- ✅ Required `applyTo` field in YAML front matter (`**/*.agent.md`)
- ✅ Required `description` field with comprehensive generation overview
- ✅ Markdown body with detailed authoring guidelines
- ✅ Documentation sources referenced per schema guidelines

**Standards Sources**: 
- [VS Code Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot/customization/)
- [GitHub Copilot Coding Agent](https://code.visualstudio.com/docs/copilot/copilot-coding-agent)

**Processing Metadata**:
- **Standards Version**: VS Code Copilot v2025.09 (Custom Instructions latest)
- **Content Preservation**: 100% functionality maintained with enhanced structure
- **Formatting Applied**: 2025-09-15 | Standards compliance verified

## Summary

This framework enables consistent creation of actionable `AGENTS.md` files that effectively guide AI coding agents through project-specific development workflows while maintaining alignment with the broader VS Code Copilot customization ecosystem.

**Integration Points**:
- **Generation**: [NewAgent.prompt.md](../prompts/NewAgent.prompt.md) - Execution workflow
- **Framework**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Quality assurance
- **Standards**: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) - Output formatting

---

*Generated and optimized following VS Code GitHub Copilot official documentation standards and AssetOptimization.instructions.md framework*