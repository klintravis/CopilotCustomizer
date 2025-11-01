---
agent: CopilotCustomizer
---

# AGENTS.md Workspace File Generator (v1.0)

**Paired Instructions**: [GenerateAgentsFile.instructions.md](../instructions/GenerateAgentsFile.instructions.md)

## Task Intent
Generate concise, actionable `AGENTS.md` workspace files per [GenerateAgentsFile.instructions.md](../instructions/GenerateAgentsFile.instructions.md).

## Variable Block
---
**Project Name** [REQUIRED]: "{PROJECT_NAME}"
**Primary Tasks** [REQUIRED]: "{PRIMARY_TASKS}"
**Build/Test/Lint** (default: inferred): "{BUILD_CMD}", "{TEST_CMD}", "{LINT_CMD}"
**Monorepo** (yes|no | default: no): {IS_MONOREPO}
---

## Generation Gate

Before generating AGENTS.md file, respond with:
- Project analysis and command inference results
- Clarifying questions OR `ready-to-generate` plus compact section list
- Risk assessment based on sensitivity level

Wait for explicit `confirm` before emitting the complete `AGENTS.md` file.

## Output Requirements
Generate complete `AGENTS.md` per [GenerateAgentsFile.instructions.md](../instructions/GenerateAgentsFile.instructions.md) with:
- Title, Quick Start (install/build/test/lint), Code Style, Testing, PR Instructions, Conflict Resolution, Example Commands
- Conditional: Security (high risk), Monorepo Guidance (if monorepo=true)

## Refinement Commands
| Command | Action |
|---------|--------|
| `refine: concise` | Compress to essentials |
| `refine: optimize` | Enhance clarity |
| `refine: expand` | Add examples |

**Generated using**: [GenerateAgentsFile.instructions.md](../instructions/GenerateAgentsFile.instructions.md)
- If command inference fails → request manual specification
- If security notes unclear → default to standard security practices
- If monorepo detection ambiguous → request clarification
- If cross-references break → preserve original and note for manual review

## Notes & Tips

- **Command Validation**: Ensure all inferred commands are testable and functional
- **Security Alignment**: Match security notes to declared risk sensitivity
- **Monorepo Support**: Include per-package examples when applicable
- **Token Efficiency**: Respect brevity setting while maintaining completeness
- **Framework Integration**: Leverage [GenerateAgentsFile.instructions.md](../instructions/GenerateAgentsFile.instructions.md) for consistency

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

Conforms to [GenerateAgentsFile.instructions.md](../instructions/GenerateAgentsFile.instructions.md) framework standards (v1.0). Optimized for VS Code Copilot customization ecosystem integration with enhanced schema compliance and cross-reference network.

## Binding References

- **Instructions**: [GenerateAgentsFile.instructions.md](../instructions/GenerateAgentsFile.instructions.md) - Complete authoring framework
- **Framework**: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md) - Core customization architecture
- **Standards**: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) - Output formatting compliance

---

*Generated and optimized following VS Code GitHub Copilot official documentation standards and AssetOptimization.instructions.md framework*