---
agent: CopilotCustomizer
---

## Orchestrated System Generation Prompt (v1.0)

```
✨ PROMPT ACTIVATED: NewOrchestratedSystem (Orchestrated System Generator)
   Purpose: Generate conductor/subagent orchestrated systems for target repositories
   Standard: VS Code (.agent.md + plans/ + .vscode/settings.json)
   Instructions: GenerateOrchestratedSystem.instructions.md
   Skills: multi-agent-orchestration
   Input: SYSTEM_NAME, SYSTEM_PATTERN, REPOSITORY_PATH
   Output: Complete orchestrated system with conductor, subagents, plan files, VS Code config
   Scope: Multi-agent orchestration for complex project workflows
```

**Paired Instructions**: [GenerateOrchestratedSystem.instructions.md](../instructions/GenerateOrchestratedSystem.instructions.md)
**Skill Reference**: [multi-agent-orchestration](../skills/multi-agent-orchestration/SKILL.md)

### Task Intent
Generate a complete orchestrated multi-agent system (conductor + subagents) for a target repository, with TDD lifecycle enforcement, quality gates, and plan file tracking.

### Variable Block
```
SYSTEM_NAME [REQUIRED]: "{Name for the orchestrated system}"
SYSTEM_PATTERN [REQUIRED]: "{orchestra | atlas | custom}"
REPOSITORY_PATH [REQUIRED]: "{Absolute path to the target repository}"
DOMAIN [OPTIONAL]: "{Project domain for tailoring agent expertise}"
CUSTOM_AGENTS [OPTIONAL]: "{Comma-separated roles for custom pattern}"
TDD_ENFORCEMENT [OPTIONAL]: "{strict | relaxed | none}" (default: strict)
PARALLEL_ENABLED [OPTIONAL]: "{true | false}" (default: true for atlas, false for orchestra)
```

### Variable Descriptions
- **SYSTEM_NAME**: Name for the system (used as prefix for agent files, e.g., "FeatureOrchestra" → FeatureConductor.agent.md)
- **SYSTEM_PATTERN**: Orchestration pattern — `orchestra` (3-5 agents), `atlas` (5-10 agents), `custom` (user-defined)
- **REPOSITORY_PATH**: Absolute path to the target repository where agents will be generated
- **DOMAIN**: Project domain (e.g., "REST API", "React frontend", "data pipeline") for tailoring agent expertise
- **CUSTOM_AGENTS**: Only for `custom` pattern — comma-separated roles (e.g., "planner, implementer, tester, deployer")
- **TDD_ENFORCEMENT**: `strict` requires Plan→Test→Implement→Review→Commit per phase; `relaxed` makes tests optional; `none` disables TDD
- **PARALLEL_ENABLED**: Enable parallel subagent execution (Atlas default: true, Orchestra default: false)

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
```
/NewOrchestratedSystem SYSTEM_NAME: "FeatureOrchestra", SYSTEM_PATTERN: "orchestra", REPOSITORY_PATH: "/Users/dev/my-api-project", DOMAIN: "Node.js REST API"
```

### Example with Custom Pattern
```
/NewOrchestratedSystem SYSTEM_NAME: "DataPipeline", SYSTEM_PATTERN: "custom", REPOSITORY_PATH: "/Users/dev/etl-project", DOMAIN: "Python ETL", CUSTOM_AGENTS: "planner, extractor, transformer, loader, validator", TDD_ENFORCEMENT: "relaxed"
```

**Generated using**: [GenerateOrchestratedSystem.instructions.md](../instructions/GenerateOrchestratedSystem.instructions.md)

---

*VS Code Copilot Customization Framework v1.0*
