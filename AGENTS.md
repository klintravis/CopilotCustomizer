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
- **YAML**: `applyTo` (required for instructions), `description` (optional)
- **Markdown**: H2 main sections, H3 subsections
- **References**: `[filename](path/to/file.md)`
- **Naming**: `PascalCase.{chatmode|instructions|prompt|agent}.md`

## Testing
```bash
@CopilotCustomizer refine: audit
@CopilotCustomizer Verify all assets follow latest schema requirements
```## PR Instructions
**Title**: `[CopilotCustomizer] Brief description`

**Checklist**:
- [ ] Schema validation passes (`@CopilotCustomizer refine: audit`)
- [ ] Cross-references intact
- [ ] Documentation updated
- [ ] No broken links

**Modification Rules**: Preserve cross-references, maintain schema compliance, test in clean VS Code environment

## Conflict Resolution
1. Explicit Chat Instructions
2. Nearest AGENTS.md
3. Global Instructions

## Example Commands
```bash
# Generation
@CopilotCustomizer Create a database optimization expert mode

# Maintenance
Use FormatAssets.prompt.md with INPUT_FILE and OUTPUT_FOLDER
Use RepoReview.prompt.md for analysis

# Quality
@CopilotCustomizer refine: optimize
```

---
**Version**: v1.0 | **Framework**: VS Code GitHub Copilot Customization