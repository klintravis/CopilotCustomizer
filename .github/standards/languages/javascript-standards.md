---
name: javascript-standards
description: JavaScript language conventions covering module system, variable scoping, error handling, async patterns, and modern syntax usage
version: "1.0"
technologies: [javascript, node, deno, bun]
categories: [languages, backend, frontend]
scope: tech-match
priority: high
---

## Module System and Imports

- Use ES modules (`import`/`export`) as the default module system; avoid CommonJS `require` in new code
- Keep imports organized: third-party modules first, then internal modules, then relative imports
- Prefer named exports over default exports for clarity and refactoring safety
- Avoid circular dependencies by structuring modules around a clear dependency graph

## Variable Declarations and Scoping

- Default to `const` for all declarations; use `let` only when reassignment is genuinely needed
- Never use `var` — block scoping with `const` and `let` eliminates hoisting surprises
- Declare variables close to their first use rather than at the top of a function
- Avoid relying on implicit type coercion — use strict equality (`===`) consistently

## Error Handling

- Use specific error types or custom error classes rather than throwing plain strings or generic Error objects
- Catch errors at system boundaries (API handlers, entry points) and let them propagate through internal layers
- Never silently swallow errors — always log or rethrow with context
- Handle promise rejections explicitly; unhandled rejections should fail loudly in all environments

## Async Patterns

- Prefer `async`/`await` over raw promise chains for readability and debuggability
- Use `Promise.all` for independent concurrent operations; use `Promise.allSettled` when partial failures are acceptable
- Avoid mixing callbacks and promises in the same module
- Be explicit about sequential vs. parallel execution — do not `await` in loops when operations are independent

## Type Safety Without TypeScript

- Use JSDoc annotations for public function signatures to enable editor tooling and documentation generation
- Validate external inputs (API payloads, configuration, environment variables) at system boundaries
- Prefer early returns and guard clauses to narrow types within function bodies
- Use well-named constants and enumerations instead of magic strings and numbers

## Modern Syntax Usage

- Use optional chaining (`?.`) and nullish coalescing (`??`) instead of verbose null checks
- Prefer destructuring for extracting properties from objects and arrays
- Use template literals for string composition instead of concatenation
- Prefer `Array.from`, spread syntax, and iterator methods over manual loops where intent is clearer
