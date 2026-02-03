---
applyTo: '.github/**/*'
description: 'Security guardrails and tool management safety protocols'
---

# CopilotSecurity.instructions.md

## Universal Security Guardrails (v1.1 - VS Code 1.106)

### Core Security Principles
**Data Protection**: Never fabricate external repository contents, protect sensitive information, avoid proprietary policy language unless user-supplied.
**Tool Safety**: Validate configurations, require approval workflows, monitor tool behavior, implement post-approval for external data.
**MCP Security**: Trust verification, secure connections, scoped permissions, organization-level access control.

### VS Code 1.106 Security Enhancements

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

## Tool Management Security

### MCP Server Trust Levels
| Level | Description | Monitoring | Use Case |
|-------|-------------|------------|----------|
| **Full** | Internal/org-developed | Standard | Production workflows |
| **Conditional** | Verified third-party | Enhanced | Trusted external tools |
| **Limited** | Public servers | Restricted | Public integrations |
| **No Trust** | Unverified/suspicious | Blocked | Security threats |

### Tool Approval Workflows
| Risk Level | Approval Type | Examples | Requirements |
|------------|---------------|----------|--------------||
| **Auto-approve** | None | Search, fetch (internal) | Safe, read-only operations |
| **Pre-approval** | User confirmation | File read, terminal | Review tool invocation before execution |
| **Post-approval** | Content review | External fetch, MCP openWorldHint | Review fetched data before use (VS Code 1.106+) |
| **Session** | Session scope | Terminal commands | Medium-risk, current session |
| **Persistent** | Permanent | System access | High-trust, ongoing operations |
| **Source-level** | Trust all from source | MCP server, extension | Trust all tools from a provider (VS Code 1.106+) |
| **Always Deny** | Blocked | Destructive ops | Never automated |

### Risk Assessment Matrix
**Factors**: File system access (R/W/X), network operations (internal/external), system commands, data sensitivity, impact scope
**Default Posture**: Least privilege, explicit approval for elevation, regular audits, automated monitoring

## MCP Security Implementation

### Server Configuration Security
**Validation**: Executable integrity, environment variables, SSL certificates
**Connection**: Encrypted communications, authentication protocols, secure transport (CIMD/DCR support)
**Runtime**: Permission boundaries, resource limits, audit logging
**Organization Control**: MCP registry endpoints, access restrictions, policy enforcement (VS Code 1.106+)

**Workspace MCP Configuration** (`.vscode/mcp.json`):
- Team-shared MCP servers under version control
- Project-specific tool configurations
- Isolated from user-level global MCP settings

**Organization Policies**:
- `chat.mcp.gallery.serviceUrl`: Custom MCP registry endpoint
- `chat.mcp.access`: Restrict to organization-approved servers only
- Enterprise control over MCP server availability

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

*Complete security framework: [CopilotFramework.instructions.md](CopilotFramework.instructions.md)*
*Audit patterns: [CopilotAudit.instructions.md](CopilotAudit.instructions.md)*