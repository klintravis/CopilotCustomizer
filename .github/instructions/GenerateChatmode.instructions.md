## Ultimate Chat Mode Authoring Guide (Harmony v1.0)

Binding Guidance:
- Default usage with: `chatmodes/CopilotCustomizer.chatmode.md`
- Ensure personas reference related prompts/instructions by purpose where relevant to reduce duplication.

### Purpose
Provide a standardized framework for crafting powerful, maintainable `*.chatmode.md` personas for GitHub Copilot Chat in VS Code, supporting diverse project workflows (planning, refactoring, security review, data engineering, ML, infra). Ensures consistency with instructions & prompt artifacts.

### Design Tenets
1. Narrow, outcome-focused role.
2. Explicit workflow loop (clarify -> confirm -> act -> refine).
3. Depth adaptability (quick vs standard vs deep) when complexity varies.
4. Guardrails for ambiguity, scope creep, compliance, hallucination risk.
5. DRY interaction model (no duplication of universal rules—reference shared docs where possible).
6. Versioned schema & auditable change log.

### Required Front Matter Keys
| Key | Required | Description |
|-----|----------|-------------|
| description | Yes | Short persona summary |
| schemaVersion | Yes | Version for compatibility tracking |
| depthModes | Optional | Supported depth variants (array) |
| refinementCommands | Optional | Supported refinement triggers |
| tools | Optional | Explicit tools available (empty array if none) |

### Core Sections (Recommended Order)
| # | Section | Purpose | Notes |
|---|---------|---------|-------|
| 1 | Role | Persona scope & success definition | Avoid generic claims |
| 2 | Objectives / Capabilities | What the mode can reliably do | Bullet list |
| 3 | Workflow / Iteration Loop | Step-by-step interaction model | Must be deterministic |
| 4 | Depth Modes | Behavioral scaling rules | Include heuristics |
| 5 | Refinement Commands | Targeted post-output adjustments | Keep curated set |
| 6 | Guardrails | Refusal & escalation conditions | Mention compliance triggers |
| 7 | Output Patterns | Standard response formats | Use examples |
| 8 | Quality Checklist | Pre-send verification | Concrete & measurable |
| 9 | Model Guidance | Parameter hints (temp, style) | Optional, advisory |
|10 | Compression Rules | Token budget adaptation | Avoid info loss |
|11 | Success Indicators | Observable outcomes | Drives evaluation |
|12 | Governance & Versioning | Change log linkage | Reference file |
|13 | Example Interaction | Demonstrates loop | Abbreviated |
|14 | Skeleton Generator | Minimal template for new persona | Fenced code |

### Depth Mode Pattern
| Mode | Use Case | Adjustments |
|------|----------|-------------|
| quick | Rapid triage / ideation | Compressed output, omit advanced sections |
| standard | Default balanced detail | All core sections |
| deep | Complex / critical tasks | Adds risk tables, alternative strategies, validation passes |

Heuristic selection: anchor on input length and domain complexity markers (e.g., "compliance", "distributed").

### Refinement Command Examples
| Command | Scope | Effect |
|---------|-------|--------|
| refine: scope | Scope section | Tighten or clarify in/out boundaries |
| refine: risks | Risk / mitigation section | Expand, classify, prioritize |
| refine: optimize | Recommendations | Remove redundancy, merge overlaps |
| refine: concise | Whole output | Summarize to executive form |

### Guardrails Template
- Missing critical context -> ask clarifying questions before major generation.
- Conflicting constraints -> surface contradiction matrix & pause.
- Sensitive or proprietary requests without permission -> decline politely.
- Regulatory keywords (HIPAA, GDPR, PCI, SOX) -> add compliance subsection; flag assumptions.
- Avoid fabricating metrics / credentials.

### Universal Quality Checklist
| Dimension | Criteria |
|-----------|---------|
| Structure | All required sections present & ordered |
| Clarity | Jargon minimized or explained |
| Accuracy | No invented data; assumptions labeled |
| Completeness | All user-stated goals addressed |
| Actionability | Each recommendation / step is verifiable |
| Brevity | No redundant sentences / duplication |
| Extensibility | Clear how to add/remove sections |

### Chat Mode Skeleton Template
```markdown
description: 'Persona Name'
schemaVersion: '1.0'
depthModes: ['quick','standard']
refinementCommands: ['refine: scope','refine: risks','refine: concise']
tools: []
## Copilot ChatMode: Persona Name
### Role
One-line outcome-focused description.
### Objectives
- Bullet 1
- Bullet 2
### Workflow
1. Clarify inputs
2. Confirm understanding
3. Generate structured output
4. Offer refinement commands
### Depth Modes
| Mode | Adjustments |
|------|-------------|
| quick | Omit advanced analysis |
| standard | Full detail |
### Refinement Commands
| Command | Action |
|---------|--------|
| refine: scope | Tighten scope |
| refine: risks | Expand risks |
| refine: concise | Compress output |
### Guardrails
- Missing info -> ask
- Conflicts -> list & pause
### Output Pattern
Provide structured sections with headings & bullet lists.
### Quality Checklist
- All core sections present
- No placeholders
### Example
User goal -> clarifiers -> confirmation -> output -> refinement.
```


### Anti-Patterns to Avoid
- Overly broad role definitions ("solve any coding task").
- Unbounded refinement sets (keep curated list ≤6 commands).
- Redundant replication of org policies—link instead.
- Long narrative paragraphs where tables clarify faster.

### Governance & Change Log
Each chat mode referencing harmony must log schema-affecting updates in `docs/PLANNING_CHANGELOG.md` or a domain-specific log (recommended: `docs/CHATMODES_CHANGELOG.md`). Increment `schemaVersion` on structural changes; patch when wording tweaks only.

### Optional Automation
Consider adding a lightweight linter to verify front matter keys and required section headers.

### Quick Authoring Workflow (Copy/Paste Checklist)
1. Define role & scope.
2. List objectives (≤6 bullets).
3. Draft workflow steps (deterministic verbs).
4. Add depth modes (if beneficial).
5. Curate refinement commands.
6. Specify guardrails.
7. Provide output pattern + example.
8. Insert quality checklist.
9. Link governance (schemaVersion + change log).
10. Validate with universal quality checklist.

### Output Enforcement (ENFORCED)
- Generated chat mode persona files MUST be written to `CopilotCustomizer/output/chatmodes/`.
- File name pattern: `<repo-or-folder-name> - chatmode - <YYYY-MM-DD>.md`. Example: `CopilotCustomizer - chatmode - 2025-09-13.md`.
- Required front-matter keys: `OutputPath`, `GeneratedAt`, `SourceInstruction`, `Type: chatmode`.
- `OutputPath` must be the relative path under repo root, e.g. `CopilotCustomizer/output/chatmodes/CopilotCustomizer - chatmode - 2025-09-13.md`.
- Include a short `Usage` block in the generated file showing how to load or install the chatmode (if applicable) and a `Ready-to-run Prompts` sample that references `CopilotCustomizer/.github/prompts/` when the persona relies on existing prompts.

### Example
- Generated file path: `CopilotCustomizer/output/chatmodes/CopilotCustomizer - chatmode - 2025-09-13.md`
- Front-matter example:
  ```yaml
  OutputPath: CopilotCustomizer/output/chatmodes/CopilotCustomizer - chatmode - 2025-09-13.md
  GeneratedAt: 2025-09-13T12:00:00Z
  SourceInstruction: instructions/GenerateChatmode.instructions.md
  Type: chatmode
  ```

