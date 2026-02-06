---
applyTo: '.github/**/*.{agent.md,prompt.md}'
description: 'Framework for generating conductor/subagent orchestrated systems with TDD lifecycle, quality gates, and plan file tracking'
---

# Orchestrated System Generation Guide (v1.0)

**Paired Prompt**: [NewWorkflowSystem.prompt.md](../prompts/NewWorkflowSystem.prompt.md)

### Purpose
Generate complete orchestrated multi-agent systems (conductor + subagents) for target repositories. Produces all agent files, plan file templates, and VS Code configuration needed for coordinated multi-agent workflows.

### Distinction: NewWorkflow vs NewWorkflowSystem

| Aspect | `/NewWorkflow` | `/NewWorkflowSystem` |
|--------|----------------|----------------------|
| **Creates** | Handoff chain between agents | Conductor + subagent orchestrated system |
| **Coordination** | Sequential handoffs | Conductor-managed phases |
| **Quality Gates** | Between agents (optional) | Mandatory (3+ pause points) |
| **TDD** | Not enforced | Enforced per phase |
| **Plan Files** | None | `plans/PLAN.md` + completion records |
| **Parallel** | No | Yes (Atlas pattern) |
| **Use When** | Linear workflows | Complex, multi-phase projects |

## System Archetypes

### Orchestra (default: 4 agents)
```
Conductor → Planner → Implementer → Reviewer
```
- Best for: Structured feature implementation, refactoring
- Phases: Plan → Test → Implement → Review → Commit
- Quality gates: 3 (planning, code review, commit)

### Atlas (default: 7 agents)
```
Conductor → Planner → Researcher → Scout → Implementer(s) → Reviewer → Specialist
```
- Best for: Large codebases, cross-cutting changes, parallel work
- Adds: Parallel execution, context conservation, research phase
- Quality gates: 3+ (planning, implementation, code review, commit)

### Custom
User-defined agent composition. Minimum: 1 conductor + 2 subagents.

## Conductor Generation Rules

### Required YAML Fields
```yaml
---
description: 'Orchestrates {SystemName}: coordinates {subagent list} through phases with quality gates and TDD enforcement'
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
2. **Core Objectives** — Phase management, quality gates, state tracking, TDD enforcement
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
- Fill Summary with system name, pattern, agents, TDD level
- Define all phases with agents, inputs, outputs, quality gates
- Create quality gate definitions (minimum 3)
- Include TDD lifecycle requirements per enforcement level
- Initialize state tracking section

### Phase Completion Records
Generate template for `plans/phase-{N}-complete.md`:
```markdown
# Phase {N} Complete: {Phase Name}

**Status**: COMPLETED
**Agent**: {agent name}
**Artifacts**: {files created/modified}
**Quality Gate**: {APPROVED | N/A}
**TDD Results**: {test count, pass/fail}
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
- **TDD Results**: {total tests}, {passing}

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
- [ ] Test specifications included (if TDD = strict)
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

A complete orchestrated system generation produces:

| File | Location | Purpose |
|------|----------|---------|
| `{Conductor}.agent.md` | `.github/agents/` | Conductor agent |
| `{Subagent1}.agent.md` | `.github/agents/` | Subagent |
| `{Subagent2}.agent.md` | `.github/agents/` | Subagent |
| `{SubagentN}.agent.md` | `.github/agents/` | Subagent |
| `PLAN.md` | `plans/` | Orchestration plan |
| `settings.json` | `.vscode/` | VS Code config (merge) |
| `AGENTS.md` | Root (update) | Add system to inventory |

## Validation

Generated systems should pass the **Orchestrated System Verification Checklist** in [VerificationAgent.agent.md](../agents/VerificationAgent.agent.md):
- Conductor has `agent` tool in tools, `agents` field listing allowed subagents, `handoffs` array defined, state tracking, quality gates, pause points
- Subagents have `user-invokable: false` (orchestration-only, hidden from picker)
- Optional: `disable-model-invocation: true` for security-sensitive agents
- Parallel execution: Independent subagents run in parallel automatically (v1.109+)
- Each subagent has role description, I/O contract, model tier, scoped tools
- All agent references resolve to existing files
- Plan files exist with correct structure
- TDD lifecycle documented per enforcement level

## References
- **Skill**: [multi-agent-orchestration](../skills/multi-agent-orchestration/SKILL.md) — Orchestration methodology
- **Agent Generation**: [GenerateCopilotAgent.instructions.md](GenerateCopilotAgent.instructions.md) — Agent file standards
- **Workflow Generation**: [GenerateWorkflow.instructions.md](GenerateWorkflow.instructions.md) — Handoff chain patterns
- **Framework**: [CopilotFramework.instructions.md](CopilotFramework.instructions.md) — Universal standards
- **Template**: [OrchestrationPlan.template.md](../templates/OrchestrationPlan.template.md) — Plan file format

---

*Orchestrated system generation following VS Code Copilot standards*
