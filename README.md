# CopilotCustomizer

> Enterprise-ready VS Code GitHub Copilot customization for ANY tech stack

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![VS Code](https://img.shields.io/badge/VS%20Code-Ready-blue.svg)](#)

**Universal Framework**: Python • Node.js • .NET • Go • Rust • Java • Ruby • PHP • **ANY** stack

---

## What Is This?

**CopilotCustomizer** generates AI-powered customization for your projects. Add specialized agents, coding standards, and structured templates—automatically tailored to your technology stack.

### Key Benefits

| Feature | Benefit |
|---------|---------|
| 🎯 **Tech Stack Aware** | Auto-detects languages and frameworks |
| ⚡ **5-Minute Setup** | Working customization in minutes |
| 🔒 **Non-Invasive** | Separate workspace—no code modifications |
| 🌍 **Universal** | Works with any programming language |
| ♻️ **Reusable** | Same framework for all repositories |

---

## 🚀 Quick Start

### Prerequisites

- VS Code with GitHub Copilot extension
- Copilot subscription (Individual/Business/Enterprise)
- Your project open in VS Code

### 3-Step Setup

**1. Add to Workspace** → **2. Generate Assets** → **3. Start Coding**

```bash
# 1. In VS Code: File → Add Folder to Workspace
#    Select your CopilotCustomizer directory

# 2. Open Copilot Chat (Ctrl+Shift+I)
#    Open: .github/prompts/ExternalRepoBootstrap.prompt.md
#    Set: REPOSITORY_PATH: "/path/to/your-project"
#    Type: confirm

# 3. Assets created in your project's .github/ folder
#    Close CopilotCustomizer folder when done
```

**📘 Detailed Guide**: [QUICKSTART.md](QUICKSTART.md)

---

## 💡 What You Get

### Before vs After

| Without CopilotCustomizer | With CopilotCustomizer |
|---------------------------|------------------------|
| ❌ Generic AI responses | ✅ Tech-stack-specific experts |
| ❌ Manual context every time | ✅ Project patterns understood automatically |
| ❌ No project standards | ✅ Custom coding standards enforced |
| ❌ Repetitive explanations | ✅ Structured workflows |

### Generated Assets

Your project receives customization in `.github/` folder:

```
your-project/.github/
├── agents/          # AI specialists (APIExpert, TestGenerator, etc.)
├── instructions/    # Coding rules and patterns
├── prompts/         # Structured templates
└── templates/       # Document formats

AGENTS.md            # Project development guidance
```

**🎓 See It In Action**: [EXAMPLES.md](EXAMPLES.md) - React, Python, .NET, Node.js, Go examples

---

## 🏗️ Multi-Workspace Pattern

**Don't copy files**—use VS Code multi-root workspaces:

```
VS Code Workspace
├── 📁 your-project/          ← Your code + generated assets
│   └── .github/              ← Customization appears here
└── 📁 CopilotCustomizer/     ← The toolbox (pristine)
    └── .github/prompts/      ← Use these to generate
```

**Why This Pattern?**

✅ CopilotCustomizer stays pristine  
✅ Use same framework for all projects  
✅ Easy cleanup (just close folder)  
✅ Stay updated: `git pull` in CopilotCustomizer  

**📖 Complete Guide**: [MULTI-WORKSPACE.md](MULTI-WORKSPACE.md)

---

## 🎯 Available Workflows

| Workflow | Purpose | Prompt File |
|----------|---------|-------------|
| **Bootstrap** | Complete setup for any repo | `ExternalRepoBootstrap.prompt.md` |
| **Repository Analysis** | Analyze and recommend | `RepoReview.prompt.md` |
| **New Agent** | Create AI specialist | `NewCopilotAgent.prompt.md` |
| **New Instructions** | Add coding rules | `NewInstructions.prompt.md` |
| **New Prompt** | Create template | `NewPrompt.prompt.md` |
| **Optimize Assets** | Improve existing | `AssetOptimization.prompt.md` |

**All prompts** in `.github/prompts/` - open in Copilot Chat

---

## 📚 Documentation

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **[QUICKSTART.md](QUICKSTART.md)** | 5-minute setup guide | **Start here** |
| **[EXAMPLES.md](EXAMPLES.md)** | Real-world walkthroughs | See it in action |
| **[MULTI-WORKSPACE.md](MULTI-WORKSPACE.md)** | Detailed setup patterns | Deep dive on setup |
| **[HOW-TO.md](HOW-TO.md)** | Technical reference | Advanced usage |
| **[AGENTS.md](AGENTS.md)** | Project guidance | Contributing to framework |
| **[.github/ASSETS.md](.github/ASSETS.md)** | Asset reference | Understanding internals |

---

## ⚡ Tech Stack Support

**Automatic detection** for:

| Category | Supported |
|----------|-----------|
| **Frontend** | React, Vue, Angular, Svelte, Next.js, Nuxt |
| **Backend** | Node.js, Python, .NET, Go, Rust, Java, PHP |
| **Frameworks** | Express, FastAPI, Django, ASP.NET, Spring |
| **Testing** | Jest, Pytest, xUnit, PHPUnit, Go testing |
| **Databases** | PostgreSQL, MySQL, MongoDB, Redis |

**Universal**: If VS Code recognizes it, CopilotCustomizer supports it

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Can't find prompts** | Verify CopilotCustomizer added to workspace |
| **Wrong location** | Use absolute path in `REPOSITORY_PATH` |
| **Nothing generated** | Check both folders open, verify permissions |
| **Update framework** | `cd CopilotCustomizer && git pull` |

**More Help**: [QUICKSTART.md](QUICKSTART.md#common-issues)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

## 🙏 Acknowledgments

- **Microsoft VS Code** - Copilot customization framework
- **GitHub Copilot** - AI-assisted development platform

---

**Framework**: v1.0 | **Pattern**: Multi-Workspace Toolbox | **Status**: Production-Ready

*Get started in 5 minutes: [QUICKSTART.md](QUICKSTART.md)* 