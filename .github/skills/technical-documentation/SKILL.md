---
name: technical-documentation
description: Structured technical documentation generation for software changes, implementations, and analyses. Creates clear, comprehensive documentation including change summaries, API docs, and technical reports. Use when documenting code changes, features, or system architecture.
---

# Technical Documentation Skill

## Purpose
Systematic methodology for generating high-quality technical documentation including change summaries, API documentation, architectural decisions, implementation reports, and user guides. Ensures consistent, maintainable documentation.

## When to Use This Skill
- Documenting completed code changes
- Writing API documentation
- Creating architectural decision records (ADRs)
- Generating implementation reports
- Producing user guides or README files
- Summarizing repository analysis
- Creating change logs and release notes

## Documentation Types

### 1. Change Summary Documentation
**Purpose**: Document what changed, why, and impact

**Structure**:
```markdown
# Change Summary: [Feature/Fix Name]

## Overview
**Date**: [YYYY-MM-DD]
**Type**: [Feature/Bugfix/Refactor/Documentation]
**Status**: [Completed/In Progress/Blocked]
**Impact**: [HIGH/MEDIUM/LOW]

## What Changed
[Clear description of the changes made]

## Why
[Justification and context for the change]

## Files Modified
| File | Type | Lines Changed | Purpose |
|------|------|---------------|---------|
| [path] | [MOD/NEW/DEL] | [+X -Y] | [description] |

## Technical Details

### Implementation
[How the change was implemented]

### Dependencies
**Added**:
- [package@version]: [purpose]

**Updated**:
- [package]: [old] → [new]

### Breaking Changes
- [Description of any breaking changes]
- [Migration guide if needed]

## Testing
**Test Coverage**:
- Unit tests: [X new, Y modified]
- Integration tests: [X new, Y modified]
- Manual testing: [Scenarios tested]

**Results**:
- ✅ All tests passing
- ✅ No regressions detected
- ✅ Performance benchmarks met

## Risks and Mitigations
| Risk | Mitigation | Status |
|------|------------|--------|
| [risk] | [how mitigated] | [status] |

## Validation
- [✅/❌] Code review approved
- [✅/❌] Tests passing
- [✅/❌] Documentation updated
- [✅/❌] Deployed to staging

## Rollback Plan
**Trigger Conditions**:
- [Condition requiring rollback]

**Rollback Steps**:
1. [Step 1]
2. [Step 2]

## Future Considerations
- [Technical debt noted]
- [Future enhancement opportunities]
- [Known limitations]

---
**Author**: [Name]
**Reviewers**: [Names]
**Related**: [Links to issues, PRs, docs]
```

### 2. API Documentation
**Purpose**: Document API endpoints, parameters, responses

**Structure**:
```markdown
# API Documentation: [Service Name]

## Overview
[Brief description of API purpose and capabilities]

**Base URL**: `https://api.example.com/v1`
**Authentication**: [Method]

## Endpoints

### GET /users/{id}
**Description**: Retrieve user by ID

**Parameters**:
| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | User unique identifier |
| include | string | No | Related resources to include (comma-separated) |

**Request Example**:
```http
GET /users/user123?include=preferences,roles
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
{
  "id": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": {...},
  "roles": [...]
}
```

**Error Responses**:
| Code | Description | Example |
|------|-------------|---------|
| 400 | Invalid ID format | `{"error": "Invalid user ID"}` |
| 404 | User not found | `{"error": "User not found"}` |
| 401 | Unauthorized | `{"error": "Invalid token"}` |

**Rate Limiting**:
- Limit: 100 requests per minute
- Headers: `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

### POST /users
**Description**: Create new user

[Similar structure for each endpoint...]
```

### 3. Architectural Decision Records (ADR)
**Purpose**: Document important architectural decisions

**Structure**:
```markdown
# ADR-001: [Decision Title]

**Date**: [YYYY-MM-DD]
**Status**: [Proposed/Accepted/Deprecated/Superseded]
**Context**: [Architectural layer, component, or system area]

## Context
[Describe the issue or requirement that prompted this decision]

## Decision
[State the architectural decision clearly]

## Rationale
[Explain why this decision was made]

**Alternatives Considered**:
1. **Option A**: [Description]
   - Pros: [List]
   - Cons: [List]
   - Rejected because: [Reason]

2. **Option B**: [Description]
   - Pros: [List]
   - Cons: [List]
   - **Selected**: [Why chosen]

## Consequences

**Positive**:
- [Benefit 1]
- [Benefit 2]

**Negative**:
- [Trade-off 1]
- [Trade-off 2]

**Neutral**:
- [Impact 1]

## Implementation
[How this decision will be/was implemented]

## Validation
[How we'll know if this decision was correct]

## Related Decisions
- ADR-002: [Related decision]
- Issue #123: [Related issue]

---
**Authors**: [Names]
**Reviewers**: [Names]
**Supersedes**: [Previous ADR if applicable]
```

### 4. Implementation Report
**Purpose**: Comprehensive report of completed work

**Structure**:
```markdown
# Implementation Report: [Project/Feature Name]

## Executive Summary
[1-2 paragraph overview for stakeholders]

## Objectives
**Goals**:
- [✅] Goal 1 (achieved)
- [✅] Goal 2 (achieved)
- [⚠️] Goal 3 (partial)

**Success Metrics**:
- [Metric 1]: Target [X], Actual [Y]
- [Metric 2]: Target [X], Actual [Y]

## Implementation Details

### Architecture
[High-level architecture diagram or description]

**Components Added**:
1. **Component A**: [Purpose and responsibilities]
2. **Component B**: [Purpose and responsibilities]

**Components Modified**:
1. **Component C**: [Changes made and why]

### Technology Choices
| Technology | Purpose | Justification |
|------------|---------|---------------|
| [tech] | [use] | [why chosen] |

### Code Changes
**Statistics**:
- Files changed: [X]
- Lines added: [+Y]
- Lines removed: [-Z]
- Test coverage: [X%]

**Key Files**:
| File | Purpose | Complexity |
|------|---------|------------|
| [path] | [description] | [HIGH/MED/LOW] |

## Testing and Validation

### Test Coverage
- Unit tests: [X tests, Y% coverage]
- Integration tests: [X tests]
- E2E tests: [X scenarios]

### Performance
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Response time (P50) | [X]ms | [Y]ms | [improvement] |
| Throughput | [X] req/s | [Y] req/s | [improvement] |

### Quality Metrics
- Code review: [X reviewers, Y rounds]
- Linter warnings: [X]
- Type coverage: [Y%]

## Deployment

**Timeline**:
- Development: [Dates]
- Staging: [Date]
- Production: [Date]

**Rollout Strategy**:
- [Description of deployment approach]

**Monitoring**:
- Dashboards: [Links]
- Alerts: [Configured alerts]

## Issues and Resolutions
| Issue | Impact | Resolution | Status |
|-------|--------|------------|--------|
| [issue] | [H/M/L] | [how resolved] | [status] |

## Lessons Learned

**What Went Well**:
- [Success 1]
- [Success 2]

**What Could Improve**:
- [Area 1]
- [Area 2]

**Action Items**:
- [ ] [Future improvement]
- [ ] [Technical debt to address]

## Future Work
- [Enhancement opportunity 1]
- [Enhancement opportunity 2]

---
**Project Duration**: [X weeks/months]
**Team Size**: [X developers]
**Total Effort**: [X person-days]
```

### 5. README/User Guide
**Purpose**: User-facing documentation for library/tool/service

**Structure**:
```markdown
# [Project Name]

> [One-line description]

[![License](badge)](link)
[![Build](badge)](link)

## Features
- ✨ Feature 1
- ✨ Feature 2
- ✨ Feature 3

## Installation

### Prerequisites
- [Requirement 1]
- [Requirement 2]

### Install
```bash
npm install project-name
# or
pip install project-name
```

## Quick Start

### Basic Usage
```language
// Minimal example showing core functionality
import { Feature } from 'project-name';

const result = Feature.doSomething();
```

### Configuration
```language
// Configuration options
const config = {
  option1: 'value',
  option2: true
};
```

## Documentation

### API Reference
[Link to detailed API docs]

### Examples
- [Example 1](link)
- [Example 2](link)

### Guides
- [Getting Started Guide](link)
- [Advanced Usage](link)

## Contributing
See [CONTRIBUTING.md](link)

## License
[License type] - see [LICENSE](link)

## Support
- [Documentation](link)
- [Issue Tracker](link)
- [Discussions](link)
```

## Documentation Best Practices

### Clarity
- **Use clear language**: Avoid jargon unless necessary
- **Be specific**: Use concrete examples
- **Structure logically**: Organize information hierarchically
- **Use formatting**: Bold, italics, lists, tables for readability

### Completeness
- Document WHY, not just WHAT
- Include examples for all key concepts
- Cover error scenarios and edge cases
- Provide troubleshooting guidance

### Maintainability
- Keep documentation close to code (co-located docs)
- Update docs with code changes
- Use consistent formatting and structure
- Version documentation with releases

### Audience Awareness
- **Technical documentation**: Assumes technical knowledge
- **User guides**: Accessible to non-technical users
- **API docs**: Reference format, complete and precise
- **ADRs**: For architects and senior developers

## Formatting Standards

### Code Blocks
````markdown
```language
// Always specify language for syntax highlighting
const example = "code";
```
````

### Tables
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data | Data | Data |
```

### Lists
```markdown
**Ordered** (when sequence matters):
1. First step
2. Second step

**Unordered** (items without order):
- Item A
- Item B

**Checklists**:
- [x] Completed item
- [ ] Pending item
```

### Links
```markdown
[Link text](URL) - External links
[Link text](./relative/path.md) - Internal links
```

### Callouts
```markdown
> **Note**: Important information
> **Warning**: Caution required
> **Tip**: Helpful suggestion
```

## Quality Checklist

Before publishing documentation:
- [ ] Purpose is clear in first paragraph
- [ ] Structure is logical and consistent
- [ ] All code examples are tested and working
- [ ] Links are valid (no broken references)
- [ ] Spelling and grammar reviewed
- [ ] Technical accuracy verified
- [ ] Audience-appropriate language
- [ ] Examples demonstrate key concepts
- [ ] Error scenarios documented
- [ ] Troubleshooting guidance included

## Common Pitfalls

❌ **Don't**:
- Write documentation after the fact (document as you go)
- Use ambiguous language ("might", "should", "probably")
- Assume prior knowledge without stating prerequisites
- Forget to update docs when code changes
- Include outdated screenshots or examples

✅ **Do**:
- Write documentation concurrently with code
- Be specific and concrete
- State prerequisites explicitly
- Maintain docs as first-class artifacts
- Keep examples current

## Integration with Other Capabilities

**Pairs Well With**:
- `repository-analysis` skill for context gathering
- `implementation-planning` skill for planning phase docs
- Version control for documentation versioning
- Documentation generators (JSDoc, Sphinx, etc.)

**Workflow Example**:
```
repository-analysis (gather context)
  ↓
implementation-planning (create plan)
  ↓
Implementation (code changes)
  ↓
technical-documentation (document changes) ← THIS SKILL
  ↓
Code review (include doc review)
```

## Success Criteria

Good technical documentation should:
- ✅ Be discoverable (easy to find)
- ✅ Be comprehensive (covers all key aspects)
- ✅ Be accurate (matches current implementation)
- ✅ Be maintainable (easy to update)
- ✅ Be accessible (appropriate for audience)
- ✅ Provide value (answers common questions)

---

**Skill Type**: Documentation and Communication  
**Complexity**: Medium  
**Typical Duration**: 15-60 minutes (varies by scope)  
**Prerequisites**: Understanding of what was implemented

**Cross-Platform**: Documentation methodology works across all platforms and tools.
