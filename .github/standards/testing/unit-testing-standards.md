---
name: unit-testing-standards
description: Universal unit testing principles covering test structure, isolation, data management, and assertion quality
version: "1.0"
technologies: []
categories: [testing, quality]
scope: always
priority: high
---

## Test Structure

- Follow the Arrange-Act-Assert pattern consistently for readable, predictable test flow
- Name tests to describe behavior, not implementation: "should reject expired tokens" over "test validateToken"
- Keep each test focused on a single behavior or assertion group — avoid testing multiple unrelated behaviors in one case
- Organize test files to mirror source file structure for easy navigation between code and tests
- Use descriptive `describe`/`context` blocks to group related tests by feature or scenario

## Isolation Principles

- Each test must be independent — never rely on execution order or shared mutable state between tests
- Mock external dependencies (databases, APIs, file systems) at the boundary; test internal logic with real objects
- Prefer dependency injection over monkey-patching or global mocks for cleaner test setup
- Reset all shared state between tests using setup/teardown hooks
- Avoid mocking the system under test — if you need to mock parts of what you are testing, refactor the design

## Test Data Management

- Use factory functions or builder patterns to create test data with sensible defaults and overridable properties
- Avoid hardcoding magic values — use named constants or variables that convey the significance of each value
- Keep test data minimal — include only the fields relevant to the behavior being tested
- Generate unique identifiers in test data to prevent accidental collisions in parallel test runs
- Never share mutable test fixtures between test cases; create fresh instances for each test

## Assertion Quality

- Assert on observable outcomes (return values, state changes, side effects), not internal implementation details
- Use specific assertion matchers that produce clear failure messages (e.g., `toContain` over `toBeTruthy`)
- Avoid asserting on too many things in a single test — if one assertion fails, the rest are not evaluated
- Test both success and failure paths; verify that errors are thrown with the expected type and message
- Prefer structural assertions for objects — check relevant properties rather than exact object equality when only some fields matter

## Test Maintenance

- Treat test code with the same quality standards as production code — refactor, name clearly, eliminate duplication
- Delete tests that no longer test meaningful behavior rather than maintaining irrelevant coverage
- Keep tests fast — unit tests should run in milliseconds; move slow tests to integration suites
- Review test failures carefully — a flaky test is worse than no test because it erodes trust in the suite
- Update tests when requirements change rather than modifying code to work around existing tests
