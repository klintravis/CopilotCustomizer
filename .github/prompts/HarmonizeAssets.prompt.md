---
agent: CopilotCustomizer
---

# HarmonizeAssets.prompt.md

## Asset Harmonization Executor (v1.0)

**Paired Instructions**: [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md)

### Task
Harmonize 2-3 Copilot files with guaranteed output, minimal changes, and cross-reference binding.

### Usage
1. Review [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md)
2. Provide `INPUT_FILES` (2-3 paths)
3. Confirm when ready
4. Monitor output confirmation

### Variables
---
**Input Files** (2-3 files) [REQUIRED]: "{INPUT_FILES}"
**Output Directory** (default: .github/output): "{OUTPUT_DIRECTORY}"
---

### Validation
- Required: 2-3 related files
- Supported: `*.instructions.md`, `*.prompt.md`, `*.agent.md`
- All preservation and binding details determined automatically

### Generation Gate
Respond with:
- File analysis
- Cross-reference points
- Content change %
- `ready-to-harmonize`

Wait for `confirm`.

### Output Requirements
1. File analysis report
2. Harmonization plan
3. **Harmonized files** (MANDATORY - all saved)
4. Change summary
5. Success confirmation with paths

### Preservation Levels
- **Minimal**: <5% change
- **Medium**: <10% change
- **Maximum**: <15% change

### Refinement Commands
- `refine: preserve` - Minimize changes
- `refine: bind` - Strengthen connections
- `refine: minimal` - Reduce footprint

### Quality Checklist
- [ ] All files written
- [ ] Cross-references resolve
- [ ] Change % within limits
- [ ] Original intent preserved

*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*  
*VS Code: [Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)*

**Generated using**: [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md)

---

*VS Code Copilot Customization Framework v1.0*