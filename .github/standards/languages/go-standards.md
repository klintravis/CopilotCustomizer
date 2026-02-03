---
name: go-standards
description: Go language conventions covering error handling, interface design, concurrency patterns, and package organization
version: "1.0"
technologies: [go, gin, fiber]
categories: [languages, backend]
scope: tech-match
priority: high
---

## Error Handling

- Return errors as the last return value; always check returned errors explicitly
- Wrap errors with context using `fmt.Errorf("operation: %w", err)` to build meaningful error chains
- Use sentinel errors (`var ErrNotFound = errors.New(...)`) or custom error types for errors callers need to handle distinctly
- Never ignore errors silently — if an error is genuinely irrelevant, document why with a comment
- Use `errors.Is` and `errors.As` for error inspection rather than string comparison

## Interface Design

- Define interfaces at the point of use (consumer), not at the point of implementation (provider)
- Keep interfaces small — one or two methods is ideal; larger interfaces reduce reusability
- Accept interfaces, return concrete types to maximize flexibility for callers
- Use the standard library interface conventions (`io.Reader`, `io.Writer`, `fmt.Stringer`) as design models

## Concurrency Patterns

- Prefer channels for communication between goroutines; use mutexes only for protecting shared state
- Always ensure goroutines have a clear shutdown path — use `context.Context` for cancellation and timeouts
- Never start goroutines without a plan for their lifecycle and error handling
- Use `sync.WaitGroup` or `errgroup.Group` to coordinate multiple concurrent operations
- Avoid goroutine leaks by ensuring channels are closed and select cases handle `ctx.Done()`

## Package Organization

- Keep packages focused on a single responsibility; avoid catch-all packages named `util`, `common`, or `helpers`
- Name packages with short, clear, lower-case names that describe their purpose
- Avoid import cycles by structuring dependencies in a directed acyclic graph
- Place the main entry point in `cmd/` directories; keep business logic in internal packages
- Use `internal/` packages to prevent external consumers from depending on implementation details

## Naming and Style

- Follow Go naming conventions: `MixedCaps` for exported identifiers, `mixedCaps` for unexported
- Use short variable names in small scopes (`i`, `r`, `w`) and descriptive names in larger scopes
- Name getters without the `Get` prefix — use `user.Name()` not `user.GetName()`
- Keep function signatures simple; prefer option structs or functional options over long parameter lists
- Write doc comments on all exported types, functions, and packages following godoc conventions
