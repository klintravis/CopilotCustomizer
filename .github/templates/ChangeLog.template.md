```markdown
# Change Log Template

**Purpose**: Standardized change documentation for releases, pull requests, and feature updates.

## Summary (≤3 bullets)
- What changed (features, fixes, improvements, breaking changes)
- Why the change was made (motivation, problem solved)
- Impact on users or systems

## Change Metadata

**Version**: [e.g., v2.1.0]  
**Date**: [YYYY-MM-DD]  
**Type**: [Feature | Fix | Enhancement | Breaking | Security | Performance | Documentation]  
**Scope**: [Components or systems affected]  
**Author(s)**: [Name(s) or team]

## Detailed Changes

### Added ✨
<!-- New features or capabilities -->
- **[Feature Name]**: [Description and use case]

### Changed 🔄
<!-- Modifications to existing functionality -->
- **[Feature/Component]**: [What changed, before/after behavior, migration steps if needed]

### Fixed 🐛
<!-- Bug fixes and issue resolutions -->
- **[Issue #123]**: [Description of bug and fix]

### Deprecated ⚠️
<!-- Features marked for future removal -->
- **[Feature/API]**: [What is deprecated, timeline, alternative]

### Removed ❌
<!-- Features completely removed -->
- **[Feature/Component]**: [What was removed, replacement]

### Security 🔒
<!-- Security patches and improvements -->
- **[CVE-YYYY-XXXXX]**: [Issue, severity, affected versions, action required]

### Performance ⚡
<!-- Performance improvements -->
- **[Component]**: [What was optimized, metrics before/after]

### Documentation 📚
<!-- Documentation updates -->
- **[Doc Section]**: [What was updated or added]

## Breaking Changes 🚨

### [Breaking Change Title]
**Impact**: [Who is affected and how]

**Migration**:
1. [Step to migrate]
2. [Validation approach]

**Support**: [Where to get help]

## Migration Guide
<!-- For major version changes or complex migrations -->

### Prerequisites
- **Current Version**: [Required starting version]
- **Backup**: [What to backup]
- **Dependencies**: [Required updates]

### Steps
1. **Preparation**: [Backup, review changes, test]
2. **Update**: [Commands or procedures]
3. **Verification**: [Tests to run]
4. **Rollback** (if needed): [Rollback procedure]

## Testing & Validation

- **Test Coverage**: [Unit/Integration/E2E coverage and results]
- **Known Issues**: [Any limitations or workarounds]

## Dependencies

| Package | Old Version | New Version | Reason |
|---------|------------|-------------|--------|
| [package-name] | [v1.0.0] | [v2.0.0] | [Why updated] |

### Compatibility
- **Backward Compatible**: [Yes/No]
- **Supported Versions**: [Version compatibility range]

## Impact Assessment

**End Users**: [User experience changes, actions required, benefits]  
**Developers**: [API changes, new capabilities, workflow changes]  
**Operations**: [Deployment changes, infrastructure requirements]

## References

- **Pull Request**: [#123]
- **Issues Fixed**: [#456, #789]
- **Documentation**: [Links to updated docs]
- **Support**: [Where to get help]

## Checklist
- [ ] Summary clear and concise
- [ ] All change types documented
- [ ] Breaking changes identified with migration steps
- [ ] Dependencies and compatibility documented
- [ ] Testing completed
- [ ] References functional
```
