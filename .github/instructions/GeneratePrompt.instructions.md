---
applyTo: '.github/**/*.prompt.md'
description: 'Standardized, modular approach for building high-quality prompt files that pair with custom agents and instruction files'
---

## Prompt File Authoring Guide (v1.0)

**Paired Prompt**: [NewPrompt.prompt.md](../prompts/NewPrompt.prompt.md)

### Purpose
Standardized approach for building `*.prompt.md` files that pair with custom agents and instructions.

### Core Principles
1. Single responsibility per prompt
2. Declarative variables with validation
3. Confirmation gate before generation
4. Iterative refinement commands
5. Token efficiency
6. Safety and guardrails

### Standard Sections
| Section | Purpose |
|---------|--------|
| Agent Context | Optional agent-specific hints; works with current selected agent |
| Task Intent | One-line outcome |
| Usage Instructions | How to fill variables |
| Variable Block | Editable placeholders |
| Generation Gate | Wait for `confirm` |
| Refinement Commands | Post-output adjustments |
| Example | Concrete sample |

### Variable Template
```markdown
---
Task: "{PRIMARY_GOAL}"
Context: "{CONTEXT_SUMMARY}"  # 1-3 sentences
Constraints: "{CONSTRAINTS}"
Stakeholders: "{STAKEHOLDERS}"
Depth Mode: {DEPTH_MODE}
Success Criteria: "{SUCCESS_CRITERIA}"
---
```

### Validation
If required variable missing (<4 chars), list `Missing Inputs:` and halt with targeted prompts.

### Refinement Commands
- `refine: concise` - Compressed summary
- `refine: expand` - Deeper detail
- `refine: risks` - Risk section rebuild
- `refine: timeline` - Sequencing recalculation

### Standards Integration

When generating prompt files, check for matched enterprise standards (via [ResolveStandards.instructions.md](ResolveStandards.instructions.md)):

- **Validation rules**: Derive validation checks from matched standards. If standards require public API documentation, add a validation rule that checks for doc comments.
- **Quality checks**: Align quality criteria with standards requirements. If code review standards set PR size limits, prompt quality checks should reflect scope constraints.
- **Never** reference `.github/standards/` in generated prompt files

### Quality Checklist
- [ ] All mandatory variables set
- [ ] No unqualified placeholders
- [ ] Output aligns with agent schema
- [ ] Risk items include mitigations

### Output Requirements
- Save to: `CopilotCustomizer/output/prompts/`
- Pattern: `<name> - prompt - <YYYY-MM-DD>.md`
- Include: `OutputPath`, `GeneratedAt`, `SourceInstruction`, `Type: prompt`
- Must include ready-to-run example with resolved inputs

---
*Generated following VS Code Copilot prompt file standards*