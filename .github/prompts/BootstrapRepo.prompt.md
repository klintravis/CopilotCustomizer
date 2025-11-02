agent: BootstrapRepo
---

# BootstrapRepo Workflow (v1.0)

**Paired Agent**: [BootstrapRepo.agent.md](../agents/BootstrapRepo.agent.md)

## Purpose
Fully autonomous workflow for generating Copilot customization assets for a target repository in the same workspace. Single entry point that orchestrates complete lifecycle: analysis → planning → generation → validation → harmonization → documentation.

**Constraint**: Do not target the CopilotCustomizer folder itself (use a different repository in the same workspace).

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
RepoAnalyzer (tech stack detection)
  ↓
AssetPlanner (recommendations + specs)
  ↓ [USER GATE: "confirm"]
AssetGenerator (create all assets)
  ↓
VerificationAgent (schema validation)
  ↓
HarmonizationAgent (bind with metadata)
  ↓
VerificationAgent (final check)
  ↓
DocumentationGenerator (report)
  ↓
COMPLETE
```

**User Interactions**: 2 (start + confirm plan)  
**Autonomous Phases**: 7  
**Quality Gates**: 1 (after planning)

## What Gets Inferred

**From Repository Structure**:
- Project type (API, CLI, web app, library)
- Tech stack (languages, frameworks)
- Existing patterns (architecture, conventions)
- Current customization status

**Recommendations Generated**:
- Required agent files (.agent.md)
- Required instruction files (.instructions.md)
- Required prompt files (.prompt.md)
- AGENTS.md structure
- Cross-reference network

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

Recommended Assets (8):

Agent Files (3):
✓ APIExpert.agent.md - RESTful endpoint design
✓ TestOrchestrator.agent.md - Jest test generation
✓ SecurityReviewer.agent.md - API security audits

Instruction Files (3):
✓ APIPatterns.instructions.md - RESTful conventions
✓ TestingStandards.instructions.md - Jest patterns
✓ SecurityPatterns.instructions.md - Auth & validation

Prompt Files (2):
✓ GenerateEndpoint.prompt.md - Endpoint scaffolding
✓ DocumentAPI.prompt.md - OpenAPI generation

Risk: MEDIUM | Expected duration: 2-3 minutes

Reply "confirm" to generate all assets autonomously.
```

### User Confirmation
```
confirm
```

### Phase 4-8: Autonomous Execution (2-3m)
```
[AssetGenerator] Creating 8 assets...
✓ APIExpert.agent.md (47 lines)
✓ TestOrchestrator.agent.md (52 lines)
✓ SecurityReviewer.agent.md (45 lines)
✓ APIPatterns.instructions.md (38 lines)
✓ TestingStandards.instructions.md (41 lines)
✓ SecurityPatterns.instructions.md (36 lines)
✓ GenerateEndpoint.prompt.md (29 lines)
✓ DocumentAPI.prompt.md (31 lines)

[VerificationAgent] Validating assets...
✓ Schema compliance: 100%
✓ YAML validation: All valid
✓ Tool approvals: Verified

[HarmonizationAgent] Binding ecosystem...
✓ Cross-references: 14 added
✓ Metadata: Applied to all
✓ Handoff chains: 2 validated
✓ Terminology: Standardized

[VerificationAgent] Final validation...
✓ All cross-references resolved
✓ No orphaned assets
✓ Complete ecosystem

[DocumentationGenerator] Creating report...
✓ Bootstrap summary generated
✓ Asset inventory documented
✓ Quick start guide created
```

### Completion
```
## Bootstrap Complete ✓

Generated Assets: 8 files
- .github/agents/ (3 agent files)
- .github/instructions/ (3 instruction files)  
- .github/prompts/ (2 prompt files)
- AGENTS.md (quick start guide)

Documentation: /output/Bootstrap-my-api-server-2025-01-15.md

Next Steps:
1. Review AGENTS.md for usage guide
2. Test agent modes in VS Code Copilot Chat
3. Customize assets for project-specific needs

Total time: 3m 47s
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

## Refinement Commands

After plan presentation, before confirmation:

- `refine: scope` - Adjust asset count
- `refine: complexity` - Simplify/expand specs
- `add: {asset}` - Include additional asset
- `skip: {asset}` - Remove from plan
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

## Quality Guarantees

**Acceptance Criteria**:
- [ ] Repository path validated (not CopilotCustomizer)
- [ ] Tech stack detected (or manual input accepted)
- [ ] Asset recommendations generated
- [ ] <5 user interactions total (ideally 2)
- [ ] 90%+ handoff success rate
- [ ] Schema compliance: 100%
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

**Reused Instructions** (70%+ shared):
- [CopilotFramework.instructions.md](../instructions/CopilotFramework.instructions.md) - Universal workflows
- [RepoReview.instructions.md](../instructions/RepoReview.instructions.md) - Analysis patterns
- [GenerateCopilotAgent.instructions.md](../instructions/GenerateCopilotAgent.instructions.md) - Agent generation
- [GenerateInstructions.instructions.md](../instructions/GenerateInstructions.instructions.md) - Instruction creation
- [GeneratePrompt.instructions.md](../instructions/GeneratePrompt.instructions.md) - Prompt templates
- [HarmonizeAssets.instructions.md](../instructions/HarmonizeAssets.instructions.md) - Asset binding
- [CopilotAudit.instructions.md](../instructions/CopilotAudit.instructions.md) - Quality validation

**Agent Chain**:
- [BootstrapRepo.agent.md](../agents/BootstrapRepo.agent.md) - Entry point
- [RepoAnalyzer.agent.md](../agents/RepoAnalyzer.agent.md) - Analysis
- [AssetPlanner.agent.md](../agents/AssetPlanner.agent.md) - Planning + gate
- [AssetGenerator.agent.md](../agents/AssetGenerator.agent.md) - Generation
- [VerificationAgent.agent.md](../agents/VerificationAgent.agent.md) - Validation
- [HarmonizationAgent.agent.md](../agents/HarmonizationAgent.agent.md) - Binding
- [DocumentationGenerator.agent.md](../agents/DocumentationGenerator.agent.md) - Reporting

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
