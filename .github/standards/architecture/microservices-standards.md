---
name: microservices-standards
description: Microservices architecture principles covering service boundaries, communication, data ownership, and observability
version: "1.0"
technologies: [docker, kubernetes]
categories: [architecture, infrastructure]
scope: tech-match
priority: medium
---

## Service Boundaries

- Define service boundaries along business domain boundaries, not technical layers
- Each service should own a complete business capability and be independently deployable
- Keep services small enough to be understood by a single team but large enough to minimize cross-service coordination
- Avoid sharing databases between services — each service manages its own data store
- Start with a modular monolith and extract services only when clear scaling, deployment, or team-ownership boundaries emerge

## Communication Patterns

- Use synchronous communication (REST, gRPC) for queries and operations requiring immediate responses
- Use asynchronous messaging (event queues, message brokers) for operations that can tolerate eventual consistency
- Design for network failure — implement retries with exponential backoff, circuit breakers, and timeouts on all inter-service calls
- Avoid synchronous call chains that create cascading failure risks; prefer choreography over orchestration where appropriate
- Document all inter-service contracts and version them independently

## Data Ownership

- Each service owns its data and exposes it only through its API — no direct database access from other services
- Implement data replication through events when other services need read access to another service's data
- Use the saga pattern for distributed transactions spanning multiple services; avoid distributed two-phase commits
- Accept eventual consistency as the default for cross-service data; require strong consistency only when business rules demand it
- Design compensation actions for saga steps that need to be undone when a later step fails

## API Contracts

- Define API contracts using schema definitions (OpenAPI, Protocol Buffers, AsyncAPI) as the source of truth
- Use consumer-driven contract testing to verify that service changes do not break existing consumers
- Version APIs to enable independent service evolution without breaking clients
- Keep request and response payloads minimal; include only the data that consumers actually need
- Use API gateways for cross-cutting concerns (authentication, rate limiting, routing) rather than implementing them in each service

## Observability

- Implement distributed tracing across all services using correlation IDs propagated in request headers
- Use structured logging with consistent fields (service name, trace ID, operation, duration) across all services
- Define and monitor service-level objectives (SLOs) for latency, error rate, and throughput
- Implement health check endpoints in every service for orchestration and load balancer integration
- Set up alerting on SLO violations and error rate spikes; avoid alerting on individual instance metrics
