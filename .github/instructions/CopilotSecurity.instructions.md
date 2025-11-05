---
applyTo: '.github/**/*'
description: 'Security guardrails and tool management safety protocols'
---

# CopilotSecurity.instructions.md

## Universal Security Guardrails (v1.0)

### Core Security Principles
**Data Protection**: Never fabricate external repository contents, protect sensitive information, avoid proprietary policy language unless user-supplied.
**Tool Safety**: Validate configurations, require approval workflows, monitor tool behavior.
**MCP Security**: Trust verification, secure connections, scoped permissions.

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
|------------|---------------|----------|--------------|
| **Auto-approve** | None | Search, fetch | Safe, read-only operations |
| **Single** | User confirmation | File read | Low-risk, one-time operations |
| **Session** | Session scope | Terminal commands | Medium-risk, current session |
| **Persistent** | Permanent | System access | High-trust, ongoing operations |
| **Always Deny** | Blocked | Destructive ops | Never automated |

### Risk Assessment Matrix
**Factors**: File system access (R/W/X), network operations (internal/external), system commands, data sensitivity, impact scope
**Default Posture**: Least privilege, explicit approval for elevation, regular audits, automated monitoring

## MCP Security Implementation

### Server Configuration Security
**Validation**: Executable integrity, environment variables, SSL certificates
**Connection**: Encrypted communications, authentication protocols, secure transport
**Runtime**: Permission boundaries, resource limits, audit logging

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

*Complete security framework: [CopilotFramework.instructions.md](../instructions/CopilotFramework.instructions.md)*  
*Audit patterns: [CopilotAudit.instructions.md](CopilotAudit.instructions.md)*