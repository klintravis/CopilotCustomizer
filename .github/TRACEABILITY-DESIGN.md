# Asset Traceability System Design (v1.0)

## Purpose
Standardized traceability and invocation tracking system for all Copilot Customizer assets (agents, prompts, instructions, skills) to provide visibility into when and how assets are being used.

## Core Requirements
1. **Invocation Alerts**: Visual notification when an asset is invoked
2. **Metadata Tracking**: Standard metadata for all assets
3. **Audit Trail**: Track usage patterns and context
4. **Generator Integration**: Automatic inclusion in all asset generators
5. **Consistency**: Uniform format across all asset types

## Traceability Components

### 1. Invocation Alert Banner
Placed immediately after the YAML front matter in all assets:

```markdown
<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : {AssetName}
Asset Type    : {Agent|Prompt|Instruction|Skill}
Asset Version : {version}
Invoked At    : {Auto-populated by system if possible}
Invocation ID : {Unique identifier for this invocation}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Active | Ready to execute workflow
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->
```

### 2. Asset Metadata Section
Added near the top of each asset (after title/role definition):

```markdown
### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `{asset-type}/{asset-name}` |
| **Version** | `{semantic version}` |
| **Created** | `{YYYY-MM-DD}` |
| **Last Modified** | `{YYYY-MM-DD}` |
| **Maintained By** | `{maintainer/team}` |
| **Status** | `Active|Deprecated|Beta` |
| **Dependencies** | `{list of related assets}` |
| **Category** | `{category/domain}` |
```

### 3. Invocation Logging Section
Added at the end of each asset:

```markdown
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
- [Example] 2026-01-14 - Initial creation and testing

### Usage Guidelines
- This asset should be invoked when: {specific trigger conditions}
- Expected outcome: {what should happen}
- Related assets: {links to related agents/prompts/instructions}

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| {date} | {ver} | {description} | {author} |

---
*Traceability System v1.0 - Asset tracking enabled*
```

### 4. Generator Template Integration

#### For Agent Files (.agent.md)
Insert after YAML front matter:
```markdown
---
{YAML front matter}
---

<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : {AgentName} Agent
Asset Type    : Agent
Asset Version : v1.0
Invoked At    : {timestamp}
Invocation ID : agent-{agent-id}-{timestamp-hash}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Agent Active | Ready to process requests
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->

## {AgentName} Agent (v1.0)

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `agent/{agent-id}` |
| **Version** | `v1.0` |
| **Created** | `{date}` |
| **Last Modified** | `{date}` |
| **Maintained By** | `CopilotCustomizer` |
| **Status** | `Active` |
| **Category** | `{category}` |

{rest of agent content}
```

#### For Prompt Files (.prompt.md)
```markdown
---
{YAML front matter}
---

<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : {PromptName} Prompt
Asset Type    : Prompt
Asset Version : v1.0
Invoked At    : {timestamp}
Invocation ID : prompt-{prompt-id}-{timestamp-hash}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Prompt Ready | Awaiting variable substitution
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->

# {PromptName} Prompt (v1.0)

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `prompt/{prompt-id}` |
| **Version** | `v1.0` |
| **Created** | `{date}` |
| **Last Modified** | `{date}` |
| **Maintained By** | `CopilotCustomizer` |
| **Status** | `Active` |
| **Category** | `{category}` |

{rest of prompt content}
```

#### For Instruction Files (.instructions.md)
```markdown
---
{YAML front matter}
---

<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : {InstructionName} Instructions
Asset Type    : Instructions
Asset Version : v1.0
Invoked At    : {timestamp}
Invocation ID : instruction-{instruction-id}-{timestamp-hash}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Instructions Active | Applied to matching files
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->

# {InstructionName} Instructions (v1.0)

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `instruction/{instruction-id}` |
| **Version** | `v1.0` |
| **Created** | `{date}` |
| **Last Modified** | `{date}` |
| **Maintained By** | `CopilotCustomizer` |
| **Status** | `Active` |
| **Applies To** | `{applyTo pattern}` |
| **Category** | `{category}` |

{rest of instruction content}
```

#### For Skill Files (SKILL.md)
```markdown
---
{YAML front matter}
---

<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : {SkillName} Skill
Asset Type    : Skill
Asset Version : v1.0
Invoked At    : {timestamp}
Invocation ID : skill-{skill-id}-{timestamp-hash}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Skill Active | Methodology ready for application
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->

# {SkillName} Skill

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `skill/{skill-id}` |
| **Version** | `v1.0` |
| **Created** | `{date}` |
| **Last Modified** | `{date}` |
| **Maintained By** | `CopilotCustomizer` |
| **Status** | `Active` |
| **Category** | `{category}` |

{rest of skill content}
```

## Implementation Plan

### Phase 1: Add to Existing Assets
1. Update all `.agent.md` files in `.github/agents/`
2. Update all `.prompt.md` files in `.github/prompts/`
3. Update all `.instructions.md` files in `.github/instructions/`
4. Update all `SKILL.md` files in `.github/skills/*/`

### Phase 2: Update Generators
1. Modify `AssetGenerator.agent.md` to include traceability
2. Update `GenerateCopilotAgent.instructions.md` template
3. Update `GenerateInstructions.instructions.md` template
4. Update `GeneratePrompt.instructions.md` template
5. Update `GenerateSkill.instructions.md` template

### Phase 3: Documentation
1. Update AGENTS.md with traceability information
2. Update HOW-TO.md with usage guidelines
3. Create traceability audit documentation

## Benefits

1. **Visibility**: Clear indication when assets are invoked
2. **Debugging**: Easier to track which assets are being used
3. **Maintenance**: Quick identification of asset metadata
4. **Audit**: Historical tracking of asset usage
5. **Discovery**: Better understanding of asset relationships
6. **Quality**: Encourages documentation and version control

## Standards

- All timestamps use ISO 8601 format (YYYY-MM-DD HH:MM:SS UTC)
- All asset IDs use lowercase kebab-case
- Semantic versioning (major.minor.patch)
- Invocation IDs use format: `{type}-{id}-{hash}`

---
*Design Version: 1.0*
*Created: 2026-01-14*
*Status: Implementation Ready*
