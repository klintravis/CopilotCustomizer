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
SecurityToolingAudit → RepoAnalyzer → VerificationAgent (security mode) → DocumentationGenerator → Complete
```

### Workflow Chain
```
┌──────────────────────────────────────┐
│ User Input                           │
│ (SCOPE, SEVERITY)                    │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ RepoAnalyzer                         │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ VerificationAgent (Security Mode)    │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ DocumentationGenerator               │
└───────────┬──────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ Workflow Complete                    │
└──────────────────────────────────────┘
```

## Workflow Phases
1) Analysis — inventory tools, MCP servers, and approvals
2) Planning — map findings to security guardrails
3) Implementation — none (report-only default)
4) Verification — cross-check against security patterns
5) Documentation — produce audit report and recommendations

## Acceptance Criteria
- Clear list of tools and MCP trust levels
- Risks and recommendations (if SEVERITY=recommend)
- No repository changes applied

## How to Run
1. Use the `/SecurityToolingAudit` slash command with inline variables (see HOW-TO cheat sheet)
2. Set SCOPE and SEVERITY
3. Submit and review the security report

## References
- Security: `../../.github/instructions/CopilotSecurity.instructions.md`
- Framework: `../../.github/instructions/CopilotFramework.instructions.md`
