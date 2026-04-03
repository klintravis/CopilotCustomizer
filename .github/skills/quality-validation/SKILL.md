---
name: quality-validation
description: Asset validation and harmonization methodology for Copilot customization files. Use when verifying schema compliance, cross-reference integrity, and cross-file consistency.
---

# Quality Validation

## Purpose
Portable methodology for validating and harmonizing AI customization assets (agents, skills, instructions, prompts). Ensures schema compliance, cross-reference integrity, terminology consistency, and metadata binding.

## When to Use This Skill
- After generating or modifying customization assets
- During pre-release quality checks
- When auditing existing assets for compliance
- When harmonizing cross-references between related files

## Validation Operations

### Schema Validation
Verify YAML frontmatter compliance by asset type:

**Agent files** (`.agent.md`):
- Required: `description`
- Optional: `tools`, `model` (string or array), `handoffs`, `mcp-servers`, `target`, `name`, `argument-hint`, `user-invocable`, `disable-model-invocation`, `agents`, `hooks`
- Deprecated: `infer` (use `user-invocable` + `disable-model-invocation`), `user-invokable` (use `user-invocable`)

**Instruction files** (`.instructions.md`):
- Required: `applyTo`
- Optional: `description`, `name`

**Prompt files** (`.prompt.md`):
- Optional: `description`, `argument-hint`, `agent`, `model`, `tools`, `name`

**Skill files** (`SKILL.md`):
- Required: `name` (lowercase+hyphens, max 64 chars, must match directory), `description` (max 1024 chars)
- Optional: `user-invocable`, `disable-model-invocation`, `argument-hint`

**Rules**:
- No unsupported fields in YAML (e.g., `schemaVersion`, `depthModes`)
- Boolean fields must be boolean (not strings)
- `model` can be string or array of strings (fallback)
- `tools` must be array of valid tool names

### Cross-Reference Validation
Verify all references between assets resolve:

| Reference Type | Pattern | Validation |
|---------------|---------|------------|
| Agent → Instructions | Relative path in content | File exists at path |
| Prompt → Instructions | "Paired instructions" section | File exists |
| Agent → Agent (handoff) | `handoffs[].agent` field | `.agent.md` file exists |
| Conductor → Subagents | `agents` array | Each resolves to `.agent.md` |
| Skill references | `@skill-name` or path | `skills/{name}/SKILL.md` exists |

### Harmonization
Bind related assets with consistent metadata and cross-references:

**Binding priority**:
1. Agent ↔ Instructions (strongest)
2. Instructions ↔ Prompt (paired execution)
3. Agent ↔ Prompt (contextual)
4. Universal schema consistency

**Terminology standardization**:
| Use | Instead Of |
|-----|-----------|
| agent file | custom agent |
| instruction file | custom instruction |
| prompt file | prompt template |
| handoff | transition, delegation |
| tool approval | tool permission |

**Metadata template** (added to harmonized files):
```markdown
## Processing Metadata
- **Standards Version**: VS Code Copilot v2026.03 (Agent Files v1.112)
- **Harmonization**: {date} | Cross-references established
```

### Orchestrated System Verification
Additional checks for conductor/subagent systems:

**Conductor**:
- [ ] `agent` tool in tools array
- [ ] `handoffs` array defined with all subagent transitions
- [ ] `agents` field lists allowed subagents (if present)
- [ ] State tracking mechanism (plans/PLAN.md)
- [ ] Quality gates defined (minimum 3)
- [ ] No implementation tools (edit, terminal) for source code

**Subagents**:
- [ ] `user-invocable: false` for orchestration-only agents
- [ ] Input/output contract defined
- [ ] Model tier matches role complexity
- [ ] Scope boundaries defined
- [ ] If `agent` tool included, `agents` field constrains allowed targets
- [ ] Nesting depth does not exceed 2 levels

**System integrity**:
- [ ] All conductor references resolve to existing subagent files
- [ ] No circular dependencies
- [ ] No circular dependencies in nested invocation chains
- [ ] Plan files exist with correct structure
- [ ] Parallel agents have disjoint write sets

## Maintenance Operations

### Optimize
Improve token efficiency while preserving functionality:
- Remove duplication and drift
- Normalize formatting (headings, tables, code fences)
- Improve clarity without changing behavior
- Constraints: <15% file size change, minimal diffs

### Validate (Read-Only)
Verify compliance without modifications:
- Parse and validate YAML
- Check all references resolve
- Verify paired relationships
- Report issues only — no file changes

## Evaluation Rubrics

Move beyond pass/fail validation to scored evaluation with trajectory and outcome metrics.

### Trajectory Metrics (Was the process correct?)
| Metric | Measurement | Target |
|--------|------------|--------|
| **Schema compliance** | % of assets with valid YAML | 100% |
| **Cross-reference accuracy** | % of references that resolve | 100% |
| **Tool appropriateness** | % of agents with correctly scoped tools | >95% |
| **Context efficiency** | Avg context tokens per agent invocation | <50% of window |
| **Phase completion rate** | % of orchestration phases that succeed without retry | >85% |

### Outcome Metrics (Did the result succeed?)
| Metric | Measurement | Target |
|--------|------------|--------|
| **Asset quality score** | Weighted sum of structure + clarity + guardrails + consistency | >80/100 |
| **User approval rate** | % of generated plans approved without revision | >70% |
| **Post-generation issues** | # of issues found by Verifier per generation run | <3 |
| **Standards integration** | Are matched standards reflected naturally (not copied)? | Yes/No |
| **Orchestration integrity** | Do all handoffs, gates, and plan files work end-to-end? | Yes/No |

### Per-Asset Scoring Rubric

**Agent files** (out of 100):
- Structure (25): Role, objectives, workflow present and well-organized
- Clarity (25): Unambiguous role boundaries, explicit scope
- Tools (20): Appropriate set, no bloat, security-conscious
- Integration (15): Cross-references valid, handoffs defined
- Efficiency (15): Concise, no duplication, within size targets

**Skill files** (out of 100):
- Purpose (20): Clear when-to-use guidance
- Instructions (30): Step-by-step, actionable, with examples
- Portability (20): Works across platforms, no VS Code dependencies
- Resources (15): Examples, templates, scripts as needed
- Specificity (15): Focused on one capability, not generic

**Instruction files** (out of 100):
- Scope (25): applyTo pattern correct, description clear
- Content (30): Comprehensive, actionable standards
- Guardrails (20): Missing info handling, conflict resolution
- Integration (15): Pairs with prompts/agents correctly
- Efficiency (10): Concise, no duplication with skills

### When to Apply Rubrics
- **Generation**: Score each generated asset before returning to user
- **Audit**: Score existing assets during `/Review` or `/Evolve` workflows
- **Regression**: Compare scores before/after toolkit changes to prevent quality degradation

## Quality Checklist
- [ ] YAML parses successfully with only supported fields
- [ ] Required fields present for asset type
- [ ] All file references resolve
- [ ] Paired relationships validated
- [ ] No stale references to deprecated assets
- [ ] Original functionality preserved
- [ ] Terminology consistent across related files
- [ ] Metadata binding complete
