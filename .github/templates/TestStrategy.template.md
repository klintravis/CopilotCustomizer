```markdown
# Test Strategy Template (Universal)

**Purpose**: Structured test planning and validation framework for any technology stack (unit tests, integration tests, E2E tests, TDD workflows, QA strategies, coverage planning, etc.). Provides clear, actionable testing approach across languages and frameworks.

## Summary (≤3 bullets)
- What is being tested (system, component, feature scope)
- Primary testing objectives and quality goals
- Overall approach and methodology (TDD, BDD, exploratory, etc.)

## Context (≤2 bullets)
- Technology stack and testing frameworks/tools
- Key constraints or requirements (coverage targets, performance SLAs, compliance needs)

## Test Scope & Objectives (≤5 bullets)
- **In Scope**: Features, components, or systems to be tested
- **Out of Scope**: Explicitly excluded areas or deferred testing
- **Coverage Goals**: Target percentages or critical path requirements
- **Quality Objectives**: Performance, security, accessibility, usability targets
- **Success Criteria**: Measurable outcomes that define test completion

## Test Types & Approach

### Unit Tests
**Coverage Target**: [e.g., 80% line coverage, 90% critical paths]  
**Framework**: [e.g., Jest, Pytest, xUnit, JUnit]  
**Focus Areas**:
- Business logic and algorithms
- Edge cases and error handling
- Data validation and transformation
- [Technology-specific concerns]

### Integration Tests
**Coverage Target**: [e.g., All API endpoints, database interactions]  
**Framework**: [e.g., Supertest, Integration test library]  
**Focus Areas**:
- API contract validation
- Database operations and transactions
- External service integrations
- Component interaction patterns

### End-to-End Tests
**Coverage Target**: [e.g., Critical user journeys, happy paths]  
**Framework**: [e.g., Playwright, Cypress, Selenium]  
**Focus Areas**:
- User workflow validation
- Cross-browser/device compatibility
- Authentication and authorization flows
- [Application-specific scenarios]

### Additional Testing (as applicable)
- **Performance Tests**: Load, stress, scalability validation
- **Security Tests**: Vulnerability scans, penetration testing, OWASP compliance
- **Accessibility Tests**: WCAG compliance, screen reader compatibility
- **Visual Regression**: UI consistency and design system adherence
- **Smoke Tests**: Critical functionality validation for deployments

## Test Environment & Infrastructure

**Environments**:
- **Local**: Developer machines, unit test execution
- **CI/CD**: Automated test runs on [platform]
- **Staging**: Pre-production validation environment
- **Production**: Monitoring, synthetic tests, canary deployments

**Dependencies**:
- Test databases or data fixtures
- Mock services or test doubles
- Authentication/authorization test accounts
- External API sandboxes or stubs

**Tools & Frameworks**:
- Test runners: [e.g., Jest, Pytest]
- Assertion libraries: [e.g., Chai, Testing Library]
- Mocking/stubbing: [e.g., MSW, unittest.mock]
- Coverage reporting: [e.g., Istanbul, Coverage.py]
- CI/CD integration: [e.g., GitHub Actions, Jenkins]

## Test Data Strategy

**Approach**: [Fixtures, factories, seeding, synthetic data generation]  
**Management**:
- Static fixtures for predictable scenarios
- Factory patterns for dynamic test data
- Database seeding and cleanup strategies
- PII/sensitive data handling for compliance

**Data Sources**:
- Anonymized production data (if applicable)
- Synthetic data generators
- Shared test datasets
- Environment-specific test accounts

## Test Execution Plan

### Frequency
| Test Type | Trigger | Duration Target |
|-----------|---------|----------------|
| Unit | On every commit | <2 minutes |
| Integration | On PR creation | <10 minutes |
| E2E | On PR approval | <30 minutes |
| Performance | Nightly/weekly | <2 hours |
| Security | Weekly/release | Variable |

### CI/CD Integration
- **Pre-commit hooks**: Linting, fast unit tests
- **PR validation**: Full unit + integration suite
- **Merge gates**: All tests passing + coverage thresholds
- **Post-merge**: E2E, performance, extended validation
- **Release validation**: Full regression + smoke tests

### Manual Testing
- **Exploratory**: [Frequency and focus areas]
- **UAT**: [User acceptance criteria and process]
- **Beta testing**: [Early adopter validation strategy]

## Quality Gates & Metrics

### Coverage Thresholds
- **Overall code coverage**: [e.g., 80% minimum]
- **Critical paths**: [e.g., 95% for authentication, payments]
- **New code**: [e.g., 90% for all new features]
- **Branch coverage**: [e.g., 75% for conditional logic]

### Quality Metrics
- **Test success rate**: [e.g., >98% pass rate]
- **Flakiness tolerance**: [e.g., <2% flaky tests]
- **Test execution time**: [e.g., <5 minutes for unit suite]
- **Bug escape rate**: [e.g., <5% of issues found in production]

### Acceptance Criteria
- [ ] All critical user journeys covered by E2E tests
- [ ] Coverage thresholds met for all test types
- [ ] No high-severity bugs in backlog
- [ ] Performance benchmarks within acceptable ranges
- [ ] Security scans pass with no critical vulnerabilities
- [ ] Accessibility compliance validated for public interfaces

## Risk Assessment & Mitigation

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|------------|--------|-------------------|
| Insufficient test coverage | Medium | High | Coverage gates in CI/CD, code review focus |
| Flaky tests reduce confidence | High | Medium | Quarantine flaky tests, root cause analysis |
| Test data management issues | Medium | Medium | Automated seeding, data isolation patterns |
| Long test execution times | Medium | High | Parallel execution, test optimization reviews |
| Production bugs not caught | Low | High | Production monitoring, synthetic tests, post-mortems |

## Maintenance & Evolution

**Test Maintenance**:
- Regular review of test effectiveness and value
- Deprecate obsolete tests as features evolve
- Refactor for maintainability and clarity
- Update test data and fixtures as needed

**Continuous Improvement**:
- Retrospective on escaped bugs and test gaps
- Performance profiling of test suites
- Adoption of new testing tools and patterns
- Team training on testing best practices

**Documentation**:
- Keep test strategy current with system changes
- Document complex test scenarios and data setups
- Maintain testing guidelines and conventions
- Share lessons learned and common patterns

## Quality Checklist
- [ ] Test scope clearly defined with in/out boundaries
- [ ] All test types identified with appropriate coverage targets
- [ ] Test environment and infrastructure requirements specified
- [ ] Test data strategy defined with management approach
- [ ] Execution plan includes frequency and CI/CD integration
- [ ] Quality gates and metrics established with thresholds
- [ ] Risks identified with concrete mitigation strategies
- [ ] Maintenance and evolution approach documented
- [ ] Technology stack and frameworks explicitly listed
- [ ] Success criteria are measurable and verifiable

---

### Generation Notes
**Optimized for**: Universal testing strategy across all technology stacks  
**Date**: 2025-11-01  
**Process**: Template creation following CopilotCustomizer framework standards and Analysis.template.md patterns
```
