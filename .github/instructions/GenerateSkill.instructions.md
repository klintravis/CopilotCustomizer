# Generate Agent Skill Instructions

## Purpose
Framework for creating Agent Skills (open standard at agentskills.io) that work across VS Code, GitHub Copilot CLI, Claude, Cursor, and other AI platforms.

## When to Apply
Use these instructions when creating `.github/skills/*/SKILL.md` files or when user requests:
- "Create a skill for..."
- "Generate Agent Skills..."
- "Build portable capabilities..."
- "Make cross-platform AI features..."

## Agent Skills vs Other Assets

| Asset Type | Purpose | Portability | Content |
|------------|---------|-------------|---------|
| **Skills** | Specialized capabilities | Cross-platform (open standard) | Instructions + scripts + examples |
| **Agents** | AI specialists | VS Code only | Instructions + tools + handoffs |
| **Instructions** | Coding standards | VS Code/GitHub | Guidelines only |
| **Prompts** | Task templates | VS Code only | Parameterized templates |

## Skills-First Decision Tree

**Use Skills when:**
- ✅ Capability should work across multiple AI platforms
- ✅ Need to include scripts, examples, or resources
- ✅ Want automatic activation based on user context
- ✅ Building specialized workflows (testing, debugging, deployment)

**Use Agents when:**
- Need VS Code-specific tool access (terminal, file system)
- Require handoff workflows between multiple agents
- Building role-based specialists with strict tool permissions

## Skill Structure

### Directory Layout
```
.github/skills/
└── skill-name/           # Lowercase with hyphens
    ├── SKILL.md          # Required: Skill definition
    ├── examples/         # Optional: Example files
    ├── scripts/          # Optional: Helper scripts
    └── resources/        # Optional: Documentation, templates
```

### SKILL.md Format

```markdown
---
name: skill-name
description: Clear description of what this skill does and when to use it. Be specific about capabilities and use cases (max 1024 chars).
---

# Skill Purpose

[Brief overview of what this skill accomplishes]

## When to Use This Skill

- Use when [scenario 1]
- Apply for [scenario 2]
- Helpful for [scenario 3]

## Instructions

### Step 1: [Action]
[Detailed instructions...]

### Step 2: [Action]
[Detailed instructions...]

## Examples

### Example 1: [Scenario]
\`\`\`
[Code or command example]
\`\`\`

### Example 2: [Scenario]
\`\`\`
[Code or command example]
\`\`\`

## Resources

- [Script reference](./scripts/helper.sh)
- [Template](./resources/template.md)
- [Example](./examples/sample.js)

## Success Criteria

- [ ] [Outcome 1]
- [ ] [Outcome 2]
- [ ] [Outcome 3]
```

## YAML Frontmatter Requirements

### Required Fields
```yaml
name: skill-name          # Lowercase, hyphens only, max 64 chars
description: What this skill does and when to use it  # Max 1024 chars
```

### Naming Convention
- Use lowercase with hyphens: `webapp-testing`, `api-debugging`
- Be specific and descriptive: `react-component-generation` not `react-stuff`
- Avoid generic names: Use `github-actions-debug` not `debugging`

### Description Guidelines
- Start with what the skill does: "Helps debug GitHub Actions workflows..."
- Include when to use: "...when CI/CD pipelines fail or produce unexpected results"
- Mention key capabilities: "Analyzes logs, suggests fixes, and validates YAML syntax"
- Keep under 1024 characters
- Be specific to help AI decide when to load the skill

## Progressive Disclosure Architecture

Skills use 3-level loading:

1. **Discovery** (Always loaded)
   - `name` and `description` from YAML frontmatter
   - Lightweight metadata for skill selection

2. **Instructions** (Loaded on relevance match)
   - Full `SKILL.md` body content
   - Detailed procedures and guidelines

3. **Resources** (Loaded on demand)
   - Scripts, examples, templates in skill directory
   - Referenced only when needed

**Benefit**: Install many skills without consuming context. Only relevant content loads.

## Body Content Guidelines

### Clear Structure
- Use H2 for main sections: `## Purpose`, `## Instructions`, `## Examples`
- Use H3 for subsections within procedures
- Number steps when order matters
- Use bullet points for options or features

### Specific Instructions
- Provide step-by-step procedures
- Include expected input and output
- Reference included resources using relative paths: `[script](./test-runner.sh)`
- Add examples demonstrating usage

### Resource References
```markdown
See the [test template](./examples/test-template.js) for structure.
Run [validation script](./scripts/validate.sh) to check results.
Refer to [debugging guide](./resources/debug-guide.md) for troubleshooting.
```

## Common Skill Patterns

### Testing Skills
```yaml
---
name: webapp-testing
description: Automated web application testing with Playwright. Use when creating or debugging end-to-end tests for web applications.
---

# Web Application Testing Skill

## Purpose
Automates creation and execution of Playwright tests for web applications...

## Instructions
### 1. Test Structure
[Step-by-step guide...]

### 2. Running Tests
[Execution instructions...]

## Examples
[Code examples...]
```

### Debugging Skills
```yaml
---
name: github-actions-debug
description: Debug GitHub Actions workflows by analyzing logs, validating YAML syntax, and suggesting fixes for common CI/CD issues.
---

# GitHub Actions Debugging Skill

## Purpose
Helps identify and resolve GitHub Actions workflow failures...

[Instructions with log analysis patterns...]
```

### Code Generation Skills
```yaml
---
name: api-endpoint-generation
description: Generate REST API endpoints with proper error handling, validation, and documentation. Use when building new API routes.
---

# API Endpoint Generation Skill

## Purpose
Creates production-ready REST API endpoints following best practices...

[Templates and code generation patterns...]
```

## Skill vs Agent Comparison

### When User Asks: "Create something for testing"

**Generate Skill** (`webapp-testing`):
- ✅ Works in VS Code, Claude, Cursor, CLI
- ✅ Can include test templates and scripts
- ✅ Auto-loads when user discusses testing
- ✅ Portable across projects and AI tools

**Generate Agent** (`TestExpert`):
- VS Code only
- Can use terminal tool to run actual tests
- Requires manual agent selection (@TestExpert)
- Can hand off to other agents (testing → review)

**Best Practice**: Generate Skill for the capability, Agent for VS Code-specific automation.

## Integration with Other Assets

### Skills + Instructions
```markdown
# In SKILL.md
See project coding standards in [coding-standards.instructions.md](../instructions/CodingStandards.instructions.md)
```

### Skills + Prompts
```markdown
# In prompt file
---
agent: agent
description: Use webapp-testing skill to generate tests
---

Generate tests using the webapp-testing skill approach...
```

### Skills + Agents
```markdown
# In agent file
---
description: Test automation specialist
tools: ['terminal', 'files']
---

Use the webapp-testing skill for test structure, then execute with terminal tools.
```

## Quality Checklist

Before creating a skill, verify:
- [ ] Name is lowercase with hyphens (max 64 chars)
- [ ] Description is clear and specific (max 1024 chars)
- [ ] Description explains WHEN to use the skill
- [ ] Body has clear step-by-step instructions
- [ ] Examples demonstrate real usage
- [ ] Resources are referenced with relative paths
- [ ] Skill provides value beyond simple instructions
- [ ] Skill is focused on specific domain/capability

## Multi-Platform Compatibility

Skills work across these AI platforms:
- ✅ VS Code with GitHub Copilot
- ✅ GitHub Copilot CLI
- ✅ GitHub Copilot coding agent
- ✅ Claude (Anthropic)
- ✅ Cursor
- ✅ Goose
- ✅ Any agent supporting agentskills.io standard

**Testing**: After creating a skill, verify it:
1. Appears in VS Code skill discovery
2. Loads automatically on relevant prompts
3. Can access included resources
4. Provides expected capabilities

## VS Code Settings

Enable Skills support in VS Code:
```json
{
  "chat.useAgentSkills": true
}
```

Skills are stored in:
- **Project skills**: `.github/skills/` (recommended)
- **User profile skills**: `~/.github/skills/` (personal reuse)
- **Legacy support**: `.claude/skills/` (backward compatibility)

## Best Practices

1. **Be Specific**: "React component generation with TypeScript and Tailwind" > "React stuff"
2. **Include Examples**: Show actual code/commands, not just descriptions
3. **Reference Resources**: Link to scripts and templates in skill folder
4. **Focus Scope**: One skill = one specialized capability
5. **Clear Activation**: Description should trigger on relevant prompts
6. **Test Portability**: Verify skill works outside VS Code (CLI, Claude)

## Anti-Patterns

❌ **Don't**: Create skills that just contain coding standards (use instructions)
❌ **Don't**: Build VS Code-specific workflows requiring tools (use agents)
❌ **Don't**: Make generic "helper" skills (be specific)
❌ **Don't**: Include absolute file paths (use relative paths)
❌ **Don't**: Duplicate agent functionality (skills = capabilities, agents = automation)

## Generation Workflow

1. **Analyze Request**: Determine if skill is appropriate (vs agent/instruction)
2. **Scope Capability**: Define specific, focused purpose
3. **Create Directory**: `.github/skills/skill-name/`
4. **Write SKILL.md**: Frontmatter + instructions + examples
5. **Add Resources**: Scripts, templates, examples as needed
6. **Test Discovery**: Verify AI loads skill on relevant prompts
7. **Document Integration**: Update project AGENTS.md with skill reference

## Standards Integration

When generating skills, check for matched enterprise standards (via [ResolveStandards.instructions.md](ResolveStandards.instructions.md)):

- **Instructions and Best Practices sections**: Reflect matched standard principles as native skill guidance. If TypeScript standards emphasize strict mode, the skill's best practices should include strict compilation as a baseline.
- **Examples**: Code examples within skills should follow matched coding conventions (naming, error handling, patterns). If React standards prefer functional components, skill examples should use them exclusively.
- **Description**: Do not mention standards or their origin in the skill description — guidance should appear as inherent to the skill's domain expertise.
- **Never** reference `.github/standards/` in generated skill files

## Cross-Reference Pattern

When generating skills, update:
- `AGENTS.md` - Add skill to project inventory
- Related agents - Reference skill in agent instructions
- Related prompts - Mention skill availability

---

## Standards Compliance

**Format**: Agent Skills open standard (agentskills.io)
**VS Code Support**: v1.108+ (Preview feature)
**Compatible Platforms**: VS Code, GitHub Copilot CLI, Claude, Cursor, Goose, and more

---

**Generated**: 2026-01-11 | **Framework**: CopilotCustomizer  
**Standard**: Agent Skills (agentskills.io) | **Scope**: Cross-platform AI capabilities
