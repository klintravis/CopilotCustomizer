# Enterprise Coding Standards

Define your organization's coding standards here. When CopilotCustomizer generates assets for target repositories, it matches relevant standards by tech stack and weaves those principles into generated skills, agents, and instructions — without copying verbatim or referencing this folder in output.

## Philosophy

Standards **influence** generated assets. They are not copied, quoted, or linked in output. Instead, the principles you define here are internalized during generation and reflected naturally in the guidance, workflows, and best practices that CopilotCustomizer produces.

## Directory Structure

```
.github/standards/
├── README.md                                        ← You are here
├── languages/                                       ← Language-specific standards (9 files)
│   ├── typescript-standards.md
│   ├── javascript-standards.md
│   ├── python-standards.md
│   ├── rust-standards.md
│   ├── go-standards.md
│   ├── java-standards.md
│   ├── csharp-standards.md
│   ├── ruby-standards.md
│   └── php-standards.md
├── frameworks/                                      ← Framework-specific standards (8 files)
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
├── databases/                                       ← Database standards (4 files)
│   ├── sql-database-standards.md
│   ├── nosql-database-standards.md
│   ├── orm-standards.md
│   └── data-access-layer-standards.md
├── architecture/                                    ← Architecture standards (5 files)
│   ├── api-design-standards.md
│   ├── clean-architecture-standards.md
│   ├── microservices-standards.md
│   ├── event-driven-standards.md
│   └── monorepo-standards.md
├── security/                                        ← Security standards (4 files)
│   ├── application-security-standards.md
│   ├── dependency-security-standards.md
│   ├── api-security-standards.md
│   └── frontend-security-standards.md
├── practices/                                       ← Universal practices (5 files)
│   ├── code-review-standards.md
│   ├── documentation-standards.md
│   ├── error-handling-standards.md
│   ├── logging-observability-standards.md
│   └── git-workflow-standards.md
└── devops/                                          ← DevOps standards (3 files)
    ├── containerization-standards.md
    ├── ci-cd-standards.md
    └── infrastructure-as-code-standards.md
```

**Total: 43 standards files across 8 categories.**

Organize standards into whichever subfolder makes sense. The matching algorithm scans recursively — subfolder names are for human organization only.

## YAML Frontmatter Schema

Every standards file must include YAML frontmatter with these fields:

```yaml
---
name: my-standard-name              # Unique identifier (kebab-case)
description: What this standard covers
version: "1.0"                       # Semantic version string
technologies: [react, typescript]    # Tech identifiers to match against
categories: [frontend, testing]      # Organizational tags
scope: tech-match                    # "always" or "tech-match"
priority: high                       # high | medium | low
---
```

| Field | Required | Values | Purpose |
|-------|----------|--------|---------|
| `name` | Yes | kebab-case string | Unique standard identifier |
| `description` | Yes | Free text | What the standard covers |
| `version` | Yes | Semver string | Track changes over time |
| `technologies` | Yes | Array of strings | Tech identifiers to match (empty `[]` for `scope: always`) |
| `categories` | Yes | Array of strings | Organizational grouping |
| `scope` | Yes | `always` or `tech-match` | When to apply |
| `priority` | Yes | `high`, `medium`, or `low` | Precedence when standards overlap |

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

1. Create a markdown file in the appropriate subfolder
2. Add YAML frontmatter with all required fields
3. Write standards content focusing on **principles and patterns**, not prescriptive code blocks
4. Keep standards concise — they should guide, not dictate

### Example: Adding a Python Standard

Create `.github/standards/languages/python-standards.md`:

```yaml
---
name: python-standards
description: Python coding conventions and patterns
version: "1.0"
technologies: [python, flask, django, fastapi]
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

```
1. User adds standards to .github/standards/
2. BootstrapRepo or individual generators activate
3. repository-analysis skill detects target repo tech stack
4. ResolveStandards instruction matches standards by technology + scope
5. Matched standards flow to AssetPlanner and AssetGenerator as context
6. Generated assets naturally reflect the principles (no copy-paste, no references)
7. VerificationAgent confirms principles are reflected, not copied
```

---

*Part of the CopilotCustomizer Enterprise Coding Standards system*
