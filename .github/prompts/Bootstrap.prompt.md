---
description: Full autonomous workflow to bootstrap Copilot customization assets for a target repository
argument-hint: Provide the absolute path to the repository to bootstrap
agent: CopilotCustomizer
model: Claude Sonnet 4.5 (copilot)
tools: ['vscode', 'execute', 'read', 'agent', 'edit', 'search', 'web', 'memory', 'todo']
name: Bootstrap
---

## Bootstrap Workflow (v1.0)

**Orchestrator**: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md) (routes to [Bootstrap.agent.md](../agents/Bootstrap.agent.md))

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
**Repository Path** [REQUIRED]: ${input:repositoryPath:Absolute path to target repository}
---

**That's it!** Everything else is inferred automatically.

## Workflow Overview

```
User Input (REPOSITORY_PATH)
  ↓
Bootstrap (validation)
  ↓
repo-analysis Skill (tech stack detection)
  ↓
Standards (match enterprise standards against tech stack)
  ↓
planning Skill (recommendations + specs + standards context)
  ↓
Orchestration Assessment (auto: lightweight-conductor if 3+ agents, orchestra/atlas for complex repos)
  ↓ [USER GATE: "confirm"]
Generator (create all assets - Skills PRIORITY, standards-informed)
  ↓
Verifier (schema validation + harmonization + metadata binding)
  ↓
documentation skill (report)
  ↓
COMPLETE
```

**User Interactions**: 2 (start + confirm plan)  
**Autonomous Phases**: 7 (leveraging Skills for analysis, planning, documentation)  
**Quality Gates**: 1 (after planning)

**Skills Integration**: repo-analysis, planning, documentation, deployment-automation (when applicable)

## What Gets Inferred

**From Repository Structure** (using repo-analysis skill):
- Project type (API, CLI, web app, library)
- Tech stack (languages, frameworks, databases, testing)
- Existing patterns (architecture, conventions, deployment strategies)
- Current customization status
- Matched enterprise standards from `.github/standards/` (if present)

**Recommendations Generated** (using planning skill):
- **Skills** (`.github/skills/`) - Cross-platform capabilities [PRIORITY]
  - Generic Skills: repo-analysis, planning, asset-design, documentation, deployment-automation
  - Project-specific Skills: e.g., api-development, react-patterns, rust-patterns
- Agent files (.agent.md) - VS Code specialists that leverage skills
- Instruction files (.instructions.md) - Coding standards for specific file patterns
- Prompt files (.prompt.md) - Task templates and slash commands
- AGENTS.md structure - Project guidance
- Cross-reference network - Metadata binding

**Skills Are Portable**: All generated Skills work across VS Code, GitHub Copilot CLI, Claude, Cursor, Goose, and compatible agents. See [agentskills.io](https://agentskills.io) for full specification.

## Example Execution

For a complete example walkthrough showing validation, analysis, planning, and autonomous execution phases, see [EXAMPLES.md](../../docs/EXAMPLES.md) or [QUICKSTART.md](../../docs/QUICKSTART.md).

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
- [repo-analysis](../skills/repo-analysis/SKILL.md) - Tech stack detection, dependency analysis
- [planning](../skills/planning/SKILL.md) - Recommendation prioritization, strategy design
- [documentation](../skills/documentation/SKILL.md) - Report generation and documentation

**Framework Skills** (available for all CopilotCustomizer workflows):
- [asset-design](../skills/asset-design/SKILL.md) - Asset decision framework
- [deployment-automation](../skills/deployment-automation/SKILL.md) - CI/CD and deployment strategies
  - Example: [GitHub Actions Pipeline](../skills/deployment-automation/examples/example-github-actions.md)

**Reused Instructions** (70%+ shared):
- [Framework.instructions.md](../instructions/Framework.instructions.md) - Universal workflows
- [RepoReview.instructions.md](../instructions/RepoReview.instructions.md) - Analysis patterns
- [AgentAuthoring.instructions.md](../instructions/AgentAuthoring.instructions.md) - Agent generation
- [InstructionAuthoring.instructions.md](../instructions/InstructionAuthoring.instructions.md) - Instruction creation
- [PromptAuthoring.instructions.md](../instructions/PromptAuthoring.instructions.md) - Prompt templates
- [SkillAuthoring.instructions.md](../instructions/SkillAuthoring.instructions.md) - Skill creation (cross-platform)
- [Maintenance.instructions.md](../instructions/Maintenance.instructions.md) - Asset optimization and harmonization
- [Standards.instructions.md](../instructions/Standards.instructions.md) - Enterprise standards matching

**Agent Chain** (VS Code workflow orchestration):
- [Bootstrap.agent.md](../agents/Bootstrap.agent.md) - Entry point
- [Planner.agent.md](../agents/Planner.agent.md) - Planning + gate (leverages planning skill)
- [Generator.agent.md](../agents/Generator.agent.md) - Generation (prioritizes Skills)
- [Verifier.agent.md](../agents/Verifier.agent.md) - Validation + harmonization
- [Editor.agent.md](../agents/Editor.agent.md) - File operations

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
