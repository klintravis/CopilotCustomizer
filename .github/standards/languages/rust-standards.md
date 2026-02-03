---
name: rust-standards
description: Rust language conventions covering ownership, error handling, trait design, concurrency, and performance idioms
version: "1.0"
technologies: [rust, actix-web]
categories: [languages, backend, systems]
scope: tech-match
priority: high
---

## Ownership and Borrowing

- Prefer borrowing (`&T`, `&mut T`) over cloning; clone only when ownership transfer is genuinely needed
- Use `Cow<'_, T>` for functions that sometimes need to allocate and sometimes can borrow
- Keep lifetimes explicit only when the compiler cannot infer them; avoid unnecessary lifetime annotations
- Prefer returning owned types from public APIs for ergonomic use by callers

## Error Handling

- Use `Result<T, E>` for recoverable errors and reserve `panic!` for unrecoverable invariant violations
- Define domain-specific error enums and implement `std::error::Error` for interoperability
- Use the `?` operator for error propagation; avoid deeply nested `match` chains on Results
- Provide context when converting errors — use `map_err` or crates like `thiserror` and `anyhow` appropriately

## Trait Design

- Design traits with a single, focused responsibility; prefer many small traits over few large ones
- Provide default method implementations where a sensible default exists
- Prefer trait bounds on functions (`fn foo(x: impl Trait)`) over dynamic dispatch (`dyn Trait`) for performance-critical paths
- Use associated types for traits with a single natural output type; use generics when multiple implementations per type are needed

## Concurrency and Safety

- Prefer message passing (`mpsc`, `crossbeam` channels) over shared mutable state for communication between threads
- Use `Arc<Mutex<T>>` or `Arc<RwLock<T>>` only when shared mutable state is unavoidable; keep critical sections short
- Leverage `Send` and `Sync` bounds to enforce thread safety at compile time
- Use `tokio` or `async-std` for async I/O; avoid blocking calls inside async contexts

## Module Organization

- Use the module system to enforce visibility boundaries; expose only the public API from `lib.rs` or module roots
- Keep `mod.rs` files minimal — use them for re-exports, not logic
- Organize by domain feature rather than by technical layer
- Use `pub(crate)` for items that need internal visibility but should not be part of the public API

## Performance Idioms

- Prefer stack allocation and value types; use `Box<T>` only when heap allocation is required by the type system or design
- Use iterators and iterator adapters over manual index-based loops for clarity and compiler optimization
- Avoid unnecessary allocations in hot paths — reuse buffers, prefer `&str` over `String` in read-only contexts
- Profile before optimizing; use `cargo bench` and tools like `criterion` for data-driven performance decisions
