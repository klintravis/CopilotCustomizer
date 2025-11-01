---
applyTo: '**/*.{instructions.md,prompt.md,agent.md}'
description: 'Formats and validates GitHub Copilot customization assets against latest VS Code standards with 100% content preservation, including agent files, MCP configurations, and tool management'
---

## Copilot Asset Formatting & Standards Compliance Instructions (v1.0)

**Depth Modes**: quick-format, standard, deep-compliance  
**Refinement Commands**: refine: standards, refine: preserve, refine: format, refine: validate

### Objective
Format and validate GitHub Copilot customization assets (*.instructions.md, *.agent.md, *.prompt.md) against VS Code standards (v1.105+) while preserving 100% content and cross-reference integrity.

### Constraints
- 100% content preservation requirement
- VS Code Copilot schema compliance (v1.105+)
- Cross-reference integrity maintenance
- Official documentation alignment

### Processing Workflow
1. Standards retrieval and schema mapping
2. Content backup and validation
3. Format application with semantic preservation
4. Compliance verification
5. Output generation with confirmation

**Official Documentation**: https://code.visualstudio.com/docs/copilot/customization/overview

### YAML Schema Compliance
**Critical Requirements**:
- Only officially supported fields in YAML front matter
- Remove custom fields (schemaVersion, depthModes, refinementCommands) → move to markdown
- Verify no "unknown property" errors in VS Code
- Required vs optional fields per asset type

**Asset-Specific YAML**:
| Asset Type | Required | Optional |
|------------|----------|----------|
| `*.agent.md` | `description` | `tools`, `model`, `handoffs` |
| `*.instructions.md` | `applyTo` | `description` |
| `*.prompt.md` | - | `agent`, `tools`, `model` |

**Markdown Structure**: H2 main sections, H3 subsections, consistent hierarchy, proper code blocks

### Asset Structures

**Agent Files** (`*.agent.md`):
```markdown
## [Agent Name] (v[Version])
### Role
### Core Objectives  
### Workflow
### Tool Configuration (optional)
### Handoff Workflows (optional)
### Standards Compliance
```

**Instructions** (`*.instructions.md`):
```markdown
## [Name] Instructions (v[Version])
### Objective
### Constraints
### Workflow
### Standards
### Validation
```

**Prompts** (`*.prompt.md`):
```markdown
## [Name] Prompt (v[Version])
### Task Intent
### Usage Instructions  
### Variable Block
### Agent Integration
### Validation Rules
```

**Agent Files** (`*.agent.md` - Current standard, replaces legacy `.chatmode.md`)

### Standards Compliance & Validation

#### VS Code Copilot Schema Compliance
**Agent Files Requirements** (per official documentation v1.105+):
- ✅ YAML front matter with `description` field (required)
- ✅ Optional `tools` array for comprehensive tool ecosystem management  
- ✅ Optional `model` specification for AI model selection
- ✅ Optional `handoffs` array for workflow transitions (VS Code Insiders)
- ✅ Markdown body with clear agent instructions
- ✅ Proper file extension (`.agent.md`)
- ✅ Location in `.github/agents/` or user profile

**Instructions Files Requirements**:
- ✅ YAML front matter with `applyTo` field (glob pattern)
- ✅ Optional `description` field for hover text
- ✅ Markdown body with clear instructions
- ✅ Proper file extension (`.instructions.md`)

**Chat Mode Files Requirements** (Legacy - migrate to Agent files):
- ✅ YAML front matter with `description` field
- ✅ Optional `tools` array for tool configuration  
- ✅ Optional `model` specification
- ✅ Markdown body with agent instructions
- ✅ Proper file extension (`.agent.md`)

**Prompt Files Requirements**:
- ✅ Agent specification (`agent` field preferred over legacy `mode`)
- ✅ Clear variable blocks and usage instructions
- ✅ Optional `tools` and `model` configuration
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

### Error Handling
**Failures**: Automatic backup, rollback capability, validation checkpoints
**Fallbacks**: Cached standards, minimal compliance mode, alternative output locations

### Output Format
**Files**: `[original]-formatted-[timestamp].md`  
**Reports**: Processing summary, preservation verification, compliance validation, cross-reference confirmation

### Ecosystem Integration
Compatible with: HarmonizeAssets, CopilotCustomizer, GenerateInstructions, AssetOptimization

### Standards Compliance
**VS Code Copilot v2025.10** (Agent Files v1.105+, MCP v1.102+)  
**Documentation**: [VS Code Copilot Customization](https://code.visualstudio.com/docs/copilot/customization/overview)

**Related Assets**: GenerateInstructions, GenerateCopilotAgent, GeneratePrompt, HarmonizeAssets, AssetOptimization

---
*VS Code GitHub Copilot official documentation standards*