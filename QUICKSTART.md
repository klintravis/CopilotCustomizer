# Quick Start Guide

Get CopilotCustomizer working with your project in **5 minutes**.

---

## ✅ Prerequisites

Before starting, verify you have:

- [ ] **VS Code** installed
- [ ] **GitHub Copilot** extension active
- [ ] **Copilot subscription** (Individual, Business, or Enterprise)
- [ ] **Your project** open in VS Code
- [ ] **CopilotCustomizer** downloaded/cloned locally

---

## 🚀 3-Step Setup

### Step 1: Add to Workspace (30 seconds)

**Add CopilotCustomizer as second workspace folder:**

1. In VS Code: `File` → `Add Folder to Workspace`
2. Browse to your CopilotCustomizer directory
3. Click `Select Folder`

**Verify**: Both folders visible in Explorer sidebar

```
EXPLORER
├── YOUR-PROJECT
└── COPILOTCUSTOMIZER
```

---

### Step 2: Generate Assets (2 minutes)

**Bootstrap complete customization for your project:**

1. Open Copilot Chat: `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Shift+I` (Mac)
2. Type the `/BootstrapRepo` slash command with your project path:
   ```
   /BootstrapRepo REPOSITORY_PATH: "/absolute/path/to/your-project"
   ```
   The slash command will load and execute the BootstrapRepo workflow.
3. Review the analysis and recommendations shown
4. Type `confirm` when prompted to generate assets

**Wait**: 2-3 minutes while assets generate

**Result**: Your project now has custom AI assistance in `.github/` folder

---

### Step 3: Use Your Customization (30 seconds)

**Verify assets were created:**

Navigate to your project folder:
```
your-project/
├── .github/
│   ├── agents/           ← New AI specialists
│   ├── instructions/     ← Coding rules
│   ├── prompts/          ← Templates
│   └── templates/        ← Document formats
└── AGENTS.md             ← Project guidance
```

**Test it:**
1. Open any code file in your project
2. Ask Copilot a question relevant to your tech stack
3. Notice AI now understands your project patterns

**Done!** Close CopilotCustomizer folder: Right-click → `Remove Folder from Workspace`

---

## 🎯 What You Just Got

Your project-specific customization includes:

| Asset Type | Purpose | Example |
|------------|---------|---------|
| **Agent Files** | Domain experts for your tech stack | `APIExpert.agent.md` for FastAPI/Express/.NET |
| **Instructions** | Coding standards and patterns | `TestingPatterns.instructions.md` |
| **Prompts** | Structured generation templates | `GenerateEndpoint.prompt.md` |
| **Templates** | Document formats | `SecurityReview.template.md` |
| **AGENTS.md** | Project development guidance | Build commands, PR checklist |

**Tech Stack Detected**: Framework automatically identifies your languages/frameworks

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

- **[MULTI-WORKSPACE.md](MULTI-WORKSPACE.md)** - Detailed setup patterns
- **[EXAMPLES.md](EXAMPLES.md)** - Real-world walkthroughs
- **[README.md](README.md)** - Framework overview
- **[.github/ASSETS.md](.github/ASSETS.md)** - Complete reference

---

## 💡 Pro Tips

✅ **Use absolute paths** in `REPOSITORY_PATH` variable  
✅ **Close CopilotCustomizer** when not generating assets  
✅ **Reuse for multiple projects** - same framework, different targets  
✅ **Keep it updated** - `cd CopilotCustomizer && git pull`  
✅ **Save workspace files** - Quick access to common configurations

---

**Time to value**: 5 minutes | **Complexity**: Beginner-friendly | **Result**: Production-ready AI customization
