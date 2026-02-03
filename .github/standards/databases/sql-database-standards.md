---
name: sql-database-standards
description: SQL database standards covering schema design, query patterns, indexing, migrations, and connection management
version: "1.0"
technologies: [postgresql, mysql, sqlite]
categories: [databases, backend]
scope: tech-match
priority: high
---

## Schema Design

- Use singular table names that represent the entity (`user`, `order`) and be consistent across the entire schema
- Define explicit primary keys on every table; prefer auto-incrementing integers or UUIDs based on the use case
- Use foreign key constraints to enforce referential integrity at the database level
- Apply appropriate column constraints (NOT NULL, UNIQUE, CHECK) to enforce data integrity close to the data
- Normalize to third normal form by default; denormalize deliberately with documented justification for read-heavy access patterns

## Query Patterns

- Use parameterized queries exclusively — never concatenate user input into SQL strings
- Prefer specific column lists in SELECT statements over `SELECT *` for clarity and performance
- Use CTEs (Common Table Expressions) for complex queries to improve readability and maintainability
- Avoid correlated subqueries in performance-critical paths; restructure as JOINs or CTEs
- Limit result sets with `LIMIT`/`OFFSET` or cursor-based pagination for all list queries

## Indexing Strategy

- Create indexes to support actual query patterns observed in the application, not speculatively
- Use composite indexes with columns ordered by selectivity and query filter patterns
- Monitor slow query logs and explain plans to identify missing or unused indexes
- Avoid over-indexing — each index adds write overhead and storage; remove indexes that queries do not use
- Consider partial indexes for queries that frequently filter on a specific condition

## Migration Discipline

- Write migrations as small, reversible steps; each migration should do one logical thing
- Test migrations against production-like data volumes to catch performance issues before deployment
- Never modify a migration that has been applied to shared environments; create a new migration instead
- Include both forward and rollback instructions in every migration
- Run migrations in a transaction where the database engine supports transactional DDL

## Connection Management

- Use connection pooling for all database access; configure pool sizes based on expected concurrency and database limits
- Set appropriate connection timeouts and statement timeouts to prevent runaway queries from exhausting resources
- Close connections and cursors properly using try-with-resources or context managers
- Monitor active connection counts and pool utilization in production dashboards
- Use read replicas for read-heavy workloads; route write operations to the primary instance
