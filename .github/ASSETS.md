# CopilotCustomizer Assets Reference

> Complete reference for all framework assets

---

## Asset Overview

| Asset Type | Count | Location | Required YAML |
|------------|-------|----------|---------------|
| **Skills** | 5 | `.github/skills/*/SKILL.md` | `name`, `description` |
| **Agents** | 7 | `.github/agents/*.agent.md` | `description` |
| **Instructions** | 14 | `.github/instructions/*.instructions.md` | `applyTo` |
| **Prompts** | 16 | `.github/prompts/*.prompt.md` | - |
| **Templates** | 7 | `.github/templates/*.template.md` | - |

---

## Skills

Cross-platform capabilities using [agentskills.io](https://agentskills.io) standard.

| Skill | Purpose | Example |
|-------|---------|---------|
| `repository-analysis` | Codebase structure & tech stack detection | [Express API](skills/repository-analysis/examples/example-express-api.md) |
| `implementation-planning` | Strategic planning & risk mitigation | [API Customization](skills/implementation-planning/examples/example-api-customization.md) |
| `copilot-asset-design` | Asset architecture & validation | [API Specialist](skills/copilot-asset-design/examples/example-api-specialist-design.md) |
| `technical-documentation` | Documentation generation | [Change Summary](skills/technical-documentation/examples/example-api-change-summary.md) |
| `deployment-automation` | CI/CD & deployment strategies | [GitHub Actions](skills/deployment-automation/examples/example-github-actions.md) |

### SKILL.md Format

```yaml
---
name: skill-name
description: What this skill does (max 1024 chars)
---

# Skill Content
[Instructions, methodology, examples]
```

---

## Agents

VS Code workflow orchestration specialists.

| Agent | Purpose |
|-------|---------|
| `BootstrapRepo.agent.md` | Repository bootstrap entry point |
| `AssetPlanner.agent.md` | Asset recommendation and specification |
| `AssetGenerator.agent.md` | Multi-asset creation engine |
| `HarmonizationAgent.agent.md` | Cross-reference binding |
| `ChangeExecutor.agent.md` | Precise file operations |
| `VerificationAgent.agent.md` | Schema validation |
| `CopilotCustomizer.agent.md` | Main interactive mode |

### Agent File Format

```yaml
---
description: 'Brief description of the agent'
model: Auto (copilot)
tools: ['search', 'edit', 'new']
handoffs:
  - label: 'Next Step'
    agent: 'target-agent'
    prompt: 'Context for next agent'
    send: false
---

## Agent Name

### Role
### Core Objectives
### Workflow
```

---

## Instructions

AI guidance rules for coding standards and generation patterns.

### Generation Instructions

| File | Purpose |
|------|---------|
| `GenerateSkill.instructions.md` | Create Agent Skills |
| `GenerateCopilotAgent.instructions.md` | Create VS Code agents |
| `GeneratePrompt.instructions.md` | Create prompt templates |
| `GenerateInstructions.instructions.md` | Create instruction files |
| `GenerateWorkflow.instructions.md` | Create multi-agent workflows |
| `GenerateAgentsFile.instructions.md` | Create AGENTS.md files |

### Quality Instructions

| File | Purpose |
|------|---------|
| `CopilotFramework.instructions.md` | Universal framework patterns |
| `CopilotAudit.instructions.md` | Quality assurance |
| `CopilotSecurity.instructions.md` | Security patterns |
| `FormatAssets.instructions.md` | Asset formatting |
| `HarmonizeAssets.instructions.md` | Cross-reference binding |
| `RepoReview.instructions.md` | Repository analysis |
| `WorkflowValidation.instructions.md` | Workflow integrity |
| `AssetOptimization.instructions.md` | Token efficiency |

### Instruction File Format

```yaml
---
applyTo: '**/*.ts'
description: 'TypeScript coding standards'
---

## Instruction Name

### Objective
### Constraints
### Workflow
### Standards
```

---

## Prompts

Slash commands for user interaction.

### Core Workflows

| File | Command | Purpose |
|------|---------|---------|
| `BootstrapRepo.prompt.md` | `/BootstrapRepo` | Full repository setup |
| `RepoReview.prompt.md` | `/RepoReview` | Repository analysis |
| `UpdateCopilotCustomizer.prompt.md` | `/UpdateCopilotCustomizer` | Framework maintenance |

### Asset Generation

| File | Command | Purpose |
|------|---------|---------|
| `NewSkill.prompt.md` | `/NewSkill` | Create new skill |
| `NewCopilotAgent.prompt.md` | `/NewCopilotAgent` | Create new agent |
| `NewInstructions.prompt.md` | `/NewInstructions` | Create instructions |
| `NewPrompt.prompt.md` | `/NewPrompt` | Create prompt |
| `NewWorkflow.prompt.md` | `/NewWorkflow` | Create workflow |
| `NewAgentsFile.prompt.md` | `/NewAgentsFile` | Create AGENTS.md |

### Maintenance

| File | Command | Purpose |
|------|---------|---------|
| `AssetOptimization.prompt.md` | `/AssetOptimization` | Optimize assets |
| `FormatAssets.prompt.md` | `/FormatAssets` | Format assets |
| `HarmonizeAssets.prompt.md` | `/HarmonizeAssets` | Harmonize cross-references |
| `QuickChange.prompt.md` | `/QuickChange` | Fast minimal changes |
| `SecurityToolingAudit.prompt.md` | `/SecurityToolingAudit` | Security audit |
| `WorkflowIntegrityCheck.prompt.md` | `/WorkflowIntegrityCheck` | Validate workflows |
| `AgentResume.prompt.md` | `/AgentResume` | Universal agent helper |

---

## Templates

Standardized document formats.

| Template | Purpose |
|----------|---------|
| `Analysis.template.md` | Universal analysis framework |
| `ImplementationPlan.template.md` | Project planning format |
| `ProgressLog.template.md` | Status tracking format |
| `TestStrategy.template.md` | Test planning and TDD |
| `SecurityReview.template.md` | Security assessments |
| `ChangeLog.template.md` | Release notes format |
| `AssetInventory.template.md` | Asset catalog format |

---

## Asset Relationships

```
Skills ←→ Universal (cross-platform methodology)
   ↓
Agents ←→ VS Code (workflow orchestration)
   ↓
Instructions ↔ Prompts (paired execution)
```

### Binding Relationships

| Instruction | Paired Prompt | Purpose |
|-------------|---------------|---------|
| `GenerateSkill` | `NewSkill` | Skill creation |
| `GenerateCopilotAgent` | `NewCopilotAgent` | Agent creation |
| `GenerateInstructions` | `NewInstructions` | Instruction creation |
| `GeneratePrompt` | `NewPrompt` | Prompt creation |
| `GenerateWorkflow` | `NewWorkflow` | Workflow creation |
| `GenerateAgentsFile` | `NewAgentsFile` | AGENTS.md creation |
| `HarmonizeAssets` | `HarmonizeAssets` | Asset integration |
| `FormatAssets` | `FormatAssets` | Asset formatting |
| `AssetOptimization` | `AssetOptimization` | Asset optimization |
| `RepoReview` | `RepoReview` | Repository analysis |

---

## Usage Workflows

### Asset Creation Workflow

1. **Choose Asset Type**: Skill, Agent, Instructions, or Prompt
2. **Use Generation Pair**: Apply instruction + prompt combination
3. **Provide Variables**: Inline variables in slash command
4. **Execute**: Run via slash command
5. **Validate**: Check schema compliance

### Asset Maintenance Workflow

1. **Audit Repository**: `/RepoReview TARGET_PATH: "/path"`
2. **Identify Improvements**: Review recommendations
3. **Apply Optimizations**: `/AssetOptimization`
4. **Format Standards**: `/FormatAssets`
5. **Harmonize**: `/HarmonizeAssets`

---

## Best Practices

### File Organization
- Keep assets in appropriate subdirectories
- Use consistent naming: `PascalCase.type.md`
- Separate generation from management assets

### Schema Compliance
- Include required YAML fields
- Use optional fields for enhancement
- Validate YAML syntax

### Cross-Reference Integrity
- Maintain bidirectional links
- Use relative paths
- Test all references

---

## Summary

| Category | Count |
|----------|-------|
| **Skills** | 5 |
| **Agents** | 7 |
| **Instructions** | 14 |
| **Prompts** | 16 |
| **Templates** | 7 |
| **Total** | 49 |

---

<p align="center">
<strong>Framework</strong>: CopilotCustomizer v1.1 | <strong>Standard</strong>: VS Code Copilot 1.106+
</p>
