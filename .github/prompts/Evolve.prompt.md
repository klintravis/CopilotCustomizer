---
description: 'Quick entry point for CopilotCustomizer toolkit improvement tasks with smart defaults'
argument-hint: 'All inputs optional — runs with intelligent defaults'
agent: CopilotCustomizer
model: Claude Sonnet 4.5 (copilot)
name: Evolve
tools: ['execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
---

## EvolveTool (v2.0)

### Task Intent
Quick entry point for common CopilotCustomizer toolkit improvement workflows. Routes through the CopilotCustomizer orchestrator to the Evolve specialist subagent with pre-configured task context for streamlined self-improvement.

### Variable Block
---
**Task** [OPTIONAL]: ${input:task:monitor-releases, review-docs, audit-assets, optimize, feature-request, self-validate (default: audit-assets)}
**Scope** [OPTIONAL]: ${input:scope:all, agents, instructions, prompts, skills, docs (default: all)}
**Depth** [OPTIONAL]: ${input:depth:quick-check, standard, comprehensive (default: standard)}
**Auto-Execute** [OPTIONAL]: ${input:autoExecute:true or false — auto-apply low-risk fixes (default: false)}
---

### Task Descriptions

| Task | Description | Typical Duration |
|------|-------------|------------------|
| `monitor-releases` | Check VS Code Copilot docs for new releases and features | 2–3 minutes |
| `review-docs` | Analyze README/HOW-TO/QUICKSTART for quality and currency | 3–5 minutes |
| `audit-assets` | Run self-audit on toolkit's own `.github/` assets | 3–5 minutes |
| `optimize` | Identify token efficiency and performance improvements | 2–4 minutes |
| `feature-request` | Orchestrate implementation of a toolkit feature or correction | 5–15 minutes |
| `self-validate` | Pre-release validation of all toolkit assets | 4–6 minutes |

### Scope Filters

| Scope | Assets Included |
|-------|----------------|
| `all` | Agents, instructions, prompts, skills, documentation |
| `agents` | `.github/agents/*.agent.md` |
| `instructions` | `.github/instructions/*.instructions.md` |
| `prompts` | `.github/prompts/*.prompt.md` |
| `skills` | `.github/skills/*/SKILL.md` |
| `docs` | README.md, QUICKSTART.md, HOW-TO.md, EXAMPLES.md, AGENTS.md, docs/ARCHITECTURE.md |

### Depth Modes

| Depth | Analysis Level | Output Characteristics |
|-------|---------------|------------------------|
| `quick-check` | Surface scan | Top 3 findings + action items |
| `standard` | Full audit | Complete findings table + prioritized roadmap |
| `comprehensive` | Deep analysis | + regression check, cross-reference verification, performance metrics |

### Workflow Phases

**Phase 1: Analysis** (Auto) — Execute task-specific analysis workflow per TASK and SCOPE
**Phase 2: Recommendations** (Auto) — Generate prioritized improvement recommendations at DEPTH level
**Phase 3: Approval Gate** (User) — Review recommendations and approve actions
**Phase 4: Execution** (Conditional) — If AUTO_EXECUTE=true for low-risk items, or user approves, implement changes
**Phase 5: Verification** (Auto) — Validate all changes via Verifier
**Phase 6: Documentation** (Auto) — Generate summary report with changelog entries
**Phase 7: Plan Archival** (Auto) — Persist approved plan to `docs/plans/` for audit trail

### Orchestration Chain
```
EvolveTool → CopilotCustomizer orchestrator → Evolve → [Editor] → [Verifier] → Complete
```

### Example Invocations

**Default audit** (most common):
```
/EvolveTool
```
Runs asset audit with standard depth across all toolkit assets.

**Quick release check**:
```
/EvolveTool task: "monitor-releases", depth: "quick-check"
```
Fast scan of VS Code Copilot docs for new features.

**Comprehensive doc review**:
```
/EvolveTool task: "review-docs", scope: "docs", depth: "comprehensive"
```
Deep review of all toolkit documentation.

**Optimize agents only**:
```
/EvolveTool task: "optimize", scope: "agents", autoExecute: "false"
```
Analyze agent token usage with manual approval before changes.

**Pre-release validation**:
```
/EvolveTool task: "self-validate", depth: "comprehensive"
```
Full validation suite before a toolkit release.

**Implement a feature**:
```
/EvolveTool task: "feature-request"
```
Then describe the feature in the chat. The orchestrator routes to Evolve, which will classify, plan, and implement the feature.

### Refinement Commands

| Command | Action |
|---------|--------|
| `refine: task` | Switch to a different task type |
| `refine: scope` | Narrow or expand asset scope |
| `refine: depth` | Adjust analysis thoroughness |
| `refine: execute` | Proceed with approved recommendations |

### Framework References
*Paired Agent: [Evolve.agent.md](../agents/Evolve.agent.md)*
*Paired Instructions: [ToolkitOps.instructions.md](../instructions/ToolkitOps.instructions.md)*
*Framework: [Framework.instructions.md](../instructions/Framework.instructions.md)*

---

*Generated following CopilotCustomizer prompt generation standards*
