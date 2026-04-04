---
applyTo: '.github/**/*.agent.md'
description: 'Framework for creating VS Code Copilot custom agent files with roles, tools, handoffs, and workflows'
---

# VS Code Copilot Agent File Guide (v1.2 - VS Code 1.112)

**Paired Prompt**: [NewAgent.prompt.md](../prompts/NewAgent.prompt.md)

### Purpose
Standardized approach for creating VS Code Copilot `.agent.md` custom agent files with roles, tools, handoffs, workflows, and orchestration controls.

**Distinction**: Creates VS Code `.agent.md` custom agents, NOT workspace `AGENTS.md` coding guidance files.

### VS Code Agent Schema (v1.112)
**Required**: `description` (clear agent role)  
**Optional**: `target` (vscode/github-copilot), `name` (display override), `argument-hint` (input guidance), `tools` (approved tools array), `model` (AI model or array for fallback), `handoffs` (workflow transitions), `mcp-servers` (external tools), `user-invocable` (visibility control), `disable-model-invocation` (prevent auto-invocation), `agents` (constrain subagent access)

> **Deprecation Notice**: The `infer` frontmatter field is deprecated as of VS Code 1.112. Use `user-invocable` and `disable-model-invocation` instead.  
> Migration: `infer: true` → `user-invocable: true, disable-model-invocation: false` (default behavior)  
> Migration: `infer: false` → `user-invocable: false, disable-model-invocation: true`

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

### Tool Selection
**Skill Reference**: Use the [tool-selection](../skills/tool-selection/SKILL.md) skill for:
- Complete VS Code tool catalog with risk levels
- Agent archetype → tool mapping table
- Tool approval patterns and risk classification
- Selection principles and decision framework
- Conductor-specific tool rules

**Principles**: Minimal set, task-aligned, security-conscious, progressive addition.

### Quality Guidelines

**Generated agents must be rich enough to meaningfully change AI behavior.** A thin agent with generic advice is worse than no agent at all.

**Richness checklist**:
- [ ] Role describes expertise boundaries specific to THIS project (not generic)
- [ ] Workflow has 5+ steps with substeps and decision points
- [ ] Tool selection is justified (why each tool, why NOT others)
- [ ] References real file paths and patterns from the target repository
- [ ] Includes concrete examples of what the agent does and doesn't do
- [ ] Refinement commands allow iterative improvement
- [ ] Handoff conditions are specific (not "when done")
- [ ] Minimum 80 lines for standalone agents, 50 lines for subagents

**What to include from research context**:
- Actual framework versions and configurations found
- Specific code patterns and conventions discovered
- Real file paths and module structure
- User's stated priorities and pain points
- Team workflow preferences (branching, review, deployment)


### Orchestrated System Agent Archetypes

When generating agents for conductor/subagent orchestrated systems, use these archetypes:

| Archetype | YAML Key | Model Tier | Required Tools | Handoff Pattern |
|-----------|----------|------------|----------------|-----------------|
| **Conductor** | `handoffs: [...]`, `agents: [...]` | High (latest capable) | `search`, `search/codebase`, `agent` | Invokes subagents via `agent` tool + `handoffs` (parallel capable) |
| **Planner** | `user-invocable: false` | High (latest capable) | `search`, `search/codebase` | Conductor → Planner → Conductor |
| **Implementer** | `user-invocable: false` | Medium (auto) | `edit`, `new`, `search`, `terminal` | Conductor → Implementer → Conductor |
| **Reviewer** | `user-invocable: false` | High (latest capable) | `search`, `problems`, `changes` | Conductor → Reviewer → Conductor |
| **Researcher/Scout** | `user-invocable: false` | Low (auto) | `search`, `search/codebase` | Conductor → Scout → Conductor |
| **Domain Specialist** | `disable-model-invocation: true` | Medium-High | Domain-specific | Conductor → Specialist → Conductor |
| **Explorer/Research** | `user-invocable: false` | Low (fast/lightweight) | `search`, `search/codebase` | Conductor → Explorer → Conductor (read-only research, auto-delegated) |

**Conductor-Specific Requirements**:
- Must include `agent` tool in tools array and define `handoffs` array with all subagent transitions
- Should use `agents: ['Planner', 'Implementer', 'Reviewer']` to explicitly list allowed subagents
- Must track state via `plans/PLAN.md`
- Must enforce quality gates (minimum 3 pause points)
- Must NOT include implementation tools (`edit`, `terminal`) for code changes
- Only writes to plan files, never to source code
- Subagents execute in parallel when independent (automatic in v1.112+)

**Subagent-Specific Requirements**:
- Should set `user-invocable: false` for orchestration-only agents (not shown in agent picker)
- Must define input/output contract (what it receives, what it produces)
- Must define scope boundaries (what it can and cannot modify)
- Model tier should match role complexity
- Tool set should be minimal for the role
- Use `disable-model-invocation: true` to prevent automatic invocation by other agents

**Nested Subagent Invocation**:
Subagents may include the `agent` tool when they need to delegate work:
- **Reviewer → Security Specialist**: Reviewer invokes security-focused sub-review
- **Implementer → Test Generator**: Implementer delegates test creation
- **Planner → Researcher**: Planner delegates deep codebase analysis

**Rules for nested invocation**:
- Use `agents` field to constrain allowed targets
- Max 2 levels of nesting (conductor → subagent → sub-subagent)
- Nested agents should be `user-invocable: false`
- Each level must pass context explicitly
- Quality gates remain at conductor level (not nested)

**References**: [orchestration skill](../skills/orchestration/SKILL.md) | [Orchestration.instructions.md](Orchestration.instructions.md)

### Orchestration by Default (Bootstrap Workflow)

When generating 3 or more agents for a repository via the bootstrap workflow:

1. **Always include a conductor agent** — Even for simple multi-agent setups, a lightweight conductor provides workflow coordination, quality gates, and plan tracking.

2. **Convert standalone agents to subagents** — Place subagents in `.github/agents/` directory and add `user-invocable: false` to their YAML frontmatter. Add I/O contracts, scope boundaries, and model tier assignments. The conductor manages all transitions.

3. **Conductors are the primary orchestrators** — Subagents MAY include the `agent` tool when their workflow requires delegating to other subagents (nested orchestration). Use the `agents` field to constrain which subagents they can invoke. Keep nesting shallow (max 2 levels deep).

4. **Minimum viable conductor** includes:
   - Tools: `['search', 'search/codebase', 'agent']`
   - `agents: ['SubagentA', 'SubagentB', ...]` explicitly listing allowed subagents
   - Handoffs array with all subagents
   - State tracking via plans/PLAN.md
   - 3 quality gates (planning, review, commit)
   - No implementation tools (`edit`, `new`, `terminal`)
   - Note: Subagents run in parallel automatically when independent (v1.112+)

5. **Exception**: Only 1-2 agents → standalone agents or handoff chain (no conductor needed).

### Handoffs Schema Requirements (MANDATORY when `handoffs` present)

When defining handoffs in the YAML front matter of an agent file, each handoff entry MUST include these fields:

```yaml
handoffs:
  - label: "Human-readable action name"    # required (string)
    agent: "TargetAgentName"               # required (string, matches .agent.md basename)
    prompt: "What to send/ask the target"  # required (string, describes context transfer)
    send: false                             # required (boolean; true = auto-submit, false = manual confirm)
    model: 'GPT-5 (copilot)'              # optional (string; override model for this handoff)
```

**`send` parameter** (boolean, required):
- `false` (default) — Prompt requires user confirmation before handoff executes
- `true` — Prompt auto-submits immediately (use for automated chains)

**`model` parameter** (string, optional):
- Overrides the target agent's default model for this specific handoff
- Format: `'Model Name (vendor)'` — use current model names from your VS Code model picker
- Use when a specific handoff benefits from a different model than the target's default

Validation rules:
- `agent` must resolve to an existing file: `.github/agents/{agent}.agent.md`
- `send` must be boolean (not string)
- `prompt` should describe context being transferred (avoid generic text)
- `model` format must follow `'Name (vendor)'` pattern
- If no handoffs are needed, omit the `handoffs` key entirely

Example (valid):

```yaml
---
description: "Security reviewer for API endpoints"
tools: [search, problems]
handoffs:
  - label: "Escalate critical findings to Editor"
    agent: "Editor"
    prompt: "Implement remediations for the following validated issues with references to files and line ranges."
    send: false
---
```
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
`refine: [command]` - Available commands: focus, scope, quality, security

### Tool Configuration
Tools: [list based on Tool Selection Guide]

### Handoffs
Available transitions: [list other agents]

---

## Orchestration Control Properties (VS Code 1.112)

### `user-invocable` Property
Controls whether agent appears in the agent picker dropdown:

```yaml
user-invocable: false     # Hidden from picker, only accessible programmatically
```

**Use Cases**:
- Internal subagents in orchestration systems (Planner, Implementer, Reviewer)
- Helper agents that should only be invoked by other agents
- Workflow-specific agents not meant for direct user interaction

**Default**: `true` (agent is visible in picker)

### `disable-model-invocation` Property
Prevents this agent from being automatically invoked as a subagent by other agents:

```yaml
disable-model-invocation: true     # Cannot be auto-invoked by AI
```

**Use Cases**:
- Agents that require explicit user decision (e.g., deployment, destructive operations)
- Entry-point agents that should only be user-initiated
- Security-sensitive agents requiring manual authorization

**Default**: `false` (agent can be invoked as subagent)

### `agents` Property
Limits which subagents this agent can invoke (requires `agent` tool):

```yaml
tools: ['agent', 'search', 'codebase']
agents: ['Planner', 'Implementer', 'Reviewer']  # Can only invoke these three
```

**Use Cases**:
- Enforce strict orchestration workflows
- Prevent unintended subagent chains
- Security boundaries for agent delegation

**Default**: All agents available when omitted

---

## Model Configuration (VS Code 1.112)

### Single Model
```yaml
# model: omit to use default, or specify for override
```

### Multiple Models with Fallback
```yaml
# model: omit to inherit from caller, or specify: 'Model Name (vendor)'
```

The first available model in the list is used. Fallback provides resilience when preferred models are unavailable.

---

## Handoff Model Parameter (VS Code 1.112)

Specify which model to use when handoff executes:

```yaml
handoffs:
  - label: 'Generate Tests'
    agent: 'test-generator'
    prompt: 'Create comprehensive tests for the implementation above'
    send: false
    model: 'GPT-5 (copilot)'  # Use GPT-5 specifically for test generation
```

Format: `'Model Name (vendor)'` — use current model names from your VS Code model picker

---

## New Metadata Properties (VS Code 1.109+)

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

## Complete Example (VS Code 1.112)

```yaml
---
description: 'Expert in REST API design and implementation following OpenAPI standards'
target: 'vscode'
name: 'API Architect'
argument-hint: 'Describe the API endpoint or specification you need'
# model: omit to inherit from caller, or specify: 'Model Name (vendor)'
tools: ['search', 'codebase', 'edit', 'new', 'terminal']
handoffs:
  - label: 'Generate Tests'
    agent: 'test-generator'
    prompt: 'Create comprehensive tests for the API endpoint defined above'
    send: false
    model: 'GPT-5 (copilot)'
mcp-servers: ['openapi-tools']
---

## API Architect Agent

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

## Orchestration Example (VS Code 1.112)

```yaml
---
description: 'Orchestrates full-stack feature development with quality gates'
name: 'Feature Conductor'
# model: omit to use default, or specify for override
tools: ['search', 'codebase', 'agent', 'problems']
user-invocable: true
agents: ['Planner', 'BackendDev', 'FrontendDev', 'Reviewer', 'Tester']
handoffs:
  - label: 'Plan Feature'
    agent: 'Planner'
    prompt: 'Create implementation plan with architecture decisions'
    send: false
  - label: 'Implement Backend'
    agent: 'BackendDev'
    prompt: 'Implement backend following plan specifications'
    send: false
  - label: 'Implement Frontend'
    agent: 'FrontendDev'
    prompt: 'Implement UI components per plan'
    send: false
  - label: 'Review Changes'
    agent: 'Reviewer'
    prompt: 'Review all implementations for quality and standards compliance'
    send: false
  - label: 'Generate Tests'
    agent: 'Tester'
    prompt: 'Create tests for backend and frontend implementations'
    send: false
---

## Feature Conductor

### Role
Conductor agent orchestrating feature development through planning, parallel implementation, review, and testing phases. Coordinates 4 subagents with quality gates.

### Core Objectives
1. Analyze feature requirements and coordinate planning
2. Orchestrate parallel backend/frontend development
3. Enforce quality gates at plan, implementation, and review phases
4. Track progress via plans/FEATURE.md

### Workflow
1. **Plan**: Invoke Planner → Review plan → User approval gate
2. **Implement**: Invoke BackendDev and FrontendDev in parallel → Monitor progress
3. **Review**: Invoke Reviewer → Address findings → User approval gate
4. **Test**: Invoke Tester → Validate coverage → User approval gate
5. **Complete**: Generate summary, update plan file

### Orchestration Notes
- BackendDev and FrontendDev execute in parallel (automatic in v1.112+)
- All subagents have `user-invocable: false` (orchestration-only)
- State tracked in plans/FEATURE.md throughout workflow
- Quality gates at plan, review, and test phases
```

---

*Related Instructions*: [Maintenance.instructions.md](Maintenance.instructions.md), [Framework.instructions.md](Framework.instructions.md)

## Claude Agent Format Compatibility (VS Code 1.112)

VS Code 1.112 reads agent files from both `.github/agents/` (VS Code native) and `.claude/agents/` (Claude Code format). This enables cross-tool compatibility.

### Format Comparison

| Property | VS Code Format (`.agent.md`) | Claude Format (`.md`) |
|----------|-----------------------------|-----------------------|
| **Location** | `.github/agents/*.agent.md` | `.claude/agents/*.md` |
| **Tools** | YAML array: `['search', 'edit']` | Comma string: `"Read, Grep, Glob, Bash"` |
| **Blocked tools** | (use minimal tool sets) | `disallowedTools: "Bash, Write"` |
| **Frontmatter** | Full schema (description, tools, handoffs, agents, etc.) | Simplified (description, tools, disallowedTools) |
| **Orchestration** | `handoffs`, `agents`, `agent` tool | Not supported in Claude format |

### Tool Name Mapping

| VS Code Tool | Claude Tool | Notes |
|-------------|-------------|-------|
| `search` | `Read`, `Grep`, `Glob` | Claude splits search functionality |
| `edit` | `Write` | File modification |
| `terminal` | `Bash` | Shell command execution |
| `new` | `Write` | File creation |
| `fetch` | `WebFetch` | Web content retrieval |
| `search/codebase` | `Grep`, `Glob` | Semantic vs text search |

### Cross-Tool Compatibility Pattern

```
.github/agents/APIExpert.agent.md    ← VS Code native (full feature set)
.claude/agents/APIExpert.md          ← Claude Code compatible (subset)
```

- **VS Code reads both** directories automatically
- **Claude Code reads only** `.claude/agents/`
- For maximum compatibility, maintain agents in both formats
- For VS Code-only features (handoffs, orchestration), use `.github/agents/` only

### When to Generate Claude-Compatible Agents

| Scenario | Recommended Format |
|----------|--------------------|
| VS Code only (handoffs, orchestration) | `.github/agents/` only |
| Cross-tool (VS Code + Claude Code) | Both `.github/agents/` and `.claude/agents/` |
| Claude Code primary | `.claude/agents/` only |
| Simple agents (no VS Code features) | Either or both |

## Hooks Integration (VS Code 1.112 Preview)

Agent Hooks provide deterministic lifecycle automation that complements agent behavior.

**How Hooks Complement Agents**:
- Agents handle AI-driven decision making and tool orchestration
- Hooks execute deterministic commands at specific lifecycle points
- Together, they enable policy enforcement, automation, and audit trails

**Integration Examples**:
- **Security Agent** + `PreToolUse` hook: Hook blocks risky tool operations before agent executes them
- **Code Quality Agent** + `PostToolUse` hook: Hook runs formatters/linters after agent modifies files
- **Audit Agent** + `SessionStart` hook: Hook logs session context before agent begins analysis

**Agent Design Consideration**: When designing agents expected to work with hooks, document the expected hook events in the agent's workflow section. Reference: [Framework.instructions.md](Framework.instructions.md) (Agent Hooks section)

### Agent-Scoped Hooks (VS Code 1.111+)

Agents can define their own hooks directly in YAML frontmatter. These hooks only fire when that specific agent is active.

```yaml
hooks:
  PreToolUse:
    - type: command
      command: "./scripts/validate-tool.sh"
      timeout: 15
  PostToolUse:
    - type: command
      command: "./scripts/format-changes.sh"
      timeout: 30
```

**Setting**: Requires `chat.useCustomAgentHooks: true` in VS Code settings.

**Use Cases**:
- Security agents with PreToolUse validation hooks
- Code quality agents with PostToolUse formatters
- Audit agents with SessionStart/Stop logging hooks

**Design Principle**: Prefer agent-scoped hooks over workspace hooks when the automation is specific to one agent's workflow.

### Refinement Commands
- refine: [domain] | refine: optimize | refine: validate

---
*Agent file generated following VS Code Copilot standards*

### Quality Guidelines
- Clear expertise boundaries
- Concrete workflow steps
- Proper framework references
- Valid YAML and markdown
- Approved tools only
- Clear handoff conditions (see Handoffs Schema Requirements)

### Standards Integration

When generating this asset type, integrate matched enterprise standards via [Standards.instructions.md](Standards.instructions.md). Weave principles naturally into the generated content without verbatim copying or direct references to `.github/standards/`.

### Integration Patterns
**Shared Instructions**: Framework, Security, Audit references
**Tool Ecosystem**: MCP servers, approval patterns
**Handoffs**: Context preservation, validation

---

## Processing Metadata

- **Standards Version**: VS Code Copilot v2026.03 (Agent Files v1.112)
- **Role**: Framework for creating VS Code Copilot custom agent files
- **Scope**: Applies to all .agent.md files in .github/agents/
- **Tools Guidance**: Archetype-based tool selection with minimal sets

*Generated following CopilotCustomizer instruction generation standards*

---

## Change History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-01-15 | Initial release |

*Complete framework: [Framework.instructions.md](Framework.instructions.md)*
*VS Code: [Agent Files](https://code.visualstudio.com/docs/copilot/customization/custom-agents)*