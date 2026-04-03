---
name: execution-strategy
description: Multi-file change execution methodology with depth modes, atomic operations, cross-reference integrity, and rollback strategies. Use when implementing code changes across multiple files with safety guarantees.
---

# Execution Strategy

## Purpose
Portable methodology for executing code changes safely across multiple files. Provides depth-based risk assessment, atomic operation grouping, cross-reference maintenance, and rollback capability.

## When to Use This Skill
- Implementing approved change plans across multiple files
- Refactoring code that touches many interconnected files
- Making breaking changes that need rollback plans
- Any multi-file edit where ordering and atomicity matter

## Depth Modes

Select the appropriate execution mode based on change scope and risk:

### Quick-Edit (LOW RISK)
**When**: 1-3 files, <50 lines, no breaking changes
**Validation**: Syntax check only
**Process**: Apply edits → quick validate → done

Examples: Typo fixes, config value changes, version bumps, documentation updates.

### Standard (MEDIUM RISK — Default)
**When**: 4-10 files, <200 lines, non-breaking changes
**Validation**: Cross-reference checks + dependency analysis
**Process**:
1. Pre-flight validation (file access, backup state)
2. Group related changes for atomic execution
3. Execute change groups
4. Cross-reference integrity verification
5. Comprehensive summary

Examples: Feature additions with tests, API endpoint changes, function refactoring.

### Careful (HIGH RISK)
**When**: 10+ files, >200 lines, breaking changes, architectural shifts
**Validation**: Full dependency graph + comprehensive testing
**Process**:
1. Dependency graph analysis
2. Incremental execution with checkpoints
3. Per-file validation after each change
4. Cross-reference updates tracked separately
5. Rollback instructions generated
6. Manual verification checkpoint

Examples: Large-scale refactoring, API migrations, architectural restructuring.

## 5-Phase Execution Model

### Phase 1: Change Analysis
- Parse change specifications (files, descriptions, dependencies)
- Assess risk level → select depth mode
- Define atomicity grouping (which changes batch together)
- Set validation and rollback checkpoints

### Phase 2: Pre-Flight Validation
For each file in changeset:
- File exists and is writable (for modifications)
- No conflicting edits in progress
- Backup state captured (git status, file hashes)
For new files:
- Directory structure exists or can be created
- No naming conflicts
Dependency check:
- Required files present
- Import statements resolvable
- No circular dependencies introduced

### Phase 3: Atomic Execution
Group changes by atomicity requirements:
- **Atomic groups**: Related files that must all change together or none at all
- **Sequential groups**: Files that change in order with validation between each
- **Independent files**: Can be changed in any order

Execution rules:
- Preserve exact whitespace and formatting
- Match context precisely for replacements
- Track all modifications for rollback

### Phase 4: Cross-Reference Maintenance
After each atomic group:
- Scan for references to modified entities (renames, moves, API changes)
- Update affected files (tracked as secondary changes)
- Verify all references resolve — no broken imports or dangling refs

### Phase 5: Validation & Summary
- Syntax validation (language-specific)
- Cross-reference integrity check
- File count matches plan
- Generate execution report with:
  - Files changed (new/modified/deleted)
  - Lines changed (additions/deletions)
  - Cross-references updated
  - Warnings or issues
  - Rollback instructions (Careful mode)

## Execution Status Outcomes
- **SUCCESS**: All changes applied, validation passed
- **PARTIAL**: Some changes applied, issues noted — manual intervention needed
- **FAILED**: Changes rolled back, error details provided

## Rollback Strategy
- **Quick-Edit**: Git restore (trivial)
- **Standard**: Git diff reversal, checkpoint-based undo
- **Careful**: Full rollback instructions with per-phase undo steps, backup refs

## Success Metrics
- **Execution accuracy**: % of planned changes applied correctly
- **Cross-reference integrity**: Zero broken references after execution
- **Rollback readiness**: Rollback instructions generated for Standard+ modes
- **Atomicity**: All atomic groups either fully applied or fully reverted

## Best Practices
1. Always start with the smallest viable depth mode — escalate if needed
2. Group tightly coupled files in the same atomic group
3. Never modify files outside the approved change scope
4. Document every secondary change (cross-reference updates)
5. Prefer smaller, incremental changes over large batch operations
6. Validate after each phase, not just at the end
