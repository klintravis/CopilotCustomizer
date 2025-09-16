---
applyTo: '.github/prompts/RepoReview.prompt.md'
description: 'Comprehensive framework for conducting repository analysis of Copilot customization assets, providing structured assessment, prioritization, and ready-to-run improvement prompts for chatmodes, instructions, prompts, and agent files'
---

# RepoReview.instructions.md

## Repo Review Instructions (v1.2-h1)

<!-- Harmony Metadata -->
**Harmonization Metadata**: harmonizedWith: ['RepoReview.prompt.md', 'CopilotCustomizer.chatmode.md'] | bindingVersion: 'harmony-v1.0' | lastHarmonized: '2025-09-15' | preservationLevel: 'medium'
**Schema Compliance**: VS Code Custom Instructions Schema v1.0  
**Harmonization Metadata**: schemaVersion: "1.0" | harmonizationDate: "2025-09-15" | bindingStrength: "standard"  
**Harmonized Assets**: RepoReview.instructions.md, RepoReview.prompt.md

### Harmonized Assets
**Paired Prompt**: [RepoReview.prompt.md](../prompts/RepoReview.prompt.md) - Repository audit and scaffolding prompt with comprehensive harmony integration  
**Related Assets**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization framework  
**Asset Ecosystem**: Part of 16-asset Copilot customization framework

**Harmonization**: comprehensive-harmony-v1.0 (enhanced cross-references)  
**Binding Strength**: standard | **Preservation Level**: medium  
**Content Changes**: <10% (YAML front matter + cross-references)

### Context & Objectives
Guide AI agents to audit Copilot customization assets (`*.chatmode.md`, `*.instructions.md`, `*.prompt.md`, `AGENTS.md`) and deliver actionable improvement analysis via `templates/Analysis.template.md` following the unified workflow established in [RepoReview.prompt.md](../prompts/RepoReview.prompt.md).

**Core Workflow**: Scan repo/folder → prioritize gaps → generate ready-to-run improvement prompts → save structured analysis to `CopilotCustomizer/output/`.

**Scope**: review all included `.github/*` existing files. Always exclude binaries and caches.

**Framework Integration**: Seamlessly integrates with [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) for comprehensive asset management and quality assurance.

### Variable Block (Required Inputs)
- **Target Path**: Repo root or specific folder path (as specified in [RepoReview.prompt.md](../prompts/RepoReview.prompt.md))
- **Focus Area**: Optional filter (e.g., `chatmodes/`, `prompts/`, `all`)
- **Output Constraints**: Default to exclude `.github/*`, binaries, caches

### Validation Rules  
- Must scan canonical asset paths: `chatmodes/`, `instructions/`, `prompts/`, `AGENTS.md`
- For each asset found: assess completeness, Harmony pattern compliance, versioning
- Assign priority levels (High/Med/Low) based on impact and effort
- Skip missing `.github/prompts/` references gracefully
- **Cross-Reference Integration**: Validate against [RepoReview.prompt.md](../prompts/RepoReview.prompt.md) variable requirements
- **Quality Assurance**: Leverage [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) refinement commands for validation

### Generation Gate
Before analysis generation:
1. Confirm target path exists and is accessible
2. Validate scope aligns with Copilot customization assets per [RepoReview.prompt.md](../prompts/RepoReview.prompt.md) standards
3. Check `templates/Analysis.template.md` is available for output structure
4. **Workflow Integration**: Ensure alignment with [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) analysis patterns

### Output Requirements (ENFORCED)

**File Location**: `CopilotCustomizer/output/<repo-name> - Repo Review - <YYYY-MM-DD>.md`  
**Structure**: Must follow `templates/Analysis.template.md` with these additions:
- Front-matter: `GeneratedAt:` timestamp, `OutputPath:` field
- Section: `Ready-to-run Prompts` with concrete, copy-paste prompts

**Ready-to-run Prompt Standards**:
- Variables replaced with example values or input requirements listed
- Include exact path to source prompt (e.g., `CopilotCustomizer/.github/prompts/NewPrompt.prompt.md`)
- One-line usage instruction for immediate execution
- Priority assignment (High/Med/Low) for each suggested action
- **Generation Workflow**: Reference [RepoReview.prompt.md](../prompts/RepoReview.prompt.md) for consistent output generation following this framework

### Workflow Integration
**Automated Generation via [RepoReview.prompt.md](../prompts/RepoReview.prompt.md)**:
- Use prompt generator for consistent repository analysis
- Apply refinement commands for optimization
- Validate output against this framework's standards

**Quality Assurance via [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md)**:
- Use `refine: audit` for structural validation
- Apply `refine: optimize` for token efficiency  
- Leverage `refine: concise` for executive summaries

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: enforce-output` | Validate output path/format compliance, regenerate if needed |
| `refine: risks` | Expand risk/mitigation section with specific technical concerns |
| `refine: generators` | Focus on generator prompt quality and completeness |

### Quality Checklist
- [ ] Target path validated and assets inventoried
- [ ] Analysis follows `templates/Analysis.template.md` structure  
- [ ] Output saved to `CopilotCustomizer/output/<smart-title>.md`
- [ ] Ready-to-run prompts section includes concrete examples with paths
- [ ] Priority levels assigned (High/Med/Low) to all recommendations
- [ ] No placeholder variables remain in output
- [ ] Generator prompts reference available prompt files
- [ ] Cross-references to [RepoReview.prompt.md](../prompts/RepoReview.prompt.md) functional
- [ ] Integration with [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) verified

### Generator Prompts Available (Enhanced Cross-References)
- [NewAgent.prompt.md](../prompts/NewAgent.prompt.md) → AGENTS.md creation
- [NewInstructions.prompt.md](../prompts/NewInstructions.prompt.md) → instruction file creation  
- [NewPrompt.prompt.md](../prompts/NewPrompt.prompt.md) → prompt file creation
- [NewChatmode.prompt.md](../prompts/NewChatmode.prompt.md) → chatmode creation

### Example Output Structure
```
# CopilotCustomizer - Repo Review - 2025-09-14
GeneratedAt: 2025-09-14T10:30:00Z
OutputPath: CopilotCustomizer/output/CopilotCustomizer - Repo Review - 2025-09-14.md

## Ready-to-run Prompts
**Create Missing AGENTS.md (High Priority)**
Source: `CopilotCustomizer/.github/prompts/NewAgent.prompt.md`
Prompt: "Generate AGENTS.md for CopilotCustomizer with build commands, coding standards, and PR workflow."
Usage: Copy prompt into Copilot chat and execute.
```

### Change Management
- Version in file header or repo change log
- Update when analysis templates or output requirements change
- **Harmonization Tracking**: Last harmonized 2025-09-15 with comprehensive cross-reference integration
- **Standards Compliance**: Follows VS Code Custom Instructions schema requirements

### Notes
Keep repository reviews comprehensive yet actionable; link to generator prompts for immediate improvement workflows. Integrate with the broader Copilot customization ecosystem for holistic asset management.

### Binding References
- **Prompt Generator**: [RepoReview.prompt.md](../prompts/RepoReview.prompt.md) - Repository audit and scaffolding execution
- **Framework**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization architecture
- **Standards**: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) - Output formatting compliance

### Standards Compliance & Processing Metadata

**VS Code Copilot Compliance**: Custom Instructions Schema - Full compliance achieved  
**Schema Requirements**: 
- ✅ Required `applyTo` field in YAML front matter targeting markdown files
- ✅ Required `description` field with comprehensive framework overview
- ✅ Markdown body with detailed analysis guidelines and templates
- ✅ Documentation sources referenced per schema guidelines

**Standards Sources**: 
- [VS Code Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot/customization/)
- [GitHub Copilot Coding Agent](https://code.visualstudio.com/docs/copilot/copilot-coding-agent)

**Processing Metadata**:
- **Standards Version**: VS Code Copilot v2025.09 (Custom Instructions latest)
- **Harmonization**: comprehensive-harmony-v1.0 (enhanced cross-references)
- **Content Preservation**: 100% functionality maintained with enhanced standards
- **Formatting Applied**: 2025-09-15 | Standards compliance verified

### Version Note
Conforms to [RepoReview.prompt.md](../prompts/RepoReview.prompt.md) execution workflow standards (v1.2-h1). Integrates seamlessly with the complete Copilot customization asset ecosystem for comprehensive repository analysis and improvement planning.

---

**Harmonization Applied**: 2025-09-15 | **Asset Integration**: 16-file ecosystem  
**Cross-References**: Enhanced with bidirectional binding | **Schema**: VS Code v1.0 compliant  

*Generated and formatted following VS Code GitHub Copilot official documentation standards*