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
2. In Explorer, navigate to: `CopilotCustomizer` → `.github` → `prompts`
3. Open `BootstrapRepo.prompt.md`
4. Fill in the variable:
   ```
   REPOSITORY_PATH: "/absolute/path/to/your-project"
   ```
5. Review the recommendations shown
6. Type: `confirm`

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

## 🔧 Common Issues

### Issue: Can't Find Prompt Files

**Symptom**: Don't see `.github/prompts/` folder

**Fix**:
1. Verify CopilotCustomizer added to workspace
2. Check Explorer sidebar shows both folders
3. Expand `CopilotCustomizer` → `.github` → `prompts`

---

### Issue: Assets Created in Wrong Location

**Symptom**: New files appear in CopilotCustomizer folder

**Fix**:
1. Verify `REPOSITORY_PATH` uses **absolute path** to YOUR project
2. Example: `/Users/dev/my-project` not `./my-project`
3. Both folders must be open in workspace

---

### Issue: Nothing Generated

**Symptom**: No assets appear after typing `confirm`

**Fix**:
1. Check Copilot Chat for errors or questions
2. Ensure path is correct and accessible
3. Verify write permissions on your project folder
4. Try again with explicit path

---

## 📚 Next Steps

### Customize Further

**Add specific agents:**
- Open `NewCopilotAgent.prompt.md`
- Create domain experts (database, security, testing, etc.)

**Add coding rules:**
- Open `NewInstructions.prompt.md`
- Define project-specific standards

**Review what was created:**
- Open `RepoReview.prompt.md`
- Analyze your new customization

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
