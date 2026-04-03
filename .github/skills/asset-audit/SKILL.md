---
name: asset-audit
description: Audit methodology for AI customization assets — inventory scanning, workflow analysis, gap identification, and improvement prioritization. Use when reviewing existing Copilot/AI customization quality.
---

# Asset Audit

## Purpose
Portable methodology for auditing AI customization assets in any repository. Covers asset inventory, workflow analysis, handoff opportunities, gap identification, and prioritized improvement recommendations.

## When to Use This Skill
- Reviewing existing Copilot customization quality
- Identifying gaps in AI asset coverage
- Prioritizing improvement efforts
- Pre-release validation of customization assets

## Audit Phases

### Phase 1: Asset Discovery
Scan repository for customization assets:

| Asset Type | Locations | Key Files |
|-----------|-----------|-----------|
| Agents | `.github/agents/`, `.claude/agents/` | `*.agent.md` |
| Skills | `.github/skills/*/` | `SKILL.md` |
| Instructions | `.github/instructions/` | `*.instructions.md` |
| Prompts | `.github/prompts/` | `*.prompt.md` |
| Workspace guidance | Root | `AGENTS.md`, `CLAUDE.md`, `copilot-instructions.md` |
| Standards | `.github/standards/` | `*.md` with YAML frontmatter |
| Hooks | `.github/hooks/`, agent frontmatter | `*.json`, `hooks:` key |
| Plugins | `.github/plugins/` | `plugin.json` |

### Phase 2: Quality Assessment

**Per-asset checks**:
- Schema compliance (YAML frontmatter valid for type)
- Content completeness (required sections present)
- Cross-reference integrity (all links resolve)
- Token efficiency (concise, no bloat)

**Cross-asset checks**:
- Terminology consistent across files
- No duplicated guidance between assets
- Paired relationships intact (instruction ↔ prompt)
- Version alignment across all assets

### Phase 3: Workflow Analysis

**Identify workflow patterns**:
- Linear (A → B → C sequential)
- Branching (parallel agent execution)
- Conditional (dynamic routing)
- Iterative (refinement loops)

**Assess completeness**:
- Entry points clearly defined
- Handoff chains documented and functional
- Context transfer protocol established
- Quality gates strategically placed
- Error handling and fallback paths

### Phase 4: Gap Analysis

**Coverage gaps**: Missing agents, instructions, or skills for detected tech stack
**Quality gaps**: Assets that exist but are incomplete or outdated
**Workflow gaps**: Missing handoff chains, missing automation opportunities
**Standards gaps**: Tech stack standards not reflected in generated assets

### Phase 5: Prioritization

**Priority framework**:
| Priority | Criteria |
|----------|----------|
| **High** | Frequent use + high manual effort + clear automation path |
| **Medium** | Moderate frequency + some complexity + requires judgment |
| **Low** | Rare use + high complexity + significant custom logic |

## Audit Dimensions

| Dimension | Criteria |
|-----------|----------|
| **Structure** | Schema compliance, ordered sections, handoffs |
| **Clarity** | Unambiguous role, explicit workflows, measurable outcomes |
| **Guardrails** | Missing info handling, refusal rules, compliance triggers |
| **Consistency** | Shared terminology, version alignment |
| **Extensibility** | Handoff commands, modular sections |
| **Token Efficiency** | Concise phrasing, minimal boilerplate |
| **Tool Integration** | MCP servers, tool sets, approval workflows |
| **Security** | Tool trust management, safe defaults |

## Output Format

```markdown
## Audit Report

### Asset Inventory
| Type | Count | Status |
|------|-------|--------|
| Agents | {n} | {Complete/Gaps} |
| Skills | {n} | {Complete/Gaps} |
| Instructions | {n} | {Complete/Gaps} |
| Prompts | {n} | {Complete/Gaps} |

### Findings (Prioritized)
| # | Finding | Severity | Effort | Recommendation |
|---|---------|----------|--------|----------------|
| 1 | {issue} | High | Low | {action} |

### Workflow Analysis
| Workflow | Entry Point | Agents | Status |
|----------|-------------|--------|--------|
| {name} | {prompt} | {count} | {status} |

### Recommendations
1. **High Priority**: {action items}
2. **Medium Priority**: {action items}
3. **Low Priority**: {action items}
```

## Audit Quality Metrics
- **Coverage**: % of asset types inventoried
- **Finding accuracy**: Findings confirmed as real issues (not false positives)
- **Prioritization quality**: High-priority items are genuinely high-impact
- **Actionability**: Each finding has a concrete, implementable recommendation

## Self-Audit (Meta-Framework Compliance)
When auditing a toolkit that generates AI assets, verify:
- [ ] Toolkit follows its own standards (agents use their own authoring patterns)
- [ ] All assets have cross-reference sections
- [ ] Conductor agents list subagents in `agents` YAML field
- [ ] Terminology standardized across all assets
- [ ] Token efficiency not degraded by recent changes
