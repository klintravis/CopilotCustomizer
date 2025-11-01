---
applyTo: '.github/prompts/RepoReview.prompt.md'
description: 'Comprehensive framework for conducting repository analysis of Copilot customization assets, providing structured assessment, prioritization, and ready-to-run improvement prompts for agents, instructions, prompts, and workspace files'
---

# RepoReview.instructions.md

## Repo Review Instructions (v1.3)

**Paired Prompt**: [RepoReview.prompt.md](../prompts/RepoReview.prompt.md)

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
**Analyze Existing Handoffs**:
- Agent-to-agent transitions (YAML handoffs field)
- Manual handoffs (user-initiated)
- Automatic handoffs (send: true)
- Conditional handoffs (send: false with validation)

**Identify Missing Handoffs**:
- Agents that should chain together
- Repetitive multi-step processes
- Manual workflows that could be automated
- Context transfer gaps

#### 4. Automation Potential
**Workflow Orchestration**:
- Single-entry point workflows for complex tasks
- Multi-agent chains for specialized domains
- Autonomous execution after approval gates
- Batch operations and parallel processing

**Agent Specialization**:
- Domain experts (API, testing, security, documentation)
- Process orchestrators (planning, execution, verification)
- Quality assurance agents (validation, harmonization)
- Reporting agents (documentation, summaries)

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

### High-Priority Handoffs (Immediate Value)
1. **{SourceAgent} → {TargetAgent}**
   - Use Case: {Description}
   - Context: {What transfers}
   - Benefit: {Time saved, quality improved}
   - Implementation: {Concrete YAML example}

### Missing Workflow Chains
1. **{Process Name}**
   - Current: Manual {X}-step process
   - Proposed: {AgentA} → {AgentB} → {AgentC}
   - Entry Point: {Prompt to create}
   - Expected ROI: {Efficiency gain}
```

**Automation Recommendations Output**:
```markdown
## Automation Recommendations

### Priority 1: High-Impact Workflows
1. **{Workflow Name}**
   - Current State: {Manual steps}
   - Automation Plan: {Agent chain design}
   - Required Assets: {New agents/instructions}
   - Effort: {Low/Medium/High}
   - Value: {Time saved, consistency gained}

### Priority 2: Agent Specialization
1. **{Domain} Expert**
   - Need: {Specific capability gap}
   - Handoffs: {Integration points}
   - Reusable Instructions: {Existing assets to leverage}
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

### Workflow Pattern Examples

**Linear Workflow**:
```yaml
# Single-path sequential execution
EntryPoint → AnalysisAgent → PlanningAgent → ExecutionAgent → ValidationAgent → Complete
Quality Gate: After PlanningAgent (user confirms plan)
```

**Branching Workflow**:
```yaml
# Parallel execution paths
EntryPoint → Coordinator
  ├─> SecurityAgent → Merge
  ├─> PerformanceAgent → Merge
  └─> DocumentationAgent → Merge
Merge → ReportGenerator → Complete
```

**Conditional Workflow**:
```yaml
# Dynamic routing based on context
EntryPoint → ClassifierAgent
  ├─> [New Feature] → FeatureAgent → TestAgent
  ├─> [Bug Fix] → BugfixAgent → ValidationAgent
  └─> [Refactor] → RefactorAgent → ReviewAgent
All paths → DocumentationAgent → Complete
```

**Iterative Workflow**:
```yaml
# Refinement loop until criteria met
EntryPoint → GeneratorAgent → ValidationAgent
  ├─> [Valid] → Complete
  └─> [Issues] → RefinementAgent → GeneratorAgent (loop)
Max iterations: 3
```

### Handoff YAML Examples

**Automatic Handoff** (no user intervention):
```yaml
handoffs:
  - label: 'Validate Generated Code'
    agent: 'ValidationAgent'
    prompt: 'Validate the generated code for syntax errors, test coverage, and best practices compliance.'
    send: true
```

**Conditional Handoff** (requires validation):
```yaml
handoffs:
  - label: 'Execute Approved Plan'
    agent: 'ExecutionAgent'
    prompt: 'Execute the approved implementation plan with precise file modifications.'
    send: false  # Waits for user confirmation
```

**Context-Rich Handoff** (transfers detailed state):
```yaml
handoffs:
  - label: 'Generate Documentation'
    agent: 'DocumentationGenerator'
    prompt: 'Generate comprehensive documentation including: {{filesModified}}, {{featuresAdded}}, {{testsCoverage}}. Context: {{repositoryAnalysis}}'
    send: true
```

### Generator Prompts
- [NewAgentsFile.prompt.md](../prompts/NewAgentsFile.prompt.md) → AGENTS.md
- [NewInstructions.prompt.md](../prompts/NewInstructions.prompt.md) → Instructions
- [NewPrompt.prompt.md](../prompts/NewPrompt.prompt.md) → Prompts
- [NewCopilotAgent.prompt.md](../prompts/NewCopilotAgent.prompt.md) → Agents
- [ExternalRepoBootstrap.prompt.md](../prompts/ExternalRepoBootstrap.prompt.md) → Complete workflow (NEW)

### Workflow References
**Existing Workflows**:
- [ExternalRepoBootstrap](../../docs/workflows/ExternalRepoBootstrap.md) - Autonomous asset generation for external repos

**Workflow Instructions**:
- [GenerateWorkflow.instructions.md](GenerateWorkflow.instructions.md) - Multi-chain workflow framework
- [WorkflowValidation.instructions.md](WorkflowValidation.instructions.md) - Workflow integrity validation patterns

**Workflow Validation**:
- [WorkflowValidator.agent.md](../agents/WorkflowValidator.agent.md) - Handoff chain testing and automation metrics
- Validates handoff integrity, context transfer, quality gate placement
- Provides workflow health grades and optimization recommendations

**Handoff Documentation**:
- Agent files with `handoffs` YAML field for automatic transitions
- Context transfer via structured prompt templates
- Quality gates for user approval checkpoints

### Analysis Guidelines

**When Reviewing Workflows**:
1. **Map Entry Points**: Identify user-facing prompts that launch workflows
2. **Trace Handoffs**: Follow agent-to-agent transitions through the chain
3. **Evaluate Autonomy**: Assess automation level (manual vs automatic handoffs)
4. **Check Context Transfer**: Verify complete information passes between agents
5. **Validate Quality Gates**: Ensure approval points exist at strategic moments
6. **Measure Efficiency**: Calculate user interactions required vs workflow complexity

**When Identifying Opportunities**:
1. **Repetitive Patterns**: Look for manual processes repeated frequently
2. **Multi-Step Tasks**: Identify sequences that could be chained
3. **Domain Expertise**: Note specialized knowledge that could be agent-ified
4. **Context Gaps**: Find information loss between steps
5. **Missing Automation**: Spot manual handoffs that could be automatic
6. **Scalability Issues**: Recognize bottlenecks from manual orchestration

**Priority Framework**:
| Priority | Criteria | Examples |
|----------|----------|----------|
| **High** | Frequent use + high manual effort + clear automation path | Daily code review workflow, repetitive documentation tasks |
| **Medium** | Moderate frequency + medium complexity + some manual judgment needed | Weekly security audits, periodic refactoring |
| **Low** | Rare use + high complexity + requires significant custom logic | One-off migrations, exploratory research tasks |

*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*  
*Workflow Framework: [GenerateWorkflow.instructions.md](GenerateWorkflow.instructions.md)*  
*VS Code: [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)*

---

**Version**: v1.3 (2025-11-01)  
**Harmonization Applied**: 2025-09-15 | **Asset Integration**: 16-file ecosystem  
**Cross-References**: Enhanced with bidirectional binding | **Schema**: VS Code v1.0 compliant  
**Workflow Analysis**: Added workflow patterns, handoff opportunities, automation recommendations

*Generated and formatted following VS Code GitHub Copilot official documentation standards*