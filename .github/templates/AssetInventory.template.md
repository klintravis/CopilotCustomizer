```markdown
# Asset Inventory Template (Universal)

**Purpose**: Comprehensive catalog and assessment of project assets for audits, compliance, asset management, and ecosystem analysis. Supports GitHub Copilot customization assets, code repositories, infrastructure, and any project artifacts requiring systematic tracking.

## Summary (≤3 bullets)
- What is being inventoried (asset types, scope)
- Current state assessment (completeness, quality, compliance)
- Key findings or recommended actions

## Context (≤2 bullets)
- Purpose of inventory (audit, migration, compliance, optimization)
- Scope boundaries and exclusions

## Inventory Metadata

**Date**: [YYYY-MM-DD]  
**Inventory Type**: [Copilot Assets | Full Repository | Infrastructure | Documentation | All]  
**Scope**: [Project/repository/system being inventoried]  
**Owner**: [Team or individual responsible]  
**Purpose**: [Audit | Compliance | Migration | Optimization | Assessment]

## Asset Categories

### GitHub Copilot Customization Assets

#### Agent Files (*.agent.md)
**Total Count**: [X]  
**Location**: [.github/agents/]

| File | Description | Tools | Handoffs | Status | Issues |
|------|-------------|-------|----------|--------|--------|
| [AgentName.agent.md] | [Purpose] | [List] | [Yes/No] | ✅ Active / ⚠️ Needs Update / ❌ Broken | [Gap description] |

**Quality Assessment**:
- [ ] All agents have required `description` field
- [ ] Tool configurations are valid
- [ ] Handoff chains are functional
- [ ] Follows current schema version
- [ ] Cross-references are intact

**Gaps & Recommendations**:
- [Missing agent types needed]
- [Schema compliance issues]
- [Optimization opportunities]

#### Instruction Files (*.instructions.md)
**Total Count**: [X]  
**Location**: [.github/instructions/]

| File | ApplyTo | Description | Paired Assets | Status | Issues |
|------|---------|-------------|---------------|--------|--------|
| [InstructionName.instructions.md] | [Pattern] | [Purpose] | [Related files] | ✅ Active / ⚠️ Needs Update / ❌ Broken | [Gap description] |

**Quality Assessment**:
- [ ] All instructions have required `applyTo` field
- [ ] ApplyTo patterns are appropriately scoped
- [ ] Follows current schema version
- [ ] Cross-references are intact
- [ ] No conflicting guidance

**Gaps & Recommendations**:
- [Missing instruction coverage]
- [Schema compliance issues]
- [Optimization opportunities]

#### Prompt Files (*.prompt.md)
**Total Count**: [X]  
**Location**: [.github/prompts/]

| File | Mode | Agent Binding | Variables | Status | Issues |
|------|------|---------------|-----------|--------|--------|
| [PromptName.prompt.md] | [ask/agent/generate] | [Agent file] | [Count] | ✅ Active / ⚠️ Needs Update / ❌ Broken | [Gap description] |

**Quality Assessment**:
- [ ] Mode fields correctly specified
- [ ] Variable blocks well-defined
- [ ] Paired instructions referenced
- [ ] Usage instructions clear
- [ ] Follows current schema version

**Gaps & Recommendations**:
- [Missing prompt types]
- [Variable improvements needed]
- [Integration opportunities]

#### Workspace Files (AGENTS.md, *.agent.md)
**Total Count**: [X]  
**Location**: [Root or .github/]

| File | Purpose | Sections Complete | Status | Issues |
|------|---------|-------------------|--------|--------|
| AGENTS.md | [Project guidance] | [X/10] | ✅ Current / ⚠️ Outdated / ❌ Missing | [Gap description] |

**Quality Assessment**:
- [ ] Quick start instructions present
- [ ] Code style guidelines documented
- [ ] Testing instructions complete
- [ ] PR guidelines specified
- [ ] Conflict resolution defined

**Gaps & Recommendations**:
- [Missing sections]
- [Outdated information]
- [Enhancement opportunities]

#### Template Files (*.template.md)
**Total Count**: [X]  
**Location**: [.github/templates/]

| File | Purpose | Use Cases | Status | Issues |
|------|---------|-----------|--------|--------|
| [TemplateName.template.md] | [Purpose] | [Workflows] | ✅ Active / ⚠️ Needs Update | [Gap description] |

**Quality Assessment**:
- [ ] Templates follow consistent structure
- [ ] Clear purpose and usage instructions
- [ ] Quality checklists included
- [ ] Universal applicability

**Gaps & Recommendations**:
- [Missing template types]
- [Enhancement opportunities]

### Cross-Reference Matrix

**Asset Relationships**:
| Instruction | Paired Prompt | Bound Agent | Status |
|-------------|---------------|-------------|--------|
| [Instructions file] | [Prompt file] | [Agent file] | ✅ Linked / ❌ Broken |

**Broken References**:
- [File A] → [File B] (missing)
- [File C] → [File D] (outdated)

**Orphaned Assets**:
- [Assets with no references to/from other files]

### Code Assets (if applicable)

#### Source Files
**Total Count**: [X]  
**Languages**: [List]

| Category | Count | Coverage | Quality | Issues |
|----------|-------|----------|---------|--------|
| Core Logic | [X files] | [X% tests] | [Score] | [Gap list] |
| API/Routes | [X files] | [X% tests] | [Score] | [Gap list] |
| Utilities | [X files] | [X% tests] | [Score] | [Gap list] |
| Tests | [X files] | N/A | [Score] | [Gap list] |

#### Dependencies
**Total Count**: [X direct, Y transitive]

| Package | Version | Latest | Vulnerabilities | Status |
|---------|---------|--------|-----------------|--------|
| [package-name] | [current] | [latest] | [CVE count] | ✅ Current / ⚠️ Update Available / ❌ Critical |

**Dependency Risks**:
- [Outdated packages with security issues]
- [Unmaintained dependencies]
- [License compliance concerns]

### Documentation Assets (if applicable)

#### Documentation Files
**Total Count**: [X]  
**Types**: [README, HOW-TO, API Docs, etc.]

| File | Purpose | Last Updated | Status | Issues |
|------|---------|-------------|--------|--------|
| [README.md] | [Purpose] | [YYYY-MM-DD] | ✅ Current / ⚠️ Outdated | [Gap description] |
| [HOW-TO.md] | [Purpose] | [YYYY-MM-DD] | ✅ Current / ⚠️ Outdated | [Gap description] |

**Documentation Quality**:
- [ ] All major features documented
- [ ] Setup instructions clear and current
- [ ] API reference complete
- [ ] Examples functional
- [ ] Change log maintained

**Gaps & Recommendations**:
- [Missing documentation]
- [Outdated sections]
- [Enhancement opportunities]

### Infrastructure Assets (if applicable)

#### Configuration Files
**Total Count**: [X]

| File | Purpose | Validated | Status | Issues |
|------|---------|-----------|--------|--------|
| [.github/workflows/*.yml] | [CI/CD] | [Yes/No] | ✅ Active / ⚠️ Needs Review | [Issues] |
| [docker-compose.yml] | [Local dev] | [Yes/No] | ✅ Active / ⚠️ Needs Review | [Issues] |

## Schema Compliance Assessment

### VS Code Copilot Schema (v1.105+)
**Compliance Level**: [X%]

| Requirement | Status | Details |
|-------------|--------|---------|
| Agent `description` field | ✅ / ⚠️ / ❌ | [X/Y files compliant] |
| Instruction `applyTo` field | ✅ / ⚠️ / ❌ | [X/Y files compliant] |
| YAML front matter valid | ✅ / ⚠️ / ❌ | [X/Y files valid] |
| Cross-references functional | ✅ / ⚠️ / ❌ | [X/Y references working] |
| Tool configurations valid | ✅ / ⚠️ / ❌ | [X/Y configs valid] |
| Handoff chains functional | ✅ / ⚠️ / ❌ | [X/Y chains working] |

**Schema Violations**:
- [File]: [Issue description]
- [File]: [Issue description]

**Recommended Updates**:
1. [Schema migration needed]
2. [Field additions required]
3. [Deprecation handling]

## Harmonization Assessment

### Asset Ecosystem Health
**Harmonization Level**: [X%]

**Strengths**:
- [Well-integrated asset groups]
- [Strong cross-reference patterns]
- [Consistent terminology]

**Weaknesses**:
- [Isolated assets without integration]
- [Inconsistent naming conventions]
- [Missing bidirectional references]

**Improvement Opportunities**:
1. [Bind isolated prompts to agents]
2. [Establish missing instruction pairs]
3. [Standardize metadata across assets]

## Risk Assessment

### Critical Risks
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| [Schema non-compliance] | High | Medium | [Update to current schema] |
| [Broken cross-references] | Medium | High | [Validation and repair] |
| [Outdated dependencies] | High | Medium | [Dependency updates] |
| [Security vulnerabilities] | Critical | Low | [Immediate patching] |

### Quality Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| [Incomplete documentation] | Medium | [Documentation sprint] |
| [Low test coverage] | High | [Test expansion plan] |
| [Orphaned assets] | Low | [Cleanup or integration] |

## Metrics & Statistics

### Asset Distribution
- **Total Assets**: [X]
- **By Type**: [Agents: X, Instructions: Y, Prompts: Z, Templates: W, Docs: V]
- **By Status**: [Active: X, Needs Update: Y, Broken: Z]

### Quality Metrics
- **Schema Compliance**: [X%]
- **Cross-Reference Integrity**: [X%]
- **Documentation Coverage**: [X%]
- **Test Coverage**: [X%]
- **Dependency Health**: [X% current]

### Complexity Metrics
- **Average Asset Size**: [X lines]
- **Cross-Reference Density**: [X references per asset]
- **Dependency Count**: [X direct, Y transitive]

## Recommendations & Action Items

### Immediate Actions (P0 - 0-7 days)
1. **[Critical Fix]**: [Specific action, owner]
2. **[Security Patch]**: [Specific action, owner]
3. **[Broken Reference Repair]**: [Specific action, owner]

### Short-term Actions (P1 - 1-4 weeks)
1. **[Schema Migration]**: [Action, owner]
2. **[Documentation Update]**: [Action, owner]
3. **[Asset Integration]**: [Action, owner]

### Long-term Actions (P2 - 1-3 months)
1. **[Ecosystem Enhancement]**: [Action, owner]
2. **[Automation Implementation]**: [Action, owner]
3. **[Quality Program]**: [Action, owner]

### Ongoing Maintenance
- Regular asset audits (frequency: [monthly/quarterly])
- Automated schema validation in CI/CD
- Dependency update schedule
- Documentation review cycles

## Quality Checklist
- [ ] All asset types inventoried within scope
- [ ] Counts and statistics accurate
- [ ] Quality assessments completed for each category
- [ ] Schema compliance evaluated
- [ ] Cross-references validated
- [ ] Risks identified with mitigation strategies
- [ ] Recommendations prioritized with owners
- [ ] Metrics calculated and documented
- [ ] Action items are specific and actionable
- [ ] Inventory date and scope clearly documented

---

### Generation Notes
**Optimized for**: Universal asset inventory across Copilot customizations and project artifacts  
**Date**: 2025-11-01  
**Standards**: VS Code Copilot Schema v1.105+  
**Process**: Template creation following CopilotCustomizer framework standards and CopilotAudit.instructions.md patterns
```
