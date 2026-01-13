---
agent: CopilotCustomizer
---

## HarmonizeAndValidate (v1.0)

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
HarmonizeAndValidate → repository-analysis skill → HarmonizationAgent → VerificationAgent → technical-documentation skill → Complete
```

### Notes
- Builds on existing harmonization and workflow validation capabilities
- Aims for minimal edits with maximum linkage coherence
- See docs: `docs/workflows/HarmonizeAndValidate.md`

---

**Workflow Type**: Cross-reference harmonization + integrity validation  
**User Interactions**: 1 (submit; auto-harmonize/validate)  
**Framework**: CopilotCustomizer harmonization and validation
