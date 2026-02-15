---
description: Create a new VS Code custom instruction file with coding standards and patterns
argument-hint: Describe the domain for these instructions
agent: CopilotCustomizer
---

```
✨ PROMPT ACTIVATED: NewInstructions (Asset Generator)
   Purpose: Create VS Code custom instruction files
   Standard: VS Code (.instructions.md with applyTo scoping)
   Instructions: InstructionAuthoring.instructions.md
   Input: DOMAIN, OBJECTIVE
   Output: Complete .instructions.md with coding standards and patterns
   Scope: VS Code-specific (auto-applies to matching files)
```

**Paired Instructions**: [InstructionAuthoring.instructions.md](../instructions/InstructionAuthoring.instructions.md)

### Task Intent
Generate `*.instructions.md` files.

### Variable Block
---
**Domain** [REQUIRED]: ${input:domain:e.g., React frontend, Node.js API, Python ML}
**Objective** [OPTIONAL]: ${input:objective:What should these instructions enforce?}
---

### Validation Rules
- Required: `domain`
- Optional (inferred from domain and context if omitted): `objective`
- All other details (tech stack, security level, sections, refinement commands) inferred from domain and objective

### Generation Gate
First respond with clarifying questions OR `ready-to-generate` + structure summary. Do not output full instructions before explicit `confirm` response.

### Output Requirements
Generate complete `*.instructions.md` with:
- Front Matter (`applyTo` required), Title, Context, Objective, Tech Stack, Coding Standards, Security (conditional), Testing, Tooling, Documentation, Review Criteria, Refinement Commands, Change Management
- Default refinement: `refine: concise`, `refine: expand`, `refine: security`, `refine: performance`

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: concise` | Compress output |
| `refine: expand` | Add details |
| `refine: security` | Enhance security section |

**Generated using**: [InstructionAuthoring.instructions.md](../instructions/InstructionAuthoring.instructions.md)

### After Generation
Issue refinement commands or tweak variables and resend to regenerate.

---

*VS Code Copilot Customization Framework v1.0*
