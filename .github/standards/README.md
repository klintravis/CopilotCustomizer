# Enterprise Coding Standards

Define your organization's coding standards here. When CopilotCustomizer generates assets for target repositories, it intelligently matches relevant standards by tech stack and naturally weaves those principles into generated skills, agents, and instructions—without verbatim copying or direct references.

## Philosophy

Standards **influence and guide** generated assets—they don't get copied, quoted, or linked in output. Instead, the principles you define here are deeply internalized during the generation process and naturally reflected in the guidance, workflows, and best practices that CopilotCustomizer produces.

**Key Benefits**:
- 🎯 **Consistent quality** - Organization-wide patterns automatically reflected in all projects
- 🔄 **No maintenance burden** - Standards influence generation; no manual enforcement needed
- 🌐 **Tech-stack aware** - Only relevant standards apply to each project
- 📈 **Scalable governance** - Define once, influence everywhere

## Directory Structure

Standards are organized into 8 categories for easy discovery and maintenance:

```
.github/standards/
├── README.md                                        ← You are here
├── languages/                                       ← Language-specific (9 files)
│   ├── typescript-standards.md
│   ├── javascript-standards.md
│   ├── python-standards.md
│   ├── rust-standards.md
│   ├── go-standards.md
│   ├── java-standards.md
│   ├── csharp-standards.md
│   ├── ruby-standards.md
│   └── php-standards.md
├── frameworks/                                      ← Framework-specific (8 files)
│   ├── react-standards.md
│   ├── vue-standards.md
│   ├── angular-standards.md
│   ├── svelte-standards.md
│   ├── nextjs-standards.md
│   ├── express-node-standards.md
│   ├── django-flask-standards.md
│   └── spring-standards.md
├── testing/                                         ← Testing standards (5 files)
│   ├── unit-testing-standards.md
│   ├── integration-testing-standards.md
│   ├── e2e-testing-standards.md
│   ├── test-framework-jest-vitest-standards.md
│   └── python-testing-standards.md
├── databases/                                       ← Database & data access (4 files)
│   ├── sql-database-standards.md
│   ├── nosql-database-standards.md
│   ├── orm-standards.md
│   └── data-access-layer-standards.md
├── architecture/                                    ← Architecture patterns (5 files)
│   ├── api-design-standards.md
│   ├── clean-architecture-standards.md
│   ├── microservices-standards.md
│   ├── event-driven-standards.md
│   └── monorepo-standards.md
├── security/                                        ← Security practices (4 files)
│   ├── application-security-standards.md
│   ├── dependency-security-standards.md
│   ├── api-security-standards.md
│   └── frontend-security-standards.md
├── practices/                                       ← Universal best practices (5 files)
│   ├── code-review-standards.md
│   ├── documentation-standards.md
│   ├── error-handling-standards.md
│   ├── logging-observability-standards.md
│   └── git-workflow-standards.md
└── devops/                                          ← DevOps & infrastructure (3 files)
    ├── containerization-standards.md
    ├── ci-cd-standards.md
    └── infrastructure-as-code-standards.md
```

**Total**: 43 pre-defined standards files across 8 categories.

**Extensible**: Add your own categories and standards as needed. The matching algorithm scans recursively—subfolder names are for human organization, not matching logic.

## YAML Frontmatter Schema

Every standards file **must** include YAML frontmatter with these required fields:

```yaml
---
name: my-standard-name              # Unique identifier (kebab-case)
description: What this standard covers
version: "1.0"                       # Semantic version string
technologies: [react, typescript]    # Tech identifiers for matching (empty [] for scope: always)
categories: [frontend, testing]      # Organizational tags
scope: tech-match                    # When to apply: "always" or "tech-match"
priority: high                       # Precedence: high | medium | low
---
```

### Field Specifications

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `name` | ✅ Yes | kebab-case string | Unique standard identifier (e.g., `python-standards`, `api-design`) |
| `description` | ✅ Yes | Free text | Clear explanation of what the standard covers |
| `version` | ✅ Yes | Semver string | Track changes over time (e.g., `"1.0"`, `"2.1.3"`) |
| `technologies` | ✅ Yes | Array of strings | Tech identifiers to match against. Use `[]` for `scope: always` |
| `categories` | ✅ Yes | Array of strings | Organizational grouping (e.g., `[frontend, testing, security]`) |
| `scope` | ✅ Yes | `always` or `tech-match` | When this standard applies to projects |
| `priority` | ✅ Yes | `high`, `medium`, or `low` | Precedence when standards overlap or conflict |

### Scope Values

- **`always`**: Applied to every project regardless of tech stack. Use for universal practices (code review, documentation, naming conventions). Set `technologies: []`.
- **`tech-match`**: Applied only when the detected tech stack overlaps with the `technologies` list. Use for language-specific or framework-specific standards.

### Priority Values

When multiple standards apply, higher-priority standards take precedence in case of conflict:
- **`high`**: Core standards that define fundamental patterns
- **`medium`**: Important conventions and recommended practices
- **`low`**: Preferences and suggestions

## Canonical Technology Identifiers

Use these identifiers in the `technologies` array for consistent matching:

### Languages
`typescript`, `javascript`, `python`, `rust`, `go`, `java`, `csharp`, `ruby`, `php`, `swift`, `kotlin`, `scala`, `elixir`, `dart`, `cpp`

### Runtimes / Tooling
`node`, `ts-node`, `deno`, `bun`, `dotnet`

### Frontend Frameworks
`react`, `react-dom`, `next.js`, `gatsby`, `remix`, `vue`, `nuxt`, `angular`, `svelte`, `solid`

### Backend Frameworks
`express`, `fastify`, `nest.js`, `koa`, `hono`, `flask`, `django`, `fastapi`, `spring`, `rails`, `laravel`, `phoenix`, `actix-web`, `gin`, `fiber`

### Testing
`jest`, `vitest`, `mocha`, `pytest`, `xunit`, `junit`, `rspec`, `playwright`, `cypress`

### Databases
`postgresql`, `mysql`, `mongodb`, `redis`, `sqlite`, `prisma`, `drizzle`, `typeorm`, `sequelize`

### DevOps / Infrastructure
`docker`, `kubernetes`, `terraform`, `github-actions`, `gitlab-ci`

## How to Add a New Standard

### Step-by-Step Process

1. **Choose the right category** - Pick the subfolder that best fits your standard's focus
2. **Create the markdown file** - Use kebab-case naming (e.g., `my-standard.md`)
3. **Add YAML frontmatter** - Include all required fields (see schema above)
4. **Write principles, not prescriptions** - Focus on guidance that stays relevant as libraries evolve
5. **Test the standard** - Run `/BootstrapRepo` on a matching project to verify influence

### Example: Creating a Python Standard

**File**: `.github/standards/languages/python-standards.md`

```yaml
---
name: python-standards
description: Python coding conventions including type hints, error handling, and testing patterns
version: "1.0"
technologies: [python, flask, django, fastapi]
categories: [backend, languages]
scope: tech-match
priority: high
---

## Type Hints & Code Organization
- Use type hints for all public function signatures and class attributes
- Prefer dataclasses or Pydantic models over plain dicts for structured data
- Organize imports in three groups: stdlib, third-party, local (enforce with isort)

## Error Handling
- Use specific exception types—never bare `except:` clauses
- Define custom exception hierarchies for domain-specific errors  
- Log errors with structured context using structured logging

## Testing Practices
- Use pytest with fixtures for test setup and teardown
- Name tests behavior-first: `test_user_can_reset_password_with_valid_token`
- Mock external services at the boundary, not deep in the call chain
- Aim for descriptive assertion messages that explain failures

## Performance Considerations
- Profile before optimizing—use `cProfile` or `py-spy` for bottleneck identification
- Prefer generators over lists for large datasets
- Use appropriate data structures (sets for membership, deques for queues)
```

### Example: Creating a Universal Practice

**File**: `.github/standards/practices/code-review-standards.md`

```yaml
---
name: code-review-standards
description: Code review expectations and collaboration guidelines for all projects
version: "1.0"
technologies: []                    # Empty because scope: always
categories: [practices, collaboration]
scope: always                       # Applies to every project
priority: high
---

## Review Responsibilities
- Reviewers focus on logic, maintainability, and adherence to team standards
- Authors provide context in PR descriptions explaining **why**, not just what changed
- Both parties assume good intent and maintain respectful, constructive communication

## What to Look For
- **Correctness**: Does the code do what it claims?
- **Maintainability**: Can future developers understand and modify this?
- **Standards compliance**: Does it follow our coding conventions?
- **Test coverage**: Are critical paths tested?

## Approval Criteria
- At least one approval from a team member familiar with the affected area
- All CI checks passing (tests, linting, security scans)
- No unresolved critical review comments
```
categories: [backend, languages]
scope: tech-match
priority: high
---

## Code Organization
- Use type hints for all public function signatures
- Prefer dataclasses or Pydantic models over plain dicts for structured data
- Organize imports: stdlib, third-party, local (enforce with isort)

## Error Handling
- Use specific exception types, never bare `except:`
- Define custom exception hierarchies for domain errors
- Log errors with structured context

## Testing
- Use pytest with fixtures for test setup
- Aim for behavior-driven test names: `test_user_can_reset_password`
- Mock external services at the boundary, not deep in the call chain
```

## Writing Guidelines

**Focus on principles and patterns**, not prescriptive code blocks:

- **Do**: "Prefer composition over inheritance for component reuse"
- **Don't**: Paste a 50-line code template that must be followed exactly

- **Do**: "Handle errors with discriminated unions that make invalid states unrepresentable"
- **Don't**: "Always use this exact ErrorResult<T> type definition: ..."

- **Do**: "Name test files to mirror source files and use behavior-driven descriptions"
- **Don't**: "Every test file must have exactly these imports and this beforeEach block"

Standards should be durable — they should remain relevant even as specific APIs and libraries change.

## How Standards Flow Through the Pipeline

Understanding how your standards influence generated assets:

```
┌─────────────────────────────────────────────────────────┐
│ 1. User runs /BootstrapRepo on target project          │
│    └─ or uses individual generators                     │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ 2. repository-analysis skill detects tech stack        │
│    └─ Languages, frameworks, tools identified           │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ 3. ResolveStandards instruction matches standards      │
│    └─ By technologies + scope (always or tech-match)    │
│    └─ Prioritizes: high > medium > low                  │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ 4. Matched standards passed as context to:             │
│    └─ AssetPlanner (for recommendations)                │
│    └─ AssetGenerator (for file creation)                │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ 5. Generated assets naturally reflect principles       │
│    └─ NO verbatim copying                               │
│    └─ NO direct references to standards files           │
│    └─ Principles woven into guidance and workflows      │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ 6. VerificationAgent validates                          │
│    └─ Confirms natural integration                      │
│    └─ Ensures no copy-paste violations                  │
└─────────────────────────────────────────────────────────┘
```

**Key Points**:
- Standards are **guidance**, not templates to copy
- Matching is automatic based on detected tech stack
- Higher-priority standards take precedence in conflicts
- `scope: always` standards apply to every project
- Generated assets never mention or link to standards files

---

## Best Practices for Writing Standards

### Focus on Principles Over Prescriptions

**✅ Good** — Durable principles that guide decisions:
- "Prefer composition over inheritance for component reuse"
- "Handle errors with discriminated unions that make invalid states unrepresentable"
- "Name test files to mirror source files and use behavior-driven descriptions"

**❌ Avoid** — Rigid templates that become outdated:
- Pasting a 50-line code template that must be followed exactly
- Mandating specific import statements or exact class structures
- Requiring exact type definitions that couple to specific library versions

### Keep Standards Maintainable

- **Be concise** - Standards guide, they don't dictate every detail
- **Stay current** - Review and update versions as practices evolve
- **Test influence** - Run `/BootstrapRepo` on sample projects to verify impact
- **Document intent** - Use descriptions that explain the "why" behind principles

### Organize for Discovery

- Use descriptive kebab-case names: `api-security-standards.md`, `react-testing-patterns.md`
- Place standards in appropriate categories for intuitive discovery
- Add clear descriptions explaining scope and purpose
- Set appropriate priorities to handle overlapping guidance

---

*Part of the CopilotCustomizer Enterprise Standards System — Define organizational coding conventions that naturally influence all generated AI customizations*

