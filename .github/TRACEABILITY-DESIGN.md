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
Placed immediately after the YAML front matter in all assets. **Concise format** for minimal overhead:

```markdown
<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: {AssetName} ({Type}) v{version}
   STATUS: {TypeSpecificStatus}
════════════════════════════════════════════════════════════════════════════ -->
```

**Type-Specific Status Messages:**
- **Agent**: `Agent Active — Processing requests`
- **Prompt**: `Prompt Ready — Awaiting execution`
- **Instructions**: `Instructions Applied — Context loaded`
- **Skill**: `Skill Active — Methodology engaged`

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

All generators must include the concise invocation alert after YAML front matter.

#### For Agent Files (.agent.md)
```markdown
---
{YAML front matter}
---

<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: {AgentName} Agent (Agent) v1.0
   STATUS: Agent Active — Processing requests
════════════════════════════════════════════════════════════════════════════ -->

## {AgentName} Agent (v1.0)

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `agent/{agent-id}` |
| **Version** | `v1.0` |
| **Created** | `{date}` |
| **Status** | `Active` |

{rest of agent content}
```

#### For Prompt Files (.prompt.md)
```markdown
---
{YAML front matter}
---

<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: {PromptName} Prompt (Prompt) v1.0
   STATUS: Prompt Ready — Awaiting execution
════════════════════════════════════════════════════════════════════════════ -->

# {PromptName} Prompt (v1.0)

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `prompt/{prompt-id}` |
| **Version** | `v1.0` |
| **Created** | `{date}` |
| **Status** | `Active` |

{rest of prompt content}
```

#### For Instruction Files (.instructions.md)
```markdown
---
{YAML front matter}
---

<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: {InstructionName} Instructions (Instructions) v1.0
   STATUS: Instructions Applied — Context loaded
════════════════════════════════════════════════════════════════════════════ -->

# {InstructionName} Instructions (v1.0)

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `instruction/{instruction-id}` |
| **Version** | `v1.0` |
| **Created** | `{date}` |
| **Status** | `Active` |
| **Applies To** | `{applyTo pattern}` |

{rest of instruction content}
```

#### For Skill Files (SKILL.md)
```markdown
---
{YAML front matter}
---

<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: {SkillName} Skill (Skill) v1.0
   STATUS: Skill Active — Methodology engaged
════════════════════════════════════════════════════════════════════════════ -->

# {SkillName} Skill (v1.0)

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `skill/{skill-id}` |
| **Version** | `v1.0` |
| **Created** | `{date}` |
| **Status** | `Active` |

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
