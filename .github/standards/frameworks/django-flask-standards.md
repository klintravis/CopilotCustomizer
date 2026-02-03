---
name: django-flask-standards
description: Python web framework conventions covering project structure, ORM usage, serialization, API design, and security
version: "1.0"
technologies: [django, flask, fastapi, python]
categories: [backend, frameworks]
scope: tech-match
priority: medium
---

## Project Structure

- Organize Django projects with one app per bounded domain context; avoid monolithic apps
- Keep Flask applications structured with blueprints for modular route grouping
- Separate configuration from code using environment variables and settings modules per environment
- Use application factories (Flask) or Django's app configuration for testable, composable setup
- Place shared utilities and base classes in a dedicated `core` or `common` module

## ORM and Data Access

- Use the ORM for standard queries; drop to raw SQL only for performance-critical or complex operations that the ORM cannot express cleanly
- Define model managers and querysets for reusable query logic rather than scattering filter chains across views
- Avoid N+1 queries — use `select_related` and `prefetch_related` (Django) or eager loading strategies (SQLAlchemy)
- Keep business logic out of models — use service functions or use-case classes for complex operations
- Write database migrations as small, reversible steps; test migrations against production-like data

## Serialization and Validation

- Use Django REST Framework serializers or Pydantic models (FastAPI) for input validation and output formatting
- Validate all incoming data at the API boundary before passing to business logic
- Keep serializers focused — use different serializers for create, update, and list operations when field sets differ
- Serialize only the fields needed for each endpoint; avoid exposing internal model structure

## API Design

- Use class-based views (Django) or dependency injection (FastAPI) for consistent endpoint structure
- Follow REST conventions for resource naming, HTTP methods, and status codes
- Implement pagination, filtering, and sorting as reusable mixins or dependencies
- Version APIs at the URL path or header level; maintain backward compatibility within a version
- Return consistent error response structures across all endpoints

## Security Practices

- Enable CSRF protection for all state-changing operations in session-based authentication
- Use Django's ORM parameterized queries and SQLAlchemy's bound parameters to prevent SQL injection
- Apply rate limiting to authentication endpoints and expensive operations
- Configure CORS policies explicitly — never allow wildcard origins in production
- Store secrets in environment variables; never commit credentials or API keys to the repository
