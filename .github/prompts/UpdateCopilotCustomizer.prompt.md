---
agent: CopilotCustomizer
---

<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : UpdateCopilotCustomizer Prompt
Asset Type    : Prompt
Asset Version : v1.0
Invoked At    : {timestamp}
Invocation ID : prompt-updatecopilotcustomizer-{timestamp-hash}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Prompt Ready | Awaiting variable substitution
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->

## Update CopilotCustomizer Entry Point (v2.0)

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `prompt/updatecopilotcustomizer` |
| **Version** | `v1.0` |
| **Created** | `2026-01-14` |
| **Last Modified** | `2026-01-14` |
| **Maintained By** | `CopilotCustomizer` |
| **Status** | `Active` |
| **Category** | `Templates & Generation` |

### Task Intent
Initiate automated change workflow using skills and agents: analysis → planning → implementation → verification → documentation.

### Variable Block
```
CHANGE_REQUEST: "{CHANGE_REQUEST}"
REASON: "{REASON}"
ACCEPTANCE_CRITERIA: "{ACCEPTANCE_CRITERIA}"
SCOPE (or "auto-detect"): "{SCOPE}"
```

### Workflow Phases
**Phase 1: Analysis** - Use **repository-analysis** skill for repository scan and dependency analysis
**Phase 2: Planning** - Use **implementation-planning** skill to create implementation plan → **USER REVIEW** → Reply `confirm` to proceed
**Phase 3: Implementation** - Handoff to **@ChangeExecutor** agent to execute changes atomically
**Phase 4: Verification** - Handoff to **@VerificationAgent** to validate against acceptance criteria
**Phase 5: Documentation** - Use **technical-documentation** skill to generate change summary

### Skills Used
- **repository-analysis**: Deep repository understanding and impact assessment
- **implementation-planning**: Strategic planning with risk mitigation
- **technical-documentation**: Clear change documentation and summaries

### Agent Handoffs
```mermaid
UpdateCopilotCustomizer 
  → repository-analysis skill
  → implementation-planning skill
  → [USER GATE]
  → @ChangeExecutor agent
  → @VerificationAgent agent  
  → technical-documentation skill
  → Complete
```

### User Interaction
- **Single Gate**: Review implementation plan after Phase 2
- **Simple Commands**: `confirm` to proceed, `revise` to adjust plan

---

**Version**: v2.0 - Skills-First with Agent Handoffs  
**User Interactions**: 2 (submit + approve plan)  
**Skills**: repository-analysis, implementation-planning, technical-documentation  
**Agents**: ChangeExecutor, VerificationAgent  
**Framework**: CopilotCustomizer ecosystem integration

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
- Expected outcome: Execution of UpdateCopilotCustomizer Prompt functionality
- Related assets: See related prompts in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---
*Traceability System v1.0 - Asset tracking enabled*
