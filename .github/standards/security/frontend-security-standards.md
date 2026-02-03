---
name: frontend-security-standards
description: Frontend security standards covering XSS prevention, CSP, secure data handling, and third-party script management
version: "1.0"
technologies: [react, react-dom, vue, angular, svelte, next.js, nuxt, solid]
categories: [security, frontend]
scope: tech-match
priority: high
---

## XSS Prevention

- Use framework-provided output encoding and escaping by default; never bypass safe rendering to inject raw HTML
- Avoid `innerHTML`, `dangerouslySetInnerHTML`, or `v-html` unless the content is sanitized with a trusted library
- Sanitize any user-generated content that must be rendered as HTML using a dedicated sanitization library (DOMPurify)
- Validate and sanitize URL values before rendering them in `href`, `src`, or `action` attributes to prevent `javascript:` protocol injection
- Treat all data from external sources (APIs, URL parameters, local storage) as untrusted input

## Content Security Policy

- Implement a Content Security Policy header that restricts script sources, style sources, and connection endpoints
- Avoid `unsafe-inline` and `unsafe-eval` in CSP directives; use nonces or hashes for legitimate inline scripts
- Start with a strict CSP and loosen it only as needed with documented justification for each exception
- Report CSP violations using the `report-uri` or `report-to` directives for monitoring and policy refinement
- Test CSP changes in report-only mode before enforcing to avoid breaking application functionality

## Secure Data Handling

- Never store sensitive data (tokens, passwords, PII) in local storage or session storage — use HttpOnly cookies for auth tokens
- Clear sensitive data from memory (form fields, temporary variables) when it is no longer needed
- Use the Web Crypto API for client-side cryptographic operations rather than custom or third-party implementations
- Mask sensitive fields (credit card numbers, SSN) in the UI, showing only partial values
- Validate that sensitive API responses are not cached by browsers using appropriate Cache-Control headers

## Third-Party Script Management

- Audit all third-party scripts for security risk before inclusion; prefer self-hosted copies over CDN links
- Use Subresource Integrity (SRI) hashes for all externally loaded scripts and stylesheets
- Isolate third-party scripts in sandboxed iframes when they do not need access to the host page DOM
- Review third-party script permissions and data access regularly; remove scripts that are no longer needed
- Monitor for changes in third-party script behavior using integrity checks and CSP violation reports

## Sensitive Data Display

- Implement access controls on frontend routes and components that display sensitive data
- Use server-side authorization to control which data fields are included in API responses, not just UI-level hiding
- Apply consistent masking patterns for PII fields across the application
- Log access to sensitive data views for audit trail purposes
- Prevent sensitive data from appearing in browser history, autocomplete suggestions, and pre-rendered page snapshots
