```markdown
# Change Log Template (Universal)

**Purpose**: Standardized change documentation for releases, pull requests, migrations, and feature updates. Provides clear, structured communication of modifications across any project type (release notes, PR descriptions, migration guides, feature announcements, etc.).

## Summary (≤3 bullets)
- What changed (features, fixes, improvements, breaking changes)
- Why the change was made (motivation, problem solved)
- Impact on users or systems (who is affected, how)

## Change Metadata

**Version**: [e.g., v2.1.0, Sprint 23, Release 2025-11]  
**Date**: [YYYY-MM-DD]  
**Type**: [Feature | Fix | Enhancement | Breaking | Security | Performance | Documentation | Refactor]  
**Scope**: [Components, modules, or systems affected]  
**Author(s)**: [Name(s) or team]  
**Reviewers**: [Name(s) if applicable]

## Detailed Changes

### Added ✨
**New features or capabilities introduced**

- **[Feature Name]**: [Description of what was added]
  - **Use Case**: [Why users need this]
  - **Documentation**: [Link to docs or usage guide]
  - **Example**: [Code snippet or screenshot if applicable]

- **[Another Addition]**: [Description]
  - [Supporting details]

### Changed 🔄
**Modifications to existing functionality**

- **[Feature/Component]**: [What changed and how it differs from before]
  - **Before**: [Previous behavior]
  - **After**: [New behavior]
  - **Migration**: [Steps users need to take, if any]

- **[Another Change]**: [Description]
  - [Supporting details]

### Fixed 🐛
**Bug fixes and issue resolutions**

- **[Issue #123]**: [Description of bug and fix]
  - **Impact**: [Who was affected]
  - **Root Cause**: [Why the bug occurred]
  - **Verification**: [How to confirm fix works]

- **[Another Fix]**: [Description]
  - [Supporting details]

### Deprecated ⚠️
**Features marked for future removal**

- **[Feature/API]**: [What is deprecated]
  - **Deprecation Timeline**: [When it will be removed]
  - **Alternative**: [What to use instead]
  - **Migration Guide**: [Steps to migrate away]

### Removed ❌
**Features or functionality completely removed**

- **[Feature/Component]**: [What was removed and why]
  - **Last Available In**: [Version where it was still present]
  - **Replacement**: [Alternative solution or workaround]
  - **Impact**: [Who is affected and how]

### Security 🔒
**Security-related changes and patches**

- **[CVE-YYYY-XXXXX]**: [Security issue addressed]
  - **Severity**: [Critical | High | Medium | Low]
  - **Affected Versions**: [Version range with vulnerability]
  - **Fixed In**: [Version with patch]
  - **Action Required**: [Steps users must take]

- **[Security Enhancement]**: [Proactive security improvement]
  - [Description and benefit]

### Performance ⚡
**Performance improvements and optimizations**

- **[Component/Operation]**: [What was optimized]
  - **Before**: [Previous performance metrics]
  - **After**: [New performance metrics]
  - **Impact**: [User-facing improvements]

### Documentation 📚
**Documentation updates and improvements**

- **[Doc Section]**: [What documentation was updated]
- **[New Guide]**: [New documentation added]
- **[Clarification]**: [Improved explanations]

## Breaking Changes 🚨

### Breaking Change 1: [Title]
**Affected Components**: [What parts of the system are affected]  
**Impact Assessment**: [Who is affected and severity]

**Old Behavior**:
```
[Code or configuration example showing previous approach]
```

**New Behavior**:
```
[Code or configuration example showing new approach]
```

**Migration Steps**:
1. [Specific step to migrate]
2. [Validation approach]
3. [Rollback plan if needed]

**Timeline**: [Deadline or deprecation schedule]  
**Support**: [Where to get help with migration]

---

### Breaking Change 2: [Title]
[Follow same structure as Breaking Change 1]

## Migration Guide

### Prerequisites
- **Current Version**: [Version users should be on before upgrading]
- **Backup Required**: [Yes/No - and what to backup]
- **Downtime**: [Expected downtime if any]
- **Dependencies**: [Required updates to dependencies or infrastructure]

### Step-by-Step Migration

**1. Preparation**
- [ ] Backup current system/database/configuration
- [ ] Review breaking changes section
- [ ] Test in non-production environment
- [ ] Communicate maintenance window to stakeholders

**2. Update Process**
```bash
# Example commands or steps
[Specific upgrade commands]
```

**3. Configuration Changes**
```yaml
# Before
old_config: value

# After
new_config: value
```

**4. Verification**
- [ ] Run test suite to confirm functionality
- [ ] Validate critical user workflows
- [ ] Check monitoring and logs for errors
- [ ] Confirm performance within acceptable ranges

**5. Rollback Plan** (if needed)
```bash
# Rollback commands or steps
[Specific rollback procedure]
```

### Common Issues & Solutions
| Issue | Cause | Solution |
|-------|-------|----------|
| [Problem description] | [Root cause] | [Fix or workaround] |
| [Another issue] | [Cause] | [Resolution] |

## Testing & Validation

### Test Coverage
- **Unit Tests**: [Coverage percentage, new tests added]
- **Integration Tests**: [Key scenarios covered]
- **E2E Tests**: [User workflows validated]
- **Performance Tests**: [Benchmarks met]

### Validation Steps
- [ ] All existing tests passing
- [ ] New functionality tested in isolation
- [ ] Integration points validated
- [ ] Performance benchmarks met or exceeded
- [ ] Security scan completed (if applicable)
- [ ] Documentation reviewed and updated

### Known Issues
- **[Issue Description]**: [Workaround or expected fix timeline]
- **[Limitation]**: [Explanation and any mitigation]

## Dependencies & Requirements

### Updated Dependencies
| Package | Old Version | New Version | Reason |
|---------|------------|-------------|--------|
| [package-name] | [v1.0.0] | [v2.0.0] | [Security patch / New features] |

### System Requirements
- **Runtime**: [Node.js 18+, Python 3.9+, etc.]
- **Database**: [PostgreSQL 14+, MongoDB 5+, etc.]
- **Infrastructure**: [Memory, disk, network requirements]

### Compatibility
- **Backward Compatible**: [Yes/No]
- **Forward Compatible**: [Yes/No]
- **Supported Versions**: [Version range that works with this change]

## Impact Assessment

### User Impact
**End Users**:
- [How this change affects user experience]
- [Any action required from users]
- [Benefits users will see]

**Developers**:
- [API changes affecting development]
- [New capabilities available]
- [Development workflow changes]

**Operations**:
- [Deployment changes]
- [Monitoring or alerting updates]
- [Infrastructure requirements]

### Risk Analysis
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Potential issue] | High/Med/Low | High/Med/Low | [Prevention strategy] |
| [Another risk] | High/Med/Low | High/Med/Low | [Mitigation plan] |

## References & Links

### Related Work
- **Pull Request**: [#123 - Link to PR]
- **Issues Fixed**: [#456, #789 - Links to issues]
- **Related Changes**: [Links to related PRs or commits]

### Documentation
- **User Guide**: [Link to updated documentation]
- **API Reference**: [Link to API docs]
- **Migration Guide**: [Link to detailed migration docs]
- **Video/Tutorial**: [Link to walkthrough if available]

### Communication
- **Announcement**: [Link to blog post or announcement]
- **Discussion**: [Link to discussion forum or RFC]
- **Support**: [Where to get help or report issues]

## Quality Checklist
- [ ] Change summary is clear and concise
- [ ] All change types documented (Added/Changed/Fixed/etc.)
- [ ] Breaking changes clearly identified with migration steps
- [ ] Security changes include severity and action required
- [ ] Dependencies updated and compatibility documented
- [ ] Testing and validation steps completed
- [ ] Impact assessment covers all stakeholders
- [ ] References and links are functional
- [ ] Follows semantic versioning (if applicable)
- [ ] Change log follows consistent format and style

---

### Generation Notes
**Optimized for**: Universal change documentation across all project types  
**Date**: 2025-11-01  
**Standards**: Semantic Versioning 2.0.0, Keep a Changelog conventions  
**Process**: Template creation following CopilotCustomizer framework standards and DocumentationGenerator patterns
```
