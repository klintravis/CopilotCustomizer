# QuickChange Workflow

Fast minimal-diff changes with a single approval gate and automated verification.

## Overview

The QuickChange workflow is optimized for small, targeted changes like typos, minor refactors, config tweaks, and documentation updates. It minimizes touched files and provides a streamlined approval process.

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  QuickChange Workflow                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Phase 1: Analysis (Auto)                                   │
│  └── Rapid scan of impacted files and dependencies          │
│                                                             │
│  Phase 2: Planning (Auto → Gate)                            │
│  ├── Minimal implementation plan                            │
│  └── Explicit file list → USER REVIEW                       │
│                                                             │
│  ────────── User types 'confirm' ──────────                 │
│                                                             │
│  Phase 3: Implementation (Auto)                             │
│  └── Apply atomic change within SCOPE only                  │
│                                                             │
│  Phase 4: Verification (Auto)                               │
│  └── Validate against acceptance criteria                   │
│                                                             │
│  Phase 5: Documentation (Auto)                              │
│  └── Generate concise change summary                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Usage Examples

### Simple typo fix
```
/QuickChange CHANGE_REQUEST: "Fix typo in README.md", REASON: "Incorrect spelling", SCOPE: "README.md"
```

### Config update
```
/QuickChange CHANGE_REQUEST: "Update version to 2.0", REASON: "Release prep", SCOPE: "package.json"
```

### Auto-detect scope
```
/QuickChange CHANGE_REQUEST: "Rename function foo to bar", REASON: "Better naming", SCOPE: "auto-detect"
```

## Key Files

| File | Purpose |
|------|---------|
| `dev/prompts/QuickChange.prompt.md` | Prompt entry point |
| `.github/agents/ChangeExecutor.agent.md` | File operations |
| `.github/agents/VerificationAgent.agent.md` | Validation |

## When to Use QuickChange vs Maintain

| Use Case | Recommended Workflow |
|----------|---------------------|
| Typos, minor refactors, config changes | QuickChange |
| Asset optimization and formatting | Maintain (mode: optimize) |
| Cross-reference binding | Maintain (mode: harmonize) |
| Asset validation/audit | Maintain (mode: validate) |
| Complete asset maintenance | Maintain (mode: all) |

---

*CopilotCustomizer Developer Documentation*
