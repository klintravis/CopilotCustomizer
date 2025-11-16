---
applyTo: '.github/**/*.{instructions.md,prompt.md,agent.md}'
description: 'Harmonizes 2-3 GitHub Copilot customization files with minimal changes while establishing cross-references and unified functionality for VS Code Copilot ecosystem'
---

## Copilot Asset Harmonization Instructions (v1.0)

**Refinement Commands**: refine: preserve, refine: bind, refine: output, refine: minimal

### Purpose
Harmonizes 2-3 Copilot customization files with minimal changes (<10% content modification) while establishing cross-references and unified functionality.

### Constraints
- No intent loss
- Mandatory file output
- <30s processing
- <15% file size increase

### Process
1. **Preserve-First**: Maintain structure/content
2. **Inject-Bind**: Add cross-references
3. **Force-Output**: Save harmonized versions
4. **Version-Track**: Audit trail

### Coding Standards
- **Cross-References**: `filename` (path/to/file.md)
- **Version Tags**: Append `-h1`, `-h2` for harmony iterations
- **Front Matter**: Append `harmonizedWith`, `bindingVersion`, `lastHarmonized`

### Testing
- [ ] Files saved successfully
- [ ] Cross-references resolve
- [ ] Original functionality preserved
- [ ] Binding metadata present
- [ ] 100% file output success
- [ ] <10% content modification

### Workflow
1. Read/parse 2-3 input files
2. Extract metadata, identify binding points
3. Generate cross-reference map
4. Apply minimal changes with bindings
5. Force-write harmonized files
6. Apply `FormatAssets.instructions.md` compliance
7. Generate change summary

### Outputs
- Harmonized files (saved to disk)
- Change log with diffs
- Cross-reference validation report
- Success confirmation with paths

### Acceptance Criteria
- [ ] All files processed/saved
- [ ] Cross-references validated
- [ ] Original intent preserved
- [ ] Binding metadata added
- [ ] FormatAssets compliance applied
- [ ] YAML schema validation passed
- [ ] <10% content modification

### Binding Priority
1. Agent ↔ Instructions
2. Instructions ↔ Prompt
3. Agent ↔ Prompt
4. Universal schema consistency

### Output Protocol
**Naming**: `filename-harmonized.extension.md` or overwrite original  
**Sequence**: Parse → Plan → Apply → Validate → FORCE WRITE → Report → Confirm  
**Failure**: All-or-nothing transaction semantics

### Templates
```markdown
**Harmonized Assets**:
- Instructions: `file.instructions.md` (path)
- Prompts: `file.prompt.md` (path)
*Last harmonized: YYYY-MM-DD*
```

```yaml
harmonizedWith: ['file1.md', 'file2.md']
bindingVersion: 'harmony-v1.0'
lastHarmonized: '2025-09-15'
```

*Framework: [CopilotFramework.instructions.md](../instructions/CopilotFramework.instructions.md)*  
*Standards: [FormatAssets.instructions.md](FormatAssets.instructions.md)*  
*VS Code: [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)*