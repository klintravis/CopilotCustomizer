---
agent: CopilotCustomizer
---

# FormatAssets.prompt.md

## Single Asset Formatter (v1.0)

**Paired Instructions**: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md)

### Task
Format individual Copilot asset file with mandatory output and 100% content preservation.

### Usage
1. Provide `INPUT_FILE` and send
2. Confirm when ready
3. Monitor output confirmation

### Variables
---
**Input File** [REQUIRED]: "{INPUT_FILE}"
**Output Folder** (default: .github/output): "{OUTPUT_FOLDER}"
---

### Validation
- Supported: `*.instructions.md`, `*.agent.md`, `*.prompt.md`
- All formatting and preservation details determined automatically

### Generation Gate
Respond with:
- File type and structure analysis
- Content inventory
- Compliance status
- `ready-to-format`

Wait for `confirm`.

### Output Requirements
1. Standards retrieval confirmation
2. Input file analysis
3. Formatting application
4. **Formatted file** (MANDATORY - saved to disk)
5. Formatting report
6. Success validation with absolute path

### Formatting Levels
- **Minimal**: Basic compliance, preserve structure
- **Standard**: Full standards, optimal formatting
- **Comprehensive**: Advanced + best practices

### Refinement Commands
- `refine: preserve` - Maximize preservation
- `refine: format` - Optimize structure
- `refine: validate` - Enhance compliance

### Quality Checklist
- [ ] File written successfully
- [ ] Content integrity verified
- [ ] Standards compliance validated
- [ ] Cross-references resolve

*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*  
*VS Code: [Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)*

**Generated using**: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md)

---

*VS Code Copilot Customization Framework v1.0*