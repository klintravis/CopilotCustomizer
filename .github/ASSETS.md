# CopilotCustomizer Assets Reference

> Comprehensive guide to .github folder assets: chat modes, instructions, prompts, and templates

[![Framework Version](https://img.shields.io/badge/Framework-v1.0-blue)](#version-information)
[![Schema Compliance](https://img.shields.io/badge/Schema-VS%20Code%20Copilot%20v1.101-green)](#schema-compliance)
[![Asset Coverage](https://img.shields.io/badge/Assets-16%20Types-orange)](#asset-inventory)

---

## 📋 Quick Reference

| Asset Type | File Pattern | Primary Purpose | Schema Requirements |
|------------|--------------|-----------------|---------------------|
| [Chat Modes](#chat-modes) | `*.chatmode.md` | AI personas and specialized behaviors | `description`, optional `tools` |
| [Instructions](#instructions) | `*.instructions.md` | AI behavior guidance and generation rules | `applyTo`, `description` |
| [Prompts](#prompts) | `*.prompt.md` | Structured interaction templates | `mode` (optional), YAML front matter |
| [Agent Files](#agent-files) | `AGENTS.md`, `*.agent.md` | Project-specific AI guidance | Markdown format, no YAML required |
| [Templates](#templates) | `*.template.md` | Standardized document formats | Markdown format, structured sections |

---

## 🎯 Chat Modes

**Purpose**: Define specialized AI personas for different development contexts  
**Location**: `.github/chatmodes/`  
**File Pattern**: `*.chatmode.md`

### Schema Requirements

```yaml
---
description: "Brief mode description for VS Code dropdown"
tools: []  # Optional: array of available tools
schemaVersion: "1.0"  # Optional: version tracking
depthModes: ["quick-advice", "standard", "deep-architecture"]  # Optional
refinementCommands: ["refine: audit", "refine: optimize"]  # Optional
---
```

### Structure Template

```markdown
## Copilot ChatMode: [Mode Name]

### Role
[Clear definition of the AI persona and expertise area]

### Core Objectives  
[Numbered list of primary goals and capabilities]

### Workflow
[Step-by-step process the AI should follow]

### Depth Modes
| Mode | Use Case | Output Characteristics |
|------|----------|------------------------|
| quick-advice | [Description] | [Brief output format] |
| standard | [Description] | [Standard output format] |  
| deep-architecture | [Description] | [Comprehensive output] |

### Refinement Commands
| Command | Action |
|---------|--------|
| refine: [command] | [What it does] |

### Guardrails
[Safety rules and limitations]

### Example Usage
[Sample interactions and expected responses]
```

### Available Chat Modes

| File | Mode Name | Specialization |
|------|-----------|----------------|
| `CopilotCustomizer.chatmode.md` | Customizer Architect | VS Code Copilot asset creation and optimization |

---

## 📝 Instructions

**Purpose**: Provide detailed AI behavior guidance and code generation rules  
**Location**: `.github/instructions/`  
**File Pattern**: `*.instructions.md`

### Schema Requirements

```yaml
---
applyTo: 'glob-pattern-for-files'  # Required: when to apply these instructions
description: 'Brief description of instruction purpose'  # Required
schemaVersion: "1.0"  # Optional: version tracking
refinementCommands: ["refine: command"]  # Optional: available commands
---
```

### Structure Template

```markdown
# [Instruction Name]

## Purpose
[Clear statement of what these instructions accomplish]

## Scope & Application
[When and where these instructions apply]

## Core Requirements
[Essential rules and constraints]

## Implementation Guidelines
[Step-by-step guidance for implementation]

## Quality Standards
[Standards for output quality and validation]

## Examples
[Concrete examples of expected behavior/output]

## Integration Points
[How this integrates with other assets]
```

### Available Instructions

| File | Purpose | Applies To |
|------|---------|------------|
| `AssetOptimization.instructions.md` | Asset optimization framework | `.github/prompts/AssetOptimization.prompt.md` |
| `FormatAssets.instructions.md` | Asset formatting standards | `**/*.{instructions.md,chatmode.md,prompt.md}` |
| `GenerateAgent.instructions.md` | Agent file creation framework | `**/*.agent.md` |
| `GenerateChatmode.instructions.md` | Chat mode creation framework | `**/*.chatmode.md` |
| `GenerateInstructions.instructions.md` | Instruction file creation framework | `**/*.instructions.md` |
| `GeneratePrompt.instructions.md` | Prompt file creation framework | `**/*.prompt.md` |
| `HarmonizeAssets.instructions.md` | Asset harmonization framework | `**/*.{instructions.md,prompt.md,chatmode.md}` |
| `RepoReview.instructions.md` | Repository analysis framework | `.github/prompts/RepoReview.prompt.md` |

---

## 🚀 Prompts

**Purpose**: Structured templates for consistent AI interactions and task execution  
**Location**: `.github/prompts/`  
**File Pattern**: `*.prompt.md`

### Schema Requirements

```yaml
---
mode: ChatModeName  # Optional: bind to specific chat mode
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
| `FormatAssets.prompt.md` | Asset formatting execution | CopilotCustomizer |
| `HarmonizeAssets.prompt.md` | Asset harmonization execution | CopilotCustomizer |
| `NewAgent.prompt.md` | Generate new agent files | CopilotCustomizer |
| `NewChatmode.prompt.md` | Generate new chat modes | CopilotCustomizer |
| `NewInstructions.prompt.md` | Generate new instruction files | CopilotCustomizer |
| `NewPrompt.prompt.md` | Generate new prompt files | CopilotCustomizer |
| `RepoReview.prompt.md` | Repository analysis execution | CopilotCustomizer |

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

| Instruction File | Paired Prompt | Chat Mode | Purpose |
|------------------|---------------|-----------|---------|
| `GenerateAgent.instructions.md` | `NewAgent.prompt.md` | CopilotCustomizer | Agent file creation |
| `GenerateChatmode.instructions.md` | `NewChatmode.prompt.md` | CopilotCustomizer | Chat mode creation |
| `GenerateInstructions.instructions.md` | `NewInstructions.prompt.md` | CopilotCustomizer | Instruction creation |
| `GeneratePrompt.instructions.md` | `NewPrompt.prompt.md` | CopilotCustomizer | Prompt creation |
| `HarmonizeAssets.instructions.md` | `HarmonizeAssets.prompt.md` | CopilotCustomizer | Asset integration |
| `FormatAssets.instructions.md` | `FormatAssets.prompt.md` | CopilotCustomizer | Asset formatting |
| `AssetOptimization.instructions.md` | `AssetOptimization.prompt.md` | CopilotCustomizer | Asset optimization |
| `RepoReview.instructions.md` | `RepoReview.prompt.md` | CopilotCustomizer | Repository analysis |

---

## 📊 Asset Inventory

### Generation Assets (8 files)
- **Instructions**: 4 files for creating new assets
- **Prompts**: 4 files for executing creation workflows

### Management Assets (8 files)  
- **Instructions**: 4 files for maintaining existing assets
- **Prompts**: 4 files for executing maintenance workflows

### Supporting Assets
- **Chat Mode**: 1 comprehensive architect persona
- **Agent File**: 1 project guidance document
- **Templates**: 3 standardized document formats
- **Universal Helper**: 1 repository-agnostic prompt

**Total**: 16 core assets + 3 templates + 1 universal helper = **20 total assets**

---

## 🔧 Usage Workflows

### Asset Creation Workflow

1. **Choose Asset Type**: Select from chat mode, instructions, prompt, or agent
2. **Use Generation Pair**: Apply instruction + prompt combination
3. **Customize Variables**: Fill in project-specific details  
4. **Execute via Chat Mode**: Run through `@CopilotCustomizer`
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
- Verify file is in correct directory (`.github/chatmodes/`, `.github/instructions/`, `.github/prompts/`)
- Ensure file extension matches pattern (`*.chatmode.md`, etc.)

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
find .github -name "*.chatmode.md" -o -name "*.instructions.md" -o -name "*.prompt.md"

# Validate YAML front matter (requires yq or similar)
for file in .github/**/*.md; do
  echo "Checking $file"
  head -20 "$file" | grep -A 10 "^---$"
done

# Test asset loading in VS Code
# Open Copilot Chat and run: @CopilotCustomizer help
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

### Community  
- **GitHub Issues** - Report bugs and request features
- **GitHub Discussions** - Community questions and ideas
- **Pull Requests** - Contribute improvements and new assets

### Professional Support
- **GitHub Sponsors** - Support ongoing development
- **PayPal Donations** - One-time contributions
- **Enterprise Consulting** - Custom asset development and training

---

## 📄 License & Attribution

**License**: MIT - See [LICENSE](../LICENSE) for full text  
**Framework**: CopilotCustomizer v1.0  
**Compliance**: VS Code GitHub Copilot Customization Standards v1.101  
**Generated**: 2025-09-15 via Asset Reference Documentation Framework

---

*This documentation is automatically maintained and updated as part of the CopilotCustomizer framework.*