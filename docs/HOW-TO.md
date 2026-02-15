# HOW-TO: CopilotCustomizer Technical Reference

Comprehensive technical guide for using CopilotCustomizer with the multi-workspace pattern.

## 📖 Table of Contents

1. [Getting Started](#-getting-started)
2. [Understanding Asset Types](#-understanding-asset-types)
3. [Creating Custom Assets](#-creating-custom-assets)
4. [Advanced Workflows](#-advanced-workflows)
5. [Best Practices](#-best-practices)
6. [Troubleshooting](#-troubleshooting)
7. [Integration Patterns](#-integration-patterns)

## 🚀 Getting Started

### Prerequisites

**Required**:
- VS Code with GitHub Copilot extension
- Copilot subscription (Individual/Business/Enterprise)
- CopilotCustomizer cloned locally

**VS Code Version**:
- Recommended: **v1.109+** (full feature support including agent orchestration controls, parallel subagents, Skills GA)
- Minimum: **v1.106** (agent files, handoffs)
- Backwards compatible with v1.105 and earlier (some advanced features unavailable)

**No additional dependencies required** - Framework is pure markdown

### Multi-Workspace Setup (Recommended Pattern)

**Step 1: Open Your Project**
```bash
# Open your existing project in VS Code
code /path/to/your-project
```

**Step 2: Add CopilotCustomizer as Second Workspace Folder**
- In VS Code: `File` → `Add Folder to Workspace`
- Browse to CopilotCustomizer directory
- Click `Select Folder`

**Step 3: Verify Setup**
```
EXPLORER
├── YOUR-PROJECT          ← Your code lives here
└── COPILOTCUSTOMIZER     ← The toolbox (read-only)
```

**See**: [Best Practices](#-best-practices) section below for cleanup and multi-project patterns

### First Steps with the Framework

1. **Bootstrap Complete Customization**:
   - In Copilot Chat, use the `/Bootstrap` slash command:
     ```
     /Bootstrap for REPOSITORY_PATH: "/path/to/your-project"
     ```
   - Or ask directly: `Bootstrap my repository at /path/to/your-project`
   - Agent will confirm details and generate assets in YOUR project

2. **Explore Generated Assets**:
   - Navigate to `your-project/.github/` folder
   - Review agents, instructions, and prompts created
   - Test by asking Copilot project-specific questions

3. **Iterate and Refine**:
   - Use `/Review` to analyze what was created
   - Use individual generators (`/NewAgent`, `/NewInstructions`) to add more
   - Use `/Maintain` to improve and format existing assets

---

## ⚡ Slash Command Cheat Sheet

### User Commands

These appear automatically in the VS Code slash-command palette:

- `/Bootstrap REPOSITORY_PATH: "/abs/path/to/project"` — Generate full customization
- `/Review TARGET_PATH: "/abs/path/to/project"` — Analyze repository and assets
- `/NewAgent AGENT_NAME: "Name", DOMAIN: "Area"` — Create a new agent
- `/NewInstructions DOMAIN: "Area", APPLY_TO: "glob"` — Create coding rules
- `/NewPrompt PURPOSE: "Template goal"` — Create a prompt template
- `/NewMultiAgent SYSTEM_NAME: "Name", COMPLEXITY: "orchestra", REPOSITORY_PATH: "/path"` — Generate orchestrated multi-agent system
- `/NewSkill SKILL_NAME: "name", PURPOSE: "desc"` — Create a cross-platform skill
- `/NewMultiAgent SYSTEM_NAME: "name", COMPLEXITY: "linear"` — Create a multi-agent workflow
- `/NewAgentsFile REPOSITORY_PATH: "/path"` — Generate workspace AGENTS.md

Tip: Type `/` in Copilot Chat to see all available commands.

### Maintenance & Toolkit Commands

These are available as standard slash commands in the VS Code palette:

- `/Maintain` — Unified maintenance (optimize, harmonize, validate with configurable modes)
- `/QuickFix` — Fast minimal-diff changes with single approval gate
- `/Evolve` — Toolkit self-improvement (release monitoring, audits, optimization, features)

---

## 🌍 Understanding Skills (Cross-Platform Capabilities)

Skills are **portable AI capabilities** that work across multiple platforms: VS Code, GitHub Copilot CLI, Claude, Cursor, Goose, and other compatible agents. Based on the open standard at [agentskills.io](https://agentskills.io).

**Status**: Agent Skills are **generally available** in VS Code 1.109+ (enabled by default). Organization-wide skills and custom locations are supported.

### What Are Skills?

Skills are self-contained, reusable knowledge units that teach AI systems how to perform specific tasks. Unlike agents (which are VS Code-specific), skills are **platform-agnostic** and can be used:

- **In VS Code** Copilot Chat
- **In GitHub Copilot CLI** on the command line
- **In Claude** (Claude.com or Claude Desktop)
- **In Cursor** editor
- **In any compatible AI agent** that supports agentskills.io

### Skills vs Agents vs Instructions vs Prompts

| Asset | Portability | Use Case | Invocation |
|-------|------------|----------|-----------|
| **Skills** | 🌍 Cross-platform | Teach methodology, patterns, best practices | Auto-loaded or `/invoke-skill` |
| **Agents** | 🔧 VS Code only | VS Code specialists with tool access | Mode picker in Chat |
| **Instructions** | 📋 VS Code/GitHub | Coding standards for specific files | Auto-applied to matching files |
| **Prompts** | ⚡ VS Code/GitHub | Task templates with parameters | `/CommandName` slash commands |

**Decision Framework**:
```
Question 1: Should this work across platforms (VS Code, CLI, Claude)?
  → YES: Create a Skill
  → NO: Go to Q2

Question 2: Does this need VS Code file system or tool access?
  → YES: Create an Agent
  → NO: Go to Q3

Question 3: Is this reusable across many files/projects?
  → YES: Create Instructions
  → NO: Create a Prompt
```

### The 6 Available Skills

**1. repo-analysis** 🔍  
Analyze code structure, tech stack, patterns, dependencies. Use when starting projects or assessing customization needs.

**2. planning** 📋  
Strategic implementation planning with risk mitigation and validation strategies. Use when planning features or refactoring.

**3. asset-design** 🎨  
Design and validate Copilot customization assets. Provides decision frameworks and quality criteria.

**4. documentation** 📝  
Structured technical documentation generation for changes, APIs, and architecture decisions.

**5. deployment-automation** 🚀  
CI/CD pipeline design, deployment strategies, GitHub Actions workflows, monitoring and rollback.

**6. orchestration** 🎭  
Conductor/subagent systems with TDD lifecycle, quality gates, plan tracking, and parallel execution.

### How to Use Skills

**VS Code**: Reference skills directly: `Use repo-analysis skill to analyze /path/to/project`  
**CLI**: `copilot --skill repo-analysis --input "Analyze /path/to/project"`  
**Claude/Cursor**: Reference skills in prompts with attached files

### Skill Examples in Action

**Repository Analysis**: `Use repo-analysis to analyze /path/to/project` → Detects tech stack, patterns, dependencies, recommends customizations

**Planning**: `Plan feature implementation using planning skill` → Requirements, strategy, phases, testing, risk mitigation, timeline

**Asset Design**: `Should X be a Skill or Agent? Use asset-design` → Decision framework, architecture recommendations, integration strategy

### Best Practices for Using Skills

1. **Reference explicitly**: "Use [skill-name] skill to..." clarifies intent
2. **Combine workflows**: repo-analysis → planning → documentation
3. **Share cross-platform**: Skills work in VS Code, CLI, Claude, Cursor

### Agent Files (`*.agent.md`)

**Location**: `.github/agents/` | **Required YAML**: `description`  
**Optional**: `tools`, `handoffs`, `agents`, `user-invokable`, `model`

**See**: [VS Code Copilot Docs](https://code.visualstudio.com/docs/copilot/customization/custom-agents)

### Instruction Files (`*.instructions.md`)

**Location**: `.github/instructions/` | **Required YAML**: `applyTo`, `description`  
**Patterns**: `**/*.ts`, `src/**/*.py`, `**/*.test.js`

### Prompt Files (`*.prompt.md`)

**Location**: `.github/prompts/` | Use `{VARIABLE}` syntax for parameters

### AGENTS.md Files

**Location**: Project root | Provides setup, code style, PR requirements, conflict resolution

---

## 🎯 Creating Custom Assets

### Using Bootstrap (Fastest Method)

**For Complete Project Setup**:

1. In Copilot Chat, ask directly with inline variables:
   ```
   Bootstrap Copilot assets for repository at: /absolute/path/to/your-project
   ```
   Or use the `/Bootstrap` slash command:
   ```
   /Bootstrap with REPOSITORY_PATH: "/absolute/path/to/your-project"
   ```
3. Confirm when agent presents the plan
   - **VS Code 1.106+**: Click the confirmation button
   - **Earlier versions**: Type "confirm" in chat

**Result**: Complete customization generated in 2-3 minutes:
- Agents tailored to your tech stack
- Instructions for your patterns
- Prompts for common workflows
- AGENTS.md with project guidance
- All cross-referenced and harmonized

### Creating Individual Agents

**Using the Generator**:

1. In Copilot Chat, ask with inline variables:
   ```
   Create a new Copilot agent:
   - Name: DatabaseExpert
   - Domain: PostgreSQL optimization  
   - Role: Optimize queries and schema design
   - Capabilities: Query analysis, index suggestions, explain plans
   ```
   Or use the `/NewAgent` slash command:
   ```
   /NewAgent with AGENT_NAME: "DatabaseExpert", 
   DOMAIN: "PostgreSQL optimization"
   ```
2. Agent will confirm details and create the file
   - **VS Code 1.106+**: Click "Generate Agent" button
   - **Earlier versions**: Type "confirm" when ready
3. Agent created in `your-project/.github/agents/DatabaseExpert.agent.md`

**Adding Handoff Workflows** (VS Code 1.106+):
To enable guided transitions between agents, add handoffs to the YAML frontmatter:
```yaml
---
description: 'Expert in database optimization'
tools: ['codebase', 'search']
handoffs:
  - label: Review Schema Changes
    agent: review
    prompt: Review the database schema changes for best practices.
    send: false
---
```

**Manual Creation** (Advanced):

1. Create file: `your-project/.github/agents/YourAgent.agent.md`
2. Add YAML front matter with `description` field
3. Follow agent structure template (see above)
4. Test by selecting agent in Copilot custom agent picker

### Creating Instructions

**Using the Generator**:

1. In Copilot Chat, ask with inline rules:
   ```
   Create instructions for React Testing:
   - All components must have tests
   - Use React Testing Library  
   - 90% coverage minimum
   - Test accessibility with jest-axe
   - Apply to: **/*.test.tsx
   ```
   Or use the `/NewInstructions` slash command:
   ```
   /NewInstructions for DOMAIN: "React Testing", 
   APPLY_TO: "**/*.test.tsx"
   ```
2. Instructions created in `your-project/.github/instructions/`

**Manual Creation**:

1. Create file: `your-project/.github/instructions/YourRules.instructions.md`
2. Add YAML with `applyTo` and `description`
3. Define clear rules and guidelines
4. Test by asking Copilot to generate code in matching files

### Creating Prompts

**Using the Generator**:

1. In Copilot Chat, describe the prompt:
   ```
   Create a prompt template for generating API endpoints with:
   - Endpoint name variable
   - HTTP method variable
   - Request schema variable
   - Response schema variable
   ```
   Or use the `/NewPrompt` slash command:
   ```
   /NewPrompt for PURPOSE: "Generate API endpoint with tests"
   ```
2. Prompt created in `your-project/.github/prompts/`

**Usage Pattern**:
- Use your generated prompt as a slash command with inline variables:
  ```
  /GenerateEndpoint for ENDPOINT_NAME: "createUser", 
  HTTP_METHOD: "POST"
  ```
- Agent will ask for any missing variables
- Review and confirm generated code

### Asset Naming Conventions

**Note**: Legacy `.chatmode.md` files are deprecated. Use `.agent.md` (VS Code 1.109 supports enhanced handoffs, orchestration controls, and parallel execution in `.agent.md`).

| Asset Type | Pattern | Example |
|------------|---------|---------|
| Agent Files | `PascalCase.agent.md` | `DatabaseExpert.agent.md` |
| Prompts | `PascalCase.prompt.md` | `GenerateEndpoint.prompt.md` |
| Instructions | `PascalCase.instructions.md` | `ReactPatterns.instructions.md` |
| Templates | `PascalCase.template.md` | `ChangeLog.template.md` |
| Workspace File | `AGENTS.md` | `AGENTS.md` |

---

## 🔧 Advanced Workflows

### Repository Analysis

`/Review TARGET_PATH: "/path/to/project", FOCUS_AREA: "all"`  
Provides: Tech stack detection, asset inventory, gap analysis, recommendations

### Maintain Assets

`/Maintain TARGET_PATH: ".github/", MODE: "all"`  
**Modes**: `optimize` (token efficiency) | `harmonize` (cross-refs) | `validate` (compliance) | `all`

### Creating Multi-Agent Systems

**Handoff Chains** (VS Code 1.106+): Define `handoffs` in YAML for guided workflows  
**Orchestrated Systems**: `/NewMultiAgent` for conductor-managed phases with TDD and quality gates

**Patterns**: Linear (sequential) | Orchestra (3-5 agents) | Atlas (5-10 agents, parallel)

**Example: Generate an Orchestra System**
```
/NewMultiAgent SYSTEM_NAME: "FeatureOrchestra",
SYSTEM_PATTERN: "orchestra",
REPOSITORY_PATH: "/path/to/your-project",
DOMAIN: "Node.js REST API"
```

**Example: Generate an Atlas System with Parallel Execution**
```
/NewMultiAgent SYSTEM_NAME: "ProjectAtlas",
SYSTEM_PATTERN: "atlas",
REPOSITORY_PATH: "/path/to/large-project",
DOMAIN: "Full-stack TypeScript",
PARALLEL_ENABLED: "true"
```

**What Gets Generated**:
- Conductor agent (orchestrates phases, manages quality gates)
- Subagent files (planner, implementer, reviewer, etc.)
- Plan file template (`plans/PLAN.md`)
- VS Code settings (`chat.customAgentInSubagent.enabled: true`)
- Updated AGENTS.md with system inventory

**Skills Reference**: The `orchestration` skill provides the complete methodology for orchestration patterns, conductor design, subagent archetypes, TDD lifecycle, and quality gates.

---

## 🏢 Enterprise Standards

Store tech-stack-specific standards in `.github/standards/` (languages/, frameworks/, practices/). Standards are matched by technology and influence generated assets.  
**YAML**: `name`, `technologies`, `scope`, `priority`  
**See**: `.github/standards/README.md`

---

## 💡 Best Practices

### Multi-Workspace Pattern

**DO**: Keep CopilotCustomizer in separate folder, use absolute paths, generate into YOUR project, close when done  
**DON’T**: Copy files, modify framework, commit to your project, use relative paths

**Cleanup**: Right-click CopilotCustomizer → Remove Folder from Workspace

### Design & Security

**Design**: Single responsibility, clear naming, composability, include examples  
**Performance**: Specific file refs (`#file:`), concise language, targeted `applyTo`  
**Security**: No embedded secrets, review generated code, configure tool approvals

### Maintenance

**Monthly**: `/Review` for audits | **Quarterly**: `/Maintain MODE: "all"` | **After changes**: `/Maintain MODE: "validate"`  
**Team**: Commit `.github/` folder, review asset changes in PRs, share patterns

### Toolkit Evolution

`/Evolve` commands route through CopilotCustomizer orchestrator:  
`task: "monitor-releases"` | `"review-docs"` | `"audit-assets"` | `"optimize"` | `"self-validate"`

---

## 🔍 Troubleshooting

| Issue | Solution |
|-------|----------|
| Prompts not found | Verify CopilotCustomizer in workspace, reload window |
| Assets in wrong location | Use absolute paths in `REPOSITORY_PATH` |
| Agent not in picker | Check `.github/agents/`, YAML `description`, reload |
| Instructions ignored | Validate `applyTo` glob, check YAML syntax |
| Broken cross-references | Run `/Maintain MODE: "harmonize"` |
| Slow responses | Use specific file refs, optimize assets, close unused workspaces |
| Handoff buttons missing | Requires VS Code 1.109+, check `.agent.md`, validate YAML |

**Diagnostics**: Right-click in Chat → Diagnostics to see loaded assets and errors

---

## 🌐 Integration Patterns

**Team Adoption**: One member bootstraps → Commit `.github/` → Team pulls → Consistent AI behavior  
**CI/CD**: Validate assets in CI (check `.github/agents`, `.github/instructions` exist)  
**Version Control**: Commit generated `.github/` and `AGENTS.md` | Don't commit CopilotCustomizer framework

---

## 📚 Additional Resources

### Documentation
- **[README.md](../README.md)** - Framework overview and quick start
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide
- **[EXAMPLES.md](EXAMPLES.md)** - Real-world tech stack examples
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Architecture and asset inventory

### Official VS Code Resources
- [VS Code Copilot Customization](https://code.visualstudio.com/docs/copilot/customization/overview)
- [Custom Agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents)
- [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [MCP Servers](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [Tool Management](https://code.visualstudio.com/docs/copilot/chat/chat-tools)

### Community
- [GitHub Copilot Discussions](https://github.com/orgs/community/discussions/categories/copilot)
- [VS Code Issues](https://github.com/microsoft/vscode/issues)
- [Copilot Best Practices](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot)

---

## 🎓 Summary

**Key Takeaways**:

1. **Multi-Workspace Pattern**: Keep CopilotCustomizer separate as a toolbox
2. **Generate, Don't Copy**: Use prompts to generate assets in YOUR project
3. **Bootstrap First**: Use `Bootstrap` for complete setup
4. **Iterate**: Use individual generators and optimizers to refine
5. **Validate**: Regular audits with `Review` and `Maintain`
6. **Share**: Commit `.github/` folder for team consistency

**Next Steps**:

- [ ] Set up multi-workspace with your project
- [ ] Run `Bootstrap` to generate initial customization
- [ ] Test generated assets with project-specific questions
- [ ] Refine with `Maintain` and additional generators
- [ ] Commit to repository and share with team

---

*Enterprise-ready VS Code GitHub Copilot customization framework*
**Version**: 1.3.0 | **Updated**: February 2026
