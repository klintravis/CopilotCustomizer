# CopilotCustomizer Assets Reference

| Asset Type | Pattern | Purpose | Required YAML |
|------------|---------|---------|---------------|
| Agent Files | `*.agent.md` | VS Code agents | `description` |
| Instructions | `*.instructions.md` | AI guidance rules | `applyTo` |
| Prompts | `*.prompt.md` | Interaction templates | - |
| Skills | `.github/skills/*/SKILL.md` | Cross-platform capability patterns | - |
| Standards | `.github/standards/**/*.md` | Enterprise coding standards | `name`, `scope`, `priority` |
| AGENTS.md | `AGENTS.md` | Project guidance | - |
| Templates | `*.template.md` | Document formats | - |

## Agent Files (`*.agent.md`)
**Location**: `.github/agents/` | **YAML**: `description` (required), `target`, `name`, `argument-hint`, `tools`, `model`, `handoffs`, `mcp-servers` (optional - VS Code 1.106+)

```markdown
## [Agent Name] (v[Version])
### Role
### Core Objectives
### Workflow
### Tool Configuration
### Handoff Workflows
```

**Available**: `CopilotCustomizer.agent.md`, `ChangeExecutor.agent.md`, `VerificationAgent.agent.md`, `AssetGenerator.agent.md`, `AssetPlanner.agent.md`, `BootstrapRepo.agent.md`, `HarmonizationAgent.agent.md`

## Skills (`.github/skills/*/SKILL.md`)
**Location**: `.github/skills/` | **Purpose**: portable patterns you can reference from prompts/agents across tools (VS Code, CLI, other agents)

**Structure**:
- One folder per skill (e.g., `.github/skills/repository-analysis/`)
- Required file: `SKILL.md`
- Optional: `examples/` for reusable snippets

**Available**: `repository-analysis`, `implementation-planning`, `technical-documentation`, `copilot-asset-design`, `deployment-automation`, `multi-agent-orchestration`

## Instructions (`*.instructions.md`)
**Location**: `.github/instructions/` | **YAML**: `applyTo` (required), `description` (optional)

```markdown
## [Name] Instructions (v[Version])
### Objective
### Constraints  
### Workflow
### Standards
```

**Available**: OptimizeAndFormat, GenerateAgentsFile, GenerateCopilotAgent, GenerateInstructions, GeneratePrompt, GenerateWorkflow, GenerateOrchestratedSystem, HarmonizeAssets, RepoReview, ResolveStandards, CopilotFramework, CopilotAudit, CopilotSecurity

## Prompts (`*.prompt.md`)
**Location**: `.github/prompts/` | **YAML**: `agent` or `mode` (optional)

```markdown
## [Name] Prompt (v[Version])
### Task Intent
### Usage Instructions
### Variable Block
### Validation Rules
```

**Available (user — `.github/prompts/`)**: BootstrapRepo, NewAgentsFile, NewCopilotAgent, NewInstructions, NewPrompt, NewSkill, NewWorkflow, NewWorkflowSystem, RepoReview
**Available (dev — `dev/prompts/`)**: AgentResume, HarmonizeAndValidate, OptimizeAndFormat, QuickChange
```

### Structure Template

```markdown
# [Prompt Name]

## Variables
- `{VARIABLE_NAME}`: Description of variable purpose and expected format
- `{ANOTHER_VAR}`: Another variable description

## Instructions
[Clear, step-by-step instructions for the AI to follow]

## Context Requirements
[Information the AI needs to gather before proceeding]

## Output Format
[Specification of expected output structure and format]

## Quality Checks
[Validation steps and quality criteria]

## Example Usage
[Sample usage with variable substitution]
```

### Available Prompts

| File | Purpose | Bound Mode |
|------|---------|------------|
| `BootstrapRepo.prompt.md` | Complete repository setup workflow | BootstrapRepo |
| `NewAgentsFile.prompt.md` | Generate workspace AGENTS.md | CopilotCustomizer |
| `NewCopilotAgent.prompt.md` | Generate VS Code .agent.md | CopilotCustomizer |
| `NewInstructions.prompt.md` | Generate instruction files | CopilotCustomizer |
| `NewPrompt.prompt.md` | Generate prompt files | CopilotCustomizer |
| `NewSkill.prompt.md` | Generate cross-platform skills | CopilotCustomizer |
| `NewWorkflow.prompt.md` | Generate multi-agent workflows | CopilotCustomizer |
| `NewWorkflowSystem.prompt.md` | Generate orchestrated multi-agent systems | CopilotCustomizer |
| `RepoReview.prompt.md` | Repository analysis execution | CopilotCustomizer |
| **Dev prompts** (`dev/prompts/`) | | |
| `AgentResume.prompt.md` | Universal agent workflow helper | None (universal) |
| `HarmonizeAndValidate.prompt.md` | Harmonize and validate 2-3 assets | CopilotCustomizer |
| `OptimizeAndFormat.prompt.md` | Optimize + format + validate assets | CopilotCustomizer |
| `QuickChange.prompt.md` | Fast minimal-diff change workflow | CopilotCustomizer |

---

## 🤖 AGENTS.md

**Purpose**: project-wide AI guidance for contributors and coding agents  
**Location**: repository root  
**File Pattern**: `AGENTS.md`

### Schema Requirements

**No YAML front matter required** - pure Markdown

### Structure Template

```markdown
# [Project Name]

[Brief project description and purpose]

## Quick Start
[Installation and setup commands]

## Code Style  
[Coding standards and conventions]

## Testing Instructions
[How to run tests and validation]

## PR Instructions
[Pull request guidelines and checklists]

## Conflict Resolution
[How to handle conflicts and decision hierarchies]

## Example Commands
[Common development tasks and commands]
```

### Available Agent Files

| File | Purpose | Scope |
|------|---------|-------|
| `AGENTS.md` | CopilotCustomizer project guidance | Repository-wide development workflow |

---

## 📄 Templates

**Purpose**: Standardized document formats for consistent analysis and planning  
**Location**: `.github/templates/`  
**File Pattern**: `*.template.md`

### Structure Requirements

**Markdown format with structured sections** - No YAML front matter required

### Available Templates

| File | Purpose | Use Case |
|------|---------|----------|
| `Analysis.template.md` | Universal analysis framework | Project analyses, audits, assessments |
| `ImplementationPlan.template.md` | Implementation planning format | Project planning and execution |
| `OrchestrationPlan.template.md` | Orchestrated system plan tracking | Conductor plan file generation |
| `ChangeLog.template.md` | Change documentation format | Release notes, PR descriptions, migration guides |

---

## 🔗 Asset Relationships & Harmonization

### Cross-Reference Patterns

The CopilotCustomizer framework uses a comprehensive harmonization system:

```
Instructions ←→ Prompts (Paired execution)
    ↕                ↕
Custom Agent ←→ Agent Files (Contextual binding)
```

### Binding Relationships

| Instruction File | Paired Prompt | Agent Mode | Purpose |
|------------------|---------------|------------|---------|
| `GenerateAgentsFile.instructions.md` | `NewAgentsFile.prompt.md` | CopilotCustomizer | Workspace AGENTS.md creation |
| `GenerateCopilotAgent.instructions.md` | `NewCopilotAgent.prompt.md` | CopilotCustomizer | VS Code .agent.md creation |
| `GenerateInstructions.instructions.md` | `NewInstructions.prompt.md` | CopilotCustomizer | Instruction file creation |
| `GeneratePrompt.instructions.md` | `NewPrompt.prompt.md` | CopilotCustomizer | Prompt file creation |
| `GenerateWorkflow.instructions.md` | `NewWorkflow.prompt.md` | CopilotCustomizer | Multi-agent workflow creation |
| `GenerateOrchestratedSystem.instructions.md` | `NewWorkflowSystem.prompt.md` | CopilotCustomizer | Orchestrated system generation |
| `HarmonizeAssets.instructions.md` | `HarmonizeAndValidate.prompt.md` | CopilotCustomizer | Harmonization + validation |
| `OptimizeAndFormat.instructions.md` | `OptimizeAndFormat.prompt.md` | CopilotCustomizer | Optimization + formatting |
| `RepoReview.instructions.md` | `RepoReview.prompt.md` | CopilotCustomizer | Repository analysis |

---

## 📊 Asset Inventory

To avoid inventory drift, treat the folders as the source of truth:

- Prompts: `.github/prompts/`
- Instructions: `.github/instructions/`
- Agents: `.github/agents/`
- Skills: `.github/skills/`
- Standards: `.github/standards/`
- Templates: `.github/templates/`

---

## 🔧 Usage Workflows

### Asset Creation Workflow

1. **Choose Asset Type**: Select from custom agent, instructions, prompt, or agent
2. **Use Generation Pair**: Apply instruction + prompt combination
3. **Customize Variables**: Provide inline variables in the slash command  
4. **Execute**: Run the workflow via slash command (see HOW-TO cheat sheet)
5. **Validate Output**: Check schema compliance and functionality

### Asset Maintenance Workflow

1. **Audit Repository**: Use `/RepoReview` for analysis
2. **Identify Improvements**: Apply gap analysis recommendations
3. **Optimize + Format**: Use `/OptimizeAndFormat`
4. **Harmonize + Validate**: Use `/HarmonizeAndValidate`

### Quality Assurance Workflow

1. **Schema Validation**: Ensure YAML front matter compliance
2. **Cross-Reference Check**: Verify asset binding integrity  
3. **Functionality Test**: Execute assets in clean VS Code environment
4. **Documentation Review**: Validate examples and usage instructions
5. **Performance Optimization**: Apply token efficiency improvements

---

## 📚 Best Practices

### File Organization
- Keep related assets in appropriate subdirectories
- Use consistent naming conventions (`PascalCase.type.md`)
- Maintain clear separation between generation and management assets
- Group templates separately from executable assets

### Schema Compliance
- Always include required YAML fields only (`description` for agents, `applyTo` for instructions)
- Avoid unsupported YAML properties; place any depth modes or refinement metadata in the Markdown body, not in front matter
- Follow VS Code Copilot schema specifications exactly
- Validate YAML syntax before committing

### Cross-Reference Integrity
- Maintain bidirectional links between paired assets
- Use relative paths for internal references
- Include harmony metadata in coordinated assets
- Test all cross-references for accuracy

### Version Management
- Document version compatibility in asset headers
- Maintain backward compatibility when possible
- Use semantic versioning for major framework updates

---

## 🔍 Troubleshooting

### Common Issues

**Asset Not Loading**
- Check YAML front matter syntax
- Verify file is in correct directory (`.github/agents/`, `.github/instructions/`, `.github/prompts/`)
- Ensure file extension matches pattern (`*.agent.md`, etc.)

**Custom Agent Not Available**  
- Confirm `description` field is present in YAML
- Verify VS Code has detected the customization
- Restart VS Code if customizations don't appear
- Check VS Code Copilot extension is active

**Instructions Auto-Loading**
- Review `applyTo` pattern scope (avoid overly broad patterns like `**`)
- Use specific targeting for reference-only instructions
- Consider reference-only patterns for framework instructions

**Cross-References Broken**
- Validate all internal links use correct relative paths
- Ensure referenced files exist and are properly named
- Check for typos in file references
- Use file search to verify target file locations

### Validation Commands

```bash
# Check file existence and naming
find .github -name "*.agent.md" -o -name "*.instructions.md" -o -name "*.prompt.md"

# Validate YAML front matter (requires yq or similar)
for file in .github/**/*.md; do
  echo "Checking $file"
  head -20 "$file" | grep -A 10 "^---$"
done

# Test asset loading in VS Code Copilot Chat
# Access CopilotCustomizer mode when agent extensions become available
```

---

## 📈 Schema Compliance

### VS Code Copilot Requirements

This framework complies with **VS Code Copilot Customization v1.108** standards (backwards compatible with v1.106+):

- **Custom Agents**: Required `description`, optional `target`, `name`, `argument-hint`, `tools`, `model`, `handoffs`, `mcp-servers` (VS Code 1.106+; enhanced in 1.108)
- **Instructions**: Required `applyTo` and `description` fields
- **Prompts**: Optional `mode` binding, structured YAML front matter
- **File Organization**: Standard `.github/` directory structure
- **Cross-References**: Relative path linking between assets

### Framework Extensions

Beyond basic compliance, this framework adds:

- **Harmonization Metadata**: Cross-reference binding and version tracking
- **Depth Modes**: Multi-level interaction support (`quick-advice`, `standard`, `deep-architecture`)
- **Refinement Commands**: Interactive improvement capabilities
- **Universal Compatibility**: Repository-agnostic helper assets
- **Template System**: Standardized document generation

---

## 🚀 Advanced Features

### Depth Mode Support

Most assets support multiple interaction levels; document these in the Markdown body (not YAML front matter):

```yaml
depthModes:
  - "quick-advice"    # Fast, focused responses (3-5 bullets)
  - "standard"        # Complete analysis and recommendations  
  - "deep-architecture" # Comprehensive system design and governance
```

### Refinement Commands

Document refinement commands in the Markdown body (not YAML front matter):

```yaml
refinementCommands:
  - "refine: audit"     # Re-run analysis with updated context
  - "refine: optimize"  # Focus on performance and maintainability
  - "refine: concise"   # Generate executive summary
  - "refine: prompts"   # Optimize prompt structure and tokens
```

### Universal Compatibility

Some assets (like `AgentResume.prompt.md`) are designed for cross-repository usage:

- No external dependencies or framework requirements
- Repository-agnostic variable patterns  
- Universal custom agent compatibility (no `mode` field)
- Self-contained functionality

---

## 📞 Support & Resources

### Documentation
- **[HOW-TO.md](../HOW-TO.md)** - Comprehensive usage guide
- **[AGENTS.md](AGENTS.md)** - Architecture and asset inventory
- **[VS Code Copilot Docs](https://code.visualstudio.com/docs/copilot/customization/overview)** - Official Microsoft documentation

### Technical Support
- **Internal Issue Tracking** - Report bugs and request features
- **Internal Documentation Portal** - Enterprise knowledge base
- **Technical Training** - Custom asset development and best practices

---

## 📄 License & Attribution

**License**: MIT - See [LICENSE](../LICENSE) for full text  
**Framework**: CopilotCustomizer v1.0  
**Compliance**: VS Code GitHub Copilot Customization Standards v1.108 (v1.106+ compatible)  
**Generated**: 2026-01-31 via Asset Reference Documentation Framework

---

*This documentation is automatically maintained and updated as part of the CopilotCustomizer framework.*