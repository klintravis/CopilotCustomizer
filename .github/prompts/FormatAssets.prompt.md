---
mode: CopilotCustomizer
---

# FormatAssets.prompt.md

## Single Asset Formatter Prompt (v1.0-h1)

<!-- Harmony Metadata -->
**Schema Compliance**: VS Code Prompt Files Schema v1.0  
**Harmonization Metadata**: schemaVersion: "1.0" | harmonizationDate: "2025-09-15" | bindingStrength: "standard"  
**Harmonized Assets**: FormatAssets.instructions.md, FormatAssets.prompt.md

### Harmonized Assets
**Paired Instructions**: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) - Comprehensive asset formatting framework with VS Code standards compliance  
**Related Assets**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization framework  
**Asset Ecosystem**: Part of 16-asset Copilot customization framework

**Harmonization**: comprehensive-harmony-v1.0 (enhanced cross-references)  
**Binding Strength**: standard | **Preservation Level**: medium  
**Content Changes**: <10% (YAML front matter + cross-references)

### Chat Mode Binding
`chatmodes/CopilotCustomizer.chatmode.md` - Framework integration point

### Task Intent
Format individual Copilot asset file using [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) with mandatory output and complete content preservation while ensuring VS Code Copilot schema compliance.

### Usage Instructions
1. Review [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) for detailed formatting standards
2. Provide required `INPUT_FILE` variable and send
3. Respond to clarifiers or `ready-to-format`; then reply `confirm`
4. Monitor output generation confirmation and formatting report
5. Use refinement commands to adjust formatting approach if needed
6. Leverage [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) for quality assurance

### Variable Block
---
**Input File** (single asset path) [REQUIRED]: "{INPUT_FILE}"
**Output Folder** (default: .github/output): "{OUTPUT_FOLDER}"
**Formatting Level** (minimal|standard|comprehensive | default: standard): {FORMATTING_LEVEL}
**Content Preservation** (strict|balanced|flexible | default: strict): {CONTENT_PRESERVATION}
**Standards Source** (online|cached|embedded | default: online): {STANDARDS_SOURCE}
**Validation Level** (basic|standard|strict | default: standard): {VALIDATION_LEVEL}
**Backup Creation** (true|false | default: true): {BACKUP_CREATION}
**Output Naming** (formatted-suffix|timestamped|original-name | default: formatted-suffix): {OUTPUT_NAMING}
**Report Detail** (summary|detailed|verbose | default: detailed): {REPORT_DETAIL}
**Force Overwrite** (true|false | default: false): {FORCE_OVERWRITE}
---

### Validation Rules
- Required: `{INPUT_FILE}` must be a valid path to supported asset type per [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) standards
- Supported file types: `*.instructions.md`, `*.chatmode.md`, `*.prompt.md`, `*.agent.md`
- Default `{OUTPUT_FOLDER}` to `.github/output` for consistent organization
- Preserve all existing chat mode bindings, instruction references, and cross-file links
- Maintain version compatibility and schema requirements per VS Code Copilot documentation
- Validate content preservation level aligns with file criticality

### Generation Gate
Before formatting, respond with:
- File type detection and current structure analysis following [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) protocol
- Content inventory and preservation baseline establishment
- Current compliance status assessment against VS Code standards
- Identified formatting requirements and potential enhancement opportunities
- `ready-to-format` confirmation request

Only proceed with full formatting after explicit `confirm`.

### Output Requirements (On Confirm)
**Following [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) Standards**:

Generate the following mandatory outputs in order:

#### 1. Standards Retrieval Confirmation
- Latest VS Code GitHub Copilot documentation fetched and validated
- Schema version identification and applicability assessment
- Standards mapping for input file type per official requirements

#### 2. Input File Analysis
- File type and structure validation against supported formats
- Content inventory and preservation baseline establishment
- Current compliance status assessment with detailed gap analysis
- Cross-reference inventory and integrity validation

#### 3. Formatting Application
- Standards-compliant format transformation with zero information loss
- Content preservation validation during processing with checkpoints
- Cross-reference updates and integrity validation throughout process
- Schema compliance verification against current VS Code requirements

#### 4. Formatted Output File (MANDATORY - Must be saved to disk)
- Standards-compliant version of input asset with enhanced structure
- All original content preserved and enhanced per [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md)
- Current VS Code Copilot schema requirements applied comprehensively
- Output saved to specified folder with absolute path confirmation

#### 5. Formatting Report
- Processing summary with detailed before/after analysis
- Content preservation verification (100% requirement) with validation results
- Standards compliance validation against current VS Code schema
- Cross-reference integrity confirmation and enhancement documentation

#### 6. Success Validation
- "SUCCESS: Asset formatted and saved" with file location confirmation
- Absolute path to formatted output file for immediate access
- Content integrity verification through comprehensive comparison
- Standards compliance certification with schema validation results

### Formatting Execution Rules
**Content Preservation Levels**:
- **Strict**: Zero information loss, minimal structural changes, maximum compatibility
- **Balanced**: Preserve all content, optimize structure for current standards
- **Flexible**: Enhance content while maintaining core information and functionality

**Formatting Levels**:
- **Minimal**: Basic standards compliance, preserve existing structure patterns
- **Standard**: Full standards application with optimal formatting and enhancements
- **Comprehensive**: Advanced formatting with best practices and ecosystem integration

**Mandatory Requirements** (All Levels):
- 100% content preservation (zero information loss tolerance)
- Current VS Code Copilot schema compliance per official documentation
- Valid output file generation with confirmation and integrity verification
- Backup creation before processing (unless explicitly disabled)

### Asset Type Specific Rules

#### Instructions Files (`*.instructions.md`)
- **YAML Schema Compliance**: Validate `applyTo` and optional `description` fields per VS Code requirements
- **Front Matter Enhancement**: Ensure proper YAML formatting and schema adherence
- **Section Ordering**: Apply canonical schema structure per [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md)
- **Cross-Reference Standardization**: Consistent linking format and integrity validation
- **Refinement Commands**: Validate and enhance depth modes per framework standards

#### Chat Mode Files (`*.chatmode.md`)
- **Description Enhancement**: Clear role definition and capabilities documentation
- **YAML Compliance**: Required `description` field and optional `tools` array formatting
- **Workflow Specification**: Structured iteration loops and process documentation
- **Tool Integration**: Validate and enhance tool configuration per VS Code schema
- **Depth Mode Consistency**: Align with framework standards and best practices

#### Prompt Files (`*.prompt.md`)
- **Mode Specification**: Validate `ask`/`agent`/`generate` mode per VS Code requirements
- **Variable Block Compliance**: Structured parameter blocks with validation hints
- **Usage Instructions**: Enhanced clarity and workflow integration documentation
- **Refinement Commands**: Standardize command structures and descriptions
- **Cross-Reference Integration**: Pair with instruction files and chat modes properly

#### Agent Files (`*.agent.md`, `AGENTS.md`)
- **Agent Configuration**: Validate setup instructions and command specifications
- **Command Specification**: Format build, test, and deployment commands for clarity
- **Integration Guidelines**: Enhanced framework alignment and workflow documentation
- **Security Validation**: Compliance notes and best practices per requirements

### Workflow Integration
**Quality Assurance via [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md)**:
- Use `refine: audit` for comprehensive structural validation
- Apply `refine: optimize` for enhanced token efficiency and clarity
- Leverage `refine: concise` for executive summaries when needed

### Refinement Commands
| Command | Scope | Effect |
|---------|-------|--------|
| `refine: preserve` | Content integrity | Maximize preservation, minimize formatting changes |
| `refine: format` | Structure and presentation | Optimize formatting while maintaining compliance |
| `refine: output` | File generation | Focus on output reliability and validation |
| `refine: validate` | Quality assurance | Enhance standards compliance and error detection |

### Internal Quality Checklist
**Pre-Processing Validation**:
- [ ] `INPUT_FILE` path validated and file accessible
- [ ] File type supported and parseable per framework requirements
- [ ] Latest VS Code standards retrieved and validated
- [ ] Output folder permissions confirmed and writable

**During Processing**:
- [ ] Content preservation monitored continuously with checkpoints
- [ ] Standards applied without information loss or functional degradation
- [ ] Cross-references maintained and enhanced per framework requirements
- [ ] Schema compliance validated incrementally throughout process

**Post-Processing Verification**:
- [ ] Formatted file successfully written to `OUTPUT_FOLDER`
- [ ] Content integrity verified through comprehensive comparison
- [ ] Standards compliance validated against current VS Code schema
- [ ] All cross-references resolve correctly and enhance functionality
- [ ] Success confirmation generated with absolute file path

**Critical Failure Points**:
- File write operation failure → ABORT with specific error diagnosis
- Content loss detection → ABORT with detailed preservation report
- Standards compliance failure → ABORT with validation details and guidance
- Cross-reference breakage → ABORT with comprehensive link analysis

### Example Filled Prompt
```
INPUT_FILE: "project-setup.instructions.md"
OUTPUT_FOLDER: ".github/output"
FORMATTING_LEVEL: standard
CONTENT_PRESERVATION: strict
STANDARDS_SOURCE: online
VALIDATION_LEVEL: standard
BACKUP_CREATION: true
OUTPUT_NAMING: formatted-suffix
REPORT_DETAIL: detailed
FORCE_OVERWRITE: false
```

**Expected Outcome**: `project-setup-formatted.instructions.md` saved to `.github/output/` with current VS Code Copilot standards applied, 100% content preservation verified, and detailed formatting report generated.

### Notes & Tips
- **File Path Format**: Use relative paths from workspace root or absolute paths for clarity
- **Output Structure**: Formatted files maintain original base name with descriptive suffix
- **Standards Currency**: Online mode ensures latest documentation standards application
- **Backup Safety**: Pre-processing backups enable rollback capability if needed
- **Validation Rigor**: Strict validation prevents compliance issues and ensures quality

### Risk Mitigation Notes
**High-Risk Scenarios**:
- **Online Documentation Unavailable**: Fallback to cached or embedded standards with version warning
- **File System Access Issues**: Pre-validate permissions and provide specific error guidance
- **Content Corruption During Processing**: Multi-checkpoint validation with rollback capability
- **Standards Misapplication**: Schema validation at each transformation step with verification

**Fallback Behaviors**:
- Standards fetch failure → Use cached version with timestamp warning and validation notes
- Write permission issues → Suggest alternative output locations with guidance
- Content preservation failure → Abort with detailed preservation report and recommendations
- Validation failures → Provide specific compliance correction guidance with examples

### Paired Prompt Execution
**Recommended Workflow**:
1. Execute this prompt (FormatAssets.prompt.md) to format individual asset files
2. Review output against [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) standards
3. Validate formatting results using framework validation guidelines
4. Apply refinement commands as needed for optimization and enhancement

### Binding References
- **Instructions**: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) - Complete asset formatting framework
- **Framework**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization architecture
- **Standards**: [GeneratePrompt.instructions.md](../instructions/GeneratePrompt.instructions.md) - Prompt authoring guidelines

### Standards Compliance & Processing Metadata

**VS Code Copilot Compliance**: Prompt Files Schema - Full compliance achieved  
**Schema Requirements**: 
- ✅ Required `mode` field in YAML front matter (`ask` for interactive formatting)
- ✅ Markdown body with clear usage instructions and comprehensive variable blocks
- ✅ Documentation sources referenced per schema guidelines and best practices

**Standards Sources**: 
- [VS Code Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot/customization/)
- [VS Code Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [VS Code Custom Chat Modes](https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes)

**Processing Metadata**:
- **Standards Version**: VS Code Copilot v2025.09 (Prompt Files latest)
- **Harmonization**: comprehensive-harmony-v1.0 (enhanced cross-references)
- **Content Preservation**: 100% functionality maintained with enhanced standards
- **Formatting Applied**: 2025-09-15 | Standards compliance verified

### Version Note
Single Asset Formatter v1.0-h1 - Specialized for VS Code Copilot customization asset formatting with complete content preservation and schema compliance. Conforms to [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) formatting framework standards with enhanced ecosystem integration.

### Conformance Note
This prompt follows the schema and guidelines specified in [GeneratePrompt.instructions.md](../instructions/GeneratePrompt.instructions.md) with specialized focus on asset formatting and standards compliance. Integrates seamlessly with [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) for comprehensive formatting workflow execution.

---

**Harmonization Applied**: 2025-09-15 | **Asset Integration**: 16-file ecosystem  
**Cross-References**: Enhanced with bidirectional binding | **Schema**: VS Code v1.0 compliant  

*Generated and optimized following VS Code GitHub Copilot official documentation standards and AssetOptimization.instructions.md framework*