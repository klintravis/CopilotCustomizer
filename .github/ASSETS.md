# CopilotCustomizer Assets Reference

| Asset Type | Pattern | Purpose | Required YAML |
|------------|---------|---------|---------------|
| Agent Files | `*.agent.md` | VS Code agents | `description` |
| Instructions | `*.instructions.md` | AI guidance rules | `applyTo` |
| Prompts | `*.prompt.md` | Interaction templates | - |
| AGENTS.md | `AGENTS.md` | Project guidance | - |
| Templates | `*.template.md` | Document formats | - |

## Agent Files (`*.agent.md`)
**Location**: `.github/agents/` | **YAML**: `description` (required), `tools`, `model`, `handoffs` (optional)

```markdown
## [Agent Name] (v[Version])
### Role
### Core Objectives
### Workflow
### Tool Configuration
### Handoff Workflows
```

**Available**: `CopilotCustomizer.agent.md`, `RepoAnalyzer.agent.md`, `ImplementationPlanner.agent.md`, `ChangeExecutor.agent.md`, `VerificationAgent.agent.md`, `DocumentationGenerator.agent.md`

## Instructions (`*.instructions.md`)
**Location**: `.github/instructions/` | **YAML**: `applyTo` (required), `description` (optional)

```markdown
## [Name] Instructions (v[Version])
### Objective
### Constraints  
### Workflow
### Standards
```

**Available**: AssetOptimization, FormatAssets, GenerateAgentsFile, GenerateCopilotAgent, GenerateInstructions, GeneratePrompt, GenerateWorkflow, HarmonizeAssets, RepoReview, CopilotFramework, CopilotAudit, CopilotSecurity

## Prompts (`*.prompt.md`)
**Location**: `.github/prompts/` | **YAML**: `agent` or `mode` (optional)

```markdown
## [Name] Prompt (v[Version])
### Task Intent
### Usage Instructions
### Variable Block
### Validation Rules
```

**Available**: AgentResume, AssetOptimization, BootstrapRepo, FormatAssets, FormatAndVerifyAssets, HarmonizeAssets, HarmonizeAndValidate, NewAgentsFile, NewCopilotAgent, NewInstructions, NewPrompt, NewWorkflow, PromptAndInstructionOptimizer, QuickChange, RepoReview, SecurityToolingAudit, UpdateCopilotCustomizer, WorkflowIntegrityCheck
schemaVersion: "1.0"  # Optional: version tracking  
depthModes: ["standard", "detailed"]  # Optional: supported depth levels
refinementCommands: ["refine: focus"]  # Optional: available commands
---
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
| `AgentResume.prompt.md` | Universal agent workflow helper | None (universal) |
| `AssetOptimization.prompt.md` | Asset optimization execution | CopilotCustomizer |
| `BootstrapRepo.prompt.md` | Complete repository setup workflow | BootstrapRepo |
| `FormatAssets.prompt.md` | Asset formatting execution | CopilotCustomizer |
| `FormatAndVerifyAssets.prompt.md` | Format and validate assets in one pass | CopilotCustomizer |
| `HarmonizeAssets.prompt.md` | Asset harmonization execution | CopilotCustomizer |
| `HarmonizeAndValidate.prompt.md` | Harmonize and validate 2-3 assets | CopilotCustomizer |
| `NewAgentsFile.prompt.md` | Generate workspace AGENTS.md | CopilotCustomizer |
| `NewCopilotAgent.prompt.md` | Generate VS Code .agent.md | CopilotCustomizer |
| `NewInstructions.prompt.md` | Generate instruction files | CopilotCustomizer |
| `NewPrompt.prompt.md` | Generate prompt files | CopilotCustomizer |
| `NewWorkflow.prompt.md` | Generate multi-agent workflows | CopilotCustomizer |
| `PromptAndInstructionOptimizer.prompt.md` | Optimize prompts and instructions | CopilotCustomizer |
| `QuickChange.prompt.md` | Fast minimal-diff change workflow | CopilotCustomizer |
| `RepoReview.prompt.md` | Repository analysis execution | CopilotCustomizer |
| `SecurityToolingAudit.prompt.md` | Audit tool approvals and MCP trust | CopilotCustomizer |
| `UpdateCopilotCustomizer.prompt.md` | CopilotCustomizer change workflow | CopilotCustomizer |
| `WorkflowIntegrityCheck.prompt.md` | Validate workflow handoffs and links | CopilotCustomizer |

---

## 🤖 Agent Files

**Purpose**: Project-specific AI guidance and development workflow instructions  
**Location**: Repository root or `.github/`  
**File Pattern**: `AGENTS.md`, `*.agent.md`

### Schema Requirements

**No YAML front matter required** - Pure Markdown format

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
| `ProgressLog.template.md` | Progress tracking format | Status updates and milestone tracking |
| `TestStrategy.template.md` | Test planning and validation | TDD workflows, test coverage, QA strategies |
| `SecurityReview.template.md` | Security assessment format | Code reviews, vulnerability scans, OWASP audits |
| `ChangeLog.template.md` | Change documentation format | Release notes, PR descriptions, migration guides |
| `AssetInventory.template.md` | Asset catalog format | Repository audits, asset tracking, compliance |

---

## 🔗 Asset Relationships & Harmonization

### Cross-Reference Patterns

The CopilotCustomizer framework uses a comprehensive harmonization system:

```
Instructions ←→ Prompts (Paired execution)
    ↕                ↕
Chat Mode ←→ Agent Files (Contextual binding)
```

### Binding Relationships

| Instruction File | Paired Prompt | Agent Mode | Purpose |
|------------------|---------------|------------|---------|
| `GenerateAgentsFile.instructions.md` | `NewAgentsFile.prompt.md` | CopilotCustomizer | Workspace AGENTS.md creation |
| `GenerateCopilotAgent.instructions.md` | `NewCopilotAgent.prompt.md` | CopilotCustomizer | VS Code .agent.md creation |
| `GenerateInstructions.instructions.md` | `NewInstructions.prompt.md` | CopilotCustomizer | Instruction file creation |
| `GeneratePrompt.instructions.md` | `NewPrompt.prompt.md` | CopilotCustomizer | Prompt file creation |
| `GenerateWorkflow.instructions.md` | `NewWorkflow.prompt.md` | CopilotCustomizer | Multi-agent workflow creation |
| `HarmonizeAssets.instructions.md` | `HarmonizeAssets.prompt.md` | CopilotCustomizer | Asset integration |
| `FormatAssets.instructions.md` | `FormatAssets.prompt.md` | CopilotCustomizer | Asset formatting |
| `AssetOptimization.instructions.md` | `AssetOptimization.prompt.md` | CopilotCustomizer | Asset optimization |
| `RepoReview.instructions.md` | `RepoReview.prompt.md` | CopilotCustomizer | Repository analysis |

---

## 📊 Asset Inventory

### Generation Assets (10 files)
- **Instructions**: 5 files for creating new assets
- **Prompts**: 5 files for executing creation workflows

### Management Assets (8 files)  
- **Instructions**: 4 files for maintaining existing assets
- **Prompts**: 4 files for executing maintenance workflows

### Supporting Assets
- **Agent Files**: 6 specialized VS Code agents
- **Workspace File**: 1 project guidance document (AGENTS.md)
- **Templates**: 7 standardized document formats
- **Universal Helper**: 1 repository-agnostic prompt

**Total**: 16 core assets + 7 templates + 1 universal helper = **24 total assets**

---

## 🔧 Usage Workflows

### Asset Creation Workflow

1. **Choose Asset Type**: Select from chat mode, instructions, prompt, or agent
2. **Use Generation Pair**: Apply instruction + prompt combination
3. **Customize Variables**: Fill in project-specific details  
4. **Execute Prompt**: Use structured workflow from prompt file
5. **Validate Output**: Check schema compliance and functionality

### Asset Maintenance Workflow

1. **Audit Repository**: Use `RepoReview.prompt.md` for analysis
2. **Identify Improvements**: Apply gap analysis recommendations
3. **Apply Optimizations**: Use `AssetOptimization.prompt.md`
4. **Format for Standards**: Use `FormatAssets.prompt.md`
5. **Harmonize Integration**: Use `HarmonizeAssets.prompt.md`

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
- Always include required YAML fields (`applyTo`, `description` for instructions)
- Use optional fields for enhanced functionality (`schemaVersion`, `depthModes`)
- Follow VS Code Copilot schema specifications exactly
- Validate YAML syntax before committing

### Cross-Reference Integrity
- Maintain bidirectional links between paired assets
- Use relative paths for internal references
- Include harmony metadata in coordinated assets
- Test all cross-references for accuracy

### Version Management
- Update `schemaVersion` when making breaking changes
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

**Chat Mode Not Available**  
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

This framework complies with **VS Code Copilot Customization v1.101** standards:

- **Chat Modes**: Required `description`, optional `tools` array
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

Most assets support multiple interaction levels:

```yaml
depthModes:
  - "quick-advice"    # Fast, focused responses (3-5 bullets)
  - "standard"        # Complete analysis and recommendations  
  - "deep-architecture" # Comprehensive system design and governance
```

### Refinement Commands

Interactive commands for iterative improvement:

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
- Universal chat mode compatibility (no `mode` field)
- Self-contained functionality

---

## 📞 Support & Resources

### Documentation
- **[HOW-TO.md](../HOW-TO.md)** - Comprehensive usage guide
- **[AGENTS.md](../AGENTS.md)** - Project development guidance
- **[VS Code Copilot Docs](https://code.visualstudio.com/docs/copilot/customization/overview)** - Official Microsoft documentation

### Technical Support
- **Internal Issue Tracking** - Report bugs and request features
- **Internal Documentation Portal** - Enterprise knowledge base
- **Technical Training** - Custom asset development and best practices

---

## 📄 License & Attribution

**License**: MIT - See [LICENSE](../LICENSE) for full text  
**Framework**: CopilotCustomizer v1.0  
**Compliance**: VS Code GitHub Copilot Customization Standards v1.101  
**Generated**: 2025-09-15 via Asset Reference Documentation Framework

---

*This documentation is automatically maintained and updated as part of the CopilotCustomizer framework.*