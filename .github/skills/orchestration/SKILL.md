---
name: orchestration
description: Design and generate conductor/subagent orchestrated systems for complex repositories. Covers Orchestra, Atlas, and Custom patterns with TDD lifecycle enforcement, quality gates, plan file architecture, and parallel execution strategies. Use when a project needs coordinated multi-agent workflows beyond simple handoff chains.
---

# Multi-Agent Orchestration Skill

```
✨ SKILL ACTIVATED: orchestration
   Purpose: Design conductor/subagent orchestrated systems
   Functionality: Orchestration patterns, conductor design, subagent archetypes, TDD lifecycle, quality gates
   Output: Orchestrated system architecture with conductor, subagents, and plan files
   Scope: Portable across VS Code, CLI, Claude, Cursor, and compatible agents
```

## Purpose
Comprehensive methodology for designing and generating orchestrated multi-agent systems where a **conductor agent** coordinates multiple **subagents** through structured phases with quality gates, TDD enforcement, and plan file tracking. Goes beyond simple handoff chains to provide full project lifecycle orchestration.

## When to Use This Skill
- Repository has 50+ files or multiple specialized domains
- TDD lifecycle enforcement is required across implementation phases
- Multiple specialized roles need coordinated execution (planning, implementation, review, research)
- Parallel execution of independent tasks would improve throughput
- Context conservation is critical (large codebases where agents need focused scope)
- Quality gates are needed between phases (planning approval, code review, commit gate)

## Orchestration Patterns

### Pattern Decision Matrix

| Criteria | Standalone Agents | Handoff Chains | Orchestra | Atlas |
|----------|-------------------|----------------|-----------|-------|
| **Agent Count** | 1 | 2-4 | 3-5 | 5-10 |
| **Coordination** | None | Sequential | Conductor-managed | Conductor + parallel |
| **TDD Enforcement** | Manual | Per-agent | Per-phase | Per-phase + parallel |
| **Quality Gates** | None | Between agents | 3+ mandatory | 3+ mandatory |
| **Parallel Execution** | No | No | No | Yes (max 10) |
| **Context Conservation** | N/A | Prompt transfer | Plan file | Plan file + scoped contexts |
| **Complexity** | Low | Medium | Medium-High | High |
| **Best For** | Single tasks | Linear workflows | Structured projects | Large/complex projects |

### Orchestra Pattern (3-5 agents)
Standard orchestration for structured project work. One conductor coordinates subagents through sequential phases.

```
Conductor (orchestrates all phases)
  ├─→ Planner (requirements → implementation plan)
  ├─→ Implementer (code changes following plan)
  └─→ Reviewer (validation and quality checks)
```

### Atlas Pattern (5-10 agents)
Advanced orchestration for large codebases with parallel execution and context conservation.

```
Conductor (orchestrates + manages parallel execution)
  ├─→ Planner (architecture and phase design)
  ├─→ Researcher (codebase analysis, dependency mapping)
  ├─→ Scout (file discovery, pattern identification)
  ├─→ Implementer-A (frontend changes)  ←── parallel
  ├─→ Implementer-B (backend changes)   ←── parallel
  ├─→ Implementer-C (database changes)  ←── parallel
  ├─→ Reviewer (code quality, security)
  └─→ Domain Specialist (API design, testing, etc.)
```

### Custom Pattern
User-defined agent composition tailored to specific project needs.

## Conductor Design

The conductor is the central orchestration agent that manages the entire workflow lifecycle.

### Conductor Requirements
1. **`agent` tool + `handoffs` array** — Must be able to invoke any subagent in the system via `agent` tool and define all subagent transitions in the `handoffs` YAML field
2. **Optional `agents` field** — Can explicitly list allowed subagents for security and workflow control
3. **State Tracking** — Maintains current phase, completed phases, and blocking issues
4. **Quality Gates** — Enforces approval checkpoints (minimum 3 pause points)
5. **No Direct Implementation** — Conductor never writes code or modifies files directly
6. **Plan File Management** — Creates and updates `plans/PLAN.md` for progress tracking
7. **Model Tier** — Uses highest-capability model (e.g., `Claude Sonnet 4.5`, `GPT-4`)

### Conductor YAML Structure
```yaml
---
description: 'Orchestrates {SystemName} workflow: coordinates subagents through phases with quality gates and TDD enforcement'
model: Claude Sonnet 4.5 (copilot)
tools: ['search', 'search/codebase', 'agent']
user-invokable: true
agents: ['Planner', 'Implementer', 'Reviewer']  # Optional: explicit subagent list
handoffs:
  - label: '{Phase 1 action}'
    agent: '{Subagent1Name}'
    prompt: '{Context for subagent}'
    send: false
  - label: '{Phase 2 action}'
    agent: '{Subagent2Name}'
    prompt: '{Context for subagent}'
    send: false
---
```

### Mandatory Pause Points
Every conductor must include at least 3 pause points:
1. **After Planning Phase** — User approves implementation plan before any code changes
2. **After Implementation Phase** — User reviews changes before commit
3. **After Review Phase** — User confirms final quality before closing

### State Tracking Template
```markdown
## Current State
- **Phase**: {current phase name}
- **Status**: IN_PROGRESS | BLOCKED | AWAITING_APPROVAL
- **Completed**: [list of completed phases]
- **Blocking Issues**: [any blockers]
- **Next**: {next phase or action}
```

## Subagent Archetypes

| Archetype | Role | Model Tier | Typical Tools | Handoff Pattern |
|-----------|------|------------|---------------|-----------------|
| **Planner** | Requirements analysis, architecture design, phase decomposition | High (Sonnet 4.5 / GPT-4) | `search`, `search/codebase`, `fetch` | Conductor → Planner → Conductor |
| **Implementer** | Code changes following plan specifications | Medium (Sonnet 4 / GPT-4o) | `edit`, `new`, `search`, `terminal` | Conductor → Implementer → Conductor |
| **Reviewer** | Code review, quality validation, security checks | High (Sonnet 4.5 / GPT-4) | `search`, `problems`, `changes` | Conductor → Reviewer → Conductor |
| **Researcher** | Codebase analysis, dependency mapping, pattern discovery | Medium (Sonnet 4 / GPT-4o) | `search`, `search/codebase`, `fetch` | Conductor → Researcher → Conductor |
| **Scout** | File discovery, structure mapping, quick reconnaissance | Low (Haiku / GPT-4o-mini) | `search`, `search/codebase` | Conductor → Scout → Conductor |
| **Domain Specialist** | Domain-specific expertise (API, testing, database, etc.) | Medium-High | Domain-specific tools | Conductor → Specialist → Conductor |

### Subagent Requirements
1. **Input/Output Contract** — Clear description of what the subagent receives and produces
2. **Scope Boundaries** — Explicit limits on what the subagent can and cannot modify
3. **Model Tier** — Appropriate model for the complexity of the role
4. **Tool Selection** — Minimum necessary tools for the role (see asset-design skill)
5. **Role Description** — Specific, focused expertise description

### Subagent YAML Structure
```yaml
---
description: '{Role}: {specific capability description}'
model: {appropriate model tier}
tools: ['{tool1}', '{tool2}']
---
```

## TDD Lifecycle Enforcement

Every implementation phase follows the TDD lifecycle:

```
Plan → Test → Implement → Review → Commit
```

### Per-Phase TDD Template
```markdown
### Phase {N}: {Phase Name}

**Plan**: Define requirements and acceptance criteria
  - [ ] Requirements documented in PLAN.md
  - [ ] Acceptance criteria specified

**Test**: Write failing tests that define expected behavior
  - [ ] Test files created
  - [ ] Tests fail as expected (red phase)

**Implement**: Write code to make tests pass
  - [ ] Implementation follows plan specifications
  - [ ] All tests pass (green phase)

**Review**: Validate quality and correctness
  - [ ] Code review completed
  - [ ] No regressions introduced
  - [ ] Security review passed

**Commit**: Stage and commit changes
  - [ ] Changes staged
  - [ ] Commit message follows conventions
  - [ ] PLAN.md updated with completion status
```

### TDD Enforcement Levels
- **strict** (default): All phases require Plan → Test → Implement → Review → Commit
- **relaxed**: Plan → Implement → Review → Commit (tests optional per phase)
- **none**: No TDD enforcement (phases proceed without test gates)

## Plan File Architecture

### Directory Structure
```
plans/
├── PLAN.md                    # Main orchestration plan
├── phase-1-complete.md        # Phase completion records
├── phase-2-complete.md
└── FINAL-REPORT.md            # Generated after all phases complete
```

### PLAN.md Structure
See [OrchestrationPlan.template.md](../../templates/OrchestrationPlan.template.md) for the full template.

Key sections:
1. **Summary** — Project goal and system configuration
2. **Phase Definitions** — Ordered list of phases with agents, inputs, outputs
3. **Quality Gates** — Gate definitions with approval criteria
4. **TDD Lifecycle** — Per-phase TDD requirements
5. **State Tracking** — Current phase, completed phases, blockers
6. **Progress Log** — Timestamped entries of phase transitions

### Phase Completion Record
```markdown
# Phase {N} Complete: {Phase Name}

**Status**: COMPLETED
**Agent**: {agent that executed}
**Duration**: {time}
**Artifacts**: {files created/modified}
**Quality Gate**: {APPROVED | N/A}
**TDD Results**: {test count, pass/fail}
**Notes**: {any relevant observations}
```

## Quality Gates Framework

### Gate Types

| Gate | Trigger | Approval Criteria | Outcomes |
|------|---------|-------------------|----------|
| **Planning Approval** | After Planner completes | Plan is complete, risks identified, phases defined | APPROVED / NEEDS_REVISION |
| **Code Review** | After Implementer completes | Tests pass, no security issues, follows plan | APPROVED / NEEDS_REVISION / FAILED |
| **Commit Gate** | After Reviewer approves | All criteria met, documentation updated | APPROVED / FAILED |

### Quality Gate Schema
```markdown
## Quality Gate: {Gate Name}

**Phase**: {phase number and name}
**Agent**: {reviewing agent}
**Criteria**:
- [ ] {criterion 1}
- [ ] {criterion 2}
- [ ] {criterion 3}

**Result**: APPROVED | NEEDS_REVISION | FAILED
**Notes**: {reviewer comments}
**Action**: {next step based on result}
```

## Parallel Execution (v1.109)

### Automatic Parallel Execution
**VS Code 1.109+**: Independent subagents automatically run in parallel when invoked by the conductor. No manual configuration needed — the system detects independence and executes concurrently.

### When to Use Parallel Execution
- Independent code areas (frontend/backend/database)
- Multiple test suites that don't share state
- Documentation generation alongside implementation
- Research tasks that don't modify files

### Parallel Execution Rules
1. **Maximum 10 concurrent subagents** — Prevents resource contention
2. **No shared file modifications** — Parallel agents must work on disjoint file sets
3. **Conductor synchronization** — Conductor waits for all parallel agents before next phase
4. **Failure isolation** — One agent's failure doesn't block others (conductor handles retry)

### Context Conservation Strategy
For large codebases, limit each subagent's context to relevant files:
```markdown
### Subagent Context Scope
- **Files**: {glob pattern of relevant files}
- **Max Files**: 20 (prefer focused context)
- **Dependencies**: {list of files the agent may read but not modify}
- **Exclusions**: {files explicitly out of scope}
```

## VS Code Configuration

### Required Settings
```json
{
  "chat.customAgentInSubagent.enabled": true
}
```

VS Code 1.109+ enables the `agent` tool for subagent invocation. Independent subagents run in parallel automatically, improving throughput for multi-agent workflows.

**New Frontmatter Controls (v1.109)**:
- `user-invokable: false` — Hide subagents from picker (orchestration-only)
- `disable-model-invocation: true` — Prevent auto-invocation by other agents  
- `agents: ['AgentA', 'AgentB']` — Limit which subagents can be invoked (requires `agent` tool)

### Model Assignments
Configure per-agent model assignments in VS Code settings or agent YAML `model` field to match the recommended model tier for each archetype.

## Integration with Other Skills

**Pairs Well With**:
- `asset-design` — Decision framework for when to use orchestration vs standalone
- `repo-analysis` — Understand repository complexity before choosing pattern
- `planning` — Strategic planning within orchestrated phases
- `documentation` — Documentation generation within orchestrated workflows

## Success Criteria

A well-designed orchestrated system provides:
- ✅ Clear conductor with state tracking and quality gates
- ✅ Focused subagents with defined input/output contracts
- ✅ TDD lifecycle enforcement at configurable strictness
- ✅ Plan file tracking with phase completion records
- ✅ Quality gates at critical decision points (minimum 3)
- ✅ Appropriate model tiers matched to agent roles
- ✅ Parallel execution support when applicable (Atlas pattern)
- ✅ Context conservation for large codebases

---

**Skill Type**: Architecture and Orchestration
**Complexity**: High
**Prerequisites**: Understanding of VS Code Copilot agent files, handoff patterns, and multi-agent workflows

**Cross-Platform**: Orchestration methodology works across all platforms; agent file generation requires VS Code for execution.
