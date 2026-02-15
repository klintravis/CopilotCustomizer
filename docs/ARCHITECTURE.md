# CopilotCustomizer Architecture

A comprehensive VS Code GitHub Copilot customization framework for asset generation, harmonization, formatting, and optimization.

## Overview

**CopilotCustomizer is a toolbox framework** - use it to enhance ANY repository with **Agent Skills** (cross-platform capabilities), custom agents, instructions, and prompts. Works via VS Code multi-workspace pattern: keep CopilotCustomizer separate, use it to generate assets in your actual projects.

**Skills First**: Agent Skills (open standard at agentskills.io) are portable across VS Code, GitHub Copilot CLI, Claude, Cursor, and more. CopilotCustomizer generates Skills alongside traditional VS Code-specific assets.

**Pattern**: Don't copy → Use as workspace #2 → Generate into target repo → Close when done

### Documentation

For setup and usage, see:
- [QUICKSTART.md](QUICKSTART.md) - Get started in 5 minutes
- [README.md](../README.md) - Overview + key commands
- [HOW-TO.md](HOW-TO.md) - Complete commands reference and skills guide

---

## Unified Orchestrator Architecture

**CopilotCustomizer** (single entry point for all workflows):
- `CopilotCustomizer.agent.md` — **Unified orchestrator** for all workflows
  - `Bootstrap.agent.md` — Repository bootstrap workflow (subagent)
  - `Planner.agent.md` — Asset recommendation and specification (subagent)
  - `Generator.agent.md` — Multi-asset creation engine (subagent)
  - `Editor.agent.md` — Precise file operations (subagent)
  - `Verifier.agent.md` — Schema validation + harmonization (subagent)
  - `Evolve.agent.md` — Toolkit self-improvement specialist (subagent)

**Orchestration model**: All workflows are driven programmatically via the `agent` tool. No manual handoff buttons — the orchestrator manages the full subagent chain autonomously.

All orchestration is programmatic via the `agent` tool — no manual handoff buttons.

---

## Asset Types & Inventory

### Asset Types & Current Inventory

| Type | Location | Purpose | YAML Requirements |
|------|----------|---------|-------------------|
| **Skills** | `.github/skills/*/SKILL.md` | Cross-platform AI capabilities | None |
| **Agents** | `.github/agents/*.agent.md` | VS Code specialists | `description` |
| **Instructions** | `.github/instructions/*.instructions.md` | Coding standards | `applyTo`, `description` |
| **Prompts** | `.github/prompts/*.prompt.md` | Slash commands | Optional: `agent`/`mode` |
| **Standards** | `.github/standards/**/*.md` | Enterprise standards | `name`, `scope`, `priority` |
| **Templates** | `.github/templates/*.template.md` | Document formats | None |
| **Hooks** | `.github/hooks/*.json` | Lifecycle automation | Hook schema (event, command, timeout) |
| **Scripts** | `.github/scripts/*.js` | Hook implementations | None |
| **Plans** | `docs/plans/*.md` | Archived implementation plans | None |
| **AGENTS.md** | Repository root | Project guidance | None |

**Skills** (6 core + project-specific): `repo-analysis`, `planning`, `asset-design`, `documentation`, `deployment-automation`, `orchestration` | Bootstrap generates project-specific skills based on tech stack

**Agents** (7 in orchestrator hierarchy): `CopilotCustomizer` (orchestrator) → `Bootstrap`, `Planner`, `Generator`, `Editor`, `Verifier`, `Evolve` (subagents)

**Instructions** (12): Generation frameworks (`SkillAuthoring`, `AgentAuthoring`, `PromptAuthoring`, `InstructionAuthoring`, `Orchestration`, `AgentsFile`), Standards (`Standards`), Quality (`Framework`, `Security`, `Maintenance`, `RepoReview`, `ToolkitOps`)

**Prompts** (11): Core (`Bootstrap`, `Review`), Generation (`NewSkill`, `NewAgent`, `NewInstructions`, `NewPrompt`, `NewMultiAgent`, `NewAgentsFile`), Evolution (`Evolve`), Maintenance (`Maintain`, `QuickFix`)

**Templates** (4): `Analysis`, `ImplementationPlan`, `OrchestrationPlan`, `ChangeLog`

**Hooks** (1): `subagent-tracking.json` — Orchestration lifecycle logging for all 8 VS Code hook events (SessionStart, UserPromptSubmit, SubagentStart, SubagentStop, PreToolUse, PostToolUse, PreCompact, Stop)

**Scripts** (1): `log-orchestration.js` — Hook implementation for automated orchestration metrics with session-based logging to `.github/logs/sessions/<timestamp>/` (orchestration.log, metrics.json, session-state.json)

**Plans** (2): Archived implementation plans with decision records (`Toolkit-Structure-Standardization.md`, `VSCode-v1109-Alignment.md`)

---

## Design Patterns

### Multi-Workspace Pattern

```
VS Code Workspace
├── your-project/           ← Active development
│   ├── src/
│   └── .github/            ← Generated assets
└── CopilotCustomizer/      ← Framework (read-only)
```

**Workflow**: Add CopilotCustomizer → `/Bootstrap` → Assets generate in your project → Close CopilotCustomizer

### Enterprise Standards Pattern

Standards in `.github/standards/` define organizational conventions. During generation, `Standards.instructions.md` matches standards by tech stack, then passes principles to generators. 

### Skills-First Strategy

Workflow: Skill (analysis) → Agent (VS Code operations) → Skill (documentation)  
Example: `repo-analysis` → Editor agent → Verifier agent → `documentation`

### Asset Naming Conventions

- **Agents**: `{Role}.agent.md` (e.g., `Editor.agent.md`)
- **Instructions**: `{Action}.instructions.md` (e.g., `SkillAuthoring.instructions.md`)
- **Prompts**: `{Verb}{Object}.prompt.md` (e.g., `NewAgent.prompt.md`)
- **Skills**: `{lowercase-with-hyphens}/SKILL.md` (e.g., `deployment-automation/SKILL.md`)
- **Templates**: `{Format}.template.md` (e.g., `ImplementationPlan.template.md`)

---

## Asset Schema & Structure

**Agents** (`*.agent.md`):  
YAML: `description` (required) | Optional: `tools`, `handoffs`, `agents`, `user-invokable`, `model`  
Structure: Role, Core Objectives, Workflow, Tool Configuration, Handoff Workflows

**Skills** (`.github/skills/*/SKILL.md`):  
No YAML required | Free-form Markdown explaining methodology and usage patterns

**Instructions** (`*.instructions.md`):  
YAML: `applyTo`, `description` (required)  
Structure: Objective, Constraints, Workflow, Standards

**Prompts** (`*.prompt.md`):  
YAML: `agent`/`mode` (optional)  
Structure: Task Intent, Usage Instructions, Variable Block, Validation Rules

**Standards** (`.github/standards/**/*.md`):  
YAML: `name`, `scope`, `priority` (required) | Optional: `techStack`, `category`  
Structure: Overview, Principles, Implementation, Examples

---

## Asset Relationships & Harmonization

### Cross-Reference Patterns

The CopilotCustomizer framework uses a comprehensive harmonization system:

```
Instructions ←→ Prompts (Paired execution)
    ↕                ↕
Custom Agent ←→ Agent Files (Contextual binding)
```

### Binding Relationships

| Instruction File | Paired Prompt | Agent Mode | Purpose |
|------------------|---------------|------------|---------|
| `AgentsFile.instructions.md` | `NewAgentsFile.prompt.md` | CopilotCustomizer | Workspace AGENTS.md creation |
| `AgentAuthoring.instructions.md` | `NewAgent.prompt.md` | CopilotCustomizer | VS Code .agent.md creation |
| `InstructionAuthoring.instructions.md` | `NewInstructions.prompt.md` | CopilotCustomizer | Instruction file creation |
| `PromptAuthoring.instructions.md` | `NewPrompt.prompt.md` | CopilotCustomizer | Prompt file creation |
| `SkillAuthoring.instructions.md` | `NewSkill.prompt.md` | CopilotCustomizer | Cross-platform skill creation |
| `Orchestration.instructions.md` | `NewMultiAgent.prompt.md` | CopilotCustomizer | Multi-agent orchestrated system creation |
| `Maintenance.instructions.md` | `Maintain.prompt.md` | CopilotCustomizer | Asset maintenance (optimize, harmonize, validate) |
| `RepoReview.instructions.md` | `Review.prompt.md` | CopilotCustomizer | Repository analysis |
| `Standards.instructions.md` | N/A | CopilotCustomizer | Standards resolution (generation-time) |
| `Framework.instructions.md` | N/A | CopilotCustomizer | Universal quality patterns |
| `Security.instructions.md` | N/A | CopilotCustomizer | Security guardrails |
| `ToolkitOps.instructions.md` | `Evolve.prompt.md` | CopilotCustomizer | Toolkit self-improvement |

To avoid inventory drift, treat the folders as the source of truth:

- Prompts: `.github/prompts/`
- Instructions: `.github/instructions/`
- Agents: `.github/agents/`
- Skills: `.github/skills/`
- Standards: `.github/standards/`
- Templates: `.github/templates/`

---

## Usage Workflows

### Asset Creation Workflow

1. **Choose Asset Type**: Select from custom agent, instructions, prompt, skill, or AGENTS.md
2. **Use Generation Pair**: Apply instruction + prompt combination
3. **Customize Variables**: Provide inline variables in the slash command  
4. **Execute**: Run the workflow via slash command (see HOW-TO cheat sheet)
5. **Validate Output**: Check schema compliance and functionality

### Asset Maintenance Workflow

1. **Audit Repository**: Use `/Review` for analysis
2. **Identify Improvements**: Apply gap analysis recommendations
3. **Optimize + Format**: Use `/Maintain` with optimize mode
4. **Harmonize + Validate**: Use `/Maintain` with harmonize mode

### Quality Assurance Workflow

1. **Schema Validation**: Ensure YAML front matter compliance
2. **Cross-Reference Check**: Verify asset binding integrity  
3. **Functionality Test**: Execute assets in clean VS Code environment
4. **Documentation Review**: Validate examples and usage instructions
5. **Performance Optimization**: Apply token efficiency improvements

---

## Best Practices

**File Organization**: Consistent naming, clear separation, skills for cross-platform, agents for VS Code  
**Schema Compliance**: VS Code v1.109 standards, required YAML only, relative paths  
**Version Management**: Track schema versions, maintain backward compatibility  
**Orchestration**: Programmatic handoffs via `agent` tool, focused subagents, parallel execution (v1.109)

---

## Schema Compliance

### VS Code Copilot Requirements

This framework complies with **VS Code Copilot Customization v1.109** standards (backwards compatible with v1.106+):

- **Custom Agents**: Required `description`; optional `target`, `name`, `argument-hint`, `tools`, `model` (string or array for fallback), `handoffs` (with optional model parameter), `mcp-servers`, `user-invokable`, `disable-model-invocation`, `agents` (VS Code 1.109; enhanced orchestration controls)
- **Agent Skills**: Generally available (GA) in v1.109; enabled by default with custom location support
- **Instructions**: Required `applyTo` and `description` fields; supports organization-wide instructions
- **Prompts**: Optional `mode` or `agent` binding, structured YAML front matter
- **File Organization**: Standard `.github/` directory structure with configurable locations
- **Cross-References**: Relative path linking between assets
- **Parallel Execution**: Subagents run in parallel automatically when independent (v1.109+)

### Framework Extensions

Beyond basic compliance, this framework adds:

- **Harmonization Metadata**: Cross-reference binding and version tracking
- **Depth Modes**: Multi-level interaction support (documented in Markdown body, not YAML)
- **Refinement Commands**: Interactive improvement capabilities (documented in Markdown body)
- **Universal Compatibility**: Repository-agnostic helper assets
- **Template System**: Standardized document generation
- **Standards Pattern**: Enterprise coding standards integration

### Advanced Features

#### Depth Mode Support

Most assets support multiple interaction levels; document these in the Markdown body (not YAML front matter):

```
Depth modes:
- quick-advice: Fast, focused responses (3-5 bullets)
- standard: Complete analysis and recommendations  
- deep-architecture: Comprehensive system design and governance
```

#### Refinement Commands

Document refinement commands in the Markdown body (not YAML front matter):

```
Refinement commands:
- refine: audit - Re-run analysis with updated context
- refine: optimize - Focus on performance and maintainability
- refine: concise - Generate executive summary
- refine: prompts - Optimize prompt structure and tokens
```

---

**Framework**: CopilotCustomizer v1.5.0  
**Standards**: VS Code Copilot v2025.11 (Agent Files v1.109)  
**Contributors**: Asset validation via Verifier + Evolve agents

---

## Troubleshooting

**Asset Not Loading**: Check YAML syntax, verify directory, ensure file extension matches  
**Custom Agent Not Available**: Confirm `description` field, restart VS Code  
**Instructions Auto-Loading**: Review `applyTo` scope, avoid overly broad patterns  
**Cross-References Broken**: Validate paths, ensure files exist, check typos

**Validation**: `find .github -name "*.agent.md"` | Chat Diagnostics (right-click → Diagnostics)

---

## Support & Resources

### Documentation
- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[HOW-TO.md](HOW-TO.md)** - Comprehensive usage guide and slash commands
- **[README.md](../README.md)** - Project overview and core concepts
- **[VS Code Copilot Docs](https://code.visualstudio.com/docs/copilot/customization/overview)** - Official Microsoft documentation

### Internal Resources
- **Issue Tracking** - Report bugs and request features
- **Internal Documentation Portal** - Enterprise knowledge base
- **Technical Training** - Custom asset development and best practices

---

## License & Attribution

**License**: MIT - See [LICENSE](../LICENSE) for full text  
**Framework**: CopilotCustomizer v1.5.0  
**Compliance**: VS Code GitHub Copilot Customization Standards v1.109 (v1.106+ compatible)  
**Generated**: 2026-02-15 via Documentation Harmonization

---

*This documentation is automatically maintained and updated as part of the CopilotCustomizer framework.*
