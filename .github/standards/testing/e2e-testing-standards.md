---
name: e2e-testing-standards
description: End-to-end testing standards covering test design, page objects, stability, CI integration, and data management
version: "1.0"
technologies: [playwright, cypress]
categories: [testing, quality, frontend]
scope: tech-match
priority: medium
---

## Test Design

- Write E2E tests for critical user journeys: sign-up, login, core feature workflows, checkout, and payment flows
- Keep E2E test count small and focused — they are the most expensive tests to maintain and run
- Test from the user's perspective: interact with visible elements, fill forms, click buttons, and verify displayed outcomes
- Avoid testing implementation details or internal state; verify only what a user would see and experience
- Write tests that are resilient to cosmetic UI changes — use semantic selectors (roles, labels, test IDs) over CSS classes

## Page Object and Component Models

- Encapsulate page interactions in page object classes that abstract DOM selectors and common actions
- Keep page objects focused on a single page or logical component; compose them for multi-page flows
- Expose meaningful methods on page objects (`login(user, password)`) rather than raw element interactions
- Centralize selector definitions in page objects so selector changes require updating only one location
- Return page objects from navigation actions to enable fluent, chainable test flows

## Test Stability

- Use explicit waits for elements and network responses rather than arbitrary `sleep` or fixed timeouts
- Retry flaky assertions with built-in test framework retry mechanisms rather than wrapping in custom loops
- Isolate tests from each other — each test should set up its own state and not depend on previous test outcomes
- Handle dynamic content (loading spinners, animations, toast notifications) with proper wait strategies
- Run tests in a consistent viewport size and browser configuration to avoid layout-dependent failures

## CI Integration

- Run E2E tests in CI pipelines against deployed preview environments or containerized application stacks
- Capture screenshots and video recordings on test failure for debugging without local reproduction
- Set reasonable timeouts for CI runs — E2E tests should fail within minutes, not hang indefinitely
- Parallelize test execution across multiple workers or machines to keep total suite time manageable
- Gate deployments on E2E test passage for critical user flows; allow non-critical tests to report without blocking

## Data Management

- Seed test data through API calls or database scripts before each test; never rely on manually maintained test data
- Use unique identifiers in test data to prevent collisions between parallel test runs
- Clean up created test data after each test or use isolated environments that reset between runs
- Avoid depending on third-party services in E2E tests; mock external integrations at the network boundary
- Keep test data realistic enough to exercise actual validation and business logic
