---
name: java-standards
description: Java language conventions covering type design, exception handling, streams, concurrency, and dependency injection
version: "1.0"
technologies: [java, spring]
categories: [languages, backend]
scope: tech-match
priority: high
---

## Type Design and Records

- Use records for immutable data carriers; prefer them over POJOs with manual equals/hashCode/toString
- Use sealed classes and interfaces to define closed type hierarchies for domain modeling
- Prefer composition over inheritance; use interfaces with default methods for shared behavior
- Design classes to be either immutable or clearly document mutation semantics

## Exception Handling

- Use checked exceptions for recoverable business errors that callers must handle
- Use unchecked exceptions (RuntimeException subclasses) for programming errors and invariant violations
- Define domain-specific exception types rather than reusing generic exceptions like IllegalStateException
- Always include context in exception messages — what was the operation, what input caused the failure
- Never catch and silently ignore exceptions; always log or rethrow with wrapping context

## Streams and Functional Patterns

- Use Stream API for collection transformations; prefer method references over lambda expressions where clearer
- Keep stream pipelines short and readable; extract complex operations into named methods
- Use `Optional` for return types that may have no value; never use Optional as a field type or method parameter
- Avoid side effects in stream operations — streams should be pure transformations

## Concurrency

- Prefer `CompletableFuture` and virtual threads (Java 21+) over raw thread management
- Use concurrent collections from `java.util.concurrent` instead of manually synchronized wrappers
- Keep critical sections short; prefer lock-free data structures where possible
- Document thread-safety guarantees on shared classes and methods

## Dependency Injection

- Use constructor injection exclusively; avoid field injection and setter injection
- Define dependencies as interfaces to enable testing and future implementation changes
- Keep constructors focused — if a class needs many dependencies, it may have too many responsibilities
- Use dependency injection frameworks for wiring, but keep business logic framework-agnostic

## Module and Package Organization

- Organize packages by feature domain, not by technical layer (avoid separate `controller`, `service`, `repository` packages)
- Use Java module system (`module-info.java`) for multi-module projects to enforce encapsulation
- Keep package depth shallow and names meaningful; avoid deeply nested hierarchies
- Make classes package-private by default; expose only the public API
