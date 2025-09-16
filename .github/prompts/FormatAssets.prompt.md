mode: ask
## Single Asset Formatter Prompt (v1.0)

Chat Mode Binding: `chatmodes/CopilotCustomizer.chatmode.md`

Paired Instructions: `instructions/FormatAssets.instructions.md`

Task Intent: Format individual Copilot asset file using FormatAssets.instructions.md with mandatory output and complete content preservation.

### Usage Instructions
1. Review `instructions/FormatAssets.instructions.md` for detailed formatting standards.
2. Provide required INPUT_FILE variable and send.
3. Respond to clarifiers or `ready-to-format`; then reply `confirm`.
4. Monitor output generation confirmation and formatting report.
5. Use refinement commands to adjust formatting approach if needed.

### Variable Block
---
Input File (single asset path) [REQUIRED]: "{INPUT_FILE}"
Output Folder (default: .github/output): "{OUTPUT_FOLDER}"
Formatting Level (minimal|standard|comprehensive | default: standard): {FORMATTING_LEVEL}
Content Preservation (strict|balanced|flexible | default: strict): {CONTENT_PRESERVATION}
Standards Source (online|cached|embedded | default: online): {STANDARDS_SOURCE}
Validation Level (basic|standard|strict | default: standard): {VALIDATION_LEVEL}
Backup Creation (true|false | default: true): {BACKUP_CREATION}
Output Naming (formatted-suffix|timestamped|original-name | default: formatted-suffix): {OUTPUT_NAMING}
Report Detail (summary|detailed|verbose | default: detailed): {REPORT_DETAIL}
Force Overwrite (true|false | default: false): {FORCE_OVERWRITE}
---

### Clarification Phase
Before formatting, validate:
- [ ] Input file exists and is readable
- [ ] File type is supported (*.instructions.md, *.chatmode.md, *.prompt.md, *.agent.md)
- [ ] Output folder is writable or can be created
- [ ] No naming conflicts with existing files (unless force overwrite enabled)
- [ ] Latest VS Code Copilot standards are accessible (if online mode)

**Required Clarifications if Missing**:
- INPUT_FILE must be a valid path to supported asset type
- Confirm content preservation level if file contains critical customizations
- Verify output folder location if non-standard workspace structure

### Output Specification
Generate the following mandatory outputs in order:

1. **Standards Retrieval Confirmation**
   - Latest VS Code GitHub Copilot documentation fetched
   - Schema version identification and validation
   - Standards applicability assessment for input file type

2. **Input File Analysis**
   - File type and structure validation
   - Content inventory and preservation baseline
   - Current compliance status assessment
   - Formatting requirements identification

3. **Formatting Application**
   - Standards-compliant format transformation
   - Content preservation validation during processing
   - Cross-reference updates and validation
   - Schema compliance verification

4. **Formatted Output File** (MANDATORY - Must be saved to disk)
   - Standards-compliant version of input asset
   - All original content preserved and enhanced
   - Current schema requirements applied
   - Output saved to specified folder with confirmation

5. **Formatting Report**
   - Processing summary with before/after analysis
   - Content preservation verification (100% requirement)
   - Standards compliance validation results
   - Output file location and access confirmation

6. **Success Validation**
   - "SUCCESS: Asset formatted and saved"
   - Absolute path to formatted output file
   - Content integrity verification confirmation
   - Standards compliance certification

### Formatting Execution Rules
**Content Preservation Levels**:
- **Strict**: Zero information loss, minimal structural changes
- **Balanced**: Preserve all content, optimize structure for standards
- **Flexible**: Enhance content while maintaining core information

**Formatting Levels**:
- **Minimal**: Basic standards compliance, preserve existing structure
- **Standard**: Full standards application with optimal formatting
- **Comprehensive**: Advanced formatting with best practices enhancement

**Mandatory Requirements** (All Levels):
- 100% content preservation (zero information loss)
- Current VS Code Copilot schema compliance
- Valid output file generation with confirmation
- Backup creation before processing (unless disabled)

### Asset Type Specific Rules
**Instructions Files (*.instructions.md)**:
- Front matter validation and enhancement
- Section ordering per canonical schema
- Cross-reference format standardization
- Refinement commands and depth modes validation

**Chat Mode Files (*.chatmode.md)**:
- Description and role clarity enhancement
- Workflow specification formatting
- Tool integration validation
- Depth mode consistency checking

**Prompt Files (*.prompt.md)**:
- Mode specification validation
- Variable block format compliance
- Usage instructions clarity enhancement
- Refinement commands standardization

**Agent Files (*.agent.md)**:
- Agent configuration validation
- Command specification formatting
- Integration guidelines enhancement
- Security and compliance validation

### Refinement Commands
| Command | Scope | Effect |
|---------|-------|--------|
| `refine: preserve` | Content integrity | Maximize preservation, minimize formatting changes |
| `refine: format` | Structure and presentation | Optimize formatting while maintaining compliance |
| `refine: output` | File generation | Focus on output reliability and validation |
| `refine: validate` | Quality assurance | Enhance standards compliance and error detection |

### Internal Quality Checklist
**Pre-Processing**:
- [ ] INPUT_FILE path validated and file accessible
- [ ] File type supported and parseable
- [ ] Latest standards retrieved and validated
- [ ] Output folder permissions confirmed

**During Processing**:
- [ ] Content preservation monitored continuously
- [ ] Standards applied without information loss
- [ ] Cross-references maintained and updated
- [ ] Schema compliance validated incrementally

**Post-Processing**:
- [ ] Formatted file successfully written to OUTPUT_FOLDER
- [ ] Content integrity verified through comparison
- [ ] Standards compliance validated against current schema
- [ ] All cross-references resolve correctly
- [ ] Success confirmation generated with file path

**Critical Failure Points**:
- File write operation failure → ABORT with specific error
- Content loss detection → ABORT with preservation report
- Standards compliance failure → ABORT with validation details
- Cross-reference breakage → ABORT with link analysis

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

Expected outcome: `project-setup-formatted.instructions.md` saved to `.github/output/` with current VS Code Copilot standards applied, 100% content preservation, and detailed formatting report.

### Notes / Tips
- **File Path Format**: Use relative paths from workspace root or absolute paths
- **Output Structure**: Formatted files maintain original base name with suffix
- **Standards Currency**: Online mode ensures latest documentation standards
- **Backup Safety**: Pre-processing backups enable rollback if needed
- **Validation Rigor**: Strict validation prevents compliance issues

### Risk Mitigation Notes
**High-Risk Scenarios**:
- **Online Documentation Unavailable**: Fallback to cached or embedded standards with version warning
- **File System Access Issues**: Pre-validate permissions and provide specific error guidance
- **Content Corruption During Processing**: Multi-checkpoint validation with rollback capability
- **Standards Misapplication**: Schema validation at each transformation step

**Fallback Behaviors**:
- Standards fetch failure → Use cached version with timestamp warning
- Write permission issues → Suggest alternative output locations
- Content preservation failure → Abort with detailed preservation report
- Validation failures → Provide specific compliance correction guidance

### Version Note
*Generated by Single Asset Formatter v1.0 | Following FormatAssets.instructions.md | 2025-09-15*

### Conformance Note
This prompt file aligns with `instructions/GeneratePrompt.instructions.md` schema and executes the single-file formatting workflow defined in `instructions/FormatAssets.instructions.md`. Integrates with `chatmodes/CopilotCustomizer.chatmode.md` for seamless Copilot asset maintenance and standards compliance.

**Binding References**:
- **Formatting Guide**: `instructions/FormatAssets.instructions.md`
- **Primary Chat Mode**: `chatmodes/CopilotCustomizer.chatmode.md`
- **Generation Framework**: `instructions/GeneratePrompt.instructions.md`