mode: ask
## Asset Harmonization Executor Prompt (v1.0)

Chat Mode Binding: `chatmodes/CopilotCustomizer.chatmode.md`

Paired Instructions: `instructions/HarmonizeAssets.instructions.md`

Task Intent: Execute harmonization of 2-3 Copilot customization files following HarmonizeAssets.instructions.md with guaranteed file output and minimal content changes.

### Usage Instructions
1. Review `instructions/HarmonizeAssets.instructions.md` for detailed harmonization rules.
2. Provide required variables (INPUT_FILES minimum) and send.
3. Respond to clarifiers or `ready-to-harmonize`; then reply `confirm`.
4. Monitor file output confirmation and harmonization report.
5. Use refinement commands to adjust preservation or binding levels.

### Variable Block
---
Input Files (2-3 file paths, comma-separated) [REQUIRED]: "{INPUT_FILES}"
Output Directory (default: .github/output): "{OUTPUT_DIRECTORY}"
Preservation Level (minimal|medium|maximum | default: medium): {PRESERVATION_LEVEL}
Binding Strength (light|standard|deep | default: standard): {BINDING_STRENGTH}
Output Naming (harmonized-suffix|overwrite-original|timestamped | default: harmonized-suffix): {OUTPUT_NAMING}
Cross-Reference Style (inline|section|front-matter | default: inline): {CROSS_REF_STYLE}
Validation Level (basic|standard|strict | default: standard): {VALIDATION_LEVEL}
Backup Creation (true|false | default: true): {BACKUP_CREATION}
Report Detail (summary|detailed|verbose | default: detailed): {REPORT_DETAIL}
Force Overwrite (true|false | default: false): {FORCE_OVERWRITE}
---

### Clarification Phase
Before harmonization, validate:
- [ ] All specified files exist and are readable
- [ ] Output directory is writable or can be created
- [ ] File types are supported (*.instructions.md, *.prompt.md, *.chatmode.md)
- [ ] No naming conflicts with existing harmonized files (unless force overwrite enabled)
- [ ] Preservation level aligns with user expectations for content changes

**Required Clarifications if Missing**:
- INPUT_FILES must contain 2-3 valid file paths
- Confirm output location if non-standard workspace structure
- Verify preservation level matches change tolerance

### Output Specification
Generate the following mandatory outputs in order:

1. **File Analysis Report**
   - Input file inventory with metadata
   - Content structure analysis
   - Existing cross-reference detection
   - Harmonization opportunity identification

2. **Harmonization Plan**
   - Cross-reference injection points
   - Binding metadata additions
   - Estimated content change percentage
   - Processing sequence and dependencies

3. **Harmonized Files** (MANDATORY - Must be saved to disk)
   - All input files in harmonized versions
   - Cross-references established between files
   - Harmony metadata in front matter
   - Preserved original functionality

4. **Change Summary Report**
   - Before/after diff highlights
   - Cross-references added count and locations
   - Content preservation validation
   - File output confirmation with absolute paths

5. **Success Confirmation**
   - "SUCCESS: All files harmonized and saved"
   - Absolute file paths to harmonized outputs
   - Harmonization audit trail
   - Validation status for all requirements

### Harmonization Execution Rules
**Preservation Levels**:
- **Minimal**: Only essential cross-references, <5% content change
- **Medium**: Standard binding + metadata, <10% content change  
- **Maximum**: Comprehensive integration, <15% content change

**Binding Strengths**:
- **Light**: Front matter references only
- **Standard**: Front matter + strategic inline references
- **Deep**: Comprehensive cross-linking with workflow integration

**Mandatory Requirements** (All Levels):
- 100% file output success rate
- Original intent preservation validation
- Cross-reference resolution verification
- Backup creation (unless disabled)

### Refinement Commands
| Command | Scope | Effect |
|---------|-------|--------|
| `refine: preserve` | Content changes | Minimize modifications, maximize original retention |
| `refine: bind` | Cross-references | Strengthen inter-file connections and workflow integration |
| `refine: output` | File generation | Focus on output reliability, validation, and error handling |
| `refine: minimal` | Change impact | Reduce modification footprint to absolute minimum |

### Internal Quality Checklist
**Pre-Harmonization**:
- [ ] All INPUT_FILES validated and accessible
- [ ] Output directory permissions confirmed
- [ ] File type compatibility verified
- [ ] Existing content parsed successfully

**During Harmonization**:
- [ ] Original content preserved per preservation level
- [ ] Cross-references injected at optimal points
- [ ] Front matter harmony metadata added
- [ ] Version tracking updated appropriately

**Post-Harmonization**:
- [ ] All files successfully written to OUTPUT_DIRECTORY
- [ ] Cross-references resolve correctly
- [ ] Content change percentage within limits
- [ ] Validation tests pass for all requirements
- [ ] Success report generated with file paths

**Failure Conditions** (Abort if encountered):
- Any file write operation fails
- Content change exceeds preservation level limits
- Cross-references fail validation
- Original intent validation fails

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

Expected outcome: Three harmonized files saved to `.github/output/` with cross-references, <10% content changes, and detailed harmonization report.

### Notes / Tips
- **File Path Format**: Use relative paths from workspace root or absolute paths
- **Output Structure**: Harmonized files maintain original names with suffix (unless overwrite mode)
- **Cross-Reference Resolution**: All links validated before final file output
- **Error Recovery**: Transaction-like behavior - all files succeed or operation aborts
- **Backup Location**: `.github/backup/harmonization-YYYY-MM-DD-HHMMSS/`

### Risk Mitigation Notes
**High-Risk Scenarios**:
- **File System Failures**: Pre-validate write permissions, use atomic file operations
- **Content Corruption**: Maintain in-memory backups, validate through diff analysis
- **Cross-Reference Breakage**: Validate all links before committing changes
- **Intent Loss**: Content analysis before and after harmonization

**Fallback Behaviors**:
- If file write fails: Restore from backup and report specific error
- If validation fails: Provide detailed failure analysis and suggested corrections
- If cross-references break: Offer manual link correction options
- If change percentage exceeds limits: Reduce binding strength automatically

### Version Note
*Generated by Asset Harmonization Executor v1.0 | Following HarmonizeAssets.instructions.md | 2025-09-15*

### Conformance Note
This prompt file aligns with `instructions/GeneratePrompt.instructions.md` schema and executes the harmonization workflow defined in `instructions/HarmonizeAssets.instructions.md`. Integrates with `chatmodes/CopilotCustomizer.chatmode.md` for seamless Copilot customization asset management.

**Binding References**:
- **Execution Guide**: `instructions/HarmonizeAssets.instructions.md`
- **Primary Chat Mode**: `chatmodes/CopilotCustomizer.chatmode.md`
- **Generation Framework**: `instructions/GeneratePrompt.instructions.md`