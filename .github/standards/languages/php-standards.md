---
name: php-standards
description: PHP language conventions covering type safety, error handling, modern patterns, code organization, and dependency management
version: "1.0"
technologies: [php, laravel]
categories: [languages, backend]
scope: tech-match
priority: high
---

## Type Safety

- Use strict types declaration (`declare(strict_types=1)`) in every file
- Add type declarations to all function parameters, return types, and class properties
- Use union types, intersection types, and `null` safe operators for expressive type constraints
- Prefer enums (PHP 8.1+) over class constants for finite value sets
- Use readonly properties and readonly classes for immutable data structures

## Error Handling

- Use exceptions for error conditions; define custom exception classes organized by domain
- Never suppress errors with `@` operator — handle them explicitly
- Catch specific exception types rather than catching generic `\Exception` at every call site
- Use `finally` blocks for cleanup logic that must execute regardless of success or failure
- Log errors with structured context including operation name, relevant identifiers, and stack traces

## Modern PHP Patterns

- Use named arguments for functions with multiple optional parameters to improve readability
- Prefer constructor promotion for simple dependency injection and value objects
- Use match expressions over switch statements for cleaner, expression-based branching
- Leverage attributes (PHP 8.0+) for metadata over docblock annotations where framework support exists
- Use fibers and async patterns for concurrent I/O operations where applicable

## Code Organization

- Follow PSR-4 autoloading standards with namespace-to-directory mapping
- Organize code by domain feature rather than by technical layer
- Keep classes focused on a single responsibility; extract collaborators when a class grows beyond clear cohesion
- Use interfaces for dependencies that may have multiple implementations or need test doubles
- Follow PSR-12 coding style for consistent formatting across the codebase

## Dependency Management

- Pin major versions in `composer.json` and commit `composer.lock` for reproducible builds
- Audit dependencies for security vulnerabilities regularly using `composer audit`
- Prefer well-maintained packages with active communities over abandoned or niche alternatives
- Keep the dependency tree shallow — avoid transitive dependency sprawl by evaluating what each package pulls in
