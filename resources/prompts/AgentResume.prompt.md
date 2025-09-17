# AgentResume.prompt.md

## Universal Agent Resume Helper Prompt (v2.0-universal)

### Task Intent
Resume productive work with any AI agent on any project by analyzing current context and suggesting optimal continuation paths with friendly, encouraging guidance.

### Usage Instructions
1. Fill the variable block with your current situation details
2. Choose continuation style that matches your preferred approach
3. Receive context analysis and actionable next steps
4. Use refinement commands to adjust approach if needed
5. Maintain momentum with structured progress guidance

### Variable Block
---
**Where We Left Off** [REQUIRED]: "{WHERE_WE_LEFT_OFF}"
**Continuation Style** (keep-going|go-deeper|stay-focused|improve-first|explore-options | default: keep-going): {CONTINUATION_STYLE}
**What's Changed Since** (optional context updates): "{WHATS_CHANGED}"
**Priority Focus Area** (optional specific focus): "{PRIORITY_FOCUS}"
**Risk Tolerance** (cautious|balanced|bold | default: balanced): {RISK_TOLERANCE}
**Scope Preference** (narrow|current|expand | default: current): {SCOPE_PREFERENCE}
---

### Validation Rules
- Required: `{WHERE_WE_LEFT_OFF}` must describe current project state or last response
- Default `{CONTINUATION_STYLE}` to "keep-going" if not specified
- Optional context fields enhance analysis quality but aren't mandatory
- Risk tolerance affects suggestion boldness and validation frequency
- Scope preference influences whether to expand or narrow focus areas

### Continuation Style Options
| Style | Approach | Best For |
|-------|----------|----------|
| **keep-going** | Resume exactly where stopped with steady progress | Maintaining momentum on clear path |
| **go-deeper** | Take thorough, detailed look at current task | Complex problems needing careful analysis |
| **stay-focused** | Narrow to single most important next step | Feeling overwhelmed or scattered |
| **improve-first** | Polish current work before advancing | Quality concerns or refinement needed |
| **explore-options** | Consider different approaches and alternatives | Uncertainty about best path forward |

### Risk Tolerance Modes
| Mode | Characteristics | Validation Level |
|------|-----------------|------------------|
| **cautious** | Ask more questions, double-check steps, prefer smaller increments | High - frequent confirmation |
| **balanced** | Standard approach with reasonable validation and progress | Medium - key checkpoint validation |
| **bold** | Take larger steps, fewer breaks, assume context understanding | Low - minimal validation overhead |

### Generation Gate
Before providing resumption guidance:
- Analyze provided context and identify current project state
- Assess continuation style compatibility with described situation  
- Consider any changes or new information provided
- Determine optimal next steps based on risk tolerance and scope
- Present analysis and suggested path forward for confirmation

### Output Requirements (After Context Analysis)

**Structured Response Format**:

#### 1. Context Recognition
- "I can see you were working on [specific area/task]..."
- Brief analysis of current state and progress made
- Acknowledgment of any challenges or blockers mentioned

#### 2. Situation Assessment  
- Current position analysis with clear understanding demonstration
- Integration of any new information or changes mentioned
- Risk/opportunity identification based on provided context

#### 3. Recommended Path Forward
- Specific next steps aligned with chosen continuation style
- Priority ordering of suggested actions with clear rationale
- Resource or dependency considerations if applicable

#### 4. Progress Support
- Encouragement and momentum maintenance focus
- Quality checkpoints and validation suggestions
- Offer for ongoing assistance and adjustment capability

#### 5. Ready-to-Execute Actions
- Concrete, actionable next steps you can implement immediately
- Clear success criteria for measuring progress
- Fallback options if primary approach encounters obstacles

### Internal Quality Checklist
- [ ] Current context properly understood and acknowledged
- [ ] Continuation style appropriately applied to situation
- [ ] Risk tolerance reflected in suggestion boldness and validation frequency
- [ ] Scope preference honored in recommendation breadth
- [ ] New information integrated effectively into analysis
- [ ] Actionable next steps provided with clear implementation guidance
- [ ] Encouraging, supportive tone maintained throughout response
- [ ] Progress momentum preserved while addressing any concerns

### Refinement Commands
| Command | Action |
|---------|--------|
| `be cautious` | Increase validation frequency, ask more clarifying questions |
| `be bold` | Take larger steps, reduce confirmation overhead, assume understanding |
| `stay focused` | Narrow scope to single priority, eliminate distractions |
| `expand scope` | Consider related tasks, broader context, additional opportunities |
| `improve quality` | Focus on polishing current work before advancing |
| `maintain momentum` | Prioritize forward progress, minimize perfectionism delays |

### Example Filled Prompt
```
WHERE_WE_LEFT_OFF: "I was analyzing the user login system and found 3 security issues. I wasn't sure which one to fix first."
CONTINUATION_STYLE: keep-going
WHATS_CHANGED: "The team said to prioritize the password validation issue"
PRIORITY_FOCUS: "security fixes"
RISK_TOLERANCE: balanced  
SCOPE_PREFERENCE: current
```

**Expected Response Pattern**: Context acknowledgment → Priority analysis → Step-by-step approach → Encouragement and next actions

### Universal Compatibility Features
- **Chatmode Agnostic**: Functions with any active chatmode or independently
- **Context Flexible**: Adapts to coding, writing, analysis, planning, or any project type
- **Skill Transferable**: Works across different domains and expertise levels
- **Progress Oriented**: Always focuses on forward momentum and practical next steps
- **Repository Independent**: Works in any project structure or technology stack

### Safety & Quality Assurance
- Preserve existing work and progress during resumption process
- Validate understanding before suggesting major direction changes
- Request clarification for ambiguous or potentially risky situations
- Maintain audit trail of progress and decisions for future reference
- Respect project constraints and established patterns

### Notes & Tips
- **Context Quality**: More detailed context enables better continuation suggestions
- **Style Matching**: Choose continuation style that matches your current needs and energy level
- **Iterative Use**: Use refinement commands to adjust approach as work progresses
- **Universal Application**: Effective for any project type - coding, writing, analysis, planning
- **Momentum Focus**: Designed to minimize restart friction and maximize productive progress

### Risk Mitigation Notes
**Common Scenarios**:
- **Incomplete Context**: Request additional details rather than make assumptions
- **Conflicting Priorities**: Help clarify and prioritize rather than choose arbitrarily  
- **Technical Uncertainty**: Suggest validation steps before proceeding with uncertain approaches
- **Scope Creep Risk**: Respect scope preferences and offer expansion only when beneficial

**Fallback Behaviors**:
- If context unclear → Ask targeted clarifying questions
- If multiple paths viable → Present options with trade-off analysis
- If risk level uncertain → Default to cautious approach with validation checkpoints
- If external dependencies detected → Suggest dependency resolution before proceeding

### Version Note
Universal Agent Resume Helper v2.0-universal - Designed for complete repository and framework agnosticism. Works with any AI assistant, chatmode, or project context without dependencies on specific tools, repositories, or frameworks.

### Compatibility Note
This prompt is designed to be completely portable and works in any VS Code workspace with any Copilot configuration. No external dependencies, framework requirements, or specific repository structure needed. Intentionally omits `mode` field to preserve current chatmode context.

---

**Universal Design**: Repository-agnostic | **Framework Independent**: No external dependencies  
**Portability**: Works in any VS Code workspace | **Compatibility**: Any AI assistant or chatmode

*Designed for universal compatibility across all development environments and project types*