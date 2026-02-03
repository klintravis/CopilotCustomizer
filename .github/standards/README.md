# Enterprise Coding Standards

Define your organization's coding standards here. When CopilotCustomizer generates assets for target repositories, it matches relevant standards by tech stack and weaves those principles into generated skills, agents, and instructions — without copying verbatim or referencing this folder in output.

> **Note**: The included TypeScript, React, and code review standards are **examples** to demonstrate the format. Replace or customize them with your own organization's standards.

## Philosophy

Standards **influence** generated assets. They are not copied, quoted, or linked in output. Instead, the principles you define here are internalized during generation and reflected naturally in the guidance, workflows, and best practices that CopilotCustomizer produces.

## Directory Structure

```
.github/standards/
├── README.md                          ← You are here
├── languages/                         ← Language-specific standards
│   └── typescript-standards.md
├── frameworks/                        ← Framework-specific standards
│   └── react-standards.md
└── practices/                         ← Universal practices (always apply)
    └── code-review-standards.md
```

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
