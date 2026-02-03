---
name: express-node-standards
description: Node.js backend framework conventions covering middleware, error handling, request validation, and route organization
version: "1.0"
technologies: [express, fastify, koa, hono, node, nest.js]
categories: [backend, frameworks]
scope: tech-match
priority: high
---

## Middleware Architecture

- Order middleware deliberately: logging first, then authentication, authorization, validation, then route handlers
- Keep middleware focused on a single cross-cutting concern; avoid middleware that does too many things
- Use middleware factories (higher-order functions) for configurable, reusable middleware
- Separate framework-specific middleware from business logic to enable testing and framework migration
- Register error-handling middleware last in the chain to catch errors from all preceding handlers

## Error Handling

- Use a centralized error-handling middleware that catches all unhandled errors and returns consistent responses
- Define custom error classes with HTTP status codes, error codes, and user-safe messages
- Never expose stack traces, internal paths, or implementation details in production error responses
- Log the full error with stack trace and request context server-side; return only safe details to clients
- Handle async errors explicitly — ensure rejected promises in route handlers reach the error middleware

## Request Validation

- Validate all incoming request data (body, params, query, headers) at the route boundary before processing
- Use schema validation libraries (Zod, Joi, Yup, class-validator) rather than manual if-checks
- Return structured validation errors with field-level detail so clients can display actionable feedback
- Sanitize inputs to prevent injection attacks; treat all external data as untrusted
- Define reusable validation schemas that can be shared between routes and documentation

## Route Organization

- Group routes by domain resource (users, orders, products) rather than by HTTP method
- Use a router-per-resource pattern with clear file boundaries
- Keep route handlers thin — delegate business logic to service or use-case functions
- Version API routes at the path level (`/api/v1/`) or header level for backward compatibility
- Document routes with OpenAPI specifications co-located or generated from route definitions

## Response Conventions

- Use consistent response envelope structures across all endpoints (success and error shapes)
- Return appropriate HTTP status codes: 200 for success, 201 for creation, 204 for no content, 4xx for client errors, 5xx for server errors
- Set proper cache headers, content types, and CORS headers on all responses
- Paginate list endpoints by default; never return unbounded collections
- Include pagination metadata (total count, next/previous links) in list responses

## Process Management

- Handle graceful shutdown: listen for SIGTERM/SIGINT, stop accepting new connections, finish in-flight requests
- Use health check endpoints for load balancer and orchestration integration
- Never store application state in process memory — use external stores (Redis, database) for shared state
- Configure appropriate request timeouts and payload size limits at the server level
