---
applyTo: '.github/**/*'
description: 'Universal Copilot customization workflows, standards, quality patterns, and audit framework'
---

# Framework

## Universal Asset Workflow (v1.0)

### 4-Phase Standard Process
1. **Assessment**: Evaluate requirements, context, scope
2. **Standards**: Apply asset-specific guidelines and schemas  
3. **Execution**: Use structured templates for consistent output
4. **Integration**: Ensure ecosystem alignment and quality

### Implementation Patterns
**Generation**: Requirements → Standards → Template → Integration  
**Management**: Selection → Analysis → Application → Validation

## Standard Workflow (Iteration Loop)
1. **Intake**: Capture user goal and requirements
2. **Inventory**: List existing files with purposes
3. **Gap Analysis**: Compare against best practice checklist
4. **Proposal**: Present improvement plan (Add/Modify/Remove/Defer)
5. **Implementation**: Generate or patch artifacts (on confirmation)
6. **Audit**: Run structural checklist and summarize changes (optional)
7. **Refinement**: Accept commands to re-focus or iterate

## Quality Checklist
Universal validation criteria for all Copilot customization work:

- [ ] Inventory collected and acknowledged
- [ ] Gap analysis covers all active artifacts
- [ ] Recommendations map to audit dimensions
- [ ] No duplicated guidance between assets
- [ ] Versioning and change impacts documented
- [ ] Agent files include actionable commands and style guides
- [ ] No conflicts with custom instructions
- [ ] Asset integration verified and cross-references functional
- [ ] Tool ecosystem properly configured
- [ ] Security patterns and approvals validated
- [ ] Handoff workflows tested where applicable
- [ ] Cross-device synchronization compatibility confirmed

## Standards Compliance

### VS Code Copilot Schema (v1.112)
**Agent Files**: `description` (required), `target`, `name`, `argument-hint`, `tools`, `model` (string or array), `handoffs` (with optional model parameter), `mcp-servers`, `user-invocable`, `disable-model-invocation`, `agents` (optional)  
**Agent Skills**: Generally available (GA), enabled by default; custom locations via `chat.agentSkillsLocations`  
**Instructions**: `applyTo` (required), `description` (optional); organization-wide instructions supported  
**Prompts**: variable blocks, usage instructions; optional `agent`, `tools`, `model`  
**Orchestration**: Parallel subagent execution, `agent` tool replaces deprecated `runSubagent`

### Documentation Sources
- [Customization Overview](https://code.visualstudio.com/docs/copilot/customization/overview)
- [Agent Files](https://code.visualstudio.com/docs/copilot/customization/custom-agents)
- [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [MCP Servers](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [Tool Management](https://code.visualstudio.com/docs/copilot/chat/chat-tools)
- [Agent Hooks](https://code.visualstudio.com/docs/copilot/customization/hooks)
- [Agent Plugins](https://code.visualstudio.com/docs/copilot/customization/agent-plugins)
- [Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

## Agent Hooks (Native in VS Code)

Hooks are **natively supported** in VS Code Copilot — they execute deterministic shell commands at agent lifecycle points. No custom hook infrastructure is needed; VS Code handles hook discovery and execution automatically.

### Lifecycle Events (8 total)
`SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PreCompact`, `SubagentStart`, `SubagentStop`, `Stop`

### Hook Command Properties
```json
{
  "type": "command",
  "command": "./script.sh",
  "windows": { "command": ".\\script.ps1" },
  "linux": { "command": "./script.sh" },
  "osx": { "command": "./script.sh" },
  "cwd": "${workspaceFolder}",
  "env": { "KEY": "value" },
  "timeout": 30
}
```

**Exit codes**: `0` = success, `2` = blocking error, other = non-blocking warning.

**PreToolUse output fields**: `permissionDecision` (allow/deny/ask), `updatedInput` (modify tool input), `additionalContext`.

### Hook Configuration Locations

| Location | Scope |
|----------|-------|
| `.github/hooks/*.json` | Workspace (VS Code native) |
| Agent frontmatter `hooks:` key | Per-agent (v1.111+) |
| `~/.copilot/hooks/` | User-level |
| Plugin `hooks/hooks.json` | Plugin-scoped |
| Custom via `chat.hookFilesLocations` | Custom directories |

### When to Generate Hooks
When bootstrapping repositories that need:
- **Security policies**: Block dangerous tool operations before execution
- **Code quality**: Run formatters/linters after file modifications
- **Audit trails**: Log agent sessions and tool usage
- **Context injection**: Add environment data to agent prompts

### Hooks vs Agents vs Instructions

| Mechanism | Nature | When to Use |
|-----------|--------|-------------|
| **Hooks** | Deterministic commands | Automation, policy enforcement, logging |
| **Agents** | AI-driven specialists | Decision making, code generation, analysis |
| **Instructions** | Static guidelines | Coding standards, project conventions |

**Reference**: [Agent Hooks Documentation](https://code.visualstudio.com/docs/copilot/customization/hooks)

## Agent Plugins (VS Code v1.110+)

Agent Plugins are pre-packaged bundles of skills, tools, hooks, and MCP servers — discoverable and installable from the VS Code Extensions view.

### When to Recommend Plugins
- When a repository needs a combination of skills + hooks + MCP servers for a specific domain
- When distributing customizations via VS Code Marketplace
- When teams want one-click installation of a complete AI customization set

**Reference**: [Agent Plugins Documentation](https://code.visualstudio.com/docs/copilot/customization/agent-plugins)

### Plugin Directory Structure
```
plugin-name/
├── plugin.json           # Required: name, version, description, engines
├── skills/               # Optional: SKILL.md files
├── agents/               # Optional: .agent.md files
├── hooks/                # Optional: hooks.json
│   └── hooks.json
├── scripts/              # Optional: hook command scripts
└── .mcp.json             # Optional: MCP servers (uses mcpServers key, not servers)
```

**Key Details**:
- Use `${CLAUDE_PLUGIN_ROOT}` token in script paths for portability
- MCP config uses `mcpServers` key (not `servers`)
- Setting: `chat.plugins.enabled`, browse via `@agentPlugins` in Extensions view
- Custom locations: `chat.pluginLocations`

## Native Creation Commands (VS Code 1.110+)

VS Code provides built-in slash commands for creating customizations:

| Command | Creates | Storage Options |
|---------|---------|-----------------|
| `/create-agent` | Agent file (.agent.md) | User-level or workspace |
| `/create-skill` | Skill (SKILL.md) | User-level or workspace |
| `/create-instruction` | Instruction file | User-level or workspace |
| `/create-prompt` | Prompt file (.prompt.md) | User-level or workspace |
| `/create-hook` | Hook configuration | User-level or workspace |
| `/init` | copilot-instructions.md | Workspace |

**Note**: CopilotCustomizer's `/NewAgent`, `/NewSkill`, etc. provide richer generation with standards integration, orchestration assessment, and cross-reference binding beyond what native `/create-*` commands offer.

## MCP Apps (VS Code 1.109)

MCP servers can now provide **rich interactive UI** in chat responses via MCP Apps.

### Capabilities
- **Dashboards**: Display data visualizations, metrics, flame graphs
- **Forms**: Interactive input for configuration or parameters
- **Visualizations**: Render charts, diagrams, and custom widgets
- **Rich output**: Go beyond plain text responses with dynamic content

### Use Cases
- Performance profiling tools returning flame graphs
- Database tools with interactive query builders
- Deployment tools with status dashboards
- Configuration tools with form-based editors

**Reference**: [MCP Servers Documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)

## Organization-Wide Assets (VS Code 1.109)

Organizations can share Copilot customization assets (instructions and agents) across all repositories within the organization.

### Organization Instructions
- Shared coding standards and guidelines applied organization-wide
- Configured through GitHub organization Copilot settings
- Controlled via: `github.copilot.chat.organizationInstructions.enabled` setting

### Organization Agents
- Shared specialist agents accessible across all organization repositories
- Managed centrally by organization admins
- Users can enable/disable: `github.copilot.chat.organizationAgents.enabled`

### Pattern
```
Organization Level (GitHub settings)
├── Shared instructions (coding standards, security policies)
└── Shared agents (org-wide specialists)

Repository Level (.github/)
├── Project-specific instructions
├── Project-specific agents
└── Project-specific skills + prompts
```

Organization-level assets complement (not replace) repository-level customization.

## Efficiency Guidelines

### Token Optimization
**Patterns**: Concise phrasing, eliminate redundancy, minimize boilerplate, reference shared patterns
**Context Management**: quick-advice (top 3 issues), standard (full analysis), deep-architecture (governance + lifecycle)

### Asset Integration
**Framework Components**: Instructions (workflows), Prompts (templates), Agents (roles), Tools (MCP + approvals)
**Cross-References**: Maintain functional links, validate dependencies, ensure compatibility

### Change Management
**Versioning**: Consistent metadata, schema versions, compatibility markers  
**Tracking**: Document modifications, clear version increments, backward compatibility  
**Testing**: Validate cross-references and dependencies after changes

## Audit Framework

### Audit Dimensions (v1.0)

Universal evaluation criteria for Copilot customization assets:

| Dimension | Criteria |
|-----------|----------|
| **Structure** | Schema compliance, ordered sections, handoffs |
| **Clarity** | Unambiguous role, explicit workflows, measurable outcomes |
| **Guardrails** | Missing info handling, refusal rules, compliance triggers |
| **Consistency** | Shared terminology, version alignment |
| **Extensibility** | Handoff commands, modular sections, future-proofing |
| **Token Efficiency** | Concise phrasing, minimal boilerplate |
| **Tool Integration** | MCP servers, tool sets, approval workflows |
| **Security** | Tool trust management, safe defaults |
| **Governance** | Change logs, version tags, sync capabilities |

### Standard Output Patterns

1. **Audit Report**: Gap analysis with recommendations
2. **Improvement Roadmap**: Prioritized enhancement plan with handoffs
3. **Refactored Artifacts**: Optimized files with preserved functionality
4. **Tool Configuration**: MCP server setup and tool sets
5. **Security Assessment**: Tool approval patterns and trust configs
6. **Executive Summary**: Compressed overview (on `refine: concise`)
7. **Governance Addendum**: Policy framework with sync (deep-architecture)
8. **Agent Guidance**: `AGENTS.md`/`.agent.md` with handoffs, tools, security

### Governance Framework

**Artifact Management**  
Headers: Maintain version tracking in markdown content, `depthModes`, `refinementCommands`  
Conflict Resolution: explicit chat > nearest `AGENTS.md` > global instructions  
Actionability: Build/test commands, code style, PR guidelines, security notes  
Alignment: Consistency between custom agents, instruction files, prompt files

**Version Control**  
Schema Tracking: VS Code Copilot version compatibility  
Change Impact: Effects on dependent assets and workflows  
Migration Support: Upgrade paths for schema changes  
Cross-Device Sync: VS Code Settings Sync compatibility

### Evaluation Framework

**Assessment Categories**  
Structural: Schema compliance, cross-references, handoffs, tool configs  
Functional: Role clarity, workflow effectiveness, error handling, UX  
Technical: Code quality, security patterns, performance, integration

**Metrics & KPIs**  
Quantitative: Schema compliance %, cross-reference accuracy, tool integration success, handoff completion  
Qualitative: User satisfaction, maintainability, documentation clarity, security posture

### Continuous Improvement

**Feedback Loops**  
User Experience: Usage patterns and pain points  
Performance: Response times and accuracy metrics  
Compliance: VS Code Copilot standard changes  
Best Practices: Industry standards and improvements

**Optimization Strategies**  
Token Efficiency: Regular review and compression  
Workflow: Eliminate redundant steps  
Tool Integration: Enhance MCP and tool configs  
Security: Strengthen approval patterns and trust

---

## Processing Metadata

- **Standards Version**: VS Code Copilot v2026.03 (Agent Files v1.112)
- **Role**: Universal Copilot customization workflows, standards, and quality patterns
- **Scope**: Applies to all assets (.github/**/*)
- **Audit Framework**: 6-dimensional quality assessment criteria

*Generated following CopilotCustomizer instruction generation standards*

---

## Change History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-01-15 | Initial release |

*Complete security patterns: [Security.instructions.md](Security.instructions.md)*