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
Generate multi-agent systems ranging from simple sequential handoff chains to complex conductor/subagent orchestration with spec-driven lifecycle, quality gates, and plan file tracking.

### System Patterns

| Pattern | Complexity | Agent Count | Use Case |
|---------|-----------|-------------|----------|
| **linear** | Simple | 2-4 | Sequential handoff chains (A→B→C) with automated transitions |
| **orchestra** | Medium | 3-5 | Conductor-driven workflow with specialized subagents |
| **atlas** | High | 5-10 | Complex orchestration with parallel execution and quality gates |
| **pipeline** | Very High | 6-15+ | Multi-orchestrator lifecycle stages with shared agent pool |
| **custom** | Variable | User-defined | Fully customized agent composition and workflow |

### Variable Block
---
**System Name** [REQUIRED]: ${input:systemName:Name for the system (e.g., FeatureOrchestra, DataFlow)}
**Repository Path** [REQUIRED]: ${input:repositoryPath:Absolute path to the target repository}
**System Pattern** [OPTIONAL]: ${input:systemPattern:linear, orchestra, atlas, or custom (default: orchestra)}
**Domain** [OPTIONAL]: ${input:domain:e.g., REST API, React frontend, data pipeline}
**Custom Agents** [OPTIONAL]: ${input:customAgents:Comma-separated roles for custom pattern}
**Stages** [OPTIONAL]: ${input:stages:Comma-separated lifecycle stages for pipeline pattern (default: planning, implementation, testing, review)}
**Shared Agents** [OPTIONAL]: ${input:sharedAgents:Comma-separated shared specialist roles for pipeline pattern}
**Spec Enforcement** [OPTIONAL]: ${input:specEnforcement:full, lightweight, or none (default: full)}
**Parallel Enabled** [OPTIONAL]: ${input:parallelEnabled:true or false (default: pattern-dependent)}
---

### Variable Descriptions
- **systemName**: Used as prefix for agent files (e.g., "FeatureOrchestra" → FeatureConductor.agent.md; "DataFlow" → DataFlowEntry.agent.md for linear)
- **systemPattern**:
  - `linear`: Simple sequential handoff chain (2-4 agents, A→B→C)
  - `orchestra`: Conductor + 3-5 specialized subagents with quality gates
  - `atlas`: Conductor + 5-10 subagents with parallel execution
  - `pipeline`: Pipeline Controller + sub-orchestrators per lifecycle stage + shared specialist pool (6-15+ agents)
  - `custom`: User-defined agent composition
  - Default: orchestra
- **repositoryPath**: Absolute path to the target repository where agents will be generated
- **domain**: Project domain for tailoring agent expertise
- **customAgents**: Only for `custom` pattern — comma-separated roles (e.g., "planner, implementer, tester, deployer")
- **stages**: Only for `pipeline` pattern — comma-separated lifecycle stages (default: "planning, implementation, testing, review"). Each stage gets its own sub-orchestrator agent.
- **sharedAgents**: Only for `pipeline` pattern — comma-separated shared specialist roles (e.g., "codebase-analyzer, frontend-dev, backend-dev, database-dev, security-auditor"). All specialists are available to all sub-orchestrators.
- **specEnforcement**: `full` = Spec→Implement→Validate→Review→Commit per phase; `lightweight` = validation optional; `none` = disabled (note: linear patterns typically use `lightweight`)
- **parallelEnabled**: Atlas default: true, Orchestra default: false, Pipeline default: true (within stages), Linear: N/A

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
  - Spec enforcement level
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
| `refine: spec` | Change spec enforcement level or per-phase requirements |
| `refine: parallel` | Enable/disable parallel execution, adjust groups |
| `refine: models` | Change model tier assignments for agents |

### Output

**Orchestra/Atlas patterns**:
- Conductor agent file (`.github/agents/{Name}Conductor.agent.md`)
- Subagent files (`.github/agents/{Name}{Role}.agent.md` per subagent)
- Plan file template (`plans/PLAN.md`)
- VS Code settings update (`.vscode/settings.json`)
- Updated AGENTS.md with system inventory
- Generation summary with usage instructions

**Pipeline pattern**:
- Pipeline Controller agent file (`.github/agents/{Name}Controller.agent.md`)
- Sub-orchestrator files (`.github/agents/{Name}{Stage}Orchestrator.agent.md` per stage)
- Shared specialist files (`.github/agents/{Name}{Role}.agent.md` per specialist)
- Pipeline plan file (`plans/PIPELINE-PLAN.md`)
- VS Code settings update (`.vscode/settings.json`)
- Updated AGENTS.md with system inventory
- Generation summary with usage instructions

### Usage Example

**Linear handoff chain (simple)**:
```
/NewMultiAgent systemName: "DataFlow", systemPattern: "linear", repositoryPath: "/Users/dev/my-project", domain: "Data processing"
```

**Orchestra pattern (medium complexity)**:
```
/NewMultiAgent systemName: "FeatureOrchestra", systemPattern: "orchestra", repositoryPath: "/Users/dev/my-api-project", domain: "Node.js REST API"
```

**Pipeline pattern (full lifecycle orchestration)**:
```
/NewMultiAgent systemName: "FullStack", systemPattern: "pipeline", repositoryPath: "/Users/dev/fullstack-app", domain: "Full-stack monorepo", stages: "planning, implementation, testing, review, deployment", sharedAgents: "codebase-analyzer, frontend-dev, backend-dev, database-dev, api-designer, security-auditor, test-writer"
```

### Example with Custom Pattern
```
/NewMultiAgent systemName: "DataPipeline", systemPattern: "custom", repositoryPath: "/Users/dev/etl-project", domain: "Python ETL", customAgents: "planner, extractor, transformer, loader, validator", specEnforcement: "lightweight"
```

**Generated using**: [Orchestration.instructions.md](../instructions/Orchestration.instructions.md)

---

*VS Code Copilot Customization Framework v2.0*
