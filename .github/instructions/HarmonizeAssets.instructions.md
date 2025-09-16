---
applyTo: '**/*.{instructions.md,prompt.md,chatmode.md}'
description: 'Harmonizes 2-3 GitHub Copilot customization files with minimal changes while establishing cross-references and unified functionality for VS Code Copilot ecosystem'
---

## Copilot Asset Harmonization Instructions (v1.0)

<!-- Formatting Metadata -->
**Schema Compliance**: VS Code Custom Instructions Schema v1.0  
**Original Metadata**: schemaVersion: '1.0' | depthModes: ['quick-preserve','standard','deep-binding'] | refinementCommands: ['refine: preserve','refine: bind','refine: output','refine: minimal']

### Context Overview
Harmonizes 2-3 GitHub Copilot customization files (*.instructions.md, *.prompt.md, *.chatmode.md) with minimal changes while establishing cross-references and unified functionality. Preserves original intent and ensures seamless inter-file binding for VS Code Copilot ecosystem.

### Primary Objective
Transform isolated Copilot customization artifacts into a cohesive, cross-referenced system that maintains original functionality while adding binding mechanisms and forced output generation.

### Tech Stack & Constraints
- **Core Technologies**: VS Code Copilot API, Markdown, YAML front matter
- **File Types**: `*.instructions.md`, `*.prompt.md`, `*.chatmode.md`
- **Hard Constraints**: 
  - No intent loss (preserve original behavior)
  - Minimal structural changes (<10% content modification)
  - Mandatory file output for all processed artifacts
  - Cross-reference establishment required
- **Performance**: Process 2-3 files in single operation, <30 seconds execution time

### Architecture / Design Conventions
**Harmonization Pattern**: Minimal Invasive Cross-Binding
1. **Preserve-First**: Maintain existing structure and content
2. **Inject-Bind**: Add cross-references without disrupting flow
3. **Force-Output**: Generate harmonized versions with guaranteed file saving
4. **Version-Track**: Maintain harmonization audit trail

**Cross-Reference Schema**:
~~~yaml
# In front matter or binding section
harmonizedWith: ['file1.md', 'file2.md']
bindingVersion: 'harmony-v1.0'
lastHarmonized: 'YYYY-MM-DD'
~~~

### Coding Standards
- **Front Matter**: Preserve existing, append harmony metadata
- **Section Ordering**: Maintain original section sequence
- **Cross-References**: Use consistent linking format: `[filename](path/to/file.md)`
- **Binding Comments**: Use `<!-- Harmony: ... -->` for injected content
- **Version Tags**: Append harmony suffix to existing versions (e.g., v1.0 → v1.0-h1)

### Security & Compliance
- **File Integrity**: Validate content preservation through diff analysis
- **Access Control**: Respect existing file permissions and workspace boundaries  
- **Change Tracking**: Log all modifications with before/after snapshots
- **Rollback Capability**: Maintain backup copies during harmonization process

### Performance Expectations
- **Processing Time**: <30 seconds for 3-file harmonization
- **Memory Usage**: <50MB working set during processing
- **File Size Impact**: <15% increase per file due to cross-reference additions
- **Success Rate**: 100% file output generation (mandatory requirement)

### Testing Strategy
**Pre-Harmonization Validation**:
- [ ] File readability and parse success
- [ ] Front matter YAML validity
- [ ] Existing cross-references inventory

**Post-Harmonization Verification**:
- [ ] All files successfully written to disk
- [ ] Cross-references resolve correctly
- [ ] Original functionality preserved (diff analysis)
- [ ] Binding metadata present and valid

**Test Coverage Targets**:
- 100% file output success
- 95% content preservation (allowing 5% for harmony additions)
- 100% cross-reference resolution

### Tooling & Automation
**Required Tools**:
- File I/O operations with atomic writes
- YAML front matter parser/writer
- Markdown AST manipulation
- Diff generation and analysis
- Path resolution and validation

**Automation Workflow**:
1. **Intake**: Read and parse 2-3 input files
2. **Analysis**: Extract metadata, identify binding points
3. **Planning**: Generate cross-reference map and injection points
4. **Harmonization**: Apply minimal changes with binding additions  
5. **Output**: Force-write all harmonized files with validation
6. **Standards Compliance**: Apply `FormatAssets.instructions.md` formatting to ensure VS Code schema compliance
7. **Audit**: Generate change summary and success confirmation

### Documentation Requirements
**Mandatory Outputs**:
- Harmonized versions of all input files (saved to disk)
- Change log with before/after diffs
- Cross-reference validation report
- Success confirmation with file paths

**Documentation Format**:
~~~markdown
## Harmonization Report
**Date**: YYYY-MM-DD HH:MM:SS
**Files Processed**: [list]
**Changes Applied**: [minimal diff summary]
**Cross-References Added**: [count and locations]
**Output Status**: SUCCESS - All files saved
**File Locations**: [absolute paths to harmonized files]
~~~

### Review & Acceptance Criteria
**Definition of Done**:
- [ ] All input files processed without errors
- [ ] Harmonized versions saved to designated output location
- [ ] Cross-references established and validated
- [ ] Original intent preserved (validated through content analysis)
- [ ] Binding metadata added to all files
- [ ] **Standards compliance applied**: `FormatAssets.instructions.md` formatting enforced on all output files
- [ ] **YAML schema validation**: All front matter complies with VS Code Copilot official schemas
- [ ] Change impact <10% of original content (excluding formatting compliance)
- [ ] Success report generated with file locations

**Quality Gates**:
- Zero tolerance for file output failures
- Maximum 10% content modification threshold (excluding standards compliance formatting)
- All cross-references must resolve successfully
- Front matter integrity maintained and VS Code schema compliant
- **FormatAssets compliance**: All harmonized files must pass `FormatAssets.instructions.md` validation
- **YAML validation**: No "unknown property" errors in any output file

### Harmonization Rules Engine
**Binding Priority (High to Low)**:
1. **Chat Mode ↔ Instructions**: Direct objective alignment
2. **Instructions ↔ Prompt**: Workflow and command mapping  
3. **Chat Mode ↔ Prompt**: User experience continuity
4. **Universal**: Schema version and refinement command consistency

**Cross-Reference Injection Points**:
- **Front Matter**: Add `harmonizedWith` array
- **Header Section**: Inject binding references after title
- **Workflow Sections**: Link to complementary file workflows
- **Command Sections**: Reference paired commands in other files

**Content Preservation Rules**:
- Never modify existing functional content
- Only add cross-references and harmony metadata
- Preserve all original sections and ordering
- Maintain existing version numbers (append harmony suffix)

### Output Generation Protocol
**File Naming Convention**:
- Input: `filename.extension.md`
- Output: `filename-harmonized.extension.md` OR overwrite original (user preference)

**Mandatory Output Sequence**:
1. Parse all input files successfully
2. Generate harmonization plan
3. Apply changes to in-memory representations
4. Validate cross-references resolve
5. **FORCE WRITE**: Save all harmonized files (no exceptions)
6. Generate and save harmonization report
7. Confirm success with absolute file paths

**Failure Handling**:
- If any file cannot be written: ABORT entire operation
- Provide specific error message with file system details
- Maintain transaction-like semantics (all-or-nothing)

### Refinement Commands
| Command | Scope | Effect |
|---------|-------|--------|
| `refine: preserve` | Content analysis | Maximize preservation, minimize changes |
| `refine: bind` | Cross-references | Strengthen inter-file connections |
| `refine: output` | File generation | Focus on output reliability and validation |
| `refine: minimal` | Change impact | Reduce modification footprint to absolute minimum |

### Depth Modes
| Mode | Processing Approach | Output Characteristics |
|------|-------------------|----------------------|
| `quick-preserve` | Basic cross-references only | Minimal binding, maximum preservation |
| `standard` | Full harmonization workflow | Balanced binding and preservation |
| `deep-binding` | Comprehensive integration | Maximum cross-reference density |

### Change Management
**Version Tracking**:
- Original files: Preserve existing version tags
- Harmonized files: Append `-h1`, `-h2` etc. for harmony iterations
- Change log: Maintain in `HARMONY_CHANGELOG.md`

**Rollback Strategy**:
- Backup original files before processing
- Provide rollback command to restore pre-harmony state
- Maintain audit trail of all harmonization operations

### Appendix / Templates
**Cross-Reference Template**:
~~~markdown
<!-- Harmony: Cross-reference injection -->
**Harmonized Assets**:
<!-- markdown-linter-ignore-next-4-lines -->
- Instructions: [filename.instructions.md](path/to/file)
- Prompts: [filename.prompt.md](path/to/file)
- Chat Mode: [filename.chatmode.md](path/to/file)
*Last harmonized: YYYY-MM-DD*
~~~

**Front Matter Harmony Addition**:
~~~yaml
harmonizedWith: ['file1.md', 'file2.md', 'file3.md']
bindingVersion: 'harmony-v1.0'
lastHarmonized: '2025-09-15'
preservationLevel: 'minimal-change'
~~~

### Summary & Next Actions
This instruction set enables preservation-focused harmonization of Copilot customization assets with guaranteed file output. The process maintains original functionality while establishing cross-reference bindings for unified operation.

**Success Metrics**:
- 100% file output generation rate
- <10% content modification impact
- Complete cross-reference resolution
- Preserved original intent validation

### Risk Register
| Risk | Impact | Mitigation |
|------|--------|------------|
| File write failure | HIGH | Pre-validate file system permissions, use atomic writes |
| Content corruption | HIGH | Maintain backups, validate through diff analysis |
| Cross-reference breakage | MEDIUM | Validate all links before final output |
| Intent loss | HIGH | Content preservation verification before saving |

### Conformance Note
This instruction file aligns with `instructions/GenerateInstructions.instructions.md` schema and integrates with the `chatmodes/CopilotCustomizer.chatmode.md` workflow for seamless asset management within the Copilot customization ecosystem.

**Binding References**:
- **Primary Chat Mode**: `chatmodes/CopilotCustomizer.chatmode.md`
- **Generation Guide**: `instructions/GenerateInstructions.instructions.md`  
- **Prompt Generator**: `prompts/NewInstructions.prompt.md`
- **Standards Compliance**: `instructions/FormatAssets.instructions.md` (mandatory final step)
- **Asset Formatting**: `prompts/FormatAssets.prompt.md` (execution workflow)

### Standards Compliance & Processing Metadata

**VS Code Copilot Compliance**: Custom Instructions Schema - Full compliance achieved  
**Schema Requirements**: 
- ✅ Required `applyTo` field in YAML front matter (`**/*.md`)
- ✅ Required `description` field with comprehensive framework overview
- ✅ Markdown body with detailed harmonization guidelines
- ✅ Documentation sources referenced per schema guidelines

**Standards Sources**: 
- [VS Code Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot/customization/)

**Processing Metadata**:
- **Standards Version**: VS Code Copilot v2025.09 (Custom Instructions latest)
- **Content Preservation**: 100% functionality maintained with enhanced standards
- **Formatting Applied**: 2025-09-15 | Standards compliance verified

---
*Generated by GitHub Copilot Customization Architect | Harmony v1.0 | 2025-09-15*  
*Formatted following VS Code GitHub Copilot official documentation standards*