---
applyTo: '.github/prompts/Review.prompt.md'
description: 'Comprehensive framework for conducting repository analysis of Copilot customization assets, providing structured assessment, prioritization, and ready-to-run improvement prompts for agents, instructions, prompts, and workspace files'
---

<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: RepoReview Instructions (Instructions) v1.3
   STATUS: Instructions Applied — Context loaded
════════════════════════════════════════════════════════════════════════════ -->

## Repo Review Instructions (v1.3)

**Paired Prompt**: [Review.prompt.md](../prompts/Review.prompt.md)

### Purpose
Guide AI agents to audit Copilot customization assets and deliver actionable improvement analysis via `templates/Analysis.template.md`. Includes workflow orchestration analysis, agent handoff opportunities, and automation recommendations.

**Workflow**: Scan repo → analyze workflows → identify handoff chains → prioritize gaps → generate ready-to-run prompts → save to `CopilotCustomizer/output/`

### Required Inputs
- **Target Path**: Repo root or folder
- **Focus Area**: Optional filter (agents, prompts, workflows, all)
- **Output Constraints**: Exclude `.github/*`, binaries, caches

### Audit Methodology

**Skill Reference**: Use the [asset-audit](../skills/asset-audit/SKILL.md) skill for complete audit methodology:
- Asset discovery and inventory scanning
- Quality assessment (schema, completeness, cross-references)
- Workflow analysis (linear, branching, conditional, iterative)
- Gap analysis and prioritization framework
- Audit dimensions (structure, clarity, guardrails, consistency, extensibility, security)

### Output Requirements
- **Location**: `CopilotCustomizer/output/<repo-name> - Repo Review - <YYYY-MM-DD>.md`
- **Template**: Follow `templates/Analysis.template.md`
- Include: Asset inventory, workflow analysis, gap findings, prioritized recommendations, ready-to-run prompts

### Quality Checklist
- [ ] Assets inventoried and workflows mapped
- [ ] Handoff chains diagrammed with gaps identified
- [ ] Automation opportunities prioritized with effort estimates
- [ ] Analysis follows template, output saved correctly
- [ ] Ready-to-run prompts included, no placeholder variables

### Workflow & Handoff Patterns

### Generator Prompts
- [NewAgentsFile.prompt.md](../prompts/NewAgentsFile.prompt.md) → AGENTS.md
- [NewInstructions.prompt.md](../prompts/NewInstructions.prompt.md) → Instructions
- [NewPrompt.prompt.md](../prompts/NewPrompt.prompt.md) → Prompts
- [NewAgent.prompt.md](../prompts/NewAgent.prompt.md) → Agents
- [Bootstrap.prompt.md](../prompts/Bootstrap.prompt.md) → Complete workflow

### Workflow References
**Bootstrap autonomous workflow**: Use [Bootstrap.prompt.md](../prompts/Bootstrap.prompt.md) to generate complete asset set for a repository
- [Orchestration.instructions.md](Orchestration.instructions.md) - Conductor/subagent patterns
- Use `/Evolve` for integrated validation

### Analysis Guidelines
**Review flow**: Map entry points → trace handoffs → evaluate autonomy → validate quality gates.  
**Priority**: High (frequent + high effort + clear path), Medium (moderate + some complexity), Low (rare + high complexity).

*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*  
*VS Code: [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)*

---

## Processing Metadata

- **Standards Version**: VS Code Copilot v2026.03 (Agent Files v1.112)
- **Role**: Comprehensive framework for repository analysis of Copilot customization assets
- **Scope**: Structured assessment, prioritization, and improvement prompts
- **Output**: Ready-to-run improvement prompts for agents, instructions, prompts, and workspace files

*Generated following CopilotCustomizer instruction generation standards*

---

## Change History

| Version | Date | Changes |
|---------|------|---------|
| v1.1 | 2026-02-15 | Fixed legacy metadata, harmonized version tracking |
| v1.0 | 2026-01-15 | Initial release |
