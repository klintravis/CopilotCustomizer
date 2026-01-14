# SecurityToolingAudit Workflow

Audit tool approvals, MCP server trust, and security posture without repository modifications by default.

## Overview

Provides a structured, actionable security report aligned to the repository's guardrails and approval workflows.

## Variables

```
SCOPE: "all"         # tools|mcp|all
SEVERITY: "report"   # report|recommend
```

## Handoff Chain

```
SecurityToolingAudit → [repository-analysis skill] → VerificationAgent (security mode) → Complete
```

### Workflow Chain

```
┌──────────────────────────────────────┐
│ User Input                           │
│ (SCOPE, SEVERITY)                    │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Analysis                             │
│ (uses repository-analysis skill)     │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ VerificationAgent (Security Mode)    │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Workflow Complete                    │
└──────────────────────────────────────┘
```

## Workflow Phases

1. **Analysis** — inventory tools, MCP servers, and approvals using repository-analysis skill
2. **Verification** — cross-check against security patterns via VerificationAgent
3. **Summary** — produce audit report and recommendations

## Acceptance Criteria

- Clear list of tools and MCP trust levels
- Risks and recommendations (if SEVERITY=recommend)
- No repository changes applied

## How to Run

1. Use the `/SecurityToolingAudit` slash command with inline variables
2. Set SCOPE and SEVERITY
3. Submit and review the security report

## References

- Skills: `.github/skills/repository-analysis/SKILL.md`
- Formatting: `.github/instructions/FormatAssets.instructions.md`
