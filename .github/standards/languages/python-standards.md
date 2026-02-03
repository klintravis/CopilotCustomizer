---
name: python-standards
description: Python language conventions covering type hints, code organization, error handling, data modeling, and async programming
version: "1.0"
technologies: [python, flask, django, fastapi]
categories: [languages, backend]
scope: tech-match
priority: high
---

## Type Hints and Annotations

- Add type hints to all public function signatures including parameters and return types
- Use `from __future__ import annotations` for forward reference support and cleaner syntax
- Prefer `str | None` union syntax over `Optional[str]` in modern Python codebases
- Use `TypedDict`, `Protocol`, and `dataclass` types to model structured data over plain dicts

## Code Organization

- Organize imports in three groups: standard library, third-party packages, local modules — enforce with isort
- Structure projects with clear package boundaries; avoid deep nesting beyond three levels
- Keep modules focused on a single domain concept; split when a module exceeds clear cohesion
- Use `__init__.py` exports deliberately to define public package interfaces

## Error Handling

- Use specific exception types; never use bare `except:` or `except Exception` without re-raising
- Define custom exception hierarchies for domain-specific error categories
- Log errors with structured context (request ID, user context, operation name) at catch sites
- Use context managers (`with` statements) for resource cleanup rather than try/finally blocks

## Data Modeling

- Prefer `dataclasses` for simple value objects and `Pydantic` models for validated external data
- Make data classes immutable with `frozen=True` when mutation is not required
- Use `Enum` and `StrEnum` for finite sets of values rather than string constants
- Separate domain models from API serialization models to keep boundaries clean

## Idiomatic Patterns

- Use list comprehensions and generator expressions for transformations; avoid complex nested comprehensions
- Prefer `pathlib.Path` over `os.path` for file system operations
- Use `itertools` and built-in functions (`zip`, `enumerate`, `any`, `all`) over manual loop patterns
- Follow PEP 8 naming: `snake_case` for functions and variables, `PascalCase` for classes, `UPPER_SNAKE_CASE` for constants

## Async Programming

- Use `asyncio` with `async`/`await` for I/O-bound concurrency; avoid threads for network operations
- Never mix synchronous blocking calls inside async functions without offloading to a thread pool
- Use `asyncio.gather` for concurrent independent operations with proper error handling
- Prefer async context managers and async iterators for resource-scoped async workflows
