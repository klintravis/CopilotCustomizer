# NewWorkflowSystem Workflow

Generate orchestrated multi-agent systems (conductor + subagents) for target repositories with TDD lifecycle, quality gates, and plan file tracking.

## Overview
Creates a complete orchestrated system tailored to the target repository's tech stack and complexity. Supports Orchestra (3-5 agents), Atlas (5-10 agents), and Custom patterns. Goes beyond simple handoff chains to provide full project lifecycle orchestration with conductor-managed phases.

**Handoff Visibility**: The generation workflow displays progress notifications at each phase, showing what's being generated and what comes next.

## Variables
```
SYSTEM_NAME [REQUIRED]: "Name for the orchestrated system"
SYSTEM_PATTERN [REQUIRED]: "orchestra | atlas | custom"
REPOSITORY_PATH [REQUIRED]: "Absolute path to target repository"
DOMAIN [OPTIONAL]: "Project domain for tailoring"
CUSTOM_AGENTS [OPTIONAL]: "Comma-separated roles (custom pattern only)"
TDD_ENFORCEMENT [OPTIONAL]: "strict | relaxed | none" (default: strict)
PARALLEL_ENABLED [OPTIONAL]: "true | false" (default: pattern-dependent)
```

## Handoff Chain
```
CopilotCustomizer → repository-analysis skill → Architecture Design → [USER GATE: confirm] → Agent Generation → Cross-Reference Binding → Validation → Summary → Complete
```

### Workflow Chain
```
┌──────────────────────────────────────┐
│ User Input                           │
│ (SYSTEM_NAME, PATTERN, REPO_PATH)    │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Phase 1: Repository Analysis         │
│ (tech stack, structure, complexity)  │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Phase 2: System Architecture         │
│ (agents, phases, gates, models)      │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Phase 3: Architecture Presentation   │
│ (present to user)                    │
└───────────┬───────────[confirm]──────┘
            ↓
┌──────────────────────────────────────┐
│ Phase 4: Agent Generation            │
│ (conductor + subagents + plan files) │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Phase 5: Cross-Reference Binding     │
│ (agent refs, AGENTS.md update)       │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Phase 6: Validation                  │
│ (orchestrated system checklist)      │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Phase 7: Summary                     │
│ (files, usage, next steps)           │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Workflow Complete                    │
└──────────────────────────────────────┘
```

## Workflow Phases
1) **Repository Analysis** — Analyze target repo tech stack, structure, and complexity
2) **System Architecture** — Design agent composition, phases, quality gates, model tiers
3) **Architecture Presentation** — Present proposed system; wait for user `confirm`
4) **Agent Generation** — Create conductor, subagents, plan files, VS Code config
5) **Cross-Reference Binding** — Link agents, update AGENTS.md inventory
6) **Validation** — Run orchestrated system verification checklist
7) **Summary** — Report generated files and usage instructions

## Acceptance Criteria
- Repository analyzed and tech stack detected
- System architecture presented and user-confirmed
- Conductor agent generated with `agents: ["*"]`, state tracking, quality gates, 3+ pause points
- All subagents generated with role descriptions, I/O contracts, model tiers, scoped tools
- Plan file (plans/PLAN.md) created from template
- VS Code settings updated with `chat.customAgentInSubagent.enabled: true`
- All agent cross-references resolve correctly
- AGENTS.md updated with orchestrated system inventory
- Validation checklist passed

## How to Run
1. Use the `/NewWorkflowSystem` slash command with inline variables
2. Set `SYSTEM_NAME`, `SYSTEM_PATTERN`, and `REPOSITORY_PATH`
3. Optionally set `DOMAIN`, `TDD_ENFORCEMENT`, `PARALLEL_ENABLED`, `CUSTOM_AGENTS`
4. Submit → Review architecture → Type `confirm`
5. System generates autonomously after confirmation

## Refinement Commands
- `refine: agents` — Adjust agent composition
- `refine: gates` — Modify quality gate criteria
- `refine: tdd` — Change TDD enforcement level
- `refine: parallel` — Toggle parallel execution
- `refine: models` — Change model tier assignments

## References
- Instructions: `../../.github/instructions/GenerateOrchestratedSystem.instructions.md`
- Skill: `../../.github/skills/multi-agent-orchestration/SKILL.md`
- Template: `../../.github/templates/OrchestrationPlan.template.md`
- Agent Generation: `../../.github/instructions/GenerateCopilotAgent.instructions.md`
- Framework: `../../.github/instructions/CopilotFramework.instructions.md`

## Notes
- Targets a different repository in the same VS Code workspace (not CopilotCustomizer itself)
- Orchestra pattern is recommended for most projects; use Atlas for large/complex codebases
- Custom pattern requires specifying agent roles via CUSTOM_AGENTS variable
