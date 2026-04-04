---
description: 'Bootstrap high-quality AI customizations for any repository — deep research, smart questions, iterative planning'
argument-hint: 'Just point me at your project — I''ll figure out the rest'
agent: CopilotCustomizer
tools: ['vscode', 'execute', 'read', 'agent', 'edit', 'search', 'web', 'vscode/memory', 'todo']
name: Bootstrap
---

## Bootstrap (v2.0)

### What This Does
Analyzes your repository deeply, asks you smart questions about how you actually work, then generates tailored AI customizations (agents, skills, instructions, prompts) that understand your codebase — not just your tech stack.

### How It Works
1. **I research your codebase** — 3 passes: structure, patterns, pain points
2. **I ask you a few questions** — about your workflow, priorities, and what's tedious
3. **I show you a plan with reasoning** — explaining WHY each asset, not just WHAT
4. **You give feedback, I revise** — we iterate until it's right
5. **I generate everything** — then show you what was built and why
6. **You review and adjust** — targeted tweaks, not start-over

### Usage
---
**Repository Path** [REQUIRED]: ${input:repositoryPath:Absolute path to your project}
**Focus** [OPTIONAL]: ${input:focus:What matters most? e.g., "testing", "code review", "API development" (default: auto-detect)}
---

### Interaction Style
This isn't a fire-and-forget command. It's a conversation. I'll:
- Show you what I found in plain language (not raw data dumps)
- Ask specific questions based on YOUR codebase (not generic checklists)
- Explain my reasoning so you can push back
- Accept feedback naturally — "skip the deployment stuff", "focus more on testing", "we don't use that pattern anymore"

### Refinement Commands
| Command | What It Does |
|---------|-------------|
| `focus: testing` | Prioritize test-related assets |
| `skip: {asset}` | Remove something from the plan |
| `add: {description}` | Add something I missed |
| `more detail on: {area}` | I'll research that area deeper |
| `reconsider` | I'll re-evaluate the whole plan |
| `confirm` | Approve the plan and generate |
| `done` | Accept generated assets as final |

### What You Get
Tailored to YOUR codebase — not templates:
- **Skills** — Portable AI capabilities based on your actual patterns
- **Agents** — VS Code specialists that understand your architecture
- **Instructions** — Coding standards extracted from your real conventions
- **Prompts** — Slash commands for YOUR common workflows
- **AGENTS.md** — Project guidance informed by your actual setup

### Framework References
*Agent: [Bootstrap.agent.md](../agents/Bootstrap.agent.md)*
*Orchestrator: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*

---
*Deep research. Smart questions. Tailored output.*
