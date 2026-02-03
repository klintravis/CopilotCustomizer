---
name: code-review-standards
description: Universal code review practices, PR conventions, documentation requirements, and quality expectations
version: "1.0"
technologies: []
categories: [practices, quality, collaboration]
scope: always
priority: medium
---

## Pull Request Size and Scope

- Keep PRs focused on a single logical change — one feature, one bug fix, or one refactor
- Target fewer than 400 changed lines per PR (excluding generated files and lock files); split larger changes into stacked PRs
- Separate refactoring from behavior changes — never mix cleanup with feature work in the same PR
- Provide context in PR descriptions: what changed, why, and how to test it

## Review Focus Areas

- **Correctness**: Does the code do what it claims? Are edge cases handled?
- **Clarity**: Can a new team member understand this code without explanation? Are names descriptive?
- **Maintainability**: Will this be easy to modify six months from now? Is complexity justified?
- **Security**: Are inputs validated? Are secrets protected? Is authorization enforced?
- **Performance**: Are there obvious inefficiencies? Database queries in loops? Unbounded data loading?

## Documentation Requirements

- Public APIs (functions, classes, modules exported for external use) must have doc comments explaining purpose, parameters, return values, and notable side effects
- Non-obvious business logic should have inline comments explaining the "why", not the "what"
- Breaking changes must be documented in changelog or migration guide before merging
- README or relevant docs must be updated when user-facing behavior changes

## Test Coverage Expectations

- New features must include tests that verify the primary use case and at least one edge case
- Bug fixes must include a regression test that fails without the fix and passes with it
- Aim for meaningful coverage over percentage targets — a well-tested critical path is more valuable than 100% coverage of trivial code
- Tests should be deterministic, fast, and independent of execution order

## Naming Conventions

- Choose names that reveal intent: `fetchActiveUsers()` over `getData()`
- Use consistent vocabulary — if the codebase calls it "customer", don't introduce "client" for the same concept
- Boolean variables and functions should read as questions: `isValid`, `hasPermission`, `shouldRetry`
- Avoid abbreviations unless universally understood in the domain (`id`, `url`, `config` are fine; `cstmr`, `proc` are not)

## Commit Message Conventions

- Write commit messages in imperative mood: "Add user validation" not "Added user validation"
- First line should be a concise summary (50 characters or less when possible)
- Include a body for non-trivial changes explaining the motivation and approach
- Reference issue or ticket numbers when applicable

## Code Quality Principles

- Prefer explicit over implicit — make data flow and control flow visible
- Eliminate dead code, commented-out code, and TODO comments that have no associated issue tracker ticket
- Follow the existing patterns in the codebase unless actively migrating to a new pattern (and document the migration)
- Keep functions short and focused — if a function needs a comment explaining what a section does, that section is a candidate for extraction
