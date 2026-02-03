---
name: typescript-standards
description: TypeScript language conventions covering strict mode, type design, error handling, and module organization
version: "1.0"
technologies: [typescript, ts-node]
categories: [languages, backend, frontend]
scope: tech-match
priority: high
---

## Strict Mode and Compiler Settings

- Enable `strict: true` in tsconfig — no exceptions
- Enable `noUncheckedIndexedAccess` for safer array/object access
- Treat compiler warnings as errors in CI

## Type Design

- Prefer type inference where the type is obvious from context; add explicit annotations for public API signatures, function parameters, and return types
- Use union types and discriminated unions over enums — they are more flexible, tree-shakeable, and provide better type narrowing
- Use `readonly` properties and `ReadonlyArray<T>` for data that should not be mutated after creation
- Prefer `unknown` over `any`; narrow with type guards rather than casting
- Use branded types or template literal types to enforce domain constraints at the type level (e.g., `UserId`, `EmailAddress`)

## Error Handling

- Model expected failures with discriminated union result types (e.g., `{ success: true; data: T } | { success: false; error: E }`) rather than throwing exceptions for control flow
- Reserve `throw` for truly unexpected errors (programmer mistakes, invariant violations)
- Catch errors at system boundaries; let them propagate through internal layers
- Always type error responses — avoid `catch (e: any)`

## Module Organization

- Use barrel exports (`index.ts`) sparingly and only at package or feature boundaries — avoid deep barrel chains that cause circular dependency issues
- Prefer named exports over default exports for better refactoring support and import consistency
- Co-locate types with their implementation; avoid large shared `types.ts` files that become change bottlenecks
- Organize by feature, not by technical layer, in application code

## Naming Conventions

- Use `PascalCase` for types, interfaces, classes, and enums
- Use `camelCase` for variables, functions, and methods
- Use `UPPER_SNAKE_CASE` for true constants (compile-time known values)
- Prefix interfaces only when disambiguation is necessary — prefer `User` over `IUser`
- Name boolean variables and functions with `is`, `has`, `should`, `can` prefixes

## Immutability and Data Flow

- Default to `const` declarations; use `let` only when reassignment is required
- Prefer spread operators and non-mutating array methods (`map`, `filter`, `reduce`) over in-place mutation
- Use `as const` assertions for literal type inference on configuration objects and lookup tables

## Async Patterns

- Prefer `async/await` over raw promise chains for readability
- Always handle promise rejections — unhandled rejections should fail loudly
- Use `Promise.all` for independent concurrent operations; use `Promise.allSettled` when partial failure is acceptable
- Avoid mixing callback and promise patterns in the same module
