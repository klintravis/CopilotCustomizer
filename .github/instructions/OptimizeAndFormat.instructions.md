---
applyTo: '.github/**/*.{instructions.md,prompt.md,agent.md}'
description: 'Optimize and format Copilot customization assets with schema compliance and 100% reference preservation'
---

# OptimizeAndFormat.instructions.md

## Objective
Optimize and format Copilot customization assets (`*.instructions.md`, `*.prompt.md`, `*.agent.md`) while preserving behavior, links, and cross-references.

This instruction intentionally merges the prior responsibilities of formatting and asset optimization into one lightweight, predictable workflow.

## Constraints
- Preserve behavior and intent; avoid functional rewrites
- Preserve all links and hard references (internal and external)
- Keep YAML front matter limited to officially supported fields
- Prefer minimal diffs; do not reformat unrelated content
- Do not introduce new custom YAML metadata; put guidance in Markdown body

## Workflow
1. **Inventory**: Identify candidate files within scope
2. **Schema Check**: Validate YAML front matter fields by asset type
3. **Optimize** (if requested): Reduce duplication, improve clarity, remove drift while preserving meaning
4. **Format** (if requested): Normalize headings, tables, code fences, and bullet consistency
5. **Cross-Reference Validation**: Verify links, paired relationships, and referenced file paths
6. **Report**: Summarize what changed, why, and what remains intentionally unchanged

## YAML Front Matter Rules (v1.109)
Only use officially supported fields:

- `*.agent.md`: `description` (required); optional `tools`, `model` (string or array), `handoffs` (with optional model parameter), `mcp-servers`, `target`, `name`, `argument-hint`, `user-invokable`, `disable-model-invocation`, `agents` (v1.109 adds orchestration controls and parallel execution)
- `*.instructions.md`: `applyTo` (required); optional `description`
- `*.prompt.md`: optional `agent`, `tools`, `model`

Do not add unsupported fields (e.g., schemaVersion, depthModes, refinementCommands) to YAML front matter.

## Verification Checklist
- [ ] YAML parses and contains only supported fields
- [ ] Required fields present for each asset type
- [ ] Cross-references resolve (links + referenced filenames)
- [ ] No stale references to deprecated/legacy assets in active inventories
- [ ] Summary report includes scope, key changes, and any follow-ups

## Related
- Repo analysis patterns: `RepoReview.instructions.md`
- Security guardrails: `CopilotSecurity.instructions.md`
