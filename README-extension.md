# Copilot Customizer VS Code Extension (Work in Progress)

This extension integrates the CopilotCustomizer asset framework into VS Code.

## Run the Extension

1. Install dependencies
2. Launch the Extension Host

```powershell
npm install
npm run compile ; code --extensionDevelopmentPath "$pwd"
```

Use the "Run Extension" launch configuration to debug.

## Features (Initial)
- Command palette generators for Chat Mode, Instructions, Prompt
- Asset Explorer view for `.github/` and `output/`
- Optimization/Validation command stubs
- Webview to open generation prompts quickly

## Commands
- `Copilot Customizer: Generate Chat Mode`
- `Copilot Customizer: Generate Instructions`
- `Copilot Customizer: Generate Prompt`
- `Copilot Customizer: Harmonize Assets`
- `Copilot Customizer: Validate Assets`
- `Copilot Customizer: Optimize Assets`

## Next Steps
- Wire real validation against schemas
- Implement harmonization workflow
- Add tests and CI
- Bundle and publish with `vsce`
