---
name: nextjs-standards
description: Next.js conventions covering App Router architecture, data fetching, rendering strategies, and performance
version: "1.0"
technologies: [next.js, react, react-dom]
categories: [frontend, fullstack, frameworks]
scope: tech-match
priority: high
---

## App Router Architecture

- Use the App Router (`app/` directory) as the default for new projects and features
- Organize routes with colocation: keep page-specific components, utils, and types alongside route segments
- Use route groups `(groupName)` for layout organization without affecting URL structure
- Keep layouts focused on shared UI chrome (navigation, sidebars); avoid heavy logic in layouts
- Use `loading.tsx`, `error.tsx`, and `not-found.tsx` files for declarative loading and error states

## Data Fetching

- Fetch data in Server Components by default; use `fetch` with Next.js caching semantics or direct database/API calls
- Avoid `useEffect` for data fetching — use Server Components, Server Actions, or data fetching libraries with Suspense
- Deduplicate requests with React's automatic fetch deduplication in Server Components
- Pass fetched data as props from Server Components to Client Components rather than re-fetching on the client
- Use parallel data fetching with `Promise.all` in layouts and pages to avoid sequential waterfalls

## Rendering Strategies

- Default to Server Components; add `"use client"` only when components need interactivity, browser APIs, or React hooks
- Keep the Client Component boundary as low as possible in the component tree to maximize server rendering
- Use streaming with `Suspense` boundaries to progressively render page sections
- Apply static rendering where possible; use `generateStaticParams` for dynamic routes with known parameters
- Choose ISR (Incremental Static Regeneration) for content that changes infrequently but needs eventual freshness

## Route Handlers and Server Actions

- Use Server Actions for form mutations and data modifications instead of custom API routes
- Validate all Server Action inputs server-side — client-side validation is a UX convenience, not a security measure
- Use Route Handlers (`route.ts`) for webhook endpoints, third-party API integrations, and non-form data operations
- Keep Server Actions focused on a single mutation; avoid combining unrelated operations in one action
- Implement optimistic updates with `useOptimistic` for responsive user experiences during mutations

## Performance

- Use `next/image` for all images with appropriate `sizes` and `priority` attributes
- Apply `next/font` for font loading with automatic self-hosting and zero layout shift
- Implement `next/link` prefetching for anticipated navigation paths
- Minimize client-side JavaScript by keeping interactive components small and server-rendering everything else
- Use `dynamic()` imports for heavy client components that are not needed on initial render

## Caching and Revalidation

- Understand the four caching layers: Request Memoization, Data Cache, Full Route Cache, Router Cache
- Use `revalidatePath` and `revalidateTag` for on-demand cache invalidation after mutations
- Set explicit `revalidate` times on fetch requests for time-based cache freshness
- Use `cache: 'no-store'` for data that must always be fresh (user-specific content, real-time data)
- Avoid over-caching — stale data bugs are harder to debug than slightly slower fresh fetches
