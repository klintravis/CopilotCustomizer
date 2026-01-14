---
agent: CopilotCustomizer
---

<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : FormatAssets Prompt
Asset Type    : Prompt
Asset Version : v1.0
Invoked At    : {timestamp}
Invocation ID : prompt-formatassets-{timestamp-hash}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Prompt Ready | Awaiting variable substitution
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->

# FormatAssets.prompt.md

## Single Asset Formatter (v1.0)

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `prompt/formatassets` |
| **Version** | `v1.0` |
| **Created** | `2026-01-14` |
| **Last Modified** | `2026-01-14` |
| **Maintained By** | `CopilotCustomizer` |
| **Status** | `Active` |
| **Category** | `Templates & Generation` |

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

## Traceability & Audit

### Invocation Log
This section tracks when and how this asset is used.

**Log Entry Format**:
```
[YYYY-MM-DD HH:MM:SS UTC] - Invoked by: {user/system} | Context: {brief description}
```

**Recent Invocations**:
_Manual logging - update this section when invoked_
- [2026-01-14] Added traceability system

### Usage Guidelines
- This asset should be invoked when: Prompt-specific workflows are needed
- Expected outcome: Execution of FormatAssets Prompt functionality
- Related assets: See related prompts in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---
*Traceability System v1.0 - Asset tracking enabled*
