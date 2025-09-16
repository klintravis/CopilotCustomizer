---
mode: CopilotCustomizer
---

# NewChatmode.prompt.md

## Chat Mode Generator Prompt (Comprehensive Harmony v2.0-h1)

<!-- Harmony Metadata -->
**Schema Compliance**: VS Code Prompt Files Schema v1.0  
**Harmonization Metadata**: schemaVersion: "1.0" | harmonizationDate: "2025-01-27" | bindingStrength: "standard"  
**Harmonized Assets**: GenerateChatmode.instructions.md, NewChatmode.prompt.md

### Harmonized Assets
**Paired Instructions**: [GenerateChatmode.instructions.md](../instructions/GenerateChatmode.instructions.md) - Comprehensive chat mode generation workflow and standards  
**Related Assets**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization framework  
**Asset Ecosystem**: Part of 16-asset Copilot customization framework (see Asset Reference Matrix)

**Harmonization**: comprehensive-harmony-v2.0 (enhanced cross-references)  
**Binding Strength**: standard | **Preservation Level**: medium  
**Content Changes**: <10% (YAML front matter + cross-references)

### Chat Mode Binding
`chatmodes/CopilotCustomizer.chatmode.md` - Framework integration point

### Task Intent
Generate new, high-quality `*.chatmode.md` persona files aligned with Comprehensive Harmony conventions, including role, workflow, depth modes, refinement commands, guardrails, and quality checklist.

### Usage Instructions
1. Review [GenerateChatmode.instructions.md](../instructions/GenerateChatmode.instructions.md) for complete workflow
2. Fill the Variable Block below and send
3. Respond to clarifiers or `ready-to-generate`; then reply `confirm` for file generation
4. Apply refinement commands to iterate and optimize output

### Variable Block (Only two required; others inferred if omitted)
---
Persona Name (Title Case) [REQUIRED]: "{PERSONA_NAME}"
Primary Objective (≤30 words) [REQUIRED]: "{PRIMARY_OBJECTIVE}"
Short Description (≤15 words | default: compressed name + focus): "{SHORT_DESCRIPTION}" 
Primary Domain (default: inferred from objective keywords): "{PRIMARY_DOMAIN}"
Core Capabilities (comma list | default: verbs extracted from objective): "{CORE_CAPABILITIES}"  
Depth Modes (quick|standard|deep|none | default: standard): {DEPTH_MODES}
Refinement Commands (comma list | default: refine: concise,refine: optimize,refine: expand,refine: risks): "{REFINEMENT_COMMANDS}"  
Key Guardrails (comma list | default: missing-info-query,conflict-flag,hallucination-avoidance): "{KEY_GUARDRAILS}"  
Must Include Sections (ordered | default: schema standard): "{MUST_SECTIONS}"  
Optional Sections (default: Example Interaction): "{OPTIONAL_SECTIONS}"  
Tools Array (JSON | default: []): {TOOLS_ARRAY}
Version Tag (default: v1.0): "{VERSION_TAG}"  
Risk Sensitivity (low|medium|high | default: medium): {RISK_SENSITIVITY}
Token Economy Priority (brevity|balance|detail | default: balance): {TOKEN_PRIORITY}
Related Instructions File (default: GenerateChatmode.instructions.md): "{RELATED_INSTRUCTIONS}"  
Related Prompt File (default: none): "{RELATED_PROMPT}"  
---

### Validation Rules
- Only `{PERSONA_NAME}` and `{PRIMARY_OBJECTIVE}` are mandatory
- Derive `{SHORT_DESCRIPTION}` if missing; extract up to 6 `{CORE_CAPABILITIES}` from objective
- Infer `{PRIMARY_DOMAIN}` (or `general`), apply default `{MUST_SECTIONS}`, `{REFINEMENT_COMMANDS}`, and `v1.0` when missing
- If `{KEY_GUARDRAILS}` absent → use standard triad
- Capabilities >8 → ask to prune or auto-trim (first 8) with notice
- `{DEPTH_MODES}`=none → omit Depth Modes section & key
- `{RISK_SENSITIVITY}`=high → add risk stanza in Guardrails
- `{TOKEN_PRIORITY}`=brevity → compression rules enforced
- Section ordering must match [GenerateChatmode.instructions.md](../instructions/GenerateChatmode.instructions.md); conflicting inputs → clarifiers

### Generation Gate
Return clarifying questions OR `ready-to-generate` + bullet summary of planned sections. Wait for `confirm` before emitting final markdown.

### Default Must Sections (If Omitted)
Role, Objectives, Workflow, Depth Modes, Refinement Commands, Guardrails, Output Patterns, Quality Checklist, Governance & Versioning, Example Interaction, Final Notes.

### Default Refinement Commands (If Not Provided)
`refine: concise`, `refine: optimize`, `refine: expand`, `refine: risks`

### Output Requirements (On Confirm)
Produce a complete `*.chatmode.md` file containing:

1. **Front Matter Keys**: `description`, `schemaVersion`, optional `depthModes`, `refinementCommands`, `tools`
2. **Header**: `## Copilot ChatMode: {PERSONA_NAME}`
3. **Role** (tight single paragraph or bullets)
4. **Objectives / Capabilities** list
5. **Workflow** (numbered deterministic iteration loop)
6. **Depth Modes** table (omit if none)
7. **Refinement Commands** table (with action column)
8. **Guardrails** (list + conditional risk enhancements)
9. **Output Patterns** (expected section skeletons / formats)
10. **Compression / Token Strategy** (if token priority not detail)
11. **Quality Checklist** (pre-output verification)
12. **Governance & Versioning** (version tag only)
13. **Example Interaction** (abbreviated)
14. **Final Notes / Extensibility** guidance
15. **Conformance Statement**: Indicate alignment with [GenerateChatmode.instructions.md](../instructions/GenerateChatmode.instructions.md) schema

### Internal Quality Checklist (Model Before Emitting)
- [ ] All declared or inferred capabilities appear somewhere in Objectives / Workflow
- [ ] Any inferred values are internally consistent (no contradictions with provided inputs)
- [ ] No unreferenced refinement commands
- [ ] Guardrails cover missing info, conflicts, compliance, hallucination avoidance
- [ ] Depth modes consistent with provided or inferred value
- [ ] Version tag present (default if inferred) in description or closing note
- [ ] No dangling `{VAR}` placeholders
- [ ] Cross-references to [GenerateChatmode.instructions.md](../instructions/GenerateChatmode.instructions.md) functional

### Compression Rules (if `{TOKEN_PRIORITY}`=brevity)
- Remove narrative; keep tables & bullets
- ≤1-line section intros
- Merge Output Patterns + Example

### Example (Minimal Input → Auto-Inferred)
```
{PERSONA_NAME}=Refactor Strategist
{PRIMARY_OBJECTIVE}=Guide structured, low-risk refactors with dependency awareness
```
Auto-inferred (illustrative):
- SHORT_DESCRIPTION ⇒ "Refactor planning assistant"
- CORE_CAPABILITIES ⇒ analyze-structure,detect-smells,propose-phased-changes,estimate-risk
- PRIMARY_DOMAIN ⇒ refactoring
- VERSION_TAG ⇒ v1.0
- MUST_SECTIONS ⇒ default schema
- REFINEMENT_COMMANDS ⇒ refine: concise,refine: optimize,refine: expand,refine: risks

### Refinement Commands (Meta-Level)
| Command | Action |
|---------|--------|
| `refine: concise` | Compress sections and remove redundancy |
| `refine: optimize` | Remove redundancy; tighten workflow steps |
| `refine: expand` | Provide deeper capability explanations |
| `refine: risks` | Enhance risk & guardrail subsections |

### After Generation
Adjust variables or issue refinement commands to iterate improved persona versions.

### Paired Prompt Execution
**Recommended Workflow**:
1. Execute this prompt (NewChatmode.prompt.md) to generate chat mode file
2. Review output against [GenerateChatmode.instructions.md](../instructions/GenerateChatmode.instructions.md) standards
3. Apply refinement commands as needed for optimization
4. Validate cross-references and harmonization compliance

### Binding References
- **Instructions**: [GenerateChatmode.instructions.md](../instructions/GenerateChatmode.instructions.md) - Complete generation workflow
- **Framework**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization architecture
- **Standards**: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) - Output formatting compliance

### Standards Compliance & Processing Metadata

**VS Code Copilot Compliance**: Prompt Files Schema - Full compliance achieved  
**Schema Requirements**: 
- ✅ Required `mode` field in YAML front matter (ask/agent/generate)
- ✅ Markdown body with clear usage instructions and variable blocks
- ✅ Documentation sources referenced per schema guidelines

**Standards Sources**: 
- [VS Code Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot/customization/)

**Processing Metadata**:
- **Standards Version**: VS Code Copilot v2025.01 (Prompt Files latest)
- **Harmonization**: comprehensive-harmony-v2.0 (enhanced cross-references)
- **Content Preservation**: 100% functionality maintained with enhanced standards
- **Formatting Applied**: 2025-01-27 | Standards compliance verified

### Summary
This generator prompt accelerates creation of consistent, auditable chat modes aligned with Comprehensive Harmony schema and governance practices. Integrates seamlessly with the complete Copilot customization asset ecosystem.

---

**Harmonization Applied**: 2025-01-27 | **Asset Integration**: 16-file ecosystem  
**Cross-References**: Enhanced with bidirectional binding | **Schema**: VS Code v1.0 compliant  

*Generated and formatted following VS Code GitHub Copilot official documentation standards*
