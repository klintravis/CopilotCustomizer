---
applyTo: '.github/agents/*.agent.md'
description: 'Validation patterns for multi-agent workflow integrity and handoff chain analysis'
---

# WorkflowValidation Instructions (v2.0)

## Purpose
Define systematic validation rules for multi-agent workflows including handoff chain integrity, context transfer completeness, and automation efficiency measurement.

## Validation Framework

### 1. Handoff Discovery Protocol
```yaml
Files to scan: .github/agents/*.agent.md
YAML section: handoffs[]
Required fields:
  - label: string (human-readable name)
  - agent: string (target agent ID)
  - prompt: string (context transfer description)
  - send: boolean (auto vs manual)
```

### 2. Handoff Chain Integrity Rules

**Rule 1: Reference Validity**
```
FOR each handoff:
  target_agent = handoff.agent
  expected_file = ".github/agents/{target_agent}.agent.md"
  VERIFY: file_exists(expected_file)
```

**Rule 2: No Circular Dependencies**
```
FOR each workflow chain:
  Verify no agent appears twice in chain
```

**Rule 3: Terminal Agent Validation**
```
Agents with no handoffs should be intentional terminals
```

### 3. Context Transfer Validation

**Required Context Elements**:
- What data/results from previous agent
- What validation/processing needed
- What output expected

**Red Flags**:
- Prompt < 20 characters (too vague)
- Generic prompts like "Continue workflow"
- No mention of context transfer

### 4. Quality Gate Assessment

**Automatic Handoff (send: true)**:
- Read-only operations
- Low-risk processing
- Validation steps

**Manual Handoff (send: false)**:
- File modifications
- High-impact decisions
- User approval required

### 5. Automation Efficiency
```
automation_ratio = (auto_handoffs / total_handoffs) * 100

Grades:
A: 85-100% automation
B: 70-84% automation
C: 50-69% automation
D: <50% automation
```

## Related Instructions
- [RepoReview.instructions.md](RepoReview.instructions.md) - Repository scanning
- [GenerateWorkflow.instructions.md](GenerateWorkflow.instructions.md) - Workflow patterns
