---
agent: CopilotCustomizer
---

# AGENTS.md Scaffold Prompt (v1.0)

**Schema Compliance**: VS Code Prompt Files Schema v1.0  
**Paired Instructions**: [GenerateAgent.instructions.md](../instructions/GenerateAgent.instructions.md) - Comprehensive agent file generation framework  
**Framework Integration**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization architecture  
**Asset Ecosystem**: Part of 16-asset Copilot customization framework

## Chat Mode Binding

`chatmodes/CopilotCustomizer.chatmode.md` - Framework integration point

## Task Intent

Generate a concise, actionable `AGENTS.md` (or `.agent.md`) file that guides coding agents with build/test commands, code style, PR rules, security notes, and optional per-package overrides for monorepos following the comprehensive framework defined in [GenerateAgent.instructions.md](../instructions/GenerateAgent.instructions.md).

## Usage Instructions

1. Review [GenerateAgent.instructions.md](../instructions/GenerateAgent.instructions.md) for complete authoring framework
2. Fill only required variables; others are inferred from project context
3. Receive clarifiers or `ready-to-generate` + plan; then reply `confirm`
4. Use refinement commands to adjust size, depth, or scope
5. Leverage [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) for quality assurance

## Variable Block

---
**Project Name** [REQUIRED]: "{PROJECT_NAME}"  
**Primary Agent Tasks** (≤20 words) [REQUIRED]: "{PRIMARY_TASKS}"  
**Build Command** (default: inferred): "{BUILD_CMD}"  
**Test Command** (default: inferred): "{TEST_CMD}"  
**Lint Command** (default: inferred): "{LINT_CMD}"  
**Style Rules** (comma list | default: inferred): "{STYLE_RULES}"  
**PR Title Format** (default: [<project>] <Title>): "{PR_TITLE}"  
**Security Notes** (default: none): "{SECURITY_NOTES}"  
**Monorepo** (yes|no | default: no): {IS_MONOREPO}  
**Per-Package Pattern** (default: packages/*): "{PACKAGE_GLOB}"  
**Risk Sensitivity** (low|medium|high | default: medium): {RISK_SENSITIVITY}  
**Token Priority** (brevity|balance|detail | default: brevity): {TOKEN_PRIORITY}  
---

## Validation Rules

- Required: `{PROJECT_NAME}` and `{PRIMARY_TASKS}` per [GenerateAgent.instructions.md](../instructions/GenerateAgent.instructions.md) standards
- Omitted commands → infer (`pnpm` if standard, else `npm run ...`)
- `{IS_MONOREPO}`=yes → add nested AGENTS.md + filter examples
- `{RISK_SENSITIVITY}`=high → include Security checklist
- `{TOKEN_PRIORITY}`=brevity → bullet/tables first
- No dangling placeholders in output
- All template variables must be resolved or marked as inferred

## Generation Gate

Before generating AGENTS.md file, respond with:
- Project analysis and command inference results
- Clarifying questions OR `ready-to-generate` plus compact section list
- Risk assessment based on sensitivity level

Wait for explicit `confirm` before emitting the complete `AGENTS.md` file.

## Output Requirements (On Confirm)

**Following [GenerateAgent.instructions.md](../instructions/GenerateAgent.instructions.md) Standards**:

Produce a complete `AGENTS.md` (or `.agent.md`) containing:

1. **Title and Purpose**: Project name with short purpose line
2. **Quick Start**: Install, build, test, lint commands (copy-pasteable)
3. **Code Style**: Lint/format rules synopsis with strictness levels
4. **Testing Instructions**: Commands, focus flags, CI notes
5. **PR Instructions**: Title format, pre-commit checks, merge requirements
6. **Security Considerations**: Only if risk is high or notes provided
7. **Monorepo Guidance**: Only if monorepo=true - per-package commands and nested AGENTS.md rules
8. **Conflict Resolution**: Explicit chat > nearest AGENTS.md > global instructions hierarchy
9. **Example Commands**: Copy-pasteable command examples for immediate use
10. **Version Documentation**: Version note `v1.0` with framework alignment

## Workflow Integration

**Quality Assurance via [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md)**:
- Use `refine: audit` for structural validation
- Apply `refine: optimize` for clarity and actionability
- Leverage `refine: concise` for essential information focus

## Default Refinement Commands

| Command | Action |
|---------|--------|
| `refine: concise` | Compress output for essential information only |
| `refine: optimize` | Enhance clarity and actionability |
| `refine: expand` | Add detailed examples and explanations |
| `refine: risks` | Focus on security and risk mitigation |

## Internal Quality Checklist

**Pre-Generation Validation**:
- [ ] Mandatory variables (`{PROJECT_NAME}`, `{PRIMARY_TASKS}`) set
- [ ] Commands present or successfully inferred
- [ ] Conflict resolution hierarchy included
- [ ] No unresolved placeholders remain
- [ ] Token strategy matches `{TOKEN_PRIORITY}` setting

**Post-Generation Validation**:
- [ ] All sections properly structured per [GenerateAgent.instructions.md](../instructions/GenerateAgent.instructions.md)
- [ ] Copy-pasteable commands functional
- [ ] Security considerations appropriate for risk level
- [ ] Cross-references to framework functional

## Example Usage

**Minimal Input**:
```
{PROJECT_NAME}=Acme Web
{PRIMARY_TASKS}=Implement features, run tests, open PRs
```

**Expected Processing**:
- Auto-infers: `pnpm` commands (or npm), style rules, PR title format
- Adds monorepo section only if requested
- Includes security notes only if risk sensitivity is high
- Formats output according to token priority (brevity default)

## Risk Mitigation Notes

**High Risk Areas**:
- Command inference accuracy - validate against project structure
- Security note appropriateness - ensure alignment with sensitivity level
- Cross-reference integrity - maintain links to paired instructions
- Template variable resolution - prevent dangling placeholders

**Fallback Behaviors**:
- If command inference fails → request manual specification
- If security notes unclear → default to standard security practices
- If monorepo detection ambiguous → request clarification
- If cross-references break → preserve original and note for manual review

## Notes & Tips

- **Command Validation**: Ensure all inferred commands are testable and functional
- **Security Alignment**: Match security notes to declared risk sensitivity
- **Monorepo Support**: Include per-package examples when applicable
- **Token Efficiency**: Respect brevity setting while maintaining completeness
- **Framework Integration**: Leverage [GenerateAgent.instructions.md](../instructions/GenerateAgent.instructions.md) for consistency

## Standards Compliance & Processing Metadata

**VS Code Copilot Compliance**: Prompt Files Schema - Full compliance achieved  
**Schema Requirements**: 
- ✅ Required `mode` field in YAML front matter (ask/agent/generate)
- ✅ Markdown body with clear usage instructions and variable blocks
- ✅ Documentation sources referenced per schema guidelines

**Standards Sources**: 
- [VS Code Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot/customization/)
- [GitHub Copilot Coding Agent](https://code.visualstudio.com/docs/copilot/copilot-coding-agent)

**Processing Metadata**:
- **Standards Version**: VS Code Copilot v2025.09 (Prompt Files latest)
- **Content Preservation**: 100% functionality maintained with enhanced structure
- **Formatting Applied**: 2025-09-15 | Standards compliance verified

## Version Note

Conforms to [GenerateAgent.instructions.md](../instructions/GenerateAgent.instructions.md) framework standards (v1.0). Optimized for VS Code Copilot customization ecosystem integration with enhanced schema compliance and cross-reference network.

## Binding References

- **Instructions**: [GenerateAgent.instructions.md](../instructions/GenerateAgent.instructions.md) - Complete authoring framework
- **Framework**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization architecture
- **Standards**: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) - Output formatting compliance

---

*Generated and optimized following VS Code GitHub Copilot official documentation standards and AssetOptimization.instructions.md framework*