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

### Validation Categories

#### 1. Asset Inventory
- Scan: `agents/`, `instructions/`, `prompts/`, `AGENTS.md`, `docs/workflows/`
- Assess: Completeness, Harmony compliance, versioning
- Prioritize: High/Med/Low by impact/effort

#### 2. Workflow Analysis
**Identify Workflow Patterns**:
- Linear workflows (A → B → C sequential chains)
- Branching workflows (parallel agent execution)
- Conditional workflows (dynamic routing based on context)
- Iterative workflows (refinement loops)

**Assess Workflow Completeness**:
- Entry points clearly defined (prompts with minimal input)
- Handoff chains documented and functional
- Context transfer protocol established
- Quality gates strategically placed
- Error handling and fallback paths

#### 3. Handoff Opportunities
**Assess**: Existing handoffs (automatic/manual/conditional), missing chains, repetitive multi-step processes, context transfer gaps

#### 4. Automation Potential
- Single-entry workflows for complex tasks
- Multi-agent chains for specialized domains
- Agent specialization (domain experts, orchestrators, QA, reporting)
- Autonomous execution with approval gates

### Output Requirements
**Location**: `CopilotCustomizer/output/<repo-name> - Repo Review - <YYYY-MM-DD>.md`  
**Structure**: Follow `templates/Analysis.template.md` with:
- Front-matter: `GeneratedAt`, `OutputPath`, `WorkflowsAnalyzed`
- Section: Asset Inventory
- Section: Workflow Analysis (NEW)
- Section: Handoff Opportunities (NEW)
- Section: Automation Recommendations (NEW)
- Section: Ready-to-run Prompts with concrete examples

**Workflow Analysis Output**:
```markdown
## Workflow Analysis

### Existing Workflows
| Workflow | Entry Point | Agents | Type | Status |
|----------|-------------|--------|------|--------|
| {Name} | {Prompt} | {Count} | {Linear/Branch/Conditional} | {Functional/Incomplete/Missing} |

### Handoff Chain Mapping
{Diagram showing agent-to-agent transitions}

### Quality Gates Identified
- {Agent}: {Gate Type} - {Purpose}

### Context Transfer Assessment
- {Handoff}: {Completeness %} - {Issues if any}
```

**Handoff Opportunities Output**:
```markdown
## Handoff Opportunities

### High-Priority Handoffs
1. **{SourceAgent} → {TargetAgent}**: {Use Case} | Context: {What transfers} | Benefit: {Impact}

### Missing Workflow Chains
1. **{Process Name}**: Manual {X}-step → Proposed: {AgentChain} | Entry: {Prompt} | ROI: {Gain}
```

**Automation Recommendations Output**:
```markdown
## Automation Recommendations

### Priority 1: High-Impact Workflows
1. **{Workflow Name}**: {Current State} → {Automation Plan} | Effort: {Low/Med/High} | Value: {Impact}

### Priority 2: Agent Specialization
1. **{Domain} Expert**: {Capability gap} | Handoffs: {Integration points}
```

**Prompt Standards**:
- Variables replaced with examples
- Exact source path included
- One-line usage instruction
- Priority assigned
- Workflow integration notes (NEW)

### Quality Checklist
- [ ] Assets inventoried (agents, instructions, prompts)
- [ ] Workflows mapped with entry points identified
- [ ] Handoff chains diagrammed
- [ ] Missing handoffs identified
- [ ] Automation opportunities prioritized
- [ ] Context transfer gaps assessed
- [ ] Quality gates evaluated
- [ ] Analysis follows template
- [ ] Output saved correctly
- [ ] Ready-to-run prompts included
- [ ] Priorities assigned with effort estimates
- [ ] Workflow integration notes added
- [ ] No placeholder variables

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
- Use `Maintain` for integrated validation

### Analysis Guidelines

**Reviewing Workflows**: Map entry points → Trace handoffs → Evaluate autonomy → Check context transfer → Validate quality gates → Measure efficiency

**Identifying Opportunities**: Repetitive patterns, multi-step tasks, domain expertise needs, context gaps, missing automation, scalability bottlenecks

**Priority Framework**:
- **High**: Frequent use + high manual effort + clear automation path
- **Medium**: Moderate frequency + some complexity + requires judgment
- **Low**: Rare use + high complexity + significant custom logic

*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*  
*VS Code: [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)*

---

## Processing Metadata

- **Standards Version**: VS Code Copilot v2025.11 (Agent Files v1.109)
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
