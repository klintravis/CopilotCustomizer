---
name: infrastructure-as-code-standards
description: Infrastructure as Code standards covering code organization, state management, module design, change management, and security
version: "1.0"
technologies: [terraform, docker, kubernetes]
categories: [devops, infrastructure]
scope: tech-match
priority: medium
---

## Code Organization

- Organize infrastructure code by environment and service with clear directory boundaries
- Separate shared infrastructure (networking, DNS, IAM) from application-specific infrastructure
- Use consistent file naming conventions within each infrastructure module (main, variables, outputs, providers)
- Keep infrastructure code in the same repository as the application it supports, or in a dedicated infrastructure repository with clear ownership
- Document the infrastructure architecture and relationships between components in the repository

## State Management

- Store infrastructure state remotely with locking enabled to prevent concurrent modification conflicts
- Use separate state files per environment and per service to limit blast radius of state corruption
- Never manually edit state files; use CLI commands for state operations (import, move, remove)
- Encrypt state files at rest since they may contain sensitive values like connection strings and resource identifiers
- Implement state backup and recovery procedures; test restoration periodically

## Module Design

- Create reusable modules for infrastructure patterns used across multiple services or environments
- Design modules with clear input variables, output values, and sensible defaults
- Version modules with semantic versioning and changelogs to communicate breaking changes
- Keep modules focused on a single infrastructure concern; compose modules for complex infrastructure
- Test modules independently using infrastructure testing frameworks before promoting to production use

## Change Management

- Review all infrastructure changes through pull requests with mandatory approval before applying
- Use plan/preview commands to inspect proposed changes before applying them to any environment
- Apply changes to non-production environments first and validate before promoting to production
- Implement automated drift detection to identify manual changes made outside the IaC pipeline
- Keep infrastructure changes small and incremental; avoid large-scale changes that are difficult to review and roll back

## Security Practices

- Follow the principle of least privilege for all IAM roles, policies, and service accounts defined in infrastructure code
- Never store secrets in infrastructure code or variable files; use secret management services with dynamic secret injection
- Enable encryption at rest and in transit for all managed resources where supported
- Define network security rules (security groups, network policies) explicitly; default to deny-all and allow only required traffic
- Audit infrastructure code for security misconfigurations using policy-as-code tools (OPA, Checkov, tfsec) in CI pipelines
