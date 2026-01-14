---
agent: CopilotCustomizer
---

## Workflow Creation Prompt (v1.0)

**Paired Instructions**: [GenerateWorkflow.instructions.md](../instructions/GenerateWorkflow.instructions.md)

### Task Intent
Generate multi-agent workflows with minimal input and automated handoffs.

### Variable Block
```
WORKFLOW_PURPOSE: "{WORKFLOW_PURPOSE}"
AGENT_CHAIN: "{AGENT_CHAIN}"
SUCCESS_CRITERIA: "{SUCCESS_CRITERIA}"
```

### Output
- Entry Point Agent with minimal input gathering
- Workflow Orchestrator with chain execution
- Specialized Agents with handoff commands
- Shared Instructions (70%+ duplication reduction)
- Quality Framework with success metrics

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: handoffs` | Optimize transitions |
| `refine: automation` | Reduce manual intervention |
| `refine: minimal-input` | Streamline entry prompts |

**Generated using**: [GenerateWorkflow.instructions.md](../instructions/GenerateWorkflow.instructions.md)

---

*VS Code Copilot Customization Framework v1.0*