---
agent: CopilotCustomizer
---

<!-- ASSET: FormatAssets | TYPE: Prompt | VERSION: v1.1 -->

# Asset Formatter & Validator (v1.1)

## Metadata
Asset ID: prompt/formatassets | Created: 2026-01-14 | Status: Active

**Paired Instructions**: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md)

### Task
Format and optionally validate Copilot asset files with mandatory output and content preservation. Supports single files or directory scans.

### Usage
1. Provide `TARGET` (file path or directory)
2. Set `VERIFY` mode if validation needed
3. Confirm when ready
4. Monitor output confirmation

### Variables
---
**Target** [REQUIRED]: "{TARGET}"
**Output Folder** (default: .github/output): "{OUTPUT_FOLDER}"
**Scope** (single-file|directory) [default: single-file]: "{SCOPE}"
**Verify** (include validation) [default: true]: "{VERIFY}"
**Severity** (warn|fix) [default: fix]: "{SEVERITY}"
**Report Only** (no changes, just report) [default: false]: "{REPORT_ONLY}"
---

### Validation
- Supported: `*.instructions.md`, `*.agent.md`, `*.prompt.md`, `SKILL.md`
- All formatting and preservation details determined automatically

### Workflow Phases
**Phase 1: Analysis** (Auto) - Inventory assets and structure
**Phase 2: Planning** (Auto) - Propose formatting/normalization actions
**Phase 3: Implementation** (Auto) - Apply actions unless REPORT_ONLY=true
**Phase 4: Verification** (Auto, if VERIFY=true) - Validate schema compliance and cross-references
**Phase 5: Documentation** (Auto) - Generate summary report

### Generation Gate
Respond with:
- File type and structure analysis
- Content inventory
- Compliance status
- Validation plan (if VERIFY=true)
- `ready-to-format`

Wait for `confirm`.

### Output Requirements
1. Standards retrieval confirmation
2. Input file/directory analysis
3. Formatting application
4. **Formatted files** (MANDATORY - all saved to disk)
5. Validation results (if VERIFY=true)
6. Formatting report
7. Success validation with absolute paths

### Formatting Levels
- **Minimal**: Basic compliance, preserve structure
- **Standard**: Full standards, optimal formatting
- **Comprehensive**: Advanced + best practices

### Refinement Commands
- `refine: preserve` - Maximize preservation
- `refine: format` - Optimize structure
- `refine: validate` - Enhance compliance (when VERIFY=true)
- `refine: scope` - Limit TARGET_PATH or file patterns
- `refine: docs` - Expand or compress reporting detail

### Quality Checklist
- [ ] Files written successfully
- [ ] Content integrity verified
- [ ] Standards compliance validated
- [ ] Cross-references resolve (if VERIFY=true)
- [ ] Schema validation passed (if VERIFY=true)

*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*
*VS Code: [Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)*

**Generated using**: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md)

---

## Audit
Last invoked: [Manual log]
Change history: v1.1 (2026-01-14) - Merged with FormatAndVerifyAssets, added SCOPE and VERIFY modes | v1.0 (2026-01-14) - Added traceability
