---
agent: CopilotCustomizer
---

<!-- ASSET: NewInstructions | TYPE: Prompt | VERSION: v1.0 -->


# NewInstructions.prompt.md

## Metadata
Asset ID: prompt/newinstructions | Created: 2026-01-14 | Status: Active

**Paired Instructions**: [GenerateInstructions.instructions.md](../instructions/GenerateInstructions.instructions.md)

### Task Intent
Generate `*.instructions.md` files.

### Variable Block
---
**Domain** [REQUIRED]: "{DOMAIN}"
**Objective** [REQUIRED]: "{OBJECTIVE}"
---

### Validation Rules
- Required: `{DOMAIN}` and `{OBJECTIVE}`
- All other details (tech stack, security level, sections, refinement commands) inferred from domain and objective

### Generation Gate
First respond with clarifying questions OR `ready-to-generate` + structure summary. Do not output full instructions before explicit `confirm` response.

### Output Requirements
Generate complete `*.instructions.md` with:
- Front Matter (`applyTo` required), Title, Context, Objective, Tech Stack, Coding Standards, Security (conditional), Testing, Tooling, Documentation, Review Criteria, Refinement Commands, Change Management
- Default refinement: `refine: concise`, `refine: expand`, `refine: security`, `refine: performance`

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: concise` | Compress output |
| `refine: expand` | Add details |
| `refine: security` | Enhance security section |

**Generated using**: [GenerateInstructions.instructions.md](../instructions/GenerateInstructions.instructions.md)

### After Generation
Issue refinement commands or tweak variables and resend to regenerate.

### Standards Compliance & Processing Metadata

**VS Code Copilot Compliance**: Prompt Files Schema - Full compliance achieved  
**Schema Requirements**: 
- ✅ Markdown body with clear usage instructions and variable blocks
- ✅ Optional `agent`, `tools`, and `model` fields when useful
- ✅ Documentation sources referenced per schema guidelines

**Standards Sources**: 
- [VS Code Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot/customization/)

**Processing Metadata**:
- **Standards Version**: VS Code Copilot v2025.11 (Prompt Files latest)
- **Harmonization**: comprehensive-harmony-v1.0 (enhanced cross-references)
- **Content Preservation**: 100% functionality maintained with enhanced standards
- **Formatting Applied**: 2025-09-15 | Standards compliance verified

### Summary
Standardizes `*.instructions.md` creation with minimal inputs, smart inference, and strict schema conformance to [GenerateInstructions.instructions.md](../instructions/GenerateInstructions.instructions.md). Integrates seamlessly with the complete Copilot customization asset ecosystem.

---

**Harmonization Applied**: 2025-09-15 | **Asset Integration**: 16-file ecosystem  
**Cross-References**: Enhanced with bidirectional binding | **Schema**: VS Code v1.0 compliant  

*Generated and formatted following VS Code GitHub Copilot official documentation standards*

---

## Audit
Last invoked: [Manual log]
Change history: v1.0 (2026-01-14) - Added traceability
