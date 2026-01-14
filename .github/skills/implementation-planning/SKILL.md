---
name: implementation-planning
description: Strategic implementation planning methodology for software changes. Creates detailed, step-by-step execution plans with risk mitigation and validation strategies. Use when planning features, refactoring, or complex code changes.
---

<!-- ASSET: implementation-planning | TYPE: Skill | VERSION: v1.0 -->


# Implementation Planning Skill

## Metadata
Asset ID: skill/implementation-planning | Created: 2026-01-14 | Status: Active

## Purpose

## When to Use This Skill
- Planning new feature implementation
- Designing refactoring strategies
- Creating migration plans
- Organizing complex code changes
- Preparing for code reviews
- Establishing validation approaches

## Planning Framework

### Phase 1: Requirements Clarification
**Objective**: Ensure complete understanding of what needs to be built

**Clarification Questions**:
```yaml
Functional Requirements:
  - What should the feature/change do?
  - What are the acceptance criteria?
  - What are the edge cases?
  - What are the performance requirements?

Technical Constraints:
  - Are there API compatibility requirements?
  - What are the backward compatibility needs?
  - Are there security considerations?
  - What are the testing requirements?

Context:
  - Why is this change needed?
  - What problem does it solve?
  - Who are the users/consumers?
  - What's the priority/urgency?
```

**Output**: Clear, documented requirements with acceptance criteria

### Phase 2: Strategy Design
**Objective**: Define high-level approach to implementation

**Strategy Options**:

1. **Incremental Approach**
   - Break into small, testable changes
   - Each step is independently valuable
   - Minimize risk through gradual rollout
   - **Best for**: Large features, refactoring

2. **Big Bang Approach**
   - Complete implementation in one go
   - All changes deployed together
   - Faster delivery but higher risk
   - **Best for**: Small features, tight coupling

3. **Parallel Development**
   - Build new alongside old
   - Switch over when ready
   - Zero downtime migration
   - **Best for**: Infrastructure changes, replacements

4. **Feature Flag Approach**
   - Implement behind toggle
   - Gradual rollout control
   - Easy rollback mechanism
   - **Best for**: High-risk features, A/B testing

**Decision Matrix**:
| Factor | Incremental | Big Bang | Parallel | Feature Flag |
|--------|-------------|----------|----------|--------------|
| Risk | Low | High | Medium | Low |
| Speed | Slow | Fast | Medium | Medium |
| Rollback | Easy | Hard | Easy | Easy |
| Complexity | Low | Low | High | Medium |

**Output**: Selected strategy with justification

### Phase 3: Change Specification
**Objective**: Detail every file and change required

**File-by-File Breakdown**:

```markdown
### File: src/services/userService.ts
**Action**: MODIFY
**Changes**:
  - Add new method: getUserPreferences()
  - Update existing: updateUser() to handle preferences
  - Add validation: preferenceSchema

**Affected Lines**: Approx 45-67, new function at end

**Dependencies**:
  - Imports PreferenceType from types/preferences.ts
  - Uses PreferenceRepository (new)

**Risk**: LOW (isolated change, existing tests cover)

---

### File: src/types/preferences.ts
**Action**: CREATE
**Content**:
  - Export PreferenceType interface
  - Export PreferenceCategory enum
  - Export validation schemas

**Template**: [See example below]

**Dependencies**: None (new isolated file)

**Risk**: LOW (new file, no breaking changes)

---

### File: tests/userService.test.ts
**Action**: MODIFY
**Changes**:
  - Add test suite: getUserPreferences()
  - Update test: updateUser() with preferences

**Test Cases**:
  - Valid preferences retrieval
  - Invalid user ID handling
  - Preference update flow
  - Edge case: empty preferences

**Risk**: LOW (test file, no production impact)
```

**Output**: Complete file change specification

### Phase 4: Dependency Management
**Objective**: Plan for new dependencies and version changes

**New Dependencies**:
```yaml
packages:
  - name: zod
    version: ^3.22
    purpose: Runtime validation for preferences
    justification: Type-safe validation, widely used
    alternatives: yup, joi (heavier, less TS-friendly)
    risk: LOW (stable, well-maintained)

  - name: lodash.merge
    version: ^4.6
    purpose: Deep merge for preference updates
    justification: Battle-tested, specific import reduces bundle
    alternatives: Native spread (doesn't handle deep merge)
    risk: LOW (micro-package, stable)
```

**Version Updates** (if needed):
- Current package vulnerabilities to fix
- Breaking changes to handle
- Migration steps required

**Output**: Dependency change plan with risk assessment

### Phase 5: Testing Strategy
**Objective**: Define comprehensive test approach

**Test Levels**:

1. **Unit Tests**
   ```yaml
   Target:
     - New functions: getUserPreferences(), updateUser()
     - New validation: preferenceSchema
   
   Coverage:
     - Happy path (valid inputs)
     - Edge cases (empty, null, undefined)
     - Error cases (invalid types, DB failures)
   
   Approach:
     - Mock external dependencies (DB, services)
     - Test isolation (one function per suite)
     - Clear assertions (exact expected values)
   ```

2. **Integration Tests**
   ```yaml
   Target:
     - End-to-end preference flow
     - Database interaction
     - API endpoint behavior
   
   Scenarios:
     - Create user with preferences
     - Update preferences
     - Retrieve preferences
     - Delete user (cascade to preferences)
   ```

3. **Performance Tests** (if needed)
   ```yaml
   Target:
     - Query performance with large datasets
     - Concurrent update handling
   
   Benchmarks:
     - Response time <200ms for preference retrieval
     - Handle 100 concurrent updates
   ```

**Test-First Approach** (TDD):
```
1. Write failing test for getUserPreferences()
2. Implement minimal code to pass
3. Refactor for quality
4. Repeat for each function
```

**Output**: Test plan with specific test cases

### Phase 6: Risk Mitigation
**Objective**: Identify and plan for potential issues

**Risk Catalog**:

```yaml
Risk: Breaking existing user update functionality
  Likelihood: MEDIUM
  Impact: HIGH
  Mitigation:
    - Comprehensive test coverage of existing behavior
    - Feature flag for preference handling
    - Backward compatible API (optional preferences field)
  Rollback:
    - Toggle feature flag off
    - Redeploy previous version if needed

Risk: Database migration failure in production
  Likelihood: LOW
  Impact: HIGH
  Mitigation:
    - Test migration on production-like data
    - Backup database before migration
    - Reversible migration script
  Rollback:
    - Run down migration script
    - Restore from backup if needed

Risk: Performance degradation on preference queries
  Likelihood: LOW
  Impact: MEDIUM
  Mitigation:
    - Add database index on user_id + preference_key
    - Load test with realistic data volume
    - Query optimization review
  Rollback:
    - Remove index if causing issues
    - Cache preference queries
```

**Risk Matrix**:
| Risk | Likelihood | Impact | Priority | Mitigation Status |
|------|-----------|--------|----------|-------------------|
| Breaking changes | Medium | High | P1 | Planned |
| DB migration fail | Low | High | P2 | Planned |
| Performance | Low | Medium | P3 | Planned |

**Output**: Risk register with mitigation strategies

### Phase 7: Validation Planning
**Objective**: Define how success will be measured

**Validation Levels**:

1. **Code Quality Validation**
   ```yaml
   Automated:
     - Linter passes (no warnings)
     - Type checking passes (strict mode)
     - Unit tests pass (100% of new code)
     - Integration tests pass
   
   Manual:
     - Code review approval (2+ reviewers)
     - Security review (if touching auth/data)
     - Architecture review (if major changes)
   ```

2. **Functional Validation**
   ```yaml
   Acceptance Criteria:
     ✓ Users can set preferences
     ✓ Preferences persist across sessions
     ✓ Invalid preferences are rejected
     ✓ Preference updates are atomic
   
   Test Cases:
     ✓ Happy path works end-to-end
     ✓ Edge cases handled correctly
     ✓ Error messages are clear
   ```

3. **Performance Validation**
   ```yaml
   Benchmarks:
     - P50 latency: <100ms (preference retrieval)
     - P99 latency: <500ms
     - Throughput: >1000 req/sec
   
   Load Testing:
     - 100 concurrent users
     - 10,000 preferences in database
     - No memory leaks over 1 hour
   ```

4. **Production Validation**
   ```yaml
   Monitoring:
     - Error rate <0.1%
     - Response time within SLA
     - No database deadlocks
     - Memory usage stable
   
   Rollout:
     - Canary: 5% of traffic for 1 hour
     - Gradual: 50% for 24 hours
     - Full: 100% after validation
   ```

**Output**: Validation checklist with success metrics

### Phase 8: Implementation Sequence
**Objective**: Order changes for minimal disruption

**Sequencing Strategy**:

```
Phase 1: Foundation (No user impact)
  1. Create new types (preferences.ts)
  2. Add database schema/migration
  3. Create preference repository
  4. Write unit tests for repository

Phase 2: Integration (Still no user impact)
  5. Add preference methods to userService
  6. Write unit tests for service methods
  7. Update API endpoints (feature flagged OFF)
  8. Write integration tests

Phase 3: Activation (Gradual rollout)
  9. Enable feature flag for internal users
  10. Monitor for 24 hours
  11. Gradual rollout to production
  12. Remove feature flag after stabilization
```

**Dependency Order**:
```
types/preferences.ts (no dependencies)
  ↓
repositories/preferenceRepository.ts (depends on types)
  ↓
services/userService.ts (depends on repository)
  ↓
api/userController.ts (depends on service)
  ↓
tests/* (depends on implementations)
```

**Output**: Ordered task list with dependencies

## Implementation Plan Template

```markdown
# Implementation Plan: [Feature Name]

## Overview
**Objective**: [Clear goal statement]
**Strategy**: [Chosen approach]
**Risk Level**: [LOW/MEDIUM/HIGH]
**Estimated Effort**: [Hours/days]

## Requirements
**Functional**:
- [Requirement 1]
- [Requirement 2]

**Non-Functional**:
- Performance: [Criteria]
- Security: [Requirements]
- Compatibility: [Constraints]

**Acceptance Criteria**:
- [ ] [Criterion 1]
- [ ] [Criterion 2]

## Implementation Strategy
**Approach**: [Incremental/Big Bang/Parallel/Feature Flag]
**Justification**: [Why this approach]

**Phases**:
1. [Phase name]: [Description]
2. [Phase name]: [Description]

## File Changes

### New Files
| File | Purpose | Risk | Dependencies |
|------|---------|------|--------------|
| [path] | [purpose] | [LOW/MED/HIGH] | [list] |

### Modified Files
| File | Changes | Risk | Impact |
|------|---------|------|--------|
| [path] | [summary] | [LOW/MED/HIGH] | [description] |

### Deleted Files
| File | Reason | Risk | Migration |
|------|--------|------|-----------|
| [path] | [why] | [LOW/MED/HIGH] | [how] |

## Dependencies
**New Packages**:
- [package@version]: [purpose]

**Updates**:
- [package]: [old] → [new] (reason)

## Testing Plan
**Unit Tests**:
- [ ] [Test suite 1]
- [ ] [Test suite 2]

**Integration Tests**:
- [ ] [Test scenario 1]
- [ ] [Test scenario 2]

**Performance Tests**:
- [ ] [Benchmark 1]

## Risk Mitigation
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| [risk] | [L/M/H] | [L/M/H] | [strategy] |

## Validation Checklist
- [ ] Code quality (linter, types, tests)
- [ ] Functional (acceptance criteria met)
- [ ] Performance (benchmarks met)
- [ ] Security (review complete)
- [ ] Production (monitoring configured)

## Implementation Sequence
1. [ ] **Foundation**: [Tasks]
2. [ ] **Integration**: [Tasks]
3. [ ] **Activation**: [Tasks]

## Rollback Plan
**Triggers**:
- [Condition that requires rollback]

**Steps**:
1. [Rollback action]
2. [Verification step]

## Success Metrics
- [Metric 1]: [Target]
- [Metric 2]: [Target]

---
**Approval Required**: ✋ User confirmation before execution
**Next Step**: Hand off to ChangeExecutor agent (VS Code)
```

## Quality Gates

### Before Starting Implementation
- [ ] Requirements fully understood
- [ ] All stakeholders aligned
- [ ] Technical approach validated
- [ ] Risks identified and mitigated
- [ ] **User approval obtained** ✋

### During Implementation
- [ ] Following plan sequence
- [ ] Tests passing incrementally
- [ ] Code review feedback addressed
- [ ] Documentation updated

### Before Production
- [ ] All acceptance criteria met
- [ ] Performance benchmarks validated
- [ ] Security review complete
- [ ] Rollback plan tested

## Best Practices

### Clarity
- Use specific file paths and line numbers
- Provide code examples where helpful
- Link to relevant documentation

### Risk Awareness
- Be realistic about risks (don't sugarcoat)
- Provide concrete mitigation strategies
- Always have a rollback plan

### User Communication
- Present plan clearly for approval
- Highlight high-risk areas
- Provide effort estimates
- Set expectations on timeline

### Flexibility
- Build in checkpoints for reassessment
- Allow for plan adjustments
- Don't over-specify (leave room for implementation decisions)

## Integration with Other Capabilities

**Upstream** (feeds from):
- `repository-analysis` skill for codebase understanding
- Requirements gathering from user

**Downstream** (feeds to):
- VS Code ChangeExecutor agent for implementation
- Documentation generation for tracking

**Workflow**:
```
repository-analysis (understand context)
  ↓
implementation-planning (create strategy) ← THIS SKILL
  ↓
[USER APPROVAL GATE] ✋
  ↓
VS Code ChangeExecutor (execute plan)
  ↓
VS Code VerificationAgent (validate)
```

## Success Criteria

A good implementation plan provides:
- ✅ Clear, actionable steps
- ✅ Comprehensive risk assessment
- ✅ Detailed test strategy
- ✅ Realistic effort estimates
- ✅ Concrete validation criteria
- ✅ Rollback procedures

---

**Skill Type**: Planning and Strategy  
**Complexity**: Medium-High  
**Typical Duration**: 10-30 minutes  
**Prerequisites**: Requirements clarity, repository analysis

**Cross-Platform**: Works in VS Code, GitHub Copilot CLI, Claude, Cursor, and other Skills-compatible agents.

**Log Entry Format**:
```
[YYYY-MM-DD HH:MM:SS UTC] - Invoked by: {user/system} | Context: {brief description}
```

**Recent Invocations**:
_Manual logging - update this section when invoked_
- [2026-01-14] Added traceability system

### Usage Guidelines
- This asset should be invoked when: Skill-specific workflows are needed
- Expected outcome: Execution of implementation-planning Skill functionality
- Related assets: See related skills in the same directory

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |

---

---

## Audit
Last invoked: [Manual log]
Change history: v1.0 (2026-01-14) - Added traceability
