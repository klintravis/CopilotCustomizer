---
name: ruby-standards
description: Ruby language conventions covering object design, error handling, metaprogramming discipline, and idiomatic patterns
version: "1.0"
technologies: [ruby, rails, rspec]
categories: [languages, backend]
scope: tech-match
priority: high
---

## Object Design

- Prefer small, focused classes with a single responsibility; favor composition over deep inheritance hierarchies
- Use modules for shared behavior (mixins) rather than multiple inheritance patterns
- Keep public interfaces minimal — use `private` and `protected` to communicate intent and reduce coupling
- Use `Struct` or `Data` (Ruby 3.2+) for simple value objects instead of full classes

## Error Handling

- Define custom exception classes inheriting from `StandardError` for domain-specific errors
- Rescue specific exception types; never use bare `rescue` without specifying the exception class
- Provide context in error messages including relevant identifiers and operation descriptions
- Use `ensure` blocks for guaranteed cleanup rather than relying on begin/rescue flow
- Let unexpected errors propagate to centralized error handlers rather than catching everything locally

## Metaprogramming Discipline

- Use metaprogramming sparingly — prefer explicit methods over `method_missing` and `define_method` when possible
- Document any metaprogramming clearly with comments explaining what methods are generated and why
- Prefer `class_attribute` and `concern` patterns in Rails over raw `class_eval` and `instance_eval`
- Ensure metaprogrammed methods are discoverable — they should respond to `respond_to?` and appear in documentation

## Idiomatic Patterns

- Use Ruby's expressive syntax: blocks, iterators (`map`, `select`, `reduce`), and guard clauses
- Prefer `freeze` on string constants and configuration values to prevent accidental mutation
- Use symbols for identifiers and hash keys; use strings for display text and user-facing content
- Favor early returns and guard clauses over deeply nested conditionals
- Use `tap`, `then`/`yield_self`, and method chaining for expressive transformation pipelines

## Testing Conventions

- Use RSpec with descriptive `describe` and `context` blocks that read like specifications
- Prefer `let` and `let!` for lazy and eager test data setup; avoid instance variables in tests
- Use factories (FactoryBot) for test data creation with sensible defaults and trait-based variations

## Module Organization

- Follow Rails conventions for project structure when working in Rails applications
- Keep gems and libraries organized with a clear `lib/` structure mirroring the namespace
- Use autoloading conventions (Zeitwerk in modern Rails) rather than explicit `require` statements
- Define clear namespace boundaries; avoid polluting the global namespace with top-level classes
- Group related functionality into well-named modules that serve as namespace containers
