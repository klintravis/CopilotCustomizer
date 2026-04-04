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
7. **Model Tier** — Uses highest-capability model available (High tier)
8. **Supports Nested Delegation** — Subagents may include `agent` tool for hierarchical orchestration (max 2 levels deep)

### Conductor YAML Structure
```yaml
---
description: 'Orchestrates {SystemName} workflow: coordinates subagents through phases with quality gates and TDD enforcement'
# model: omit to inherit, or specify for high-capability override
tools: ['search', 'search/codebase', 'agent']
user-invocable: true
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

### Nested Orchestration Support
Subagents may invoke other subagents when their workflow benefits from delegation:

**Hierarchical tree**:
```
Conductor → Subagent-A → Sub-subagent-A1
                       → Sub-subagent-A2
          → Subagent-B (leaf — no nesting)
```

**Rules**: Max 2 levels, explicit `agents` field, context passed explicitly, quality gates at conductor level only.

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
| **Planner** | Requirements analysis, architecture design, phase decomposition | High (latest capable) | `search`, `search/codebase`, `fetch` | Conductor → Planner → Conductor |
| **Implementer** | Code changes following plan specifications | Medium (auto) | `edit`, `new`, `search`, `terminal` | Conductor → Implementer → Conductor |
| **Reviewer** | Code review, quality validation, security checks | High (latest capable) | `search`, `problems`, `changes` | Conductor → Reviewer → Conductor |
| **Researcher** | Codebase analysis, dependency mapping, pattern discovery | Medium (auto) | `search`, `search/codebase`, `fetch` | Conductor → Researcher → Conductor |
| **Scout** | File discovery, structure mapping, quick reconnaissance | Low (fast/lightweight) | `search`, `search/codebase` | Conductor → Scout → Conductor |
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

### Memory & Checkpoint Strategy

The plan file serves as the orchestration's short-term memory. At each phase transition:

**Conductor checkpoints**:
```markdown
## Phase {N} Checkpoint
- **Key decisions**: {architecture choices, trade-offs}
- **Discovered patterns**: {code conventions, existing abstractions}
- **Context for next phase**: {2-3 sentences for context injection}
- **Blockers**: {resolved: X, outstanding: Y}
```

**Cross-session recovery**: If a session ends mid-workflow, the conductor reads `PLAN.md` to resume:
1. Parse state tracking section for current phase
2. Load latest phase completion record
3. Inject checkpoint context into next subagent
4. Continue from last completed phase

**Long-term persistence**: After workflow completion, the conductor (or documentation skill) captures durable learnings in `AGENTS.md`:
- Architecture decisions that affect future work
- Discovered project conventions
- Known issues or technical debt

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

## Reflection Phases

A **reflection phase** is a structured self-assessment step inserted between implementation and final review. Research shows reflection improves output quality by 14-20%.

### When to Include Reflection
- After any Implementation phase, before Review
- After complex planning phases, before user approval
- After failed quality gates, before retry

### Reflection Template
```markdown
## Reflection: {Phase Name}

**What was accomplished**: {summary of changes made}
**What went well**: {successful patterns, clean implementations}
**What was difficult**: {challenges encountered, workarounds used}
**What could be improved**: {specific improvements for next iteration}
**Confidence level**: HIGH | MEDIUM | LOW
**Recommendation**: PROCEED_TO_REVIEW | REVISE_FIRST | ESCALATE_TO_USER
```

### Integration into Orchestration Flow
```
Plan → Test → Implement → REFLECT → Review → Commit
```

The conductor invokes the Implementer, then asks it (or a dedicated Reflector subagent) to self-assess before handing off to the Reviewer. This catches issues the Implementer notices but might not surface otherwise.

### Reflection in Generated Systems
When generating orchestrated systems, include reflection as a standard phase:
- Orchestra pattern: Add reflection between Implement and Review phases
- Atlas pattern: Each parallel implementer reflects before synchronization point
- The reflection output is appended to the plan file for audit trail

## Failure & Recovery

Every orchestration phase should define failure modes and recovery strategies. Production agent systems need predictable failure handling, not ad-hoc retries.

### Failure Classification

| Failure Type | Examples | Default Recovery |
|-------------|---------|-----------------|
| **Transient** | Tool timeout, API rate limit, network error | Retry with backoff (max 3 attempts) |
| **Validation** | Schema error, test failure, lint error | Fix and retry within same phase |
| **Dependency** | Missing file, broken import, unavailable service | Escalate to conductor for re-routing |
| **Catastrophic** | Corrupted state, circular dependency, unrecoverable error | Rollback to last checkpoint, escalate to user |

### Recovery Strategies

**Retry with backoff**: For transient failures. Conductor retries the subagent with the same input, up to 3 times with increasing delay.

**Fix-and-retry**: For validation failures. Subagent receives the error details and attempts self-correction within the same phase.

**Rollback to checkpoint**: For dependency/catastrophic failures. Conductor reverts plan state to the last successful phase completion record and re-routes.

**Escalate to user**: When automated recovery fails or the failure requires human judgment. Conductor presents the failure context and asks for direction.

**Degrade gracefully**: Skip the failed phase if it's optional (e.g., documentation generation) and continue with remaining phases. Note the skip in the plan file.

### Per-Phase Failure Handling
```markdown
### Phase {N}: {Phase Name}
**On failure**:
  - transient: retry (max 3)
  - validation: fix-and-retry
  - dependency: rollback to Phase {N-1}
  - catastrophic: escalate to user
**Checkpoint**: plans/phase-{N-1}-complete.md
```

### Circuit Breaker Pattern
For phases that interact with external services (MCP servers, APIs):
- **Closed** (normal): Requests pass through
- **Open** (failing): After 3 consecutive failures, stop attempting — escalate immediately
- **Half-open** (testing): After cooldown, try one request to test recovery

### Failure Logging
All failures are recorded in the plan file:
```markdown
## Failure Log
| Phase | Type | Error | Recovery | Outcome |
|-------|------|-------|----------|---------|
| {N} | {type} | {description} | {strategy used} | {resolved/escalated} |
```

## Parallel Execution (v1.112)

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

### Context Engineering

Context engineering is the deliberate design of what information enters each agent's context window. Rather than passing everything, define explicit context budgets and sources per phase.

#### Context Budget Per Phase
| Phase | Context Sources | Budget |
|-------|----------------|--------|
| Planning | Full repo structure, tech stack summary, standards context | Large (broad view) |
| Implementation | Plan excerpt for current phase, relevant source files only | Focused (20 files max) |
| Reflection | Implementation diff, plan criteria, test results | Minimal (results only) |
| Review | Implementation diff, original plan, reflection notes | Moderate (changes + plan) |

#### Context Injection Protocol
When the conductor invokes a subagent, it should inject exactly:
1. **Phase-specific plan excerpt** — Only the current phase from PLAN.md, not the entire plan
2. **Relevant file list** — Glob pattern of files the subagent needs (max 20)
3. **Prior phase summary** — 2-3 sentence summary of what previous phases accomplished (not full output)
4. **Standards context** — Only matched standards relevant to this phase's work
5. **Failure context** — If retrying, include the specific error from the previous attempt

#### What NOT to Inject
- Full conversation history from prior phases
- Unrelated file contents
- Standards that don't match the tech stack
- Verbose logs from completed phases (use summaries)

#### Subagent Context Scope Template
```markdown
### Context for {SubagentName}
- **Phase**: {N} — {Phase Name}
- **Files**: {glob pattern} (max 20 files)
- **Plan excerpt**: {current phase section only}
- **Prior summary**: {2-3 sentences from previous phase}
- **Standards**: {matched standards for this work}
- **Exclusions**: {files out of scope}
```

#### Semantic Compression
Between phases, the conductor compresses prior phase output into summaries:
- **Implementation output** → "Modified 5 files: added UserPreferences model, updated API routes, created tests. All tests passing."
- **Review output** → "3 findings: 1 security issue (fixed), 2 style suggestions (deferred). Approved with notes."

This prevents context window overflow in long multi-phase workflows.

## VS Code Configuration

### Required Settings
```json
{
  "chat.customAgentInSubagent.enabled": true
}
```

VS Code 1.112+ enables the `agent` tool for subagent invocation. Independent subagents run in parallel automatically, improving throughput for multi-agent workflows.

**Frontmatter Controls**:
- `user-invocable: false` — Hide subagents from picker (orchestration-only)
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
