---
applyTo: '.github/prompts/AssetOptimization.prompt.md'
description: 'Guide AI agents in optimizing VS Code Copilot customization assets while maintaining repository integrity, preserving all existing links and hard references, and understanding the broader repository context and intent'
---

# Asset Optimization Instructions (v1.0)

**Paired Prompt**: [AssetOptimization.prompt.md](../prompts/AssetOptimization.prompt.md)

## Purpose
Optimize VS Code Copilot customization assets while preserving 100% of existing links, references, and repository context.

## Objectives
- Enhance clarity and formatting
- Preserve all existing links/references
- Maintain repository integrity
- Save to `CopilotCustomizer/output/`

## Pre-Optimization Research
- Scan repository structure for context
- Identify all cross-references
- Map external repository references
- Document repository conventions
- Assess VS Code Copilot compatibility

## Preservation Rules
**Preserve**: All links/references, chat mode bindings, version numbers, URLs, directory structures, front-matter, section ordering, table structures, code blocks  
**Validate**: Test internal links, validate external URLs, confirm paired relationships, verify schema compliance

## Enhancement Strategies
- **Clarity**: Simplify language, improve headings, enhance readability
- **Formatting**: Standardize bullets, optimize tables, improve code blocks
- **Token Efficiency**: Remove redundancy, compress verbosity
- **Structure**: Improve flow, enhance scanability
- **Content**: Strengthen examples, clarify instructions

**Boundaries**: Never modify functionality, preserve specs/requirements, maintain workflows, respect conventions

## Testing & Validation
- Link testing (internal/external references)
- Schema validation (VS Code Copilot requirements)
- Integration testing (paired relationships)
- Repository context alignment

## Outputs
- Save to `CopilotCustomizer/output/` with clear naming
- Optimization reports documenting changes
- Reference integrity validation reports
- Audit trail of preserved/modified elements

## Acceptance Criteria
- [ ] 100% links/references preserved
- [ ] General layout maintained
- [ ] Repository intent respected
- [ ] Enhanced clarity achieved
- [ ] Output saved to correct location
- [ ] Optimization report generated
- [ ] Paired relationships validated
- [ ] Schema compliance confirmed

## Workflow Integration
Execute via [AssetOptimization.prompt.md](../prompts/AssetOptimization.prompt.md)  
Validate with [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md) using `refine: audit`, `refine: optimize`, `refine: concise`

## Risks & Mitigation
**Cross-Reference Breakage**: Comprehensive mapping/validation  
**Context Loss**: Mandatory repository analysis  
**Schema Incompatibility**: Schema validation testing  
**Output Misplacement**: Enforced path validation

*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*  
*Standards: [FormatAssets.instructions.md](../instructions/FormatAssets.instructions.md)*  
*VS Code: [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)*