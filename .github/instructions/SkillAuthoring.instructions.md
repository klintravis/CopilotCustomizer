---
applyTo: '.github/skills/**/*.md'
description: 'Framework for creating Agent Skills (open standard at agentskills.io) that work across VS Code, GitHub Copilot CLI, Claude, Cursor, and other AI platforms'
---

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

### Optional Fields
```yaml
user-invokable: true               # Show as slash command in / menu (default: true)
disable-model-invocation: false     # Prevent auto-loading by relevance (default: false)
argument-hint: '[test file] [options]'  # Hint text shown in chat input when invoked
```

### Invocation Control Fields

| Field | Type | Default | Purpose |
|-------|------|---------|--------|
| `user-invokable` | boolean | `true` | Controls visibility in slash command menu (`/`) |
| `disable-model-invocation` | boolean | `false` | Prevents automatic loading based on context relevance |
| `argument-hint` | string | (none) | Placeholder text shown in chat input after `/skill-name` |

**Decision Table — Field Combinations**:

| `user-invokable` | `disable-model-invocation` | Behavior |
|-------------------|--------------------------|----------|
| `true` (default) | `false` (default) | Visible in `/` menu AND auto-loaded on relevance |
| `true` | `true` | Visible in `/` menu only — must be manually invoked |
| `false` | `false` | Hidden from `/` menu, but auto-loads when relevant |
| `false` | `true` | Fully hidden — only accessible programmatically |

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
See project coding standards in [project-standards](../instructions/Standards.instructions.md)
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
tools: ['terminal', 'edit', 'new']
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

## Skills as Slash Commands (VS Code 1.109+)

Skills are now invokable as **slash commands** in Copilot Chat. Users type `/skill-name` to activate a skill directly.

**Invocation Pattern**:
```
/webapp-testing Run end-to-end tests for the login flow
```

**How It Works**:
1. VS Code discovers skills from configured skill locations
2. Skills with `user-invokable: true` (default) appear in the `/` completions menu
3. When invoked, the full `SKILL.md` body is loaded into the agent's context
4. The `argument-hint` field (if set) provides placeholder guidance in the chat input

**Example — Slash command skill**:
```yaml
---
name: webapp-testing
description: Automated web application testing with Playwright
argument-hint: '[test scenario or URL to test]'
---
```
Result: User types `/webapp-testing` and sees hint `[test scenario or URL to test]` in input.

**Example — Hidden auto-load skill**:
```yaml
---
name: code-review-standards
description: Code review guidelines for pull request feedback
user-invokable: false
disable-model-invocation: false
---
```
Result: Not shown in `/` menu, but automatically loaded when user discusses code reviews.

## Extension Packaging: `chatSkills` Contribution Point

For VS Code extension authors, skills can be bundled and distributed via the `chatSkills` contribution point in `package.json`:

```json
{
  "contributes": {
    "chatSkills": [
      {
        "name": "webapp-testing",
        "folder": "skills/webapp-testing"
      }
    ]
  }
}
```

This enables skill distribution through the VS Code Marketplace alongside extensions.

## Multi-Platform Compatibility

Skills work across these AI platforms:
- ✅ VS Code with GitHub Copilot (GA — enabled by default since v1.109)
- ✅ GitHub Copilot CLI
- ✅ GitHub Copilot coding agent
- ✅ Claude (Anthropic) — via `.claude/skills/` or `.github/skills/`
- ✅ Cursor
- ✅ Goose
- ✅ Any agent supporting agentskills.io standard

**Testing**: After creating a skill, verify it:
1. Appears in VS Code slash command menu (`/skill-name`)
2. Loads automatically on relevant prompts (if `disable-model-invocation` is `false`)
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
- **Project skills**: `.github/skills/` (recommended — works across all platforms)
- **User profile skills**: `~/.github/skills/` (personal reuse)
- **Claude Code compatibility**: `.claude/skills/` (read by Claude Code and VS Code)
- **Claude user skills**: `~/.claude/skills/` (personal Claude Code skills, also read by VS Code)
- **Custom locations**: Configure via `chat.agentSkillsLocations` setting

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

When generating this asset type, integrate matched enterprise standards via [Standards.instructions.md](Standards.instructions.md). Weave principles naturally into the generated content without verbatim copying or direct references to `.github/standards/`.

## Cross-Reference Pattern

When generating skills, update:
- `AGENTS.md` - Add skill to project inventory
- Related agents - Reference skill in agent instructions
- Related prompts - Mention skill availability

---

## Standards Compliance

**Format**: Agent Skills open standard (agentskills.io)  
**VS Code Support**: v1.109+ (GA — Generally Available, enabled by default)  
**Compatible Platforms**: VS Code, GitHub Copilot CLI, Claude, Cursor, Goose, and more  
**Invocation**: Slash commands (`/skill-name`) + automatic relevance loading  
**Extension Distribution**: `chatSkills` contribution point in `package.json`

---

## Processing Metadata

- **Standards Version**: VS Code Copilot v2025.11 (Agent Skills v1.109)
- **Role**: Framework for creating Agent Skills following agentskills.io open standard
- **Scope**: Cross-platform AI capabilities for VS Code, CLI, Claude, Cursor
- **Format**: Portable skills with YAML frontmatter, instructions, examples, and resources

*Generated following CopilotCustomizer instruction generation standards*

---

## Change History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-01-15 | Initial release |

---

**Generated**: 2026-01-11 | **Framework**: CopilotCustomizer  
**Standard**: Agent Skills (agentskills.io) | **Scope**: Cross-platform AI capabilities
