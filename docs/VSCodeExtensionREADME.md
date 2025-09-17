# Copilot Customizer VS Code Extension

This extension brings CopilotCustomizer workflows (generate, harmonize, format, optimize) directly into VS Code.

## Features
- Command palette actions to open generator prompts
- Asset Explorer view for `.github` and `output`
- Optimization & validation stubs
- Webview quick launcher for generation prompts

## Getting Started
1. Install dependencies
2. Launch the extension host

```powershell
npm install
npm run compile ; code --extensionDevelopmentPath "$pwd"
```

Use the `Run Extension` launch configuration.

## Commands
- Copilot Customizer: Generate Chat Mode
- Copilot Customizer: Generate Instructions
- Copilot Customizer: Generate Prompt
- Copilot Customizer: Harmonize Assets
- Copilot Customizer: Validate Assets
- Copilot Customizer: Optimize Assets
- Copilot Customizer: Open Asset Generator

## Views
- Activity Bar: Copilot Customizer → Asset Explorer

## Next
- Schema-backed validation
- Harmonization and format automation
- Tests and CI, marketplace packaging
