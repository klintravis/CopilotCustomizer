---
name: api-design-standards
description: API design principles covering resource design, HTTP methods, error formats, versioning, and pagination
version: "1.0"
technologies: []
categories: [architecture, backend]
scope: always
priority: high
---

## Resource Design

- Model API resources around business entities and concepts, not database tables or internal data structures
- Use plural nouns for collection endpoints (`/users`, `/orders`) and nested paths for relationships (`/users/{id}/orders`)
- Keep URL paths shallow — avoid nesting beyond two levels; use query parameters for filtering and cross-resource queries
- Design resources to be self-describing — include enough context in each response for clients to navigate the API
- Use consistent naming conventions: kebab-case for URL paths, camelCase for JSON property names

## HTTP Methods and Status Codes

- Use HTTP methods according to their semantics: GET for retrieval, POST for creation, PUT for full replacement, PATCH for partial update, DELETE for removal
- Return 200 for successful retrieval and updates, 201 for resource creation with a Location header, 204 for successful deletion with no body
- Return 400 for malformed requests, 401 for missing authentication, 403 for insufficient authorization, 404 for nonexistent resources, 409 for conflicts, 422 for validation failures
- Use 5xx status codes only for genuine server errors — never return 500 for client mistakes
- Make GET, PUT, and DELETE idempotent; design POST operations with idempotency keys where duplicate submissions are a risk

## Error Response Format

- Return errors in a consistent, structured format across all endpoints with at minimum: error code, human-readable message, and request identifier
- Include field-level validation details for 422 responses so clients can display specific field errors
- Use stable, documented error codes (not HTTP status codes alone) that clients can programmatically handle
- Never expose internal implementation details, stack traces, or database error messages in API error responses
- Provide actionable error messages that tell the client what went wrong and how to fix it

## Versioning

- Version APIs explicitly to protect existing clients from breaking changes
- Prefer URL path versioning (`/v1/`, `/v2/`) for simplicity and cacheability, or header versioning for cleaner URLs
- Define what constitutes a breaking change: removing fields, changing types, altering behavior, removing endpoints
- Support at most two concurrent major versions; sunset old versions with documented deprecation timelines
- Add new optional fields to existing versions without incrementing the version number

## Pagination and Filtering

- Paginate all list endpoints by default; never return unbounded result sets
- Support cursor-based pagination for large or real-time datasets; use offset-based pagination only for simple use cases
- Include pagination metadata in responses: total count (when feasible), next/previous page indicators
- Support filtering through query parameters with clear, documented syntax
- Support field selection (sparse fieldsets) to allow clients to request only the data they need

## Request and Response Conventions

- Use JSON as the default request and response format; support content negotiation where other formats are needed
- Accept and return dates in ISO 8601 format with timezone information
- Use consistent null handling: omit absent optional fields rather than including null values
- Validate request payloads against documented schemas; reject unknown fields in strict mode or ignore them gracefully
- Include response metadata (request ID, API version, deprecation warnings) in headers rather than the response body
