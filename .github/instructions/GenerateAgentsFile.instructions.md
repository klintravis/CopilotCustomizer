---
applyTo: 'AGENTS.md'
description: 'Standardized framework for creating AGENTS.md files that guide AI coding agents with clear, actionable project instructions and development workflows'
---

<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : GenerateAgentsFile Instructions
Asset Type    : Instructions
Asset Version : v1.0
Invoked At    : {timestamp}
Invocation ID : instruction-generateagentsfile-{timestamp-hash}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Instructions Active | Applied to matching files
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->

# AGENTS.md Workspace File Guide (v1.0)

**Paired Prompt**: [NewAgentsFile.prompt.md](../prompts/NewAgentsFile.prompt.md)

### Purpose
Standardized approach for creating workspace `AGENTS.md` files that guide AI coding agents with clear, actionable project instructions.

**Distinction**: Creates workspace `AGENTS.md` for AI coding agent guidance, NOT VS Code `.agent.md` custom agent files.

### Conflict Resolution
Explicit chat > nearest AGENTS.md > global custom instructions

### Recommended Sections
| Section | Required | Purpose |
|---------|----------|---------|
| Project Overview | Yes | Summary, tech, goals |
| Quick Start | Yes | Install, build, test, lint |
| Code Style | Yes | Lint/format rules |
| Testing | Yes | Run tests, CI |
| PR Instructions | Yes | Title, checks, CI |
| Security | Conditional | Secrets, permissions |
| Monorepo | Conditional | Package commands |

### Template
```markdown
# AGENTS.md — {PROJECT_NAME}
{PRIMARY_TASKS}

## Quick Start

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `instruction/generateagentsfile` |
| **Version** | `v1.0` |
| **Created** | `2026-01-14` |
| **Last Modified** | `2026-01-14` |
| **Maintained By** | `CopilotCustomizer` |
| **Status** | `Active` |
| **Category** | `Standards & Patterns` |

---

## Traceability & Audit

### Invocation Log
This section tracks when and how this asset is used.

**Log Entry Format**:
```
[YYYY-MM-DD HH:MM:SS UTC] - Invoked by: {user/system} | Context: {brief description}
```

**Recent Invocations**:
_Manual logging - update this section when invoked_
- [2026-01-14] Added traceability system

### Usage Guidelines
- This asset should be invoked when: Instructions-specific workflows are needed
- Expected outcome: Execution of GenerateAgentsFile Instructions functionality
- Related assets: See related instructionss in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---
*Traceability System v1.0 - Asset tracking enabled*
