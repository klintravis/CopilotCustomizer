# Getting Started with GitHub Copilot Agents in VS Code

**Quick Reference for Developers** | 5-Minute Presentation Guide

**Jump to:** [Core Concepts](#core-concepts) • [Daily Workflows](#daily-workflow-examples) • [Security](#security--tool-approvals) • [Customization](#customization-options) • [Troubleshooting](#quick-troubleshooting) • [Quick Reference](#quick-reference-card)

---

## What Are Copilot Agents?

**AI assistants built into VS Code** that understand your codebase, tech stack, and team conventions. Think of them as expert pair programmers who give context-aware, project-specific guidance.

## Quick Start (30 seconds)

**Prerequisites**: VS Code + GitHub Copilot subscription

**Test it now**:
1. Press `Ctrl+I` anywhere in code
2. Type: `@workspace explain this project`
3. 🎉 Done!

---

## Core Concepts

| Concept | Shortcut | Purpose |
|---------|----------|---------|
| **Chat Panel** | `Ctrl+Alt+I` | Code questions, refactoring, debugging |
| **Inline Chat** | `Ctrl+I` | Quick edits right in your code |
| **Agent Modes** | Mode picker dropdown | Switch to specialized experts |
| **Slash Commands** | Type `/` in chat | `/explain`, `/fix`, `/tests`, `/new`, `/clear` |
| **Edits UI** | Auto-appears | Review multi-file changes before applying |

**Context References**: `#file:name`, `#selection`, `#editor`, `#codebase`, `#terminalLastCommand`

---

## Daily Workflow Examples

```
# Understand code
"@workspace explain this project structure"
"/explain this function" [select code]

# Fix issues  
"Fix null handling in #selection"
"/fix" [select buggy code]

# Generate code
"/new create REST endpoint for user registration"
"/tests create unit tests for #selection"

# Refactor
"Refactor #selection to use async/await"
"Compare #file:old-api.ts with #file:new-api.ts"

# Get help
"@vscode how do I debug TypeScript in VS Code?"
"@terminal explain this error" [after failed command]
```

## Essential Tips

✅ **Be specific**: "Fix null handling when user.email is undefined" > "Fix this"  
✅ **Reference files**: Use `#file:name.ts` or `#selection` for context  
✅ **Use slash commands**: `/fix`, `/tests`, `/explain` are faster  
✅ **Chain requests**: "explain this, then optimize it, then write tests"

## Security & Tool Approvals

**What are tool approvals?** Permission gates when agents want to modify files, run commands, or access external tools.

| Risk Level | Example | Default Behavior |
|------------|---------|------------------|
| **Safe** | Read files, search | May auto-approve |
| **Medium** | Edit files | Ask once per session |
| **High** | Terminal commands, delete | Always ask |
| **External** | API calls (MCP servers) | Based on trust config |

**Configure**: Settings → GitHub Copilot → Chat: Tool Confirmations

**Best Practices**:
- ✅ Always review in Edits UI before accepting changes
- ✅ Read terminal commands before approving
- ✅ Start with "Always ask" until comfortable
- ❌ Don't blindly auto-approve everything

---

## Customization Options

**Custom Agents** - Specialized AI experts for your team:
- Location: `.github/agents/YourAgent.agent.md`
- Example: Security auditor, Database expert, API designer
- They learn from your codebase and team conventions

**Custom Instructions** - Coding rules that apply automatically:
- Location: `.github/instructions/YourRules.instructions.md`
- Example: Code style, naming conventions, security policies
- Agents follow these without being asked

**Prompt Files** - Reusable templates for common tasks:
- Location: `.github/prompts/YourTemplate.prompt.md`
- Example: PR review checklist, refactoring workflow
- Fill in variables, run as slash commands

### Creating Custom Copilot Assets (Example)

**In this section:**
- [Step-by-step: TestCaseExpert](#creating-custom-copilot-assets-example) - Create agent + instructions + prompt
- [Fast track: BootstrapRepo](#even-faster-bootstrap-your-entire-repository) - Generate all assets at once

**Scenario**: You want a test case generator agent that understands your tech stack.

**Copy & paste these into Copilot Chat:**

```
Step 1: Create the agent
/NewCopilotAgent Create a new agent that is an expert test case generator. 
Review the entire #codebase to understand our testing patterns, frameworks, 
and conventions. Research current best practices for the testing libraries we 
use (Jest, React Testing Library, etc.). The agent should:
- Generate comprehensive unit, integration, and E2E tests
- Follow our existing test patterns and naming conventions
- Suggest test coverage improvements
- Include edge cases and error scenarios
- Use proper mocking and setup/teardown patterns

Result: Creates .github/agents/TestCaseExpert.agent.md

Step 2: Create instructions for test standards
/NewInstructions Create instructions for test code that enforces:
- All tests must follow AAA pattern (Arrange, Act, Assert)
- Use descriptive test names: "should [expected behavior] when [condition]"
- Mock external dependencies, never call real APIs in tests
- Each test file must have at least 80% code coverage
- Include both happy path and error cases
- Use beforeEach/afterEach for setup/cleanup, not in test bodies
Apply to: **/*.test.ts, **/*.spec.ts, **/__tests__/**

Result: Creates .github/instructions/TestingStandards.instructions.md

Step 3: Create reusable test generation template
/NewPrompt Create a prompt file called TestGeneration that:
- Takes a source file path as input
- Analyzes the code to test
- Generates comprehensive test suite covering all functions and branches
- Includes setup, happy paths, edge cases, and error scenarios
- Adds mock data and fixtures
- Outputs to matching test file location

Result: Creates .github/prompts/TestGeneration.prompt.md

Step 4: Link everything together
/HarmonizeAssets Link these assets so they work together:
- .github/agents/TestCaseExpert.agent.md
- .github/instructions/TestingStandards.instructions.md
- .github/prompts/TestGeneration.prompt.md

Agent will:
✅ Configure TestCaseExpert to automatically read TestingStandards
✅ Add TestGeneration prompt to agent's available workflows
✅ Establish cross-references between all three files
✅ Validate the integration works correctly

Result: Fully integrated test generation system
```

**Result**: 
- TestCaseExpert agent appears in mode picker
- Automatically follows your test standards (via instructions)
- Can run test generation template (via prompt file)

**Using Your New Agent**:
```
You: [Switch to TestCaseExpert mode]
     "Generate tests for #file:src/utils/auth.ts"

Agent: [Reads instructions, applies standards]
       - Uses AAA pattern
       - Creates descriptive test names
       - Mocks HTTP calls
       - Covers edge cases: null tokens, expired sessions
       - Achieves 95% coverage
       
You: [Opens TestGeneration.prompt.md]
     SOURCE_FILE: src/api/orders.ts
     Type: confirm

Agent: [Executes template]
       - Analyzes order API functions
       - Generates complete test suite
       - Creates mock data fixtures
       - Outputs to src/api/orders.test.ts
```

**Tip**: Use `/NewCopilotAgent`, `/NewInstructions`, `/NewPrompt` commands directly in chat - the prompts will guide you through the details!

### Even Faster: Bootstrap Your Entire Repository

**Want to generate ALL your customization assets at once?** Use the BootstrapRepo workflow:

```
/BootstrapRepo Analyze this repository and create a complete set of 
custom agents, instructions, and prompts tailored to our tech stack, 
coding patterns, and team conventions.

What it does:
1. Analyzes your entire codebase to understand:
   - Languages, frameworks, and libraries
   - Existing patterns and conventions
   - Project structure and architecture
   
2. Generates recommended assets:
   - Custom agents for your tech stack (e.g., React expert, API designer)
   - Instructions for your coding standards
   - Reusable prompts for common workflows
   
3. Harmonizes everything automatically:
   - Links agents to relevant instructions
   - Configures proper tool access
   - Validates all integrations
   
4. Provides summary report with:
   - What was created and why
   - How to use each asset
   - Suggestions for further customization

Time: 5-10 minutes | User input: Just confirmation
```

**When to use**: 
- ✅ New project setup
- ✅ Onboarding team to Copilot customization
- ✅ Major tech stack changes
- ✅ Want comprehensive coverage quickly

**When to use individual commands instead**:
- Need one specific agent or instruction
- Fine-tuning existing assets
- Learning the customization system

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Agent gives wrong advice | Specify versions: "Using React 18..." |
| Agent doesn't understand project | Use `@workspace` and reference existing files |
| Slow responses | Reference specific files, not entire workspace |
| Breaking changes | Add constraint: "maintain backward compatibility" |
| Custom agent not showing | Check `.github/agents/`, reload VS Code |

## Agent & Participant Cheatsheet

| What | How to Use | Purpose |
|------|------------|---------|
| **@workspace** | `@workspace explain this project` | Project-wide analysis |
| **@vscode** | `@vscode how do I debug?` | VS Code features |
| **@terminal** | `@terminal explain this error` | Terminal/Git help |
| **Custom Agents** | Select from mode picker dropdown | Domain experts |

## Quick Reference Card

| Category | Command/Reference | Purpose |
|----------|-------------------|----------|
| **Shortcuts** | `Ctrl+I` | Inline chat (quick edits) |
| | `Ctrl+Alt+I` | Chat panel (full workspace) |
| **Slash Commands** | `/explain` | Explain code |
| | `/fix` | Fix issues |
| | `/tests` | Generate tests |
| | `/new` | Create new code |
| | `/clear` | Clear history |
| **Context References** | `#file:name.ts` | Specific file |
| | `#selection` | Selected code |
| | `#editor` | Active file |
| | `#codebase` | Entire workspace |
| **Best Practices** | ✅ Be specific | Clear requirements |
| | ✅ Reference files | Use #file: for context |
| | ✅ Review changes | Always check Edits UI |
| | ✅ Use @workspace | For project questions |

## 5-Minute Getting Started Checklist

1. ✅ **Test basic chat**: Press `Ctrl+I`, type `@workspace explain this project`
2. ✅ **Try slash command**: Select code, type `/explain`
3. ✅ **Use context**: Ask `what does #file:yourfile.ts do?`
4. ✅ **Review changes**: Accept/reject in Edits UI
5. ✅ **Configure security**: Settings → GitHub Copilot → Chat: Tool Confirmations
6. ✅ **Try customization**: Create your first custom agent with `/NewCopilotAgent`

## Common Questions

**Q: Does it send my code to the cloud?**  
A: Yes, securely to Azure OpenAI. Not used for training.

**Q: Can agents change code without asking?**  
A: Depends on settings. Changes shown in Edits UI first. Configure in Settings → GitHub Copilot → Chat: Tool Confirmations.

**Q: What if it gives wrong advice?**  
A: Treat like a junior developer—always review suggestions.

**Q: Can I create custom agents?**  
A: Yes! Add `.agent.md` files in `.github/agents/` with your team's patterns.

**Q: Works offline?**  
A: No, requires internet connection.

## Resources

- [VS Code Copilot Docs](https://code.visualstudio.com/docs/copilot/overview)
- [Customization Guide](https://code.visualstudio.com/docs/copilot/customization/overview)
- [Agent Files Reference](https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes)
- [GitHub Community Forum](https://github.com/orgs/community/discussions/categories/copilot)

---

*Quick-start guide for developer presentations | January 2026*
