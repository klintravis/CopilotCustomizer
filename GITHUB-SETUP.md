# GitHub Setup Guide

> Enterprise guide for adding CopilotCustomizer framework to projects

[![Framework Version](https://img.shields.io/badge/Framework-v1.0-blue)](#)
[![VS Code Ready](https://img.shields.io/badge/VS%20Code-Ready-orange)](#)

---

## 📋 Quick Start (3 Steps)

1. **Add CopilotCustomizer framework** to your project
2. **Configure chat mode** (when agent extensions become available)
3. **Use ready-to-run prompts** (start with RepoReview)

---

## � Add to Your Project

### Prerequisites
- **VS Code** with **GitHub Copilot** extension
- **Copilot subscription** (any tier)

### Installation (Choose One Method)

**Option 1: Direct Copy (Recommended)**
```bash
# Navigate to your project directory
cd /path/to/your/project

# Copy framework assets to your project
cp -r /path/to/CopilotCustomizer/.github .
cp /path/to/CopilotCustomizer/AGENTS.md .
```

**Option 2: Git Submodule**
```bash
# Add as submodule (keeps connection to updates)
git submodule add https://your-organization/CopilotCustomizer.git copilot-framework

# Copy assets to your project
cp -r copilot-framework/.github .
cp copilot-framework/AGENTS.md .
```

**Option 3: Internal Distribution**
1. Obtain framework from internal repository
2. Extract to your project directory
3. Copy `.github/` folder and `AGENTS.md` to your project root

---

## 🎯 Using CopilotCustomizer

### 1. Open VS Code Copilot Chat
- Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Shift+I` (Mac)
- The CopilotCustomizer chat mode will be detected when agent extensions are available

### 2. Access CopilotCustomizer Mode
**Note**: Agent-based chat modes via `@` syntax require VS Code extensions not yet available. Use direct prompt files until then.

**💡 Tip**: Use **Claude 3.5 Sonnet** model for best results (if available)

### 3. Start with Repository Review
Open `.github/prompts/RepoReview.prompt.md` and follow the structured workflow:
```
TARGET_PATH: "."
FOCUS_AREA: "all assets"
```

### 4. Or Use Any Ready-to-Run Prompt
- `RepoReview.prompt.md` - Comprehensive repository analysis
- `NewCopilotAgent.prompt.md` - Create VS Code Copilot agents
- `AssetOptimization.prompt.md` - Optimize existing assets  
- `AgentResume.prompt.md` - Universal project helper

---

## � What You Get

After installation, your project will have:

```
your-project/
├── .github/
│   ├── agents/                # CopilotCustomizer AI agent
│   ├── instructions/          # Framework guidance (12 files)
│   ├── prompts/               # Ready-to-run prompts (11 files)
│   └── templates/             # Analysis & planning templates
├── AGENTS.md                  # Project development guide
└── [your existing project files]
```

---

## 🚀 Common Workflows

### Repository Analysis
Use CopilotCustomizer mode (when available) or open RepoReview.prompt.md:
```
TARGET_PATH: "."
FOCUS_AREA: "all assets"
```

### Create New Assets
Use structured prompts in `.github/prompts/`:
- NewCopilotAgent.prompt.md for agent files
- NewInstructions.prompt.md for instruction files
- NewPrompt.prompt.md for prompt templates

### Optimize Existing Assets
Use CopilotCustomizer mode (when available):
- "refine: audit" for comprehensive analysis
- "refine: optimize" for performance improvements

---

## 🛠️ Troubleshooting

**Chat mode not appearing?**
- Note: `@` chat mode syntax requires VS Code agent extensions not yet available
- Use direct prompt files in `.github/prompts/` until extensions release
- Restart VS Code after adding framework files
- Check `.github/agents/CopilotCustomizer.agent.md` exists
- Verify YAML front matter starts with `---`

**Assets not loading?**
- Ensure `.github/` folder is in your project root
- Check file permissions (should be readable)
- Verify framework files copied correctly

---

## � More Resources

- **[Asset Reference](/.github/README.md)** - Complete documentation of all asset types
- **[HOW-TO.md](/HOW-TO.md)** - Detailed usage guide and tutorials  
- **[VS Code Copilot Docs](https://code.visualstudio.com/docs/copilot/customization/)** - Official Microsoft documentation

## 💡 Tips

- **Use Claude** models when available for best results
- **Start with RepoReview** prompt to understand your project's current state
- **Explore ready-to-run prompts** in `.github/prompts/` directory
- **Check AGENTS.md** for project-specific development guidance
- **Agent extensions coming**: `@` chat mode syntax will work when VS Code agent extensions release

---

*Enterprise customization framework for VS Code GitHub Copilot* 🚀