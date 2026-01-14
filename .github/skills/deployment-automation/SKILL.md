---
name: deployment-automation
description: CI/CD pipeline design, deployment strategies, and release automation. Use when implementing GitHub Actions, container deployments, release workflows, and infrastructure automation.
---

<!-- TRACEABILITY: INVOCATION ALERT -->
═══════════════════════════════════════════════════════════════════
🔔 ASSET INVOCATION ALERT
═══════════════════════════════════════════════════════════════════
Asset Name    : deployment-automation Skill
Asset Type    : Skill
Asset Version : v1.0
Invoked At    : {timestamp}
Invocation ID : skill-deployment-automation-{timestamp-hash}
═══════════════════════════════════════════════════════════════════
📋 STATUS: Skill Active | Methodology ready for application
═══════════════════════════════════════════════════════════════════
<!-- END TRACEABILITY ALERT -->

# Deployment Automation Skill

## Purpose

### Asset Metadata
| Property | Value |
|----------|-------|
| **Asset ID** | `skill/deployment-automation` |
| **Version** | `v1.0` |
| **Created** | `2026-01-14` |
| **Last Modified** | `2026-01-14` |
| **Maintained By** | `CopilotCustomizer` |
| **Status** | `Active` |
| **Category** | `Cross-Platform Skills` |
Systematic methodology for designing and implementing CI/CD pipelines, deployment strategies, and release automation. Covers GitHub Actions workflows, container orchestration, infrastructure-as-code patterns, and automated release processes.

## When to Use This Skill
- Designing CI/CD pipelines and workflows
- Implementing GitHub Actions automation
- Planning container deployments (Docker, Kubernetes)
- Creating release and versioning strategies
- Setting up infrastructure-as-code (Terraform, CloudFormation)
- Automating testing, building, and deployment phases
- Establishing monitoring and rollback strategies
- Planning multi-environment deployments

## Deployment Framework

### Phase 1: Architecture Planning
**Objective**: Define deployment strategy and infrastructure

**Strategy Options**:

1. **Blue-Green Deployment**
   - Run two identical production environments
   - Switch traffic between versions
   - **Pros**: Zero downtime, instant rollback
   - **Cons**: Double infrastructure cost, data consistency challenges
   - **Best for**: Critical applications, frequent releases

2. **Canary Deployment**
   - Release to small percentage of users first
   - Gradually increase traffic percentage
   - Monitor metrics and rollback if needed
   - **Pros**: Low risk, real-world testing
   - **Cons**: Complex monitoring, slower rollout
   - **Best for**: High-traffic applications, major changes

3. **Rolling Deployment**
   - Update instances/containers one at a time
   - Maintain availability during updates
   - **Pros**: No extra infrastructure, simple monitoring
   - **Cons**: Longer deployment time, brief capacity reduction
   - **Best for**: Microservices, stateless applications

4. **Feature Flags**
   - Deploy behind feature toggles
   - Control feature availability without redeployment
   - **Pros**: Instant enable/disable, A/B testing
   - **Cons**: Code complexity, configuration management
   - **Best for**: Rapid development, large teams

**Selection Matrix**:
| Factor | Blue-Green | Canary | Rolling | Feature Flag |
|--------|-----------|--------|---------|--------------|
| Complexity | Medium | High | Low | Medium |
| Rollback Speed | Instant | Minutes | Minutes | Instant |
| Cost | 2x | 1x | 1x | 1x |
| Risk | Low | Low | Medium | Low |

### Phase 2: CI Pipeline Design
**Objective**: Automate code validation and artifact creation

**Pipeline Stages**:

```
Push Code
  ↓ [Trigger]
1. Build
   - Compile/transpile code
   - Run linters
   - Generate artifacts
  ↓ [Success]
2. Test
   - Unit tests
   - Integration tests
   - Coverage reports
  ↓ [Success]
3. Security
   - SAST (static analysis)
   - Dependency scanning
   - Container scanning
  ↓ [Success]
4. Artifact
   - Build Docker image / packages
   - Push to registry
   - Create release artifacts
  ↓ [Success]
5. Deploy (Staging)
   - Deploy to staging environment
   - Run smoke tests
   - Verify functionality
  ↓ [Approval Gate]
6. Deploy (Production)
   - Execute deployment strategy
   - Monitor health metrics
   - Enable rollback if needed
```

**GitHub Actions Example Structure**:
```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build
        run: npm run build
  
  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Run tests
        run: npm test
  
  deploy:
    needs: [build, test]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        run: npm run deploy
```

### Phase 3: Environment Configuration
**Objective**: Manage configuration across environments

**Environment Levels**:

| Level | Purpose | Data | Secrets | Update Frequency |
|-------|---------|------|---------|------------------|
| **Dev** | Developer testing | Fake/seeded | Non-prod | Per commit |
| **Staging** | Pre-production testing | Production-like | Non-prod | Per release candidate |
| **Production** | Live user traffic | Real data | Prod secrets | Controlled releases |

**Configuration Management**:

1. **Environment Variables**
   - Use `.env` files for development (NOT committed)
   - Use GitHub Secrets for sensitive data
   - Use ConfigMaps for Kubernetes
   - Use Systems Manager Parameter Store (AWS)

2. **Secrets Rotation**
   - Automate secret rotation schedules
   - Implement graceful secret transitions
   - Audit secret access
   - Revoke compromised secrets immediately

3. **Configuration-as-Code**
   ```yaml
   # Example: Environment config
   environments:
     development:
       database_url: postgresql://dev-db:5432/app_dev
       log_level: DEBUG
       cache_ttl: 300
     production:
       database_url: # from secret
       log_level: ERROR
       cache_ttl: 3600
   ```

### Phase 4: Testing Strategy
**Objective**: Comprehensive validation before production

**Test Layers**:

1. **Unit Tests**
   - Fast execution (< 1 second per test)
   - 80%+ code coverage target
   - Test single functions/methods
   - Run on every commit

2. **Integration Tests**
   - 15-30 second execution
   - Test component interactions
   - Use test databases/services
   - Run on pull requests

3. **End-to-End Tests**
   - Full user workflows
   - 1-5 minute execution
   - Browser/API testing
   - Run before production deployment

4. **Performance Tests**
   - Load testing (concurrent users)
   - Stress testing (peak conditions)
   - Profiling and optimization
   - Establish performance baselines

5. **Security Tests**
   - SAST (SonarQube, CodeQL)
   - DAST (Burp Suite, OWASP ZAP)
   - Dependency scanning (Dependabot, Snyk)
   - Container scanning (Trivy)

### Phase 5: Monitoring & Observability
**Objective**: Track health and performance in production

**Key Metrics**:

```yaml
Availability:
  - Uptime percentage (target: 99.9%+)
  - Error rates (target: < 0.1%)
  - Successful request rate

Performance:
  - Response time (p50, p95, p99)
  - Throughput (requests/second)
  - Database query latency

Resources:
  - CPU usage
  - Memory usage
  - Disk usage
  - Network bandwidth

Business:
  - User signups
  - Transactions completed
  - Feature adoption
```

**Observability Stack**:

1. **Logs**
   - Structured logging (JSON format)
   - Log levels: ERROR, WARN, INFO, DEBUG
   - Centralized logging (ELK, Splunk, CloudWatch)
   - Searchable and filterable

2. **Metrics**
   - Prometheus/CloudWatch for metrics collection
   - Dashboards for visualization
   - Alerting on thresholds
   - Time-series retention

3. **Traces**
   - Distributed tracing (Jaeger, Datadog)
   - Request flow across services
   - Latency breakdown
   - Error context

4. **Alerts**
   - Alert on error rate spike
   - Alert on latency increase
   - Alert on resource exhaustion
   - Page on-call team

### Phase 6: Rollback Strategy
**Objective**: Recover quickly from failed deployments

**Rollback Approaches**:

1. **Instant Rollback** (Blue-Green)
   - Switch load balancer to previous version
   - Execution time: < 1 minute
   - Data migration: Backward compatible required

2. **Gradual Rollback** (Canary)
   - Reduce traffic to new version
   - Route back to stable version
   - Execution time: 5-15 minutes

3. **Database Rollback**
   - Non-breaking schema changes (add columns, new tables)
   - Never delete data immediately
   - Use feature flags for data compatibility
   - Plan migration path

4. **Rollback Checklist**
   - [ ] Identify root cause
   - [ ] Notify on-call team
   - [ ] Initiate rollback procedure
   - [ ] Verify previous version health
   - [ ] Post-mortem after resolution

### Phase 7: Release Management
**Objective**: Systematic version releases

**Version Strategy** (Semantic Versioning):
```
MAJOR.MINOR.PATCH (e.g., 1.5.3)

MAJOR: Breaking changes
MINOR: New features (backward compatible)
PATCH: Bug fixes

Examples:
- 1.0.0 → 2.0.0 (major breaking change)
- 1.0.0 → 1.1.0 (new feature)
- 1.0.0 → 1.0.1 (bug fix)
```

**Release Workflow**:

1. **Planning**
   - Define features/fixes for release
   - Set target release date
   - Plan migration path if needed

2. **Development**
   - Feature branches with pull requests
   - Automated testing on all PRs
   - Code review requirements

3. **Staging**
   - Deploy to staging environment
   - Run full test suite
   - Performance/load testing
   - Stakeholder approval

4. **Release**
   - Create version tag
   - Build and push artifacts
   - Update changelog
   - Deploy to production
   - Announce release

5. **Post-Release**
   - Monitor metrics
   - Gather user feedback
   - Plan hotfixes if needed
   - Document lessons learned

## Common Patterns

### GitHub Actions Workflow Template
```yaml
name: Release
on:
  workflow_dispatch:  # Manual trigger
    inputs:
      version:
        description: 'Release version'
        required: true

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Create tag
        run: |
          git tag ${{ github.event.inputs.version }}
          git push origin ${{ github.event.inputs.version }}
      
      - name: Build artifacts
        run: npm run build
      
      - name: Create release
        uses: actions/create-release@v1
        with:
          tag_name: ${{ github.event.inputs.version }}
          release_name: Release ${{ github.event.inputs.version }}
      
      - name: Deploy to production
        run: npm run deploy:prod
```

### Canary Deployment with Monitoring
```yaml
name: Deploy with Canary
jobs:
  deploy:
    steps:
      - name: Deploy canary (10%)
        run: kubectl set image deploy/app app=myapp:${{ github.sha }} --record
      
      - name: Wait and monitor
        run: |
          for i in {1..5}; do
            ERROR_RATE=$(curl https://metrics/error_rate)
            if [ $ERROR_RATE -gt 1 ]; then
              echo "High error rate detected: $ERROR_RATE"
              kubectl rollout undo deploy/app
              exit 1
            fi
            sleep 60
          done
      
      - name: Full rollout (100%)
        run: kubectl set image deploy/app app=myapp:${{ github.sha }}
```

## Quality Checklist

- [ ] CI/CD pipeline passes all builds
- [ ] Test coverage > 80%
- [ ] All security scans passing
- [ ] Deployment strategy documented
- [ ] Rollback procedure tested
- [ ] Monitoring alerts configured
- [ ] Team trained on deployment process
- [ ] Release notes prepared
- [ ] Stakeholder approval obtained
- [ ] On-call team notified

## Best Practices

1. **Automate Everything** - Minimize manual steps
2. **Test Before Deploy** - Comprehensive automated testing
3. **Environment Parity** - Staging mirrors production
4. **Fast Feedback** - CI/CD completes in < 10 minutes
5. **Observable** - Logs, metrics, traces for troubleshooting
6. **Documented** - Playbooks for common scenarios
7. **Gated** - Approval gates for production changes
8. **Measurable** - DORA metrics (deployment frequency, lead time, MTTR, change failure rate)

---

## Traceability & Audit

### Invocation Log
This section tracks when and how this asset is used.

**Log Entry Format**:
```
[YYYY-MM-DD HH:MM:SS UTC] - Invoked by: {user/system} | Context: {brief description}
```

**Recent Invocations**:
_Manual logging - update this section when invoked_
- [2026-01-14] Added traceability system

### Usage Guidelines
- This asset should be invoked when: Skill-specific workflows are needed
- Expected outcome: Execution of deployment-automation Skill functionality
- Related assets: See related skills in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---
*Traceability System v1.0 - Asset tracking enabled*
