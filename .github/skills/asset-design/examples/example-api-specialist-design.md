---
# Copilot Asset Design Skill - Example: Designing API Specialist Agent
---

# Example: Asset Design (Creating API Specialist Agent)

## Scenario

You've planned to create 4 new AI customizations using planning. Now you need to design the first one: an `APISpecialist` agent that helps developers generate Express.js endpoints.

The question: **Should this be a Skill or an Agent?**

## Using This Skill

### In VS Code Copilot Chat

```
I'm designing a customization to help developers generate Express.js API endpoints.

Options:
1. Create an APISpecialist Agent (VS Code-specific)
2. Create an api-design Skill (cross-platform)
3. Create both?

Use the asset-design skill to help me decide 
and validate the architecture.
```

### In GitHub Copilot CLI

```bash
copilot --skill asset-design \
  --input "Design asset for API endpoint generation in Express.js"
```

### In Claude Desktop

```
Help me design the asset structure for my API customization.
Should I use Skill, Agent, Instructions, or Prompts?
What architecture makes sense?
```

## Phase 1: Decision Analysis

### Decision Framework: Skill vs Agent

**Requirements Analysis**:
- **Portability**: Should work in VS Code, CLI, Claude, Cursor → **Points to Skill**
- **Tool Access**: Needs file system access → **Points to Agent**
- **Complexity**: Moderately complex logic → **Neutral**
- **Reusability**: Should work across projects → **Points to Skill**
- **Team Size**: 5 developers, multiple projects → **Points to Skill**

### Recommendation: **Both Skill + Agent**

**Architecture**:
```
Skill Layer (Cross-Platform)
├── api-design/SKILL.md
│   ├── Design patterns
│   ├── Endpoint templates
│   ├── Examples
│   └── Best practices
│
Agent Layer (VS Code-Specific)
├── APISpecialist.agent.md
│   ├── Tools: File I/O, Linting
│   ├── Integration: Uses api-design skill
│   ├── Handoffs: To validation/testing agents
│   └── Purpose: Generate and save endpoint files
```

**Execution Flow**:
```
User Request
  ↓
APISpecialist Agent (VS Code)
  ├─ Parse requirements
  ├─ Call api-design skill for patterns
  ├─ Generate code
  ├─ Save to project (agent-specific tool)
  └─ Return success/errors
```

## Phase 2: Skill Design

### Skill Structure

```
.github/skills/api-design/
├── SKILL.md                          # Main documentation (required)
├── examples/                         # Usage examples (optional but recommended)
│   ├── generate-rest-endpoint.md
│   ├── add-authentication.md
│   └── handle-validation.md
├── scripts/                          # Automation scripts (optional)
│   └── validate-endpoint.sh
└── resources/                        # Templates and checklists (optional)
    ├── endpoint-template.ts
    └── validation-checklist.md
```

### Skill Content (SKILL.md)

```yaml
---
name: api-design
description: |
  Design and generate Express.js API endpoints with proper patterns, 
  validation, authentication, and error handling. Use when creating 
  new REST endpoints, planning API architecture, or establishing 
  endpoint conventions.
---

# API Design Skill

## Purpose
Provides patterns and methodologies for designing Express.js endpoints 
following REST principles, security standards, and project conventions.

## When to Use
- Creating new REST API endpoints
- Planning API routes and structure
- Implementing authentication/authorization
- Adding input validation
- Error handling patterns
- API versioning strategies

## Endpoint Design Framework

### Pattern 1: Basic CRUD Endpoint
[Template and examples]

### Pattern 2: Nested Resources
[Template and examples]

### Pattern 3: Complex Filtering
[Template and examples]

## Security Patterns
[Best practices for JWT, input validation, CORS, rate limiting]

## Testing Patterns
[How to test endpoints with supertest/Jest]
```

**Key Sections**:
- Purpose (why use this skill)
- When to use (typical scenarios)
- Design patterns (CRUD, nesting, filtering)
- Security best practices
- Testing approaches
- Examples in multiple languages/frameworks

### Skill Examples

**Example 1: Basic CRUD in VS Code**
```
User: "Create a GET endpoint for products"

VS Code Copilot (using api-design skill):
1. Analyze repository structure
2. Review existing endpoint patterns
3. Generate GET /products endpoint
4. Include validation, error handling, documentation
5. Save to routes/products.ts
```

**Example 2: CLI Usage**
```bash
copilot --skill api-design \
  --input "Create a POST endpoint for creating users with validation"

Output:
POST /users endpoint with:
- Input validation (Joi schema)
- Error handling
- Response format
- Tests in Jest format
```

**Example 3: Claude Desktop**
```
Chat: "I want to create endpoints for a products API. 
What patterns should I follow?"

Claude (using api-design skill):
- Explains REST principles
- Shows endpoint naming conventions
- Provides code examples
- Discusses error handling
- Recommends testing approach
```

## Phase 3: Agent Design

### Agent Structure

```yaml
---
name: APISpecialist
description: |
  Generate and implement Express.js API endpoints with proper 
  patterns, validation, authentication, and error handling. 
  Handles file I/O and integration with VS Code.
tools:
  - filesystem           # Read/write files
  - vscode.linter        # Run ESLint
  - vscode.compiler      # Check TypeScript
handoffs:
  - TestSpecialist       # Generate tests
  - SecurityValidator    # Check security
mode: interactive
---
```

### Agent Responsibilities

**What It Does** (VS Code-Specific):
1. **Parses User Input**
   - Resource name, HTTP methods, validation rules
   - Current project structure
   - Existing patterns to match

2. **Leverages api-design Skill**
   - Retrieves endpoint patterns
   - Gets security best practices
   - References examples

3. **Generates Endpoint Code**
   - TypeScript endpoint definition
   - Route registration
   - Middleware configuration
   - JSDoc comments

4. **File Operations** (Agent-Specific Tools)
   - Creates route file: `src/routes/{resource}.ts`
   - Registers in main router
   - Updates OPENAPI spec
   - Formats with Prettier

5. **Validation** (Agent-Specific Tools)
   - ESLint check
   - TypeScript compilation
   - Import path validation
   - Code consistency check

6. **Handoffs**
   - To TestSpecialist for test generation
   - To SecurityValidator for security review
   - Back to user for confirmation

### Agent Prompt Template

```markdown
# APISpecialist Agent

You are an expert Express.js API endpoint generator.

## Your Skills
- Use the **api-design skill** for patterns and best practices
- Use **VS Code tools** for file operations and validation
- Hand off to **TestSpecialist** agent for test generation
- Hand off to **SecurityValidator** agent for security review

## Your Process
1. Ask user for endpoint details
2. Review project structure
3. Use api-design skill to get patterns
4. Generate endpoint file
5. Save with proper formatting
6. Run validation checks
7. Offer to generate tests or security review

## Output
- Generated TypeScript endpoint file
- Validation results
- Ready to integrate into project
```

## Phase 4: Integration Design

### Integration Points

**Skill → Agent Integration**:
```typescript
// Agent calls skill:
const patterns = await skill('api-design')
  .getPatterns('rest-crud', { resource: 'Product' });

// Returns:
{
  template: "...",           // Code template
  examples: [...],           // Code examples
  validation: {...},         // Validation schemas
  security: {...},           // Security patterns
  testing: {...}             // Test patterns
}
```

**Agent → File System Integration**:
```typescript
// Agent uses VS Code tools:
await vscode.fs.writeFile('src/routes/products.ts', code);
await vscode.commands.executeCommand('vscode.linter', 'lint');
await vscode.commands.executeCommand('typescript.compileFile');
```

**Agent → Agent Handoffs**:
```
APISpecialist (generates endpoint)
  ↓ [Handoff: Ready for tests?]
TestSpecialist (generates Jest tests)
  ↓ [Handoff: Ready for security review?]
SecurityValidator (checks patterns)
  ↓ [Complete or revise]
```

### Cross-Reference Mapping

**Asset References**:
- Agent file: `.github/agents/APISpecialist.agent.md`
- Skill file: `.github/skills/api-design/SKILL.md`
- Instructions: `.github/instructions/GenerateCopilotAgent.instructions.md`
- Prompt: `.github/prompts/NewAPIEndpoint.prompt.md`

**Frontmatter Metadata**:
```yaml
# APISpecialist.agent.md
---
name: APISpecialist
relatedSkill: api-design              # ← Links to skill
relatedPrompt: NewAPIEndpoint         # ← Links to prompt
handoffAgents:
  - TestSpecialist
  - SecurityValidator
---
```

## Phase 5: Quality Checklist

**Design Validation**:
- [ ] Skill contains generalizable patterns (work across projects)
- [ ] Agent uses skill for logic, not duplicating
- [ ] Clear separation: Skill=what, Agent=how
- [ ] Handoffs designed with specific triggers
- [ ] File naming follows conventions
- [ ] Cross-references documented

**Compatibility Check**:
- [ ] Skill works standalone (no Agent required)
- [ ] Skill works with multiple agents
- [ ] Agent works with VS Code tools only
- [ ] Agent can be disabled without breaking skill
- [ ] No circular dependencies between assets

**Integration Testing Plan**:
- [ ] Skill can be called from VS Code, CLI, Claude
- [ ] Agent can use skill and tools together
- [ ] Handoff to TestSpecialist works
- [ ] Generated code passes linting
- [ ] Generated code compiles (TypeScript)
- [ ] Generated tests pass (Jest)

---

## Summary

**Asset Design Decision**:
- ✅ Create `api-design` Skill (cross-platform, patterns + examples)
- ✅ Create `APISpecialist` Agent (VS Code-specific, file I/O + handoffs)
- ✅ Create `NewAPIEndpoint` Prompt (user-facing slash command)
- ✅ Reference in `GenerateCopilotAgent` instructions

**Architecture Principle**:
```
Skill (WHAT)           → Patterns, examples, best practices
Agent (HOW)            → File I/O, tool integration, workflow
Prompt (USER INTERFACE) → Slash command, parameters
```

**Next Phase**:
Use **documentation skill** to write the actual SKILL.md and agent files with full examples and patterns.
