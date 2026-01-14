---
agent: CopilotCustomizer
---

<!-- ASSET: NewWorkflow | TYPE: Prompt | VERSION: v1.0 -->


## Workflow Creation Prompt (v1.0)

## Metadata
Asset ID: prompt/newworkflow | Created: 2026-01-14 | Status: Active

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

**Log Entry Format**:
```
[YYYY-MM-DD HH:MM:SS UTC] - Invoked by: {user/system} | Context: {brief description}
```

**Recent Invocations**:
_Manual logging - update this section when invoked_
- [2026-01-14] Added traceability system

### Usage Guidelines
- This asset should be invoked when: Prompt-specific workflows are needed
- Expected outcome: Execution of NewWorkflow Prompt functionality
- Related assets: See related prompts in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---

---

## Audit
Last invoked: [Manual log]
Change history: v1.0 (2026-01-14) - Added traceability
