---
applyTo: '**/*.{instructions.md,chatmode.md,prompt.md}'
schemaVersion: '1.0'
depthModes: ['quick-format','standard','deep-compliance']
refinementCommands: ['refine: standards','refine: preserve','refine: format','refine: validate']
---

## Copilot Asset Formatting & Standards Compliance Instructions (v1.0)

### Context Overview
Formats and validates GitHub Copilot customization assets (*.instructions.md, *.chatmode.md, *.prompt.md) against the latest VS Code GitHub Copilot official documentation and formatting standards. Ensures 100% content preservation while applying current best practices, schema requirements, and output formatting guidelines from official VS Code Copilot documentation.

### Primary Objective
Transform existing Copilot customization files to comply with current VS Code GitHub Copilot standards while preserving all original information and generating compliant outputs to designated folder.

### Tech Stack & Constraints
- **Core Technologies**: VS Code Copilot Extension API, Markdown parsing, YAML front matter, GitHub Copilot Documentation APIs
- **File Types**: `*.instructions.md`, `*.chatmode.md`, `*.prompt.md`,`*.agent.md`
- **Hard Constraints**:
  - 100% content preservation (zero information loss)
  - Mandatory file output to specified output folder
  - Online documentation standards retrieval required
  - Current VS Code Copilot schema compliance
  - Backward compatibility maintenance
- **Performance**: Online documentation fetch <10 seconds, processing <30 seconds per file

### Architecture / Design Conventions
**Standards Compliance Pattern**: Preserve-Validate-Format-Output
1. **Documentation Retrieval**: Fetch latest VS Code GitHub Copilot standards
2. **Content Preservation**: Backup and validate original content integrity
3. **Standards Mapping**: Align existing content with current schema requirements
4. **Format Application**: Apply formatting while preserving semantic meaning
5. **Compliance Validation**: Verify against official standards
6. **Output Generation**: Write formatted files with validation confirmation

**Official Documentation Sources**:
- https://code.visualstudio.com/docs/copilot/customization/overview
- https://code.visualstudio.com/docs/copilot/customization/custom-instructions
- https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes
- https://code.visualstudio.com/docs/copilot/customization/prompt-files
- https://code.visualstudio.com/docs/copilot/copilot-coding-agent

### Coding Standards
**Front Matter Requirements**:
- YAML syntax validation
- Required fields per asset type verification
- Optional fields preservation with standards alignment
- Schema version tracking and updates

**Markdown Structure**:
- Heading hierarchy compliance (H2 for main sections, H3 for subsections)
- Code block language specification
- Table formatting with proper alignment
- Link validation and accessibility

**Content Organization**:
- Section ordering per official schema requirements
- Consistent terminology usage
- Cross-reference format standardization
- Version tag and metadata consistency

### Security & Compliance
**Content Integrity Validation**:
- Pre-processing content hash generation
- Post-processing integrity verification
- Semantic content preservation validation
- Original intent preservation confirmation

**Documentation Access Security**:
- HTTPS-only documentation retrieval
- Content validation against known good schemas
- Malicious content detection and filtering
- Source authenticity verification

**File System Security**:
- Output directory permissions validation
- Atomic file write operations
- Backup creation with rollback capability
- Access control preservation

### Performance Expectations
**Online Documentation Retrieval**:
- Initial fetch: <10 seconds for all required documentation
- Caching: 24-hour local cache for repeated operations
- Fallback: Use embedded standards if online access fails
- Validation: Checksum verification for cached content

**Processing Performance**:
- Single file processing: <30 seconds
- Batch processing (3 files): <60 seconds
- Memory usage: <100MB working set
- CPU utilization: <50% during processing

### Testing Strategy
**Pre-Processing Validation**:
- [ ] Input file accessibility and readability
- [ ] YAML front matter parse success
- [ ] Markdown structure validation
- [ ] Content inventory and cataloging

**Standards Compliance Testing**:
- [ ] Online documentation retrieval success
- [ ] Schema validation against current standards
- [ ] Required field presence verification
- [ ] Optional field format compliance

**Content Preservation Testing**:
- [ ] Semantic content comparison (before/after)
- [ ] Information completeness verification
- [ ] Intent preservation validation
- [ ] Functionality impact assessment

**Output Validation Testing**:
- [ ] File generation success confirmation
- [ ] Output format compliance verification
- [ ] Cross-reference resolution testing
- [ ] Schema validation of generated files

### Tooling & Automation
**Required Capabilities**:
- Web content fetching and parsing
- YAML front matter manipulation
- Markdown AST processing and transformation
- Schema validation engines
- Diff generation and analysis
- File system operations with atomic writes

**Documentation Processing Pipeline**:
1. **Fetch Latest Standards**: Retrieve current VS Code Copilot documentation
2. **Parse Schema Requirements**: Extract formatting rules and required fields
3. **Validate Input Files**: Ensure processability and content integrity
4. **Apply Standards**: Transform content while preserving information
5. **Validate Compliance**: Verify against fetched standards
6. **Generate Output**: Write compliant files with confirmation

### Documentation Requirements
**Mandatory Processing Outputs**:
- Formatted and compliant versions of all input files
- Standards compliance validation report
- Content preservation verification summary
- Before/after comparison documentation
- Output file generation confirmation with paths

**Standards Alignment Report Format**:
```markdown
## Standards Compliance Report
**Processing Date**: YYYY-MM-DD HH:MM:SS
**Documentation Version**: [retrieved schema version]
**Files Processed**: [list with original names]
**Standards Applied**: [list of formatting rules applied]
**Compliance Status**: PASS/FAIL with details
**Content Preservation**: 100% - No information lost
**Output Location**: [absolute paths to formatted files]
**Validation Results**: [schema compliance confirmation]
```

### Monitoring & Observability
**Documentation Freshness Monitoring**:
- Track documentation retrieval timestamps
- Monitor for schema version changes
- Alert on documentation access failures
- Cache validation and expiration tracking

**Processing Success Metrics**:
- File processing success rate (target: 100%)
- Content preservation rate (target: 100%)
- Standards compliance rate (target: 100%)
- Output generation success rate (target: 100%)

### Review & Acceptance Criteria
**Definition of Done**:
- [ ] Latest VS Code GitHub Copilot standards retrieved and applied
- [ ] All input files processed without content loss
- [ ] Formatted versions generated in specified output folder
- [ ] Standards compliance validated for all outputs
- [ ] Content preservation verified through comparison analysis
- [ ] Cross-references updated to maintain functionality
- [ ] Schema validation passes for all generated files
- [ ] Processing report generated with success confirmation

**Quality Gates**:
- Zero tolerance for information loss during formatting
- 100% standards compliance for generated files
- All outputs must pass schema validation
- Cross-references must resolve correctly post-formatting

### Standards Validation Rules
**File Type Specific Requirements**:

**Instructions Files (*.instructions.md)**:
- Required front matter fields: `applyTo`
- Optional fields: `schemaVersion`, `depthModes`, `refinementCommands`
- Section structure compliance with canonical ordering
- Consistent heading levels and formatting

**Chat Mode Files (*.chatmode.md)**:
- Required front matter fields: `description`
- Optional fields: `schemaVersion`, `tools`, `depthModes`
- Role definition clarity and completeness
- Workflow specification with clear steps

**Prompt Files (*.prompt.md)**:
- Required front matter: `mode` specification
- Variable block format compliance
- Usage instructions clarity
- Refinement commands specification

### Content Preservation Protocol
**Information Integrity Safeguards**:
1. **Pre-Processing Backup**: Create timestamped backup of original files
2. **Content Cataloging**: Inventory all sections, metadata, and content elements
3. **Semantic Mapping**: Map original content to compliant format structure
4. **Transformation Validation**: Verify no information loss during formatting
5. **Post-Processing Verification**: Compare content completeness before/after

**Preservation Validation Checklist**:
- [ ] All original sections present in formatted output
- [ ] Metadata preserved and enhanced with standards compliance
- [ ] Functional commands and workflows maintained
- [ ] Cross-references preserved and updated for format compliance
- [ ] Version information maintained with formatting annotations

### Output Generation Protocol
**File Naming and Organization**:
- Input: `filename.type.md`
- Output: `filename-formatted.type.md` (in designated output folder)
- Backup: `filename.type.md.backup.YYYYMMDD-HHMMSS`

**Mandatory Output Sequence**:
1. Fetch and validate latest documentation standards
2. Create backups of all input files
3. Process files with content preservation validation
4. Apply formatting transformations per retrieved standards
5. Validate compliance against current schema requirements
6. **FORCE WRITE**: Generate all formatted files (no exceptions)
7. Create standards compliance and preservation reports
8. **Append Compliance Documentation**: Add formatting metadata as markdown section (NOT in YAML front matter)
9. Confirm success with absolute output paths

### Refinement Commands
| Command | Scope | Effect |
|---------|-------|--------|
| `refine: standards` | Documentation compliance | Strengthen alignment with latest official standards |
| `refine: preserve` | Content integrity | Maximize preservation, minimize formatting changes |
| `refine: format` | Structure and presentation | Optimize readability while maintaining compliance |
| `refine: validate` | Quality assurance | Enhance validation processes and error detection |

### Depth Modes
| Mode | Processing Approach | Standards Coverage |
|------|-------------------|-------------------|
| `quick-format` | Basic formatting compliance | Essential standards only |
| `standard` | Full standards application | Complete schema compliance |
| `deep-compliance` | Comprehensive validation | Advanced standards + best practices |

### Change Management
**Version Tracking**:
- Original files: Maintain existing version tags
- Formatted files: Append formatting annotation (e.g., v1.0-std2025.09)
- Standards version: Track applied documentation version
- Change log: Document all formatting transformations applied

**Documentation Version Management**:
- Track schema versions of applied standards
- Maintain compatibility matrices for different VS Code versions
- Log documentation source URLs and retrieval timestamps
- Enable rollback to previous formatting standards if needed

### Appendix / Templates
**Standards Compliance Documentation Template** (append to formatted file):
```markdown
---

## Formatting Applied

**Standards Version**: VS Code Copilot v2025.09  
**Compliance Level**: Full  
**Formatting Date**: 2025-09-15  
**Content Preserved**: 100%  
**Original Version**: v1.0  
**Documentation Sources**: 
- https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes
- https://code.visualstudio.com/docs/copilot/customization/custom-instructions
- https://code.visualstudio.com/docs/copilot/customization/prompt-files

*Note: This metadata documents formatting compliance and is separate from YAML front matter to avoid parsing conflicts.*
```

**Cross-Reference Update Pattern**:
```markdown
<!-- Standards: Updated for compliance -->
**Related Assets** (Updated for current standards):
- Instructions: [filename.instructions.md](path/formatted/file)
- Chat Mode: [filename.chatmode.md](path/formatted/file)
- Prompts: [filename.prompt.md](path/formatted/file)
```

### Summary & Next Actions
These instructions ensure Copilot customization assets comply with current VS Code GitHub Copilot standards while maintaining complete content integrity and generating validated outputs.

**Success Metrics**:
- 100% content preservation rate
- 100% standards compliance for outputs
- 100% file generation success
- Current documentation alignment verification

**Next Actions**:
1. Implement online documentation retrieval capability
2. Develop content preservation validation framework
3. Create standards mapping and transformation engine
4. Establish output generation and validation pipeline

### Risk Register
| Risk | Impact | Mitigation |
|------|--------|------------|
| Online documentation unavailable | HIGH | Maintain cached standards with fallback capability |
| Content loss during formatting | CRITICAL | Multi-level content preservation validation |
| Standards misinterpretation | HIGH | Automated schema validation with manual review |
| Output generation failure | HIGH | Atomic operations with rollback capability |
| Schema version conflicts | MEDIUM | Version compatibility checking and migration |

### Conformance Note
This instruction file aligns with `instructions/GenerateInstructions.instructions.md` schema and integrates with the broader Copilot customization ecosystem. Focuses on maintaining harmony between content preservation and standards compliance for sustainable asset management.

**Binding References**:
- **Standards Source**: Latest VS Code GitHub Copilot Documentation
- **Generation Framework**: `instructions/GenerateInstructions.instructions.md`
- **Primary Chat Mode**: `chatmodes/CopilotCustomizer.chatmode.md`
- **Asset Harmonization**: `instructions/HarmonizeAssets.instructions.md`

---
*Generated by Copilot Asset Formatting & Standards Compliance v1.0 | Following VS Code GitHub Copilot Standards | 2025-09-15*