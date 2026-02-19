---
applyTo: '.github/**/*.{agent.md,prompt.md}'
description: 'Framework for generating orchestrated multi-agent systems (Orchestra, Atlas, Pipeline, Custom) with spec-driven lifecycle, quality gates, and plan file tracking'
---

# Multi-Agent Orchestration Guide (v2.1)

**Paired Prompt**: [NewMultiAgent.prompt.md](../prompts/NewMultiAgent.prompt.md)

### Purpose
Generate multi-agent systems ranging from simple sequential handoff chains to complex conductor/subagent orchestration and multi-orchestrator pipeline workflows. Produces agent files, plan templates, and VS Code configuration for coordinated multi-agent workflows.

### System Pattern Selection

| Pattern | Complexity | Agent Count | Coordination | Quality Gates | Use Case |
|---------|-----------|-------------|--------------|---------------|----------|
| **linear** | Simple | 2-4 | Sequential handoffs | Optional | Linear workflows, simple task sequences |
| **orchestra** | Medium | 3-5 | Conductor-managed phases | 3+ mandatory | Structured features, refactoring |
| **atlas** | High | 5-10 | Conductor + parallel execution | 3+ mandatory | Large codebases, cross-cutting changes |
| **pipeline** | Very High | 6-15+ | Chained sub-orchestrators | Inter-stage + intra-stage | Full lifecycle orchestration, pluggable stages |
| **custom** | Variable | User-defined | Custom coordination | User-defined | Fully customized workflows |

### Linear Pattern (Simple Handoff Chains)

**Objectives**:
- 1-2 prompts gather complete context
- <5 user interactions per workflow
- 90%+ handoff success rate
- 70%+ shared instruction reuse

**Handoff Protocol**:
```yaml
handoffs:
  - label: 'Agent Name'
    agent: 'agent-id'
    prompt: 'Task description with context.'
    send: true
```

**Entry Point Design**:
1. Extract core requirements from minimal input
2. Infer context with smart defaults
3. Validate critical assumptions
4. Launch agent chain

**Quality Gates**: <3 (between agents, optional)
**Spec Enforcement**: Not enforced (lightweight or none)

## System Archetypes

### Orchestra (default: 4 agents)
```
Conductor → Planner → Implementer → Reviewer
```
- Best for: Structured feature implementation, refactoring
- Phases: Spec → Implement → Validate → Review → Commit
- Quality gates: 3 (planning, code review, commit)

### Atlas (default: 7 agents)
```
Conductor → Planner → Researcher → Scout → Implementer(s) → Reviewer → Specialist
```
- Best for: Large codebases, cross-cutting changes, parallel work
- Adds: Parallel execution, context conservation, research phase
- Quality gates: 3+ (planning, implementation, code review, commit)

### Pipeline (default: 4 sub-orchestrators + shared specialist pool)
```
Pipeline Controller → Planning Orchestrator → Implementation Orchestrator → Testing Orchestrator → Review Orchestrator
                      (each sub-orchestrator has access to ALL shared specialists)
```
- Best for: Full development lifecycle orchestration, pluggable workflows, multi-team projects
- Stages: Planning → Implementation → Testing → Review (pluggable — add Deployment, Documentation, etc.)
- Quality gates: Inter-stage (between sub-orchestrators) + intra-stage (within each sub-orchestrator)
- Parallel execution: Within stages (sub-orchestrators spawn parallel specialists)

### Custom
User-defined agent composition. Minimum: 1 conductor + 2 subagents.

## Pipeline Pattern Generation Rules

### Pipeline Controller Generation
```yaml
---
description: 'Pipeline Controller for {SystemName}: chains sub-orchestrators through lifecycle stages with inter-stage quality gates'
model: Claude Sonnet 4.5 (copilot)
tools: ['search', 'search/codebase', 'agent']
user-invokable: true
agents: ['{Stage1Orchestrator}', '{Stage2Orchestrator}', '{Stage3Orchestrator}', '{Stage4Orchestrator}']
handoffs:
  - label: 'Begin {stage 1} stage'
    agent: '{Stage1Orchestrator}'
    prompt: 'Execute {stage 1} stage with context: {stage context}'
    send: false
  - label: 'Begin {stage 2} stage'
    agent: '{Stage2Orchestrator}'
    prompt: 'Execute {stage 2} stage with context: {stage context}'
    send: false
---
```

### Pipeline Controller Required Markdown Sections
1. **Role** — Pipeline controller, manages stage transitions, never implements directly
2. **Stage Definitions** — Ordered list of stages with sub-orchestrator assignments
3. **Inter-Stage Quality Gates** — Gate definitions between each stage transition
4. **Stage Tracking** — Template for `plans/PIPELINE-PLAN.md` updates
5. **Pluggable Stage Protocol** — Instructions for adding/removing stages

### Pipeline Controller Constraints
- **No implementation tools**: Controller must NOT have `edit`, `terminal`
- **No specialist invocation**: Controller invokes sub-orchestrators only, never specialists directly
- **Stage-sequential**: Stages execute in order; no skipping or parallel stage execution
- **Inter-stage gates**: Must pause for approval between stages at defined gates

### Sub-Orchestrator Generation
```yaml
---
description: '{Stage} Orchestrator for {SystemName}: coordinates specialists for the {stage} lifecycle stage'
model: Claude Sonnet 4.5 (copilot)
tools: ['search', 'search/codebase', 'agent']
user-invokable: false
agents: ['{AllSharedSpecialists}']  # FULL shared pool — every specialist listed
handoffs:
  - label: 'Invoke {Specialist1}'
    agent: '{Specialist1}'
    prompt: '{Task for specialist}'
    send: false
  - label: 'Invoke {Specialist2}'
    agent: '{Specialist2}'
    prompt: '{Task for specialist}'
    send: false
---
```

### Sub-Orchestrator Required Markdown Sections
1. **Role** — Stage orchestrator, coordinates specialists within its lifecycle stage
2. **Stage Scope** — What this stage is responsible for (boundaries)
3. **Specialist Coordination** — Which specialists it typically invokes and in what order
4. **Intra-Stage Quality Gates** — Optional quality checkpoints within the stage
5. **Stage Completion Report** — Structured output format returned to Pipeline Controller

### Shared Agent Pool Rules
1. **All specialists listed everywhere** — Every sub-orchestrator's `agents` array must include ALL shared specialists
2. **Role determines usage** — Sub-orchestrator prompt/role determines which specialists it typically uses
3. **Cross-stage capability** — Any sub-orchestrator CAN invoke any specialist when needed (e.g., Implementation Orchestrator can invoke CodeReviewer for quick checks)
4. **Specialists are leaf nodes** — Specialists do NOT have `agent` tool; they cannot invoke other agents
5. **Specialists hidden from picker** — All specialists have `user-invokable: false`

### Stage Handoff Protocol
Context flows between stages via the Pipeline Controller:
1. Sub-orchestrator completes its stage and produces a **stage completion report**
2. Pipeline Controller receives the report and evaluates the **inter-stage quality gate**
3. If APPROVED, Pipeline Controller passes stage output as context to the next sub-orchestrator
4. If NEEDS_REVISION, Pipeline Controller re-invokes the current sub-orchestrator with feedback

### Pluggable Stage Insertion Rules
Adding a new stage to an existing Pipeline:
1. Create a new sub-orchestrator `.agent.md` with `agents` array listing ALL shared specialists
2. Add the sub-orchestrator to Pipeline Controller's `agents` array
3. Add a handoff entry to Pipeline Controller's `handoffs` at the desired position
4. Define an inter-stage quality gate for the new stage boundary
5. Update `plans/PIPELINE-PLAN.md` with the new stage definition
6. No modifications needed to existing sub-orchestrators or specialists

### Pipeline Plan File Rules
Generate `plans/PIPELINE-PLAN.md` using extended OrchestrationPlan template:
- Fill Pipeline Stages section with stage definitions, sub-orchestrators, and shared pool manifest
- Define inter-stage quality gates (one per stage boundary)
- Include stage-level state tracking (stage name, sub-orchestrator, status)
- Track both stage-level and phase-level progress within stages

### Pipeline Quality Gate Schema

**Inter-Stage Gate** (enforced by Pipeline Controller):
```markdown
## Inter-Stage Gate: {Stage A} → {Stage B}

**After Stage**: {stage name}
**Sub-Orchestrator**: {orchestrator that completed}
**Criteria**:
- [ ] Stage completion report produced
- [ ] All intra-stage quality checks passed
- [ ] Stage artifacts are complete and valid
- [ ] No blocking issues remain
**Outcomes**: APPROVED → advance to next stage | NEEDS_REVISION → re-run stage | FAILED → escalate
**Result**: [pending]
```

**Intra-Stage Gate** (enforced by sub-orchestrator, optional):
```markdown
## Intra-Stage Gate: {checkpoint name}

**Within Stage**: {stage name}
**Specialist**: {specialist that completed}
**Criteria**:
- [ ] {stage-specific criterion}
**Outcomes**: APPROVED → continue | NEEDS_REVISION → re-run specialist
**Result**: [pending]
```

## Conductor Generation Rules

### Required YAML Fields
```yaml
---
description: 'Orchestrates {SystemName}: coordinates {subagent list} through phases with quality gates and spec-driven enforcement'
model: Claude Sonnet 4.5 (copilot)
tools: ['search', 'search/codebase', 'agent']
agents: ['Planner', 'Implementer', 'Reviewer']  # Explicit allowed subagents list
handoffs:
  - label: '{Phase action}'
    agent: '{SubagentName}'
    prompt: '{Context for subagent}'
    send: false
---
```

### Required Markdown Sections
1. **Role** — Orchestration conductor, never implements directly
2. **Core Objectives** — Phase management, quality gates, state tracking, spec-driven enforcement
3. **Workflow** — Phase sequence with quality gate checkpoints
4. **State Tracking** — Template for plans/PLAN.md updates
5. **Pause Points** — Minimum 3 mandatory user approval points

### Conductor Constraints
- **No implementation tools**: Conductor must NOT have `edit`, `terminal` in write capacity (only for plan file updates)
- **No direct code changes**: All implementation delegated to subagents
- **State management**: Must update plans/PLAN.md at each phase transition
- **Quality gate enforcement**: Must pause for user approval at defined gates

## Subagent Generation Rules

### Required YAML Fields
```yaml
---
description: '{Archetype}: {specific capability for this project}'
model: {tier per archetype table}
tools: ['{minimum necessary tools}']
user-invokable: false  # Hidden from picker
---
```

### Model Tier Assignments

| Archetype | Model Tier | Rationale |
|-----------|-----------|-----------|
| Conductor | High (Claude Sonnet 4.5) | Orchestration requires strong reasoning |
| Planner | High (Claude Sonnet 4.5) | Architecture decisions need depth |
| Implementer | Medium (Auto / copilot) | Code generation with standard capability |
| Reviewer | High (Claude Sonnet 4.5) | Quality assessment needs strong analysis |
| Researcher | Medium (Auto / copilot) | Information gathering, moderate reasoning |
| Scout | Low (Auto / copilot) | Simple file discovery tasks |
| Domain Specialist | Medium-High | Varies by domain complexity |

### Tool Selection per Archetype

| Archetype | Required Tools | Optional Tools |
|-----------|---------------|----------------|
| Conductor | `search`, `search/codebase`, `agent` | `problems` (diagnostics) | Optional `agents` field for subagent control |
| Planner | `search`, `search/codebase` | `fetch` |
| Implementer | `edit`, `new`, `search` | `terminal`, `problems` |
| Reviewer | `search`, `problems`, `changes` | `search/codebase` |
| Researcher | `search`, `search/codebase` | `fetch`, `githubRepo` |
| Scout | `search` | `search/codebase` |
| Domain Specialist | Varies by domain | Varies by domain |

### Input/Output Contract Template
Each subagent must include:
```markdown
### Input Contract
- {What the subagent receives from the conductor}
- {Context and scope limitations}

### Output Contract
- {What the subagent produces}
- {Format and structure of output}

### Scope Boundaries
- {What the subagent can modify}
- {What the subagent must not touch}
```

## Plan File Generation Rules

### plans/PLAN.md
Generate using [OrchestrationPlan.template.md](../templates/OrchestrationPlan.template.md):
- Fill Summary with system name, pattern, agents, spec enforcement level
- Define all phases with agents, inputs, outputs, quality gates
- Create quality gate definitions (minimum 3)
- Include spec-driven lifecycle requirements per enforcement level
- Initialize state tracking section

### Phase Completion Records
Generate template for `plans/phase-{N}-complete.md`:
```markdown
# Phase {N} Complete: {Phase Name}

**Status**: COMPLETED
**Agent**: {agent name}
**Artifacts**: {files created/modified}
**Quality Gate**: {APPROVED | N/A}
**Spec Compliance**: {criteria met, validation status}
**Notes**: {observations}
```

### Final Report
Generate template for `plans/FINAL-REPORT.md`:
```markdown
# Final Report: {System Name}

## Completion Summary
- **Phases Completed**: {count}/{total}
- **Quality Gates Passed**: {count}/{total}
- **Files Created/Modified**: {list}
- **Spec Compliance**: {criteria met}, {validated}

## Phase Results
{Per-phase summary}

## Recommendations
{Future improvements}
```

## Quality Gate Schema

### Planning Approval Gate
```markdown
**Criteria**:
- [ ] Implementation plan is complete with all phases defined
- [ ] Acceptance criteria specified for each phase
- [ ] Risk assessment completed
- [ ] Spec detail included (if spec enforcement = full)
**Outcomes**: APPROVED / NEEDS_REVISION
```

### Code Review Gate
```markdown
**Criteria**:
- [ ] All tests pass
- [ ] No security vulnerabilities introduced
- [ ] Code follows project conventions
- [ ] Changes match approved plan
**Outcomes**: APPROVED / NEEDS_REVISION / FAILED
```

### Commit Gate
```markdown
**Criteria**:
- [ ] Code review passed
- [ ] Documentation updated
- [ ] PLAN.md reflects current state
- [ ] No unresolved blocking issues
**Outcomes**: APPROVED / FAILED
```

## Context Conservation Rules (Atlas Pattern)

When generating Atlas pattern systems:
1. **Scoped contexts**: Each subagent receives only relevant file paths
2. **Max 20 files per context**: Prevent context window overflow
3. **Dependency declarations**: Agents declare files they read vs write
4. **No overlapping writes**: Parallel agents must have disjoint write sets

## Parallel Execution Rules (Atlas Pattern)

1. **Max 10 concurrent subagents**
2. **Conductor manages synchronization** — waits for all parallel agents before next phase
3. **Independent file scopes** — parallel agents must not modify the same files
4. **Failure handling** — conductor retries failed agents without blocking successful ones

## VS Code Settings Generation

Generate `.vscode/settings.json` snippet (merge with existing if present):
```json
{
  "chat.customAgentInSubagent.enabled": true
}
```

## Output Artifact List

### Orchestra/Atlas Pattern Artifacts

| File | Location | Purpose |
|------|----------|---------|
| `{Conductor}.agent.md` | `.github/agents/` | Conductor agent |
| `{Subagent1}.agent.md` | `.github/agents/` | Subagent |
| `{Subagent2}.agent.md` | `.github/agents/` | Subagent |
| `{SubagentN}.agent.md` | `.github/agents/` | Subagent |
| `PLAN.md` | `plans/` | Orchestration plan |
| `settings.json` | `.vscode/` | VS Code config (merge) |
| `AGENTS.md` | Root (update) | Add system to inventory |

### Pipeline Pattern Artifacts

| File | Location | Purpose |
|------|----------|---------|
| `{SystemName}Controller.agent.md` | `.github/agents/` | Pipeline Controller |
| `{SystemName}{Stage}Orchestrator.agent.md` | `.github/agents/` | Sub-orchestrator (one per stage) |
| `{Specialist1}.agent.md` | `.github/agents/` | Shared specialist |
| `{SpecialistN}.agent.md` | `.github/agents/` | Shared specialist |
| `PIPELINE-PLAN.md` | `plans/` | Pipeline plan with stage tracking |
| `settings.json` | `.vscode/` | VS Code config (merge) |
| `AGENTS.md` | Root (update) | Add system to inventory |

## Validation

Generated systems should pass the **Orchestrated System Verification Checklist** in [Verifier.agent.md](../agents/Verifier.agent.md):
- Conductor has `agent` tool in tools, `agents` field listing allowed subagents, `handoffs` array defined, state tracking, quality gates, pause points
- Subagents have `user-invokable: false` (orchestration-only, hidden from picker)
- Optional: `disable-model-invocation: true` for security-sensitive agents
- Parallel execution: Independent subagents run in parallel automatically (v1.109+)
- Each subagent has role description, I/O contract, model tier, scoped tools
- All agent references resolve to existing files
- Plan files exist with correct structure
- Spec-driven lifecycle documented per enforcement level

### Pipeline-Specific Validation
- Pipeline Controller has `agent` tool and handoffs to ALL sub-orchestrators
- Pipeline Controller's `agents` array lists sub-orchestrators only (not specialists)
- Each sub-orchestrator has `agent` tool and `agents` array listing ALL shared specialists
- Sub-orchestrators have `user-invokable: false`
- All shared specialists have `user-invokable: false`
- Stage ordering in Pipeline Controller handoffs matches pipeline plan
- Inter-stage quality gates defined between each stage boundary
- `plans/PIPELINE-PLAN.md` includes stage definitions and shared agent pool manifest
- Specialists do NOT have `agent` tool (they are leaf nodes)

## References
- **Skill**: [orchestration](../skills/orchestration/SKILL.md) — Orchestration methodology
- **Agent Generation**: [AgentAuthoring.instructions.md](AgentAuthoring.instructions.md) — Agent file standards
- **Framework**: [Framework.instructions.md](Framework.instructions.md) — Universal standards
- **Template**: [OrchestrationPlan.template.md](../templates/OrchestrationPlan.template.md) — Plan file format

---

## Processing Metadata

- **Standards Version**: VS Code Copilot v2025.11 (Agent Files v1.109)
- **Role**: Framework for generating conductor/subagent orchestrated systems
- **Scope**: Multi-agent workflows with spec-driven lifecycle, quality gates, and plan files
- **Patterns**: Lightweight, Orchestra, Atlas, Pipeline with parallel execution strategies

*Generated following CopilotCustomizer instruction generation standards*

---

## Change History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-01-15 | Initial release |
| v2.1 | 2026-02-19 | Added Pipeline pattern (multi-orchestrator handoff chains with shared agent pool) |

---

*Orchestrated system generation following VS Code Copilot standards*
