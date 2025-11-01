---
applyTo: '.github/prompts/RepoReview.prompt.md'
description: 'Comprehensive framework for conducting repository analysis of Copilot customization assets, providing structured assessment, prioritization, and ready-to-run improvement prompts for chatmodes, instructions, prompts, and agent files'
---

# RepoReview.instructions.md

## Repo Review Instructions (v1.2)

**Paired Prompt**: [RepoReview.prompt.md](../prompts/RepoReview.prompt.md)

### Purpose
Guide AI agents to audit Copilot customization assets and deliver actionable improvement analysis via `templates/Analysis.template.md`.

**Workflow**: Scan repo → prioritize gaps → generate ready-to-run prompts → save to `CopilotCustomizer/output/`

### Required Inputs
- **Target Path**: Repo root or folder
- **Focus Area**: Optional filter (chatmodes, prompts, all)
- **Output Constraints**: Exclude `.github/*`, binaries, caches

### Validation
- Scan: `chatmodes/`, `instructions/`, `prompts/`, `AGENTS.md`
- Assess: Completeness, Harmony compliance, versioning
- Prioritize: High/Med/Low by impact/effort

### Output Requirements
**Location**: `CopilotCustomizer/output/<repo-name> - Repo Review - <YYYY-MM-DD>.md`  
**Structure**: Follow `templates/Analysis.template.md` with:
- Front-matter: `GeneratedAt`, `OutputPath`
- Section: `Ready-to-run Prompts` with concrete examples

**Prompt Standards**:
- Variables replaced with examples
- Exact source path included
- One-line usage instruction
- Priority assigned

### Quality Checklist
- [ ] Assets inventoried
- [ ] Analysis follows template
- [ ] Output saved correctly
- [ ] Ready-to-run prompts included
- [ ] Priorities assigned
- [ ] No placeholder variables

### Generator Prompts
- [NewAgentsFile.prompt.md](../prompts/NewAgentsFile.prompt.md) → AGENTS.md
- [NewInstructions.prompt.md](../prompts/NewInstructions.prompt.md) → Instructions
- [NewPrompt.prompt.md](../prompts/NewPrompt.prompt.md) → Prompts
- [NewCopilotAgent.prompt.md](../prompts/NewCopilotAgent.prompt.md) → Agents

*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*  
*VS Code: [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)*

---

**Harmonization Applied**: 2025-09-15 | **Asset Integration**: 16-file ecosystem  
**Cross-References**: Enhanced with bidirectional binding | **Schema**: VS Code v1.0 compliant  

*Generated and formatted following VS Code GitHub Copilot official documentation standards*