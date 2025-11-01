# GitHub Setup Guide

> Simple guide to adding CopilotCustomizer to any project for enhanced AI-assisted development

[![Framework Version](h## 📚 More Resources

- **[Asset Reference](/.github/ASSETS.md)** - Complete documentation of all asset types
- **[HOW-TO.md](/HOW-TO.md)** - Detailed usage guide and tutorials  
- **[VS Code Copilot Docs](https://code.visualstudio.com/docs/copilot/customization/)** - Official Microsoft documentation//img.shields.io/badge/Framework-v1.0-blue)](#)
[![VS Code Ready](https://img.shields.io/badge/VS%20Code-Ready-orange)](#)

---

## � Quick Start (3 Steps)

1. **Clone CopilotCustomizer** to your project
2. **Switch to @CopilotCustomizer mode** (recommend Sonnet 4)
3. **Use ready-to-run prompts** (start with RepoReview)

---

## � Add to Your Project

### Prerequisites
- **VS Code** with **GitHub Copilot** extension
- **Copilot subscription** (any tier)

### Installation (Choose One Method)

**Option 1: Direct Clone (Recommended)**
```bash
# Navigate to your project directory
cd /path/to/your/project

# Clone CopilotCustomizer framework
git clone https://github.com/klintravis/CopilotCustomizer.git .copilot

# Copy assets to your project
cp -r .copilot/.github .
cp .copilot/AGENTS.md .

# Clean up (optional)
rm -rf .copilot
```

**Option 2: Git Submodule**
```bash
# Add as submodule (keeps connection to updates)
git submodule add https://github.com/klintravis/CopilotCustomizer.git copilot-framework

# Copy assets to your project
cp -r copilot-framework/.github .
cp copilot-framework/AGENTS.md .
```

**Option 3: Download & Extract**
1. Download: [Latest Release](https://github.com/klintravis/CopilotCustomizer/releases)
2. Extract to your project directory
3. Copy `.github/` folder and `AGENTS.md` to your project root

---

## 🎯 Using CopilotCustomizer

### 1. Open VS Code Copilot Chat
- Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Shift+I` (Mac)
- The CopilotCustomizer chat mode will be automatically detected

### 2. Switch to CopilotCustomizer Mode
```
@CopilotCustomizer
```
**💡 Tip**: Use **Claude 3.5 Sonnet** model for best results (if available in your region)

### 3. Start with Repository Review
```
@CopilotCustomizer Use RepoReview.prompt.md with:
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
│   ├── chatmodes/              # CopilotCustomizer AI persona  
│   ├── instructions/           # Framework guidance (8 files)
│   ├── prompts/               # Ready-to-run prompts (9 files)
│   └── templates/             # Analysis & planning templates
├── AGENTS.md                  # Project development guide
└── [your existing project files]
```

---

## 🚀 Common Workflows

### Repository Analysis
```
@CopilotCustomizer Use RepoReview.prompt.md with:
TARGET_PATH: "."
FOCUS_AREA: "all assets"
```

### Create New Assets
```
@CopilotCustomizer Create a database optimization expert mode
# Uses NewCopilotAgent.prompt.md automatically

@CopilotCustomizer Generate instructions for React testing
# Uses NewInstructions.prompt.md automatically
```

### Optimize Existing Assets
```
@CopilotCustomizer refine: audit
# Runs comprehensive asset analysis

@CopilotCustomizer refine: optimize
# Applies performance improvements
```

---

## 🛠️ Troubleshooting

**Chat mode not appearing?**
- Restart VS Code
- Check `.github/chatmodes/CopilotCustomizer.chatmode.md` exists
- Verify YAML front matter starts with `---`

**Assets not loading?**
- Ensure `.github/` folder is in your project root
- Check file permissions (should be readable)
- Try `@CopilotCustomizer help` to test connection

---

## � More Resources

- **[Asset Reference](/.github/README.md)** - Complete documentation of all asset types
- **[HOW-TO.md](/HOW-TO.md)** - Detailed usage guide and tutorials  
- **[VS Code Copilot Docs](https://code.visualstudio.com/docs/copilot/customization/)** - Official Microsoft documentation

## 💡 Tips

- **Use Sonnet 4** model when available for best CopilotCustomizer results
- **Start with RepoReview** to understand your project's current state
- **Explore ready-to-run prompts** - they're designed to work immediately
- **Check AGENTS.md** for project-specific development guidance

---

*Simple setup, powerful results. That's CopilotCustomizer!* 🚀