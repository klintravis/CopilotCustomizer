---
name: Review
description: Comprehensive Copilot customization asset audit with gap analysis and recommendations
agent: CopilotCustomizer
tools: ['execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
argument-hint: Provide the path to the repository to review
---

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

## Workflow Phases

**Phase 1: Discovery** (Auto) — Scan repository, inventory assets, analyze workflows
**Phase 2: Priority Check** (Interactive) — Present top findings, ask: "What matters most to you? Testing? Security? Workflow automation? Or should I prioritize everything equally?"
**Phase 3: Deep Analysis** (Auto) — Focus analysis on user's stated priorities using asset-audit skill
**Phase 4: Recommendations** (Interactive) — Present findings conversationally with reasoning. Explain WHY each recommendation, not just WHAT. Accept feedback: `focus: {area}`, `skip: {item}`, `more detail on: {area}`
**Phase 5: Report** (Auto) — Generate full analysis report incorporating user priorities

### Example Invocations

**Full repository audit**:
```
/Review targetPath: "/Users/dev/my-project"
```

**Focus on agents only**:
```
/Review targetPath: "/Users/dev/my-project", focusArea: "agents"
```

**Security-focused review**:
```
/Review targetPath: "/Users/dev/my-project", focusArea: "security"
```

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: enforce-output` | Validate output compliance |
| `refine: risks` | Expand risk analysis |
| `refine: concise` | Executive summary only |

**Generated using**: [RepoReview.instructions.md](../instructions/RepoReview.instructions.md)

---

*VS Code Copilot Customization Framework v1.0*
