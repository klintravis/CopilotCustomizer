---
applyTo: '.github/agents/Evolve.agent.md'
description: 'Reusable workflows for CopilotCustomizer toolkit-specific maintenance including release monitoring, documentation standards, and self-validation protocols'
---

## Toolkit Maintenance Patterns (v1.0)

Reusable maintenance workflows for the CopilotCustomizer toolkit. These patterns guide the Evolve specialist subagent when performing self-improvement tasks on the framework itself.

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
| `docs/ARCHITECTURE.md` | Contributors & maintainers | Full asset inventory, architecture, design patterns |
| `docs/CHANGELOG.md` | All users | Release history, breaking changes, migration guides |

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
| `InstructionAuthoring.instructions.md` | All `.instructions.md` files | applyTo patterns, section structure |
| `PromptAuthoring.instructions.md` | All `.prompt.md` files | Variable blocks, workflow phases |
| `SkillAuthoring.instructions.md` | All `SKILL.md` files | Skill schema, cross-platform sections |
| `AgentsFile.instructions.md` | `AGENTS.md` files | Architecture sections, navigation |
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
   - **Fix**: Reference `Framework.instructions.md` Audit Framework section instead of duplicating

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
3. Route to Planner for detailed specification
4. Present plan to user with risk assessment
5. Gate: Require explicit user approval
6. Route to Editor for implementation
7. Route to Verifier for validation
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

### 7. Plan Tracking & Persistence

#### Plan Storage Convention

All Evolve improvement plans are saved to `docs/plans/` (gitignored by default):

**Naming Pattern**:
- Feature implementations: `Toolkit-{Feature-Name}.md`
- Release alignment: `Toolkit-VSCode-v{version}-Alignment.md`
- Ad-hoc improvements: `Toolkit-{Task-Type}-{YYYYMMDD}.md`

#### Plan Structure

```markdown
# Evolve Plan: {Title}

**Plan ID**: {kebab-case-id}
**Date**: {YYYY-MM-DD}
**Task**: {task type from Evolve.prompt.md}
**Scope**: {scope from Evolve.prompt.md}
**Depth**: {depth from Evolve.prompt.md}
**Status**: {PENDING APPROVAL | IN PROGRESS | COMPLETED | ARCHIVED}

---

## Context
{Why this plan exists}

## Findings
{Analysis results}

## Execution Plan
{Phased implementation steps}

## Risk Assessment
{Impact analysis}
```

#### Status Lifecycle

| Status | Meaning | Next Action |
|--------|---------|-------------|
| PENDING APPROVAL | Plan generated, awaiting user approval | User reviews → approves/rejects |
| IN PROGRESS | Implementation underway | Editor executing changes |
| COMPLETED | All phases executed and verified | Update plan status, summarize results |
| ARCHIVED | Historical reference only | No action — preserved for audit trail |

#### Plan Benefits

- **Audit Trail**: Track all toolkit improvements over time
- **Resumability**: Pick up multi-phase improvements after interruptions
- **Transparency**: Users see what changes are planned before execution
- **Quality Gate**: Formal approval process for medium/high-risk changes
- **Documentation**: Self-documenting improvement history

#### Integration with Changelog

When a plan status moves to COMPLETED:
1. Extract key changes from plan execution
2. Generate changelog entry per Section 6 format
3. Add entry to `docs/CHANGELOG.md`
4. Update plan with completion date and changelog reference

---

### 8. Hook Configuration Maintenance

#### Hook File Locations

| Location | Purpose | Contents |
|----------|---------|----------|
| `.github/hooks/*.json` | Hook configurations | Lifecycle event definitions, commands, timeouts |
| `.github/scripts/` | Hook implementations | Shell scripts or Node.js scripts invoked by hooks |
| `.github/logs/` | Hook output | Orchestration logs, metrics files (gitignored) |

#### Validation Checklist

When auditing hook configurations:

- [ ] **JSON Well-Formed**: All `.github/hooks/*.json` files parse without errors
- [ ] **Commands Executable**: Every hook `command` field references an existing script
- [ ] **Scripts Exist**: All referenced scripts in `.github/scripts/` are present and executable
- [ ] **Timeouts Within Bounds**: All timeout values ≤10s (hooks block agent pipeline)
- [ ] **Lifecycle Coverage**: 8 lifecycle events configured: SessionStart, UserPromptSubmit, SubagentStart, SubagentStop, PreToolUse, PostToolUse, PreCompact, Stop
- [ ] **Stdin JSON Fields**: Scripts correctly read VS Code stdin JSON fields (snake_case convention):
  - Common (all events): `timestamp`, `cwd`, `sessionId`, `hookEventName`, `transcript_path`
  - SessionStart: `source`
  - UserPromptSubmit: `prompt`
  - PreToolUse: `tool_name`, `tool_input`, `tool_use_id`
  - PostToolUse: `tool_name`, `tool_input`, `tool_use_id`, `tool_response`
  - SubagentStart: `agent_id`, `agent_type`
  - SubagentStop: `agent_id`, `agent_type`, `stop_hook_active`
  - PreCompact: `trigger`
  - Stop: `stop_hook_active`
- [ ] **Session State**: Scripts maintain `session-state.json` to track active subagent stack (VS Code does not include agent identity in PreToolUse/PostToolUse stdin)

#### Health Check Workflow

```
1. Parse hook JSON files
   - Validate JSON syntax
   - Extract command paths and timeout values

2. Verify script paths
   - Check each command references existing file
   - Verify scripts have execute permissions (Unix)

3. Test hook execution (optional dry-run)
   - Run script with test event: node .github/scripts/{script}.js TestEvent
   - Confirm log output appears in expected location
   - Validate no errors in execution

4. Generate health report
   - List all hooks and their status (valid/invalid)
   - Flag missing scripts or malformed commands
   - Report timeout values exceeding recommended limits
```

#### Hook Invocation Verification

**How Hooks Are Invoked**: VS Code automatically discovers hook configurations from `.github/hooks/*.json` and invokes them when lifecycle events occur. No manual triggering or agent calls required — hooks fire deterministically whenever their lifecycle event happens.

**Discovery Requirements**:
1. Hook JSON files must be in `.github/hooks/` directory
2. VS Code workspace must have `.vscode/settings.json` with chat customization enabled
3. Hook commands must reference existing, executable scripts

**Verification Workflow** (run after any orchestrated session):

```bash
# 1. Check session logs exist (confirms hooks fired)
ls -la .github/logs/sessions/          # List session directories
ls -la .github/logs/current-session.txt # Current session marker

# 2. Verify log content (should show session events with real names, not "Unknown")
cat .github/logs/sessions/$(cat .github/logs/current-session.txt)/orchestration.log | tail -20

# 3. Check metrics (should show subagent invocations)
cat .github/logs/sessions/$(cat .github/logs/current-session.txt)/metrics.json

# 4. Test hook script directly (pipe mock stdin JSON)
echo '{"sessionId":"test-123","source":"new"}' | node .github/scripts/log-orchestration.js SessionStart
echo '{"tool_name":"readFile","tool_use_id":"t-1"}' | node .github/scripts/log-orchestration.js PreToolUse
echo '{"agent_type":"Editor","agent_id":"sub-1"}' | node .github/scripts/log-orchestration.js SubagentStart
# Should log real names (not "Unknown" or "unknown")
```

**Troubleshooting Hook Invocation**:

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| No logs generated after agent runs | VS Code not discovering hooks | Add `.vscode/settings.json` with `chat.customAgentInSubagent.enabled: true` |
| Logs empty or incomplete | Hook script errors | Run script manually with test event, check for errors |
| Only some events logging | Hook JSON missing lifecycle events | Verify all 8 events defined in hook config |
| Hooks not firing for subagents | Subagent invocation not via `agent` tool | Verify conductors use `agent` tool (not deprecated patterns) |

#### Maintenance Triggers

Re-validate hook configurations when:

1. **Subagent Registry Changes**: Adding/removing subagents may require hook script updates (e.g., `SUBAGENT_REGISTRY` array in `log-orchestration.js`)
2. **Schema Version Updates**: New VS Code releases may introduce hook lifecycle events or change stdin JSON fields
3. **Orchestration Pattern Changes**: Changes to workflow types or phase tracking may need hook logging adjustments
4. **Script Modifications**: After editing any `.github/scripts/` file, re-run health check
5. **No Logs After Session**: If hooks stop firing, verify `.vscode/settings.json` exists and VS Code has reloaded customizations

#### Hook Configuration Standards

**Timeout Guidelines**:
- Logging hooks: 3-5s (SessionStart, UserPromptSubmit, SubagentStart, SubagentStop, PreToolUse, PostToolUse, PreCompact)
- Summary hooks: 5-10s (Stop event with metrics aggregation)
- Never exceed 30s (VS Code default timeout; keep ≤10s for logging hooks)

**Command Patterns**:
- Prefer Node.js scripts for cross-platform compatibility: `node .github/scripts/{name}.js {args}`
- Use shell scripts only when necessary: `bash .github/scripts/{name}.sh {args}` (Unix-only)
- Pass event name as first argument for routing within script

**Error Handling**:
- Hooks should fail gracefully (exit 0 even on non-critical errors)
- Log errors to hook output files, don't block agent execution
- Use timeouts to prevent hung hooks from blocking workflows

---
## Change History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-01-15 | Initial release |

---

## Processing Metadata

- **Standards Version**: VS Code Copilot v2025.11 (Agent Files v1.109)
- **ApplyTo**: `.github/agents/Evolve.agent.md`
- **Purpose**: Toolkit-specific maintenance patterns for self-improvement orchestrator
- **Scope**: CopilotCustomizer repository only

*Generated following CopilotCustomizer instruction generation standards*
