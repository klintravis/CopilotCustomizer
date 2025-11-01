---
applyTo: '**/*.prompt.md'
description: 'Standardized, modular approach for building high-quality prompt files that pair with chat modes and instruction files'
---

## Prompt File Authoring Guide (v1.0)

**Paired Prompt**: [NewPrompt.prompt.md](../prompts/NewPrompt.prompt.md)

### Purpose
Standardized approach for building `*.prompt.md` files that pair with chat modes and instructions.

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
| Mode Header | Optional `mode: ask` |
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

### Quality Checklist
- [ ] All mandatory variables set
- [ ] No unqualified placeholders
- [ ] Output aligns with chat mode schema
- [ ] Risk items include mitigations

### Output Requirements
- Save to: `CopilotCustomizer/output/prompts/`
- Pattern: `<name> - prompt - <YYYY-MM-DD>.md`
- Include: `OutputPath`, `GeneratedAt`, `SourceInstruction`, `Type: prompt`
- Must include ready-to-run example with resolved inputs

*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*  
*Standards: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md)*  
*VS Code: [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)*