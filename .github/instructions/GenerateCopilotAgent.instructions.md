---
applyTo: '**/*.agent.md'
description: 'Framework for creating VS Code Copilot agent files (chat modes) with roles, tools, handoffs, and workflows'
---

# VS Code Copilot Agent File Guide (v1.0)

**Paired Prompt**: [NewCopilotAgent.prompt.md](../prompts/NewCopilotAgent.prompt.md)

### Purpose
Standardized approach for creating VS Code Copilot `.agent.md` files (chat modes) with roles, tools, handoffs, workflows.

**Distinction**: Creates VS Code `.agent.md` chat modes, NOT workspace `AGENTS.md` coding guidance files.

### VS Code Agent Schema (v1.105+)
**Required**: `description` (clear agent role)  
**Optional**: `tools` (approved tools array), `model` (AI model), `handoffs` (workflow transitions)

### Recommended Sections
| Section | Required | Purpose |
|---------|----------|---------|
| Role Definition | Yes | Purpose, capabilities, expertise |
| Core Objectives | Yes | Goals and outcomes |
| Workflow Process | Yes | Interaction patterns |
| Depth Modes | Conditional | quick-advice, standard, deep |
| Refinement Commands | Yes | Iterative improvements |
| Tool Integration | Conditional | Approved tools and usage |
| Handoffs | Optional | Agent transitions |

### Agent Template
```markdown
---
description: 'Brief agent role description'
tools: ['edit', 'search', 'terminal']
model: 'Claude Sonnet 4'
handoffs:
  - label: 'Generate Code'
    agent: 'generator'
    prompt: 'Create implementation.'
    send: false
---

## Agent Name: Specialist Role

### Role
Expert in [domain] who [capability]. [Expertise and limits].

### Core Objectives
1. Primary: [Main purpose]
2. Secondary: [Supporting goals]

### Workflow Process
1. Assessment | 2. Analysis | 3. Implementation | 4. Validation

### Depth Modes
| Mode | Use Case | Output |
|------|----------|--------|
| quick-advice | Fast | Brief |
| standard | Typical | Standard |
| deep-architecture | Complex | Comprehensive |

### Refinement Commands
- refine: [domain] | refine: optimize | refine: validate

*Framework: [CopilotFramework.instructions.md](../instructions/CopilotFramework.instructions.md)*
*Security: [CopilotSecurity.instructions.md](../instructions/CopilotSecurity.instructions.md)*
```

### Quality Guidelines
- Clear expertise boundaries
- Concrete workflow steps
- Proper framework references
- Valid YAML and markdown
- Approved tools only
- Clear handoff conditions

### Integration Patterns
**Shared Instructions**: Framework, Security, Audit references  
**Tool Ecosystem**: MCP servers, approval patterns  
**Handoffs**: Context preservation, validation

*Complete framework: [CopilotFramework.instructions.md](../instructions/CopilotFramework.instructions.md)*  
*VS Code: [Agent Files](https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes)*