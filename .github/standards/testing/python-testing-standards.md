---
name: python-testing-standards
description: Python testing conventions covering pytest patterns, fixture design, mocking strategy, and framework-specific testing
version: "1.0"
technologies: [pytest, python, django, flask, fastapi]
categories: [testing, backend]
scope: tech-match
priority: medium
---

## Pytest Conventions

- Use pytest as the default test runner; leverage its assertion rewriting and plugin ecosystem
- Name test functions descriptively: `test_expired_token_returns_401` over `test_validate`
- Use parametrize decorators (`@pytest.mark.parametrize`) for data-driven tests covering multiple scenarios
- Organize tests in a `tests/` directory mirroring the source structure for easy navigation
- Use markers (`@pytest.mark.slow`, `@pytest.mark.integration`) to categorize tests for selective execution

## Fixture Design

- Use pytest fixtures for reusable test setup; prefer fixtures over setup/teardown methods
- Scope fixtures appropriately: `function` for isolated state, `session` for expensive shared resources
- Keep fixtures focused — each fixture should provide a single, well-named resource or piece of state
- Use fixture factories (fixtures that return factory functions) when tests need variations of the same data
- Avoid fixture chains deeper than two or three levels; flatten complex setup into composed fixtures

## Mocking Strategy

- Use `unittest.mock.patch` or `pytest-mock` to mock external dependencies at the boundary
- Prefer patching where dependencies are used (import path in the module under test), not where they are defined
- Use `MagicMock` and `AsyncMock` with `spec` parameter to enforce interface conformance on mocks
- Avoid over-mocking — if a test requires more than three mocks, consider refactoring the code under test
- Verify mock interactions only when side effects are the primary behavior being tested; prefer output assertions

## Framework-Specific Testing

- Use Django's `TestCase` and `Client` for view and middleware integration tests with automatic transaction rollback
- Use FastAPI's `TestClient` (backed by httpx) for synchronous API testing with dependency override injection
- Use Flask's `test_client()` with application context for request-scoped testing
- Test database queries against real database instances matching production engines
- Mock external services (payment gateways, email providers) at the HTTP boundary using `responses` or `respx`

## Coverage and Quality

- Set meaningful coverage thresholds for critical modules; avoid chasing 100% coverage on non-critical code
- Use `pytest-cov` with branch coverage enabled to detect untested conditional paths
- Focus coverage on business logic and error handling paths rather than framework boilerplate
- Review coverage reports to find untested edge cases, not just to hit a number
- Integrate coverage checks into CI to prevent regression below established thresholds
