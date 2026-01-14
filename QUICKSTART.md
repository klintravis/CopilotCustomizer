# Quick Start Guide

> Get AI customization for your project in 5 minutes

---

## Prerequisites

- VS Code with GitHub Copilot extension
- GitHub Copilot subscription (Individual/Business/Enterprise)

---

## Setup (3 Steps)

### Step 1: Add CopilotCustomizer to Workspace

```
File → Add Folder to Workspace → Select CopilotCustomizer
```

Your workspace should now show both folders:
```
EXPLORER
├── YOUR-PROJECT
└── COPILOTCUSTOMIZER
```

### Step 2: Generate Customization

Open Copilot Chat (`Ctrl+Shift+I`) and run:

```
/BootstrapRepo REPOSITORY_PATH: "/absolute/path/to/your-project"
```

### Step 3: Confirm Generation

Review the analysis and recommendations, then type:
```
confirm
```

**Wait ~3-4 minutes** for asset generation.

---

## What Gets Created

Assets are generated in `your-project/.github/`:

```
your-project/
├── .github/
│   ├── skills/          # Cross-platform AI capabilities
│   ├── agents/          # VS Code specialists
│   ├── instructions/    # Coding standards
│   └── prompts/         # Task templates
└── AGENTS.md            # Project guidance
```

| Asset Type | Purpose | Example |
|------------|---------|---------|
| **Skills** | Cross-platform capabilities | `api-testing/SKILL.md` |
| **Agents** | Tech stack experts | `APIExpert.agent.md` |
| **Instructions** | Coding standards | `TestingPatterns.instructions.md` |
| **Prompts** | Generation templates | `GenerateEndpoint.prompt.md` |

**Tech stack auto-detected**: Framework identifies your languages and frameworks automatically.

---

## Done!

Close CopilotCustomizer when finished:
```
Right-click COPILOTCUSTOMIZER → Remove Folder from Workspace
```

Your customization stays in your project and works without CopilotCustomizer.

---

## Customize Further

### Add a New Agent
```
/NewCopilotAgent AGENT_NAME: "DatabaseExpert", DOMAIN: "PostgreSQL"
```

### Add Coding Rules
```
/NewInstructions DOMAIN: "Testing", APPLY_TO: "**/*.test.ts"
```

### Add a New Skill
```
/NewSkill SKILL_NAME: "api-testing", PURPOSE: "Jest API testing patterns"
```

### Review What Was Created
```
/RepoReview TARGET_PATH: "/path/to/your-project"
```

---

## Pro Tips

- Use **absolute paths** in `REPOSITORY_PATH`
- **Close CopilotCustomizer** when not generating assets
- **Reuse for multiple projects** - same framework, different targets
- **Keep it updated**: `cd CopilotCustomizer && git pull`
- **Share with team**: Commit `.github/` folder to your repository

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Prompts not found | Verify CopilotCustomizer is in workspace, reload VS Code |
| Assets in wrong location | Use absolute path, not relative |
| Agent not appearing | Check `.github/agents/`, reload window |
| Instructions not applied | Verify `applyTo` pattern matches your files |

> **See [HOW-TO.md](HOW-TO.md)** for detailed troubleshooting

---

## Learn More

| Guide | Description |
|-------|-------------|
| [EXAMPLES.md](EXAMPLES.md) | Real-world walkthroughs |
| [SKILLS-MIGRATION.md](SKILLS-MIGRATION.md) | Cross-platform Skills guide |
| [HOW-TO.md](HOW-TO.md) | Complete command reference |
| [MULTI-WORKSPACE.md](MULTI-WORKSPACE.md) | Advanced setup patterns |
| [AGENTS.md](AGENTS.md) | Architecture overview |

---

<p align="center">
<strong>Time to value</strong>: 5 minutes | <strong>Complexity</strong>: Beginner-friendly | <strong>Result</strong>: Production-ready AI customization
</p>
