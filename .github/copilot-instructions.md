# CopilotCustomizer Development Guide

**Purpose**: This file provides global context to GitHub Copilot when working within the CopilotCustomizer toolkit itself. It establishes architectural patterns, file organization, workflows, and quality standards for all AI interactions.

**Scope**: Applies to all `.github/` assets and toolkit maintenance. For external repository customizations, use the `/Bootstrap` workflow instead.

---

## Architecture Pattern

### Orchestrator + Subagents
`CopilotCustomizer.agent.md` routes ALL workflows through 6 specialized subagents via programmatic `agent` tool invocation (not manual handoffs).

**Workflow Chains**:
- **User Repositories**: Bootstrap → Planner → Generator → Editor/Verifier
- **Toolkit Self-Improvement**: Evolve → Editor → Verifier
- **Asset Creation**: Planner → Generator → Verifier
- **Targeted Edits**: Editor → Verifier

**Key Principles**:
- Fully programmatic orchestration — no manual handoffs
- State tracking via `todo` tool for multi-step workflows
- Quality gates between all phase transitions
- Context passing with explicit instructions to each subagent

---

## File Organization

```
.github/
├── agents/*.agent.md               # 7 agents (CopilotCustomizer + 6 subagents)
├── instructions/*.instructions.md  # 12 instruction files
├── prompts/*.prompt.md             # 10 slash commands
├── skills/[name]/SKILL.md          # 6 cross-platform skills (agentskills.io)
├── standards/[category]/           # 43+ standards across 8 categories
├── templates/                      # 4 structured output templates
├── hooks/subagent-tracking.json    # Lifecycle logging config (8 events)
├── scripts/log-orchestration.js    # Auto-invoked by hooks
└── logs/sessions/<timestamp>/      # Session-specific orchestration logs
```

### Asset Counts (Current)
- **Agents**: 7 (1 orchestrator + 6 subagents)
- **Instructions**: 12 (scoped via `applyTo` patterns)
- **Prompts**: 10 (user-facing slash commands)
- **Skills**: 6 (cross-platform, agentskills.io compatible)
- **Standards**: 43 (architecture, databases, devops, frameworks, languages, practices, security, testing)
- **Templates**: 4 (Analysis, ChangeLog, ImplementationPlan, OrchestrationPlan)

---

## Schema Compliance (VS Code v1.109)

### Agent Files (`.agent.md`)
**Required frontmatter**:
```yaml
description: "Brief description of agent role"
```

**Optional frontmatter**:
```yaml
tools: [editFile, createFile, runInTerminal]  # Tool access control
model: claude-sonnet-4                         # Model preference
agents: [Planner, Generator]                   # Subagent registry for handoffs
user-invokable: true                           # Allow direct user invocation
disable-model-invocation: false                # Enable via @agent syntax
```

**Deprecated**:
- ❌ `infer` field (removed in v1.109)
- Use `user-invokable: true` + `disable-model-invocation: false` instead

### Instruction Files (`.instructions.md`)
**Required frontmatter**:
```yaml
applyTo: ".github/**/*.agent.md"  # Glob pattern for file matching
```

**Optional frontmatter**:
```yaml
description: "Brief description of instruction purpose"
```

### Prompt Files (`.prompt.md`)
**Variable syntax**: `${VARIABLE_NAME}` (uppercase, underscores)

**Optional frontmatter**:
```yaml
agent: CopilotCustomizer           # Target agent for execution
tools: [readFile, searchFiles]     # Tool restrictions
model: claude-sonnet-4             # Model preference
```

**Variable types**:
- `${INPUT}` — Single-line text
- `${MULTILINE_INPUT}` — Multi-line text area
- `${FILE_PATH}` — File picker
- `${OPTION: "value1|value2|value3"}` — Dropdown selection

---

## Critical Workflows

### Asset Creation Workflows

| Command | Description | Execution Time | Output |
|---------|-------------|----------------|--------|
| `/NewAgent` | Create custom VS Code agent | ~45-60s | `.github/agents/[Name].agent.md` |
| `/NewInstructions` | Generate instruction file | ~30-45s | `.github/instructions/[Name].instructions.md` |
| `/NewPrompt` | Build slash command prompt | ~30-45s | `.github/prompts/[Name].prompt.md` |
| `/NewSkill` | Create cross-platform skill | ~45-60s | `.github/skills/[name]/SKILL.md` |
| `/NewAgentsFile` | Generate `AGENTS.md` | ~60-90s | `AGENTS.md` at repo root |
| `/NewMultiAgent` | Create orchestrated agent system (Orchestra, Atlas, Pipeline, Custom) | ~90-120s | Multiple agents + orchestration plan |

### Repository Workflows

| Command | Description | Execution Time | Output |
|---------|-------------|----------------|--------|
| `/Bootstrap REPOSITORY_PATH: "/path"` | Full autonomous asset generation | ~3-4 min | Complete `.github/` structure in target repo |
| `/Review` | Comprehensive asset audit | ~60-90s | Gap analysis + prioritized recommendations |
| `/QuickFix` | Fast targeted improvements | ~30-60s | Specific asset edits |

### Toolkit Workflows

| Command | Description | Execution Time | Output |
|---------|-------------|----------------|--------|
| `/Evolve FOCUS: "maintenance"` | Toolkit self-improvement | ~90-180s | Asset optimizations + harmonization |
| `/Evolve FOCUS: "releases"` | Monitor VS Code releases | ~45-60s | Compatibility audit + update recommendations |
| `/Evolve FOCUS: "documentation"` | Documentation review | ~60-90s | Doc updates + accuracy improvements |

---

## Naming Conventions

**Strict Case Rules**:
- **Agents**: PascalCase — `Bootstrap.agent.md`, `CopilotCustomizer.agent.md`
- **Instructions**: PascalCase — `Framework.instructions.md`, `AgentAuthoring.instructions.md`
- **Prompts**: PascalCase — `NewAgent.prompt.md`, `Bootstrap.prompt.md`
- **Skills**: kebab-case directories — `asset-design/SKILL.md`, `repo-analysis/SKILL.md`
- **Standards**: kebab-case — `security/OWASP-Top-10.md`, `languages/typescript-standards.md`
- **Templates**: PascalCase — `ImplementationPlan.template.md`, `Analysis.template.md`

**File Extension Patterns**:
- Agent files: `*.agent.md`
- Instruction files: `*.instructions.md`
- Prompt files: `*.prompt.md`
- Skill files: always `SKILL.md` (uppercase) in named directory
- Standards: `*.md` with frontmatter validation
- Templates: `*.template.md`

---

## Cross-Reference Resolution

### Reference Types
1. **Agent handoffs**: `agents: [Planner, Generator]` in frontmatter
2. **Skill references**: `@[skill-name]` in content (e.g., `@planning`, `@asset-design`)
3. **Instruction scoping**: `applyTo` glob patterns must resolve to files
4. **Standard matching**: `technologies: [react, typescript]` matched against repo stack

### Validation Rules
- All `applyTo` patterns must match at least one file (validated by Verifier)
- All agent names in `agents:` arrays must resolve to `.agent.md` files
- All `@[skill-name]` references must have corresponding `skills/[skill-name]/SKILL.md`
- All cross-file dependencies tracked in Verifier's harmonization phase

**Post-Generation**: Verifier subagent automatically validates and binds all cross-references, reporting any orphaned or dangling assets.

---

## Standards Integration

### Discovery & Matching Algorithm

Standards in `.github/standards/[category]/` are automatically discovered and matched during asset generation:

**1. Discovery Phase**:
   - Scan `.github/standards/**/*.md` for files with valid frontmatter
   - Parse required fields: `name`, `technologies`, `scope`, `priority`
   - Build standards registry with metadata index

**2. Matching Phase**:
   - **Always-apply standards**: `scope: always` → applied to all generated assets
   - **Tech-match standards**: Compare `technologies` array against detected stack (e.g., `[react, typescript]` matches when repo uses React + TypeScript)
   - **Priority resolution**: `high > medium > low` determines precedence when guidance conflicts

**3. Integration Phase**:
   - Principles are **synthesized naturally** into generated assets
   - **Never quoted verbatim** or referenced by file path
   - Standards influence design decisions, code patterns, and quality criteria
   - Applied during Planner specification and Generator implementation

**Priority Levels**:
- `high` — Critical standards (security, architecture principles)
- `medium` — Important conventions (language idioms, framework patterns)
- `low` — Recommended practices (style guides, naming conventions)

**See**: [Standards.instructions.md](instructions/Standards.instructions.md) for complete matching algorithm and integration protocol.

### Example Standards Categories

| Category | Count | Examples | Scope |
|----------|-------|----------|-------|
| **architecture** | 5 | API design, microservices, clean architecture | `scope: always` for architectural decisions |
| **databases** | 6 | PostgreSQL, MongoDB, Redis patterns | Tech-matched to detected databases |
| **devops** | 5 | Docker, Kubernetes, CI/CD workflows | Tech-matched to infrastructure |
| **frameworks** | 6 | React, Next.js, Django, Express | Tech-matched to detected frameworks |
| **languages** | 7 | TypeScript, Python, Go, C# conventions | Tech-matched to detected languages |
| **practices** | 5 | Error handling, logging, Git workflows | `scope: always` for code quality |
| **security** | 4 | OWASP Top 10, auth patterns, secrets management | `scope: always` + high priority |
| **testing** | 5 | Unit, integration, E2E testing standards | Tech-matched to testing frameworks |

---

## Skills System (agentskills.io)

### Cross-Platform Capabilities
Skills are portable AI capabilities following the [agentskills.io](https://agentskills.io) open standard. They work across:
- ✅ VS Code GitHub Copilot (native integration)
- ✅ GitHub Copilot CLI (`gh copilot`)
- ✅ Claude Desktop (MCP servers)
- ✅ Cursor IDE
- ✅ Other AI platforms supporting the standard

### Available Skills

| Skill | Purpose | Primary Users | Key Capabilities |
|-------|---------|---------------|------------------|
| **asset-design** | Design and validate Copilot assets | Generator, Planner | Architecture patterns, quality criteria, integration strategies |
| **deployment-automation** | CI/CD and release workflows | Generator, Evolve | GitHub Actions, container deployments, infrastructure automation |
| **documentation** | Technical documentation generation | All agents | Change summaries, API docs, technical reports |
| **orchestration** | Orchestrated multi-agent system design | CopilotCustomizer, Planner | Orchestra, Atlas, Pipeline, Custom patterns; spec-driven lifecycle; parallel execution; multi-orchestrator pipelines |
| **planning** | Strategic implementation planning | Planner, Bootstrap | Step-by-step execution plans, risk mitigation, validation strategies |
| **repo-analysis** | Deep repository analysis | Bootstrap, Planner | Tech stack detection, dependency analysis, pattern recognition |

### Skill Invocation Tracking
Hooks automatically log skill usage when agents read `SKILL.md` files:
- **Metrics**: Invocation count, agent attribution, session tracking
- **Location**: `.github/logs/sessions/<timestamp>/orchestration.log`
- **Use case**: Understand which skills are most valuable for optimization

---

## Templates System

Structured output templates in `.github/templates/` ensure consistent formatting for generated documents:

| Template | Purpose | Used By | Output Format |
|----------|---------|---------|---------------|
| **Analysis.template.md** | Repository analysis reports | Bootstrap, Planner | Tech stack detection, dependency graph, recommendations |
| **ChangeLog.template.md** | Change tracking and release notes | Evolve, Editor | Semantic versioning, categorized changes, breaking changes |
| **ImplementationPlan.template.md** | Detailed execution plans | Planner | Step-by-step tasks, validation criteria, rollback strategies |
| **OrchestrationPlan.template.md** | Multi-agent workflow designs | CopilotCustomizer, Planner | Phase transitions, quality gates, context passing |

**Usage**: Templates are referenced by subagents to maintain consistency across outputs. They include placeholder sections that are populated with workflow-specific content.

---

## Lifecycle Logging & Instrumentation

### Hook System
Hooks in `.github/hooks/subagent-tracking.json` execute **deterministically** (no AI variance) on 8 lifecycle events:

| Event | Trigger | Logged Data |
|-------|---------|-------------|
| **SessionStart** | New Copilot conversation | Timestamp, session ID, initial context |
| **UserPromptSubmit** | User sends message | Prompt text, active files, workspace state |
| **SubagentStart** | Orchestrator invokes subagent | Subagent name, input context, phase metadata |
| **SubagentStop** | Subagent completes | Output artifacts, duration, success status |
| **PreToolUse** | Before tool execution | Tool name, parameters, requesting agent |
| **PostToolUse** | After tool execution | Tool result, execution time, error status |
| **PreCompact** | Before context compaction | Context size, retention strategy |
| **Stop** | Conversation ends | Total duration, artifacts created, quality metrics |

### Log Structure
```
.github/logs/
├── current-session.txt                         # Points to active session folder
└── sessions/
    └── <timestamp>/
        ├── orchestration.log                   # Full event log with timestamps
        ├── metrics.json                        # Aggregated statistics
        └── artifacts/                          # Generated files (optional)
```

### Automatic Execution
`log-orchestration.js` runs automatically via hooks — no manual invocation needed. Check `.github/logs/current-session.txt` for the active session path.

---

## Quality Assurance Practices

### Pre-Generation Checklist
Before creating any asset:
- [ ] Verify schema compliance for target asset type
- [ ] Check naming convention matches file type (PascalCase vs kebab-case)
- [ ] Confirm no duplicate asset names in target directory
- [ ] Validate all variable syntax in prompts (uppercase, underscores)
- [ ] Ensure `applyTo` patterns will match intended files

### Post-Generation Validation
After asset creation:
- [ ] Run Verifier subagent for schema compliance check
- [ ] Verify cross-references resolve (agents, skills, instructions)
- [ ] Test asset in isolation (e.g., invoke agent, run prompt)
- [ ] Check lifecycle logs for errors or warnings
- [ ] Validate frontmatter YAML parses correctly
- [ ] Ensure markdown formatting is clean (no syntax errors)

### Common Pitfalls to Avoid
- ❌ Using `infer` in agent frontmatter (deprecated in v1.109)
- ❌ Mixing case conventions (e.g., `bootstrap.agent.md` instead of `Bootstrap.agent.md`)
- ❌ Forgetting required frontmatter fields (`description` for agents, `applyTo` for instructions)
- ❌ Hard-coding file paths in content (use relative references)
- ❌ Creating orphaned skills (referenced but no `SKILL.md` file)
- ❌ Invalid `applyTo` glob patterns that match nothing
- ❌ Inconsistent variable naming in prompts (e.g., `${Path}` instead of `${FILE_PATH}`)

---

## Troubleshooting Guide

### Agent Not Appearing in Chat
**Symptom**: Agent file exists but doesn't show in `@agent` list
**Solutions**:
1. Verify frontmatter has `description` field (required)
2. Check file extension is `.agent.md` (not `.md`)
3. Reload VS Code window (`Ctrl+Shift+P` → "Reload Window")
4. Validate YAML frontmatter syntax (no tabs, proper indentation)
5. Check `.vscode/settings.json` hasn't disabled custom agents

### Instruction File Not Applying
**Symptom**: Instructions not influencing Copilot behavior
**Solutions**:
1. Verify `applyTo` glob pattern matches target files
2. Check file extension is `.instructions.md` (not `.md`)
3. Test glob pattern with file search tool to confirm matches
4. Ensure no conflicting instructions with overlapping `applyTo` patterns
5. Check active file matches workspace root (instructions are workspace-scoped)

### Prompt Variables Not Rendering
**Symptom**: Variables display as `${VAR}` instead of input fields
**Solutions**:
1. Ensure variable names are UPPERCASE with underscores
2. Check file extension is `.prompt.md` (not `.md`)
3. Validate variable syntax: `${NAME}` not `$NAME` or `{NAME}`
4. Reload VS Code window to refresh prompt registry
5. Check for typos in variable references

### Standards Not Being Applied
**Symptom**: Generated assets ignore coding standards
**Solutions**:
1. Verify standards have valid frontmatter (`name`, `technologies`, `scope`, `priority`)
2. Check `technologies` array matches detected tech stack
3. Ensure standards files are in `.github/standards/[category]/` structure
4. Review Planner output to confirm standards were matched
5. Check for `scope: always` standards that should apply to all assets

### Lifecycle Logs Missing
**Symptom**: No logs in `.github/logs/sessions/`
**Solutions**:
1. Verify `.github/hooks/subagent-tracking.json` exists
2. Check `.github/scripts/log-orchestration.js` is present
3. Ensure hooks are enabled in VS Code settings
4. Review `current-session.txt` for active session path
5. Check file permissions on `.github/logs/` directory

---

## Key Documentation & References

### Internal Documentation
- [AGENTS.md](../AGENTS.md) — Asset inventory and architecture overview
- [README.md](../README.md) — Project overview and quick start
- [docs/QUICKSTART.md](../docs/QUICKSTART.md) — 5-minute setup guide
- [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) — Deep-dive on orchestration patterns
- [docs/HOW-TO.md](../docs/HOW-TO.md) — Complete commands reference + troubleshooting
- [docs/EXAMPLES.md](../docs/EXAMPLES.md) — Real-world usage examples across tech stacks

### Critical Instruction Files
- [Framework.instructions.md](instructions/Framework.instructions.md) — Universal workflows and quality checklist
- [Orchestration.instructions.md](instructions/Orchestration.instructions.md) — Conductor/subagent design patterns
- [Standards.instructions.md](instructions/Standards.instructions.md) — Standards discovery and integration protocol
- [Security.instructions.md](instructions/Security.instructions.md) — Security guardrails and tool management
- [ToolkitOps.instructions.md](instructions/ToolkitOps.instructions.md) — Toolkit-specific maintenance workflows

### External Standards & References
- [VS Code Copilot Customization Overview](https://code.visualstudio.com/docs/copilot/customization/overview) — Official customization guide
- [VS Code Custom Agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents) — Agent files and handoff workflows
- [VS Code Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions) — Instructions files and AGENTS.md patterns
- [VS Code Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files) — Prompt files and variable systems
- [agents.md Examples](https://agents.md/#examples) — Agent design patterns and examples
- [agentskills.io](https://agentskills.io) — Cross-platform skills standard

---

## Version & Compliance

**Last Updated**: February 16, 2026
**VS Code Compatibility**: v1.109+ (Agent Files v1.109, MCP v1.102+)
**Schema Compliance**: Full compliance with VS Code GitHub Copilot v2025.11 standards

**Breaking Changes from v1.108**:
- Removed `infer` field from agent frontmatter
- Added `user-invokable` and `disable-model-invocation` fields
- Enhanced variable system in prompt files
- Updated lifecycle hooks with PreCompact and Stop events

**Maintenance**: This file is automatically updated by the Evolve subagent during toolkit maintenance cycles. Last maintenance run: *[tracked in orchestration logs]*
