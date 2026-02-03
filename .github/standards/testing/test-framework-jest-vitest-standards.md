---
name: test-framework-jest-vitest-standards
description: Jest and Vitest framework conventions covering configuration, mocking, snapshots, async testing, and performance
version: "1.0"
technologies: [jest, vitest, mocha, typescript, javascript]
categories: [testing, frontend, backend]
scope: tech-match
priority: medium
---

## Configuration

- Use a single, well-documented configuration file at the project root; avoid scattered overrides
- Configure code coverage thresholds for critical modules; use per-directory thresholds where appropriate
- Set up module path aliases in test configuration to match application path aliases
- Enable TypeScript support through the framework's native transformer (Vitest) or ts-jest configuration
- Configure test file patterns to match project conventions (`.test.ts`, `.spec.ts`) consistently

## Mocking Patterns

- Mock external dependencies (HTTP clients, databases, third-party services) at module boundaries
- Prefer dependency injection over `jest.mock` / `vi.mock` for cleaner, more maintainable test doubles
- Use `jest.spyOn` / `vi.spyOn` to observe behavior without replacing the implementation when possible
- Reset mocks between tests with `beforeEach` to prevent state leakage across test cases
- Avoid mocking too deeply — if a test requires extensive mocking, the code under test may need refactoring

## Snapshot Testing

- Use snapshots for UI component output and serialized data structures, not for logic verification
- Keep snapshots small and focused — snapshot a specific component, not an entire page tree
- Review snapshot changes carefully during code review; do not blindly update snapshots with `--update`
- Prefer inline snapshots (`toMatchInlineSnapshot`) for small outputs to keep expected values visible in test code
- Avoid snapshot testing for frequently changing content — the maintenance cost outweighs the benefit

## Async Testing

- Always return or await promises in tests to ensure assertions execute before the test completes
- Use `async`/`await` syntax consistently rather than mixing with callback-style `done` parameters
- Test timer-dependent code with fake timers (`jest.useFakeTimers` / `vi.useFakeTimers`) for deterministic behavior
- Verify async error handling by asserting that rejected promises throw the expected error type and message
- Set appropriate test timeouts for async operations; fail fast rather than waiting for default timeout

## Performance

- Keep unit tests fast — a single test file should complete in under a few seconds
- Use `describe.concurrent` (Vitest) or `--maxWorkers` (Jest) to parallelize independent test suites
- Avoid importing heavy modules in tests that do not need them; mock or stub them instead
- Use `beforeAll` and `afterAll` for expensive setup shared across tests in a file, but never share mutable state
- Profile slow test suites periodically and address bottlenecks — slow tests discourage frequent test runs
