# 🎯 CopilotCustomizer User Guide

> **Professional GitHub Copilot customization made simple**

Transform your VS Code GitHub Copilot experience with powerful asset generation, chat modes, and AI-driven workflows. This guide will get you up and running in minutes.

---

## 📋 Table of Contents

1. [Quick Start](#-quick-start)
2. [Using Chat Commands](#-using-chat-commands) 
3. [Asset Explorer](#-asset-explorer)
4. [Generating Assets](#-generating-assets)
5. [Managing Your Assets](#-managing-your-assets)
6. [Tips & Best Practices](#-tips--best-practices)
7. [Troubleshooting](#-troubleshooting)

---

## 🚀 Quick Start

### Step 1: Install the Extension
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "CopilotCustomizer"
4. Click **Install**

### Step 2: Open Your Project
1. Open any folder/project in VS Code
2. Look for the **CopilotCustomizer** icon in your Activity Bar (left sidebar)
3. If you see an "Install Chat Mode" button, click it to get started

![Activity Bar Location](docs/images/activity-bar.png)
*The CopilotCustomizer icon appears in your VS Code Activity Bar*

### Step 3: Your First Command
1. Open Copilot Chat (`Ctrl+Shift+I`)
2. Type: `@CopilotCustomizer /help`
3. You'll see all available commands and features

![First Command](docs/images/first-command.png)
*Getting help shows you all available commands*

---

## 💬 Using Chat Commands

### Command Structure Options

**🆕 New Conversation**: Start with the participant name
```
@CopilotCustomizer /command-name Your specific request here
```

**⚡ Within @CopilotCustomizer Chat**: Use shorter slash commands
```
/command-name Your specific request here
```

> **💡 Pro Tip**: Once you're in a `@CopilotCustomizer` conversation, you can drop the `@CopilotCustomizer` prefix and just use `/command-name` for faster typing!

### Essential Commands

#### 🎨 **Generate Chat Mode**
Create custom AI personas for specific tasks:
```
@CopilotCustomizer /generate-chatmode Create a React expert for component development
```

#### 📝 **Generate Instructions** 
Create detailed guidance files for AI behavior:
```  
@CopilotCustomizer /generate-instructions Write TypeScript coding standards for our team
```

#### ⚡ **Generate Prompt**
Build reusable templates for common tasks:
```
@CopilotCustomizer /generate-prompt Create a code review checklist template
```

#### 🔗 **Harmonize Assets**
Cross-reference and validate your customization files:
```
@CopilotCustomizer /harmonize Check all my assets for consistency
```

#### 🚀 **Optimize Assets**
Improve performance and reduce token usage:
```
@CopilotCustomizer /optimize Improve my chat modes for better performance
```

#### 📊 **Repository Review**
Get comprehensive analysis of your project:
```
@CopilotCustomizer /repo-review Analyze my entire project structure
```

---

## 🗂️ Asset Explorer

The Asset Explorer appears in your VS Code sidebar and provides quick access to all your customization assets.

### Navigation Structure
```
🎨 Open Customizer          # Full interface
🚀 Quick Create Assets       # Fast asset creation
   💬 Chat Mode             # Generate chat personas  
   📋 Instructions          # Create guidance files
   ⚡ Prompt                # Build templates
   🤖 Agent                 # Generate project guides
🔗 Asset Management         # Existing assets
   📁 Chat Modes            # Your custom personas
   📁 Instructions          # Guidance files  
   📁 Prompts               # Template files
   📁 Output                # Generated content
```

### Quick Actions
- **Single-click** any item to open it
- **Right-click** for context menu options
- Use the **title bar buttons** for batch operations

![Asset Explorer](docs/images/asset-explorer.png)
*The Asset Explorer gives you quick access to all features*

---

## 🎯 Generating Assets

### Chat Modes (AI Personas)
**What they do**: Create specialized AI assistants for specific tasks

**When to use**: 
- Need an expert in a specific technology
- Want consistent behavior for a project
- Team standardization

**Example Process**:
1. Click **💬 Chat Mode** in Asset Explorer, OR
2. Use: `@CopilotCustomizer /generate-chatmode Create a Python testing expert`
3. The AI will ask clarifying questions
4. Review and confirm the generated mode
5. Your new chat mode appears in Copilot's dropdown

### Instructions (Guidance Files) 
**What they do**: Provide detailed rules and standards for AI behavior

**When to use**:
- Coding standards and conventions
- Project-specific requirements  
- Quality guidelines

**Example Process**:
1. Click **📋 Instructions** in Asset Explorer, OR
2. Use: `@CopilotCustomizer /generate-instructions Create REST API design standards`
3. Provide your specific requirements
4. Generated instructions appear in `.github/instructions/`

### Prompts (Templates)
**What they do**: Create reusable templates for common requests

**When to use**:
- Repetitive tasks
- Complex multi-step processes
- Team workflow standardization

**Example Process**:
1. Click **⚡ Prompt** in Asset Explorer, OR  
2. Use: `@CopilotCustomizer /generate-prompt Create a bug report template`
3. Specify your template requirements
4. Generated prompts appear in `.github/prompts/`

---

## 📁 Managing Your Assets

### File Organization
Your assets are automatically organized in your project:

```
your-project/
├── .github/
│   ├── chatmodes/           # Custom AI personas
│   │   └── *.chatmode.md
│   ├── instructions/        # Guidance files  
│   │   └── *.instructions.md
│   ├── prompts/            # Template files
│   │   └── *.prompt.md
│   └── output/             # Generated content
│       └── *.md
```

### Quality Control

#### Harmonization
Ensures your assets work well together:
- Cross-references are maintained
- No conflicting instructions
- Consistent formatting

#### Optimization  
Improves performance and effectiveness:
- Reduces token usage
- Improves AI response quality
- Removes redundancy

#### Validation
Checks for common issues:
- Syntax errors
- Missing required fields
- Broken references

---

## 💡 Tips & Best Practices

### Getting Better Results

1. **Be Specific**: Instead of "help with coding", try "create a React component following our design system"

2. **Use Examples**: Include specific examples of what you want:
   ```
   @CopilotCustomizer /generate-chatmode 
   Create a database expert that knows PostgreSQL, MongoDB, and Redis.
   Should help with queries, schema design, and performance optimization.
   ```

3. **Iterate and Refine**: Use the harmonize and optimize commands to improve existing assets

4. **Team Consistency**: Share your `.github/` folder with your team for consistent AI behavior

### Workflow Recommendations

#### For Individual Developers
1. Start with a general chat mode for your primary language
2. Add specific instructions for your coding standards  
3. Create prompts for repetitive tasks
4. Optimize monthly for better performance

#### For Teams
1. Collaborate on shared chat modes and instructions
2. Use the repository review feature for onboarding
3. Standardize prompts for common workflows
4. Regular harmonization for consistency

#### For Projects
1. Create project-specific chat modes
2. Document architecture decisions in instructions
3. Build deployment and testing prompts  
4. Use optimization for production readiness

---

## 🔧 Troubleshooting

### Common Issues

#### "Sorry, I can't assist with that"
**Cause**: Command not recognized
**Solution**: 
- Check command spelling: `/generate-chatmode` not `/new-chatmode`
- Use `@CopilotCustomizer /help` to see all commands
- Ensure the chat mode is installed (check Asset Explorer)

#### "No workspace folder found"
**Cause**: VS Code isn't in a project folder
**Solution**: 
- Open a folder in VS Code (`File > Open Folder`)
- The extension needs a project context to work

#### Assets not appearing
**Cause**: File location or naming issues
**Solution**:
- Check that files are in `.github/` subfolders
- Ensure proper file extensions (`.chatmode.md`, `.instructions.md`, etc.)
- Use the refresh button in Asset Explorer

#### Performance issues
**Cause**: Assets are too large or complex
**Solution**:
- Run `@CopilotCustomizer /optimize` to improve performance
- Simplify overly complex instructions
- Remove unused assets

### Getting Help

1. **Built-in Help**: `@CopilotCustomizer /help`
2. **Repository Review**: `@CopilotCustomizer /repo-review` for comprehensive analysis
3. **Asset Validation**: Use harmonize and optimize commands
4. **GitHub Issues**: Report bugs and feature requests on GitHub

---

## 🎉 Success Stories

### "Increased my React productivity by 40%"
*"Created a React expert chat mode with our component patterns. Now Copilot generates code that follows our exact standards."* - Senior Frontend Developer

### "Onboarded new developers in half the time"
*"Used instructions and prompts to document our entire architecture. New team members get productive immediately."* - Engineering Manager  

### "Consistent code quality across the team"
*"Shared chat modes ensure everyone gets the same high-quality suggestions, regardless of experience level."* - Tech Lead

---

## 🚀 Next Steps

Ready to supercharge your AI development workflow?

1. **Install** the CopilotCustomizer extension
2. **Create** your first chat mode or instruction file
3. **Share** successful assets with your team
4. **Optimize** regularly for best performance
5. **Explore** advanced workflows as you grow

---

*Happy coding with your personalized AI assistant! 🤖✨*