---
agent: CopilotCustomizer
---

<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: SecurityToolingAudit Prompt (Prompt) v2.0
   STATUS: Prompt Ready — Awaiting execution
════════════════════════════════════════════════════════════════════════════ -->

# SecurityToolingAudit Prompt (v2.0)

## Purpose
Audit tool approvals, MCP server trust levels, and security posture without modifying the repository.

## Variables
```
SCOPE: "{tools|mcp|all}" (default: all)
SEVERITY: "{report|recommend}" (default: report)
```

## Workflow
1. **Analysis**: Inventory tools, MCP servers, approvals
2. **Evaluation**: Assess security posture against best practices
3. **Documentation**: Produce actionable audit report

## Security Patterns

### Tool Approval Levels
- **Safe (auto-approve)**: `search`, `search/codebase`, `fetch`
- **Low-risk (single)**: `edit`, `new`
- **Medium-risk (session)**: `terminal`, `runCommands`
- **High-risk (persistent)**: `runTasks`, `changes`

### MCP Server Trust
- Verify server sources
- Review permission grants
- Check for sensitive data exposure

## Refinement Commands
| Command | Action |
|---------|--------|
| `refine: scope` | Limit to tools, MCP, or both |
| `refine: approach` | Switch to recommend mode |

## Output
Generates security audit report with:
- Tool inventory and risk levels
- MCP server trust assessment
- Recommendations for improvement
