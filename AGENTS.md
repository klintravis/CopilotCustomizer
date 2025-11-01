# CopilotCustomizer

A comprehensive VS Code GitHub Copilot customization framework for asset generation, harmonization, formatting, and optimization.

## Quick Start

### Install & Setup
```bash
# No installation required - works with existing VS Code + Copilot
# Copy .github/ folder to your project or use directly

# Verify setup in VS Code
# Open Copilot Chat (Ctrl+Shift+I) and access CopilotCustomizer mode
```

### Asset Validation
```bash
# Use CopilotCustomizer chat mode:
# "refine: audit" - Validate all assets
# "Audit only the chat modes" - Check specific types
# "Validate syntax of all instruction files" - Schema validation
```

### Generate New Assets
```bash
# Use CopilotCustomizer chat mode:
# "Create a security-focused code reviewer mode"
# "Generate instructions for React component testing"
# "I need a prompt for API documentation generation"
```

## Code Style
- **YAML**: `applyTo` (required for instructions), `description` (optional)
- **Markdown**: H2 main sections, H3 subsections
- **References**: `[filename](path/to/file.md)`
- **Naming**: `PascalCase.{agent|instructions|prompt}.md`

## Testing
```bash
# Use CopilotCustomizer chat mode:
# "refine: audit" - Run validation
# "Verify all assets follow latest schema requirements" - Schema check
```

## PR Instructions
**Title**: `[CopilotCustomizer] Brief description`

**Checklist**:
- [ ] Schema validation passes (run "refine: audit" in CopilotCustomizer mode)
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
# Generation (use CopilotCustomizer chat mode)
# "Create a database optimization expert mode"

# Maintenance
Use FormatAssets.prompt.md with INPUT_FILE and OUTPUT_FOLDER
Use RepoReview.prompt.md for analysis

# Quality (use CopilotCustomizer chat mode)
# "refine: optimize"
```

---
**Version**: v1.0 | **Framework**: VS Code GitHub Copilot Customization