# CopilotCustomizer

> Professional GitHub Copilot customizations for better AI-generated code

[![Support via PayPal](https://img.shields.io/badge/Support-PayPal-blue?logo=paypal)](https://www.paypal.me/klintravis)
[![GitHub Stars](https://img.shields.io/github/stars/klintravis/CopilotCustomizer?style=social)](https://github.com/klintravis/CopilotCustomizer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ⭐ Finding This Useful?

**Support development**: [![PayPal](https://img.shields.io/badge/PayPal-00457C?logo=paypal&logoColor=white)](https://www.paypal.me/klintravis)

*Your support keeps this project maintained and growing!*

---

A comprehensive VS Code GitHub Copilot customization system that provides specialized chat modes, instruction files, prompt files, and templates for enhanced AI-assisted development workflows.

## � Documentation

- **[📘 User Guide](USER-GUIDE.md)** - Complete step-by-step instructions for using the extension
- **[🛠️ Developer Guide](HOW-TO.md)** - Technical implementation and customization details  
- **[📋 Setup Guide](GITHUB-SETUP.md)** - Installation and configuration instructions

## �🚀 Overview

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
- **[Asset Reference](/.github/ASSETS.md)** - Detailed documentation of all asset types
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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Microsoft VS Code Team** - For the excellent Copilot customization framework
- **GitHub Copilot** - For enabling AI-assisted development workflows
- **Community Contributors** - For feedback and improvements

## 💝 Support & Sponsorship

### Ways to Support This Project

[![GitHub Sponsors](https://img.shields.io/badge/GitHub-Sponsors-ff69b4?logo=github)](https://github.com/sponsors/klintravis)
[![PayPal](https://img.shields.io/badge/PayPal-Donate-blue?logo=paypal)](https://paypal.me/klintravis)

- **⭐ Star this repository** - It's free and helps with visibility!
- **🔀 Fork and contribute** - Help improve the project
- **💰 Sponsor on GitHub** - Recurring support for ongoing development
- **📢 Share with others** - Spread the word about Copilot Customizer

### What Your Support Enables
- 🚀 Faster feature development
- 🐛 Quicker bug fixes and improvements  
- 📚 Better documentation and tutorials
- 🎯 New asset types and customization options
- 🤝 More responsive community support

## 📞 Support

- **Documentation**: Check the [HOW-TO.md](HOW-TO.md) guide
- **Setup Help**: See [GITHUB-SETUP.md](GITHUB-SETUP.md) for publishing guidance
- **Issues**: Report problems via GitHub Issues
- **Discussions**: Join community discussions for questions and ideas
- **Sponsorship**: Reach out for enterprise support and custom development

## 🔄 Version History

- **v1.0** - Initial release with core customization system
- **v1.2** - Enhanced asset optimization and repository analysis
- **Current** - Ongoing improvements and feature additions

---

*Built with ❤️ by the Copilot Customizer community*