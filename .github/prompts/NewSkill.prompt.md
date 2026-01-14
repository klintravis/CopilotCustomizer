---
description: Generate new Agent Skill for cross-platform AI capabilities
instructions:
  - GenerateSkill.instructions.md
---

<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: NewSkill Prompt (Prompt) v1.0
   STATUS: Prompt Ready — Awaiting execution
════════════════════════════════════════════════════════════════════════════ -->

# New Agent Skill Generator (v1.0)

Creates Agent Skills (agentskills.io open standard) that work across VS Code, GitHub Copilot CLI, Claude, Cursor, and other AI platforms.

## Parameters

- **SKILL_NAME** (required): Skill identifier (lowercase-with-hyphens, max 64 chars)
- **PURPOSE** (required): What capability this skill provides
- **TARGET_PATH** (optional): Repository path (defaults to current workspace)
- **INCLUDE_EXAMPLES** (optional): true/false (default: true)
- **INCLUDE_SCRIPTS** (optional): true/false (default: false)

## Usage Examples

```
# Basic skill generation
/NewSkill SKILL_NAME: "webapp-testing", PURPOSE: "Automated Playwright testing"

# With scripts and resources
/NewSkill SKILL_NAME: "api-debugging", PURPOSE: "Debug REST API issues", INCLUDE_SCRIPTS: true

# Target specific repository
/NewSkill SKILL_NAME: "deployment-automation", PURPOSE: "Deploy to AWS with validation", TARGET_PATH: "/path/to/project"
```

## What Gets Created

```
TARGET_PATH/.github/skills/
└── [SKILL_NAME]/
    ├── SKILL.md                    # Skill definition with instructions
    ├── examples/                   # Example files (if INCLUDE_EXAMPLES=true)
    │   └── example-01.md
    ├── scripts/                    # Helper scripts (if INCLUDE_SCRIPTS=true)
    │   └── helper.sh
    └── resources/                  # Documentation and templates
        └── README.md
```

## Workflow

1. **Validate Parameters**
   - Verify SKILL_NAME format (lowercase-with-hyphens)
   - Confirm PURPOSE is specific and clear
   - Check TARGET_PATH exists

2. **Analyze Context**
   - Review existing skills in repository
   - Identify tech stack and frameworks
   - Determine appropriate skill scope

3. **Generate Skill Structure**
   - Create `.github/skills/[SKILL_NAME]/` directory
   - Generate `SKILL.md` with:
     - YAML frontmatter (name, description)
     - Purpose and when-to-use sections
     - Step-by-step instructions
     - Examples and resources references

4. **Add Supporting Files** (if requested)
   - Create `examples/` with sample files
   - Generate `scripts/` with helper utilities
   - Add `resources/` with documentation

5. **Integration**
   - Update `AGENTS.md` with skill reference
   - Suggest related agents/instructions integration
   - Provide usage examples

6. **Validation**
   - Verify YAML frontmatter format
   - Check name length (≤64 chars)
   - Confirm description length (≤1024 chars)
   - Test skill discovery and loading

## Skill Generation Guidelines

### Name Format
✅ **Good**: `webapp-testing`, `api-debugging`, `github-actions-debug`
❌ **Bad**: `WebAppTesting`, `api_debugging`, `TESTING`

### Description Format
```yaml
description: |
  [What it does] for [target domain]. 
  Use when [scenario]. 
  Provides [key capabilities].
```

**Example**:
```yaml
description: |
  Automates Playwright test creation and execution for web applications.
  Use when building or debugging end-to-end tests.
  Provides test templates, execution patterns, and debugging strategies.
```

### Content Structure

```markdown
---
name: skill-name
description: Clear, specific description under 1024 characters
---

# Skill Purpose
[Brief overview]

## When to Use This Skill
- Scenario 1
- Scenario 2
- Scenario 3

## Instructions

### Step 1: [Action]
[Detailed steps...]

### Step 2: [Action]
[Detailed steps...]

## Examples

### Example 1: [Use Case]
\`\`\`language
[Code example]
\`\`\`

### Example 2: [Use Case]
\`\`\`language
[Code example]
\`\`\`

## Resources
- [Script](./scripts/helper.sh)
- [Template](./resources/template.md)

## Success Criteria
- [ ] Outcome 1
- [ ] Outcome 2
```

## Tech Stack Awareness

Generate skills based on detected technologies:

| Tech Stack | Suggested Skills |
|------------|------------------|
| React/Next.js | `component-generation`, `state-management`, `testing-react` |
| Node.js/Express | `api-endpoint-creation`, `middleware-patterns`, `error-handling` |
| Python/FastAPI | `api-development`, `async-patterns`, `pytest-workflows` |
| .NET/C# | `controller-generation`, `entity-framework`, `unit-testing` |
| Docker/K8s | `container-debugging`, `deployment-automation`, `config-validation` |

## Common Skill Templates

### Testing Skill
```yaml
---
name: [framework]-testing
description: Automated testing for [framework] applications with [tool]. Use when creating or debugging tests.
---

# [Framework] Testing Skill

## Purpose
Provides patterns for writing effective tests...

## Instructions
### 1. Test Structure
[Framework-specific test patterns]

### 2. Running Tests
[Execution commands and options]

## Examples
[Real test examples]
```

### Debugging Skill
```yaml
---
name: [domain]-debugging
description: Debug [domain] issues by analyzing [data sources] and suggesting fixes for common problems.
---

# [Domain] Debugging Skill

## Purpose
Identifies and resolves common [domain] failures...

## Instructions
### 1. Problem Identification
[How to diagnose issues]

### 2. Resolution Strategies
[Step-by-step fixes]
```

### Code Generation Skill
```yaml
---
name: [component]-generation
description: Generate [components] with proper [patterns]. Use when building new [features].
---

# [Component] Generation Skill

## Purpose
Creates production-ready [components] following best practices...

## Instructions
### 1. Component Structure
[Template and patterns]

### 2. Integration
[How to use generated code]
```

## Cross-Platform Verification

After generation, verify skill works across platforms:

1. **VS Code**
   - Enable `chat.useAgentSkills` setting
   - Confirm skill appears in discovery
   - Test automatic loading on relevant prompts

2. **GitHub Copilot CLI**
   - Verify skill is recognized
   - Test capability invocation

3. **Portability Check**
   - No VS Code-specific tool references
   - Relative paths only (no absolute paths)
   - Platform-agnostic instructions

## Integration with Existing Assets

### Link to Instructions
```markdown
# In SKILL.md
Follow coding standards defined in [standards.instructions.md](../instructions/CodingStandards.instructions.md)
```

### Reference in Agents
```markdown
# In agent file
---
description: Testing specialist
---

Use the webapp-testing skill for test patterns, then execute with terminal tools.
```

### Combine with Prompts
```markdown
# In prompt file
---
description: Generate comprehensive tests
---

Leverage available testing skills to create test suite...
```

## Output Format

After generation, provide:

1. **Summary**
   - Skill name and purpose
   - Location: `.github/skills/[name]/`
   - Files created

2. **Usage Guidance**
   ```
   The skill will automatically activate when you:
   - [Trigger scenario 1]
   - [Trigger scenario 2]
   - [Trigger scenario 3]
   ```

3. **Integration Points**
   - Related agents to update
   - Instructions to reference
   - AGENTS.md updates needed

4. **Verification Steps**
   - [ ] Enable chat.useAgentSkills in VS Code
   - [ ] Test skill discovery
   - [ ] Verify automatic loading
   - [ ] Check resource access

## Best Practices

1. **Focused Scope**: One skill = one specialized capability
2. **Clear Activation**: Description triggers on specific prompts
3. **Rich Resources**: Include examples, scripts, templates
4. **Cross-Platform**: Avoid platform-specific dependencies
5. **Progressive Disclosure**: Keep heavy resources in separate files
6. **Maintainable**: Clear structure, well-documented

## Anti-Patterns to Avoid

❌ Generic skills: "Helper utilities" (too broad)
❌ VS Code-only: Skills that require terminal/file tools
❌ Instruction duplication: Just copying coding standards
❌ Absolute paths: Use relative paths only
❌ Massive SKILL.md: Move examples/scripts to separate files

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Skill doesn't auto-load | Make description more specific to use cases |
| Resources not found | Verify relative paths from SKILL.md |
| Name collision | Check existing skills, use more specific name |
| Description too long | Keep under 1024 chars, move details to body |

---

## Standards Compliance

**Format**: Agent Skills (agentskills.io)
**VS Code Support**: v1.108+ (Preview)
**File Structure**: `.github/skills/[name]/SKILL.md`
**Frontmatter**: YAML with required fields (name, description)

---

**Generated**: 2026-01-11 | **Framework**: CopilotCustomizer
**Purpose**: Cross-platform AI skill generation

**Log Entry Format**:
```
[YYYY-MM-DD HH:MM:SS UTC] - Invoked by: {user/system} | Context: {brief description}
```

**Recent Invocations**:
_Manual logging - update this section when invoked_
- [2026-01-14] Added traceability system

### Usage Guidelines
- This asset should be invoked when: Prompt-specific workflows are needed
- Expected outcome: Execution of NewSkill Prompt functionality
- Related assets: See related prompts in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---

---

## Audit
Last invoked: [Manual log]
Change history: v1.0 (2026-01-14) - Added traceability
