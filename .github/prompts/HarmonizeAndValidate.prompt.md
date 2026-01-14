---
agent: CopilotCustomizer
---

<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : HarmonizeAndValidate Prompt
Asset Type    : Prompt
Asset Version : v1.0
Invoked At    : {timestamp}
Invocation ID : prompt-harmonizeandvalidate-{timestamp-hash}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Prompt Ready | Awaiting variable substitution
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->

## HarmonizeAndValidate (v1.0)

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `prompt/harmonizeandvalidate` |
| **Version** | `v1.0` |
| **Created** | `2026-01-14` |
| **Last Modified** | `2026-01-14` |
| **Maintained By** | `CopilotCustomizer` |
| **Status** | `Active` |
| **Category** | `Templates & Generation` |

### Task Intent
Harmonize 2–3 related assets and validate cross-references, handoff chains, and schema consistency.

### Variable Block
```
ASSETS: ["{ASSET_PATH_1}", "{ASSET_PATH_2}", "{ASSET_PATH_3}"]
MODE: "{MODE}" # conservative|standard (default: standard)
```

### Workflow Phases
**Phase 1: Analysis** (Auto) - Inspect targets and relationships
**Phase 2: Planning** (Auto) - Propose minimal harmonization edits
**Phase 3: Implementation** (Auto) - Apply harmonization while preserving content
**Phase 4: Verification** (Auto) - Validate links, handoffs, and schema
**Phase 5: Documentation** (Auto) - Summarize changes and link map (before/after)

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: scope` | Adjust ASSETS list |
| `refine: approach` | Switch between conservative and standard modes |
| `refine: validation` | Tighten link/handoff checks |
| `refine: docs` | Control level of link-map details |

### Handoff Chain
```
HarmonizeAndValidate → RepoAnalyzer → HarmonizationAgent → WorkflowValidator → DocumentationGenerator → Complete
```

### Notes
- Builds on existing harmonization and workflow validation capabilities
- Aims for minimal edits with maximum linkage coherence
- See docs: `docs/workflows/HarmonizeAndValidate.md`

---

**Workflow Type**: Cross-reference harmonization + integrity validation  
**User Interactions**: 1 (submit; auto-harmonize/validate)  
**Framework**: CopilotCustomizer harmonization and validation

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
- This asset should be invoked when: Prompt-specific workflows are needed
- Expected outcome: Execution of HarmonizeAndValidate Prompt functionality
- Related assets: See related prompts in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---
*Traceability System v1.0 - Asset tracking enabled*
