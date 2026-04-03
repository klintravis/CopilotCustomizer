---
applyTo: '.github/**/*.{agent.md,instructions.md,prompt.md}'
description: 'Security guardrails and tool management safety protocols'
---

# Security.instructions.md

## Universal Security Guardrails (v1.2 - VS Code 1.112)

### Core Security Principles
**Data Protection**: Never fabricate external repository contents, protect sensitive information, avoid proprietary policy language unless user-supplied.
**Tool Safety**: Validate configurations, require approval workflows, monitor tool behavior, implement post-approval for external data.
**MCP Security**: Trust verification, secure connections, scoped permissions, organization-level access control.

### VS Code 1.109 Security Enhancements

**Post-Approval for External Data**:
- Tools that pull external data (e.g., `#fetch`, MCP tools with `openWorldHint`) now support post-approval
- Protects against prompt injection attacks by reviewing data before use
- User reviews fetched content before it enters chat context

**Source-Level Trust Management**:
- Trust MCP servers and extensions at the source level (all tools from one source)
- Manage pre-approval (skip tool confirmation) and post-approval (skip content review)
- Access via: Chat: Manage Tool Approval command

**MCP Workspace Configuration**:
- Install MCP servers to workspace config (`.vscode/mcp.json`)
- Share MCP servers with team via version control
- Organization-level MCP registries and access policies

### Agent Security Patterns
**Input Validation**: Sanitize all inputs before processing | **Output Sanitization**: Prevent information leakage
**Conflict Management**: Surface conflicts explicitly, request clarification, document assumptions, provide fallbacks

### Operational Safety
**Pre-execution**: Verify tool availability, validate permissions, check resource limits
**Runtime**: Monitor execution time, implement timeouts, log security events
**Post-execution**: Audit trails, compliance checks, performance review

## Tool & MCP Security

**Skill Reference**: Use the [security-hardening](../skills/security-hardening/SKILL.md) skill for complete methodology:
- Tool risk classification and approval workflows
- MCP server trust levels and configuration security
- Hook-based policy enforcement (PreToolUse validation)
- Terminal and MCP sandboxing configuration

### Key Principles
- **Least privilege**: Start minimal, add tools only when required
- **Source-level trust**: Manage MCP servers and extensions at source level
- **Post-approval**: Review external data before it enters context
- **Workspace config**: Share MCP settings via `.vscode/mcp.json`

### Sandboxing & Hooks
MCP server sandboxing (`sandboxEnabled: true`) and terminal sandboxing (`chat.tools.terminal.sandbox.*`) restrict file system and network access. Hook-based security (PreToolUse `permissionDecision`: allow/deny/ask) enforces policy at tool invocation time. See [security-hardening](../skills/security-hardening/SKILL.md) skill for configuration details.

### Security Checklists

#### Pre-Deployment
- [ ] Tool approval requirements configured appropriately
- [ ] MCP servers verified with trust relationships
- [ ] No hardcoded secrets or sensitive data exposed
- [ ] Cross-references validated and secure
- [ ] Handoff patterns tested for vulnerabilities

#### Runtime Monitoring
- [ ] Tool usage tracking active
- [ ] MCP connection health monitored
- [ ] Performance metrics within security parameters
- [ ] Error patterns and alerts monitored

#### Audit & Compliance
- [ ] Tool approval decisions logged with rationale
- [ ] MCP interactions tracked with full audit trail
- [ ] Configuration changes documented with approval
- [ ] Security incidents captured and analyzed

## Incident Response

### Response Workflow
**Detection** → **Containment** → **Assessment** → **Remediation** → **Recovery** → **Prevention**

**Detection Sources**: Automated monitoring, user reports, system alerts
**Response Actions**: Immediate containment, impact assessment, stakeholder communication
**Recovery Process**: Service restoration, configuration validation, root cause analysis

### Emergency Procedures
**Tool Compromise**: Immediate revoke, isolate, audit, remediate
**MCP Breach**: Disconnect, assess data exposure, rebuild trust chain
**Configuration Error**: Rollback, validate, test, redeploy

### VS Code 1.107-1.112 Security Enhancements

**Agent Hooks**: Improved lifecycle management with pre/post execution hooks for security validation

**MCP Trust Models**: Enhanced Model Context Protocol trust boundaries with explicit permission scopes and runtime validation

**Parallel Execution Safeguards**: Tool execution isolation in parallel agent workflows prevents resource conflicts and ensures atomic operations

**Tool Approval Evolution**: Granular per-tool approval with context-aware permission requests (vs blanket approval)

## Change History

| Version | Date | Changes |
|---------|------|---------|
| v1.2 | 2026-02-15 | Updated to VS Code 1.112, added v1.107-1.112 security enhancements |
| v1.0 | 2026-01-15 | Initial release |

*Complete security framework: [Framework.instructions.md](Framework.instructions.md)*