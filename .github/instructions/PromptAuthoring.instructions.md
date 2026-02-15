---
applyTo: '.github/**/*.prompt.md'
description: 'Standardized, modular approach for building high-quality prompt files that pair with custom agents and instruction files'
---

## Prompt File Authoring Guide (v1.1)

**Paired Prompt**: [NewPrompt.prompt.md](../prompts/NewPrompt.prompt.md)

### Purpose
Standardized approach for building `*.prompt.md` files that pair with custom agents and instructions.

### Core Principles
1. Single responsibility per prompt
2. Declarative `${input:}` variables with [REQUIRED]/[OPTIONAL] labels
3. Minimize mandatory inputs — prefer inference from context
4. Confirmation gate before generation
5. Iterative refinement commands
6. Token efficiency
7. Safety and guardrails

### Standard Sections
| Section | Purpose |
|---------|--------|
| YAML Frontmatter | `description`, `argument-hint`, `agent`, `model`, `tools` |
| Task Intent | One-line outcome |
| Variable Block | `${input:}` placeholders with [REQUIRED]/[OPTIONAL] labels |
| Generation Gate | Wait for `confirm` before generating |
| Refinement Commands | Post-output adjustments |
| Example | Concrete sample |

### Frontmatter Schema
All fields optional. Recommended minimum: `description` and `agent`.

```yaml
---
description: Short description shown in slash command picker
argument-hint: Hint text shown in chat input field to guide users
agent: CopilotCustomizer  # or: ask, agent, plan, custom agent name
model: # language model override (optional)
tools: # list of tool/tool set names (optional)
---
```

- `name`: Override slash command name (defaults to filename if omitted)
- `description`: Shown in command picker — always include
- `argument-hint`: Guides users on what to type after the slash command

### Variable Syntax
Use VS Code `${input:variableName:placeholder}` for user-provided values:
- **Required**: `${input:variableName:placeholder hint}`
- **Optional**: `${input:variableName:optional — default description}`
- Minimize mandatory inputs — prefer inference from repo context
- Use `---` delimiters (NOT code fences) so VS Code processes variables
- Use camelCase for variable names (e.g., `targetPath`, `agentName`)
- Reference tools in body text with `#tool:toolName` syntax

### Variable Template
```markdown
---
**Primary Goal** [REQUIRED]: ${input:primaryGoal:What should this accomplish?}
**Context** [OPTIONAL]: ${input:context:1-3 sentences of background}
**Constraints** [OPTIONAL]: ${input:constraints:Any limitations or requirements}
**Depth Mode** [OPTIONAL]: ${input:depthMode:quick, standard, or deep (default: standard)}
---
```

### Validation
If a required `${input:}` variable is empty or missing (<4 chars), list `Missing Inputs:` and halt with targeted prompts. Optional variables should be silently inferred from context when omitted.

### Refinement Commands
- `refine: concise` - Compressed summary
- `refine: expand` - Deeper detail
- `refine: risks` - Risk section rebuild
- `refine: timeline` - Sequencing recalculation

### Standards Integration

When generating this asset type, integrate matched enterprise standards via [Standards.instructions.md](Standards.instructions.md). Weave principles naturally into the generated content without verbatim copying or direct references to `.github/standards/`.

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

## Change History

| Version | Date | Changes |
|---------|------|---------||
| v1.0 | 2026-01-15 | Initial release |

---
*Generated following VS Code Copilot prompt file standards*