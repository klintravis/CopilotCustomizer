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
Generate per [GenerateWorkflow.instructions.md](../instructions/GenerateWorkflow.instructions.md):
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
- Multi-layered context validation at each handoff point
- Automated rollback capabilities for failed transitions
- Clear escalation paths for unresolvable conflicts
- Performance benchmarks with automated optimization triggers
- Progress notifications and resumption capabilities

### Version Note
**v1.0** - Initial release with core multi-chain workflow generation capabilities, automated handoffs, and shared instruction patterns. Optimized for CopilotCustomizer agent integration with high-reliability execution targets.

### Conformance
Generated workflows conform to [GenerateWorkflow.instructions.md](../instructions/GenerateWorkflow.instructions.md) framework standards, ensuring consistency with VS Code Copilot agent ecosystem and maintainable workflow patterns.

---

**Framework Integration**: Part of CopilotCustomizer ecosystem  
**Schema Compliance**: VS Code Copilot Prompt Files v1.0  
**Generated**: 2025-10-31 | **Target Agent**: @CopilotCustomizer