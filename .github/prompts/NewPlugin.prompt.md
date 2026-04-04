---
description: 'Create an Agent Plugin — bundled package of skills, agents, hooks, and MCP servers'
argument-hint: 'Plugin name and purpose — e.g., "Python DevOps" for CI/CD automation'
agent: CopilotCustomizer
tools: ['execute', 'read', 'edit', 'search', 'web', 'todo']
---

## NewPlugin (v1.0)

### Task Intent
Generate a complete VS Code Agent Plugin package that bundles skills, agents, hooks, and MCP server configurations into a single installable unit.

### Variable Block
---
**Plugin Name** [REQUIRED]: ${input:pluginName:Name for the plugin (e.g., python-devops)}
**Purpose** [REQUIRED]: ${input:purpose:What the plugin does and who it's for}
**Components** [OPTIONAL]: ${input:components:skills, agents, hooks, mcp (default: all)}
**Repository Path** [OPTIONAL]: ${input:repositoryPath:Target repo path (default: current workspace)}
---

### Plugin Structure

Generated plugin follows the VS Code Agent Plugin format:

```
.github/plugins/{plugin-name}/
├── plugin.json              # Plugin metadata
├── skills/                  # Bundled skills
│   └── {skill-name}/
│       └── SKILL.md
├── agents/                  # Bundled agents
│   └── {Agent}.agent.md
├── hooks/                   # Bundled hooks
│   └── hooks.json
├── scripts/                 # Hook scripts
│   └── {script}.sh
└── .mcp.json                # MCP server configs
```

### plugin.json Schema

```json
{
  "name": "{plugin-name}",
  "version": "1.0.0",
  "description": "{purpose}",
  "engines": {
    "vscode": "^1.110.0"
  }
}
```

### Generation Workflow

1. **Analyze Requirements**: Determine which components the plugin needs
2. **Generate Skills**: Create SKILL.md files for portable capabilities
3. **Generate Agents**: Create .agent.md files for VS Code specialists
4. **Generate Hooks**: Create hooks.json for lifecycle automation
5. **Configure MCP**: Set up .mcp.json for external tool integration
6. **Bundle**: Create plugin.json with metadata
7. **Validate**: Verify all cross-references and paths

### Refinement Commands

| Command | Action |
|---------|--------|
| `refine: components` | Add or remove plugin components |
| `refine: scope` | Narrow or expand plugin capabilities |
| `refine: mcp` | Configure MCP server integrations |

### Framework References
*Agent Plugins: [Framework.instructions.md](../instructions/Framework.instructions.md)*
*Skills: [SkillAuthoring.instructions.md](../instructions/SkillAuthoring.instructions.md)*
*Agents: [AgentAuthoring.instructions.md](../instructions/AgentAuthoring.instructions.md)*

---

*Generated following CopilotCustomizer prompt generation standards*
