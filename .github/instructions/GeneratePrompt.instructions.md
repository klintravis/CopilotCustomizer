---
applyTo: '.github/**/*.prompt.md'
description: 'Standardized, modular approach for building high-quality prompt files that pair with custom agents and instruction files'
---

<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: GeneratePrompt Instructions (Instructions) v1.0
   STATUS: Instructions Applied — Context loaded
════════════════════════════════════════════════════════════════════════════ -->

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

### Required Banner
After YAML front matter, include the invocation alert:
```markdown
<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: {PromptName} Prompt (Prompt) v{version}
   STATUS: Prompt Ready — Awaiting execution
════════════════════════════════════════════════════════════════════════════ -->
```

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
- [ ] Output aligns with agent schema
- [ ] Risk items include mitigations

### Output Requirements
- Save to: `CopilotCustomizer/output/prompts/`
- Pattern: `<name> - prompt - <YYYY-MM-DD>.md`
- Include: `OutputPath`, `GeneratedAt`, `SourceInstruction`, `Type: prompt`
- Must include ready-to-run example with resolved inputs

**Log Entry Format**:
```
[YYYY-MM-DD HH:MM:SS UTC] - Invoked by: {user/system} | Context: {brief description}
```

**Recent Invocations**:
_Manual logging - update this section when invoked_
- [2026-01-14] Added traceability system

### Usage Guidelines
- This asset should be invoked when: Instructions-specific workflows are needed
- Expected outcome: Execution of GeneratePrompt Instructions functionality
- Related assets: See related instructionss in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---

---

## Audit
Last invoked: [Manual log]
Change history: v1.0 (2026-01-14) - Added traceability
