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

1. **Discovery**: Identify targets, parse YAML/content, map cross-references
2. **Analysis**: Validate schema, check duplication/drift, generate validation report
3. **Application** (Optimize/Harmonize only): Apply changes, verify intent preservation and reference integrity
4. **Output**: Write files, generate change summary, report results

## Schema Rules
**Skill Reference**: See [quality-validation](../skills/quality-validation/SKILL.md) skill for complete YAML frontmatter rules per asset type and validation checklists.

## Harmonization Metadata (Markdown Content)

When running in Harmonize mode, add the following metadata as a markdown section at the end of the file (NOT in YAML frontmatter):

```markdown
---

## Harmonization Record

**Harmonized With**: file1.md, file2.md  
**Binding Version**: harmony-v1.0  
**Last Harmonized**: YYYY-MM-DD
```

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
- **Preservation**: All behavior, links, references, and intent must be preserved; no functional rewrites
- **Efficiency**: <10% content change for harmonize, <15% for optimize; prefer minimal diffs; <30s processing
- **Reference integrity**: 100% preservation; all cross-references must resolve; check for stale references

## Verification
Use the [quality-validation](../skills/quality-validation/SKILL.md) skill's validation checklist for schema, cross-reference, content integrity, and output verification.

## Templates
- **Cross-Reference Binding**: Related Assets list with Instructions/Prompts/Agents links and harmonization date
- **Change Summary Report**: Operation, scope, status, changes applied, verification results (schema/references/content), follow-up actions

---

## Processing Metadata

- **Standards Version**: VS Code Copilot v2026.03 (Agent Files v1.112)
- **Role**: Comprehensive maintenance for Copilot customization assets
- **Scope**: Optimization, harmonization, formatting, and validation operations
- **Operations**: Schema compliance, cross-reference preservation, content integrity

*Generated following CopilotCustomizer instruction generation standards*

---

## Related Framework
- Repository analysis: `RepoReview.instructions.md`
- Security guardrails: `Security.instructions.md`
- Framework standards: `Framework.instructions.md`

## Change History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-01-15 | Initial release |
