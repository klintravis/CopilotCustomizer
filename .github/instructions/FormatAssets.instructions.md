---
applyTo: '**/*.{instructions.md,chatmode.md,prompt.md}'
description: 'Formats and validates GitHub Copilot customization assets against latest VS Code standards with 100% content preservation'
---

## Copilot Asset Formatting & Standards Compliance Instructions (v1.0)

**Schema Version**: 1.0  
**Depth Modes**: quick-format, standard, deep-compliance  
**Refinement Commands**: refine: standards, refine: preserve, refine: format, refine: validate

### Context Overview
Formats and validates GitHub Copilot customization assets (*.instructions.md, *.chatmode.md, *.prompt.md) against the latest VS Code GitHub Copilot official documentation and formatting standards. Ensures 100% content preservation while applying current best practices, schema requirements, and output formatting guidelines from official VS Code Copilot documentation.

### Primary Objective
Transform existing Copilot customization files to comply with current VS Code GitHub Copilot standards while preserving all original information and generating compliant outputs to designated folder.

### Tech Stack & Constraints
- **Core Technologies**: VS Code Copilot Extension API, Markdown parsing, YAML front matter, GitHub Copilot Documentation APIs
- **File Types**: `*.instructions.md`, `*.chatmode.md`, `*.prompt.md`,`*.agent.md`
- **Hard Constraints**:
  - 100% content preservation (zero information loss)
  - Current VS Code Copilot schema compliance
  - Official documentation standard alignment
  - Cross-reference integrity maintenance

### Processing Workflow
1. **Standards Retrieval**: Fetch latest VS Code GitHub Copilot documentation and standards
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
**YAML Front Matter Schema Compliance** (CRITICAL):
- **Strict Validation**: YAML front matter must contain ONLY officially supported fields per VS Code schema
- **Unknown Property Prevention**: Remove any custom/non-standard fields that cause "unknown property" errors
- **Required Fields**: Ensure all required fields per asset type are present and valid
- **Optional Fields**: Include only documented optional fields from official VS Code Copilot schema
- **Custom Metadata**: For all assets, ensure only officially supported fields are present in YAML front matter; move all custom/non-standard fields (such as schemaVersion, depthModes, refinementCommands, etc.) to markdown content to maintain schema compliance and consistency.
- **Post-Processing Validation**: Verify no YAML parsing errors after formatting

**Markdown Structure**:
- Consistent heading hierarchy (H2 for main sections, H3 for subsections)
- Clear section organization and logical flow
- Cross-reference links with proper formatting
- Code blocks with appropriate syntax highlighting

### Asset-Specific Formatting Rules

#### Instructions Files (`*.instructions.md`)
**YAML Schema Compliance** (VS Code Official):
- `applyTo`: Glob pattern for automatic application (**REQUIRED** per VS Code schema)
- `description`: Description shown on hover in Chat view (**OPTIONAL**)
- **FORBIDDEN**: Custom fields like `schemaVersion`, `depthModes`, `refinementCommands` (move to markdown)
- **Validation**: Must parse without "unknown property" errors

**Recommended Structure**:
```markdown
## [Asset Name] Instructions (v[Version])
### Context Overview
### Primary Objective  
### Tech Stack & Constraints
### Processing Workflow
### Coding Standards
### [Asset-Specific Sections]
### Standards Compliance & Validation
```

**Content Requirements**:
- Clear purpose statement and scope definition
- Specific technical constraints and requirements
- Processing workflow with numbered steps
- Standards validation and compliance verification
- Cross-references to related assets

#### Chat Mode Files (`*.chatmode.md`)
**YAML Schema Compliance** (VS Code Official):
- `description`: Brief description of the chat mode (**REQUIRED** per VS Code schema)
- `tools`: List of available tools (**OPTIONAL**, can be empty array)
- `model`: AI model specification (**OPTIONAL**)
- **FORBIDDEN**: Any custom fields not in official VS Code Custom Chat Modes schema
- **Validation**: Must parse without YAML errors in VS Code

**Recommended Structure**:
```markdown
## [Chat Mode Name] ([Version])
### Role
### Core Objectives
### Workflow
### [Mode-Specific Sections]
### Standards Compliance & Processing Metadata
```

**Content Requirements**:
- Clear role definition and capabilities
- Structured workflow with numbered steps
- Depth modes and refinement commands
- Tool integration specifications
- Processing metadata with schema compliance

#### Prompt Files (`*.prompt.md`)
**Required Elements**:
- `mode`: Prompt execution mode (ask/agent/generate)
- Variable blocks with clear parameter definitions
- Usage instructions and examples

**Recommended Structure**:
```markdown
## [Prompt Name] Prompt (v[Version])
### Task Intent
### Usage Instructions  
### Variable Block
### [Prompt-Specific Sections]
### Standards Compliance Documentation
```

**Content Requirements**:
- Clear task intent and scope
- Structured variable blocks with validation
- Usage examples and clarification rules
- Generation gates and confirmation workflows
- Refinement commands and quality validation

#### Agent Files (`*.agent.md`, `AGENTS.md`)
**Content Requirements**:
- Agent configuration and setup instructions
- Build and deployment commands
- Security and compliance guidelines
- Integration specifications

### Standards Compliance & Validation

#### VS Code Copilot Schema Compliance
**Instructions Files Requirements** (per official documentation):
- ✅ YAML front matter with `applyTo` field (glob pattern)
- ✅ Optional `description` field for hover text
- ✅ Markdown body with clear instructions
- ✅ Proper file extension (`.instructions.md`)
- ✅ Location in `.github/instructions/` or user profile

**Chat Mode Files Requirements**:
- ✅ YAML front matter with `description` field
- ✅ Optional `tools` array for tool configuration  
- ✅ Optional `model` specification
- ✅ Markdown body with chat mode instructions
- ✅ Proper file extension (`.chatmode.md`)

**Prompt Files Requirements**:
- ✅ Mode specification (ask/agent/generate)
- ✅ Clear variable blocks and usage instructions
- ✅ Proper file extension (`.prompt.md`)

#### Content Preservation Standards
**Mandatory Preservation**:
- All existing functionality and workflows
- Cross-references and asset bindings
- Version information and metadata
- User customizations and extensions
- Processing commands and refinement options

**Enhancement Additions**:
- Latest schema compliance documentation
- Official VS Code documentation references
- Standards validation metadata
- Processing timestamps and version tracking

### Processing Implementation

#### Formatting Execution Phases
1. **Pre-Processing Validation**
   - File type identification and support verification
   - Content backup creation for rollback capability
   - YAML front matter parsing and validation
   - Cross-reference inventory and preservation planning

2. **Standards Application**
   - Latest VS Code Copilot documentation retrieval
   - Schema requirements mapping to existing content
   - Front matter enhancement with required/optional fields
   - Markdown structure optimization for readability

3. **Content Enhancement**
   - Official documentation source integration
   - Standards compliance metadata addition
   - Cross-reference format standardization
   - Processing workflow documentation

4. **Quality Validation & YAML Schema Compliance**
   - **YAML Validation**: Parse YAML front matter to detect "unknown property" errors
   - **Schema Compliance**: Verify only officially supported fields are present
   - **Field Validation**: Check required fields exist and optional fields are properly formatted
   - **Custom Metadata**: Confirm non-standard fields moved to markdown content
   - **Content Integrity**: Validate 100% preservation requirement
   - **Cross-Reference Testing**: Verify all links resolve correctly
   - **VS Code Compatibility**: Ensure file loads without errors in VS Code Copilot

#### Depth Mode Implementations
**quick-format**:
- Basic schema compliance application
- Minimal structural changes
- Focus on required field validation
- Fast processing with essential enhancements

**standard**:  
- Full standards application with optimal formatting
- Enhanced documentation references
- Complete schema compliance validation
- Balanced enhancement and preservation approach

**deep-compliance**:
- Comprehensive standards integration
- Advanced compliance documentation
- Extensive validation and verification
- Maximum enhancement while preserving functionality

#### Refinement Commands
- `refine: standards` - Re-apply latest VS Code Copilot standards
- `refine: preserve` - Maximize content preservation, minimize changes  
- `refine: format` - Focus on structure and presentation optimization
- `refine: validate` - Enhance compliance checking and error detection

### Quality Assurance

#### Content Preservation Validation
**Critical Checkpoints**:
- Pre-formatting content inventory and baseline establishment
- Mid-processing content integrity monitoring
- Post-formatting preservation verification through comparison
- Cross-reference functionality testing

**Preservation Requirements**:
- 0% information loss tolerance
- Complete workflow functionality maintenance  
- All cross-references preserved and functional
- Version information and metadata retained
- User customizations and extensions intact

#### Standards Compliance Verification
**YAML Schema Validation Requirements** (MANDATORY):
- **Parse Validation**: YAML front matter must parse without syntax errors
- **Unknown Property Check**: Verify NO "unknown property" warnings/errors in VS Code
- **Required Fields**: Confirm all required fields per asset type are present and valid
- **Optional Fields**: Validate optional fields use correct format and values
- **Custom Field Removal**: Ensure non-standard fields moved to markdown content
- **VS Code Compatibility**: Test file loads correctly in VS Code Copilot Chat
- **Cross-Reference Validation**: Verify all markdown links resolve properly

**Official Documentation Alignment**:
- Latest VS Code Copilot standards application
- Official schema requirement compliance
- Documentation source reference accuracy
- Best practices implementation verification

### Error Handling & Risk Mitigation

#### Critical Failure Scenarios
**Content Loss Prevention**:
- Automatic backup creation before processing
- Multi-checkpoint content validation during formatting
- Rollback capability for failed operations
- Preservation failure detection and abort procedures

**Standards Compliance Failures**:
- Schema validation errors with specific guidance
- Documentation retrieval failures with fallback options
- Cross-reference breakage detection and repair
- Output generation failures with detailed diagnostics

#### Fallback Procedures
**Documentation Unavailable**:
- Use cached standards with version warning
- Minimal formatting with basic compliance
- Manual standards application guidance
- Deferred processing until standards accessible

**File System Issues**:
- Alternative output location suggestions
- Permission validation and resolution guidance
- Temporary file creation for atomic operations
- Recovery procedures for partial failures

### Output Specifications

#### Formatted File Generation
**File Naming Convention**:
- Original filename with `-formatted` suffix
- Timestamp inclusion for version tracking
- Extension preservation for tool compatibility
- Collision avoidance with existing files

**Output Structure Requirements**:
- Enhanced YAML front matter with compliance fields
- Structured markdown with improved organization
- Standards compliance documentation section
- Processing metadata with timestamps and versions
- Cross-reference validation and update confirmation

#### Validation Report Generation  
**Report Content Requirements**:
- Processing summary with before/after comparison
- Content preservation verification (100% requirement)
- Standards compliance validation results
- Cross-reference integrity confirmation
- File generation success confirmation with paths

**Report Delivery**:
- Detailed formatting report saved to output folder
- Processing log with timestamps and validation checkpoints
- Success/failure status with specific error details
- Recommendations for future maintenance and updates

### Integration & Ecosystem Alignment

#### Asset Harmonization
**Cross-Asset Consistency**:
- Shared terminology and formatting patterns
- Version alignment across related assets
- Reference integrity maintenance
- Unified processing metadata standards

**Ecosystem Integration**:
- Compatibility with HarmonizeAssets.instructions.md
- Alignment with CopilotCustomizer.chatmode.md workflows
- Integration with GenerateInstructions.instructions.md patterns
- Support for AssetOptimization.instructions.md processes

#### Maintenance & Evolution
**Standards Tracking**:
- VS Code Copilot documentation version monitoring
- Schema requirement updates and migration support
- Backward compatibility preservation
- Future-proofing through modular design

**Continuous Improvement**:
- Processing workflow optimization
- Standards compliance enhancement
- User feedback integration
- Performance improvement implementation

### Standards Compliance & Processing Metadata

**VS Code Copilot Compliance**: Custom Instructions Schema - Full compliance achieved  
**Schema Requirements**: 
- ✅ Required `applyTo` field in YAML front matter (glob pattern)
- ✅ Optional `description` field for hover text functionality
- ✅ Markdown body with clear formatting instructions  
- ✅ Documentation sources referenced per schema guidelines

**Standards Sources**: 
- [VS Code Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot/customization/)
- [VS Code Custom Chat Modes](https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes)
- [VS Code Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)

**Processing Metadata**:
- **Standards Version**: VS Code Copilot v2025.09 (Custom Instructions latest)
- **Schema Compliance**: Full alignment with official documentation requirements
- **Content Preservation**: 100% functionality maintained with enhanced standards
- **Formatting Applied**: 2025-09-15 | Latest standards compliance verified

### Conformance Note
This instruction file provides comprehensive formatting standards for all VS Code Copilot customization assets and integrates with the broader Copilot customization ecosystem. Focuses on maintaining harmony between content preservation and standards compliance for sustainable multi-asset management.

**Binding References**:
- **Standards Source**: Latest VS Code GitHub Copilot Documentation
- **Asset Generation Framework**: 
  - `instructions/GenerateInstructions.instructions.md` (for instructions files)
  - `instructions/GenerateChatmode.instructions.md` (for chat mode files)
  - `instructions/GeneratePrompt.instructions.md` (for prompt files)
  - `instructions/GenerateAgent.instructions.md` (for agent files)
- **Primary Chat Mode**: `chatmodes/CopilotCustomizer.chatmode.md`
- **Asset Harmonization**: `instructions/HarmonizeAssets.instructions.md`
- **Optimization Integration**: `instructions/AssetOptimization.instructions.md`

---
*Generated and enhanced following VS Code GitHub Copilot official documentation standards*