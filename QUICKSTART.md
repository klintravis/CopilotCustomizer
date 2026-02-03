# Quick Start (5 Minutes)

## Prerequisites

- VS Code + GitHub Copilot extension + subscription
- Your project open in VS Code

## Setup

### 1. Add CopilotCustomizer to Workspace

`File` → `Add Folder to Workspace` → select CopilotCustomizer

### 2. Generate Customization

Open Copilot Chat (`Ctrl+Shift+I`) and run:

```
/BootstrapRepo REPOSITORY_PATH: "/absolute/path/to/your-project"
```

Review the plan, then type: `confirm`

**Wait**: 3-4 minutes

### 3. Done!

Assets created in `your-project/.github/`:
- `skills/` - Cross-platform AI capabilities
- `agents/` - VS Code specialists
- `instructions/` - Coding standards
- `prompts/` - Task templates

## Next Steps

- [Examples](EXAMPLES.md) - Real-world walkthroughs
- [All Commands](HOW-TO.md) - Complete reference
- [Architecture](dev/AGENTS.md) - How it works

**Done!** Close CopilotCustomizer folder: Right-click → `Remove Folder from Workspace`

---

## 🎯 What You Just Got

Your project-specific customization includes:

| Asset Type | Purpose | Example |
|------------|---------|---------|
| **Agent Files** | Domain experts for your tech stack | `APIExpert.agent.md` for FastAPI/Express/.NET |
| **Instructions** | Coding standards and patterns | `TestingPatterns.instructions.md` |
| **Prompts** | Structured generation templates | `GenerateEndpoint.prompt.md` |
| **Templates** | Document formats | `ChangeLog.template.md` |
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

- **[HOW-TO.md](HOW-TO.md)** - Detailed setup & reference
- **[EXAMPLES.md](EXAMPLES.md)** - Real-world walkthroughs
- **[README.md](README.md)** - Framework overview
- **[ASSETS.md](dev/ASSETS.md)** - Complete reference

---

## 💡 Pro Tips

✅ **Use absolute paths** in `REPOSITORY_PATH` variable  
✅ **Close CopilotCustomizer** when not generating assets  
✅ **Reuse for multiple projects** - same framework, different targets  
✅ **Keep it updated** - `cd CopilotCustomizer && git pull`  
✅ **Save workspace files** - Quick access to common configurations

---

**Time to value**: 5 minutes | **Complexity**: Beginner-friendly | **Result**: Production-ready AI customization
