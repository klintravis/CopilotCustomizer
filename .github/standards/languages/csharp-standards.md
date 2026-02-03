---
name: csharp-standards
description: C# language conventions covering type design, async patterns, error handling, LINQ, dependency injection, and naming
version: "1.0"
technologies: [csharp, dotnet]
categories: [languages, backend]
scope: tech-match
priority: high
---

## Type Design

- Use records for immutable data transfer objects and value-based equality semantics
- Prefer `readonly struct` for small, frequently allocated value types to reduce heap pressure
- Use nullable reference types (`string?`) and enable nullable context project-wide to eliminate null reference errors
- Prefer interfaces over abstract classes; use default interface methods for optional shared behavior

## Async Patterns

- Use `async`/`await` for all I/O-bound operations; never block on async code with `.Result` or `.Wait()`
- Suffix async methods with `Async` (e.g., `GetUserAsync`) for clarity
- Accept and forward `CancellationToken` in all async public APIs to support cooperative cancellation
- Use `ValueTask<T>` over `Task<T>` for hot paths where results are frequently available synchronously
- Prefer `Task.WhenAll` for independent concurrent operations over sequential awaits

## Error Handling

- Throw specific exception types; avoid `throw new Exception(...)` with generic messages
- Use exception filters (`when` clause) for conditional catch logic instead of catching and re-checking
- Never use exceptions for control flow; reserve them for truly exceptional conditions
- Include structured context in exception messages — operation, entity, identifiers
- Use the Result pattern for expected business failures that callers should handle explicitly

## LINQ and Collections

- Prefer LINQ method syntax for complex queries and query syntax for simple projections and joins
- Avoid multiple enumeration of `IEnumerable<T>` — materialize with `ToList()` or `ToArray()` when the sequence will be iterated more than once
- Use `IReadOnlyCollection<T>` and `IReadOnlyList<T>` in public API return types to signal immutability intent
- Prefer collection expressions and `Span<T>` for performance-sensitive collection operations

## Dependency Injection

- Use constructor injection exclusively; register services in composition root only
- Register dependencies with the appropriate lifetime: `Transient` for stateless, `Scoped` for request-scoped, `Singleton` for shared state
- Depend on abstractions (interfaces) rather than concrete implementations
- Avoid service locator pattern — resolve dependencies through the constructor, not by injecting `IServiceProvider`

## Naming and Conventions

- Follow .NET naming conventions: `PascalCase` for public members, `camelCase` for locals and parameters, `_camelCase` for private fields
- Prefix interfaces with `I` (e.g., `IUserRepository`) following .NET convention
- Use meaningful names that describe intent; avoid Hungarian notation or type-based prefixes
- Name async methods, boolean properties (`IsActive`, `HasPermission`), and event handlers consistently
