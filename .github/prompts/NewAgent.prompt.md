---
description: Create a new VS Code Copilot custom agent with role, tools, and handoffs
argument-hint: Describe the agent you want to create
agent: CopilotCustomizer
---

# VS Code Copilot Agent Generator (v1.0)

```
✨ PROMPT ACTIVATED: NewAgent (Asset Generator)
   Purpose: Create VS Code-specific Copilot custom agents
   Standard: VS Code v1.109 (.agent.md schema with orchestration controls)
   Instructions: AgentAuthoring.instructions.md
   Input: AGENT_NAME, DOMAIN, PRIMARY_ROLE
   Output: Complete .agent.md with role, tools, handoffs, workflows
   Scope: VS Code Copilot only (not cross-platform)
```

**Paired Instructions**: [AgentAuthoring.instructions.md](../instructions/AgentAuthoring.instructions.md)

### Task
Generate VS Code Copilot `.agent.md` custom agent file with role, tools, handoffs, workflows.

**Note**: Creates `.agent.md` custom agents, NOT workspace `AGENTS.md` files.

### Usage
1. Fill required variables
2. Confirm when ready

### Variables
---
**Agent Name** [REQUIRED]: ${input:agentName:Name for the agent (e.g., SecurityReviewer)}
**Specialization** [OPTIONAL]: ${input:domain:e.g., security, testing, documentation}
**Primary Role** [OPTIONAL]: ${input:primaryRole:e.g., code reviewer, test generator}
---

### Validation
- Required: `agentName`
- Optional (inferred from name and repo context if omitted): `domain`, `primaryRole`
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
1. YAML front matter (v1.109+)
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

*Instructions: [AgentAuthoring.instructions.md](../instructions/AgentAuthoring.instructions.md)*  
*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*  
*VS Code: [Agent Files](https://code.visualstudio.com/docs/copilot/customization/custom-agents)*

**Generated using**: [AgentAuthoring.instructions.md](../instructions/AgentAuthoring.instructions.md)

---

*VS Code Copilot Customization Framework v1.0*