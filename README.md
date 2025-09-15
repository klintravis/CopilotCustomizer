# Copilot Customizer

A comprehensive VS Code GitHub Copilot customization system that provides specialized chat modes, instruction files, prompt files, and templates for enhanced AI-assisted development workflows.

## 🚀 Overview

Copilot Customizer is a production-ready framework for creating, managing, and optimizing GitHub Copilot customizations in VS Code. It includes:

- **Custom Chat Modes** - Specialized AI personas for different development tasks
- **Instruction Files** - Detailed guidance for AI behavior and code generation
- **Prompt Files** - Structured templates for consistent AI interactions  
- **Templates** - Standardized formats for analysis and implementation planning
- **Asset Optimization** - Tools for maintaining and improving customization quality

## 📋 Features

### 🎯 Core Capabilities
- **Copilot Customization Architect**: Expert chat mode for designing and auditing Copilot assets
- **Asset Generation**: Automated creation of chat modes, instructions, prompts, and agent files
- **Repository Analysis**: Intelligent scanning and optimization of existing customizations
- **Quality Assurance**: Built-in validation and best practice enforcement
- **Version Management**: Schema versioning and compatibility tracking

### 🛠️ Asset Types
| Asset Type | Purpose | File Pattern |
|------------|---------|--------------|
| Chat Modes | AI personas and specialized behaviors | `*.chatmode.md` |
| Instructions | Detailed AI guidance and rules | `*.instructions.md` |
| Prompts | Structured interaction templates | `*.prompt.md` |
| Agent Files | Project-specific AI guidance | `AGENTS.md`, `.agent.md` |
| Templates | Standardized document formats | `*.template.md` |

### 🔧 Supported Workflows
- Asset creation and generation
- Repository analysis and optimization
- Quality auditing and validation
- Asset refactoring and maintenance
- Template-based document generation

## 🏗️ Repository Structure

```
CopilotCustomizer/
├── .github/
│   ├── chatmodes/              # Custom chat mode definitions
│   │   └── CopilotCustomizer.chatmode.md
│   ├── instructions/           # AI behavior and generation rules
│   │   ├── AssetOptimization.instructions.md
│   │   ├── GenerateAgent.instructions.md
│   │   ├── GenerateChatmode.instructions.md
│   │   ├── GenerateInstructions.instructions.md
│   │   ├── GeneratePrompt.instructions.md
│   │   └── RepoReview.instructions.md
│   ├── prompts/               # Structured interaction templates
│   │   ├── AgentResume.prompt.md
│   │   ├── AssetOptimization.prompt.md
│   │   ├── NewAgent.prompt.md
│   │   ├── NewChatmode.prompt.md
│   │   ├── NewInstructions.prompt.md
│   │   ├── NewPrompt.prompt.md
│   │   └── RepoReview.prompt.md
│   └── templates/             # Document and analysis templates
│       ├── Analysis.template.md
│       ├── ImplementationPlan.template.md
│       └── ProgressLog.template.md
├── output/                    # Generated files and artifacts
├── README.md                  # This file
└── HOW-TO.md                 # Detailed usage guide
```

## 🚀 Quick Start

### Prerequisites
- VS Code with GitHub Copilot extension
- Access to Copilot Chat functionality
- Basic understanding of VS Code customization

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/CopilotCustomizer.git
   cd CopilotCustomizer
   ```

2. **Copy assets to your project**:
   ```bash
   # Copy the entire .github directory to your target project
   cp -r .github /path/to/your/project/
   ```

3. **Activate in VS Code**:
   - Open your project in VS Code
   - The customizations will be automatically detected
   - Access via Copilot Chat using `@CopilotCustomizer`

### Basic Usage

1. **Access the Customizer chat mode**:
   ```
   @CopilotCustomizer help
   ```

2. **Generate a new chat mode**:
   ```
   @CopilotCustomizer create a security-focused code reviewer mode
   ```

3. **Audit existing assets**:
   ```
   @CopilotCustomizer refine: audit
   ```

## 📚 Documentation

- **[HOW-TO.md](HOW-TO.md)** - Comprehensive usage guide and tutorials
- **[Asset Reference](/.github/README.md)** - Detailed documentation of all asset types
- **[VS Code Copilot Customization Docs](https://code.visualstudio.com/docs/copilot/customization/overview)** - Official Microsoft documentation

## 🎯 Key Workflows

### Asset Creation
Use the specialized generation prompts to create new customization assets:
- `NewChatmode.prompt.md` - Generate custom chat modes
- `NewInstructions.prompt.md` - Create instruction files  
- `NewPrompt.prompt.md` - Build prompt templates
- `NewAgent.prompt.md` - Generate agent guidance files

### Quality Assurance
Built-in validation and optimization:
- Asset structure validation
- Best practice compliance
- Token efficiency optimization
- Cross-reference integrity checking

### Repository Analysis
Automated scanning and improvement:
- Gap analysis against best practices
- Asset inventory and cataloging
- Optimization recommendations
- Conflict detection and resolution

## 🔧 Customization

### Depth Modes
Most assets support multiple depth modes:
- `quick-advice` - Fast suggestions and fixes
- `standard` - Full analysis and recommendations  
- `deep-architecture` - Comprehensive system design

### Refinement Commands
Interactive improvement commands:
- `refine: audit` - Re-run gap analysis
- `refine: prompts` - Focus on prompt optimization
- `refine: optimize` - Enhance maintainability
- `refine: concise` - Generate executive summaries

## 🤝 Contributing

### Development Guidelines
1. Follow the asset schema standards defined in instruction files
2. Maintain compatibility with existing customizations
3. Include proper versioning and metadata
4. Test all generated assets before committing

### Asset Standards
- Use semantic versioning for schema updates
- Include refinement commands and depth modes where applicable
- Follow the established file naming conventions
- Maintain clear documentation and examples

### Pull Request Process
1. Run asset validation using the built-in audit tools
2. Ensure all cross-references remain intact
3. Update documentation for any new features
4. Test customizations in a clean VS Code environment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Microsoft VS Code Team** - For the excellent Copilot customization framework
- **GitHub Copilot** - For enabling AI-assisted development workflows
- **Community Contributors** - For feedback and improvements

## 📞 Support

- **Documentation**: Check the [HOW-TO.md](HOW-TO.md) guide
- **Issues**: Report problems via GitHub Issues
- **Discussions**: Join community discussions for questions and ideas

## 🔄 Version History

- **v1.0** - Initial release with core customization system
- **v1.2** - Enhanced asset optimization and repository analysis
- **Current** - Ongoing improvements and feature additions

---

*Built with ❤️ by the Copilot Customizer community*