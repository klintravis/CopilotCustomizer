---
description: Generate a complete conductor/subagent orchestrated system for a target repository
argument-hint: Provide the system name and repository path
agent: CopilotCustomizer
name: NewMultiAgent
model: Claude Sonnet 4.5 (copilot)
tools: ['execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']

---

## Multi-Agent System Generation Prompt (v2.0)

**Paired Instructions**: [Orchestration.instructions.md](../instructions/Orchestration.instructions.md)
**Skill Reference**: [orchestration](../skills/orchestration/SKILL.md)

### Task Intent
Generate multi-agent systems ranging from simple sequential handoff chains to complex conductor/subagent orchestration with TDD lifecycle enforcement, quality gates, and plan file tracking.

### System Patterns

| Pattern | Complexity | Agent Count | Use Case |
|---------|-----------|-------------|----------|
| **linear** | Simple | 2-4 | Sequential handoff chains (A→B→C) with automated transitions |
| **orchestra** | Medium | 3-5 | Conductor-driven workflow with specialized subagents |
| **atlas** | High | 5-10 | Complex orchestration with parallel execution and quality gates |
| **custom** | Variable | User-defined | Fully customized agent composition and workflow |

### Variable Block
---
**System Name** [REQUIRED]: ${input:systemName:Name for the system (e.g., FeatureOrchestra, DataFlow)}
**Repository Path** [REQUIRED]: ${input:repositoryPath:Absolute path to the target repository}
**System Pattern** [OPTIONAL]: ${input:systemPattern:linear, orchestra, atlas, or custom (default: orchestra)}
**Domain** [OPTIONAL]: ${input:domain:e.g., REST API, React frontend, data pipeline}
**Custom Agents** [OPTIONAL]: ${input:customAgents:Comma-separated roles for custom pattern}
**TDD Enforcement** [OPTIONAL]: ${input:tddEnforcement:strict, relaxed, or none (default: strict)}
**Parallel Enabled** [OPTIONAL]: ${input:parallelEnabled:true or false (default: pattern-dependent)}
---

### Variable Descriptions
- **systemName**: Used as prefix for agent files (e.g., "FeatureOrchestra" → FeatureConductor.agent.md; "DataFlow" → DataFlowEntry.agent.md for linear)
- **systemPattern**: 
  - `linear`: Simple sequential handoff chain (2-4 agents, A→B→C)
  - `orchestra`: Conductor + 3-5 specialized subagents with quality gates
  - `atlas`: Conductor + 5-10 subagents with parallel execution
  - `custom`: User-defined agent composition
  - Default: orchestra
- **repositoryPath**: Absolute path to the target repository where agents will be generated
- **domain**: Project domain for tailoring agent expertise
- **customAgents**: Only for `custom` pattern — comma-separated roles (e.g., "planner, implementer, tester, deployer")
- **tddEnforcement**: `strict` = Plan→Test→Implement→Review→Commit per phase; `relaxed` = tests optional; `none` = disabled (note: linear patterns typically use `relaxed`)
- **parallelEnabled**: Atlas default: true, Orchestra default: false, Linear: N/A

### Generation Workflow

**Phase 1: Repository Analysis**
- Analyze target repository tech stack, structure, and complexity
- Identify domain-specific agent needs
- Assess parallel execution opportunities

**Phase 2: System Architecture**
- Select agents based on pattern and domain
- Define phase sequence with quality gates
- Map model tiers and tool sets per agent

**Phase 3: Architecture Presentation** (PAUSE)
- Present system architecture to user:
  - Conductor definition
  - Subagent list with roles, models, tools
  - Phase sequence with quality gates
  - TDD enforcement level
- **Wait for user to type `confirm` before generating files**

**Phase 4: Agent Generation**
- Generate conductor agent file
- Generate all subagent files
- Create plans/PLAN.md from template
- Update .vscode/settings.json

**Phase 5: Cross-Reference Binding**
- Establish conductor → subagent references
- Validate all agent references resolve
- Add system to AGENTS.md inventory

**Phase 6: Validation**
- Run orchestrated system verification checklist
- Report any issues found

**Phase 7: Summary**
- List all generated files
- Provide usage instructions
- Note any manual steps needed

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: agents` | Adjust agent composition (add, remove, modify roles) |
| `refine: gates` | Modify quality gate criteria and placement |
| `refine: tdd` | Change TDD enforcement level or per-phase requirements |
| `refine: parallel` | Enable/disable parallel execution, adjust groups |
| `refine: models` | Change model tier assignments for agents |

### Output
- Conductor agent file (`.github/agents/{Name}Conductor.agent.md`)
- Subagent files (`.github/agents/{Name}{Role}.agent.md` per subagent)
- Plan file template (`plans/PLAN.md`)
- VS Code settings update (`.vscode/settings.json`)
- Updated AGENTS.md with system inventory
- Generation summary with usage instructions

### Usage Example

**Linear handoff chain (simple)**:
```
/NewMultiAgent SYSTEM_NAME: "DataFlow", SYSTEM_PATTERN: "linear", REPOSITORY_PATH: "/Users/dev/my-project", DOMAIN: "Data processing"
```

**Orchestra pattern (medium complexity)**:
```
/NewMultiAgent SYSTEM_NAME: "FeatureOrchestra", SYSTEM_PATTERN: "orchestra", REPOSITORY_PATH: "/Users/dev/my-api-project", DOMAIN: "Node.js REST API"
```

### Example with Custom Pattern
```
/NewMultiAgent SYSTEM_NAME: "DataPipeline", SYSTEM_PATTERN: "custom", REPOSITORY_PATH: "/Users/dev/etl-project", DOMAIN: "Python ETL", CUSTOM_AGENTS: "planner, extractor, transformer, loader, validator", TDD_ENFORCEMENT: "relaxed"
```

**Generated using**: [Orchestration.instructions.md](../instructions/Orchestration.instructions.md)

---

*VS Code Copilot Customization Framework v2.0*
