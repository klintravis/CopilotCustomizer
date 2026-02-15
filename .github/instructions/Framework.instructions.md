---
applyTo: '.github/**/*'
description: 'Universal Copilot customization workflows, standards, quality patterns, and audit framework'
---

# Framework

## Universal Asset Workflow (v1.0)

### 4-Phase Standard Process
1. **Assessment**: Evaluate requirements, context, scope
2. **Standards**: Apply asset-specific guidelines and schemas  
3. **Execution**: Use structured templates for consistent output
4. **Integration**: Ensure ecosystem alignment and quality

### Implementation Patterns
**Generation**: Requirements → Standards → Template → Integration  
**Management**: Selection → Analysis → Application → Validation

## Standard Workflow (Iteration Loop)
1. **Intake**: Capture user goal and requirements
2. **Inventory**: List existing files with purposes
3. **Gap Analysis**: Compare against best practice checklist
4. **Proposal**: Present improvement plan (Add/Modify/Remove/Defer)
5. **Implementation**: Generate or patch artifacts (on confirmation)
6. **Audit**: Run structural checklist and summarize changes (optional)
7. **Refinement**: Accept commands to re-focus or iterate

## Quality Checklist
Universal validation criteria for all Copilot customization work:

- [ ] Inventory collected and acknowledged
- [ ] Gap analysis covers all active artifacts
- [ ] Recommendations map to audit dimensions
- [ ] No duplicated guidance between assets
- [ ] Versioning and change impacts documented
- [ ] Agent files include actionable commands and style guides
- [ ] No conflicts with custom instructions
- [ ] Asset integration verified and cross-references functional
- [ ] Tool ecosystem properly configured
- [ ] Security patterns and approvals validated
- [ ] Handoff workflows tested where applicable
- [ ] Cross-device synchronization compatibility confirmed

## Standards Compliance

### VS Code Copilot Schema (v1.109)
**Agent Files**: `description` (required), `target`, `name`, `argument-hint`, `tools`, `model` (string or array), `handoffs` (with optional model parameter), `mcp-servers`, `user-invokable`, `disable-model-invocation`, `agents` (optional)  
**Agent Skills**: Generally available (GA), enabled by default; custom locations via `chat.agentSkillsLocations`  
**Instructions**: `applyTo` (required), `description` (optional); organization-wide instructions supported  
**Prompts**: variable blocks, usage instructions; optional `agent`, `tools`, `model`  
**Orchestration**: Parallel subagent execution, `agent` tool replaces deprecated `runSubagent`

### Documentation Sources
- [Customization Overview](https://code.visualstudio.com/docs/copilot/customization/overview)
- [Agent Files](https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes)
- [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [MCP Servers](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [Tool Management](https://code.visualstudio.com/docs/copilot/chat/chat-tools)

## Efficiency Guidelines

### Token Optimization
**Patterns**: Concise phrasing, eliminate redundancy, minimize boilerplate, reference shared patterns
**Context Management**: quick-advice (top 3 issues), standard (full analysis), deep-architecture (governance + lifecycle)

### Asset Integration
**Framework Components**: Instructions (workflows), Prompts (templates), Agents (roles), Tools (MCP + approvals)
**Cross-References**: Maintain functional links, validate dependencies, ensure compatibility

### Change Management
**Versioning**: Consistent metadata, schema versions, compatibility markers  
**Tracking**: Document modifications, clear version increments, backward compatibility  
**Testing**: Validate cross-references and dependencies after changes

## Audit Framework

### Audit Dimensions (v1.0)

Universal evaluation criteria for Copilot customization assets:

| Dimension | Criteria |
|-----------|----------|
| **Structure** | Schema compliance, ordered sections, handoffs |
| **Clarity** | Unambiguous role, explicit workflows, measurable outcomes |
| **Guardrails** | Missing info handling, refusal rules, compliance triggers |
| **Consistency** | Shared terminology, version alignment |
| **Extensibility** | Handoff commands, modular sections, future-proofing |
| **Token Efficiency** | Concise phrasing, minimal boilerplate |
| **Tool Integration** | MCP servers, tool sets, approval workflows |
| **Security** | Tool trust management, safe defaults |
| **Governance** | Change logs, version tags, sync capabilities |

### Standard Output Patterns

1. **Audit Report**: Gap analysis with recommendations
2. **Improvement Roadmap**: Prioritized enhancement plan with handoffs
3. **Refactored Artifacts**: Optimized files with preserved functionality
4. **Tool Configuration**: MCP server setup and tool sets
5. **Security Assessment**: Tool approval patterns and trust configs
6. **Executive Summary**: Compressed overview (on `refine: concise`)
7. **Governance Addendum**: Policy framework with sync (deep-architecture)
8. **Agent Guidance**: `AGENTS.md`/`.agent.md` with handoffs, tools, security

### Governance Framework

**Artifact Management**  
Headers: Maintain version tracking in markdown content, `depthModes`, `refinementCommands`  
Conflict Resolution: explicit chat > nearest `AGENTS.md` > global instructions  
Actionability: Build/test commands, code style, PR guidelines, security notes  
Alignment: Consistency between custom agents, instruction files, prompt files

**Version Control**  
Schema Tracking: VS Code Copilot version compatibility  
Change Impact: Effects on dependent assets and workflows  
Migration Support: Upgrade paths for schema changes  
Cross-Device Sync: VS Code Settings Sync compatibility

### Evaluation Framework

**Assessment Categories**  
Structural: Schema compliance, cross-references, handoffs, tool configs  
Functional: Role clarity, workflow effectiveness, error handling, UX  
Technical: Code quality, security patterns, performance, integration

**Metrics & KPIs**  
Quantitative: Schema compliance %, cross-reference accuracy, tool integration success, handoff completion  
Qualitative: User satisfaction, maintainability, documentation clarity, security posture

### Continuous Improvement

**Feedback Loops**  
User Experience: Usage patterns and pain points  
Performance: Response times and accuracy metrics  
Compliance: VS Code Copilot standard changes  
Best Practices: Industry standards and improvements

**Optimization Strategies**  
Token Efficiency: Regular review and compression  
Workflow: Eliminate redundant steps  
Tool Integration: Enhance MCP and tool configs  
Security: Strengthen approval patterns and trust

## Change History

| Version | Date | Changes |
|---------|------|---------||
| v1.0 | 2026-01-15 | Initial release |

*Complete security patterns: [Security.instructions.md](Security.instructions.md)*