---
name: ci-cd-standards
description: CI/CD pipeline standards covering pipeline design, testing stages, deployment strategy, environment management, and security
version: "1.0"
technologies: [github-actions, gitlab-ci]
categories: [devops, practices]
scope: tech-match
priority: medium
---

## Pipeline Design

- Structure pipelines with clear, sequential stages: build, test, security scan, deploy
- Keep pipeline configurations version-controlled alongside application code
- Use reusable workflow templates or shared pipeline libraries to maintain consistency across repositories
- Fail fast — run the fastest checks (linting, type checking, unit tests) first to provide rapid feedback
- Parallelize independent jobs within each stage to minimize total pipeline duration

## Testing Stages

- Run unit tests on every commit to ensure immediate feedback on code correctness
- Run integration tests on every pull request merge to validate component interactions
- Run E2E tests against staging deployments before promoting to production
- Include security scanning (SAST, dependency audit, container scanning) as a required pipeline stage
- Set test failure as a hard gate — never allow deployment to proceed when tests fail

## Deployment Strategy

- Use progressive deployment strategies (canary, blue-green, rolling) for production releases
- Implement automated rollback triggered by health check failures or error rate spikes after deployment
- Deploy to staging environments that mirror production configuration for realistic pre-production validation
- Use immutable deployment artifacts — build once, deploy the same artifact to all environments
- Gate production deployments on approval from designated reviewers for critical services

## Environment Management

- Maintain environment parity between staging and production for configuration, infrastructure, and data schemas
- Use environment-specific configuration through variables and secrets, not through different code branches
- Automate environment provisioning and teardown for feature branches and review environments
- Protect production environment secrets with strict access controls and audit logging
- Create ephemeral preview environments for pull requests to enable reviewers to test changes in isolation

## Pipeline Security

- Store pipeline secrets in the CI platform's secret management system; never hardcode them in pipeline files
- Restrict pipeline permissions to the minimum needed for each job (least privilege for tokens and credentials)
- Pin action versions and tool versions in pipeline configurations to prevent supply chain attacks
- Audit pipeline logs to ensure they do not leak secrets, credentials, or sensitive configuration values
- Require signed commits and verified identities for pipeline-triggering events in production branches
