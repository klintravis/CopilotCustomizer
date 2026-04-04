---
description: Create a new VS Code prompt file (slash command) with variables and validation
argument-hint: Describe the domain and goal for this prompt
agent: CopilotCustomizer
name: NewPrompt
tools: ['execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
---

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

### Discovery Phase

Before generating, ask:
1. **What triggers this prompt?** — "What situation makes someone reach for this command?"
2. **What's the output?** — "Code files? A report? Configuration?"
3. **How often?** — "Daily workflow or occasional task?"

### Reasoning in Output
Explain variable choices and suggest improvements:
- "I made `targetPath` required because every invocation needs a starting point"
- "Added `depth` as optional because most runs work fine with the default"
- "Want to add more variables or simplify?"

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

### Example Invocations

**Create a deployment automation prompt**:
```
/NewPrompt purpose: "Automate deployment workflow", agent: "DeploymentAgent"
```

**Create a code review prompt**:
```
/NewPrompt purpose: "Security-focused code review"
```

**Create a refactoring prompt**:
```
/NewPrompt purpose: "Extract components for better modularity", agent: "Refactor"
```

**Generated using**: [PromptAuthoring.instructions.md](../instructions/PromptAuthoring.instructions.md)

---

*VS Code Copilot Customization Framework v1.0*