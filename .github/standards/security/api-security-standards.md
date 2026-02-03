---
name: api-security-standards
description: API security standards covering transport security, rate limiting, CORS, secret management, and request security
version: "1.0"
technologies: []
categories: [security, backend]
scope: always
priority: high
---

## Transport Security

- Enforce HTTPS for all API endpoints; redirect HTTP requests to HTTPS and set HSTS headers
- Use TLS 1.2 or higher; disable older protocol versions and weak cipher suites
- Validate TLS certificates in all service-to-service communication; never disable certificate verification
- Pin certificates or public keys for critical internal service communication where feasible
- Terminate TLS at the load balancer or reverse proxy with proper certificate management and rotation

## Rate Limiting and Throttling

- Implement rate limiting on all public-facing API endpoints to prevent abuse and resource exhaustion
- Apply tiered rate limits: stricter limits on authentication endpoints, generous limits on read-only endpoints
- Return standard rate limit headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`) so clients can self-regulate
- Use sliding window or token bucket algorithms for smooth rate limiting behavior
- Implement account-level and IP-level rate limiting independently to handle both authenticated and unauthenticated abuse

## CORS Configuration

- Define CORS allowed origins explicitly; never use wildcard (`*`) origins in production for APIs that accept credentials
- Restrict allowed methods and headers to only those the API actually supports
- Set appropriate `max-age` on preflight responses to reduce preflight request overhead
- Validate the Origin header server-side for sensitive operations even when CORS is configured
- Keep CORS configuration centralized and version-controlled rather than scattered across endpoint handlers

## API Key and Secret Management

- Never embed API keys, tokens, or secrets in client-side code, URLs, or query parameters
- Transmit API keys in headers (e.g., `Authorization: Bearer`) rather than URL parameters to avoid logging exposure
- Store secrets in dedicated secret management systems (Vault, AWS Secrets Manager, Azure Key Vault); never in source code
- Rotate API keys and secrets on a regular schedule and immediately when compromise is suspected
- Scope API keys to the minimum required permissions and resources using fine-grained access policies

## Request Security

- Validate Content-Type headers and reject requests with unexpected content types
- Enforce request size limits to prevent payload-based denial of service attacks
- Protect against replay attacks with request timestamps, nonces, or idempotency tokens
- Validate and sanitize all request parameters, including headers and path segments, not just the request body
- Log all authentication failures, authorization denials, and rate limit violations with request metadata for security monitoring
