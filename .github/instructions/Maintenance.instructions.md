---
applyTo: '.github/**/*.{instructions.md,prompt.md,agent.md}'
description: 'Comprehensive maintenance for Copilot customization assets including optimization, harmonization, formatting, and validation with schema compliance and reference preservation'
---

# AssetMaintenance.instructions.md

## Objective
Maintain GitHub Copilot customization assets (`*.instructions.md`, `*.prompt.md`, `*.agent.md`) through three operations:
- **Optimize**: Reduce duplication, improve clarity, format consistently
- **Harmonize**: Establish cross-references between 2-3 related files
- **Validate**: Verify schema compliance and reference integrity

All operations preserve behavior, intent, and 100% of existing references.

## Operations

### 1. Optimize Mode
Improve token efficiency and formatting while preserving functionality.

**Actions**:
- Remove duplication and drift
- Normalize headings, tables, code fences, bullets
- Improve clarity without changing behavior
- Validate YAML schema compliance
- Verify all cross-references resolve

**Constraints**:
- Preserve behavior and intent
- Minimal diffs; avoid reformatting unrelated content
- No functional rewrites
- <15% file size change

### 2. Harmonize Mode
Coordinate 2-3 related files with minimal changes while establishing cross-references.

**Actions**:
- Inject cross-reference bindings between files
- Add harmonization metadata to front matter
- Generate cross-reference map
- Apply minimal changes (<10% content modification)
- Force-write all harmonized files

**Constraints**:
- No intent loss
- Mandatory file output (all-or-nothing transaction)
- <30s processing time
- <15% file size increase

**Binding Priority**:
1. Agent ↔ Instructions
2. Instructions ↔ Prompt
3. Agent ↔ Prompt
4. Universal schema consistency

### 3. Validate Mode
Verify schema compliance and reference integrity without modifications.

**Actions**:
- Parse and validate YAML front matter
- Check all internal and external references
- Verify paired relationships resolve
- Report issues without making changes

## Unified Workflow

### Phase 1: Discovery
1. Identify target files within scope
2. Parse YAML front matter and content
3. Extract metadata and identify binding points
4. Map existing cross-references

### Phase 2: Analysis
5. Validate YAML schema compliance by asset type
6. Check for duplication, drift, or inconsistencies
7. Identify optimization opportunities
8. Generate cross-reference validation report

### Phase 3: Application (Optimize/Harmonize only)
9. **If Optimize**: Apply formatting, reduce duplication, improve clarity
10. **If Harmonize**: Inject cross-references, add binding metadata
11. Validate all changes preserve original intent
12. Verify all references still resolve

### Phase 4: Output
13. Force-write modified files to disk
14. Generate change summary with diffs
15. Report success confirmation with file paths
16. Provide verification checklist results

## YAML Front Matter Rules (v1.109)

Only use officially supported fields by asset type:

**Agent files (`*.agent.md`)**:
- Required: `description`
- Optional: `tools`, `model` (string/array), `handoffs` (with optional model), `mcp-servers`, `target`, `name`, `argument-hint`, `user-invokable`, `disable-model-invocation`, `agents`

**Instruction files (`*.instructions.md`)**:
- Required: `applyTo`
- Optional: `description`

**Prompt files (`*.prompt.md`)**:
- Optional: `agent`, `tools`, `model`

**Harmonization metadata** (append to existing front matter in Harmonize mode):
```yaml
harmonizedWith: ['file1.md', 'file2.md']
bindingVersion: 'harmony-v1.0'
lastHarmonized: 'YYYY-MM-DD'
```

**Do not add** unsupported fields (e.g., `schemaVersion`, `depthModes`, `refinementCommands`) to YAML front matter.

## Coding Standards

### Cross-Reference Format
Use inline references: `filename` (path/to/file.md)

### Version Tracking
Append `-h1`, `-h2` for harmony iterations when creating backup versions.

### Output Naming
- **Optimize**: Overwrite original or append `-optimized`
- **Harmonize**: Overwrite original or append `-harmonized`
- **Validate**: No file output, report only

## Quality Guidelines

### Preservation Requirements
- Preserve all behavior and functionality
- Preserve all links and hard references (internal/external)
- Preserve original intent and purpose
- No functional rewrites

### Efficiency Targets
- Minimize content modification (<10% for harmonize, <15% for optimize)
- Prefer minimal diffs
- Process in <30s for harmonize operations
- Keep file size increases <15%

### Reference Integrity
- 100% reference preservation
- All cross-references must resolve
- Validate paired relationships
- Check for stale references to deprecated assets

## Verification Checklist

### Schema Validation
- [ ] YAML parses successfully
- [ ] Contains only supported fields for asset type
- [ ] Required fields present
- [ ] No unsupported custom metadata in YAML

### Cross-Reference Validation
- [ ] All file references resolve
- [ ] Paired relationships validated
- [ ] No stale references to deprecated assets
- [ ] Harmonization bindings verified (harmonize mode)

### Content Integrity
- [ ] Original functionality preserved
- [ ] Behavior unchanged
- [ ] Intent maintained
- [ ] Content modification within limits

### Output Success
- [ ] All files written to disk successfully
- [ ] Change summary generated
- [ ] Success confirmation with paths
- [ ] Verification report provided

## Templates

### Cross-Reference Binding (for harmonized files)
```markdown
**Related Assets**:
- Instructions: `file.instructions.md` (path/to/file.instructions.md)
- Prompts: `file.prompt.md` (path/to/file.prompt.md)
- Agents: `file.agent.md` (path/to/file.agent.md)
*Last harmonized: YYYY-MM-DD*
```

### Change Summary Report
```markdown
## Asset Maintenance Report

**Operation**: [Optimize | Harmonize | Validate]
**Scope**: [X files processed]
**Status**: [Success | Partial | Failed]

### Changes Applied
- [File 1]: [Description of changes]
- [File 2]: [Description of changes]

### Verification Results
- Schema validation: [Pass/Fail]
- Reference integrity: [Pass/Fail]
- Content preservation: [Pass/Fail]

### Follow-up Actions
- [Any manual steps or recommendations]
```

## Related Framework
- Repository analysis: `RepoReview.instructions.md`
- Security guardrails: `Security.instructions.md`
- Framework standards: `Framework.instructions.md`

## Change History

| Version | Date | Changes |
|---------|------|---------||
| v1.0 | 2026-01-15 | Initial release |
