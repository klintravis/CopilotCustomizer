---
name: monorepo-standards
description: Monorepo principles covering package boundaries, dependency management, build optimization, and shared code governance
version: "1.0"
technologies: [node, typescript, javascript]
categories: [architecture, tooling]
scope: tech-match
priority: low
---

## Package Boundaries

- Define clear package boundaries based on deployment units, team ownership, or domain boundaries
- Each package should have a well-defined public API exported through its entry point; internal modules should not be imported directly
- Use a consistent package structure across the monorepo for predictability and tooling compatibility
- Name packages with a shared scope prefix (`@org/package-name`) for namespace clarity
- Keep packages focused — a package should have one reason to exist and one primary consumer audience

## Dependency Management

- Use workspace-aware package managers (npm workspaces, pnpm workspaces, Yarn workspaces) for dependency hoisting and linking
- Pin shared dependency versions across packages to avoid version conflicts and duplicated bundles
- Manage internal package dependencies through workspace protocol references, not published versions
- Audit the dependency graph regularly to identify unnecessary or circular cross-package dependencies
- Keep the root `package.json` for workspace configuration and dev tooling only; avoid placing application logic at the root

## Build Optimization

- Use incremental build tools (Turborepo, Nx) that cache build outputs and skip unchanged packages
- Define clear build dependency graphs so the build system can parallelize independent package builds
- Cache build artifacts in CI to avoid rebuilding unchanged packages across pipeline runs
- Keep build configurations consistent across packages using shared configuration packages or presets
- Optimize the critical path — identify and prioritize the build steps that block the most downstream packages

## Shared Code Governance

- Create shared packages for genuinely reusable code (design system components, utility libraries, shared types)
- Require explicit opt-in when adding a dependency on a shared package — avoid making everything depend on a shared utils package
- Assign ownership of shared packages to specific teams responsible for their stability and versioning
- Apply stricter review and testing requirements to shared packages since changes affect multiple consumers
- Version shared packages with clear changelogs so consumers understand the impact of updates

## CI/CD Considerations

- Run affected-only CI pipelines that test and build only packages impacted by a change and their dependents
- Use path-based filtering to trigger specific pipelines for specific package directories
- Implement a release strategy that supports independent package releases without requiring full monorepo releases
- Test cross-package integration in CI by including dependent package tests when a shared dependency changes
- Keep CI pipeline duration manageable — parallelize test and build jobs, cache aggressively, and prune unnecessary steps
