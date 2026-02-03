---
name: nosql-database-standards
description: NoSQL database standards covering document modeling, query optimization, Redis patterns, and data consistency
version: "1.0"
technologies: [mongodb, redis]
categories: [databases, backend]
scope: tech-match
priority: high
---

## Document Modeling

- Design document schemas around application query patterns, not around normalized entity relationships
- Embed related data that is always accessed together; reference data that is accessed independently or shared across documents
- Avoid unbounded arrays in documents — cap embedded arrays and use separate collections when growth is unpredictable
- Define a consistent schema convention even in schemaless databases; use validation rules where the database supports them
- Version document schemas explicitly to manage evolution without breaking existing data

## Query Optimization

- Create indexes for all frequently queried fields; use compound indexes that match query filter and sort patterns
- Use projection to return only needed fields; avoid fetching full documents when a subset suffices
- Avoid collection scans in production queries — verify that queries use indexes with explain plans
- Design aggregation pipelines to filter early and reduce working set size before heavy computation stages
- Monitor and set timeouts on long-running queries to prevent them from impacting other operations

## Redis Patterns

- Choose appropriate data structures (strings, hashes, sorted sets, lists, streams) based on access patterns
- Set TTL (time-to-live) on all cache keys to prevent unbounded memory growth
- Use pipelining for multiple independent commands to reduce round-trip overhead
- Design cache keys with a clear namespace convention (`service:entity:id`) for organization and debugging
- Implement cache invalidation strategies (write-through, write-behind, or event-driven) based on consistency requirements

## Data Consistency

- Choose the appropriate consistency level for each operation — strong consistency for financial data, eventual consistency for analytics
- Implement idempotency for write operations to safely handle retries without data duplication
- Use optimistic concurrency control (version fields) for concurrent updates to the same document
- Design for eventual consistency by making consumers tolerant of stale reads where acceptable
- Log and alert on consistency violations to detect and resolve data drift early

## Operational Concerns

- Monitor memory usage, connection counts, and operation latency with database-native and external monitoring tools
- Configure appropriate write concern and read concern levels based on durability and performance requirements
- Plan for data growth — set up sharding or partitioning strategies before collections become unmanageable
- Implement backup and point-in-time recovery strategies; test restore procedures regularly
- Keep database drivers and client libraries up to date to benefit from performance improvements and security patches
