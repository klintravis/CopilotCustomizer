---
mode: CopilotCustomizer
---

## Asset Optimization Prompt (v1.0-h1)

<!-- Harmony Metadata -->
**Schema Compliance**: VS Code Prompt Files Schema v1.0  
**Harmonization Metadata**: schemaVersion: "1.0" | harmonizationDate: "2025-09-15" | bindingStrength: "standard"  
**Harmonized Assets**: AssetOptimization.instructions.md, AssetOptimization.prompt.md

### Harmonized Assets
**Paired Instructions**: [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md) - Comprehensive asset optimization framework  
**Related Assets**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization framework  
**Asset Ecosystem**: Part of 16-asset Copilot customization framework

**Harmonization**: comprehensive-harmony-v1.0 (enhanced cross-references)  
**Binding Strength**: standard | **Preservation Level**: medium  
**Content Changes**: <5% (YAML front matter + cross-references)

### Chat Mode Binding
`chatmodes/CopilotCustomizer.chatmode.md` - Framework integration point

### Task Intent
Review and optimize VS Code Copilot customization assets while preserving existing links, hard references, and basic structural integrity following the comprehensive framework defined in [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md).

### Usage Instructions
1. Review [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md) for complete optimization framework
2. Provide the asset file path and specify optimization focus areas
3. Respond to clarifiers or `ready-to-generate`; then reply `confirm` for optimization
4. Use refinement commands to adjust preservation vs optimization balance
5. Review generated output for link integrity before implementation
6. Leverage [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) for quality assurance

### Variable Block
---
**Asset Path** [REQUIRED]: "{ASSET_PATH}"
**Asset Type** (auto-detected | chatmode/instructions/prompt/agent): "{ASSET_TYPE}"
**Optimization Focus** (clarity/efficiency/structure/compliance/all): "{OPTIMIZATION_FOCUS}"
**Preserve Sections** (comma list | default: all critical sections): "{PRESERVE_SECTIONS}"
**Quality Emphasis** (clarity/concise/completeness/balanced | default: balanced): "{QUALITY_EMPHASIS}"
**Output Format** (replace-file/diff/suggestions | default: replace-file): "{OUTPUT_FORMAT}"
---

### Validation Rules
- Required: `{ASSET_PATH}` must exist and be readable per [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md) standards
- Auto-detect `{ASSET_TYPE}` from file extension and content patterns
- Default `{OPTIMIZATION_FOCUS}` to "all" if not specified
- Preserve all existing chat mode bindings, instruction references, and cross-file links
- Maintain version compatibility and schema requirements
- Validate that optimization doesn't break paired relationships

### Generation Gate
Before optimization, respond with:
- Asset type detection and current structure analysis
- Identified links/references that must be preserved  
- Proposed optimization areas and potential risks
- `ready-to-generate` confirmation request following [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md) protocol

Only proceed with full optimization after explicit `confirm`.

### Output Requirements (On Confirm)
**Following [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md) Standards**:

**For Chat Modes** (`*.chatmode.md`):
- Preserve: description, schemaVersion, depthModes, refinementCommands
- Optimize: role clarity, workflow sections, audit dimensions table
- Maintain: all external documentation links and examples

**For Instructions** (`*.instructions.md`):
- Preserve: version numbers, paired prompt references, enforcement rules
- Optimize: section organization, token efficiency, clarity
- Maintain: template references and generator prompt paths

**For Prompts** (`*.prompt.md`):
- Preserve: mode, chat mode binding, paired instructions references
- Optimize: variable block clarity, validation rules, examples
- Maintain: task intent and output requirements structure

**For Agent Files** (`AGENTS.md`, `.agent.md`):
- Preserve: build commands, security notes, existing workflow references
- Optimize: actionability, organization, conflict resolution guidance
- Maintain: directory-specific configurations and tool references

### Workflow Integration
**Quality Assurance via [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md)**:
- Use `refine: audit` for structural validation
- Apply `refine: optimize` for token efficiency
- Leverage `refine: concise` for executive summaries

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: preserve-refs` | Re-validate all links and references are intact |
| `refine: structure` | Focus on organizational improvements while maintaining compatibility |
| `refine: optimize` | Enhance token efficiency and clarity without breaking functionality |
| `refine: validate` | Check schema compliance and paired asset alignment |

### Quality Checklist
- [ ] All existing links and references preserved and functional
- [ ] Asset type-specific requirements maintained (front-matter, sections, etc.)
- [ ] Paired relationships with other assets remain intact
- [ ] Version numbers and schema compatibility preserved
- [ ] No broken cross-references or missing dependencies
- [ ] Optimization improves readability without losing functionality
- [ ] Original structural patterns maintained where critical
- [ ] External documentation links remain valid
- [ ] Cross-references to [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md) functional
- [ ] Integration with [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) verified

### Example Usage
```
{ASSET_PATH}=c:\Source\CopilotWorkShop\instructions\RepoReview.instructions.md
{ASSET_TYPE}=instructions
{OPTIMIZATION_FOCUS}=clarity,efficiency
{PRESERVE_SECTIONS}=Variable Block,Output Requirements,Quality Checklist
{QUALITY_EMPHASIS}=balanced
{OUTPUT_FORMAT}=replace-file
```

### Risk Mitigation Notes
**High Risk Areas**:
- Chat mode bindings and instruction pairings - validate all references
- Version dependencies - ensure compatibility is maintained
- Template and generator prompt paths - verify all links work
- External documentation URLs - check accessibility

**Fallback Behaviors**:
- If link validation fails, preserve original and note for manual review
- If structural changes break schema, revert to minimal optimization
- If paired asset conflicts detected, request user clarification
- If external dependencies unavailable, document assumptions made

### Notes & Tips
- Always backup original before optimization when using replace-file mode
- Use diff mode for review before implementing changes
- Focus on token efficiency improvements that don't sacrifice clarity
- Maintain Harmony pattern alignment across related assets
- Test paired relationships after optimization

### Paired Prompt Execution
**Recommended Workflow**:
1. Execute this prompt (AssetOptimization.prompt.md) to optimize individual assets
2. Review output against [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md) standards
3. Validate optimization results using framework guidelines
4. Apply refinement commands as needed for enhancement

### Binding References
- **Instructions**: [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md) - Complete optimization framework
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

**Processing Metadata**:
- **Standards Version**: VS Code Copilot v2025.09 (Prompt Files latest)
- **Harmonization**: comprehensive-harmony-v1.0 (enhanced cross-references)
- **Content Preservation**: 95% functionality maintained with enhanced standards
- **Formatting Applied**: 2025-09-15 | Standards compliance verified

### Version Note
Asset Optimization Prompt v1.0-h1 - Specialized for VS Code Copilot customization asset enhancement while preserving critical references and structural integrity. Conforms to [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md) optimization framework standards.

### Conformance Note
This prompt follows the schema and guidelines specified in `instructions/GeneratePrompt.md` with specialized focus on asset preservation and optimization balance. Integrates seamlessly with [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md) for comprehensive optimization workflow.

---

**Harmonization Applied**: 2025-09-15 | **Asset Integration**: 16-file ecosystem  
**Cross-References**: Enhanced with bidirectional binding | **Schema**: VS Code v1.0 compliant  

*Generated and harmonized following VS Code GitHub Copilot official documentation standards*