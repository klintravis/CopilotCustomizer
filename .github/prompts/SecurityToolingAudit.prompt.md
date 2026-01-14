---
agent: CopilotCustomizer
---

## SecurityToolingAudit (v1.0)

### Task Intent
Audit tool approvals, MCP server trust levels, and security posture without modifying the repository by default.

### Variable Block
```
SCOPE: "{SCOPE}" # tools|mcp|all (default: all)
SEVERITY: "{SEVERITY}" # report|recommend (default: report)
```

### Workflow Phases
**Phase 1: Analysis** (Auto) - Inventory tools, MCP servers, approvals
**Phase 2: Planning** (Auto) - Map findings to `CopilotSecurity.instructions.md`
**Phase 3: Implementation** (Auto) - None (report-only default)
**Phase 4: Verification** (Auto) - Cross-check against security guardrails
**Phase 5: Documentation** (Auto) - Produce actionable audit report

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: scope` | Limit to tools, MCP, or both |
| `refine: approach` | Switch to recommend mode with prioritized fixes |
| `refine: validation` | Add additional compliance checks |
| `refine: docs` | Adjust report detail and formatting |

### Handoff Chain
```
SecurityToolingAudit → RepoAnalyzer → VerificationAgent (security mode) → DocumentationGenerator → Complete
```

### Notes
- Aligns with `CopilotSecurity.instructions.md` guardrails and approval workflows
- Non-destructive by default; can recommend changes without applying them
- See docs: `docs/workflows/SecurityToolingAudit.md`

---

**Workflow Type**: Security posture assessment (report-only default)  
**User Interactions**: 1 (submit; report auto-generated)  
**Framework**: CopilotCustomizer security guardrails and verification
