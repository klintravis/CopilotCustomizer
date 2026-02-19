# Plan: Multi-Orchestrator Pipeline Workflow Pattern

## Overview

Add a new **"Pipeline"** orchestration pattern to CopilotCustomizer's generated assets. Unlike the existing patterns (Orchestra/Atlas) where a single conductor manages all subagents, the Pipeline pattern chains **multiple sub-orchestrators** — each responsible for a lifecycle stage — where every sub-orchestrator has access to a **shared pool of all specialized subagents**. This enables pluggable development lifecycle stages with parallel specialist execution within each stage.

### Current vs. New Architecture

**Current (Orchestra/Atlas):**
```
Single Conductor
  ├─→ Planner (subagent)
  ├─→ Implementer (subagent)
  └─→ Reviewer (subagent)
```

**New (Pipeline):**
```
Pipeline Controller (top-level orchestrator)
  ├─→ Planning Orchestrator (sub-orchestrator, stage 1)
  │     ├─→ spawns: CodebaseAnalyzer, SpecWriter, Researcher...
  │     └─→ (any specialist from shared pool)
  ├─→ Implementation Orchestrator (sub-orchestrator, stage 2)
  │     ├─→ spawns: FrontendDev, BackendDev, DatabaseDev...
  │     └─→ (any specialist from shared pool) — parallel
  ├─→ Testing Orchestrator (sub-orchestrator, stage 3)
  │     ├─→ spawns: UnitTester, IntegrationTester, E2ETester...
  │     └─→ (any specialist from shared pool) — parallel
  ├─→ Review Orchestrator (sub-orchestrator, stage 4)
  │     ├─→ spawns: CodeReviewer, SecurityAuditor...
  │     └─→ (any specialist from shared pool)
  └─→ [Pluggable: Deployment, Documentation, etc.]
```

**Key differentiators:**
1. **Sub-orchestrators** — Each lifecycle stage has its own orchestrator agent
2. **Shared agent pool** — Every sub-orchestrator can invoke ANY specialist, not just its "own"
3. **Pluggable stages** — New sub-orchestrators can be inserted into the chain
4. **Quality gates between stages** — Pipeline Controller enforces gates between sub-orchestrators
5. **Parallel within stages** — Sub-orchestrators can spawn parallel specialists (e.g., frontend + backend + database simultaneously)

---

## Files to Modify

### 1. `.github/skills/orchestration/SKILL.md`
**What:** Add the Pipeline pattern alongside Orchestra and Atlas.
**Changes:**
- Add Pipeline to the Pattern Decision Matrix
- Add a new `### Pipeline Pattern (4-15+ agents)` section with architecture diagram
- Document: Pipeline Controller role, Sub-Orchestrator role, Shared Agent Pool concept
- Add Pipeline-specific parallel execution rules (parallel within stages, sequential between stages)
- Add pluggable stage design guidance

### 2. `.github/instructions/Orchestration.instructions.md`
**What:** Add generation rules for the Pipeline pattern.
**Changes:**
- Add `pipeline` to System Pattern Selection table
- Add `### Pipeline Pattern (Multi-Orchestrator Handoff Chains)` section with:
  - Pipeline Controller Generation Rules (YAML, required sections, constraints)
  - Sub-Orchestrator Generation Rules (YAML, shared agents access, stage-specific behavior)
  - Shared Agent Pool definition rules (all specialists listed in every sub-orchestrator's `agents` array)
  - Stage handoff protocol (how context flows between sub-orchestrators)
  - Pluggable stage insertion rules (how to add/remove stages)
- Add Pipeline-specific plan file rules (stage-level tracking vs phase-level)
- Add Pipeline quality gate schema (between stages, not just between phases)

### 3. `.github/agents/Planner.agent.md`
**What:** Teach the Planner to recommend the Pipeline pattern when appropriate.
**Changes:**
- Add Pipeline tier to the `Orchestration assessment` block:
  ```
  pipeline: 6-15+ agents, multiple lifecycle stages, pluggable workflow
    - Pipeline Controller + sub-orchestrators per lifecycle stage
    - Shared agent pool — all specialists available to all sub-orchestrators
    - Stage-level quality gates with inter-stage context passing
    - Pluggable architecture — insert new stages without restructuring
  ```
- Add auto-include criteria:
  - Plan recommends 6+ agents with distinct lifecycle stages
  - Multiple parallel workstreams within a single stage
  - Need for pluggable/extensible development lifecycle
- Update the Specification Template to include Pipeline-specific sections
- Update the Context Handoff format to include pipeline stage definitions

### 4. `.github/agents/Generator.agent.md`
**What:** Enable the Generator to produce Pipeline pattern assets.
**Changes:**
- Add step `4d. Generate Pipeline System` covering:
  - Pipeline Controller agent file generation
  - Sub-Orchestrator agent files (one per stage)
  - Shared specialist agent files
  - Pipeline plan file (plans/PIPELINE-PLAN.md with stage tracking)
  - VS Code settings for nested subagent invocation
- Update Output Report Format to include Pipeline-specific summary
- Update Quality Assurance checklist with Pipeline validations:
  - All sub-orchestrators have access to the full shared agent pool
  - Pipeline Controller has handoffs to all sub-orchestrators
  - Stage ordering is defined and sequential
  - Each sub-orchestrator's `agents` array includes all shared specialists

### 5. `.github/agents/CopilotCustomizer.agent.md`
**What:** Update the orchestrator's routing matrix with Pipeline awareness.
**Changes:**
- Add Pipeline-related routing entry to the Routing Matrix
- Update documentation to mention Pipeline as a generation target when recommending `/NewMultiAgent`

### 6. `.github/prompts/NewMultiAgent.prompt.md`
**What:** Add `pipeline` as a system pattern option.
**Changes:**
- Add `pipeline` to System Patterns table
- Update `systemPattern` variable description to include pipeline
- Add Pipeline-specific optional variables:
  - `stages`: Comma-separated lifecycle stages (default: "planning, implementation, testing, review")
  - `sharedAgents`: Comma-separated shared specialist roles
- Add Pipeline usage example
- Update Generation Workflow to include Pipeline-specific phases

### 7. `.github/templates/OrchestrationPlan.template.md`
**What:** Extend template to support Pipeline pattern's stage-based tracking.
**Changes:**
- Add `## Pipeline Stages (Pipeline pattern only)` section with:
  - Stage definitions table (stage name, sub-orchestrator, shared agents available, quality gate)
  - Inter-stage handoff protocol
  - Stage-level state tracking (vs phase-level)
- Add pluggable stage insertion template
- Add shared agent pool manifest section

### 8. `.github/agents/Verifier.agent.md`
**What:** Add Pipeline-specific validation checks.
**Changes:**
- Add Pipeline System Verification Checklist:
  - Pipeline Controller has `agent` tool and handoffs to all sub-orchestrators
  - Each sub-orchestrator has `agent` tool and `agents` array listing ALL shared specialists
  - Sub-orchestrators have `user-invokable: false`
  - Shared specialists have `user-invokable: false`
  - Stage ordering is defined in Pipeline Controller
  - Quality gates exist between stages
  - Plan file includes stage-level tracking

---

## Implementation Order

1. **Skill** (`orchestration/SKILL.md`) — Define the pattern methodology first
2. **Instructions** (`Orchestration.instructions.md`) — Define generation rules
3. **Template** (`OrchestrationPlan.template.md`) — Extend plan template
4. **Planner** (`Planner.agent.md`) — Teach pattern recommendation
5. **Generator** (`Generator.agent.md`) — Enable pattern generation
6. **Prompt** (`NewMultiAgent.prompt.md`) — Expose pattern to users
7. **Orchestrator** (`CopilotCustomizer.agent.md`) — Update routing awareness
8. **Verifier** (`Verifier.agent.md`) — Add validation rules

### 9. Documentation Updates
**What:** Update all user-facing documentation, project guidance, and changelog to reflect the new Pipeline pattern.

#### 9a. `docs/ARCHITECTURE.md`
- Add Pipeline to the **Unified Orchestrator Architecture** section diagram/description
- Update the **Design Patterns** section with a Pipeline pattern subsection explaining:
  - Pipeline Controller → Sub-Orchestrators → Shared Agent Pool hierarchy
  - How it differs from Orchestra/Atlas (chained orchestrators vs. single conductor)
  - When to choose Pipeline over the other patterns
- Update any pattern decision tables to include Pipeline

#### 9b. `docs/HOW-TO.md`
- Update the **Creating Multi-Agent Systems** section:
  - Add Pipeline to the patterns list: `Linear | Orchestra | Atlas | **Pipeline**`
  - Add a usage example for generating a Pipeline system via `/NewMultiAgent`
  - Document the new `stages` and `sharedAgents` variables
- Update the **orchestration skill** reference description to mention Pipeline
- Add Pipeline to the troubleshooting table if relevant (e.g., nested subagent invocation issues)

#### 9c. `docs/EXAMPLES.md`
- Add a new **Example: Pipeline Multi-Orchestrator Workflow** section showing:
  - A realistic scenario (e.g., full-stack monorepo with distinct planning, implementation, testing, review, deployment stages)
  - The `/NewMultiAgent` command with `SYSTEM_PATTERN: "pipeline"`
  - The generated file tree showing Pipeline Controller, sub-orchestrators, shared specialists, and plan file
  - A walkthrough of how the stages hand off to each other

#### 9d. `README.md` (root)
- Add `pipeline` to the `/NewMultiAgent` command examples in the Quick Start section
- Update the "True orchestration" bullet to mention multi-orchestrator pipeline workflows
- Add Pipeline to the "How It Works" architecture summary if present

#### 9e. `AGENTS.md` (root)
- Update the architecture description to mention Pipeline as a generated pattern option
- No structural changes needed (it mirrors ARCHITECTURE.md summary)

#### 9f. `docs/QUICKSTART.md`
- No significant changes needed (Pipeline is an advanced feature, not a quick-start concern)
- Minor mention in the "What You Just Got" section if orchestration patterns are listed

#### 9g. `docs/CHANGELOG.md`
- Add a new version entry documenting the Pipeline pattern addition:
  - New: Pipeline orchestration pattern (multi-orchestrator handoff chains with shared agent pool)
  - Updated: orchestration skill, Orchestration instructions, OrchestrationPlan template
  - Updated: Planner, Generator, Verifier agents with Pipeline awareness
  - Updated: NewMultiAgent prompt with `pipeline` pattern and new variables (`stages`, `sharedAgents`)
  - Updated: All documentation (ARCHITECTURE, HOW-TO, EXAMPLES, README)

#### 9h. `.github/copilot-instructions.md`
- Update global Copilot context to mention Pipeline as a supported orchestration pattern so the toolkit's own Copilot sessions are aware of it

#### 9i. `.github/skills/orchestration/examples/`
- Add a new `example-pipeline-system.md` showing a concrete Pipeline pattern example with:
  - Pipeline Controller YAML
  - Two sub-orchestrator YAMLs (Planning Orchestrator, Implementation Orchestrator)
  - Two shared specialist YAMLs (CodebaseAnalyzer, FrontendDev)
  - Stage handoff flow diagram
  - Pipeline plan file excerpt

---

## Implementation Order

1. **Skill** (`orchestration/SKILL.md`) — Define the pattern methodology first
2. **Instructions** (`Orchestration.instructions.md`) — Define generation rules
3. **Template** (`OrchestrationPlan.template.md`) — Extend plan template
4. **Planner** (`Planner.agent.md`) — Teach pattern recommendation
5. **Generator** (`Generator.agent.md`) — Enable pattern generation
6. **Prompt** (`NewMultiAgent.prompt.md`) — Expose pattern to users
7. **Orchestrator** (`CopilotCustomizer.agent.md`) — Update routing awareness
8. **Verifier** (`Verifier.agent.md`) — Add validation rules
9. **Documentation** — Update all docs, examples, changelog, and project guidance

---

## Design Decisions

### Why "Pipeline" instead of extending Atlas?
Atlas is about parallel execution within a single conductor's scope. Pipeline is fundamentally different — it's about **chaining orchestrators** where each orchestrator manages a lifecycle stage and can independently coordinate specialists. Atlas could be a sub-pattern *within* a Pipeline stage.

### Shared Agent Pool Mechanism
Every sub-orchestrator's `agents:` YAML array will list ALL shared specialist agents. This means any sub-orchestrator can invoke any specialist. The sub-orchestrator's prompt/role determines *which* specialists it typically uses, but the capability to access all remains.

### Pluggable Stages
The Pipeline Controller defines stages as an ordered list in its handoffs. Adding a new stage = adding a new sub-orchestrator agent file + adding it to the Pipeline Controller's handoffs array + updating the plan file. No restructuring of existing agents needed.

### Quality Gates
Two levels: **inter-stage gates** (enforced by Pipeline Controller between sub-orchestrators) and **intra-stage gates** (enforced by each sub-orchestrator within its own specialist coordination). This gives fine-grained control.
