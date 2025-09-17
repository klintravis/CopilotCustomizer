---
applyTo: '**/*.chatmode.md'
description: 'Standardized framework for crafting powerful, maintainable chat mode personas for GitHub Copilot Chat in VS Code'
---

## Ultimate Chat Mode Authoring Guide (Harmony v1.0-h1)

<!-- Harmony: Cross-reference injection -->
**Harmonized Assets**:
- Instructions: [GenerateChatmode.instructions.md](../instructions/GenerateChatmode.instructions.md)
- Prompts: [NewChatmode.prompt.md](../prompts/NewChatmode.prompt.md)

*Last harmonized: 2025-09-15*

### Binding Guidance
- Default usage with: `chatmodes/CopilotCustomizer.chatmode.md`
- **Paired Prompt Execution**: Use `prompts/NewChatmode.prompt.md` for chat mode generation workflow
- **Generation Process**: Follow structured variable block and validation rules in paired prompt
- Ensure personas reference related prompts/instructions by purpose where relevant to reduce duplication.

### Purpose
Provide a standardized framework for crafting powerful, maintainable `*.chatmode.md` personas for GitHub Copilot Chat in VS Code, supporting diverse project workflows (planning, refactoring, security review, data engineering, ML, infra). Ensures consistency with instructions & prompt artifacts.

### Design Tenets
1. Narrow, outcome-focused role.
2. Explicit workflow loop (clarify -> confirm -> act -> refine).
3. Depth adaptability (quick vs standard vs deep) when complexity varies.
4. Guardrails for ambiguity, scope creep, compliance, hallucination risk.
5. DRY interaction model (no duplication of universal rules—reference shared docs where possible).
6. Versioned schema & auditable change log.

### Required Front Matter Keys
| Key | Required | Description |
|-----|----------|-------------|
| `description` | **REQUIRED** | Brief description shown in VS Code Chat mode dropdown |
| `tools` | Optional | Array of tool names available for this mode (can be empty) |
| `model` | Optional | Specific AI model to use (defaults to current selection) |

### Structural Template
```markdown
---
description: "[Brief mode description for VS Code dropdown]"
tools: []
---

## [Mode Name] ([Version])

### Role
[Concise expert role definition]

### Core Objectives  
1. [Primary objective]
2. [Secondary objective]
3. [Tertiary objective]

### Workflow (Iteration Loop)
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Depth Modes
| Mode | Use Case | Output Characteristics |
|------|----------|----------------------|
| [mode-name] | [use case] | [characteristics] |

### Refinement Commands
| Command | Action |
|---------|--------|
| [command] | [action description] |

### Guardrails
- [Guardrail 1]
- [Guardrail 2]

### Quality Checklist
- [ ] [Quality item 1]
- [ ] [Quality item 2]

---
End of mode definition.
```

### Content Guidelines

#### Role Definition
- **Single-sentence expert identity**: "Expert in [domain] specializing in [specific area]"
- **Clear boundaries**: What the mode does and does NOT do
- **Value proposition**: Why use this mode vs others

#### Core Objectives (3-6 items)
- **Outcome-focused**: Start with action verbs
- **Measurable when possible**: Specific deliverables
- **Prioritized order**: Most important first

#### Workflow Design
- **4-8 step iteration loop**: Intake → Analysis → Action → Refinement
- **User confirmation gates**: Explicit approve/reject points
- **Clear handoffs**: When to escalate or delegate

#### Depth Modes (Optional but Recommended)
Use when complexity varies significantly:
- **Quick**: Fast, minimal output for simple cases
- **Standard**: Default balanced approach
- **Deep**: Comprehensive analysis for complex scenarios

#### Refinement Commands (4-8 recommended)
- **Scope adjustment**: `refine: narrow`, `refine: expand`
- **Quality focus**: `refine: accuracy`, `refine: speed`  
- **Output format**: `refine: detailed`, `refine: summary`
- **Domain-specific**: Based on mode purpose

#### Guardrails (Critical)
- **Scope boundaries**: Clear "won't do" statements
- **Risk mitigation**: Handle ambiguity, hallucination
- **Escalation triggers**: When to request human input
- **Compliance notes**: Security, privacy, legal constraints

#### Quality Checklist (5-10 items)
- **Deliverable validation**: Output meets requirements
- **Process verification**: Workflow steps completed
- **Risk assessment**: Guardrails respected
- **User satisfaction**: Clear value delivered

### Advanced Features

#### Cross-Mode Integration
- **Reference other modes**: When to hand off to specialists
- **Shared resources**: Common instructions/prompts
- **Workflow chaining**: Multi-mode task sequences

#### Versioning & Evolution
- **Semantic versioning**: Major.minor for breaking/non-breaking changes
- **Change logging**: Document modifications and rationale
- **Backward compatibility**: Maintain existing workflows

#### Performance Optimization
- **Token efficiency**: Concise but complete instructions
- **Context management**: What to include/exclude
- **Response speed**: Balance thoroughness with responsiveness

### Validation & Testing

#### Pre-Deployment Checklist
- [ ] Front matter validates in VS Code
- [ ] All sections present and complete
- [ ] Guardrails tested with edge cases
- [ ] Refinement commands functional
- [ ] Cross-references resolve correctly

#### Quality Metrics
- **Clarity Score**: User understanding without explanation
- **Completeness**: All required sections present
- **Consistency**: Alignment with other modes
- **Usability**: Smooth workflow execution

#### Common Anti-Patterns
- **Scope creep**: Trying to do everything
- **Vague objectives**: Non-specific outcomes
- **Missing guardrails**: No boundary protection
- **Inconsistent workflow**: Steps don't connect logically
- **Token bloat**: Unnecessarily verbose instructions

### Integration Guidelines

#### With CopilotCustomizer Ecosystem
- **Chat Mode Binding**: Reference `chatmodes/CopilotCustomizer.chatmode.md`
- **Generation Workflow**: Execute via `prompts/NewChatmode.prompt.md`
- **Harmonization**: Follow cross-reference patterns established in this guide

#### Best Practices
- **DRY Principle**: Reference shared documentation instead of duplicating
- **User-Centric Design**: Focus on user workflow efficiency  
- **Iterative Refinement**: Start simple, evolve based on usage
- **Documentation Currency**: Keep aligned with VS Code Copilot updates

### Harmonization Metadata

**Version**: Harmony v1.0-h1  
**Harmonized With**: NewChatmode.prompt.md  
**Binding Version**: harmony-v1.0  
**Last Harmonized**: 2025-09-15  
**Preservation Level**: medium

### Standards Compliance & Processing Metadata

**VS Code Copilot Compliance**: Custom Instructions Schema - Full compliance achieved  
**Schema Requirements**: 
- ✅ Required `applyTo` field in YAML front matter (`**/*.chatmode.md`)
- ✅ Optional `description` field for hover text functionality
- ✅ Markdown body with clear generation instructions
- ✅ Documentation sources referenced per schema guidelines

**Standards Sources**: 
- [VS Code Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [VS Code Custom Chat Modes](https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes)
- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot/customization/)

**Processing Metadata**:
- **Standards Version**: VS Code Copilot v2025.01 (Custom Instructions latest)
- **Harmonization**: comprehensive-harmony-v2.0 (enhanced cross-references)
- **Content Preservation**: 100% functionality maintained with enhanced standards
- **Formatting Applied**: 2025-01-27 | Standards compliance verified

### Conformance Note
This instruction file aligns with the broader Copilot customization ecosystem and integrates with `prompts/NewChatmode.prompt.md` for execution workflow. Focuses on maintainable, high-quality chat mode generation following established patterns.

**Binding References**:
- **Execution Prompt**: `prompts/NewChatmode.prompt.md`
- **Primary Chat Mode**: `chatmodes/CopilotCustomizer.chatmode.md`
- **Standards Compliance**: `instructions/FormatAssets.instructions.md`

---
*Generated and formatted following VS Code GitHub Copilot official documentation standards*