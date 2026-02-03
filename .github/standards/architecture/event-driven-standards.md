---
name: event-driven-standards
description: Event-driven architecture principles covering event design, messaging patterns, producer and consumer conventions
version: "1.0"
technologies: []
categories: [architecture, design]
scope: always
priority: low
---

## Event Design

- Name events in past tense to represent facts that have occurred (`OrderPlaced`, `UserRegistered`, `PaymentProcessed`)
- Include all information needed to process the event in the event payload — consumers should not need to call back to the producer
- Version event schemas explicitly to enable consumers and producers to evolve independently
- Keep events immutable — once published, an event's data should never be modified; publish correction events instead
- Design events to be self-describing with a consistent envelope (event type, timestamp, source, correlation ID, payload)

## Messaging Patterns

- Use publish-subscribe for events consumed by multiple independent services
- Use point-to-point queues for commands directed at a single consumer
- Choose message ordering guarantees appropriate to the use case — strict ordering within a partition, no global ordering
- Design for at-least-once delivery: consumers must handle duplicate messages idempotently
- Use dead letter queues for messages that fail processing after a configured number of retries

## Producer Conventions

- Publish events as close to the state change as possible — ideally within the same transaction using the outbox pattern
- Do not publish events speculatively; publish only after the operation has succeeded
- Include a unique event ID in every published event to support deduplication by consumers
- Log event publication with the event ID and type for traceability and debugging
- Validate events against the published schema before sending to catch malformed events early

## Consumer Conventions

- Process events idempotently — the same event delivered twice must produce the same result
- Acknowledge messages only after successful processing; use negative acknowledgments to trigger retry mechanisms
- Keep consumer processing fast — offload long-running work to background jobs triggered by the event
- Handle schema evolution gracefully: ignore unknown fields, use defaults for missing optional fields
- Monitor consumer lag and processing latency; alert when consumers fall behind significantly

## Event Sourcing Considerations

- Consider event sourcing when a complete audit trail of state changes is a business requirement
- Store events as the source of truth; derive current state by replaying events through projection functions
- Design events to be granular enough to reconstruct state but not so fine-grained that replay becomes impractical
- Implement snapshots for aggregates with long event histories to maintain acceptable replay performance
- Separate the event store from read-optimized projections to optimize each for its access patterns
