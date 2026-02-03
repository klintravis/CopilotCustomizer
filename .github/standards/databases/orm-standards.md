---
name: orm-standards
description: ORM conventions covering model design, relationship mapping, query optimization, migrations, and transactions
version: "1.0"
technologies: [prisma, drizzle, typeorm, sequelize]
categories: [databases, backend]
scope: tech-match
priority: medium
---

## Model Design

- Define models as the single source of truth for database schema; keep model definitions clean and well-documented
- Use appropriate field types that map precisely to database column types; avoid overly generic string fields for structured data
- Apply validation constraints at the model level where the ORM supports them (unique, not-null, length limits)
- Keep model files focused on schema definition; place business logic in service or domain layers
- Use consistent naming conventions for models (PascalCase) and database tables (snake_case) with explicit mapping

## Relationship Mapping

- Define relationships explicitly with clear cascade and delete behavior documented at the model level
- Prefer lazy loading as the default; switch to eager loading explicitly for known access patterns that need related data
- Avoid circular eager-loading configurations that cause infinite recursion or excessive data fetching
- Use join tables with explicit models for many-to-many relationships that carry additional attributes
- Document relationship cardinality and nullability in model definitions for clarity

## Query Optimization

- Use eager loading (`include`, `populate`, `joinedload`) for queries that always access related data to prevent N+1 queries
- Monitor generated SQL in development to catch inefficient query patterns before they reach production
- Use raw queries or query builder mode for complex operations that the ORM cannot express efficiently
- Apply pagination at the query level; never load entire tables into memory and filter in application code
- Use select/projection to fetch only the columns needed for each query

## Migration Patterns

- Generate migrations from model changes using the ORM's migration tooling; review generated SQL before applying
- Write migrations that are safe to run on production databases — avoid locking large tables with blocking DDL
- Keep migrations small and atomic; split large schema changes into sequential, independently deployable migrations
- Test migrations against realistic data volumes in staging environments before production deployment
- Never edit or delete migrations that have been applied to shared environments; add corrective migrations instead

## Transaction Handling

- Use explicit transactions for operations that modify multiple related entities to maintain data consistency
- Keep transactions short — perform data preparation outside the transaction boundary, execute writes inside it
- Handle transaction rollback and retry logic for transient failures (deadlocks, serialization errors)
- Avoid nesting transactions unless the ORM supports savepoints; prefer flat transaction boundaries
- Test transaction behavior explicitly, including rollback scenarios and concurrent access patterns
