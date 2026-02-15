---
description: Comprehensive Copilot customization asset audit with gap analysis and recommendations
argument-hint: Provide the path to the repository to review
agent: CopilotCustomizer
---

```
✨ PROMPT ACTIVATED: RepoReview (Repository Analysis)
   Purpose: Comprehensive repository asset analysis
   Agent: CopilotCustomizer (interactive mode)
   Skills Engaged: repo-analysis
   Input Required: Target repository path
   Functions: Asset audit, gap analysis, recommendations
   Output Format: Analysis report with improvement suggestions
   Refinement: Supports refine commands for focused analysis
```

**Paired Instructions**: [RepoReview.instructions.md](../instructions/RepoReview.instructions.md)

### Task Intent
Audit Copilot assets → generate analysis via `templates/Analysis.template.md` → save to `output/`.

### Variable Block
---
**Target Path** [REQUIRED]: ${input:targetPath:Absolute path to target repository}
**Focus Area** [OPTIONAL]: ${input:focusArea:e.g., agents, security, all (default: all)}
---

### Output Requirements
Use `templates/Analysis.template.md` format:
- Save to: `output/<repo> - Repo Review - <date>.md`
- Include ready-to-run generator prompts for each asset type
- Priority levels: High/Med/Low with concrete improvement examples

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: enforce-output` | Validate output compliance |
| `refine: risks` | Expand risk analysis |

**Generated using**: [RepoReview.instructions.md](../instructions/RepoReview.instructions.md)

---

*VS Code Copilot Customization Framework v1.0*
