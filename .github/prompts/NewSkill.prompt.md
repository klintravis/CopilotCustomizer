---
description: Generate new Agent Skill for cross-platform AI capabilities
argument-hint: Provide the skill name and optionally its purpose
agent: CopilotCustomizer
name: NewSkill
model: Claude Sonnet 4.5 (copilot)
tools: ['execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
---

## New Agent Skill Generator

Creates Agent Skills (agentskills.io open standard) that work across VS Code, GitHub Copilot CLI, Claude, Cursor, and other AI platforms.

## Parameters

- **Skill Name** [REQUIRED]: ${input:skillName:lowercase-with-hyphens, e.g., webapp-testing}
- **Purpose** [OPTIONAL]: ${input:purpose:What capability does this skill provide?}
- **Target Path** [OPTIONAL]: ${input:targetPath:defaults to current workspace}
- **Include Examples** [OPTIONAL]: ${input:includeExamples:true or false (default: true)}
- **Include Scripts** [OPTIONAL]: ${input:includeScripts:true or false (default: false)}

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

### Refinement Commands

| Command | Action |
|---------|--------|
| refine: examples | Expand example scenarios with more diverse use cases |
| refine: cross-platform | Enhance CLI/Claude/Cursor usage sections |
| refine: integration | Add integration patterns with other skills and agents |
| refine: scope | Adjust skill scope (broaden or narrow focus) |
| refine: resources | Add helper scripts, templates, or documentation |

## Skill Generation Guidelines

### Name Format
✅ **Good**: `webapp-testing`, `api-debugging`, `github-actions-debug`
❌ **Bad**: `WebAppTesting`, `api_debugging`, `TESTING`

### Instruction Reference
See **SkillAuthoring.instructions.md** for complete template and structure guidelines.

### Description Format
```yaml
description: |
  [What it does] for [target domain]. 
  Use when [scenario]. 
  Provides [key capabilities].
```

**Example**: "Automates Playwright test creation and execution for web applications. Use when building or debugging end-to-end tests."

### Content Structure

See **SkillAuthoring.instructions.md** for complete template and structure guidelines.

## Tech Stack Awareness

Generate skills based on detected technologies:

| Tech Stack | Suggested Skills |
|------------|------------------|
| React/Next.js | `component-generation`, `state-management`, `testing-react` |
| Node.js/Express | `api-endpoint-creation`, `middleware-patterns`, `error-handling` |
| Python/FastAPI | `api-development`, `async-patterns`, `pytest-workflows` |
| .NET/C# | `controller-generation`, `entity-framework`, `unit-testing` |
| Docker/K8s | `container-debugging`, `deployment-automation`, `config-validation` |

## Skill Templates & Examples

See **SkillAuthoring.instructions.md** for comprehensive templates covering:
- Testing skills (unit/integration/e2e)
- Debugging skills (domain-specific troubleshooting)
- Code generation skills (components/patterns)
- Deployment skills (automation/validation)

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

- **Link to Instructions**: Reference related instruction files for standards and patterns
- **Reference in Agents**: Update agent descriptions to mention new skill capabilities
- **Combine with Prompts**: Leverage skills in prompt workflows for enhanced functionality
- **Update AGENTS.md**: Document skill in architecture inventory

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
3. **Cross-Platform**: Avoid platform-specific dependencies
4. **Progressive Disclosure**: Keep resources in separate files
5. **Maintainable**: Clear structure, well-documented

See **SkillAuthoring.instructions.md** for detailed quality criteria and validation steps.

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
**VS Code Support**: v1.109+ (GA - enabled by default)
**File Structure**: `.github/skills/[name]/SKILL.md`
**Frontmatter**: YAML with required fields (name, description)

---

**Generated**: 2026-01-11 | **Framework**: CopilotCustomizer
**Purpose**: Cross-platform AI skill generation
