---
name: clean-architecture-standards
description: Clean architecture principles covering dependency direction, layer boundaries, domain modeling, and use case organization
version: "1.0"
technologies: []
categories: [architecture, design]
scope: always
priority: medium
---

## Dependency Direction

- Dependencies must point inward: outer layers depend on inner layers, never the reverse
- The domain layer has no dependencies on frameworks, databases, or external services
- Use dependency inversion (interfaces in the domain, implementations in infrastructure) to decouple layers
- Inner layers define contracts (interfaces, ports); outer layers provide implementations (adapters)
- Never import infrastructure types (HTTP request objects, ORM entities, framework types) into the domain layer

## Layer Boundaries

- Define four clear layers: domain (entities and rules), application (use cases), interface adapters (controllers, presenters, gateways), infrastructure (frameworks, databases, external services)
- Each layer should be independently testable without requiring layers above it
- Cross layer boundaries only through defined interfaces — avoid passing framework-specific objects between layers
- Keep data transfer objects (DTOs) at layer boundaries to translate between internal and external representations
- Avoid the temptation to "shortcut" through layers for simple CRUD operations — consistency in architecture reduces cognitive load

## Domain Modeling

- Model domain entities with behavior, not just data — entities should enforce their own invariants
- Use value objects for concepts with equality based on attributes (Money, Email, DateRange) rather than identity
- Express business rules as domain services when the rule spans multiple entities
- Keep the domain model free of persistence concerns — no database annotations, no serialization logic
- Use domain events to communicate significant state changes without coupling domain entities to their consumers

## Use Case Organization

- Implement each use case as a distinct class or function with a single public method
- Name use cases after the business action they perform (`CreateOrder`, `ApproveRefund`, `TransferFunds`)
- Inject dependencies (repositories, external service ports) through the constructor
- Return result types from use cases that clearly indicate success or categorized failure
- Keep use cases orchestrative — they coordinate domain objects and infrastructure, not implement business logic directly

## Infrastructure Concerns

- Implement repository interfaces in the infrastructure layer with the specific database technology
- Keep framework configuration and wiring in the outermost layer (composition root)
- Wrap third-party libraries behind adapter interfaces so they can be replaced without affecting the domain
- Place cross-cutting concerns (logging, caching, metrics) in decorators or middleware, not in domain logic
- Test infrastructure implementations separately with integration tests against real external services
