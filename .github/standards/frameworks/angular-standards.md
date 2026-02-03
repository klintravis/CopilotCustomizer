---
name: angular-standards
description: Angular application architecture, dependency injection, reactive patterns, and service design
version: "1.0"
technologies: [angular, typescript]
categories: [frontend, frameworks]
scope: tech-match
priority: high
---

## Application Architecture

- Organize the application into feature modules with clear boundaries and lazy-loaded routes
- Use standalone components as the default; reserve NgModules only for legacy compatibility
- Keep smart (container) components separate from presentational (dumb) components
- Use Angular signals for new reactive state; migrate from zone-based change detection where feasible
- Follow the single-responsibility principle — each component, service, and pipe should have one reason to change

## Dependency Injection

- Provide services at the most appropriate level: root for singletons, component for scoped instances
- Use `inject()` function in standalone components and directives over constructor injection
- Define injection tokens for configuration values and third-party service abstractions
- Avoid circular dependencies between services; restructure with mediator patterns or event-based communication

## Reactive Patterns

- Use RxJS deliberately — prefer signals for synchronous state and RxJS for async streams and event coordination
- Keep observable chains short and readable; extract complex pipelines into named operator functions
- Always unsubscribe from observables — use `takeUntilDestroyed`, `async` pipe, or `DestroyRef`
- Avoid nested subscriptions; flatten with `switchMap`, `mergeMap`, or `concatMap` as appropriate
- Handle errors in observable chains with `catchError`; provide meaningful fallback behavior

## Template and Binding

- Use the new control flow syntax (`@if`, `@for`, `@switch`) over structural directives in new code
- Apply `trackBy` functions with `@for` to optimize list rendering performance
- Keep templates declarative; move complex logic to the component class or computed signals
- Use `OnPush` change detection strategy to minimize unnecessary re-renders

## Services and Data Access

- Encapsulate HTTP calls in dedicated data services; never call `HttpClient` directly from components
- Use interceptors for cross-cutting concerns: authentication tokens, error handling, loading indicators
- Return typed observables or signals from services; avoid `any` in API response types
- Implement optimistic updates and caching at the service layer, not in components

## Testing

- Write unit tests for services, pipes, and component logic; use component harnesses for DOM interaction tests
- Use `TestBed` sparingly — prefer direct instantiation for services with simple dependencies
- Mock HTTP calls with `HttpClientTestingModule` and verify request patterns
- Test observable behavior with marble testing for complex async flows
