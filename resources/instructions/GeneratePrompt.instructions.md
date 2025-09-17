---
applyTo: '**/*.prompt.md'
description: 'Standardized, modular approach for building high-quality prompt files that pair with chat modes and instruction files'
---

## Ultimate Prompt File Authoring Guide (Comprehensive Harmony v1.0-h1)

<!-- Harmony Metadata -->
**Harmonization Metadata**: schemaVersion: "1.0" | harmonizationDate: "2025-09-15" | bindingStrength: "standard"  
**Harmonized Assets**: GeneratePrompt.instructions.md, NewPrompt.prompt.md

### Harmonized Assets
**Paired Prompt**: [NewPrompt.prompt.md](../prompts/NewPrompt.prompt.md) - Meta prompt generator for creating new prompt files  
**Related Assets**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization framework  
**Asset Ecosystem**: Part of 16-asset Copilot customization framework

**Binding Version**: harmony-v1.0  
**Last Harmonized**: 2025-09-15  
**Preservation Level**: medium

Binding:
- Chat Mode: `chatmodes/CopilotCustomizer.chatmode.md`
- Prompts should declare their paired instructions (by purpose) and default to this chat mode.

### Purpose
Provide a standardized, modular approach for building high-quality `*.prompt.md` files that pair with chat modes & instruction files to deliver consistent, reproducible interaction patterns across varied project domains.

### Core Principles
1. Single Responsibility: each prompt file focuses on a task archetype (planning, refactor, generate tests, analyze risks).
2. Declarative Variables: expose editable placeholders clearly (quoted or fenced) with validation hints.
3. Confirmation Gate: require explicit user confirmation before expensive/long generation.
4. Iterative Refinement: advertise supported refinement commands (mirrors chat mode capabilities).
5. Token Efficiency: layered detail—short header + expandable context blocks.
6. Safety & Guardrails: avoid embedded secrets, flag assumptions.

### Prompt File Standard Sections
| # | Section | Purpose | Notes |
|---|---------|---------|-------|
| 1 | Mode Header | Optional `mode: ask` or custom use hint | Keep minimal |
| 2 | Task Intent | One-line outcome statement | Avoid ambiguity |
| 3 | Usage Instructions | How user fills variables & triggers workflow | Bullets |
| 4 | Variable Block | Editable placeholders with descriptive names | Use braces {} |
| 5 | Validation Hints | Remind constraints, formats | Optional if obvious |
| 6 | Generation Gate | Instruction to wait for `confirm` | Prevent premature run |
| 7 | Refinement Commands | Post-output adjustment options | Sync with chat mode |
| 8 | Internal Quality Checklist | Self-check before model outputs | Hidden vs shown—choose |
| 9 | Example Filled Prompt | Concrete sample | Keep concise |
|10 | Notes / Tips | Domain nuances | Optional |

### Variable Naming Conventions
- UPPER_SNAKE for critical structural variables (e.g., `{PRIMARY_GOAL}`).
- PascalCase for optional nuance (e.g., `{TargetAudience}`).
- Use `{DEPTH_MODE}` when integrating depth behavior.
- Provide fallback semantics: indicate `(optional)` inline.

### Placeholder Block Template
```markdown
---
Task: "{PRIMARY_GOAL}"
Context Summary: "{CONTEXT_SUMMARY}"  # 1–3 sentences
Key Constraints: "{CONSTRAINTS}"  # comma-separated
Primary Stakeholders: "{STAKEHOLDERS}"  # names/roles
Depth Mode (quick|standard|deep|auto): {DEPTH_MODE}
Success Criteria: "{SUCCESS_CRITERIA}"  # measurable list
Known Risks (optional): "{KNOWN_RISKS}"  
Refinement Focus (optional): "{REFINEMENT_FOCUS}"  # area to emphasize
---
```

### Internal Quality Checklist (Model Should Ensure Before Output)
- All mandatory variables set (PRIMARY_GOAL, SUCCESS_CRITERIA or ask).
- Clarifying questions generated if gaps detected.
- No unqualified placeholders remain (avoid raw `{VAR}` in final output).
- Output sections align with schema of paired chat mode.
- Risk items include mitigation statements (if risks domain involved).

### Validation Pattern
If a required variable missing or extremely short (<4 chars), list `Missing Inputs:` and halt generation with targeted prompts.

### Refinement Command Examples
| Command | Use Case |
|---------|----------|
| refine: concise | Produce compressed summary variant |
| refine: expand | Add deeper explanations/examples |
| refine: risks | Rebuild only risk section with prioritization |
| refine: timeline | Recalculate sequencing & dependencies |

### Anti-Patterns
- Embedding model-specific API keys or secrets.
- Hard-coding excessive narrative instead of structured lists.
- Excess nested quoting causing token waste.
- Redundant repetition of instructions already covered by chat mode.

### Token Efficiency Techniques
- Use hyphen lists over paragraphs.
- Reserve fenced code blocks for actual code or variable blocks.
- Collapse meta explanations behind refinement commands instead of initial output.

### Governance & Versioning
Each prompt file should indicate version in title (e.g., `(v1.0)`). Increment minor when adding variables; major when altering core output pattern.

### Quick Authoring Checklist
1. Define task intent (≤15 words).
2. Identify required vs optional variables.
3. Draft variable block with annotations.
4. Add confirmation gate language.
5. Map output sections to related chat mode schema.
6. Add refinement command list.
7. Include an example filled prompt.
8. Add internal quality checklist.
9. Validate token efficiency (scan for redundancy).
10. Add version + change log reference.

### Paired Prompt Execution
**Recommended Workflow**:
1. Execute [NewPrompt.prompt.md](../prompts/NewPrompt.prompt.md) to generate domain-specific prompts
2. Review output against this instructions file standards
3. Apply refinement commands as needed for optimization
4. Validate cross-references and harmonization compliance

### Binding References
- **Execution Prompt**: [NewPrompt.prompt.md](../prompts/NewPrompt.prompt.md) - Meta prompt generator
- **Framework**: [CopilotCustomizer.chatmode.md](../chatmodes/CopilotCustomizer.chatmode.md) - Core customization architecture
- **Standards**: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md) - Output formatting compliance

### Optional Automation
Consider a simple check to ensure placeholders are declared/used and titles include version `(vX.Y)`.

### Summary
This guide enables rapid, standardized authoring of reusable prompt files that coordinate cleanly with chat modes and instructions while preserving clarity, safety, and efficiency.

### Output Enforcement (ENFORCED)
- All generated `*.prompt.md` artifacts MUST be saved to `CopilotCustomizer/output/prompts/`.
- File name pattern: `<repo-or-folder-name> - prompt - <YYYY-MM-DD>.md`. Example: `CopilotCustomizer - prompt - 2025-09-13.md`.
- Required front-matter keys: `OutputPath`, `GeneratedAt`, `SourceInstruction`, `Type: prompt`.
- `OutputPath` must be the relative repository path, e.g. `CopilotCustomizer/output/prompts/CopilotCustomizer - prompt - 2025-09-13.md`.
- Each generated prompt artifact MUST include a `Ready-to-run` example that references any source prompt files in `CopilotCustomizer/.github/prompts/` (if those mirrors exist) and a fully resolved example input block so the prompt can be copy/paste

### Standards Compliance & Processing Metadata

**VS Code Copilot Compliance**: Custom Instructions Schema - Full compliance achieved  
**Schema Requirements**: 
- ✅ Required `applyTo` field in YAML front matter (`**/*.prompt.md`)
- ✅ Optional `description` field for hover text functionality
- ✅ Markdown body with clear prompt authoring guidelines
- ✅ Documentation sources referenced per schema guidelines

**Standards Sources**: 
- [VS Code Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot/customization/)

**Processing Metadata**:
- **Standards Version**: VS Code Copilot v2025.09 (Custom Instructions latest)
- **Harmonization**: comprehensive-harmony-v1.0 (enhanced cross-references)
- **Content Preservation**: 100% functionality maintained with enhanced standards
- **Formatting Applied**: 2025-09-15 | Standards compliance verified

### Conformance Note
This instruction file aligns with the broader Copilot customization ecosystem and integrates with [NewPrompt.prompt.md](../prompts/NewPrompt.prompt.md) for execution workflow. Focuses on maintainable, high-quality prompt file generation following established patterns.

---
*Generated and formatted following VS Code GitHub Copilot official documentation standards*