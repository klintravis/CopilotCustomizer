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
#    Type the slash command:
/BootstrapRepo REPOSITORY_PATH: "/path/to/your-project"
#    Review and type: confirm

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

**8 Automated Workflows** for asset generation, maintenance, and quality assurance.

**Quick Access**:
- **BootstrapRepo** - Complete repository setup (most common)
- **QuickChange** - Fast targeted changes
- **RepoReview** - Comprehensive analysis
- **Asset Generators** - NewCopilotAgent, NewInstructions, NewPrompt, etc.

**📋 Complete workflow index below** with docs and prompt links.

**All workflows** are available as slash commands in Copilot Chat. See HOW-TO → Slash Command Cheat Sheet.

## Workflow index

- BootstrapRepo — Fully autonomous setup for a target repo in the same workspace  
    Docs: [docs/workflows/BootstrapRepo.md](docs/workflows/BootstrapRepo.md) · Prompt: [.github/prompts/BootstrapRepo.prompt.md](.github/prompts/BootstrapRepo.prompt.md)
- UpdateCopilotCustomizer — Automated change workflow for CopilotCustomizer repository itself  
    Docs: [docs/workflows/UpdateCopilotCustomizer.md](docs/workflows/UpdateCopilotCustomizer.md) · Prompt: [.github/prompts/UpdateCopilotCustomizer.prompt.md](.github/prompts/UpdateCopilotCustomizer.prompt.md)
- QuickChange — Fast, minimal-diff change with a single approval gate  
    Docs: [docs/workflows/QuickChange.md](docs/workflows/QuickChange.md) · Prompt: [.github/prompts/QuickChange.prompt.md](.github/prompts/QuickChange.prompt.md)
- FormatAndVerifyAssets — Standardize formatting and validate assets in one pass  
    Docs: [docs/workflows/FormatAndVerifyAssets.md](docs/workflows/FormatAndVerifyAssets.md) · Prompt: [.github/prompts/FormatAndVerifyAssets.prompt.md](.github/prompts/FormatAndVerifyAssets.prompt.md)
- HarmonizeAndValidate — Harmonize cross-references and validate workflow integrity  
    Docs: [docs/workflows/HarmonizeAndValidate.md](docs/workflows/HarmonizeAndValidate.md) · Prompt: [.github/prompts/HarmonizeAndValidate.prompt.md](.github/prompts/HarmonizeAndValidate.prompt.md)
- SecurityToolingAudit — Audit tool approvals and MCP server trust (report-only default)  
    Docs: [docs/workflows/SecurityToolingAudit.md](docs/workflows/SecurityToolingAudit.md) · Prompt: [.github/prompts/SecurityToolingAudit.prompt.md](.github/prompts/SecurityToolingAudit.prompt.md)
- WorkflowIntegrityCheck — Validate agent handoffs and workflow link health  
    Docs: [docs/workflows/WorkflowIntegrityCheck.md](docs/workflows/WorkflowIntegrityCheck.md) · Prompt: [.github/prompts/WorkflowIntegrityCheck.prompt.md](.github/prompts/WorkflowIntegrityCheck.prompt.md)
- PromptAndInstructionOptimizer — Improve clarity and token efficiency with a confirmation gate  
    Docs: [docs/workflows/PromptAndInstructionOptimizer.md](docs/workflows/PromptAndInstructionOptimizer.md) · Prompt: [.github/prompts/PromptAndInstructionOptimizer.prompt.md](.github/prompts/PromptAndInstructionOptimizer.prompt.md)

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