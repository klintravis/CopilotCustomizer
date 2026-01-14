---
applyTo: '.github/**/*.agent.md'
description: 'Framework for creating VS Code Copilot custom agent files with roles, tools, handoffs, and workflows'
---

# VS Code Copilot Agent File Guide (v1.1 - VS Code 1.106)

**Paired Prompt**: [NewCopilotAgent.prompt.md](../prompts/NewCopilotAgent.prompt.md)

### Purpose
Standardized approach for creating VS Code Copilot `.agent.md` custom agent files with roles, tools, handoffs, workflows.

**Distinction**: Creates VS Code `.agent.md` custom agents, NOT workspace `AGENTS.md` coding guidance files.

### VS Code Agent Schema (v1.106)
**Required**: `description` (clear agent role)  
**Optional**: `target` (vscode/github-copilot), `name` (display override), `argument-hint` (input guidance), `tools` (approved tools array), `model` (AI model), `handoffs` (workflow transitions), `mcp-servers` (external tools)

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
`refine: [command]` - Available commands: focus, scope, quality, security

### Tool Configuration
Tools: [list based on Tool Selection Guide]

### Handoffs
Available transitions: [list other agents]

---

## New Metadata Properties (VS Code 1.106)

### `target` Property
Specifies optimization target for agent execution:

```yaml
target: 'vscode'          # Optimized for local VS Code chat
```

- `vscode`: Full feature support - name, description, argument-hint, model, tools, handoffs
- `github-copilot`: Cloud/CLI optimization - name, description, tools (edit/search/shell/custom-agent), mcp-servers
- Omit for universal compatibility (agent works in all environments)

### `name` Property
Override display name without renaming file:

```yaml
name: 'API Expert'        # Display name in agent picker
```
File: `APIExpert.agent.md`, Display: "API Expert"

### `argument-hint` Property  
Guidance shown in chat input to help users interact with agent:

```yaml
argument-hint: 'Describe the API endpoint you want to create or modify'
```

Best practices:
- Be specific and actionable
- Guide users to provide necessary context
- Keep under 80 characters
- Examples: "Describe the bug you're seeing", "Enter the test scenario"

### `mcp-servers` Property
External MCP servers providing additional tools:

```yaml
mcp-servers: ['github', 'jira']
```

Requires MCP servers configured in `.vscode/mcp.json` or user settings.

---

## Complete Example (VS Code 1.106)

```yaml
---
description: 'Expert in REST API design and implementation following OpenAPI standards'
target: 'vscode'
name: 'API Architect'
argument-hint: 'Describe the API endpoint or specification you need'
model: 'gpt-4'
tools: ['search', 'codebase', 'edit', 'new', 'terminal']
handoffs:
  - label: 'Generate Tests'
    agent: 'test-generator'
    prompt: 'Create comprehensive tests for the API endpoint defined above'
    send: false
mcp-servers: ['openapi-tools']
---

## API Architect Agent

### Handoff Notification
```
🔄 API Architect Starting...
   Purpose: Design and implement REST API endpoints with OpenAPI specs
   Next: Manual handoff to test-generator for test creation
```

### Role
Expert in REST API architecture specializing in OpenAPI 3.0+ specifications, endpoint design, authentication patterns, and API best practices.

### Core Objectives
1. Design clean, RESTful API interfaces following industry standards
2. Generate OpenAPI/Swagger documentation automatically  
3. Implement secure authentication and authorization patterns
4. Ensure proper error handling and status codes

### Workflow Process
1. **Analyze Requirements**: Review API needs and constraints
2. **Design Endpoints**: Define resources, methods, and schemas
3. **Generate OpenAPI Spec**: Create machine-readable API documentation
4. **Implement Code**: Write endpoint handlers with validation
5. **Document Examples**: Provide request/response samples

### Tool Configuration
- `search`: Find existing API patterns in codebase
- `codebase`: Semantic search for API structure
- `edit`: Modify existing endpoint implementations
- `new`: Create new API modules and specifications
- `terminal`: Run API validation and testing commands

### Handoffs
- **test-generator**: After API implementation for comprehensive testing
- **security-reviewer**: For authentication and authorization audit
- **doc-generator**: For API reference documentation creation
```

---

*Related Instructions*: [FormatAssets.instructions.md](FormatAssets.instructions.md), [CopilotFramework.instructions.md](CopilotFramework.instructions.md)

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