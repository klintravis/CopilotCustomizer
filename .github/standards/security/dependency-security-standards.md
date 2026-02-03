---
name: dependency-security-standards
description: Dependency security standards covering supply chain security, vulnerability management, update strategy, and audit practices
version: "1.0"
technologies: []
categories: [security, practices]
scope: always
priority: high
---

## Supply Chain Security

- Verify package integrity using lock files and checksums; commit lock files to version control
- Use trusted package registries; consider private registries for internal packages
- Review new dependencies before adoption — check maintenance activity, security history, and transitive dependency count
- Prefer well-established packages with active communities over unmaintained or low-adoption alternatives
- Pin dependency versions in production deployments to prevent unexpected changes from upstream updates

## Vulnerability Management

- Scan dependencies for known vulnerabilities in CI pipelines on every build
- Triage vulnerabilities by severity, exploitability, and relevance to the application's usage of the affected package
- Establish response time SLAs: critical vulnerabilities patched within days, high within a sprint, medium within a release cycle
- Track vulnerability remediation in the issue tracker with clear ownership and deadlines
- Distinguish between direct dependency vulnerabilities (higher risk) and deep transitive vulnerabilities (often lower risk)

## Dependency Update Strategy

- Update dependencies regularly on a defined cadence rather than waiting for vulnerabilities to force updates
- Use automated dependency update tools (Dependabot, Renovate) with appropriate merge policies
- Group related dependency updates (framework ecosystem packages) into single updates to reduce breakage risk
- Test dependency updates with the full test suite before merging; watch for subtle behavior changes
- Keep the dependency tree shallow — evaluate whether each dependency is worth the maintenance and security burden it adds

## Audit and Monitoring

- Run dependency audit commands (`npm audit`, `pip audit`, `composer audit`) as part of the CI pipeline
- Monitor for new vulnerability disclosures affecting production dependencies using alerting services
- Maintain a software bill of materials (SBOM) for production deployments to enable rapid impact assessment
- Review dependency licenses for compliance with organizational policies; flag copyleft or restrictive licenses
- Periodically audit the dependency tree for unused dependencies and remove them to reduce the attack surface

## Incident Response

- Define a clear process for responding to zero-day vulnerabilities in dependencies, including communication and patching SLAs
- Maintain a registry of critical dependencies and their maintainers for rapid triage during security incidents
- Document fallback strategies for critical dependencies — identify alternatives that can be swapped in during emergencies
- Conduct post-incident reviews after dependency-related security events to improve prevention and detection
- Practice dependency vulnerability response through periodic tabletop exercises with the development team
