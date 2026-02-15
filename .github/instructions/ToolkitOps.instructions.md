---
applyTo: '.github/agents/ToolkitEvolution.agent.md'
description: 'Reusable workflows for CopilotCustomizer toolkit-specific maintenance including release monitoring, documentation standards, and self-validation protocols'
---

## Toolkit Maintenance Patterns (v1.0)

Reusable maintenance workflows for the CopilotCustomizer toolkit. These patterns guide the ToolkitEvolution specialist subagent when performing self-improvement tasks on the framework itself.

**Scope**: CopilotCustomizer repository only. For patterns that apply to user repositories, see [Framework.instructions.md](Framework.instructions.md).

---

### 1. VS Code Release Monitoring

#### Documentation Sources

Primary URLs for VS Code Copilot release monitoring:

| Source | URL | Content |
|--------|-----|---------|
| Release notes | `https://code.visualstudio.com/updates/` | Monthly feature announcements |
| Customization overview | `https://code.visualstudio.com/docs/copilot/customization/overview` | High-level changes |
| Agent files | `https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes` | Agent schema updates |
| Instructions | `https://code.visualstudio.com/docs/copilot/customization/custom-instructions` | Instruction patterns |
| Prompts | `https://code.visualstudio.com/docs/copilot/customization/prompt-files` | Prompt enhancements |
| MCP servers | `https://code.visualstudio.com/docs/copilot/customization/mcp-servers` | MCP integration |
| Tool management | `https://code.visualstudio.com/docs/copilot/chat/chat-tools` | Tool ecosystem |
| GitHub vscode-docs | `https://github.com/microsoft/vscode-docs/commits/main/docs/copilot/` | Commit-level changes |

#### Feature Extraction Pattern

When monitoring releases:
1. Fetch release notes and documentation updates via `web/fetch`
2. Extract new/changed sections related to:
   - Agent file schema changes (YAML frontmatter fields)
   - New tool availability or deprecations
   - Handoff mechanism updates
   - Prompt file enhancements
   - Instruction file patterns
   - MCP server integration changes
   - Skills standard updates (agentskills.io)
3. Compare against CopilotCustomizer current implementation
4. Identify gaps or adaptation opportunities
5. Recommend toolkit updates with priority ranking

#### Version Alignment

Track schema versions against toolkit baseline:

| Component | Current Baseline | Source |
|-----------|-----------------|--------|
| Agent Files | v1.109 | VS Code Copilot custom agents docs |
| MCP Servers | v1.102+ | VS Code MCP server docs |
| Prompt Files | Latest | VS Code prompt files docs |
| Skills | agentskills.io | External open standard |

When a new version is detected:
- Document the version change and new fields/features
- Assess breaking vs. non-breaking impact
- Create migration plan if breaking changes found
- Update toolkit baseline version references

#### Recommendation Format

Present release monitoring findings as:

```markdown
## Release Monitoring Report — {date}

### New Features
| Feature | Impact | Toolkit Status | Action Required |
|---------|--------|----------------|-----------------|
| {feature} | HIGH/MED/LOW | Missing/Partial/Current | {specific update} |

### Schema Changes
| Change | Breaking? | Migration Required | Files Affected |
|--------|-----------|-------------------|----------------|
| {change} | Yes/No | {migration steps} | {file list} |

### Deprecations
| Deprecated | Replacement | Toolkit Usage | Action |
|-----------|-------------|---------------|--------|
| {item} | {replacement} | {where used} | {migration} |

### Toolkit Gaps
| Gap | Priority | Effort | Recommendation |
|-----|----------|--------|----------------|
| {gap} | P1/P2/P3 | Low/Med/High | {specific action} |
```

---

### 2. Documentation Quality Standards

#### Target Documents

| Document | Primary Audience | Key Quality Focus |
|----------|------------------|-------------------|
| `README.md` | New users, GitHub visitors | Clear value prop, quick start link, feature overview |
| `QUICKSTART.md` | First-time users | 5-minute success path, prerequisites, first command |
| `HOW-TO.md` | Regular users | Complete command reference, examples, troubleshooting |
| `EXAMPLES.md` | Evaluating users | Real-world scenarios demonstrating value |
| `AGENTS.md` (root) | AI coding agents | Architecture overview, navigation to dev docs |
| `dev/AGENTS.md` | Contributors | Full asset inventory, design patterns, conventions |
| `dev/README.md` | Maintainers | Dev tool usage, maintenance procedures |

#### Review Checklist

For each document, evaluate:

**Content Quality**:
- [ ] Accuracy: All commands, examples, and paths are correct and functional
- [ ] Completeness: All current features and workflows are documented
- [ ] Clarity: No unexplained jargon; concepts introduced before used
- [ ] Currency: References latest schema versions (v1.109+) and features

**Structure Quality**:
- [ ] Logical flow: Information progresses from simple to complex
- [ ] Scannable headings: Clear hierarchy enables quick navigation
- [ ] Examples: Real-world scenarios with expected inputs and outputs
- [ ] Cross-references: All internal links resolve correctly

**Consistency Quality**:
- [ ] Terminology: Same terms used for same concepts across all documents
- [ ] Formatting: Consistent use of code blocks, tables, lists
- [ ] Version references: All schema version mentions are aligned
- [ ] Command syntax: Slash command format consistent throughout

#### Gap Analysis Output

Present documentation review findings in this format:

```markdown
## Documentation Review Report

### Summary
| Document | Score | Issues | Priority Items |
|----------|-------|--------|---------------|
| {file} | {n}/10 | {count} | {top issues} |

### Findings by Priority

#### HIGH PRIORITY (fix immediately)
1. {finding} — {document} — {specific location}

#### MEDIUM PRIORITY (fix in next cycle)
1. {finding} — {document} — {specific location}

#### LOW PRIORITY (improve when convenient)
1. {finding} — {document} — {specific location}
```

---

### 3. Self-Audit Dimensions

#### Meta-Framework Compliance

The toolkit must follow its own generation standards:

| Standard | Applied To | Check |
|----------|-----------|-------|
| `AgentAuthoring.instructions.md` | All `.agent.md` files | YAML schema, role sections, tool selections |
| `GenerateInstructions.instructions.md` | All `.instructions.md` files | applyTo patterns, section structure |
| `GeneratePrompt.instructions.md` | All `.prompt.md` files | Variable blocks, workflow phases |
| `GenerateSkill.instructions.md` | All `SKILL.md` files | Skill schema, cross-platform sections |
| `GenerateAgentsFile.instructions.md` | `AGENTS.md` files | Architecture sections, navigation |
| `Framework.instructions.md` | All assets | Framework patterns, quality criteria |

#### Harmonization Checks

| Dimension | Criteria | How to Verify |
|-----------|----------|---------------|
| Cross-references | All agent files link to paired instructions | Search for "Reused Instructions" / "Framework References" sections |
| Prompt pairing | All prompts reference their instruction file | Check "Paired Instructions" lines in prompt files |
| Conductor registration | Orchestrators list subagents in `agents` YAML field | Parse YAML frontmatter of conductor agents |
| Processing metadata | All assets include standards version | Search for "Processing Metadata" sections |
| Terminology | Consistent naming across all assets | Compare key terms (subagent vs. sub-agent, etc.) |

#### Tool Ecosystem Audit

| Check | Criteria | Risk if Failed |
|-------|----------|----------------|
| Agent tool usage | Orchestrators use `agent` tool (not deprecated patterns) | Workflow failures |
| Tool-role alignment | Tool selections match agent archetypes | Excess permissions |
| Unnecessary tools | No tools granted without clear purpose | Security surface |
| Handoff integrity | All `handoffs` reference existing agents | Broken workflows |
| MCP trust | MCP configurations use appropriate trust levels | Security risk |

#### Schema Currency Audit

| Asset Type | Current Schema | Verify |
|------------|---------------|--------|
| Agent files | v1.109 | `description`, `model`, `tools`, `agents`, `handoffs`, `user-invokable` fields |
| Instructions | v1.109 | `applyTo`, `description` required fields |
| Prompts | Current | `description`, `agent`, `argument-hint` optional fields |
| Skills | agentskills.io | SKILL.md structure with cross-platform sections |

---

### 4. Performance Optimization Patterns

#### Asset Size Analysis

Monitor file sizes against recommended ranges:

| Asset Type | Target Range | Action if Exceeded |
|------------|-------------|-------------------|
| Agents | 300–600 lines | Extract shared patterns to instructions |
| Orchestrators | 400–800 lines | Acceptable; review for unnecessary examples |
| Instructions | 200–400 lines | Split into focused instruction files |
| Prompts | 100–200 lines | Simplify variable blocks, reduce examples |
| Skills | 400–800 lines | Acceptable; review cross-platform sections |

#### Redundancy Detection Patterns

Look for these common duplication patterns:

1. **Repeated workflow descriptions**: Same workflow pattern described in multiple agents
   - **Fix**: Extract to shared instruction file, reference via cross-references
2. **Duplicated schema guidance**: Schema validation rules repeated across agents
   - **Fix**: Centralize in `Framework.instructions.md` or new instruction
3. **Overlapping tool guidance**: Same tool usage patterns in multiple agents
   - **Fix**: Add to `AgentAuthoring.instructions.md` as reference section
4. **Repeated quality criteria**: Same checklists appearing in multiple files
   - **Fix**: Reference `CopilotAudit.instructions.md` instead of duplicating

#### Optimization Workflow

```
1. Inventory all assets and measure line counts
2. Identify files exceeding target ranges
3. Search for repeated patterns across files (grep for common phrases)
4. Propose extractions and consolidations
5. Estimate token savings per optimization
6. Present ranked recommendations (highest savings first)
7. On approval: execute via ChangeExecutor → verify via VerificationAgent
```

#### Quality Preservation Rules

During any optimization, maintain:
- Complete context required for agent functionality
- Sufficient examples for user clarity (minimum 2 per workflow)
- All quality criteria and validation checklists
- Cross-reference integrity (no broken links after refactoring)
- Backward compatibility (no breaking changes to existing workflows)

---

### 5. Feature Request Orchestration

#### Classification Matrix

| Feature Type | Risk Level | Approval | Workflow |
|-------------|-----------|----------|----------|
| Typo or formatting fix | Low | No | ChangeExecutor → VerificationAgent |
| Documentation update | Low | No | ChangeExecutor → VerificationAgent |
| New example or explanation | Low | No | ChangeExecutor → VerificationAgent |
| New instruction file | Medium | Yes | AssetPlanner → ChangeExecutor → VerificationAgent |
| New prompt file | Medium | Yes | AssetPlanner → ChangeExecutor → VerificationAgent |
| New skill | Medium | Yes | AssetPlanner → ChangeExecutor → VerificationAgent |
| New agent | High | Yes | AssetPlanner → ChangeExecutor → VerificationAgent |
| Orchestrator changes | High | Yes | AssetPlanner → ChangeExecutor → VerificationAgent |
| Schema version update | High | Yes | AssetPlanner → multi-file ChangeExecutor → VerificationAgent |

#### Impact Assessment

For medium/high risk features, evaluate:

```markdown
### Impact Assessment: {Feature Name}

**Files Created**: {list of new files}
**Files Modified**: {list of existing files to change}
**Files Unaffected**: {confirmation of files NOT changing}

**Integration Points**:
- Handoff chains affected: {list}
- Cross-references requiring updates: {list}
- Documentation updates needed: {list}

**Risk Factors**:
- Breaking changes: {yes/no + details}
- Regression potential: {low/medium/high}
- Rollback complexity: {simple/moderate/complex}

**Recommendation**: {proceed / proceed with caution / defer}
```

#### Implementation Workflow (Medium/High Risk)

```
1. Classify request (see matrix above)
2. Conduct impact assessment
3. Route to AssetPlanner for detailed specification
4. Present plan to user with risk assessment
5. Gate: Require explicit user approval
6. Route to ChangeExecutor for implementation
7. Route to VerificationAgent for validation
8. Update CHANGELOG.md with change entry
9. Update documentation if needed
10. Present completion summary
```

---

### 6. Changelog Maintenance

#### Entry Format

When changes are made to the toolkit, generate changelog entries:

```markdown
### [{version}] — {YYYY-MM-DD}

#### Added
- {new feature or asset description}

#### Changed
- {modification description with before/after context}

#### Fixed
- {bug fix or correction description}

#### Removed
- {deprecated item removal description}
```

#### Version Numbering

| Change Type | Version Bump | Example |
|-------------|-------------|---------|
| Bug fix, typo correction | Patch (x.x.+1) | 1.2.3 → 1.2.4 |
| New asset, feature addition | Minor (x.+1.0) | 1.2.3 → 1.3.0 |
| Breaking change, major refactor | Major (+1.0.0) | 1.2.3 → 2.0.0 |

---

## Cross-References

**Paired Agent**: [Evolve.agent.md](../agents/Evolve.agent.md)
**Framework Standards**: [Framework.instructions.md](Framework.instructions.md)
**Security Guardrails**: [Security.instructions.md](Security.instructions.md)

## Change History

| Version | Date | Changes |
|---------|------|---------||
| v1.0 | 2026-01-15 | Initial release |

---

## Processing Metadata

- **Standards Version**: VS Code Copilot v2025.11 (Agent Files v1.109)
- **ApplyTo**: `.github/agents/ToolkitEvolution.agent.md`
- **Purpose**: Toolkit-specific maintenance patterns for self-improvement orchestrator
- **Scope**: CopilotCustomizer repository only

*Generated following CopilotCustomizer instruction generation standards*
