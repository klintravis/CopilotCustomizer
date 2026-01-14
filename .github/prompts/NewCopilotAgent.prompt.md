---
agent: CopilotCustomizer
---

<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: NewCopilotAgent Prompt (Prompt) v1.0
   STATUS: Prompt Ready — Awaiting execution
════════════════════════════════════════════════════════════════════════════ -->

# VS Code Copilot Agent Generator (v1.0)

**Paired Instructions**: [GenerateCopilotAgent.instructions.md](../instructions/GenerateCopilotAgent.instructions.md)

### Task
Generate VS Code Copilot `.agent.md` custom agent file with role, tools, handoffs, workflows.

**Note**: Creates `.agent.md` custom agents, NOT workspace `AGENTS.md` files.

### Usage
1. Fill required variables
2. Confirm when ready

### Variables
---
**Agent Name** [REQUIRED]: "{AGENT_NAME}"
**Specialization** [REQUIRED]: "{DOMAIN}"
**Primary Role** [REQUIRED]: "{PRIMARY_ROLE}"
---

### Validation
- Required: `AGENT_NAME`, `DOMAIN`, `PRIMARY_ROLE`
- If `handoffs` are included, EACH entry MUST have: `label` (string), `agent` (string), `prompt` (string), `send` (boolean)
- All other details (tools, capabilities, handoffs, depth modes) inferred from role and domain

### Generation Gate
Respond with:
- Role boundary analysis
- Tool requirements
- Handoff design
- `ready-to-generate`

Wait for `confirm`.

### Output Requirements
Complete `.agent.md` with:
1. YAML front matter (v1.106)
2. Agent definition
3. Core objectives
4. Workflow process
5. Depth modes
6. Refinement commands
7. Tool integration
 8. Handoff workflows (if present, conform to handoffs schema: label, agent, prompt, send)
9. Framework integration

### Agent Patterns
**Specialist**: Domain expert, workflow specialist, QA  
**Integration**: Orchestrator, analyzer, generator  
**Utility**: Formatter, validator, optimizer

### Refinement Commands
- `refine: role` - Clarify boundaries
- `refine: tools` - Optimize selection
- `refine: workflow` - Enhance sequences

*Instructions: [GenerateCopilotAgent.instructions.md](../instructions/GenerateCopilotAgent.instructions.md)*  
*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*  
*VS Code: [Agent Files](https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes)*

**Generated using**: [GenerateCopilotAgent.instructions.md](../instructions/GenerateCopilotAgent.instructions.md)

---

*VS Code Copilot Customization Framework v1.0*

---

## Audit
Last invoked: [Manual log]
Change history: v1.0 (2026-01-14) - Added traceability
