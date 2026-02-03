---
name: data-access-layer-standards
description: Data access layer principles covering repository pattern, query abstraction, caching strategy, and testability
version: "1.0"
technologies: []
categories: [databases, architecture]
scope: always
priority: medium
---

## Repository Pattern

- Encapsulate all data access behind repository interfaces that define operations in domain terms
- Keep repository methods focused on a single query or mutation; avoid catch-all methods with many parameters
- Return domain objects from repositories, not database entities or ORM models — map at the repository boundary
- Define repository interfaces in the domain layer; implement them in the infrastructure layer to preserve dependency direction
- Avoid leaking query builder or ORM abstractions through repository interfaces

## Query Abstraction

- Express queries in terms of business requirements rather than technical database operations
- Use specification or criteria patterns for complex, composable query conditions when simple method signatures become unwieldy
- Keep query construction separate from query execution to enable composition and testing
- Avoid building queries from string concatenation; use parameterized queries or type-safe query builders
- Document expected performance characteristics for queries that access large datasets

## Caching Strategy

- Cache at the data access layer, not in business logic; keep caching concerns transparent to consumers
- Use cache keys derived from query parameters to ensure cache correctness and avoid stale data
- Implement cache invalidation on write operations — invalidate or update cached data when the underlying data changes
- Set appropriate TTL values based on data freshness requirements and access patterns
- Monitor cache hit rates and adjust caching strategy based on actual usage patterns

## Error Handling

- Translate database-specific exceptions into domain-meaningful error types at the repository boundary
- Handle transient database failures (connection drops, deadlocks) with retry logic in the data access layer
- Distinguish between "not found" results and actual errors — return empty results or optional types for missing data, throw for failures
- Log data access errors with query context (operation, parameters, duration) for debugging without exposing sensitive data
- Propagate constraint violation errors (unique, foreign key) as typed domain errors that callers can handle specifically

## Testability

- Design the data access layer to be testable with both in-memory implementations and real database instances
- Use interface-based repository design to enable swapping real implementations for test doubles
- Write integration tests for data access logic against real database instances matching the production engine
- Test query correctness, edge cases (empty results, large result sets), and error handling paths
- Keep test data setup declarative and minimal; use factories or fixtures scoped to each test
