# CopilotCustomizer VS Code Extension Transformation Plan

## 1. Project Analysis & Feature Mapping

- **Purpose**: Enable asset generation, harmonization, formatting, and optimization for Copilot workflows directly within VS Code.
- **Core Features**:
  - Asset validation (audit, schema compliance, cross-reference checks)
  - Asset generation (chat modes, instructions, prompts)
  - Asset harmonization and formatting
  - Integration/testing workflows
  - PR and maintenance guidance

## 2. Extension Architecture Design

### A. Manifest (`package.json`)
- **Commands**:
  - `copilotCustomizer.generateChatMode`
  - `copilotCustomizer.generateInstructions`
  - `copilotCustomizer.generatePrompt`
  - `copilotCustomizer.harmonizeAssets`
  - `copilotCustomizer.validateAssets`
  - `copilotCustomizer.optimizeAssets`
- **Menus**: Command Palette, context menus for asset files.
- **Views**: Custom tree view for `.github/` and `output/` folders.
- **Configuration**: Settings for asset output paths, schema versions, validation strictness.
- **Activation Events**: Prefer `onCommand:` for performance.

### B. Extension Entry Point (`src/extension.ts`)
- **Activate/Deactivate**: Register commands, initialize tree views, set up event listeners.
- **Command Handlers**: Logic for each command (generation, validation, harmonization).
- **Context Management**: Track workspace folders, asset changes, user configuration.

### C. UI Components
- **Tree View**: Browse `.github/` and `output/` assets, context actions (edit, validate, harmonize).
- **Webview Panel**: Interactive asset generator (form-based UI).
- **Quick Pick Dialogs**: Select asset types, templates, refinement commands.
- **Status Bar Item**: Show CopilotCustomizer status, quick actions, validation results.

## 3. Feature Implementation Plan

### A. Asset Generation
- Command palette actions for generating chat modes, instructions, prompts.
- Webview for guided asset creation (form inputs, preview, save).

### B. Asset Validation & Harmonization
- Commands for repo audit, schema compliance, cross-reference checks.
- Context menu actions in tree view for validating/harmonizing assets.
- Display results in output channel or status bar.

### C. Asset Management UI
- Tree view for `.github/` and `output/` folders, showing asset types and validation status.
- Context menus for editing, validating, harmonizing, formatting assets.

### D. Integration & Testing Workflows
- Commands to run integration tests and audits.
- Debug configuration for extension development/testing.
- Show test results and optimization recommendations.

### E. PR & Maintenance Guidance
- Generate PR checklists and maintenance reports via command.
- Optional webview for interactive PR guidance and asset review.

## 4. Packaging & Publishing

- Configure TypeScript, webpack/esbuild for bundling.
- Include README, CHANGELOG, LICENSE, icon.
- Use `vsce` for packaging/publishing.
- Validate manifest and extension performance before release.

## 5. Quality & Compliance

- All commands/UI follow VS Code design guidelines.
- Validate extension against marketplace requirements.
- Optimize activation time and bundle size.
- Robust error handling and resource cleanup.

## 6. Recommended Folder Structure

```
CopilotCustomizer/
├── package.json
├── src/
│   ├── extension.ts
│   ├── commands/
│   ├── views/
│   └── utils/
├── resources/
├── test/
├── .vscode/
├── README.md
├── CHANGELOG.md
├── LICENSE
├── output/
└── .github/
```

## 7. Next Steps

1. Scaffold extension manifest and entry point.
2. Implement core commands and UI components.
3. Integrate asset generation, validation, harmonization logic.
4. Add testing, packaging, publishing workflows.
5. Refine UI/UX and optimize performance.
6. Validate and publish to the VS Code Marketplace.

---

This plan ensures all CopilotCustomizer functionality is elegantly integrated into a VS Code extension, providing a seamless developer experience for asset management and workflow optimization.
