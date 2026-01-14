---
agent: CopilotCustomizer
---

<!-- ASSET: HarmonizeAssets | TYPE: Prompt | VERSION: v1.1 -->

# Asset Harmonization Executor (v1.1)

## Metadata
Asset ID: prompt/harmonizeassets | Created: 2026-01-14 | Status: Active

**Paired Instructions**: [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md)

### Task
Harmonize 2-3 Copilot files with guaranteed output, minimal changes, and cross-reference binding. Optionally validate cross-references, handoff chains, and schema consistency.

### Usage
1. Review [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md)
2. Provide `INPUT_FILES` (2-3 paths)
3. Set `VALIDATE` mode if verification needed
4. Confirm when ready
5. Monitor output confirmation

### Variables
---
**Input Files** (2-3 files) [REQUIRED]: "{INPUT_FILES}"
**Output Directory** (default: .github/output): "{OUTPUT_DIRECTORY}"
**Validate** (include validation phase) [default: true]: "{VALIDATE}"
**Mode** (conservative|standard) [default: standard]: "{MODE}"
---

### Validation
- Required: 2-3 related files
- Supported: `*.instructions.md`, `*.prompt.md`, `*.agent.md`, `SKILL.md`
- All preservation and binding details determined automatically

### Workflow Phases
**Phase 1: Analysis** (Auto) - Inspect targets and relationships
**Phase 2: Planning** (Auto) - Propose minimal harmonization edits
**Phase 3: Implementation** (Auto) - Apply harmonization while preserving content
**Phase 4: Verification** (Auto, if VALIDATE=true) - Validate links, handoffs, and schema
**Phase 5: Documentation** (Auto) - Summarize changes and link map (before/after)

### Generation Gate
Respond with:
- File analysis
- Cross-reference points
- Content change % estimate
- Validation plan (if VALIDATE=true)
- `ready-to-harmonize`

Wait for `confirm`.

### Output Requirements
1. File analysis report
2. Harmonization plan
3. **Harmonized files** (MANDATORY - all saved)
4. Validation results (if VALIDATE=true)
5. Change summary
6. Success confirmation with paths

### Preservation Levels
- **Minimal** (conservative mode): <5% change
- **Medium** (standard mode): <10% change
- **Maximum**: <15% change (requires explicit approval)

### Refinement Commands
- `refine: preserve` - Minimize changes
- `refine: bind` - Strengthen connections
- `refine: minimal` - Reduce footprint
- `refine: scope` - Adjust ASSETS list
- `refine: validation` - Tighten link/handoff checks (when VALIDATE=true)

### Quality Checklist
- [ ] All files written
- [ ] Cross-references resolve
- [ ] Change % within limits
- [ ] Original intent preserved
- [ ] Validation passed (if enabled)
- [ ] Handoff chains verified (if enabled)

*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*
*VS Code: [Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)*

**Generated using**: [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md)

---

## Audit
Last invoked: [Manual log]
Change history: v1.1 (2026-01-14) - Merged with HarmonizeAndValidate, added VALIDATE mode | v1.0 (2026-01-14) - Added traceability
