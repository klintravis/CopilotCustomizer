# Quick Start (5 Minutes)

Get production-ready AI customization for your project in 5 minutes—no configuration, no complexity.

## Prerequisites

✅ VS Code with GitHub Copilot extension installed  
✅ Active GitHub Copilot subscription (Individual, Business, or Enterprise)  
✅ Your project open in VS Code

**Recommended**: VS Code 1.109+ for full feature support including Skills (GA), parallel execution, and enhanced agent orchestration.

## Setup Steps

### Step 1: Add CopilotCustomizer to Your Workspace

In VS Code: `File` → `Add Folder to Workspace...` → Browse to CopilotCustomizer directory → Click `Select Folder`

You should now see both folders in your Explorer sidebar:
```
EXPLORER
├── YOUR-PROJECT          ← Your actual code
└── COPILOTCUSTOMIZER     ← The framework (toolbox)
```

### Step 2: Generate Your Customization

Open Copilot Chat (`Ctrl+Shift+I` on Windows/Linux or `Cmd+Shift+I` on Mac) and run:

**Option A - Slash Command** (recommended):
```
/BootstrapRepo REPOSITORY_PATH: "/absolute/path/to/your-project"
```

**Option B - Natural Language**:
```
Bootstrap Copilot assets for my project at /absolute/path/to/your-project
```

**Important**: Use the **absolute path** to your project:
- ✅ Correct: `/Users/yourname/projects/my-app` or `C:\Users\yourname\projects\my-app`
- ❌ Wrong: `./my-app` or `../my-app`

The agent will analyze your project, detect your tech stack, and present a generation plan.

### Step 3: Confirm and Wait

Review the analysis, then confirm:
- **VS Code 1.109+**: Click the `Confirm` button
- **Earlier versions**: Type `confirm` in the chat

**Wait 3-4 minutes** while CopilotCustomizer generates your customization.

### Step 4: Done! Your Customization is Ready

Assets created in `your-project/.github/`:
```
your-project/
├── .github/
│   ├── skills/          ← Cross-platform AI capabilities
│   ├── agents/          ← VS Code specialist agents
│   ├── instructions/    ← Coding standards (auto-applied)
│   ├── prompts/         ← Slash commands for workflows
│   └── standards/       ← Organization-wide conventions (optional)
└── AGENTS.md            ← Project development guidance
```

**You can now**:
- Ask Copilot project-specific questions and get accurate, contextual answers
- Use generated slash commands like `/GenerateEndpoint` or `/GenerateComponent`
- Switch between specialist agents using the agent picker in Copilot Chat
- Get automatic coding standard enforcement based on file type

## What You Just Got

Each generated asset type serves a specific purpose:

| Asset Type | What It Does | Example |
|------------|--------------|---------|
| **Skills** | Portable AI methodologies that work across VS Code, CLI, Claude, Cursor | `repository-analysis/` - Teaches systematic codebase analysis |
| **Agents** | VS Code specialists with tool access tailored to your tech stack | `APIExpert.agent.md` - FastAPI/Express/.NET API specialist |
| **Instructions** | Coding standards auto-applied to matching files | `TestingPatterns.instructions.md` - Applied to all `*.test.*` files |
| **Prompts** | Interactive slash commands with parameters | `/GenerateEndpoint` - Scaffolds API endpoint + tests |
| **AGENTS.md** | AI development guidance for your specific project | Build commands, testing strategy, PR workflow |

**Tech Stack Detected**: The framework automatically identifies your languages, frameworks, databases, and tools to generate relevant assets.

---

## 🔧 Troubleshooting

For common issues (prompt visibility, output location, confirmations, performance), see:

- `HOW-TO.md` → Troubleshooting
- Direct link: HOW-TO.md section “Troubleshooting”

This guide keeps QUICKSTART lean; the HOW-TO has comprehensive fixes and tips.

---

## 📚 Next Steps

### Customize Further

**Add specific agents:**
- Type: `/NewCopilotAgent` and specify agent details when prompted
- Example: `/NewCopilotAgent AGENT_NAME: "DatabaseExpert", DOMAIN: "PostgreSQL"`
- Agent will ask for any missing details

**Add coding rules:**
- Type: `/NewInstructions` and specify domain and rules
- Example: `/NewInstructions DOMAIN: "Testing", APPLY_TO: "**/*.test.ts"`
- Specify rules inline or agent will ask

**Review what was created:**
- Type: `/RepoReview TARGET_PATH: "/path/to/your-project"`
- Get comprehensive analysis of your Copilot assets

### Learn More

- **[EXAMPLES.md](EXAMPLES.md)** - Real-world examples with React, Python, .NET, Node.js, PHP, and monorepos
- **[HOW-TO.md](HOW-TO.md)** - Complete commands reference + advanced workflows + troubleshooting
- **[README.md](README.md)** - Framework overview and architecture
- **[dev/AGENTS.md](dev/AGENTS.md)** - Full architecture deep-dive + asset inventory

### Common Troubleshooting

**Slash commands not showing?** Verify CopilotCustomizer is in workspace and reload window (`Ctrl+Shift+P` → "Reload Window").

**Assets in wrong location?** Always use **absolute paths** like `/Users/name/projects/my-app`, not relative paths like `./my-app`.

**Agent not appearing?** Check `.github/agents/` folder, verify `.agent.md` extension, and reload VS Code window.

See [HOW-TO.md](HOW-TO.md#-troubleshooting) for comprehensive troubleshooting solutions.

---

## 💡 Pro Tips

✅ **Always use absolute paths** - Full paths like `/Users/name/my-app` prevent location confusion  
✅ **Close when done** - Right-click CopilotCustomizer → "Remove Folder from Workspace" when not generating  
✅ **Reuse across projects** - Same CopilotCustomizer installation works for unlimited projects  
✅ **Keep updated** - Run `git pull` in CopilotCustomizer directory for latest features  
✅ **Commit `.github/`** - Share customization with team via version control  
✅ **Review AGENTS.md** - Project-specific guidance is tailored to your actual codebase

---

**🚀 Ready?** Follow the 3-step setup above and you'll have production-ready AI customization in 5 minutes.

**Time to value**: 5 minutes | **Complexity**: Beginner-friendly | **Result**: Production-ready AI customization
