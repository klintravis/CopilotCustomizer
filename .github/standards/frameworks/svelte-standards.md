---
name: svelte-standards
description: Svelte component design, reactivity model, store patterns, and SvelteKit integration
version: "1.0"
technologies: [svelte]
categories: [frontend, frameworks]
scope: tech-match
priority: high
---

## Component Design

- Keep components focused on a single UI concern; extract sub-components when complexity grows
- Use TypeScript with Svelte for type-safe props, events, and slots
- Prefer `<script lang="ts">` blocks with explicit prop type declarations
- Co-locate component styles using scoped `<style>` blocks; avoid global styles except for design tokens
- Name components with PascalCase and keep file names matching component names

## Reactivity Model

- Use Svelte 5 runes (`$state`, `$derived`, `$effect`) as the default reactivity system in new code
- Prefer `$derived` for computed values over manually tracking dependencies
- Keep `$effect` focused on side effects (DOM manipulation, external subscriptions); avoid using effects for state derivation
- Avoid deeply nested reactive state; prefer flat, normalized data structures
- Use `$bindable` props for controlled two-way binding patterns

## Store Patterns

- Use Svelte stores for state shared between unrelated components
- Prefer readable stores for data that components should not modify directly
- Keep store logic pure — move side effects (API calls, persistence) to separate service functions
- Derive computed stores using the `derived` store factory rather than subscribing and manually updating
- Unsubscribe from stores properly; use the `$store` auto-subscription syntax in components

## SvelteKit Integration

- Use SvelteKit's file-based routing with `+page.svelte` and `+layout.svelte` conventions
- Load data in `+page.server.ts` or `+page.ts` load functions rather than in component lifecycle
- Use form actions for mutations; prefer progressive enhancement over client-only form handling
- Apply server-only logic in `+server.ts` route handlers and `+page.server.ts` load functions
- Use hooks (`hooks.server.ts`) for cross-cutting concerns like authentication and error handling

## Performance

- Leverage SvelteKit's built-in code splitting through route-based chunking
- Use `{#key}` blocks to force component re-creation only when necessary
- Prefer `{#each}` with keyed items for list rendering; use stable identifiers as keys
- Avoid unnecessary reactivity — use plain constants for values that never change
- Use streaming and deferred data loading patterns for slow data sources
