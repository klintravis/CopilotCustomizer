---
description: 'Detect drift between your codebase and its AI customizations — find stale agents, missing coverage, and outdated patterns'
argument-hint: 'Point at your project to check if its AI customizations are still accurate'
agent: CopilotCustomizer
tools: ['vscode', 'execute', 'read', 'agent', 'edit', 'search', 'web', 'todo']
name: HealthCheck
---

## HealthCheck (v1.0)

### What This Does
Compares your repository's CURRENT state against its EXISTING AI customizations to find:
- **Stale assets** — Agents or instructions that reference frameworks/patterns you no longer use
- **Missing coverage** — New parts of your codebase that have no AI customization
- **Outdated patterns** — Instructions based on old conventions that have evolved
- **Schema issues** — Assets that don't comply with current VS Code standards

### How It Works
1. **Scan your customizations** — Inventory all agents, skills, instructions, prompts
2. **Analyze your current codebase** — Detect current tech stack, patterns, conventions
3. **Compare** — Find mismatches between what assets expect and what code actually does
4. **Report with fixes** — Show each issue with severity and a suggested action

### Usage
---
**Repository Path** [REQUIRED]: ${input:repositoryPath:Absolute path to your project}
**Focus** [OPTIONAL]: ${input:focus:Check specific area — agents, instructions, skills, all (default: all)}
---

### What It Checks

**Tech Stack Drift**:
- Instructions reference Jest but you switched to Vitest
- Agent tools include `terminal` but your project moved to containerized dev
- Skills mention Express patterns but you migrated to Fastify

**Coverage Gaps**:
- New `src/graphql/` directory with no matching agent or instructions
- Added a Python service but only TypeScript instructions exist
- New test framework with no testing patterns captured

**Convention Drift**:
- Instructions enforce CSS Modules but codebase now uses Tailwind
- Agent workflow assumes REST but project added GraphQL endpoints
- AGENTS.md references build commands that changed

**Schema Compliance**:
- Deprecated `user-invokable` field (should be `user-invocable`)
- Missing required `description` in agent frontmatter
- Invalid `applyTo` glob patterns that match no files

### Output Format

```
## Health Check Report

### Overall Health: 🟡 NEEDS ATTENTION (3 issues)

### Stale Assets (1)
⚠️  **ExpressPatterns.instructions.md** — References Express middleware patterns
   but your routes now use Fastify. 14 route files don't match this instruction.
   → Fix: Regenerate with `/NewInstructions DOMAIN: "Fastify", APPLY_TO: "src/routes/**/*.ts"`

### Missing Coverage (1)
🔴 **No agent for GraphQL** — Found 8 files in src/graphql/ with resolvers,
   schema definitions, and subscriptions. No agent covers this domain.
   → Fix: `/NewAgent AGENT_NAME: "GraphQLExpert", DOMAIN: "GraphQL"`

### Outdated Patterns (1)
⚠️  **AGENTS.md** — Build command says `npm run build` but package.json
   uses `pnpm build` (switched 3 months ago per git history).
   → Fix: Update AGENTS.md build command section

### Schema Compliance
✅ All 6 agent files comply with v1.112 schema
✅ All instruction `applyTo` patterns match existing files
✅ No deprecated fields found

### Summary
| Category | Issues | Severity |
|----------|--------|----------|
| Stale assets | 1 | ⚠️ Warning |
| Missing coverage | 1 | 🔴 Action needed |
| Outdated patterns | 1 | ⚠️ Warning |
| Schema compliance | 0 | ✅ Clean |

Want me to fix any of these? Say "fix all" or "fix 1", "fix 2", etc.
```

### Skills Used
- [repo-analysis](../skills/repo-analysis/SKILL.md) — Current codebase analysis
- [asset-audit](../skills/asset-audit/SKILL.md) — Asset inventory and quality assessment
- [quality-validation](../skills/quality-validation/SKILL.md) — Schema compliance validation

### Refinement Commands
| Command | Action |
|---------|--------|
| `fix all` | Apply all suggested fixes |
| `fix {n}` | Fix a specific issue |
| `focus: agents` | Re-check only agent files |
| `focus: instructions` | Re-check only instruction files |
| `deep` | Include git history analysis for convention evolution |
| `done` | Accept report as-is |

### When to Run
- **After major refactoring** — Tech stack or architecture changes
- **Quarterly maintenance** — Regular health check cadence
- **Before onboarding** — Ensure customizations are current for new team members
- **After dependency upgrades** — Framework version bumps may change patterns

### Framework References
*Orchestrator: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*
*Audit methodology: [asset-audit](../skills/asset-audit/SKILL.md)*

---
*Keep your AI customizations in sync with your codebase.*
