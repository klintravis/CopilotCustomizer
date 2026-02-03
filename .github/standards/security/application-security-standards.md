---
name: application-security-standards
description: Application security standards covering input validation, authentication, authorization, data protection, and session management
version: "1.0"
technologies: []
categories: [security, practices]
scope: always
priority: high
---

## Input Validation

- Validate all external input at system boundaries — API payloads, URL parameters, headers, file uploads, and form data
- Use allowlist validation (define what is acceptable) rather than blocklist validation (define what is rejected)
- Validate data types, lengths, ranges, and formats before processing; reject malformed input early
- Sanitize input for the specific output context (HTML encoding for web display, parameterized queries for SQL)
- Never trust client-side validation as a security control — always re-validate on the server

## Authentication

- Use established authentication protocols (OAuth 2.0, OpenID Connect) rather than custom authentication schemes
- Hash passwords with strong adaptive algorithms (bcrypt, scrypt, Argon2); never store passwords in plain text or with weak hashes
- Implement multi-factor authentication for administrative and high-privilege access
- Set appropriate lockout and rate-limiting policies on authentication endpoints to prevent brute force attacks
- Invalidate all sessions and tokens when a user changes their password or reports a compromised account

## Authorization

- Implement authorization checks on every request, not just in the UI — enforce access control server-side
- Use role-based or attribute-based access control consistently; avoid ad-hoc permission checks scattered through code
- Apply the principle of least privilege — grant the minimum permissions needed for each role or operation
- Verify resource ownership on every access — ensure users can only access their own data unless explicitly authorized
- Log authorization failures for security monitoring and audit purposes

## Data Protection

- Encrypt sensitive data at rest using strong encryption algorithms (AES-256) with properly managed keys
- Use TLS for all data in transit — never transmit sensitive data over unencrypted connections
- Classify data by sensitivity level and apply appropriate protection measures to each classification
- Minimize data collection and retention — store only the data needed and delete it when no longer required
- Mask or redact sensitive data (PII, credentials, financial data) in logs, error messages, and non-production environments

## Session Management

- Generate session identifiers with cryptographically secure random number generators
- Set appropriate session expiration times; require re-authentication for sensitive operations
- Invalidate sessions completely on logout — remove server-side session state and expire client tokens
- Protect session tokens with Secure, HttpOnly, and SameSite cookie attributes
- Implement session fixation protection by regenerating session IDs after authentication state changes
