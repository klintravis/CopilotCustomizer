# Copilot Customizer VS Code Extension

> Professional GitHub Copilot customization framework integrated directly into VS Code

This extension brings CopilotCustomizer workflows (asset generation, harmonization, formatting, optimization) directly into VS Code with a comprehensive chat participant, command palette integration, and intuitive UI components.

## ✨ Features

### 🤖 Chat Participant Integration
- **@CopilotCustomizer** chat participant with slash commands
- Context-aware asset generation using existing workspace assets
- Auto-confirm workflows to reduce back-and-forth interactions
- Intelligent asset resolution (workspace-first, bundled fallback)

### 🎯 Core Commands
- **New Chat Mode** (`/new-chatmode`): Generate custom Copilot chat personas
- **New Instructions** (`/new-instructions`): Create detailed AI guidance files  
- **New Prompt** (`/new-prompt`): Build structured interaction templates
- **Harmonize Assets** (`/harmonize`): Cross-reference and validate relationships
- **Format Assets**: Apply VS Code Copilot formatting standards
- **Optimize Assets** (`/optimize`): Improve performance and token efficiency
- **Repository Review** (`/repo-review`): Comprehensive project analysis

### 🗂️ Asset Management
- **Asset Explorer**: Tree view for `.github/` and `output/` directories
- **Context Menus**: Right-click actions for asset operations
- **File Association**: Automatic detection of Copilot customization files
- **Virtual URI Scheme**: Seamless links between bundled and workspace assets

### ⚙️ Advanced Configuration
- **Per-command Context Control**: Fine-tune which assets are included
- **Pattern Matching**: Include/exclude instruction files by pattern
- **Auto-confirm Settings**: Streamline repetitive workflows
- **Token Customization**: Customize confirmation tokens and directives

## 🚀 Getting Started

### Prerequisites
- VS Code 1.90.0 or higher
- Node.js 18+ for development
- GitHub Copilot extension (for chat participant functionality)

### Development Setup
```powershell
# Clone and setup
git clone https://github.com/klintravis/CopilotCustomizer.git
cd CopilotCustomizer

# Install dependencies
npm install

# Compile and launch extension host
npm run compile
code --extensionDevelopmentPath "$pwd"
```

### Using the Extension Host
1. Press `F5` or use the "Run Extension" launch configuration
2. In the Extension Development Host window, open a workspace
3. Access features via:
   - **Chat**: Open Copilot Chat and use `@CopilotCustomizer`
   - **Commands**: `Ctrl+Shift+P` → "Copilot Customizer:"
   - **Views**: Activity Bar → Copilot Customizer → Asset Explorer

## 📋 Commands Reference

### Chat Participant Commands
| Command | Description | Output Location |
|---------|-------------|-----------------|
| `/new-chatmode` | Generate custom chat mode | `output/` + `.github/chatmodes/` |
| `/new-instructions` | Create instruction file | `output/` |
| `/new-prompt` | Build prompt template | `output/` |
| `/harmonize` | Cross-reference assets | `output/` |
| `/optimize` | Optimize asset structure | `output/` |
| `/repo-review` | Analyze repository | `output/` |
| `/help` | Show available commands | Chat response |

### Command Palette Actions
- **Copilot Customizer: New Chat Mode** - Generate via command palette
- **Copilot Customizer: New Instructions** - Create instruction files
- **Copilot Customizer: New Prompt** - Build prompt templates
- **Copilot Customizer: Harmonize Assets** - Asset relationship management
- **Copilot Customizer: Format Assets** - Apply formatting standards
- **Copilot Customizer: Optimize Assets** - Performance improvements
- **Copilot Customizer: Open Asset Generator** - Launch webview panel

## 🗂️ Views & UI Components

### Asset Explorer
- **Location**: Activity Bar → Copilot Customizer
- **Features**: 
  - Browse `.github/` and `output/` directories
  - Context menu actions (Format, Optimize, Open)
  - File type recognition and icons
  - Refresh on file system changes

### Status Bar Integration
- **Generator**: Quick access to Asset Generator panel
- **Chat**: One-click chat mode activation with tips

### Webview Panels
- **Asset Generator**: Interactive form-based asset creation
- **Configuration**: Visual settings management (planned)

## ⚙️ Configuration

### Global Settings
```json
{
  "copilotCustomizer.context.includeChatMode": true,
  "copilotCustomizer.context.includePromptTemplate": true,
  "copilotCustomizer.context.instructionInclude": ["*.instructions.md"],
  "copilotCustomizer.context.instructionExclude": [],
  "copilotCustomizer.context.autoConfirm": true,
  "copilotCustomizer.context.autoConfirmToken": "confirm"
}
```

### Per-Command Overrides
Configure context inclusion for specific commands:
- `copilotCustomizer.context.commands.newChatMode.*`
- `copilotCustomizer.context.commands.newInstructions.*`
- `copilotCustomizer.context.commands.newPrompt.*`

## 🧪 Development & Testing

### Build Commands
```bash
npm run compile          # Development build
npm run watch           # Watch mode
npm run package         # Production build
npm run lint            # Code linting
npm run test            # Run test suite
```

### Extension Testing
```bash
npm run compile-tests   # Compile test files
npm run pretest        # Pre-test setup
npm run test           # Execute test suite
```

### Packaging
```bash
npm install -g @vscode/vsce
vsce package           # Create .vsix file
vsce publish           # Publish to marketplace
```

## 📁 Project Structure

```
CopilotCustomizer/
├── src/                          # Extension source code
│   ├── extension.ts             # Main activation entry point
│   ├── commands/                # Command implementations
│   ├── providers/               # Tree data providers
│   ├── webviews/                # Webview panels
│   └── utils/                   # Helper utilities
├── resources/                   # Bundled assets
│   ├── chatmodes/              # Default chat modes
│   ├── instructions/           # Instruction templates
│   ├── prompts/                # Prompt templates
│   └── icons/                  # Extension icons
├── test/                       # Test suite
├── .github/                    # Workspace assets (when present)
├── output/                     # Generated assets
└── docs/                       # Documentation
```

## 🔧 Architecture Notes

### Asset Resolution Strategy
1. **Workspace First**: Look for assets in workspace `.github/` directory
2. **Bundled Fallback**: Use extension's bundled `resources/` assets
3. **Virtual Scheme**: `copilot-customizer:/` URLs for seamless linking

### Context Management
- Configurable asset inclusion per command
- Pattern-based instruction file filtering
- Automatic context registration for Copilot Chat
- Intelligent token management for multi-step workflows

### Performance Optimizations
- Lazy loading of heavy operations
- Debounced file system watchers
- Virtual scrolling for large asset collections
- Bundle size optimization via webpack

## 🚧 Roadmap & Next Steps

### Immediate (v1.0)
- [ ] Comprehensive test suite implementation
- [ ] Marketplace packaging and publishing
- [ ] Performance optimization and bundle analysis
- [ ] Documentation screenshots and demos

### Short-term (v1.1)
- [ ] Schema-backed asset validation
- [ ] Enhanced harmonization workflows
- [ ] Improved error handling and user feedback
- [ ] Accessibility compliance (WCAG 2.1 AA)

### Medium-term (v1.2+)
- [ ] Asset template library expansion
- [ ] Collaborative asset sharing
- [ ] Advanced analytics and usage insights
- [ ] Integration with external asset sources

## 📞 Support & Contributing

### Getting Help
- **Issues**: [GitHub Issues](https://github.com/klintravis/CopilotCustomizer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/klintravis/CopilotCustomizer/discussions)
- **Documentation**: [Project Wiki](https://github.com/klintravis/CopilotCustomizer/wiki)

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request
5. Ensure CI passes and address feedback

---

**Status**: Active Development | **Version**: 0.1.0 | **License**: MIT
