---
description: Create a new VS Code prompt file (slash command) with variables and validation
argument-hint: Describe the domain and goal for this prompt
agent: CopilotCustomizer
---

```
✨ PROMPT ACTIVATED: NewPrompt (Asset Generator)
   Purpose: Create VS Code slash command prompts
   Standard: VS Code (.prompt.md with variable blocks)
   Instructions: PromptAuthoring.instructions.md
   Input: DOMAIN, GOAL
   Output: Complete .prompt.md with variables, usage, and validation
   Scope: VS Code Copilot slash commands
```

**Paired Instructions**: [PromptAuthoring.instructions.md](../instructions/PromptAuthoring.instructions.md)

### Task Intent
Generate `*.prompt.md` files.

### Variable Block
---
**Domain** [REQUIRED]: ${input:domain:e.g., React frontend, Node.js API, Python ML}
**Goal** [OPTIONAL]: ${input:goal:What should this prompt accomplish?}
---

### Validation Rules
- Required: `domain`
- Optional (inferred from domain and context if omitted): `goal`
- All other details (variables, output sections, refinement commands) inferred from domain and goal

### Generation Gate
Respond first with either:
- A list of clarifying questions (if any required fields weak or missing), or
- `ready-to-generate` and a compact summary of intended structure.
Only after I reply `confirm` should you output the full prompt file markdown.

### Output Requirements
Generate complete `*.prompt.md` with:
- Mode line, Title, Task Intent, Usage, Variable Block, Clarification, Output Specification, Refinement Commands, Quality Checklist, Example, Version Note
- Default refinement: `refine: concise`, `refine: expand`, `refine: optimize`, `refine: risks`

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: concise` | Compress output |
| `refine: expand` | Add details |
| `refine: optimize` | Remove redundancy |

**Generated using**: [PromptAuthoring.instructions.md](../instructions/PromptAuthoring.instructions.md)

---

*VS Code Copilot Customization Framework v1.0*