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

**See**: [MULTI-WORKSPACE.md](MULTI-WORKSPACE.md) for detailed setup patterns

### First Steps with the Framework

1. **Bootstrap Complete Customization**:
   - In Copilot Chat, use the `/BootstrapRepo` slash command:
     ```
     /BootstrapRepo for REPOSITORY_PATH: "/path/to/your-project"
     ```
   - Or ask directly: `Bootstrap my repository at /path/to/your-project`
   - Agent will confirm details and generate assets in YOUR project

2. **Explore Generated Assets**:
   - Navigate to `your-project/.github/` folder
   - Review agents, instructions, and prompts created
   - Test by asking Copilot project-specific questions

3. **Iterate and Refine**:
   - Use `/RepoReview` to analyze what was created
   - Use individual generators (`/NewCopilotAgent`, `/NewInstructions`) to add more
   - Use `/AssetOptimization` to improve existing assets

---

## ⚡ Slash Command Cheat Sheet

Use these commands in Copilot Chat to run workflows directly:

- `/BootstrapRepo REPOSITORY_PATH: "/abs/path/to/project"` — Generate full customization
- `/RepoReview TARGET_PATH: "/abs/path/to/project"` — Analyze repository and assets
- `/NewCopilotAgent AGENT_NAME: "Name", DOMAIN: "Area"` — Create a new agent
- `/NewInstructions DOMAIN: "Area", APPLY_TO: "glob"` — Create coding rules
- `/NewPrompt PURPOSE: "Template goal"` — Create a prompt template
- `/AssetOptimization TARGET_PATH: "/abs/path/to/project/.github"` — Improve assets
- `/FormatAssets TARGET_PATH: "/abs/path/to/project/.github"` — Format and verify assets
- `/WorkflowValidator WORKFLOW: "all", STRICT: "true"` — Validate workflow integrity

Tip: Type `/` in Copilot Chat to see all available commands.

---

## 🌍 Understanding Skills (Cross-Platform Capabilities)

Skills are **portable AI capabilities** that work across multiple platforms: VS Code, GitHub Copilot CLI, Claude, Cursor, Goose, and other compatible agents. Based on the open standard at [agentskills.io](https://agentskills.io).

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

### The 5 Available Skills

**1. repository-analysis** 🔍
- **Purpose**: Deep repository analysis methodology
- **Teaches**: How to systematically analyze code structure, tech stack, patterns, dependencies, and impact
- **Use When**: Starting work on a new project, understanding existing codebase, assessing customization needs
- **Platforms**: VS Code, CLI, Claude, Cursor
- **Example**:
  ```
  Analyze /Users/dev/my-api using the repository-analysis skill.
  What's the tech stack, architecture pattern, and dependencies?
  ```

**2. implementation-planning** 📋
- **Purpose**: Strategic implementation planning methodology
- **Teaches**: How to plan complex changes with requirements clarification, strategy design, risk mitigation, testing strategy
- **Use When**: Planning features, refactoring, complex code changes, establishing validation approaches
- **Platforms**: VS Code, CLI, Claude, Cursor
- **Example**:
  ```
  Use implementation-planning skill to plan:
  1. Add API authentication (JWT)
  2. Create database migrations
  3. Generate test suite
  ```

**3. copilot-asset-design** 🎨
- **Purpose**: Design and validate GitHub Copilot customization assets
- **Teaches**: Decision frameworks for Skill vs Agent vs Instructions vs Prompts, architecture patterns, quality criteria, integration strategies
- **Use When**: Creating new customizations, validating asset structure, planning architecture for tools
- **Platforms**: VS Code, CLI, Claude, Cursor
- **Example**:
  ```
  Design a customization for API endpoint generation.
  Should it be a Skill, Agent, or both? Use copilot-asset-design skill.
  ```

**4. technical-documentation** 📝
- **Purpose**: Structured technical documentation generation
- **Teaches**: How to write change summaries, API documentation, architectural decisions, implementation reports, user guides with consistent format
- **Use When**: Documenting code changes, features, API endpoints, architecture decisions, deployment procedures
- **Platforms**: VS Code, CLI, Claude, Cursor
- **Example**:
  ```
  Document these API endpoint changes using technical-documentation skill:
  - POST /users (create)
  - GET /users/:id (retrieve)
  - PUT /users/:id (update)
  ```

**5. deployment-automation** 🚀
- **Purpose**: CI/CD pipeline design and deployment strategies
- **Teaches**: GitHub Actions workflows, deployment strategies (blue-green, canary, rolling), environment configuration, testing, monitoring, rollback procedures
- **Use When**: Setting up CI/CD pipelines, designing deployment strategies, planning release workflows, implementing infrastructure automation
- **Platforms**: VS Code, CLI, Claude, Cursor
- **Example**:
  ```
  Using deployment-automation skill, design a CI/CD pipeline for:
  - Build and test on every push
  - Deploy to staging automatically
  - Manual approval for production
  ```

### How to Use Skills

#### In VS Code Copilot Chat

Skills are automatically available. Just reference them in your question:

```
Use the repository-analysis skill to analyze my project at /path/to/project
```

Or ask Copilot to apply a skill:

```
Help me plan this feature using the implementation-planning skill
```

#### In GitHub Copilot CLI

```bash
# Invoke a skill from the command line
copilot --skill repository-analysis \
  --input "Analyze /Users/dev/my-project for tech stack and dependencies"

# Or use skill for planning
copilot --skill implementation-planning \
  --input "Plan implementation of user authentication feature"
```

#### In Claude Desktop

Attach files and ask Claude to use a skill:

```
I've attached my project files. Use the repository-analysis skill to 
understand the codebase structure and tech stack.
```

#### In Cursor Editor

Cursor supports skills through its AI chat:

```
@codebase Use the implementation-planning skill to plan refactoring 
of the authentication module.
```

### Skill Examples in Action

**Example 1: Repository Analysis Across Platforms**

**In VS Code**:
```
User: "I'm taking over a Node.js/Express project. Can you analyze it?"
AI (using repository-analysis):
1. Maps directory structure
2. Detects tech stack (Express, PostgreSQL, Jest)
3. Identifies patterns (MVC architecture)
4. Lists dependencies
5. Assesses impact for customization
→ Recommends: "APISpecialist agent + database migration helper"
```

**In GitHub Copilot CLI** (same project, command line):
```bash
copilot --skill repository-analysis \
  --input "Quick analysis of /Users/dev/my-api structure"

Output: Same analysis in text format
```

**In Claude Desktop** (for strategic discussion):
```
Attach project files, ask:
"Use repository-analysis skill to understand this codebase.
What are the strengths and weaknesses of the current architecture?"

Claude (using skill):
- Strengths: Clear layering, good test coverage
- Weaknesses: Monolithic structure, potential scaling issues
- Recommendations: Consider microservices extraction
```

**Example 2: Implementation Planning for Multi-Phase Project**

**In VS Code**:
```
User: "Plan the implementation of payment processing (Stripe integration)"
AI (using implementation-planning):
1. Requirements clarification
2. Strategy design (incremental approach recommended)
3. Change specification (4 phases)
4. Testing strategy (unit + integration + manual)
5. Risk mitigation (PCI compliance, refund handling)
6. Validation planning
7. Team handoff (communication plan)

Result: Complete 6-week roadmap with milestones
```

**Across platforms**: Get same structured plan in VS Code, CLI, Claude, or Cursor.

**Example 3: Asset Design Decision**

**Question**: "Should API endpoint generation be a Skill or Agent?"

**Using copilot-asset-design**:
- Decision framework analysis
- Recommendation: **Both** (Skill for patterns + Agent for VS Code file I/O)
- Architecture design
- Integration strategy
- Quality checklist

Available in VS Code, CLI, Claude, and all platforms.

### Best Practices for Using Skills

1. **Use skills for methodology** - When you need to understand HOW to approach something
2. **Reference skills explicitly** - "Use the [skill-name] skill to..." makes intent clear
3. **Combine skills** - Many workflows use multiple skills:
   - repository-analysis → implementation-planning → technical-documentation
   - Technical decisions → copilot-asset-design → Agent creation
4. **Skills are foundational** - They provide the knowledge that agents, instructions, and prompts build upon
5. **Share across teams** - Skills work everywhere, so share them with team members using different tools

### Skill Examples Files

Each skill includes real-world examples:
- **repository-analysis**: [Express.js API analysis example](./github/skills/repository-analysis/examples/example-express-api.md)
- **implementation-planning**: [API customization planning example](./github/skills/implementation-planning/examples/example-api-customization.md)
- **copilot-asset-design**: [APISpecialist design example](./github/skills/copilot-asset-design/examples/example-api-specialist-design.md)
- **technical-documentation**: [Change summary documentation example](./github/skills/technical-documentation/examples/example-api-change-summary.md)

---

### Agent Files (`*.agent.md`)

Agent files define AI personas with specific behaviors and capabilities for VS Code Copilot.

**Location**: `.github/agents/` in YOUR project (generated by CopilotCustomizer)

**YAML Front Matter** (required):
```yaml
description: 'Brief description of the agent'
```

**Optional Fields (VS Code 1.106+)**:
```yaml
target: 'vscode'                    # Optimization: 'vscode' or 'github-copilot'
name: 'Display Name'                # Override file-based name
argument-hint: 'Usage guidance'     # Show guidance in chat input
tools: ['search', 'edit']           # Approved tools array
model: 'gpt-4'                      # Preferred AI model
handoffs:                            # Workflow transitions
  - label: 'Next Step'
    agent: 'target-agent'
    prompt: 'Context for next agent'
    send: false
mcp-servers: ['server-name']        # External MCP tool servers
```

**Target Property**:
- `target: vscode` - Optimizes for local VS Code chat (supports all properties)
- `target: github-copilot` - Optimizes for GitHub Copilot cloud agents and CLI
- Omit for compatibility with both environments

**Structure**:
```markdown
description: 'Expert in database optimization'

## Copilot Agent: Database Expert

### Role
[Persona definition and capabilities]

### Core Objectives
1. **Objective 1**: Description
2. **Objective 2**: Description

### Workflow
[Step-by-step process]

### Depth Modes
| Mode | Use Case | Output |
|------|----------|--------|
| quick-advice | Fast help | Brief responses |
| standard | Normal use | Full analysis |
| deep-architecture | Complex tasks | Comprehensive output |
```

**Key Features**:
- **Depth Modes**: Different levels of detail based on complexity
- **Refinement Commands**: Interactive improvement options (`refine: audit`, `refine: optimize`)
- **Tool Integration**: Access to MCP servers and VS Code tools
- **Handoff Workflows**: Clickable buttons to transition between specialized agents with context

#### Handoff Buttons for Multi-Step Workflows

**Available in VS Code 1.106+** - Create guided workflows with interactive confirmation buttons.

**How It Works**:
1. Agent completes its response
2. Handoff button appears below response
3. User clicks button to transition to next agent
4. Prompt is pre-filled with context
5. User reviews and confirms (or auto-executes)

**Example: Planning → Implementation Workflow**
```yaml
---
description: Generate implementation plan without code changes
tools: ['search', 'fetch', 'codebase']
handoffs:
  - label: Start Implementation
    agent: implementation
    prompt: Implement the plan outlined above.
    send: false
---

# Planning Agent Instructions
Generate detailed implementation plans.
Do not make code edits, only create plans.
```

**Multi-Step Chain Example**:
```yaml
# Planning Agent
handoffs:
  - label: Start Implementation
    agent: implementation
    prompt: Implement the plan above.
    send: false

# Implementation Agent
handoffs:
  - label: Review Changes
    agent: review
    prompt: Review implementation for quality and security.
    send: false

# Review Agent
handoffs:
  - label: Generate Tests
    agent: testing
    prompt: Create tests for the reviewed code.
    send: false
```

**Handoff Properties**:
- `label`: Button text displayed to user
- `agent`: Target custom agent identifier
- `prompt`: Pre-filled prompt text for next agent
- `send`: `true` = auto-submit, `false` = user must confirm (default: `false`)

**Best Practices**:
- Use `send: false` for important transitions requiring review
- Use `send: true` only for safe, automated steps
- Keep prompts clear and contextual
- Chain related workflows (plan → implement → review → test)

**Note**: In VS Code 1.106+, use interactive handoff buttons. In earlier versions, use text-based confirmation (type "confirm").

### Instruction Files (`*.instructions.md`)

Instructions provide detailed guidance for AI behavior and code generation rules.

**Location**: `.github/instructions/` in YOUR project

**YAML Front Matter** (required):
```yaml
---
applyTo: '**/*.ts'                     # File patterns
description: 'TypeScript coding standards'
---
```

**Structure**:
```markdown
---
applyTo: ['**/*.ts', '**/*.tsx']
description: 'React TypeScript patterns'
---

## React TypeScript Standards

### Objective
Enforce best practices for React components in TypeScript.

### Rules and Guidelines
1. **Component Structure**: Functional components with typed props
2. **State Management**: Use hooks with proper typing
3. **Error Handling**: Implement error boundaries
```

**Apply To Patterns**:
- `**/*.ts` - All TypeScript files
- `src/**/*.py` - Python files in src folder
- `**/*.test.js` - All test files
- Reference-only: Use `applyTo: 'reference-only'` for framework instructions

### Prompt Files (`*.prompt.md`)

Prompts are structured templates for consistent AI interactions.

**Location**: `.github/prompts/` in YOUR project

**Structure**:
```markdown
## Generate Component Template

### Task Intent
Generate a reusable React component with TypeScript typing and tests.

### Usage Instructions
1. Fill in component name and props
2. Review generated code
3. Confirm to create files

### Variable Block
```
COMPONENT_NAME: "{name}"
PROPS_INTERFACE: "{interface definition}"
INCLUDE_TESTS: "true"
```

### Example
```
COMPONENT_NAME: "UserCard"
PROPS_INTERFACE: "{ name: string; email: string; }"
INCLUDE_TESTS: "true"
```
```

**Variable Syntax**: Use `{VARIABLE_NAME}` for replaceable parameters

### AGENTS.md Files

AGENTS.md provides project-specific guidance for AI coding assistants.

**Location**: Root of YOUR project (not in `.github/`)

**Structure**:
```markdown
# Your Project Name

[Brief project description]

## Quick Start

### Install & Build
```bash
npm install
npm run build
```

### Testing
```bash
npm test
npm run lint
```

## Code Style
- Use TypeScript strict mode
- Follow ESLint configuration
- Prefer functional patterns
- Document public APIs

## PR Instructions
- Title format: `type(scope): description`
- Run tests before submitting
- Include changeset for releases
- Request review from @team

## Conflict Resolution
1. Explicit chat instructions (highest priority)
2. This AGENTS.md file
3. Global instruction files
```

### Template Files (`*.template.md`)

Templates provide standardized formats for documentation and analysis.

**Location**: `.github/templates/` in YOUR project

**Available Templates**:
- **Analysis.template.md**: Universal analysis framework
- **ImplementationPlan.template.md**: Project planning format
- **ProgressLog.template.md**: Quick progress tracking
- **TestStrategy.template.md**: Test planning and TDD workflows
- **SecurityReview.template.md**: Security assessments
- **ChangeLog.template.md**: Release notes format
- **AssetInventory.template.md**: Asset tracking

---

## 🎯 Creating Custom Assets

### Using Bootstrap (Fastest Method)

**For Complete Project Setup**:

1. Open Copilot Chat (`Ctrl+Shift+I`)
2. Ask directly with inline variables:
   ```
   Bootstrap Copilot assets for repository at: /absolute/path/to/your-project
   ```
   Or use the `/BootstrapRepo` slash command:
   ```
   /BootstrapRepo with REPOSITORY_PATH: "/absolute/path/to/your-project"
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
   Or use the `/NewCopilotAgent` slash command:
   ```
   /NewCopilotAgent with AGENT_NAME: "DatabaseExpert", 
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

**Note**: Legacy `.chatmode.md` files are deprecated. Use `.agent.md` (VS Code 1.106+ supports enhanced handoffs in `.agent.md`).

| Asset Type | Pattern | Example |
|------------|---------|---------|
| Agent Files | `PascalCase.agent.md` | `DatabaseExpert.agent.md` |
| Prompts | `PascalCase.prompt.md` | `GenerateEndpoint.prompt.md` |
| Instructions | `PascalCase.instructions.md` | `ReactPatterns.instructions.md` |
| Prompts | `PascalCase.prompt.md` | `GenerateEndpoint.prompt.md` |
| Templates | `PascalCase.template.md` | `SecurityReview.template.md` |
| Workspace File | `AGENTS.md` | `AGENTS.md` |

---

## 🔧 Advanced Workflows

### Repository Analysis

**Analyze Your Project**:

1. In Copilot Chat, ask directly:
   ```
   Review repository at /path/to/your-project and analyze all Copilot assets
   ```
   Or use the `/RepoReview` slash command:
   ```
   /RepoReview for TARGET_PATH: "/path/to/your-project", FOCUS_AREA: "all assets"
   ```
2. Review comprehensive analysis:
   - Tech stack detection
   - Existing asset inventory
   - Gap analysis
   - Recommendations

**Use Cases**:
- Before generating assets (understand what you need)
- After making changes (validate integrity)
- Regular audits (maintain quality)

### Asset Optimization

**Improve Existing Assets**:

1. In Copilot Chat, specify what to optimize:
   ```
   Optimize these Copilot assets:
   - your-project/.github/agents/APIExpert.agent.md
   - your-project/.github/instructions/APIPatterns.instructions.md
   ```
   Or use the `/AssetOptimization` slash command:
   ```
   /AssetOptimization for files in your-project/.github/
   ```
2. Review improvements:
   - Token efficiency gains
   - Clarity enhancements
   - Schema compliance fixes

### Format and Verify Assets

**Standardize Formatting**:

1. In Copilot Chat, request formatting:
   ```
   Format and verify all Copilot assets in your-project/.github/ and fix any issues
   ```
   Or use the `/FormatAssets` slash command:
   ```
   /FormatAssets for TARGET_PATH: "your-project/.github/", SEVERITY: "fix"
   ```
2. Automatic formatting applied:
   - YAML front matter standardization
   - Markdown structure consistency
   - Cross-reference validation

### Harmonize Assets

**Link Related Assets**:

1. In Copilot Chat, specify assets to link:
   ```
   Harmonize these Copilot assets:
   - TestExpert agent
   - TestPatterns instructions  
   - GenerateTest prompt
   ```
   Or use the `/HarmonizeAssets` slash command:
   ```
   /HarmonizeAssets for these assets in your-project/.github/
   ```
2. Assets linked with cross-references and metadata

### Workflow Integrity Checks

**Validate Workflows**:

1. In Copilot Chat, request validation:
   ```
   Validate all workflow integrity with strict mode enabled
   ```
   Or use the `/WorkflowValidator` slash command:
   ```
   /WorkflowValidator for WORKFLOW: "all", STRICT: "true"
   ```
2. Comprehensive validation:
   - Agent handoff chains
   - Cross-reference integrity
   - Schema compliance
   - Link health

### Creating Multi-Step Workflows with Handoffs

**VS Code 1.106+ Feature** - Build guided workflows with interactive confirmation buttons.

**Example: Test-Driven Development Workflow**

**1. Create Planning Agent** (`Planning.agent.md`):
```yaml
---
description: Analyze requirements and create implementation plan
target: vscode
tools: ['search', 'codebase', 'fetch']
handoffs:
  - label: Write Failing Tests
    agent: test-first
    prompt: Generate failing tests based on the plan above.
    send: false
---

Analyze requirements and generate detailed implementation plan.
Do not write code, only create plans.
```

**2. Create Test-First Agent** (`TestFirst.agent.md`):
```yaml
---
description: Generate failing tests that define expected behavior
target: vscode
tools: ['codebase', 'edit']
handoffs:
  - label: Implement to Pass Tests
    agent: implementation
    prompt: Implement the code to make these tests pass.
    send: false
---

Write failing tests that clearly define expected behavior.
Tests should fail initially but be easy to review.
```

**3. Create Implementation Agent** (`Implementation.agent.md`):
```yaml
---
description: Implement code to satisfy failing tests
target: vscode
tools: ['codebase', 'edit', 'terminal']
handoffs:
  - label: Review Implementation
    agent: review
    prompt: Review implementation for quality, security, and best practices.
    send: false
---

Implement code to make failing tests pass.
Follow TDD principles and keep changes minimal.
```

**4. Create Review Agent** (`Review.agent.md`):
```yaml
---
description: Review code for quality and security issues
target: vscode
tools: ['codebase', 'search', 'problems']
handoffs:
  - label: Generate Documentation
    agent: docs
    prompt: Document the implemented changes.
    send: false
---

Review implementation for:
- Security vulnerabilities
- Code quality issues
- Best practice violations
- Performance concerns
```

**Workflow Execution**:
1. User: "Add user authentication feature"
2. Planning agent analyzes → Click "Write Failing Tests" button
3. TestFirst agent generates tests → Click "Implement to Pass Tests" button
4. Implementation agent writes code → Click "Review Implementation" button
5. Review agent checks quality → Click "Generate Documentation" button
6. Complete workflow with full context preservation

**Benefits**:
- ✅ Guided workflow with clear next steps
- ✅ Context automatically passed between agents
- ✅ User reviews each step before proceeding
- ✅ No manual mode switching or prompt crafting
- ✅ Consistent, repeatable processes

---

## 💡 Best Practices

### Multi-Workspace Pattern

✅ **DO**:
- Keep CopilotCustomizer in separate workspace folder
- Use absolute paths when specifying `REPOSITORY_PATH`
- Generate assets into YOUR project, not CopilotCustomizer
- Close CopilotCustomizer folder when not actively using it
- Keep CopilotCustomizer updated: `git pull` regularly

❌ **DON'T**:
- Copy CopilotCustomizer files into your project
- Modify CopilotCustomizer framework files directly
- Commit CopilotCustomizer to your project repository
- Use relative paths in prompts (can be ambiguous)

### Asset Design Principles

1. **Single Responsibility**: Each asset should have a clear, focused purpose
2. **Composability**: Assets should work well together
3. **Clear Naming**: Use descriptive PascalCase names
4. **Documentation**: Include usage examples and context
5. **Version Tracking**: Use schema versions for maintainability

### Performance Optimization

**Token Efficiency**:
- Use concise language in prompts and instructions
- Avoid unnecessary repetition
- Reference shared patterns instead of duplicating
- Use depth modes for different complexity levels

**Response Speed**:
- Implement `quick-advice` modes for simple queries
- Use specific file references instead of `@workspace` when possible
- Apply instructions with specific `applyTo` patterns (not too broad)

**Context Management**:
- Use `#file:name` to reference specific files
- Leverage `#selection` for focused code analysis
- Implement caching strategies for common queries

### Security Considerations

**Sensitive Information**:
- Never embed API keys or secrets in assets
- Use environment variables for credentials
- Review generated content for accidental information leakage

**Tool Approvals**:
- Configure appropriate approval levels in VS Code settings
- Review tool configurations in agent files
- Use MCP server trust levels appropriately
- Start with "Always ask" until comfortable

**Code Review**:
- Always review generated code before accepting
- Use Edits UI to see all changes
- Test generated code thoroughly
- Validate against security best practices

### Maintenance Strategy

**Regular Audits**:
```bash
# Monthly: Run repository review
# /RepoReview for TARGET_PATH: "your-project"

# Quarterly: Format and verify all assets
# /FormatAssets

# After major changes: Validate workflow integrity
# /WorkflowValidator
```

**Version Management**:
- Track schema versions in asset headers
- Plan migration strategies for breaking changes
- Maintain backward compatibility when possible
- Document version dependencies

**Team Synchronization**:
- Commit `.github/` folder to your repository
- All team members get consistent AI behavior
- Review asset changes in pull requests
- Share customization patterns across projects

---

## 🔍 Troubleshooting

### Common Issues and Solutions

#### CopilotCustomizer Prompts Not Found

**Symptoms**: Can't find prompt files in Copilot Chat

**Solutions**:
1. Verify CopilotCustomizer added to workspace
2. Check Explorer sidebar shows both folders
3. Expand `CopilotCustomizer` → `.github` → `prompts`
4. Reload VS Code window if needed

#### Assets Generated in Wrong Location

**Symptoms**: New files appear in CopilotCustomizer folder instead of your project

**Solutions**:
1. Verify `REPOSITORY_PATH` uses **absolute path**
   - Correct: `/Users/dev/my-project`
   - Wrong: `./my-project` or `../my-project`
2. Ensure both folders are open in same workspace
3. Check file permissions on your project folder
4. Move files manually if needed:
   ```powershell
   Move-Item "CopilotCustomizer\.github\agents\NewAgent.agent.md" "your-project\.github\agents\"
   ```

#### Agent Not Appearing in VS Code

**Symptoms**: Custom agent doesn't show in mode picker

**Solutions**:
1. Verify file in correct location: `your-project/.github/agents/`
2. Check YAML front matter has `description` field
3. Reload VS Code window: `Ctrl+Shift+P` → "Reload Window"
4. Verify file naming: `AgentName.agent.md`
5. Check VS Code Copilot extension is active

#### Instructions Not Applied

**Symptoms**: AI doesn't follow custom instructions

**Solutions**:
1. Validate `applyTo` pattern matches your files
   - Test pattern: In Explorer, use file search with glob pattern
2. Check YAML syntax is correct (proper indentation)
3. Verify instructions are in YOUR project, not CopilotCustomizer
4. Restart Copilot extension if recently added
5. Make instructions more specific if being ignored

#### Cross-References Broken

**Symptoms**: Links between assets don't work

**Solutions**:
1. Run `/HarmonizeAssets` to fix links
2. Check relative paths are correct
3. Verify referenced files exist
4. Use `/WorkflowValidator` to validate
5. Regenerate assets if structure changed

#### Performance Issues

**Symptoms**: Slow Copilot responses

**Solutions**:
1. Use specific file references (`#file:name.ts`) instead of `@workspace`
2. Optimize assets with `/AssetOptimization`
3. Implement quick-advice modes for fast queries
4. Reduce number of active instructions (use specific `applyTo` patterns)
5. Close CopilotCustomizer workspace when not generating assets

#### Handoff Buttons Not Appearing

**Symptoms**: Expected handoff buttons don't show after agent response

**Solutions**:
1. **Verify VS Code Version**: Handoff buttons require VS Code 1.106+ with custom agents
   - Update VS Code to latest version
   - Check version: Help → About
2. **Check File Extension**: Use `.agent.md` or `.agents.md` for full handoff support
   - Standard format is `.agent.md` (VS Code 1.106+)
3. **Validate YAML Syntax**:
   ```yaml
   handoffs:
     - label: Button Text        # Required
       agent: target-agent       # Required
       prompt: Prompt text       # Required
       send: false               # Optional (default: false)
   ```
4. **Verify Agent Exists**: Target agent must be available in Chat view mode picker
5. **Check Agent Completion**: Handoffs only appear after agent finishes response
6. **Reload Window**: `Ctrl+Shift+P` → "Reload Window" if recently added

**Fallback for VS Code Stable**:
If handoff buttons aren't available, use text-based confirmation:
```markdown
### Workflow
4. Present plan and wait for user to type "confirm"
5. On confirmation, instruct user: "Switch to @implementation mode and say 'implement the plan'"
```

### Debugging Techniques

**Validate Asset Syntax**:
```bash
# In Copilot Chat:
# "Review and validate all assets in my project"
# Or: "/RepoReview for TARGET_PATH: 'your-project'"
```

**Test Individual Assets**:
1. Open asset file in editor
2. Ask Copilot to validate the syntax
3. Check YAML front matter format
4. Verify markdown structure

**Check Cross-References**:
```bash
# In Copilot Chat:
# "Check all workflow integrity in strict mode"
# Or: "/WorkflowValidator for WORKFLOW: 'all', STRICT: 'true'"
```

**Test Handoff Workflows** (VS Code 1.106+):
1. Open agent file with handoffs defined
2. Activate the agent in Chat view mode picker
3. Send a test message
4. After response completes, verify handoff buttons appear
5. Click button and verify target agent activates
6. Check prompt is pre-filled correctly

---

## 🌐 Integration Patterns

### Team Adoption

**Initial Setup**:
1. One team member bootstraps customization
2. Commit `.github/` folder to repository
3. Team members pull and get consistent AI behavior
4. No individual setup needed

**Shared Workspace Pattern** (Optional):
```bash
# Share CopilotCustomizer location across team
# Each member adds same path as workspace folder
# Benefits: Consistent tooling, easy updates
```

### CI/CD Integration

**Asset Validation in Pipeline**:
```yaml
# .github/workflows/validate-copilot-assets.yml
name: Validate Copilot Assets

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Check Asset Files Exist
        run: |
          test -d .github/agents
          test -d .github/instructions
          test -f AGENTS.md
      
      - name: Validate YAML Front Matter
        run: |
          # Add validation script for YAML syntax
          find .github -name "*.md" -exec grep -l "^---$" {} \;
```

**Asset Generation Automation** (Optional):
- Use workflow dispatch to regenerate assets
- Integrate RepoReview into PR checks
- Auto-format assets on commit

### Multi-Repository Management

**Centralized Customizations**:
1. Maintain CopilotCustomizer in shared location
2. Each project uses same toolbox
3. Update CopilotCustomizer once, benefits all projects

**Project-Specific Overrides**:
- Generated assets live in each project
- Customize per project as needed
- Framework provides base, projects extend

**Workspace Files for Quick Access**:
```json
// my-projects.code-workspace
{
  "folders": [
    { "path": "/Users/dev/api-project" },
    { "path": "/Users/dev/web-app" },
    { "path": "/Users/dev/CopilotCustomizer" }
  ]
}
```

### Version Control Strategy

**What to Commit**:
- ✅ Generated assets in `your-project/.github/`
- ✅ `AGENTS.md` in your project root
- ✅ Workspace files (`.code-workspace`) - optional, per developer preference

**What NOT to Commit**:
- ❌ CopilotCustomizer framework (keep separate)
- ❌ CopilotCustomizer output folder
- ❌ Temporary or test assets

**Gitignore Recommendations**:
```gitignore
# In your project (optional)
.code-workspace

# In CopilotCustomizer
output/
*.tmp.md
```

---

## 📚 Additional Resources

### Documentation
- **[README.md](README.md)** - Framework overview and quick start
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide
- **[EXAMPLES.md](EXAMPLES.md)** - Real-world tech stack examples
- **[MULTI-WORKSPACE.md](MULTI-WORKSPACE.md)** - Detailed multi-workspace patterns
- **[AGENTS.md](AGENTS.md)** - Project guidance for contributing
- **[.github/ASSETS.md](.github/ASSETS.md)** - Complete asset reference

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
3. **Bootstrap First**: Use `BootstrapRepo.prompt.md` for complete setup
4. **Iterate**: Use individual generators and optimizers to refine
5. **Validate**: Regular audits with `RepoReview` and `WorkflowIntegrityCheck`
6. **Share**: Commit `.github/` folder for team consistency

**Next Steps**:

- [ ] Set up multi-workspace with your project
- [ ] Run `BootstrapRepo` to generate initial customization
- [ ] Test generated assets with project-specific questions
- [ ] Refine with `AssetOptimization` and additional generators
- [ ] Commit to repository and share with team

---

*Enterprise-ready VS Code GitHub Copilot customization framework*  
**Version**: 1.0 | **Updated**: November 2025
