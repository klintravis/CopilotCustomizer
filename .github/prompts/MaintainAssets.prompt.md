---
mode: agent
description: 'Unified asset maintenance - formatting, harmonization, and optimization'
---

<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: MaintainAssets Prompt (Prompt) v1.0
   STATUS: Prompt Ready — Awaiting execution
════════════════════════════════════════════════════════════════════════════ -->

# MaintainAssets Prompt (v1.0)

## Purpose
Unified maintenance workflow for Copilot customization assets. Combines formatting, cross-reference harmonization, and token optimization into a single command with mode selection.

## Usage
```
/MaintainAssets MODE: "{format|harmonize|optimize|all}" TARGET_PATH: "{path}"
```

### Variables
**MODE** [REQUIRED]: One of:
- `format` - Apply schema standards and fix formatting
- `harmonize` - Bind cross-references and add metadata
- `optimize` - Reduce token usage and improve clarity
- `all` - Run all maintenance operations

**TARGET_PATH** [OPTIONAL]: Path to specific asset or directory (defaults to `.github/`)

## Modes

### Format Mode
Validates and fixes:
- YAML front matter schema compliance
- Markdown structure consistency
- Required fields presence
- File naming conventions

### Harmonize Mode
Establishes and validates:
- Cross-references between assets
- Handoff chain integrity
- Metadata consistency
- Terminology standardization

### Optimize Mode
Improves:
- Token efficiency (reduces verbose sections)
- Content clarity and conciseness
- Removes redundant boilerplate
- Consolidates duplicate patterns

## Example

### Single Mode
```
/MaintainAssets MODE: "format" TARGET_PATH: ".github/agents/"
```

### Full Maintenance
```
/MaintainAssets MODE: "all"
```

## Output
```
Asset Maintenance Complete
==========================

Mode: {selected mode}
Target: {path}

Changes Applied:
- [file]: [change description]
...

Validation Status: PASSED/FAILED
Issues Found: {count}
```

## Related Instructions
- [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md)
