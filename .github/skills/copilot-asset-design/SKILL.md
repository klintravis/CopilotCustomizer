---
name: copilot-asset-design
description: Design and validate GitHub Copilot customization assets including agents, skills, instructions, and prompts. Provides architecture patterns, quality criteria, and integration strategies. Use when creating or improving Copilot customizations.
---

<!-- ASSET: copilot-asset-design | TYPE: Skill | VERSION: v1.0 -->


# Copilot Asset Design Skill

## Metadata
Asset ID: skill/copilot-asset-design | Created: 2026-01-14 | Status: Active

## Purpose

## When to Use This Skill
- Designing new Copilot customization assets
- Validating existing agent/skill/instruction files
- Planning customization architecture
- Auditing asset quality and compliance
- Creating integration strategies between assets
- Establishing customization governance

## Asset Types Overview

| Asset | Location | Standard | Portability | Purpose |
|-------|----------|----------|-------------|---------|
| **Skills** | `.github/skills/*/SKILL.md` | agentskills.io | Cross-platform | Portable capabilities |
| **Agents** | `.github/agents/*.agent.md` | VS Code v1.106+ | VS Code only | Role-based specialists |
| **Instructions** | `.github/instructions/*.instructions.md` | VS Code | VS Code/GitHub | Coding standards |
| **Prompts** | `.github/prompts/*.prompt.md` | VS Code | VS Code | Task templates |

## Decision Framework

### When to Create Each Asset Type

**Create a Skill when:**
✅ Capability should work across multiple AI platforms  
✅ Need to include scripts, examples, or resources  
✅ Want automatic activation based on user context  
✅ Building domain expertise (testing, debugging, deployment)  
✅ Knowledge is portable and platform-agnostic

**Create an Agent when:**
✅ Need VS Code-specific tool access (terminal, files, editor)  
✅ Require handoff workflows between multiple agents  
✅ Building role-based specialist with strict permissions  
✅ Need to control tool approval and security  
✅ Creating interactive multi-step workflows

**Create Instructions when:**
✅ Defining project-wide coding standards  
✅ Establishing architectural patterns  
✅ Setting code review guidelines  
✅ Creating reusable workflows for multiple agents  
✅ Specifying file-type-specific rules (glob patterns)

**Create a Prompt when:**
✅ Building parameterized task templates  
✅ Creating reusable slash commands  
✅ Defining structured output formats  
✅ Batch operations with variables  
✅ Quick-access common workflows

## Skill Design

### Structure
```
.github/skills/
└── skill-name/              # lowercase-with-hyphens
    ├── SKILL.md             # Required
    ├── examples/            # Optional
    │   └── example-01.ts
    ├── scripts/             # Optional
    │   └── helper.sh
    └── resources/           # Optional
        └── templates/
```

### SKILL.md Format
```yaml
---
name: skill-name               # Max 64 chars, lowercase-hyphens
description: |                 # Max 1024 chars, specific use cases
  What this skill does and when to use it.
  Include key capabilities and scenarios.
---

# Skill Purpose
[Clear overview of what this accomplishes]

## When to Use This Skill
- [Specific scenario 1]
- [Specific scenario 2]

## Instructions
### Step 1: [Action]
[Detailed procedure]

## Examples
[Code/command examples]

## Resources
- [Link to included files](./scripts/helper.sh)

## Success Criteria
- [ ] [Expected outcome]
```

### Quality Checklist
- [ ] Name is lowercase with hyphens (≤64 chars)
- [ ] Description is specific and clear (≤1024 chars)
- [ ] Description explains WHEN to use
- [ ] Instructions are step-by-step
- [ ] Examples demonstrate real usage
- [ ] Resources use relative paths
- [ ] Skill provides domain expertise, not just instructions

## Agent Design

### Structure
```markdown
---
description: 'Clear role description'
model: Auto (copilot)                    # Or specific model
tools: ['search', 'edit', 'terminal']    # Approved tools only
handoffs:                                 # Optional
  - label: 'Next Action'
    agent: 'TargetAgent'
    prompt: 'Context for next agent'
    send: false                           # Manual vs auto handoff
---

## Agent Name (vX.X)

### Role
[Clear description of agent's purpose and capabilities]

### Core Objectives
1. [Objective 1]
2. [Objective 2]

### Workflow
1. [Step 1]
2. [Step 2]

### Reused Instructions
*[Reference to shared instructions]*
```

### Tool Selection

**Read-Only Tools** (planning, analysis):
- `search`, `search/codebase` - Code search
- `changes` - Git diff viewing
- `problems` - Diagnostics viewing

**Write Tools** (implementation):
- `edit` - File modification
- `new` - File creation
- `terminal` - Command execution

**Specialized Tools**:
- `usages` - Symbol reference finding
- `fetch` - Web content retrieval
- `githubRepo` - GitHub API access

**Security Principle**: Grant minimum necessary tools for agent role.

### Handoff Patterns

**Manual Handoff** (user approval):
```yaml
handoffs:
  - label: 'Execute Plan'
    agent: 'ChangeExecutor'
    prompt: 'Implement the plan above.'
    send: false    # User must click button
```

**Automatic Handoff** (workflow continuation):
```yaml
handoffs:
  - label: 'Validate Changes'
    agent: 'VerificationAgent'
    prompt: 'Verify changes meet requirements.'
    send: true     # Auto-submit
```

**Quality Gate Placement**:
- Before destructive operations (editing, deleting)
- After analysis/planning phases
- Before external tool execution
- When user decision needed

### Quality Checklist
- [ ] Description is clear and concise
- [ ] Tools list matches agent responsibilities
- [ ] Handoffs have appropriate send: true/false
- [ ] Instructions referenced for reusable patterns
- [ ] No hardcoded paths or secrets
- [ ] Schema compliance (YAML + Markdown structure)

## Instruction Design

### Structure
```markdown
# Instruction Title

## Purpose
[What this instruction set accomplishes]

## When to Apply
[Scenarios where these instructions are relevant]

## Guidelines

### Section 1
[Specific rules and patterns]

### Section 2
[More rules and examples]

## Examples
[Code examples demonstrating patterns]

## Anti-Patterns
[What NOT to do]

---
**ApplyTo**: `**/*.{ts,js}`  # Glob pattern for file types
```

### Metadata
```yaml
# At top of file or in frontmatter
applyTo: '**/*.ts'        # Required for auto-application
description: 'Purpose'     # Optional but recommended
```

### Quality Checklist
- [ ] `applyTo` glob pattern specified
- [ ] Clear guidelines with examples
- [ ] Anti-patterns documented
- [ ] Reusable across multiple agents
- [ ] Not duplicating agent-specific logic

## Prompt Design

### Structure
```markdown
---
agent: AgentName                # Optional: specific agent to use
description: 'What this prompt does'
instructions:                   # Optional: instructions to apply
  - InstructionFile.instructions.md
mode: ask                       # ask/agent/generate
---

# Prompt Title

## Purpose
[What this prompt accomplishes]

## Parameters
- **PARAM_NAME** (required): [Description]
- **OPTIONAL_PARAM** (optional): [Description]

## Usage Example
```
/PromptName PARAM_NAME: "value", OPTIONAL_PARAM: "value"
```

## Workflow
1. [Step 1]
2. [Step 2]

## Output
[What the prompt generates/returns]
```

### Variables

**Built-in Variables**:
- `#file` - Current file path
- `#selection` - Current selection
- `#editor` - Editor content

**Custom Variables**:
```markdown
## Parameters
- **TARGET_PATH** (required): "{Absolute path}"
- **INCLUDE_TESTS** (optional): "true/false"
```

### Quality Checklist
- [ ] Description is clear
- [ ] Parameters documented with types
- [ ] Usage examples provided
- [ ] Expected output described
- [ ] Agent/mode specified if needed
- [ ] Instructions referenced appropriately

## Integration Patterns

### Skills + Agents
**Pattern**: Skill provides methodology, Agent uses VS Code tools to execute

```yaml
# In agent file
---
description: 'Testing specialist that uses test-automation skill'
tools: ['terminal', 'edit', 'new']
---

Use the `test-automation` skill for test structure patterns,
then execute tests using terminal tools.
```

### Skills + Instructions
**Pattern**: Skill references project-specific instructions

```markdown
# In SKILL.md
## Project Integration
Follow coding standards defined in [standards.instructions.md](../instructions/CodingStandards.instructions.md)
```

### Agent + Instructions
**Pattern**: Agent reuses shared instruction workflows

```markdown
# In agent file
### Reused Instructions
*Framework: [CopilotFramework.instructions.md](../instructions/CopilotFramework.instructions.md)*
```

### Prompt + Agent
**Pattern**: Prompt targets specific agent for execution

```yaml
# In prompt file
---
agent: APIExpert
description: 'Generate API endpoint using APIExpert agent'
---
```

### Workflow Chain
**Pattern**: Multiple agents with handoffs

```
PlannerAgent (analysis)
  ↓ handoff: send=false (user approval)
ExecutorAgent (implementation)
  ↓ handoff: send=true (automatic)
ValidatorAgent (verification)
```

## Validation Methodology

### Schema Validation

**Agent Files**:
```yaml
Required:
  - description field (YAML frontmatter)
  - Markdown body with instructions

Optional but recommended:
  - tools array
  - handoffs array
  - model specification
```

**Skill Files**:
```yaml
Required:
  - name (≤64 chars, lowercase-hyphens)
  - description (≤1024 chars)
  - Markdown body with instructions

Directory Structure:
  - SKILL.md is required
  - examples/, scripts/, resources/ are optional
```

**Instruction Files**:
```yaml
Recommended:
  - applyTo glob pattern
  - Clear section structure
  - Examples included

Not required but improves usability
```

### Quality Dimensions

**Completeness**:
- [ ] All required fields present
- [ ] Examples provided
- [ ] Documentation clear

**Correctness**:
- [ ] YAML valid
- [ ] Glob patterns work
- [ ] Tool names are valid

**Consistency**:
- [ ] Naming conventions followed
- [ ] Structure matches patterns
- [ ] Cross-references valid

**Maintainability**:
- [ ] No duplication
- [ ] Clear organization
- [ ] Version noted

### Cross-Reference Validation

**Check for**:
- Broken file references
- Invalid agent names in handoffs
- Missing instruction files
- Circular dependencies in handoffs

**Tools**:
```bash
# Find broken Markdown links
grep -r '\[.*\](.*\.md)' .github/

# Validate handoff targets
grep -A5 'handoffs:' .github/agents/*.agent.md
```

## Common Patterns

### Testing Assets
```
Skill: test-automation (patterns, methodology)
Agent: TestOrchestrator (executes tests, creates files)
Instructions: TestingStandards (project-specific rules)
Prompt: GenerateTests (quick test generation)
```

### API Development
```
Skill: api-development (REST patterns)
Agent: APIExpert (endpoint creation)
Instructions: APIPatterns (project conventions)
Prompt: NewEndpoint (scaffold endpoint)
```

### Security Review
```
Skill: security-audit (review methodology)
Agent: SecurityReviewer (analysis + reporting)
Instructions: SecurityPatterns (requirements)
Prompt: SecurityScan (trigger review)
```

## Best Practices

### Design Principles
1. **Single Responsibility**: One asset = one focused purpose
2. **DRY**: Share common patterns via instructions
3. **Progressive Disclosure**: Skills load resources on-demand
4. **Least Privilege**: Grant minimum necessary tools
5. **Clear Handoffs**: Explicit workflow transitions

### Naming Conventions
```
Skills:        lowercase-with-hyphens (api-testing)
Agents:        PascalCase (APIExpert, TestOrchestrator)
Instructions:  PascalCase (CodingStandards, APIPatterns)
Prompts:       PascalCase (GenerateEndpoint, NewAgent)
```

### Documentation Standards
- Start with purpose and when-to-use
- Provide concrete examples
- Document integration points
- Include success criteria
- Note any prerequisites

### Security Considerations
- Validate tool permissions
- Review terminal command approvals
- Audit external API access
- Check for hardcoded secrets
- Verify input sanitization

## Success Criteria

Well-designed Copilot customization provides:
- ✅ Clear asset roles and boundaries
- ✅ Appropriate tool permissions
- ✅ Smooth integration between assets
- ✅ Cross-platform portability (where applicable)
- ✅ Comprehensive validation coverage
- ✅ Maintainable architecture

---

**Skill Type**: Architecture and Design  
**Complexity**: High  
**Typical Duration**: Varies by scope  
**Prerequisites**: Understanding of VS Code Copilot customization, agentskills.io standard

**Cross-Platform**: Design methodology works across all platforms; validation requires VS Code for agent testing.

**Log Entry Format**:
```
[YYYY-MM-DD HH:MM:SS UTC] - Invoked by: {user/system} | Context: {brief description}
```

**Recent Invocations**:
_Manual logging - update this section when invoked_
- [2026-01-14] Added traceability system

### Usage Guidelines
- This asset should be invoked when: Skill-specific workflows are needed
- Expected outcome: Execution of copilot-asset-design Skill functionality
- Related assets: See related skills in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---

---

## Audit
Last invoked: [Manual log]
Change history: v1.0 (2026-01-14) - Added traceability
