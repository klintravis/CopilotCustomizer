---
applyTo: '**'
description: 'Comprehensive instructions for converting CopilotCustomizer repository into a VS Code extension with best practices, API integration, and marketplace publishing workflows'
---

# VSCode Extension Development Instructions for CopilotCustomizer (v1.0)

<!-- Harmony Metadata -->
**Harmonization**: comprehensive-harmony-v1.0 (2025-01-27)  
**Harmonized With**: [VSCodeExtensionArchitect.chatmode.md](../../.github/chatmodes/VSCodeExtensionArchitect.chatmode.md)  
**Binding Version**: 1.0 | **Preservation Level**: medium

**Output Path**: CopilotCustomizer/output/instructions/VSCodeExtensionArchitect - instructions - 2025-01-27.md  
**Generated At**: 2025-01-27T10:30:00Z  
**Source Instruction**: instructions/GenerateInstructions.instructions.md  
**Type**: instructions

## Context Overview

Transform the CopilotCustomizer repository (GitHub Copilot customization asset generator) into a fully-featured VS Code extension that provides UI-driven asset creation, management, and optimization workflows. This extension will expose the existing .github/ framework through VS Code's native interface with commands, views, and webview panels.

## Primary Objective

Create a VS Code extension that integrates CopilotCustomizer's asset generation capabilities directly into the VS Code interface, enabling developers to create, harmonize, format, and optimize GitHub Copilot customization assets through commands, tree views, and interactive panels without leaving their development environment.

## Project Constraints

### Tech Stack Requirements
- **Extension Framework**: VS Code Extension API v1.63.0+ (for pre-release support)
- **Language**: TypeScript 4.9+ with strict mode enabled
- **Build System**: webpack 5+ for bundling, esbuild for development builds
- **Testing Framework**: @vscode/test-cli with Mocha for integration tests
- **Package Manager**: npm (compatibility with vsce publishing tool)
- **Bundle Size**: Target <2MB packaged extension size

### Performance Targets
- **Activation Time**: <500ms for extension activation on relevant workspace detection
- **Command Execution**: <1000ms for asset generation commands
- **File Operations**: <200ms for reading/writing asset files
- **UI Responsiveness**: <100ms response time for tree view and webview interactions

### Compliance Requirements
- **VS Code Marketplace**: Full compliance with marketplace publishing guidelines
- **Extension Manifest**: Complete package.json with all required contribution points
- **Security**: No execution of arbitrary code, secure webview content security policy
- **Accessibility**: WCAG 2.1 AA compliance for all contributed UI elements

## Architectural Conventions

### Extension Structure Pattern
Follow the standard VS Code extension architecture with clear separation of concerns:

```
src/
├── extension.ts              # Main activation entry point
├── commands/                 # Command implementations
│   ├── AssetCommands.ts     # Asset generation commands
│   ├── OptimizationCommands.ts
│   └── ValidationCommands.ts
├── providers/               # Tree data providers and view providers
│   ├── AssetTreeProvider.ts
│   ├── ProjectStructureProvider.ts
│   └── TemplateProvider.ts
├── webviews/               # Webview panel implementations
│   ├── AssetGeneratorPanel.ts
│   ├── HarmonizationPanel.ts
│   └── ValidationPanel.ts
├── utils/                  # Utility functions and helpers
│   ├── AssetParser.ts
│   ├── FileSystemUtils.ts
│   └── ValidationUtils.ts
└── types/                  # TypeScript type definitions
    ├── AssetTypes.ts
    └── ExtensionTypes.ts
```

### Component Integration Pattern
- **Command → Provider → Webview**: Commands trigger providers that update webviews
- **Tree View ↔ Webview**: Bidirectional communication for asset selection and editing
- **File System Watcher**: Monitor .github/ folder changes for automatic refreshes

## Coding Standards

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "Node16",
    "lib": ["ES2020"],
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### ESLint Configuration
- **Base**: @typescript-eslint/recommended
- **VS Code Specific**: Enforce vscode API usage patterns
- **Import Rules**: Strict import/export patterns for extension modules
- **Performance Rules**: No synchronous file operations in extension host

### Code Organization Principles
- **Single Responsibility**: Each command/provider handles one specific asset type
- **Dependency Injection**: Use VS Code's ExtensionContext for service registration
- **Error Boundaries**: Comprehensive error handling with user-friendly messages
- **Async/Await**: Consistent async patterns for all file operations

## Security & Compliance

### VS Code Extension Security Model
- **Webview CSP**: Strict Content Security Policy for all webview content
```javascript
const csp = `
  default-src 'none';
  script-src ${webview.cspSource} 'unsafe-inline';
  style-src ${webview.cspSource} 'unsafe-inline';
  font-src ${webview.cspSource};
`;
```

### File System Security
- **Workspace Boundary**: Restrict all operations to workspace folders
- **Path Validation**: Sanitize all file paths to prevent directory traversal
- **Permission Checks**: Verify write permissions before file operations
- **Backup Strategy**: Create backups before destructive operations

### Data Handling
- **No External Calls**: All operations performed locally within workspace
- **Configuration Storage**: Use VS Code's workspace/global state for settings
- **Temporary Files**: Clean up temporary files after operations complete

## Performance Expectations

### Extension Activation
- **Lazy Activation**: Use activation events to defer loading until needed
```json
{
  "activationEvents": [
    "workspaceContains:.github/chatmodes/*.chatmode.md",
    "workspaceContains:.github/instructions/*.instructions.md",
    "onCommand:copilotCustomizer.generateAsset"
  ]
}
```

### Memory Management
- **Tree View Optimization**: Virtual scrolling for large asset collections
- **Webview Lifecycle**: Dispose webviews when not visible to free memory
- **File Watching**: Debounce file system events to prevent excessive updates

### Bundle Optimization
- **Tree Shaking**: Eliminate unused VS Code API surface area
- **Code Splitting**: Separate webview bundles from extension host code
- **Asset Compression**: Minimize embedded templates and resources

## Testing Strategy

### Integration Test Structure
```typescript
// src/test/suite/extension.test.ts
import * as vscode from 'vscode';
import * as assert from 'assert';
import { getExtensionApi } from '../extension';

suite('Asset Generation Tests', () => {
  test('Should generate chat mode from template', async () => {
    const result = await vscode.commands.executeCommand(
      'copilotCustomizer.generateChatMode',
      { name: 'TestMode', domain: 'testing' }
    );
    assert.ok(result);
  });
});
```

### Testing Configuration (.vscode-test.js)
```javascript
const { defineConfig } = require('@vscode/test-cli');

module.exports = defineConfig({
  files: 'out/test/**/*.test.js',
  version: 'stable',
  workspaceFolder: './test-workspace',
  mocha: {
    ui: 'tdd',
    timeout: 10000
  }
});
```

### Test Coverage Targets
- **Unit Tests**: 90% code coverage for utility functions
- **Integration Tests**: 80% coverage for commands and providers
- **E2E Tests**: Complete workflows from UI interaction to file generation

## Tooling & Automation

### Development Workflow
```json
{
  "scripts": {
    "vscode:prepublish": "npm run package",
    "compile": "webpack --mode development",
    "watch": "webpack --mode development --watch",
    "package": "webpack --mode production --devtool hidden-source-map",
    "compile-tests": "tsc -p . --outDir out",
    "watch-tests": "tsc -p . -w --outDir out",
    "pretest": "npm run compile-tests && npm run compile",
    "test": "vscode-test",
    "lint": "eslint src --ext ts",
    "format": "prettier --write src/**/*.ts"
  }
}
```

### Build Configuration (webpack.config.js)
```javascript
const path = require('path');

module.exports = {
  target: 'node',
  mode: 'none',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: 'ts-loader'
    }]
  },
  devtool: 'nosources-source-map'
};
```

### Publishing Automation
- **vsce Integration**: Automated packaging and publishing pipeline
- **Version Management**: Semantic versioning with automatic changelog generation
- **Pre-release Channel**: Support for insiders/beta releases via --pre-release flag

## Documentation Requirements

### Extension Manifest (package.json)
```json
{
  "name": "copilot-customizer",
  "displayName": "Copilot Customizer",
  "description": "Create and manage GitHub Copilot customization assets",
  "version": "1.0.0",
  "publisher": "your-publisher-id",
  "engines": {
    "vscode": "^1.63.0"
  },
  "categories": ["Other"],
  "activationEvents": [],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "copilotCustomizer.generateChatMode",
        "title": "Generate Chat Mode",
        "category": "Copilot Customizer"
      }
    ],
    "views": {
      "copilot-customizer": [
        {
          "id": "assetExplorer",
          "name": "Asset Explorer",
          "when": "copilotCustomizerEnabled"
        }
      ]
    },
    "viewsContainers": {
      "activitybar": [
        {
          "id": "copilot-customizer",
          "title": "Copilot Customizer",
          "icon": "$(notebook)"
        }
      ]
    }
  }
}
```

### README.md Structure
- **Quick Start**: Installation and basic usage
- **Features**: Comprehensive feature list with screenshots
- **Commands**: All available commands with descriptions
- **Configuration**: Extension settings and customization options
- **Troubleshooting**: Common issues and solutions

## Review & Acceptance Criteria

### Definition of Done
- [ ] Extension activates successfully in VS Code workspace containing Copilot assets
- [ ] All asset generation commands (chatmode, instructions, prompt, agent) functional
- [ ] Asset tree view displays existing .github/ structure correctly  
- [ ] Harmonization workflow processes multiple assets without data loss
- [ ] Format validation applies VS Code Copilot schema requirements
- [ ] Optimization commands preserve functionality while improving structure
- [ ] Integration tests pass with 80%+ coverage
- [ ] Extension packages successfully with vsce
- [ ] Marketplace submission requirements met (icon, README, license)
- [ ] Performance targets achieved (activation <500ms, commands <1000ms)

### Quality Gates
- **Schema Compliance**: All generated assets pass VS Code Copilot validation
- **Error Handling**: Graceful degradation with user-friendly error messages
- **Accessibility**: WCAG 2.1 AA compliance for contributed UI elements
- **Security**: No security vulnerabilities in dependencies or extension code
- **Performance**: Bundle size under 2MB, activation time under 500ms

## Change Management

### Versioning Strategy
- **Semantic Versioning**: MAJOR.MINOR.PATCH following semver guidelines
- **Pre-release Support**: Use odd minor versions for pre-release (1.1.x, 1.3.x)
- **Release Channels**: Stable releases via marketplace, pre-release via --pre-release flag

### Migration Support
- **Backwards Compatibility**: Support existing .github/ asset structures
- **Configuration Migration**: Automatic migration of legacy configurations
- **Asset Upgrade**: Optional upgrade path for older asset formats

## Discovered Tools & Documentation Links

### VS Code Extension Development Framework
- **[Extension API Documentation](https://code.visualstudio.com/api)** - Complete API reference and guides
- **[Extension Samples Repository](https://github.com/microsoft/vscode-extension-samples)** - Official samples and templates
- **[Extension Manifest Reference](https://code.visualstudio.com/api/references/extension-manifest)** - Complete package.json schema
- **[Contribution Points](https://code.visualstudio.com/api/references/contribution-points)** - All contribution point types and schemas

### Development Tools & Testing
- **[@vscode/test-cli](https://www.npmjs.com/package/@vscode/test-cli)** - Modern testing framework for VS Code extensions
- **[@vscode/test-electron](https://www.npmjs.com/package/@vscode/test-electron)** - Test runner for integration tests
- **[Extension Test Runner](https://marketplace.visualstudio.com/items?itemName=ms-vscode.extension-test-runner)** - UI for running and debugging tests
- **[Testing Extensions Guide](https://code.visualstudio.com/api/working-with-extensions/testing-extension)** - Complete testing framework documentation

### Publishing & Distribution
- **[vsce (Visual Studio Code Extensions)](https://github.com/microsoft/vscode-vsce)** - CLI tool for packaging and publishing
- **[Publishing Extensions Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)** - Complete publishing workflow
- **[Marketplace Management](https://marketplace.visualstudio.com/manage)** - Publisher dashboard and extension management
- **[Azure DevOps Personal Access Tokens](https://learn.microsoft.com/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate)** - Authentication setup

### UI & UX Guidelines
- **[UX Guidelines Overview](https://code.visualstudio.com/api/ux-guidelines/overview)** - Complete UI architecture and best practices
- **[Activity Bar Guidelines](https://code.visualstudio.com/api/ux-guidelines/activity-bar)** - Activity bar contribution patterns
- **[Views & View Containers](https://code.visualstudio.com/api/ux-guidelines/views)** - Tree views, welcome views, and webview views
- **[Webview Guidelines](https://code.visualstudio.com/api/ux-guidelines/webviews)** - Webview implementation and security

### Extension Architecture Patterns
- **[Tree View Implementation](https://code.visualstudio.com/api/extension-guides/tree-view)** - Tree data providers and view management
- **[Webview Implementation](https://code.visualstudio.com/api/extension-guides/webview)** - Webview panels and communication
- **[Command Registration](https://code.visualstudio.com/api/references/vscode-api#commands)** - Command implementation patterns
- **[File System Provider](https://code.visualstudio.com/api/references/vscode-api#FileSystemProvider)** - Custom file system implementations

### Advanced Extension Features
- **[Configuration Schema](https://code.visualstudio.com/api/references/contribution-points#contributes.configuration)** - Extension settings and preferences
- **[Activation Events](https://code.visualstudio.com/api/references/activation-events)** - Extension activation patterns
- **[Bundle Extensions](https://code.visualstudio.com/api/working-with-extensions/bundling-extension)** - Webpack optimization for extensions
- **[Continuous Integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration)** - CI/CD for extension development

### CopilotCustomizer Integration
- **[GitHub Copilot Chat Modes](https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes)** - Chat mode customization schema
- **[GitHub Copilot Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)** - Instruction file specifications  
- **[GitHub Copilot Prompts](https://code.visualstudio.com/docs/copilot/customization/prompt-files)** - Prompt file format and usage
- **[Copilot Coding Agent](https://code.visualstudio.com/docs/copilot/copilot-coding-agent)** - Agent development patterns

## Acceptance

This comprehensive instruction set provides the framework for converting CopilotCustomizer into a professional VS Code extension. The instructions cover all aspects from technical implementation to marketplace publishing, ensuring a complete development lifecycle with best practices integration.

### Validation Checklist
- [ ] All VS Code Extension API patterns documented with examples
- [ ] Complete development toolchain specified (TypeScript, webpack, testing)
- [ ] Security and performance requirements clearly defined
- [ ] Publishing workflow documented with marketplace requirements
- [ ] UX guidelines integrated for all contributed interface elements
- [ ] Comprehensive documentation links provided for all referenced technologies
- [ ] Integration patterns specified for existing CopilotCustomizer framework
- [ ] Quality gates and acceptance criteria measurable and testable

## Ready-to-Run Prompts

### Generate Extension Scaffold
**Source**: Use [VSCodeExtensionArchitect chat mode](../../.github/chatmodes/VSCodeExtensionArchitect.chatmode.md)  
**Prompt**: "Create the basic extension structure for CopilotCustomizer with TypeScript, webpack configuration, and package.json manifest including all contribution points for asset management"  
**Usage**: Execute in VSCodeExtensionArchitect chat mode to generate complete project scaffold

### Implement Asset Tree View  
**Source**: CopilotCustomizer/.github/prompts/NewChatmode.prompt.md  
**Prompt**: "Create a tree view provider that displays .github/ folder structure with chatmodes, instructions, prompts, and agent files, including context menus for asset operations"  
**Usage**: Apply to VSCodeExtensionArchitect for tree view implementation guidance

### Generate Command Implementations
**Source**: Use [VSCodeExtensionArchitect chat mode](../../.github/chatmodes/VSCodeExtensionArchitect.chatmode.md)  
**Prompt**: "Implement VS Code commands for asset generation using the existing CopilotCustomizer prompt templates, with proper error handling and progress reporting"  
**Usage**: Execute for complete command implementation with integration patterns

---

*Generated following GenerateInstructions.instructions.md framework with comprehensive research-backed best practices and official VS Code documentation integration*