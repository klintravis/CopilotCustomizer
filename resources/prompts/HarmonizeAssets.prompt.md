---
mode: CopilotCustomizer
---

# HarmonizeAssets.prompt.md

## Asset Harmonization Executor Prompt (v1.0-h1)

<!-- Harmony Metadata -->
**Schema Compliance**: VS Code Prompt Files Schema v1.0  
**Harmonization Metadata**: schemaVersion: "1.0" | harmonizationDate: "2025-09-15" | bindingStrength: "standard"  
**Harmonized Assets**: HarmonizeAssets.instructions.md, HarmonizeAssets.prompt.md

### Harmonized Assets
**Paired Instructions**: [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md) - Comprehensive asset harmonization framework with minimal invasive cross-binding  
**Related Assets**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization framework  
**Asset Ecosystem**: Part of 16-asset Copilot customization framework

**Harmonization**: comprehensive-harmony-v1.0 (enhanced cross-references)  
**Binding Strength**: standard | **Preservation Level**: medium  
**Content Changes**: <10% (YAML front matter + cross-references)

### Chat Mode Binding
`chatmodes/CopilotCustomizer.chatmode.md` - Framework integration point

### Task Intent
Execute harmonization of 2-3 Copilot customization files following [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md) with guaranteed file output and minimal content changes while establishing cross-references and unified functionality.

### Usage Instructions
1. Review [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md) for detailed harmonization rules and framework
2. Provide required variables (INPUT_FILES minimum) and send
3. Respond to clarifiers or `ready-to-harmonize`; then reply `confirm`
4. Monitor file output confirmation and harmonization report
5. Use refinement commands to adjust preservation or binding levels
6. Leverage [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) for quality assurance

### Variable Block
---
**Input Files** (2-3 file paths, comma-separated) [REQUIRED]: "{INPUT_FILES}"
**Output Directory** (default: .github/output): "{OUTPUT_DIRECTORY}"
**Preservation Level** (minimal|medium|maximum | default: medium): {PRESERVATION_LEVEL}
**Binding Strength** (light|standard|deep | default: standard): {BINDING_STRENGTH}
**Output Naming** (harmonized-suffix|overwrite-original|timestamped | default: harmonized-suffix): {OUTPUT_NAMING}
**Cross-Reference Style** (inline|section|front-matter | default: inline): {CROSS_REF_STYLE}
**Validation Level** (basic|standard|strict | default: standard): {VALIDATION_LEVEL}
**Backup Creation** (true|false | default: true): {BACKUP_CREATION}
**Report Detail** (summary|detailed|verbose | default: detailed): {REPORT_DETAIL}
**Force Overwrite** (true|false | default: false): {FORCE_OVERWRITE}
---

### Validation Rules
- Required: `{INPUT_FILES}` must contain 2-3 valid file paths per [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md) standards
- Supported file types: `*.instructions.md`, `*.prompt.md`, `*.chatmode.md`
- Default `{OUTPUT_DIRECTORY}` to `.github/output` for consistent organization
- Preserve all existing chat mode bindings, instruction references, and cross-file links
- Maintain version compatibility and schema requirements per VS Code Copilot documentation
- Validate preservation level aligns with user expectations for content changes

### Generation Gate
Before harmonization, respond with:
- File analysis and harmonization opportunity identification following [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md) protocol
- Cross-reference injection points and binding metadata requirements
- Estimated content change percentage and processing sequence
- Identified links/references that must be preserved during harmonization
- `ready-to-harmonize` confirmation request

Only proceed with full harmonization after explicit `confirm`.

### Output Requirements (On Confirm)
**Following [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md) Standards**:

Generate the following mandatory outputs in order:

#### 1. File Analysis Report
- Input file inventory with metadata and structure analysis
- Content structure analysis and existing cross-reference detection
- Harmonization opportunity identification and binding point assessment
- Repository context analysis and framework alignment requirements

#### 2. Harmonization Plan
- Cross-reference injection points with minimal invasive approach
- Binding metadata additions per preservation level requirements
- Estimated content change percentage within framework limits
- Processing sequence and dependencies with risk assessment

#### 3. Harmonized Files (MANDATORY - Must be saved to disk)
- All input files in harmonized versions with preserved functionality
- Cross-references established between files per [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md)
- Harmony metadata in front matter following framework patterns
- Preserved original functionality with enhanced ecosystem integration

#### 4. Change Summary Report
- Before/after diff highlights with content preservation validation
- Cross-references added count and locations with integrity verification
- Content preservation validation against framework requirements
- File output confirmation with absolute paths and success validation

#### 5. Success Confirmation
- "SUCCESS: All files harmonized and saved" with location details
- Absolute file paths to harmonized outputs for immediate access
- Harmonization audit trail with change tracking and validation
- Validation status for all requirements per framework standards

### Harmonization Execution Rules
**Content Preservation Levels**:
- **Minimal**: Only essential cross-references, <5% content change, maximum compatibility
- **Medium**: Standard binding + metadata, <10% content change, balanced enhancement
- **Maximum**: Comprehensive integration, <15% content change, full ecosystem alignment

**Binding Strengths**:
- **Light**: Front matter references only with minimal structure changes
- **Standard**: Front matter + strategic inline references with workflow integration
- **Deep**: Comprehensive cross-linking with workflow integration and ecosystem alignment

**Mandatory Requirements** (All Levels):
- 100% file output success rate (zero tolerance for failures)
- Original intent preservation validation through comprehensive analysis
- Cross-reference resolution verification with integrity testing
- Backup creation before processing (unless explicitly disabled)

### Asset Type Specific Rules

#### Instructions Files (`*.instructions.md`)
- **Cross-Reference Integration**: Maintain paired prompt references and generator paths
- **Version Preservation**: Preserve version numbers and schema compatibility markers
- **Framework Alignment**: Establish connections with related instruction files
- **Enforcement Rules**: Maintain all compliance requirements and validation rules

#### Chat Mode Files (`*.chatmode.md`)
- **Description Enhancement**: Preserve role definitions and capabilities documentation
- **Workflow Integration**: Maintain refinement commands and depth mode specifications
- **Tool Configuration**: Preserve tool arrays and model specifications
- **Cross-Mode Binding**: Establish connections with related chat modes and instructions

#### Prompt Files (`*.prompt.md`)
- **Mode Preservation**: Maintain ask/agent/generate mode specifications
- **Variable Block Integrity**: Preserve all variable definitions and validation rules
- **Usage Instructions**: Maintain workflow steps and confirmation gates
- **Chat Mode Binding**: Preserve and enhance chat mode integration patterns

### Workflow Integration
**Quality Assurance via [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md)**:
- Use `refine: audit` for comprehensive structural validation
- Apply `refine: optimize` for enhanced token efficiency and clarity
- Leverage `refine: concise` for executive summaries when needed

### Refinement Commands
| Command | Scope | Effect |
|---------|-------|--------|
| `refine: preserve` | Content changes | Minimize modifications, maximize original retention |
| `refine: bind` | Cross-references | Strengthen inter-file connections and workflow integration |
| `refine: output` | File generation | Focus on output reliability, validation, and error handling |
| `refine: minimal` | Change impact | Reduce modification footprint to absolute minimum |

### Internal Quality Checklist
**Pre-Harmonization Validation**:
- [ ] All `INPUT_FILES` validated and accessible per framework requirements
- [ ] Output directory permissions confirmed and writable
- [ ] File type compatibility verified against supported formats
- [ ] Existing content parsed successfully with structure analysis

**During Harmonization**:
- [ ] Original content preserved per preservation level requirements
- [ ] Cross-references injected at optimal points with minimal disruption
- [ ] Front matter harmony metadata added following framework patterns
- [ ] Version tracking updated appropriately with audit trail

**Post-Harmonization Verification**:
- [ ] All files successfully written to `OUTPUT_DIRECTORY`
- [ ] Cross-references resolve correctly with integrity verification
- [ ] Content change percentage within preservation level limits
- [ ] Validation tests pass for all framework requirements
- [ ] Success report generated with absolute file paths

**Critical Failure Points**:
- Any file write operation fails → ABORT with specific error diagnosis
- Content change exceeds preservation level limits → ABORT with analysis
- Cross-references fail validation → ABORT with detailed link report
- Original intent validation fails → ABORT with preservation assessment

### Example Filled Prompt
```
INPUT_FILES: "project.instructions.md, workflow.prompt.md, reviewer.chatmode.md"
OUTPUT_DIRECTORY: ".github/output"
PRESERVATION_LEVEL: medium
BINDING_STRENGTH: standard
OUTPUT_NAMING: harmonized-suffix
CROSS_REF_STYLE: inline
VALIDATION_LEVEL: standard
BACKUP_CREATION: true
REPORT_DETAIL: detailed
FORCE_OVERWRITE: false
```

**Expected Outcome**: Three harmonized files saved to `.github/output/` with cross-references, <10% content changes, comprehensive harmonization report, and validated ecosystem integration.

### Notes & Tips
- **File Path Format**: Use relative paths from workspace root or absolute paths for clarity
- **Output Structure**: Harmonized files maintain original names with descriptive suffix
- **Cross-Reference Resolution**: All links validated before final file output with integrity checking
- **Error Recovery**: Transaction-like behavior - all files succeed or operation aborts
- **Backup Location**: `.github/backup/harmonization-YYYY-MM-DD-HHMMSS/` for rollback capability

### Risk Mitigation Notes
**High-Risk Scenarios**:
- **File System Failures**: Pre-validate write permissions, use atomic file operations with rollback
- **Content Corruption**: Maintain in-memory backups, validate through comprehensive diff analysis
- **Cross-Reference Breakage**: Validate all links before committing changes with integrity testing
- **Intent Loss**: Content analysis before and after harmonization with preservation metrics

**Fallback Behaviors**:
- File write failure → Restore from backup and report specific error with guidance
- Validation failure → Provide detailed failure analysis and suggested corrections
- Cross-reference breakage → Offer manual link correction options with validation
- Change percentage exceeds limits → Reduce binding strength automatically with notification

### Paired Prompt Execution
**Recommended Workflow**:
1. Execute this prompt (HarmonizeAssets.prompt.md) to harmonize multiple asset files
2. Review output against [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md) standards
3. Validate harmonization results using framework validation guidelines
4. Apply refinement commands as needed for optimization and enhancement

### Binding References
- **Instructions**: [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md) - Complete harmonization framework
- **Framework**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization architecture
- **Standards**: [GeneratePrompt.instructions.md](../instructions/GeneratePrompt.instructions.md) - Prompt authoring guidelines
- **Formatting**: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) - Asset formatting compliance

### Standards Compliance & Processing Metadata

**VS Code Copilot Compliance**: Prompt Files Schema - Full compliance achieved  
**Schema Requirements**: 
- ✅ Required `mode` field in YAML front matter (`ask` for interactive harmonization)
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
Asset Harmonization Executor v1.0-h1 - Specialized for VS Code Copilot customization asset harmonization with minimal invasive cross-binding and complete content preservation. Conforms to [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md) harmonization framework standards with enhanced ecosystem integration.

### Conformance Note
This prompt follows the schema and guidelines specified in [GeneratePrompt.instructions.md](../instructions/GeneratePrompt.instructions.md) with specialized focus on asset harmonization and cross-reference binding. Integrates seamlessly with [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md) for comprehensive harmonization workflow execution.

---

**Harmonization Applied**: 2025-09-15 | **Asset Integration**: 16-file ecosystem  
**Cross-References**: Enhanced with bidirectional binding | **Schema**: VS Code v1.0 compliant  

*Generated and optimized following VS Code GitHub Copilot official documentation standards and AssetOptimization.instructions.md framework*