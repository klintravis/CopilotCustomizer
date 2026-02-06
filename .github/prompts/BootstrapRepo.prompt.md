---
agent: CopilotCustomizer
---

# BootstrapRepo Workflow (v1.0)

```
✨ PROMPT ACTIVATED: BootstrapRepo (v1.0)
   Purpose: Full repository bootstrap with assets
   Agent: CopilotCustomizer (central orchestrator) → delegates to BootstrapRepo subagent
   Skills Engaged: repository-analysis, implementation-planning, technical-documentation
   Input Required: Single repository path
   Workflow: CopilotCustomizer routes → BootstrapRepo → Analysis → Planning (gate) → Generation → Verification → Harmonization → Documentation
   User Interactions: 2 (start + confirm plan)
   Output: Complete Copilot customization in .github/
```

**Orchestrator**: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md) (routes to [BootstrapRepo.agent.md](../agents/BootstrapRepo.agent.md))

## Purpose
Fully autonomous workflow for generating Copilot customization assets for a target repository in the same workspace. **Skills-first approach** - prioritizes cross-platform capabilities (Skills) alongside VS Code-specific assets. Single entry point that orchestrates complete lifecycle: analysis → planning → generation → validation → harmonization → documentation.

**Constraint**: Do not target the CopilotCustomizer folder itself (use a different repository in the same workspace).

**Skills-First Philosophy**: Assets generated prioritize **cross-platform Skills** (agentskills.io standard) that work in VS Code, GitHub Copilot CLI, Claude, Cursor, and other compatible agents. Agents, Instructions, and Prompts are VS Code-specific and build upon the foundational Skills.

## Usage

### Minimal Input (One Command)
```
Bootstrap Copilot assets for: /path/to/repository
```

### Variables
---
**REPOSITORY_PATH** [REQUIRED]: "{Absolute path to target repository}"
---

**That's it!** Everything else is inferred automatically.

## Workflow Overview

```
User Input (REPOSITORY_PATH)
  ↓
BootstrapRepo (validation)
  ↓
repository-analysis Skill (tech stack detection)
  ↓
ResolveStandards (match enterprise standards against tech stack)
  ↓
implementation-planning Skill (recommendations + specs + standards context)
  ↓
Orchestration Assessment (auto: lightweight-conductor if 3+ agents, orchestra/atlas for complex repos)
  ↓ [USER GATE: "confirm"]
AssetGenerator (create all assets - Skills PRIORITY, standards-informed)
  ↓
VerificationAgent (schema validation + harmonization + metadata binding)
  ↓
technical-documentation skill (report)
  ↓
COMPLETE
```

**User Interactions**: 2 (start + confirm plan)  
**Autonomous Phases**: 7 (leveraging Skills for analysis, planning, documentation)  
**Quality Gates**: 1 (after planning)

**Skills Integration**: repository-analysis, implementation-planning, technical-documentation, deployment-automation (when applicable)

## What Gets Inferred

**From Repository Structure** (using repository-analysis skill):
- Project type (API, CLI, web app, library)
- Tech stack (languages, frameworks, databases, testing)
- Existing patterns (architecture, conventions, deployment strategies)
- Current customization status
- Matched enterprise standards from `.github/standards/` (if present)

**Recommendations Generated** (using implementation-planning skill):
- **Skills** (`.github/skills/`) - Cross-platform capabilities [PRIORITY]
  - Generic Skills: repository-analysis, implementation-planning, copilot-asset-design, technical-documentation, deployment-automation
  - Project-specific Skills: e.g., api-development, react-patterns, rust-patterns
- Agent files (.agent.md) - VS Code specialists that leverage skills
- Instruction files (.instructions.md) - Coding standards for specific file patterns
- Prompt files (.prompt.md) - Task templates and slash commands
- AGENTS.md structure - Project guidance
- Cross-reference network - Metadata binding

**Skills Are Portable**: All generated Skills work across VS Code, GitHub Copilot CLI, Claude, Cursor, Goose, and compatible agents. See [agentskills.io](https://agentskills.io) for full specification.

## Example Execution

### Input
```
Bootstrap Copilot assets for: /Users/dev/projects/my-api-server
```

### Phase 1: Validation (Instant)
```
✓ Repository exists
✓ Not CopilotCustomizer (separate repo in same workspace)
✓ Git repository detected
✓ VS Code workspace compatible

Proceeding to analysis...
```

### Phase 2: Analysis (15-30s)
```
Repository Analysis:
- Type: RESTful API Service
- Stack: Node.js, TypeScript, Express
- Patterns: Repository pattern, middleware, OpenAPI
- Assets: None (bootstrapping from scratch)

Generating recommendations...
```

### Phase 3: Planning (30-60s)
```
## Asset Generation Plan

Recommended Assets (11):

🆕 Skills (3) - Cross-platform, portable, auto-loading:
✓ api-development/ - RESTful API patterns and best practices
✓ api-testing/ - Jest/Supertest testing workflows
✓ api-security/ - Authentication, authorization, validation

Skills work across: VS Code, GitHub Copilot CLI, Claude, Cursor
See: https://agentskills.io for full specification
Examples: .github/skills/repository-analysis/examples/

Agent Files (3) - VS Code specialists:
✓ APIExpert.agent.md - RESTful endpoint design (leverages api-development skill)
✓ TestOrchestrator.agent.md - Jest test generation (leverages api-testing skill)
✓ SecurityReviewer.agent.md - API security audits (leverages api-security skill)

Instruction Files (3) - Coding standards:
✓ APIPatterns.instructions.md - RESTful conventions
✓ TestingStandards.instructions.md - Jest patterns
✓ SecurityPatterns.instructions.md - Auth & validation

Prompt Files (2) - Task templates:
✓ GenerateEndpoint.prompt.md - Endpoint scaffolding
✓ DocumentAPI.prompt.md - OpenAPI generation

Orchestrated System (lightweight-conductor):
✓ APIConductor.agent.md - Workflow conductor (agent tool, no edit/terminal)
  Subagents: APIExpert, TestOrchestrator, SecurityReviewer
  Quality Gates: planning, code review, commit
  Plan: plans/PLAN.md (strict TDD)

VS Code Config:
✓ .vscode/settings.json (chat.customAgentInSubagent.enabled: true)

Risk: MEDIUM | Total assets: 12 (1 conductor + 3 subagents + 3 instructions + 2 prompts + 1 plan + 1 config)

Reply "confirm" to generate all assets autonomously.
```

### User Confirmation
```
confirm
```

### Phase 4-8: Autonomous Execution
```
[AssetGenerator] Creating 12 assets...
✓ APIConductor.agent.md (conductor, 62 lines)
✓ api-development/SKILL.md (65 lines + examples)
✓ api-testing/SKILL.md (58 lines + test templates)
✓ api-security/SKILL.md (62 lines + checklists)
✓ APIExpert.agent.md (subagent, 47 lines)
✓ TestOrchestrator.agent.md (subagent, 52 lines)
✓ SecurityReviewer.agent.md (subagent, 45 lines)
✓ APIPatterns.instructions.md (38 lines)
✓ TestingStandards.instructions.md (41 lines)
✓ SecurityPatterns.instructions.md (36 lines)
✓ GenerateEndpoint.prompt.md (29 lines)
✓ DocumentAPI.prompt.md (31 lines)
✓ plans/PLAN.md (orchestration plan)
✓ .vscode/settings.json (subagent config)

[VerificationAgent] Validating assets...
✓ Schema compliance: 100%
✓ YAML validation: All valid
✓ Skills format: Valid (agentskills.io)
✓ Tool approvals: Verified
✓ Orchestrated system: Conductor has agent tool + handoffs, no edit/terminal
✓ Subagent I/O contracts: Defined
✓ Plan file: Valid structure

[VerificationAgent] Validation + harmonization...
✓ Schema compliance: 100%
✓ Format applied where needed
✓ Cross-references: 18 added
✓ Metadata: Applied to all
✓ Handoff chains: 4 validated (conductor → 3 subagents)
✓ Terminology: Standardized
✓ All cross-references resolved
✓ No orphaned assets
✓ Orchestrated system complete

[technical-documentation skill] Creating report...
✓ Bootstrap summary generated
✓ Asset inventory documented
✓ Quick start guide created
```

### Completion
```
## Bootstrap Complete ✓

Generated Assets: 12 files
- .github/agents/ (1 conductor + 3 subagent files)
- .github/instructions/ (3 instruction files)
- .github/prompts/ (2 prompt files)
- plans/PLAN.md (orchestration plan)
- .vscode/settings.json (subagent config)
- AGENTS.md (quick start guide with orchestrated system inventory)

Orchestrated System: lightweight-conductor
- Conductor: APIConductor (agent tool + handoffs, no edit/terminal)
- Subagents: APIExpert, TestOrchestrator, SecurityReviewer
- Plan File: plans/PLAN.md (strict TDD)
- VS Code: chat.customAgentInSubagent.enabled = true

Documentation: /output/Bootstrap-my-api-server.md

Next Steps:
1. Review AGENTS.md for orchestrated system usage guide
2. Test conductor workflow in VS Code Copilot Chat
3. Customize subagent I/O contracts for project-specific needs
```

## Validation Rules

**Pre-Flight Checks**:
```yaml
Required:
  - Repository path exists: PASS/FAIL
  - Not CopilotCustomizer: PASS/FAIL

Recommended:
  - Git repository: PASS/WARN
  - VS Code workspace: PASS/WARN
```

**Repository Exclusion**:
```
if (repo.name.includes("CopilotCustomizer")) {
  ABORT: "Target should be a separate repository in the same workspace.
            Avoid running on CopilotCustomizer itself."
}
```

**Agent Handoffs Schema (MANDATORY when present)**:
```yaml
handoffs[] required fields per entry:
  - label: string
  - agent: string (must resolve to .github/agents/{agent}.agent.md)
  - prompt: string (describes context transfer)
  - send: boolean (true=auto, false=manual)
```

Validation Actions:
- Fail the run if any handoff entry is missing required fields
- Fail the run if `agent` reference does not resolve to an existing agent file
- Warn if `prompt` is too short or generic (< 20 chars)

## Refinement Commands

After plan presentation, before confirmation:

- `refine: scope` - Adjust asset count
- `refine: complexity` - Simplify/expand specs
- `add: {asset}` - Include additional asset
- `skip: {asset}` - Remove from plan
- `refine: validation` - Adjust strictness or report-only behavior for validation passes
- `cancel` - Abort workflow

## Error Scenarios

**Invalid Repository Path**:
```
Error: Repository not found at /invalid/path
Action: Please verify path and try again
```

**CopilotCustomizer Detection**:
```
Error: Target is the CopilotCustomizer folder
Action: Choose a different repository in the same workspace
```

**Cannot Detect Tech Stack**:
```
Warning: Unable to auto-detect project type
Action: Please specify: "Node.js API project with Jest testing"
```

**Partial Generation Failure**:
```
Warning: 6 of 8 assets created successfully
Failed: SecurityReviewer.agent.md, SecurityPatterns.instructions.md
Action: Continuing with available assets...
```

**Validation Failure (Blocking)**:
```
Error: Handoffs schema validation failed
Details: Missing 'send' in 2 entries; unresolved agent reference: QAOrchestrator
Action: Aborting before documentation; fix generation specs and retry
```

## Quality Guarantees

**Acceptance Criteria**:
- [ ] Repository path validated (not CopilotCustomizer)
- [ ] Tech stack detected (or manual input accepted)
- [ ] Asset recommendations generated
- [ ] <5 user interactions total (ideally 2)
- [ ] 90%+ handoff success rate
- [ ] Schema compliance: 100% (YAML + handoffs schema)
- [ ] Handoffs fields: 100% valid (label, agent, prompt, send)
- [ ] Verification + harmonization: PASS
- [ ] Cross-references: All resolved
- [ ] Documentation: Complete report

**Performance Targets**:
- Analysis: <60s
- Planning: <90s
- Generation: <120s per asset
- Validation: <30s
- Harmonization: <45s
- Documentation: <30s
- **Total**: <5 minutes for typical workflow

## Framework Integration

**Skills Used** (cross-platform analysis and planning):
- [repository-analysis](../skills/repository-analysis/SKILL.md) - Tech stack detection, dependency analysis
- [implementation-planning](../skills/implementation-planning/SKILL.md) - Recommendation prioritization, strategy design
- [technical-documentation](../skills/technical-documentation/SKILL.md) - Report generation and documentation

**Framework Skills** (available for all CopilotCustomizer workflows):
- [copilot-asset-design](../skills/copilot-asset-design/SKILL.md) - Asset decision framework
- [deployment-automation](../skills/deployment-automation/SKILL.md) - CI/CD and deployment strategies
  - Example: [GitHub Actions Pipeline](../skills/deployment-automation/examples/example-github-actions.md)

**Reused Instructions** (70%+ shared):
- [CopilotFramework.instructions.md](../instructions/CopilotFramework.instructions.md) - Universal workflows
- [RepoReview.instructions.md](../instructions/RepoReview.instructions.md) - Analysis patterns
- [GenerateCopilotAgent.instructions.md](../instructions/GenerateCopilotAgent.instructions.md) - Agent generation
- [GenerateInstructions.instructions.md](../instructions/GenerateInstructions.instructions.md) - Instruction creation
- [GeneratePrompt.instructions.md](../instructions/GeneratePrompt.instructions.md) - Prompt templates
- [GenerateSkill.instructions.md](../instructions/GenerateSkill.instructions.md) - Skill creation (cross-platform)
- [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md) - Asset binding
- [CopilotAudit.instructions.md](../instructions/CopilotAudit.instructions.md) - Quality validation
- [ResolveStandards.instructions.md](../instructions/ResolveStandards.instructions.md) - Enterprise standards matching

**Agent Chain** (VS Code workflow orchestration):
- [BootstrapRepo.agent.md](../agents/BootstrapRepo.agent.md) - Entry point
- [AssetPlanner.agent.md](../agents/AssetPlanner.agent.md) - Planning + gate (leverages implementation-planning skill)
- [AssetGenerator.agent.md](../agents/AssetGenerator.agent.md) - Generation (prioritizes Skills)
- [VerificationAgent.agent.md](../agents/VerificationAgent.agent.md) - Validation + harmonization
- [ChangeExecutor.agent.md](../agents/ChangeExecutor.agent.md) - File operations

## Success Metrics

**Efficiency**:
- 70%+ instruction reuse from framework
- <5 user interactions per workflow
- <5 minutes total execution time
- 90%+ handoff success rate

**Quality**:
- 100% schema compliance
- 100% cross-reference resolution
- 0 orphaned assets
- Complete documentation

**Autonomy**:
- 1 input required (repository path)
- 1 approval required (confirm plan)
- 7 autonomous phases
- Zero manual intervention after confirmation

---

**Framework**: CopilotCustomizer v1.0  
**Workflow Pattern**: Linear with single quality gate  
**Autonomy Level**: Fully autonomous after confirmation  

*Powered by comprehensive CopilotCustomizer framework*
