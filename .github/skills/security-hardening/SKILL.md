---
name: security-hardening
description: Security patterns for AI agent systems — tool approval workflows, MCP trust management, hook-based policy enforcement, and sandboxing. Use when designing secure agent configurations.
---

# Security Hardening

## Purpose
Portable security methodology for AI agent systems. Covers tool approval workflows, MCP server trust management, hook-based security enforcement, and sandboxing configuration.

## When to Use This Skill
- Designing agent tool permissions
- Configuring MCP server trust levels
- Implementing security hooks for policy enforcement
- Setting up sandboxed execution environments

## Tool Approval Framework

### Risk Classification
| Risk Level | Approval Type | Examples |
|-----------|--------------|---------|
| **Safe** (auto-approve) | None | search, problems, changes, usages |
| **Low** (single approval) | Per-use | edit, new, rename |
| **Medium** (session approval) | Per-session | terminal, fetch, runCommands |
| **High** (persistent) | Ongoing | runTasks, vscodeAPI, extensions |
| **Source-level** | Trust all from source | MCP server, extension provider |
| **Always Deny** | Blocked | Destructive operations |

### Principle of Least Privilege
1. Start with minimal tool set for core objectives
2. Add tools only when workflow steps require them
3. Justify every `terminal` tool inclusion
4. Conductors should NOT have implementation tools
5. Review and prune tool sets regularly

## MCP Server Trust Levels

| Trust Level | Description | Monitoring | Use Case |
|------------|-------------|-----------|----------|
| **Full** | Internal/org-developed | Standard | Production workflows |
| **Conditional** | Verified third-party | Enhanced | Trusted external tools |
| **Limited** | Public servers | Restricted | Public integrations |
| **No Trust** | Unverified/suspicious | Blocked | Security threats |

### MCP Configuration Security
- Validate executable integrity before server startup
- Use encrypted connections with authentication
- Scope permissions to minimum required
- Store workspace MCP configs in `.vscode/mcp.json` (version controlled)

### MCP Sandboxing
```json
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["server.js"],
      "sandboxEnabled": true
    }
  }
}
```
Sandboxed servers have restricted file system and network access.

## Hook-Based Security Enforcement

### PreToolUse Validation
Hooks can intercept tool execution for security enforcement:

**Output fields**:
- `permissionDecision`: `"allow"` / `"deny"` / `"ask"`
- `permissionDecisionReason`: Human-readable explanation
- `updatedInput`: Modify tool input before execution (sanitization)
- `additionalContext`: Inject context for the agent

**Priority resolution**: When multiple hooks fire, `deny` > `ask` > `allow`.

**Exit codes**: `0` = success, `2` = blocking error, other = non-blocking warning.

### Common Security Hook Patterns
```json
{
  "hooks": {
    "PreToolUse": [{
      "type": "command",
      "command": "./scripts/validate-tool.sh",
      "timeout": 15
    }],
    "SessionStart": [{
      "type": "command",
      "command": "./scripts/audit-start.sh",
      "timeout": 10
    }]
  }
}
```

## Terminal Sandboxing
```json
{
  "chat.tools.terminal.sandbox.enabled": true,
  "chat.tools.terminal.sandbox.linuxFileSystem": "readonly",
  "chat.tools.terminal.sandbox.macFileSystem": "readonly",
  "chat.tools.terminal.sandbox.network": "none"
}
```

## Security Checklist
- [ ] Tool approval requirements configured per risk level
- [ ] MCP servers verified with appropriate trust levels
- [ ] No hardcoded secrets in agent or instruction files
- [ ] Hook-based policy enforcement for sensitive operations
- [ ] Terminal sandboxing enabled for security-sensitive agents
- [ ] Cross-references validated (no injection vectors)
- [ ] Handoff patterns tested for data leakage
