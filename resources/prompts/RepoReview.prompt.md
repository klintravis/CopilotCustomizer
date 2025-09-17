---
mode: CopilotCustomizer
---

# RepoReview.prompt.md

## Repo Audit & Scaffolding Prompt (v1.1-h1)

<!-- Harmony Metadata -->
**Schema Compliance**: VS Code Prompt Files Schema v1.0  
**Harmonization Metadata**: harmonizedWith: ['RepoReview.instructions.md', 'CopilotCustomizer.chatmode.md'] | bindingVersion: 'harmony-v1.0' | lastHarmonized: '2025-09-15' | preservationLevel: 'medium' | schemaVersion: "1.0" | harmonizationDate: "2025-09-15" | bindingStrength: "standard"  
**Harmonized Assets**: RepoReview.instructions.md, RepoReview.prompt.md

### Harmonized Assets
**Paired Instructions**: [RepoReview.instructions.md](../instructions/RepoReview.instructions.md) - Comprehensive repository analysis framework  
**Related Assets**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization framework  
**Asset Ecosystem**: Part of 16-asset Copilot customization framework

**Harmonization**: comprehensive-harmony-v1.0 (enhanced cross-references)  
**Binding Strength**: standard | **Preservation Level**: medium  
**Content Changes**: <10% (YAML front matter + cross-references)

### Chat Mode Binding
`chatmodes/CopilotCustomizer.chatmode.md` - Framework integration point

### Task Intent
Audit Copilot customization assets in repo/folder → generate structured analysis via `templates/Analysis.template.md` → deliver ready-to-run improvement prompts with priorities → save to `CopilotCustomizer/output/` following the comprehensive framework defined in [RepoReview.instructions.md](../instructions/RepoReview.instructions.md).

### Usage Instructions
1. Review [RepoReview.instructions.md](../instructions/RepoReview.instructions.md) for complete analysis framework
2. Fill minimal required variables below and send
3. Respond to clarifiers or `ready-to-generate`; then reply `confirm` for the analysis
4. Use refinement commands to iterate or focus on specific code areas
5. Leverage [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) for optimization and quality assurance

### Variable Block
---
**Target Path** [REQUIRED]: "{TARGET_PATH}"
**Focus Area** (default: all assets): "{FOCUS_AREA}"  
**Output Constraints** (default: exclude binaries/caches): "{KNOWN_CONSTRAINTS}"
---

### Validation Rules
- `{TARGET_PATH}` required and must be accessible per [RepoReview.instructions.md](../instructions/RepoReview.instructions.md) standards
- Default scope: all Copilot assets (`*.chatmode.md`, `*.instructions.md`, `*.prompt.md`, `AGENTS.md`)  
- Default constraints: exclude binaries, caches (review existing `.github/*` files)
- Path validation failure → request clarification

### Generation Gate
Respond `ready-to-generate` + scope summary, then await `confirm` before generating full analysis following [RepoReview.instructions.md](../instructions/RepoReview.instructions.md) workflow.

### Output Requirements (On Confirm)
**ENFORCED Structure per [RepoReview.instructions.md](../instructions/RepoReview.instructions.md)**:
- Use `templates/Analysis.template.md` format
- Save to: `CopilotCustomizer/output/<repo-name> - Repo Review - <YYYY-MM-DD>.md`
- Include front-matter: `GeneratedAt`, `OutputPath` fields
- Add section: `Ready-to-run Prompts` with concrete examples

**Per Asset Type** (AGENTS.md, instructions, prompts, chatmodes):
- Priority level (High/Med/Low)
- Ready-to-run generator prompt with source path
- Usage instruction for immediate execution

### Workflow Integration
**Quality Assurance via [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md)**:
- Use `refine: audit` for structural validation
- Apply `refine: optimize` for token efficiency
- Leverage `refine: concise` for executive summaries

### Generator Prompt Integration
**Available Generator Prompts** (enhanced cross-references):
- [NewAgent.prompt.md](../prompts/NewAgent.prompt.md) → AGENTS.md creation
- [NewInstructions.prompt.md](../prompts/NewInstructions.prompt.md) → instruction file creation  
- [NewPrompt.prompt.md](../prompts/NewPrompt.prompt.md) → prompt file creation
- [NewChatmode.prompt.md](../prompts/NewChatmode.prompt.md) → chatmode creation

### Refinement Commands
- `refine: enforce-output` – Validate output path/format compliance, regenerate if needed
- `refine: risks` – Expand risk/mitigation section with technical concerns  
- `refine: generators` – Focus on generator prompt quality and completeness

### Examples

**Minimal Input**:
```
{TARGET_PATH}=c:\Source\CopilotCustomizer
{FOCUS_AREA}=(all assets)
{KNOWN_CONSTRAINTS}=(standard exclusions)
```

**Focused Review**:
```
{TARGET_PATH}=c:\Source\MyProject  
{FOCUS_AREA}=chatmodes/
{KNOWN_CONSTRAINTS}=exclude .github/*, focus on canonical paths only
```

### Paired Prompt Execution
**Recommended Workflow**:
1. Execute this prompt (RepoReview.prompt.md) to generate repository analysis
2. Review output against [RepoReview.instructions.md](../instructions/RepoReview.instructions.md) standards
3. Use generated ready-to-run prompts with referenced generator files
4. Apply refinement commands as needed for optimization

### Binding References
- **Instructions**: [RepoReview.instructions.md](../instructions/RepoReview.instructions.md) - Complete analysis framework
- **Framework**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization architecture
- **Standards**: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) - Output formatting compliance

### Standards Compliance & Processing Metadata

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
- **Harmonization**: comprehensive-harmony-v1.0 (enhanced cross-references)
- **Content Preservation**: 100% functionality maintained with enhanced standards
- **Formatting Applied**: 2025-09-15 | Standards compliance verified

### Version Note
Conforms to [RepoReview.instructions.md](../instructions/RepoReview.instructions.md) analysis framework standards (v1.1-h1). Integrates seamlessly with the complete Copilot customization asset ecosystem for comprehensive repository auditing.

---

**Harmonization Applied**: 2025-09-15 | **Asset Integration**: 16-file ecosystem  
**Cross-References**: Enhanced with bidirectional binding | **Schema**: VS Code v1.0 compliant  

*Generated and formatted following VS Code GitHub Copilot official documentation standards*