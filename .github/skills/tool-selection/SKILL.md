---
name: tool-selection
description: Tool-to-task mapping framework for AI agent design. Use when deciding which tools an agent needs based on its role, archetype, and workflow requirements.
---

# Tool Selection

## Purpose
Decision framework for selecting the right tools for AI agents based on their role and workflow. Eliminates guesswork and prevents both tool bloat (too many) and tool starvation (too few).

## When to Use This Skill
- Designing a new agent's tool set
- Reviewing an existing agent for tool optimization
- Generating agent files with appropriate tool access
- Assessing security implications of tool choices

## Tool Catalog (VS Code Copilot)

### Core Tools
| Tool | Purpose | Risk Level |
|------|---------|-----------|
| `search` | Search within files | Safe |
| `search/codebase` | Semantic codebase search | Safe |
| `edit` | Modify existing files | Low |
| `new` | Create new files | Low |
| `terminal` | Run shell commands | Medium (requires approval) |
| `problems` | Access VS Code problems panel | Safe |
| `changes` | View git changes/diffs | Safe |

### Specialized Tools
| Tool | Purpose | Risk Level |
|------|---------|-----------|
| `rename` | LSP-powered symbol renaming | Low |
| `usages` / `search/usages` | Find all references via LSP | Safe |
| `getDiagnostics` | Access editor/workspace diagnostics | Safe |
| `testFailure` | Access test failure information | Safe |
| `todos` | Manage task lists | Safe |
| `fetch` / `web/fetch` | Fetch web content | Medium |
| `openSimpleBrowser` | Open URLs in VS Code | Low |
| `runCommands` | Execute VS Code commands | Medium |
| `runTasks` | Run VS Code tasks | Medium |
| `vscodeAPI` | Access VS Code extension API | Medium |
| `extensions` | Manage VS Code extensions | Medium |
| `githubRepo` | Search GitHub repositories | Safe |
| `read/terminalLastCommand` | Read last terminal output | Safe |

### Orchestration Tools
| Tool | Purpose | Risk Level |
|------|---------|-----------|
| `agent` | Invoke subagents (enables parallel execution) | Safe |
| `vscode/memory` | Persistent memory across sessions | Safe |

### Browser Tools (Experimental)
| Tool | Purpose | Risk Level |
|------|---------|-----------|
| `openBrowserPage` | Open browser page | Low |
| `screenshotPage` | Screenshot browser page | Safe |
| `navigatePage` | Navigate browser to URL | Low |
| `clickElement` | Click browser element | Low |
| `hoverElement` | Hover over element | Safe |
| `dragElement` | Drag element | Low |
| `typeInPage` | Type in browser page | Low |
| `readPage` | Read page content | Safe |
| `handleDialog` | Handle browser dialog | Low |
| `runPlaywrightCode` | Execute Playwright code | Medium |

## Agent Archetype → Tool Mapping

| Archetype | Required Tools | Optional Tools |
|-----------|---------------|----------------|
| **Code Generator** | `edit`, `new`, `search` | `terminal`, `problems` |
| **Analyzer/Reviewer** | `search`, `problems`, `changes` | `search/codebase` |
| **Tester** | `new`, `edit`, `terminal` | `testFailure`, `problems` |
| **E2E Tester** | `new`, `edit`, `terminal` | `openBrowserPage`, `screenshotPage`, `clickElement` |
| **Documentation** | `new`, `edit`, `search` | `fetch`, `openSimpleBrowser` |
| **Planner/Architect** | `search`, `search/codebase` | `todos`, `usages` |
| **Debugger** | `search`, `problems`, `terminal` | `testFailure`, `changes` |
| **Security Reviewer** | `search`, `search/codebase`, `problems` | `changes` |
| **Refactoring** | `edit`, `search`, `rename` | `usages`, `getDiagnostics` |
| **Conductor/Orchestrator** | `search`, `search/codebase`, `agent` | `problems` |
| **Explorer/Researcher** | `search`, `search/codebase` | (read-only, fast model) |

## Tool Approval Patterns

| Risk Level | Approval Type | Examples |
|-----------|--------------|---------|
| **Safe** (auto-approve) | None | `search`, `search/codebase`, `problems` |
| **Low** (single approval) | Per-use | `edit`, `new`, `rename` |
| **Medium** (session approval) | Per-session | `terminal`, `fetch`, `runCommands` |
| **High** (persistent) | Ongoing | `runTasks`, `vscodeAPI`, `extensions` |

## Selection Principles

1. **Minimal set**: Include only tools needed for core objectives
2. **Task-aligned**: Match tools to the agent's actual workflow steps
3. **Security-conscious**: Avoid `terminal` unless the agent genuinely needs to run commands
4. **Progressive**: Start minimal, add tools based on actual needs — not hypothetical ones
5. **No speculation**: Don't include tools "just in case"

## Decision Framework

```
For each tool candidate:
  1. Is it required by a core workflow step? → Include
  2. Is it needed for an optional/secondary step? → Include as optional
  3. Is it "nice to have" but no workflow step uses it? → Exclude
  4. Does it introduce security risk without clear benefit? → Exclude
```

## Selection Quality Metrics
- **Appropriateness**: No unnecessary tools included (zero bloat)
- **Completeness**: No workflow steps blocked by missing tools
- **Security alignment**: Risk levels match approval patterns
- **Archetype match**: Tool set matches the agent's role archetype

## Conductor & Orchestration Rules
- **Conductors**: Must include `agent` tool. Should NOT include `edit`, `new`, `terminal` (conductors delegate, they don't implement)
- **Subagents with delegation**: May include `agent` tool when their workflow requires invoking other subagents. Must use `agents` field to constrain targets.
- **Leaf subagents**: Should NOT include `agent` tool (they do the work, not delegate)
- **Nesting limit**: Max 2 levels deep (conductor → subagent → sub-subagent)
