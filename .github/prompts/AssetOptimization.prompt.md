mode: ask
## Asset Optimization Prompt (v1.0)

Chat Mode Binding: `chatmodes/CopilotCustomizer.chatmode.md`
Paired Instructions: `instructions/GeneratePrompt.instructions.md`

**Task Intent**: Review and optimize VS Code Copilot customization assets while preserving existing links, hard references, and basic structural integrity.

### Usage Instructions
1. Provide the asset file path and specify optimization focus areas.
2. Respond to clarifiers or `ready-to-generate`; then reply `confirm` for optimization.
3. Use refinement commands to adjust preservation vs optimization balance.
4. Review generated output for link integrity before implementation.

### Variable Block
---
**Asset Path** [REQUIRED]: "{ASSET_PATH}"
**Asset Type** (auto-detected | chatmode/instructions/prompt/agent): "{ASSET_TYPE}"
**Optimization Focus** (clarity/efficiency/structure/compliance/all): "{OPTIMIZATION_FOCUS}"
**Preserve Sections** (comma list | default: all critical sections): "{PRESERVE_SECTIONS}"
**Quality Emphasis** (clarity/concise/completeness/balanced | default: balanced): "{QUALITY_EMPHASIS}"
**Output Format** (replace-file/diff/suggestions | default: replace-file): "{OUTPUT_FORMAT}"
---

### Validation Rules
- Required: `{ASSET_PATH}` must exist and be readable
- Auto-detect `{ASSET_TYPE}` from file extension and content patterns
- Default `{OPTIMIZATION_FOCUS}` to "all" if not specified
- Preserve all existing chat mode bindings, instruction references, and cross-file links
- Maintain version compatibility and schema requirements
- Validate that optimization doesn't break paired relationships

### Generation Gate
Before optimization, respond with:
- Asset type detection and current structure analysis
- Identified links/references that must be preserved  
- Proposed optimization areas and potential risks
- `ready-to-generate` confirmation request

Only proceed with full optimization after explicit `confirm`.

### Output Requirements (On Confirm)
**For Chat Modes** (`*.chatmode.md`):
- Preserve: description, schemaVersion, depthModes, refinementCommands
- Optimize: role clarity, workflow sections, audit dimensions table
- Maintain: all external documentation links and examples

**For Instructions** (`*.instructions.md`):
- Preserve: version numbers, paired prompt references, enforcement rules
- Optimize: section organization, token efficiency, clarity
- Maintain: template references and generator prompt paths

**For Prompts** (`*.prompt.md`):
- Preserve: mode, chat mode binding, paired instructions references
- Optimize: variable block clarity, validation rules, examples
- Maintain: task intent and output requirements structure

**For Agent Files** (`AGENTS.md`, `.agent.md`):
- Preserve: build commands, security notes, existing workflow references
- Optimize: actionability, organization, conflict resolution guidance
- Maintain: directory-specific configurations and tool references

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: preserve-refs` | Re-validate all links and references are intact |
| `refine: structure` | Focus on organizational improvements while maintaining compatibility |
| `refine: optimize` | Enhance token efficiency and clarity without breaking functionality |
| `refine: validate` | Check schema compliance and paired asset alignment |

### Quality Checklist
- [ ] All existing links and references preserved and functional
- [ ] Asset type-specific requirements maintained (front-matter, sections, etc.)
- [ ] Paired relationships with other assets remain intact
- [ ] Version numbers and schema compatibility preserved
- [ ] No broken cross-references or missing dependencies
- [ ] Optimization improves readability without losing functionality
- [ ] Original structural patterns maintained where critical
- [ ] External documentation links remain valid

### Example Usage
```
{ASSET_PATH}=c:\Source\CopilotWorkShop\instructions\RepoReview.instructions.md
{ASSET_TYPE}=instructions
{OPTIMIZATION_FOCUS}=clarity,efficiency
{PRESERVE_SECTIONS}=Variable Block,Output Requirements,Quality Checklist
{QUALITY_EMPHASIS}=balanced
{OUTPUT_FORMAT}=replace-file
```

### Risk Mitigation Notes
**High Risk Areas**:
- Chat mode bindings and instruction pairings - validate all references
- Version dependencies - ensure compatibility is maintained
- Template and generator prompt paths - verify all links work
- External documentation URLs - check accessibility

**Fallback Behaviors**:
- If link validation fails, preserve original and note for manual review
- If structural changes break schema, revert to minimal optimization
- If paired asset conflicts detected, request user clarification
- If external dependencies unavailable, document assumptions made

### Notes & Tips
- Always backup original before optimization when using replace-file mode
- Use diff mode for review before implementing changes
- Focus on token efficiency improvements that don't sacrifice clarity
- Maintain Harmony pattern alignment across related assets
- Test paired relationships after optimization

### Version Note
Asset Optimization Prompt v1.0 - Specialized for VS Code Copilot customization asset enhancement while preserving critical references and structural integrity.

### Conformance Note
This prompt follows the schema and guidelines specified in `instructions/GeneratePrompt.md` with specialized focus on asset preservation and optimization balance.