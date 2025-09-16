---
applyTo: '**/ScreepsColonyReviewer.instructions.md'
schemaVersion: '1.0'
refinementCommands: ['refine: concise','refine: expand','refine: performance','refine: security']
---

## Screeps Colony Reviewer Instructions (v1.0)

### Context Overview
These instructions support the `ScreepsColonyReviewer.chatmode.md` chat mode and provide a structured workflow for performing deep repository and colony reviews of Screeps projects (TypeScript). The chat mode performs static and operational analysis, maps winning subsystems, documents failure modes, and generates prioritized plans to either enhance the current colony or design + implement a new colony.

This file was created by extracting and re-using reference links from `ScreepsMasterEngineer.chatmode.md` to ensure parity with existing domain knowledge and documentation. See the Appendix / Discovered Links section for all pulled links.

### Objective
Provide a repeatable, measurable instruction set the chat mode should follow when the user requests a "colony review" or "new colony plan". The instruction set must:
- Gather required inputs from the user (target repo path, desired depth, choice: enhance vs. rebuild, constraints)
- Inventory and score code and runtime artifacts
- Produce a prioritized roadmap (MVP → scale → hardening) with acceptance criteria and measurable KPIs
- Generate suggested patches/tests/monitoring recipes where appropriate (only after explicit confirm)

### Variable Block (Required Inputs)
- `TARGET_PATH` (required): Absolute or workspace-relative path to repository (e.g., `c:\Source\Screeps`)
- `WORK_TYPE` (required): `enhance` | `rebuild` — choose whether user wants to improve current colony or build a new one
- `DEPTH_MODE` (optional): `quick` | `standard` | `deep` (default: `standard`)
- `CONSTRAINTS` (optional): Budget/time/GCL/allowed refactors/production safety notes
- `RISK_SENSITIVITY` (optional): `low` | `medium` | `high` (default: `medium`)

### Generation Gate
Before producing the full instructions or analysis, the assistant must ask the user the following clarifying questions (do not proceed until answered):
1. Confirm the `TARGET_PATH` to analyze. Default suggestion: `c:\Source\Screeps`.
2. Do you want to `enhance` the current colony or `rebuild` a new colony? (This affects scope and acceptance criteria.)
3. Which `DEPTH_MODE` would you like (quick|standard|deep)?
4. Any constraints (time, allowed refactors, CI environment restrictions, production safety)?

After the user answers, the assistant should reply `ready-to-generate` with a short plan summary and wait for explicit `confirm` before running scans or proposing patches.

### Tech Stack & Constraints
- Typical stack: TypeScript, Jest, Grunt (grunt-screeps), Node.js, `@types/screeps`.
- Expect common patterns: `src/` module layout, `jobs` and `roles` subsystems, `scripts/` for deployment, and `test/` for Jest tests.
- Performance constraints: Screeps CPU limits and memory growth need special handling; profiling requires live or recorded tick logs.
- Security/compliance: No secrets should be exfiltrated; do not run network actions without explicit consent.

### Architectural Conventions
- Prefer modular role-based design (separate `roles/`, `jobs/` and `utils/`).
- Job queue pattern and centralized spawn manager recommended for predictable spawn behavior.
- Use caching and assignment mechanisms to reduce pathfinding and FIND_* calls.
- Testing and CI should run unit tests and linting locally; deployment via `grunt-screeps` must be gated with safe checks.

### Coding Standards
- TypeScript strict mode where possible and `@types/screeps` usage.
- Prefer small, focused functions with deterministic behavior per tick.
- Avoid global mutable state in `Memory` without versioning checks.
- Enforce linting rules and format via Prettier/ESLint config if present.

### Security & Compliance
- Do not include secrets or tokens in diffs or suggested files.
- For `rebuild` workflows in regulated or high-risk environments, require `RISK_SENSITIVITY=high` and include a security checklist.

### Performance Expectations
- Provide explicit CPU/tick targets for each roadmap phase (e.g., MVP target: ≤8ms/tick average; scale target: ≤20ms/tick under load — adjust to user's baseline).
- Quantify memory growth expectations per tick and set acceptable thresholds (e.g., <0.5% growth per 10k ticks unless GC/compaction strategies exist).

### Testing Strategy
- Unit tests: Jest for roles and utils, with Game object mocking where required.
- Integration tests: Scenario-based tests for spawn behavior and population management.
- Performance tests: Synthetic runs or log analysis for CPU profiling (use `Game.cpu.getUsed()` and archived logs such as `colony.log.json`).

### Tooling & Automation
- Deployment: `grunt-screeps` / `scripts/deploy.js` patterns
- Profiling: Use `scripts/monitor-logs.js` or similar to collect tick-by-tick data
- Repo analysis: static grep/AST scan, dependency inventory (`package.json`), and test execution

### Documentation Requirements
- Inventory report (files & responsibilities)
- Per-file scoring (win / risk / notes)
- Roadmap with acceptance criteria & KPIs
- Ready-to-run command snippets (copy-pasteable)

### Monitoring & Observability
- Recommend collecting and storing: CPU per tick, job queue lengths, spawn utilization, memory usage, and key event logs
- Include small scripts/commands to run locally for collection (e.g., `node scripts/monitor-logs.js main`)

### Deployment / Release Strategy
- For `enhance`: staged rollout by package or feature flag; test in PTR or private shard before main
- For `rebuild`: build MVP on test shard, validate performance, then staged migration of rooms
- Always include rollback steps and a canary room/spawn approach

### Review & Acceptance Criteria
For each roadmap phase include:
- Measurable KPIs (cpu/tick, spawn utilization, failure rates)
- Test coverage requirements (units/integration)
- Deployment checklist (backups, canary deployment, smoke tests)

### Refinement Commands
| Command | Action |
|---|---|
| `refine: concise` | Produce a compact executive summary |
| `refine: expand` | Expand specified section with deeper analysis |
| `refine: performance` | Focus output on CPU/memory profiling & remediation |
| `refine: security` | Expand security checklist & threat mitigations |

### Depth Modes
| Mode | Purpose |
|---|---|
| quick | Top-level inventory and top-10 wins/risks |
| standard | File map, hotspot list, 3-phase roadmap |
| deep | Full forensic mapping, test scaffolding, and suggested patches (requires confirm to apply)

### Change Management
- Version: v1.0 — update when the chatmode or instruction expectations change
- Keep an internal changelog in long-form reports

### Appendix / Discovered Links (Pulled from ScreepsMasterEngineer.chatmode.md)
- https://docs.screeps.com/
- https://docs.screeps.com/api/
- https://docs.screeps.com/cpu-limit.html
- https://docs.screeps.com/api/#PathFinder
- https://docs.screeps.com/global-objects.html#Memory-object
- https://screeps.com/a/#!/sim/tutorial
- https://www.npmjs.com/package/@types/screeps
- https://www.npmjs.com/package/grunt-screeps
- https://docs.screeps.com/contributed/advanced_grunt.html
- http://chat.screeps.com/
- https://screeps.com/forum/
- http://support.screeps.com/

#### Internal relative references (keep these cross-referenced)
- ../instructions/ScreepsMasterEngineer.instructions.md
- ../instructions/FormatAssets.instructions.md
- ../instructions/HarmonizeAssets.instructions.md

### Ready-to-Run Prompts (for RepoReview / Automation)
- Run a standard repo scan (high-level):
  - `TARGET_PATH=c:\Source\Screeps; WORK_TYPE=enhance; DEPTH_MODE=standard`
- Run a deep forensic analysis (requires logs & tests):
  - `TARGET_PATH=c:\Source\Screeps; WORK_TYPE=rebuild; DEPTH_MODE=deep; RISK_SENSITIVITY=high`

### Generation Gate (user prompt template)
When the chat mode is invoked for this instruction, the assistant must present the following prompt to the user and wait for answers before proceeding:

"I can run a colony review or produce a new-colony plan. Please confirm:
1) Target path (default `c:\Source\Screeps`)
2) Work type: `enhance` or `rebuild`
3) Depth mode: `quick`, `standard`, or `deep`
4) Any constraints (time, allowed refactors, safety)

Reply with the answers or `cancel`." 

Once user confirms, the assistant should respond `ready-to-generate` with a short plan summary and wait for explicit `confirm` to proceed with scans or file edits.

### Summary & Next Actions
- Ask the user the 4 mandatory questions in the Generation Gate above.
- After receiving answers, provide `ready-to-generate` + a short plan summary (files to scan, expected outputs, and estimated time/effort).
- After explicit `confirm`, run the requested analysis and produce the roadmap, reports, and optional patches/tests.

---
*Generated following `NewInstructions.prompt.md` and aligned with `ScreepsMasterEngineer.chatmode.md` links and conventions.*
