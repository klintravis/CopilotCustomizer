---
name: integration-testing-standards
description: Integration testing standards covering scope, API testing, database testing, and environment management
version: "1.0"
technologies: []
categories: [testing, quality]
scope: always
priority: medium
---

## Scope and Boundaries

- Integration tests verify that multiple components work together correctly — they test the seams, not individual units
- Define clear boundaries for each integration test: which components are real and which are mocked
- Focus on critical paths and cross-component contracts rather than exhaustive permutations
- Keep integration tests complementary to unit tests — do not duplicate unit-level assertions at the integration level
- Test realistic scenarios that reflect actual user workflows and data patterns

## API Testing

- Test API endpoints with real HTTP requests against a running application instance
- Verify request validation, response structure, status codes, and error formatting end-to-end
- Test authentication and authorization flows with realistic tokens and credentials
- Validate content negotiation, pagination, and filtering behaviors through actual API calls
- Test API contracts against OpenAPI specifications or consumer-driven contract tests

## Database Testing

- Use a real database instance (same engine as production) for database integration tests — avoid in-memory substitutes that behave differently
- Run each test against a clean database state using transactions that roll back or per-test database resets
- Test migration scripts against representative data to catch schema change issues before deployment
- Verify query performance characteristics for critical data access patterns
- Test concurrent access patterns and locking behavior for shared resources

## Test Environment

- Use containerized dependencies (databases, message brokers, caches) for reproducible test environments
- Keep test environment configuration separate from production configuration with clear overrides
- Seed test data programmatically with known, deterministic values rather than relying on shared fixtures
- Ensure test environments are isolated — parallel test runs must not interfere with each other
- Document environment setup requirements so any developer can run integration tests locally

## Performance Considerations

- Keep integration test suites fast enough to run in CI on every commit — optimize setup and teardown
- Use connection pooling and shared server instances where safe to reduce startup overhead
- Parallelize independent test suites while serializing tests that share mutable resources
- Set appropriate timeouts for integration tests — they should fail fast rather than hanging on network issues
- Profile slow integration tests periodically and optimize or restructure tests that degrade CI feedback time
