---
agent: BootstrapRepo
---

# BootstrapRepo Workflow (v2.0)

**Paired Agent**: [BootstrapRepo.agent.md](../agents/BootstrapRepo.agent.md)

## Purpose
Fully autonomous workflow for generating Copilot customization assets for a target repository. **Skills-first approach** - prioritizes cross-platform capabilities alongside VS Code-specific assets.

**Constraint**: Do not target the CopilotCustomizer folder itself.

## Usage

### Minimal Input
```
Bootstrap Copilot assets for: /path/to/repository
```

### Variables
**REPOSITORY_PATH** [REQUIRED]: "{Absolute path to target repository}"

## Workflow Overview
```
User Input (REPOSITORY_PATH)
  ↓
BootstrapRepo (validation)
  ↓
repository-analysis Skill (tech stack detection)
  ↓
AssetPlanner (recommendations)
  ↓ [USER GATE: "confirm"]
AssetGenerator (create assets - Skills PRIORITY)
  ↓
VerificationAgent (validate & harmonize)
  ↓
COMPLETE
```

**User Interactions**: 2 (start + confirm plan)
**Autonomous Phases**: 4
**Quality Gates**: 1 (after planning)

## What Gets Inferred

**From Repository Structure** (using repository-analysis skill):
- Project type (API, CLI, web app, library)
- Tech stack (languages, frameworks, testing)
- Existing patterns and customization status

**Recommendations Generated**:
- **Skills** (`.github/skills/`) - Cross-platform [PRIORITY]
- Agent files (`.agent.md`) - VS Code specialists
- Instruction files (`.instructions.md`) - Coding standards
- Prompt files (`.prompt.md`) - Task templates
- AGENTS.md structure

## Example Execution

### Input
```
Bootstrap Copilot assets for: /Users/dev/projects/my-api-server
```

### Autonomous Execution
```
[BootstrapRepo] Validating...
✓ Repository exists
✓ Not CopilotCustomizer

[repository-analysis] Analyzing...
- Type: RESTful API Service
- Stack: Node.js, TypeScript, Express

[AssetPlanner] Planning...
Recommended: 3 agents, 3 instructions, 2 prompts

Reply "confirm" to generate.
```

### After Confirmation
```
[AssetGenerator] Creating assets...
[VerificationAgent] Validating & harmonizing...

## Bootstrap Complete ✓
Generated: 8 files
Documentation: /output/Bootstrap-Report.md
```

## Validation Rules
- Repository path must exist
- Target must not be CopilotCustomizer folder
- Git repository recommended

## Refinement Commands
- `refine: scope` - Adjust asset count
- `add: {asset}` - Include additional asset
- `skip: {asset}` - Remove from plan
- `cancel` - Abort workflow

## Skills Used
- [repository-analysis](../skills/repository-analysis/SKILL.md) - Tech stack detection
- [copilot-asset-design](../skills/copilot-asset-design/SKILL.md) - Asset decisions
- [technical-documentation](../skills/technical-documentation/SKILL.md) - Report generation

## Instructions Used
- [RepoReview.instructions.md](../instructions/RepoReview.instructions.md) - Analysis patterns
- [GenerateSkill.instructions.md](../instructions/GenerateSkill.instructions.md) - Skill creation
- [GenerateCopilotAgent.instructions.md](../instructions/GenerateCopilotAgent.instructions.md) - Agent generation
- [GenerateInstructions.instructions.md](../instructions/GenerateInstructions.instructions.md) - Instructions
- [GeneratePrompt.instructions.md](../instructions/GeneratePrompt.instructions.md) - Prompts
