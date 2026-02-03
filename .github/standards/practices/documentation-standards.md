---
name: documentation-standards
description: Documentation standards covering API docs, code comments, README conventions, ADRs, and changelog practices
version: "1.0"
technologies: []
categories: [practices, quality]
scope: always
priority: medium
---

## API Documentation

- Document all public APIs with clear descriptions of endpoints, parameters, request/response formats, and error codes
- Use OpenAPI (REST) or Protocol Buffers (gRPC) specifications as the source of truth for API documentation
- Keep API documentation co-located with or generated from the code to prevent documentation drift
- Include practical request and response examples for common use cases
- Document authentication requirements, rate limits, and deprecation policies prominently

## Code Comments

- Write comments to explain "why", not "what" — the code itself should communicate what it does
- Document non-obvious business rules, workarounds, and architectural decisions inline where they apply
- Avoid comments that restate the code; remove comments when the code is refactored to be self-explanatory
- Use standard doc comment formats (JSDoc, docstrings, Javadoc) for public API signatures with parameter and return descriptions
- Keep TODO comments linked to issue tracker tickets; remove untracked TODOs that have become stale

## README Standards

- Include a README at the project root with: project purpose, quick start instructions, prerequisites, and architecture overview
- Keep the README current — update it when setup steps, dependencies, or architecture change
- Include links to more detailed documentation (API docs, architecture diagrams, contributing guide) rather than duplicating content
- Provide clear instructions for common developer tasks: running locally, running tests, deploying, and troubleshooting
- Target the README at new team members who need to get productive quickly

## Architectural Decision Records

- Record significant architectural decisions in ADR format with context, decision, status, and consequences
- Store ADRs in the repository alongside the code they describe for discoverability
- Keep ADRs immutable after acceptance; write new ADRs to supersede or amend previous decisions
- Include alternatives considered and the rationale for the chosen approach
- Reference ADRs in code comments when a design choice might otherwise seem arbitrary

## Changelog and Versioning

- Maintain a changelog that describes user-facing changes for each release in clear, non-technical language where appropriate
- Follow semantic versioning: major for breaking changes, minor for new features, patch for bug fixes
- Automate changelog generation from commit messages or PR labels where possible; review for clarity before release
- Document migration steps for breaking changes prominently in release notes
- Tag releases in version control with corresponding version numbers for traceability
