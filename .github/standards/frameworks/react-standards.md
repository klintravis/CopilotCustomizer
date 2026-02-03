---
name: react-component-standards
description: React component architecture, hooks conventions, state management, and performance patterns
version: "1.0"
technologies: [react, react-dom, next.js, gatsby, remix]
categories: [frontend, components]
scope: tech-match
priority: high
---

## Component Architecture

- Use functional components exclusively — class components only when required by legacy library constraints
- Keep components focused on a single responsibility; extract sub-components when a component exceeds ~150 lines or handles multiple concerns
- Prefer composition (children, render props, compound components) over inheritance or prop drilling
- Co-locate component files with their styles, tests, and types in feature-based directories

## Hooks Conventions

- Extract reusable logic into custom hooks with clear, descriptive names (e.g., `useDebounce`, `useIntersectionObserver`)
- Follow the Rules of Hooks strictly — never call hooks conditionally or in loops
- Keep `useEffect` focused on a single concern; prefer multiple small effects over one large effect
- Always specify complete dependency arrays; use ESLint's `exhaustive-deps` rule
- Clean up subscriptions, timers, and listeners in effect cleanup functions

## State Management

- Start with component-local state (`useState`); lift state only when siblings need to share it
- Use React Context for low-frequency global state (theme, locale, auth status) — not for high-frequency updates
- Reach for external state management (Zustand, Jotai, Redux Toolkit) only when Context causes measurable performance issues or when state logic becomes complex
- Derive computed values inline or with `useMemo` rather than storing derived state separately
- Avoid duplicating server state in client state — use data fetching libraries (TanStack Query, SWR) that manage caching and synchronization

## Performance

- Use `React.memo` for components that receive stable props but re-render due to parent updates — profile first, don't memo everything
- Apply `useMemo` and `useCallback` to prevent expensive recalculations or to stabilize references passed to memoized children — avoid premature optimization
- Implement code splitting with `React.lazy` and `Suspense` at route boundaries and for heavy components
- Use virtualization (e.g., `react-window`, `@tanstack/virtual`) for long lists rather than rendering all items
- Prefer CSS-based animations over JavaScript-driven re-renders

## Props and API Design

- Define prop types with TypeScript interfaces; export them for consumer reuse
- Use discriminated union props for components with mutually exclusive modes
- Provide sensible defaults for optional props
- Prefer controlled components for form inputs in most cases; use uncontrolled only for simple fire-and-forget forms
- Avoid prop drilling beyond two levels — restructure with composition or context

## Testing Patterns

- Test component behavior (what the user sees and does), not implementation details (internal state, lifecycle methods)
- Use React Testing Library with `screen` queries; prefer `getByRole` and `getByLabelText` over `getByTestId`
- Test user interactions with `userEvent` rather than `fireEvent`
- Mock API calls at the network level (MSW) rather than mocking fetch/axios directly
- Write integration tests for connected component flows; reserve unit tests for pure utility logic and custom hooks

## Error Handling

- Use Error Boundaries to catch rendering errors and display fallback UI
- Place Error Boundaries at meaningful application boundaries (route level, widget level), not around every component
- Log caught errors to monitoring services within Error Boundary `componentDidCatch`
- Handle async errors (data fetching, event handlers) separately — Error Boundaries only catch render-phase errors
