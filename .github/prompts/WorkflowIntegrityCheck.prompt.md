---
agent: CopilotCustomizer
---

<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: WorkflowIntegrityCheck Prompt (Prompt) v1.0
   STATUS: Prompt Ready — Awaiting execution
════════════════════════════════════════════════════════════════════════════ -->

# WorkflowIntegrityCheck Prompt (v1.0)

### Task Intent
Validate that agents, prompts, and instructions form coherent, testable workflows with clear handoffs and no broken links.

### Variable Block
```
WORKFLOW: "{WORKFLOW}" # "all" or a specific workflow name
STRICT: "{STRICT}" # true|false (default: true)
```

### Workflow Phases
**Phase 1: Analysis** (Auto) - Detect workflows and their components
**Phase 2: Planning** (Auto) - Build validation plan for selected workflows
**Phase 3: Implementation** (Auto) - None (validation-only)
**Phase 4: Verification** (Auto) - Execute WorkflowValidator checks; strict mode fails on warnings
**Phase 5: Documentation** (Auto) - Generate pass/fail matrix and failure reasons

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: scope` | Select specific workflows or assets |
| `refine: approach` | Toggle STRICT mode thresholds |
| `refine: validation` | Add custom checks (e.g., schema versions) |
| `refine: docs` | Adjust matrix detail level |

### Handoff Chain
```
WorkflowIntegrityCheck → RepoAnalyzer → WorkflowValidator → DocumentationGenerator → Complete
```

### Notes
- Uses `WorkflowValidation.instructions.md` for integrity checks
- Ideal for CI gates and post-change sanity checks
- See docs: `docs/workflows/WorkflowIntegrityCheck.md`

---

**Workflow Type**: Validation-only (integrity matrix)  
**User Interactions**: 1 (submit; matrix auto-generated)  
**Framework**: CopilotCustomizer workflow validation

**Log Entry Format**:
```
[YYYY-MM-DD HH:MM:SS UTC] - Invoked by: {user/system} | Context: {brief description}
```

**Recent Invocations**:
_Manual logging - update this section when invoked_
- [2026-01-14] Added traceability system

### Usage Guidelines
- This asset should be invoked when: Prompt-specific workflows are needed
- Expected outcome: Execution of WorkflowIntegrityCheck Prompt functionality
- Related assets: See related prompts in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---

---

## Audit
Last invoked: [Manual log]
Change history: v1.0 (2026-01-14) - Added traceability
