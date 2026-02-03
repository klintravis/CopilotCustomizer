---
name: error-handling-standards
description: Error handling standards covering classification, propagation, logging, user-facing errors, and recovery patterns
version: "1.0"
technologies: []
categories: [practices, quality]
scope: always
priority: high
---

## Error Classification

- Distinguish between operational errors (expected failures like network timeouts, invalid input) and programmer errors (bugs, assertion failures)
- Define a taxonomy of error types for the application domain with clear, documented error codes
- Use specific error types rather than generic exceptions; each error category should carry relevant context
- Assign severity levels (critical, error, warning) based on impact to users and system stability
- Map internal error types to appropriate HTTP status codes or user-facing messages at system boundaries

## Propagation Strategy

- Let errors propagate naturally through the call stack; catch them at meaningful handling points, not at every layer
- Add context when propagating errors (what operation failed, what inputs were provided) without masking the original cause
- Avoid catching errors only to rethrow them without adding value — this adds stack noise without aiding debugging
- Define clear error handling boundaries: catch at API handlers, background job processors, and event consumers
- Never silently swallow errors; every catch block should either handle the error meaningfully or rethrow with context

## Logging Conventions

- Log errors with structured data: error type, message, stack trace, request ID, user context, and relevant entity IDs
- Log at appropriate levels: ERROR for failures requiring attention, WARN for degraded but functioning paths, INFO for normal operations
- Include enough context to reproduce and diagnose the issue from the log entry alone
- Avoid logging sensitive data (passwords, tokens, PII) in error messages — sanitize before logging
- Correlate error logs with request tracing IDs for end-to-end debugging in distributed systems

## User-Facing Errors

- Return clear, actionable error messages that tell users what went wrong and what they can do about it
- Never expose internal error details (stack traces, database errors, internal paths) to end users
- Use consistent error response formats across all application interfaces (API, UI, CLI)
- Provide error codes that support teams and documentation can reference for troubleshooting
- Translate technical errors into user-appropriate language at the boundary layer

## Recovery Patterns

- Implement retry logic with exponential backoff for transient failures (network errors, temporary unavailability)
- Use circuit breakers to prevent cascading failures when downstream services are persistently failing
- Design graceful degradation paths: when a non-critical feature fails, the core functionality should continue
- Implement fallback values or cached responses for operations that can tolerate stale data during outages
- Define and document recovery procedures for critical failure scenarios
