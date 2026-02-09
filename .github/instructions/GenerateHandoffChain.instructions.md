---
applyTo: '.github/**/*.{agent.md,prompt.md,workflow.md}'
description: 'Framework for creating multi-chain agent workflows with automated handoffs, shared instructions, and minimal user input entry points'
---

## Handoff Chain Generation Instructions (v1.0)

**Refinement Commands**: refine: handoffs, refine: automation, refine: minimal-input

### Purpose
Framework for multi-chain agent workflows with automated handoffs, shared instructions, and minimal user input.

**Note**: For orchestrated systems with 3+ agents, subagents should be placed in `.github/agents/_internal/` with `user-invokable: false` to keep them hidden from the picker. Only entry-point agents remain at `.github/agents/` level.

### Objectives
- 1-2 prompts gather complete context
- <5 user interactions per workflow
- 90%+ handoff success rate
- 70%+ shared instruction reuse

### Workflow Patterns
| Pattern | Flow | Use Case |
|---------|------|----------|
| Linear | Sequential A→B→C | Standard workflows |
| Branching | Parallel with consolidation | Independent tasks |
| Conditional | Dynamic routing | Context-dependent |
| Iterative | Refinement loops | Quality iterations |

### Agent Requirements
**Entry Points**: Max context from minimal input, validate assumptions, prepare handoffs  
**Specialized**: Single responsibility, standardized I/O, state preservation, error handling  
**Shared Patterns**: Reference reusable instructions, maintain consistency

### Handoff Protocol
```yaml
handoffs:
  - label: 'Agent Name'
    agent: 'agent-id'
    prompt: 'Task description with context.'
    send: true
    context: ['var1', 'var2']
```

**Context Transfer**: State preservation, validation checkpoints, rollback capability

### Shared Instructions
Link reusable patterns: `Reference: File.instructions.md (path/to/file)`

| Category | Reusability |
|----------|-------------|
| Analysis | 80-90% |
| Design | 70-85% |
| Implementation | 60-80% |
| Quality | 85-95% |

### Entry Point Design
1. Extract core requirements from minimal input
2. Infer context with smart defaults
3. Validate critical assumptions
4. Launch agent chain

### Testing Strategy
- E2E workflow validation
- Handoff context transfer verification
- Entry point minimal input testing
- Shared instruction consistency

**Quality Gates**: 95% context completeness, 90%+ handoff success, <5 interactions

### Documentation
- Workflow maps (visual agent chains)
- Agent specifications (capabilities/interfaces)
- Handoff protocols (context requirements)
- Entry point guides (input examples)

### Acceptance Criteria
- [ ] 90%+ handoff success rate
- [ ] <5 user interactions
- [ ] 95% context completeness
- [ ] 70%+ instruction reuse
- [ ] <30s handoff latency
- [ ] Error recovery functional

### Risks & Mitigation
**Context Loss**: Validation checkpoints  
**Handoff Failures**: Fallback mechanisms  
**Pattern Conflicts**: Compatibility testing

### Standards Integration

When generating workflows, align quality gates with matched enterprise standards (via [ResolveStandards.instructions.md](ResolveStandards.instructions.md)). If standards require security review, recommend a security validation step. If standards set test coverage expectations, include a testing gate that reflects those expectations.

*Framework: [CopilotFramework.instructions.md](CopilotFramework.instructions.md)*
*Security: [CopilotSecurity.instructions.md](CopilotSecurity.instructions.md)*
*Agent Creation: [GenerateCopilotAgent.instructions.md](GenerateCopilotAgent.instructions.md)*