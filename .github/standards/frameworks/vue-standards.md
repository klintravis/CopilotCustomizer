---
name: vue-standards
description: Vue.js component architecture, composables, state management, and template best practices
version: "1.0"
technologies: [vue, nuxt]
categories: [frontend, frameworks]
scope: tech-match
priority: high
---

## Component Architecture

- Use the Composition API with `<script setup>` as the default for all new components
- Keep components focused on a single concern; extract child components when templates exceed manageable complexity
- Use single-file components (SFC) with `<script>`, `<template>`, and `<style>` co-located
- Name components with multi-word PascalCase names to avoid conflicts with HTML elements

## Composables and Reactivity

- Extract reusable stateful logic into composable functions prefixed with `use` (e.g., `useAuth`, `usePagination`)
- Use `ref` for primitive values and `reactive` for objects; prefer `ref` when the choice is ambiguous
- Avoid destructuring reactive objects without `toRefs` — it breaks reactivity
- Use `computed` for derived state rather than watchers that set other reactive values
- Keep `watch` and `watchEffect` focused on side effects; avoid using them for state derivation

## State Management

- Start with component-local state and `provide`/`inject` for shared ancestor-descendant state
- Use Pinia for application-wide state management with clear store boundaries per domain
- Keep stores lean — avoid putting API calls directly in stores; use composables or services for data fetching
- Structure stores by domain feature, not by technical concern

## Props and Events

- Define props with full type declarations including required, default, and validator where applicable
- Use `defineEmits` with typed event declarations for component communication
- Prefer events over prop mutation — never modify props directly; emit events to request parent changes
- Use `v-model` with custom components for two-way binding patterns; support multiple `v-model` bindings where appropriate

## Performance

- Use `v-once` for static content that never changes and `v-memo` for expensive list item renders
- Apply `defineAsyncComponent` for code splitting of heavy components not needed on initial render
- Use `shallowRef` and `shallowReactive` for large data structures where deep reactivity is unnecessary
- Avoid `v-if` and `v-for` on the same element; restructure with wrapper elements or computed properties

## Template Best Practices

- Prefer `v-if`/`v-else-if`/`v-else` chains over complex ternary expressions in templates
- Always use `:key` with `v-for` using stable, unique identifiers — never use array index as key for dynamic lists
- Keep template expressions simple; move complex logic to computed properties or methods
- Use scoped styles by default; use deep selectors (`:deep()`) sparingly for third-party component overrides
