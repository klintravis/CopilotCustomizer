# CopilotCustomizer

A comprehensive VS Code GitHub Copilot customization framework for asset generation, harmonization, formatting, and optimization.

## Quick Start

### Install & Setup
```bash
# No installation required - works with existing VS Code + Copilot
# Copy .github/ folder to your project or use directly

# Verify setup in VS Code
# Open Copilot Chat (Ctrl+Shift+I) and test:
@CopilotCustomizer help
```

### Asset Validation
```bash
# Validate all assets in repository
@CopilotCustomizer refine: audit

# Check specific asset types
@CopilotCustomizer Audit only the chat modes in this repository
@CopilotCustomizer Validate syntax of all instruction files
```

### Generate New Assets
```bash
# Create chat mode
@CopilotCustomizer Create a security-focused code reviewer mode

# Generate instructions
@CopilotCustomizer Generate instructions for React component testing

# Build prompt template
@CopilotCustomizer I need a prompt for API documentation generation
```

## Code Style

### Asset Structure Requirements
- **Front Matter**: YAML with `applyTo`, `schemaVersion`, optional `refinementCommands`/`depthModes`
- **Markdown Format**: H2 for main sections, H3 for subsections, consistent heading hierarchy
- **Cross-References**: Use `[filename](path/to/file.md)` format for internal links
- **Binding Comments**: `<!-- Harmony: ... -->` for injected harmonization content

### Schema Compliance
- Chat modes: `description`, optional `schemaVersion`, `tools`, `depthModes`
- Instructions: `applyTo` required, `schemaVersion` recommended
- Prompts: `mode` specification (ask/agent/generate), variable blocks with `{VAR_NAME}`
- All files: Consistent refinement commands, proper version tracking

### File Naming Conventions
| Asset Type | Pattern | Example |
|------------|---------|---------|
| Chat Modes | `PascalCase.chatmode.md` | `CopilotCustomizer.chatmode.md` |
| Instructions | `PascalCase.instructions.md` | `FormatAssets.instructions.md` |
| Prompts | `PascalCase.prompt.md` | `NewAgent.prompt.md` |
| Agent Files | `AGENTS.md` | `AGENTS.md` |

## Testing Instructions

### Asset Validation Commands
```bash
# Full repository audit
@CopilotCustomizer refine: audit

# Schema compliance check
@CopilotCustomizer Verify all assets follow latest schema requirements

# Cross-reference validation
@CopilotCustomizer Check for broken references between assets

# Performance optimization
@CopilotCustomizer refine: optimize
```

### Integration Testing
- Test each asset individually in clean VS Code environment
- Verify depth modes and refinement commands function correctly
- Validate cross-references resolve properly
- Check asset interactions and binding workflows

### Continuous Validation
- Use `RepoReview.prompt.md` for automated repository analysis
- Run asset audits before committing changes
- Validate schema compliance after updates

## PR Instructions

### Title Format
```
[CopilotCustomizer] Brief description of changes
```

### Pre-Commit Checklist
- [ ] Asset schema validation passes (`@CopilotCustomizer refine: audit`)
- [ ] Cross-references remain intact and functional
- [ ] Documentation updated for new features or changes
- [ ] Version numbers updated appropriately
- [ ] No broken links or missing files introduced

### Asset Modification Rules
- Preserve all existing cross-references and bindings
- Maintain schema compliance with current versions
- Update related assets when making changes (use `HarmonizeAssets.prompt.md`)
- Test functionality in clean VS Code environment

## Conflict Resolution

**Agent Guidance Hierarchy**:
1. **Explicit Chat Instructions** - Direct commands in Copilot Chat take precedence
2. **Nearest AGENTS.md** - This file for project-specific guidance
3. **Global Instructions** - `.github/instructions/*.instructions.md` files as fallback

When conflicts arise, follow the hierarchy above. Chat-level refinement commands override file-based instructions.

## Example Commands

### Asset Generation Workflow
```bash
# 1. Generate new chat mode
@CopilotCustomizer Create a database optimization expert mode

# 2. Create supporting instructions
@CopilotCustomizer Generate instructions for PostgreSQL performance tuning

# 3. Build prompt template
@CopilotCustomizer Use NewPrompt template for database query optimization

# 4. Harmonize assets for integration
Use HarmonizeAssets.prompt.md with:
INPUT_FILES: "database-expert.chatmode.md, db-optimization.instructions.md, query-tuning.prompt.md"
OUTPUT_DIRECTORY: ".github/output"
```

### Maintenance Workflows
```bash
# Format assets for latest standards
Use FormatAssets.prompt.md with:
INPUT_FILE: ".github/chatmodes/CopilotCustomizer.chatmode.md"
OUTPUT_FOLDER: ".github/output"

# Repository analysis and optimization
Use RepoReview.prompt.md with:
TARGET_PATH: "."
FOCUS_AREA: "all assets"

# Asset harmonization
Use HarmonizeAssets.prompt.md with multiple files for cross-reference binding
```

### Quality Assurance
```bash
# Comprehensive audit
@CopilotCustomizer Run complete repository analysis with optimization recommendations

# Standards compliance
@CopilotCustomizer Apply latest VS Code Copilot formatting standards to all assets

# Performance optimization  
@CopilotCustomizer refine: optimize
```

---

**Version**: v1.0  
**Framework**: VS Code GitHub Copilot Customization  
**Asset Types**: Chat Modes, Instructions, Prompts, Agent Files  
**Workflows**: Generation, Harmonization, Formatting, Optimization