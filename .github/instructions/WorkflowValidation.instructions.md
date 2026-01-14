---
applyTo: '.github/agents/WorkflowValidator.agent.md'
description: 'Validation patterns and rules for multi-agent workflow integrity testing, handoff chain analysis, and automation efficiency measurement'
---

# WorkflowValidation.instructions.md

## Workflow Validation Instructions (v1.0)

**Paired Agent**: [WorkflowValidator.agent.md](../agents/WorkflowValidator.agent.md)

### Purpose
Define systematic validation rules for multi-agent workflows including handoff chain integrity, context transfer completeness, quality gate placement, and automation efficiency measurement. Supports RepoReview v1.3 workflow analysis capabilities.

### Validation Framework

#### 1. Handoff Discovery Protocol
**Scan Strategy**:
```yaml
Files to scan: .github/agents/*.agent.md
YAML section: handoffs[]
Required fields:
  - label: string (human-readable name)
  - agent: string (target agent ID)
  - prompt: string (context transfer description)
  - send: boolean (auto vs manual)
```

**Discovery Algorithm**:
1. List all agent files in `.github/agents/`
2. Parse YAML front matter for each
3. Extract `handoffs` array if present
4. Build graph of agent → target relationships
5. Identify entry points (agents with no incoming handoffs)
6. Identify terminals (agents with no outgoing handoffs)

#### 2. Handoff Chain Integrity Rules

**Rule 1: Reference Validity**
```
FOR each handoff in workflow:
  target_agent = handoff.agent
  expected_file = ".github/agents/{target_agent}.agent.md"
  
  IF file_exists(expected_file):
    PASS: Reference valid
  ELSE:
    FAIL: Broken reference - {target_agent} not found
```

**Rule 2: No Circular Dependencies**
```
FOR each workflow chain:
  visited = []
  current = entry_point
  
  WHILE current has handoff:
    IF current in visited:
      FAIL: Circular dependency detected - {trace path}
    visited.append(current)
    current = next_agent
  
  PASS: No circular dependencies
```

**Rule 3: Terminal Agent Validation**
```
FOR each agent:
  IF agent has no handoffs:
    VERIFY: Agent is documented as terminal
    CHECK: No unintended workflow termination
```

#### 3. Context Transfer Validation

**Completeness Scoring**:
```
FOR each handoff:
  prompt_length = len(handoff.prompt)
  
  Score = 0
  IF prompt_length > 100 chars: Score += 30
  IF prompt contains "{{" or "context": Score += 20
  IF prompt describes data transfer: Score += 30
  IF prompt specifies validation: Score += 20
  
  IF Score >= 80: HIGH completeness
  IF Score >= 50: MEDIUM completeness
  IF Score < 50: LOW completeness (flag for review)
```

**Required Context Elements**:
- What data/results from previous agent
- What validation/processing needed
- What output expected
- Any conditional logic

**Red Flags**:
- Prompt < 20 characters (too vague)
- Generic prompts like "Continue workflow"
- No mention of context transfer
- Missing data requirements

#### 4. Quality Gate Assessment

**Gate Placement Rules**:
```yaml
Automatic Handoff (send: true):
  Use when:
    - Read-only operations
    - Low-risk processing
    - Validation steps
    - Documentation generation
  
Manual Handoff (send: false):
  Use when:
    - File modifications
    - External API calls
    - High-impact decisions
    - User approval required
    - Irreversible operations
```

**Optimal Gate Ratio**:
- Simple workflows (3-5 agents): 1 gate
- Medium workflows (6-10 agents): 1-2 gates
- Complex workflows (11+ agents): 2-3 gates maximum

**Anti-patterns**:
- No gates in destructive workflow (unsafe)
- Gate after every step (inefficient)
- Gate placement inconsistent with risk

#### 5. Pattern Classification

**Linear Workflow**:
```
Characteristics:
  - Single entry point
  - Single path through agents
  - No branches or loops
  - Sequential execution
  
Example: A → B → C → D
```

**Branching Workflow**:
```
Characteristics:
  - Single entry point
  - Multiple parallel paths
  - Paths may converge
  - Concurrent execution possible
  
Example: 
    A
   / \
  B   C
   \ /
    D
```

**Conditional Workflow**:
```
Characteristics:
  - Dynamic routing based on context
  - Different paths for different scenarios
  - Decision points in handoff logic
  
Example:
    A
   / | \
  B  C  D  (based on condition)
```

**Iterative Workflow**:
```
Characteristics:
  - Refinement loops
  - Exit conditions required
  - Maximum iteration limits
  
Example:
  A → B → C
      ↑   ↓
      ← D ← (loop if not valid)
```

#### 6. Automation Efficiency Calculation

**User Interaction Formula**:
```
total_handoffs = count(all handoffs in workflow)
manual_handoffs = count(handoffs where send = false)
quality_gates = manual_handoffs

automation_ratio = ((total_handoffs - manual_handoffs) / total_handoffs) * 100
```

**Efficiency Grading**:
```
A: 85-100% automation (1-2 gates max)
B: 70-84% automation (reasonable balance)
C: 50-69% automation (too many gates)
D: 30-49% automation (inefficient)
F: <30% automation (mostly manual)
```

**Target Metrics by Workflow Type**:
- External Bootstrap: 85%+ (2 interactions ideal)
- Change Request: 75%+ (confirm plan)
- Repo Review: 90%+ (fully automated)
- Asset Generation: 80%+ (confirm specifications)

#### 7. Validation Report Template

```markdown
# Workflow Validation Report

Generated: {timestamp}
Workflow: {name or "Discovered"}
Validator: WorkflowValidator v1.0

## Executive Summary

**Status**: {emoji} {HEALTHY|NEEDS ATTENTION|BROKEN}
**Grade**: {A|B|C|D|F}
**Recommendation**: {DEPLOY|REVIEW|FIX}

Quick Stats:
- Agents: {count}
- Handoffs: {count}
- Quality Gates: {count}
- Automation: {percentage}%

---

## 1. Handoff Chain Analysis

### Chain Diagram
```
{Entry Point}
  ↓ [auto]
{Agent1}
  ↓ [manual - USER GATE]
{Agent2}
  ↓ [auto]
{Terminal}
```

### Reference Integrity
✅ Valid References: {count}/{total}
❌ Broken References: {list or "None"}
⚠️ Circular Dependencies: {list or "None"}

**Details**:
{For each handoff: source → target (status)}

---

## 2. Context Transfer Assessment

**Overall Completeness**: {percentage}%

| Handoff | Source | Target | Completeness | Issues |
|---------|--------|--------|--------------|--------|
| 1 | {A} | {B} | {HIGH/MED/LOW} | {notes} |
| 2 | {B} | {C} | {HIGH/MED/LOW} | {notes} |

**Missing Context Documentation**:
{List handoffs needing better prompts}

---

## 3. Quality Gate Evaluation

**Total Gates**: {count}
**Placement Strategy**: {OPTIMAL|ACCEPTABLE|NEEDS REVIEW}

| Gate | Location | Risk Level | Appropriate? |
|------|----------|------------|--------------|
| 1 | After {Agent} | {HIGH/MED/LOW} | {Yes/No} |

**Automation Ratio**: {percentage}%
**Grade**: {A|B|C|D|F}

---

## 4. Pattern Analysis

**Detected Pattern**: {LINEAR|BRANCHING|CONDITIONAL|ITERATIVE}

**Characteristics**:
- Entry Points: {count}
- Terminal Agents: {count}
- Longest Path: {count} agents
- Branches: {count}
- Loops: {count}

**Complexity**: {LOW|MEDIUM|HIGH}

---

## 5. Automation Efficiency

**Metrics**:
- User Interactions Required: {count}
- Autonomous Phases: {count} ({percentage}%)
- Manual Intervention Points: {list}

**Efficiency Score**: {number}/100
**Grade**: {A|B|C|D|F}

**Comparison to Targets**:
- Target for workflow type: {percentage}%
- Actual: {percentage}%
- Delta: {+/- percentage}%

---

## 6. Issues Identified

### Critical (Must Fix)
{List blocking issues}

### Warnings (Should Fix)
{List sub-optimal patterns}

### Suggestions (Nice to Have)
{List optimization opportunities}

---

## 7. Recommendations

### Immediate Actions
1. {Highest priority fixes}

### Short-Term Improvements
1. {Medium priority enhancements}

### Long-Term Optimizations
1. {Future improvements}

---

## Validation Metadata

- Validation Method: Automated analysis
- Standards: VS Code Copilot v1.106+
- Framework: CopilotCustomizer v1.0
- Instruction Reuse: {percentage}%

**Next Steps**: {Action items for user}

---
*Generated by WorkflowValidator.agent.md*
```

### Integration with RepoReview

**When RepoReview v1.3 Runs**:
1. Identifies workflows during repository scan
2. Extracts workflow specifications
3. Optionally invokes WorkflowValidator for each workflow
4. Includes validation results in repo review output

**RepoReview → WorkflowValidator Handoff**:
```yaml
context:
  workflows_identified: [
    {
      name: "BootstrapRepo"
      entry_point: "BootstrapRepo.agent.md"
      agents: ["BootstrapRepo", "RepoAnalyzer", ...]
      handoff_count: 8
    }
  ]
request: "Validate all identified workflows"
```

**WorkflowValidator → RepoReview Response**:
```yaml
results: [
  {
    workflow: "BootstrapRepo"
    status: "HEALTHY"
    grade: "A"
    automation: "87%"
    issues: []
  }
]
```

### Quality Checklist

**Pre-Validation**:
- [ ] All agent files accessible
- [ ] YAML parsing successful
- [ ] Handoff arrays extracted

**During Validation**:
- [ ] Chain mapping complete
- [ ] Reference checks performed
- [ ] Context analysis complete
- [ ] Gate assessment done
- [ ] Pattern classified
- [ ] Metrics calculated

**Post-Validation**:
- [ ] Report generated
- [ ] Recommendations prioritized
- [ ] No false positives
- [ ] Issues clearly documented
- [ ] Handoff to documentation ready

### Error Handling Patterns

**Parse Failure**:
```
IF yaml_parse_error:
  LOG: "Agent {name} has invalid YAML"
  SKIP: Agent in chain mapping
  REPORT: Parse error in validation results
```

**Missing Agent File**:
```
IF handoff_target_not_found:
  MARK: Broken reference
  CONTINUE: Validation for other handoffs
  RECOMMEND: Fix or remove broken handoff
```

**Ambiguous Pattern**:
```
IF pattern_classification_unclear:
  CLASSIFY: As most restrictive type
  WARN: Manual review recommended
  NOTE: Complexity may be too high
```

### Performance Optimization

**Caching Strategy**:
```
Cache agent file contents for session
Reuse YAML parsing results
Avoid redundant file system calls
```

**Parallel Processing**:
```
Analyze independent handoffs concurrently
Aggregate results at end
Maintain thread-safe data structures
```

**Early Termination**:
```
IF critical_error_detected AND not_full_scan_requested:
  REPORT: Critical issue immediately
  OPTION: Continue or abort based on severity
```

### Framework Integration

*Workflow patterns: [GenerateWorkflow.instructions.md](GenerateWorkflow.instructions.md)*  
*Repository scanning: [RepoReview.instructions.md](RepoReview.instructions.md)*  
*Quality dimensions: [CopilotAudit.instructions.md](CopilotAudit.instructions.md)*  
*Standards compliance: [CopilotFramework.instructions.md](../instructions/CopilotFramework.instructions.md)*  
*Security patterns: [CopilotSecurity.instructions.md](CopilotSecurity.instructions.md)*

---

**Version**: v1.0 (2025-11-01)  
**Schema Compliance**: VS Code Copilot Instructions v1.0  
**Integration**: RepoReview v1.3, CopilotAudit framework  
**Instruction Reuse**: 80%+ from CopilotCustomizer framework

*Comprehensive workflow validation patterns for multi-agent orchestration quality assurance*
