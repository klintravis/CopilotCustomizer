---
agent: CopilotCustomizer
---

# VS Code Copilot Agent Generator (v1.0)

**Paired Instructions**: [GenerateCopilotAgent.instructions.md](../instructions/GenerateCopilotAgent.instructions.md)

### Task
Generate VS Code Copilot `.agent.md` chat mode file with role, tools, handoffs, workflows.

**Note**: Creates `.agent.md` chat modes, NOT workspace `AGENTS.md` files.

### Usage
1. Review [GenerateCopilotAgent.instructions.md](../instructions/GenerateCopilotAgent.instructions.md)
2. Fill required variables
3. Confirm when ready

### Variables
---
**Agent Name** [REQUIRED]: "{AGENT_NAME}"
**Specialization** [REQUIRED]: "{DOMAIN}"
**Primary Role** (≤30 words) [REQUIRED]: "{PRIMARY_ROLE}"
**Capabilities** (comma list): "{CAPABILITIES}"
**Tools** (comma list | default: edit,search): "{TOOLS}"
**Depth Modes** (quick,standard,deep): "{DEPTH_MODES}"
**Handoffs** (comma list): "{HANDOFF_TARGETS}"
**Workflow** (analysis|generation|review): "{WORKFLOW_TYPE}"
---

### Validation
- Required: `AGENT_NAME`, `DOMAIN`, `PRIMARY_ROLE`
- Tools from approved VS Code catalog
- Handoff targets must be valid

### Generation Gate
Respond with:
- Role boundary analysis
- Tool requirements
- Handoff design
- `ready-to-generate`

Wait for `confirm`.

### Output Requirements
Complete `.agent.md` with:
1. YAML front matter (v1.105+)
2. Agent definition
3. Core objectives
4. Workflow process
5. Depth modes
6. Refinement commands
7. Tool integration
8. Handoff workflows
9. Framework integration

### Agent Patterns
**Specialist**: Domain expert, workflow specialist, QA  
**Integration**: Orchestrator, analyzer, generator  
**Utility**: Formatter, validator, optimizer

### Refinement Commands
- `refine: role` - Clarify boundaries
- `refine: tools` - Optimize selection
- `refine: workflow` - Enhance sequences

*Instructions: [GenerateCopilotAgent.instructions.md](../instructions/GenerateCopilotAgent.instructions.md)*  
*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*  
*VS Code: [Agent Files](https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes)*

**Generated using**: [GenerateCopilotAgent.instructions.md](../instructions/GenerateCopilotAgent.instructions.md)
- Handoff targets must be valid agent names or patterns
- Security level affects tool approval requirements and patterns

## Generation Gate

Before generating VS Code agent file, respond with:
- Agent specialization analysis and role boundary definition
- Tool requirements assessment and approval validation
- Handoff workflow design and integration patterns
- `ready-to-generate` plus compact section plan

Wait for explicit `confirm` before emitting the complete `.agent.md` file.

## Output Requirements (On Confirm)

**Following [GenerateCopilotAgent.instructions.md](../instructions/GenerateCopilotAgent.instructions.md) Standards**:

Produce a complete `.agent.md` file containing:

1. **YAML Front Matter**: VS Code Agent Files v1.105+ compliant
   - Required `description` field with clear agent role
   - Optional `tools` array with approved tools only
   - Optional `model` specification if relevant
   - Optional `handoffs` array for workflow transitions

2. **Agent Definition**: Clear role, capabilities, and expertise boundaries

3. **Core Objectives**: Primary goals and workflow outcomes

4. **Workflow Process**: Step-by-step interaction patterns and methodologies

5. **Depth Modes**: quick-advice, standard, deep-architecture options (if applicable)

6. **Refinement Commands**: Domain-specific and universal refinement options

7. **Tool Integration**: Approved tool usage patterns and security compliance

8. **Handoff Workflows**: Transitions to other agents (if applicable)

9. **Framework Integration**: References to shared instruction patterns

10. **Examples**: Sample interactions and use cases (optional)

## Agent Pattern Selection

### Specialist Patterns
- **Domain Expert**: Focused on specific technology or methodology
- **Workflow Specialist**: Optimized for particular development patterns  
- **Quality Assurance**: Dedicated to review and validation processes

### Integration Patterns
- **Orchestrator**: Coordinates multiple specialist agents
- **Analyzer**: Assesses complex situations and recommends approaches
- **Generator**: Creates artifacts based on specifications and analysis

### Utility Patterns
- **Formatter**: Standardizes and optimizes existing content
- **Validator**: Verifies compliance and quality standards
- **Optimizer**: Enhances performance and maintainability

## Default Refinement Commands

| Command | Action |
|---------|--------|
| `refine: role` | Clarify agent boundaries and capabilities |
| `refine: tools` | Optimize tool selection and usage patterns |
| `refine: workflow` | Enhance interaction sequences and outcomes |
| `refine: handoffs` | Improve agent transition patterns |

## Internal Quality Checklist

**Pre-Generation Validation**:
- [ ] Agent role is specific and bounded
- [ ] Required variables provided and validated
- [ ] Tool selection follows approved catalog
- [ ] Handoff targets are valid and functional
- [ ] Security requirements appropriate for domain

**Post-Generation Validation**:
- [ ] YAML front matter follows VS Code Agent Files v1.105+ schema
- [ ] Agent role clearly defined with expertise boundaries
- [ ] Workflow patterns are actionable and measurable
- [ ] Tool integration follows security patterns
- [ ] Framework references are functional and current

## Example Usage

**Minimal Input**:
```
{AGENT_NAME}=SecurityReviewer
{DOMAIN}=Code security analysis
{PRIMARY_ROLE}=Expert security reviewer who identifies vulnerabilities and suggests mitigations
```

**Expected Processing**:
- Infers security-focused tools (static analysis, code review)
- Adds appropriate depth modes for different review levels
- Includes handoffs to remediation specialists
- Applies high security requirements automatically

## Risk Mitigation Notes

**High Risk Areas**:
- Tool approval validation - ensure all tools are in approved catalog
- Handoff target verification - validate agent names and transition logic
- Role boundary definition - prevent capability overlap conflicts
- Security pattern compliance - match requirements to domain risks

**Fallback Behaviors**:
- Invalid tool → request clarification or suggest approved alternatives
- Undefined handoff target → provide agent creation guidance
- Ambiguous role → request more specific domain boundaries
- Security mismatch → adjust patterns to match declared requirements

## Notes & Tips

- **Role Specificity**: More specific domains create more effective agents
- **Tool Selection**: Choose minimal viable tool set for efficiency
- **Handoff Design**: Plan agent ecosystem interactions carefully
- **Framework Integration**: Leverage shared instruction patterns for consistency
- **Security Alignment**: Match tool approval patterns to domain requirements

## Standards Compliance & Processing Metadata

**VS Code Copilot Compliance**: Agent Files v1.105+ - Full compliance achieved  
**Schema Requirements**: 
- ✅ Required `description` field in YAML front matter
- ✅ Optional `tools`, `model`, `handoffs` fields supported
- ✅ Markdown body with clear agent instructions and workflows
- ✅ Documentation sources referenced per schema guidelines

**Standards Sources**: 
- [VS Code Agent Files](https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes)
- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot/customization/)
- [VS Code Tool Management](https://code.visualstudio.com/docs/copilot/chat/chat-tools)

**Processing Metadata**:
- **Standards Version**: VS Code Copilot v2025.10 (Agent Files v1.105+)
- **Content Preservation**: 100% functionality maintained with enhanced structure
- **Formatting Applied**: 2025-10-31 | Standards compliance verified

## Version Note

VS Code Copilot Agent Generator v1.0 - Specialized for creating VS Code Copilot `.agent.md` chat mode files with role specialization, tool integration, and handoff workflows. Conforms to [GenerateCopilotAgent.instructions.md](../instructions/GenerateCopilotAgent.instructions.md) framework standards.

## Binding References

- **Instructions**: [GenerateCopilotAgent.instructions.md](../instructions/GenerateCopilotAgent.instructions.md) - Complete agent authoring framework
- **Framework**: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md) - Core customization architecture  
- **Security**: [CopilotSecurity.instructions.md](../instructions/CopilotSecurity.instructions.md) - Tool approval patterns

---

*Generated and optimized following VS Code GitHub Copilot official documentation standards*