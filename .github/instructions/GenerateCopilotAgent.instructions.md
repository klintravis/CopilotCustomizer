---
applyTo: '.github/**/*.agent.md'
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

### Tool Selection Guide

**Common Tools by Agent Type**:

| Agent Type | Required Tools | Optional Tools | Rationale |
|------------|----------------|----------------|-----------|
| **Code Generator** | `edit`, `new`, `search` | `terminal`, `problems` | Create/modify files, find patterns, run commands |
| **Analyzer/Reviewer** | `search`, `problems`, `changes` | `search/codebase` | Inspect code, find issues, review diffs |
| **Tester** | `new`, `edit`, `terminal` | `testFailure`, `problems` | Create tests, run test commands, analyze failures |
| **Documentation** | `new`, `edit`, `search` | `fetch`, `openSimpleBrowser` | Create docs, research external sources |
| **Planner/Architect** | `search`, `search/codebase` | `todos`, `usages` | Understand codebase structure, track tasks |
| **Debugger** | `search`, `problems`, `terminal` | `testFailure`, `changes` | Find errors, run debug commands |
| **Security Reviewer** | `search`, `search/codebase`, `problems` | `changes` | Scan for vulnerabilities, review changes |

**Available VS Code Tools**:
- `edit` - Modify existing files
- `new` - Create new files
- `search` - Search within files
- `search/codebase` - Semantic codebase search
- `terminal` - Run shell commands (requires approval)
- `problems` - Access VS Code problems panel
- `changes` - View git changes/diffs
- `testFailure` - Access test failure information
- `todos` - Manage task lists
- `usages` - Find code references
- `fetch` - Fetch web content
- `openSimpleBrowser` - Open URLs in VS Code
- `runCommands` - Execute VS Code commands
- `runTasks` - Run VS Code tasks
- `vscodeAPI` - Access VS Code extension API
- `extensions` - Manage VS Code extensions
- `githubRepo` - Search GitHub repositories

**Tool Selection Principles**:
1. **Minimal Set**: Include only tools needed for core objectives
2. **Task-Aligned**: Match tools to agent's workflow steps
3. **Security**: Avoid `terminal` unless necessary (requires user approval)
4. **Progressive**: Start minimal, add tools based on actual needs

### Quality Guidelines
- Clear expertise boundaries
- Concrete workflow steps
- Proper framework references
- Valid YAML and markdown
- **Tools matched to tasks** (use Tool Selection Guide above)
- Minimal tool set (only what's needed)
- Clear handoff conditions

### Tool Integration Best Practices
**Do**:
✅ Choose tools that directly support core objectives  
✅ Start with minimal set (`search`, `edit`, `new`)  
✅ Add `terminal` only if agent needs to run commands  
✅ Use `problems` for error analysis agents  
✅ Use `changes` for review/diff agents  

**Don't**:
❌ Include all available tools "just in case"  
❌ Add `terminal` without security justification  
❌ Use tools unrelated to agent's domain  
❌ Forget to document why specific tools are needed

### Handoffs Schema Requirements (MANDATORY when `handoffs` present)

When defining handoffs in the YAML front matter of an agent file, each handoff entry MUST include these fields:

```yaml
handoffs:
  - label: "Human-readable action name"    # required (string)
    agent: "TargetAgentName"               # required (string, matches .agent.md basename)
    prompt: "What to send/ask the target"  # required (string, describes context transfer)
    send: false                             # required (boolean; true = auto, false = manual)
```

Validation rules:
- `agent` must resolve to an existing file: `.github/agents/{agent}.agent.md`
- `send` must be boolean (not string)
- `prompt` should describe context being transferred (avoid generic text)
- If no handoffs are needed, omit the `handoffs` key entirely

Example (valid):

```yaml
---
description: "Security reviewer for API endpoints"
tools: [search, problems]
handoffs:
  - label: "Escalate critical findings to ImplementationPlanner"
    agent: "ImplementationPlanner"
    prompt: "Implement remediations for the following validated issues with references to files and line ranges."
    send: false
---
```
---

## Agent Name: Specialist Role

### Handoff Notification
```
🔄 Agent Name Starting...
   Purpose: Brief description of agent's purpose
   Next: Automatic handoff to NextAgent / User interaction / Workflow complete
```

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

---
*Agent file generated following VS Code Copilot standards*
```

### Quality Guidelines
- Clear expertise boundaries
- Concrete workflow steps
- Proper framework references
- Valid YAML and markdown
 - Approved tools only
 - Clear handoff conditions (see Handoffs Schema Requirements)

### Integration Patterns
**Shared Instructions**: Framework, Security, Audit references  
**Tool Ecosystem**: MCP servers, approval patterns  
**Handoffs**: Context preservation, validation

*Complete framework: [CopilotFramework.instructions.md](../instructions/CopilotFramework.instructions.md)*  
*VS Code: [Agent Files](https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes)*