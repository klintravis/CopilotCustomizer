mode: ask
## Chat Mode Generator Prompt (Harmony v1.0)
Chat Mode Binding: `chatmodes/CopilotCustomizer.chatmode.md`

Paired Instructions: `instructions/GenerateChatmode.instructions.md`

Task Intent: Generate a new, high-quality `*.chatmode.md` persona file aligned with Harmony conventions, including role, workflow, depth modes, refinement commands, guardrails, and quality checklist.

### Usage Instructions

Task Intent: Generate a new, high-quality `*.chatmode.md` persona file aligned with Harmony conventions, including role, workflow, depth modes, refinement commands, guardrails, and quality checklist.

### Usage Instructions
1. Review `instructions/GenerateChatmode.md`.
2. Fill the Variable Block and send.
3. Respond to clarifiers or `ready-to-generate`; then reply `confirm` for the file.
4. Apply refinement commands to iterate.

### Variable Block (Only two required; others inferred if omitted)
---
Persona Name (Title Case) [REQUIRED]: "{PERSONA_NAME}"
Primary Objective (≤30 words) [REQUIRED]: "{PRIMARY_OBJECTIVE}"
Short Description (≤15 words | default: compressed name + focus): "{SHORT_DESCRIPTION}" 
Primary Domain (default: inferred from objective keywords): "{PRIMARY_DOMAIN}"
Core Capabilities (comma list | default: verbs extracted from objective): "{CORE_CAPABILITIES}"  
Depth Modes (quick|standard|deep|none | default: standard): {DEPTH_MODES}
Refinement Commands (comma list | default: refine: concise,refine: optimize,refine: expand,refine: risks): "{REFINEMENT_COMMANDS}"  
Key Guardrails (comma list | default: missing-info-query,conflict-flag,hallucination-avoidance): "{KEY_GUARDRAILS}"  
Must Include Sections (ordered | default: schema standard): "{MUST_SECTIONS}"  
Optional Sections (default: Example Interaction): "{OPTIONAL_SECTIONS}"  
Tools Array (JSON | default: []): {TOOLS_ARRAY}
Version Tag (default: v1.0): "{VERSION_TAG}"  
Risk Sensitivity (low|medium|high | default: medium): {RISK_SENSITIVITY}
Token Economy Priority (brevity|balance|detail | default: balance): {TOKEN_PRIORITY}
Related Instructions File (default: none): "{RELATED_INSTRUCTIONS}"  
Related Prompt File (default: none): "{RELATED_PROMPT}"  
---

### Validation Rules
- Only `{PERSONA_NAME}` and `{PRIMARY_OBJECTIVE}` are mandatory.
- Derive `{SHORT_DESCRIPTION}` if missing; extract up to 6 `{CORE_CAPABILITIES}` from objective.
- Infer `{PRIMARY_DOMAIN}` (or `general`), apply default `{MUST_SECTIONS}`, `{REFINEMENT_COMMANDS}`, and `v1.0` when missing.
- If `{KEY_GUARDRAILS}` absent -> use standard triad.
- Capabilities >8 -> ask to prune or auto-trim (first 8) with notice.
- `{DEPTH_MODES}`=none -> omit Depth Modes section & key.
- `{RISK_SENSITIVITY}`=high -> add risk stanza in Guardrails.
- `{TOKEN_PRIORITY}`=brevity -> compression rules enforced.
- Section ordering must match `instructions/GenerateChatmode.md`; conflicting inputs -> clarifiers.

### Generation Gate
Return clarifying questions OR `ready-to-generate` + bullet summary of planned sections. Wait for `confirm` before emitting final markdown.

### Default Must Sections (If Omitted)
Role, Objectives, Workflow, Depth Modes, Refinement Commands, Guardrails, Output Patterns, Quality Checklist, Governance & Versioning, Example Interaction, Final Notes.

### Default Refinement Commands (If Not Provided)
`refine: concise`, `refine: optimize`, `refine: expand`, `refine: risks`

### Output Requirements (On Confirm)
Produce a complete `*.chatmode.md` file containing:
1. Front Matter keys: `description`, `schemaVersion`, optional `depthModes`, `refinementCommands`, `tools`
2. `## Copilot ChatMode: {PERSONA_NAME}`
3. Role (tight single paragraph or bullets)
4. Objectives / Capabilities list
5. Workflow (numbered deterministic iteration loop)
6. Depth Modes table (omit if none)
7. Refinement Commands table (with action column)
8. Guardrails (list + conditional risk enhancements)
9. Output Patterns (expected section skeletons / formats)
10. Compression / Token Strategy (if token priority not detail)
11. Quality Checklist (pre-output verification)
12. Governance & Versioning (version tag only)
13. Example Interaction (abbreviated)
14. Final Notes / Extensibility guidance
15. (Implicit) Conformance statement: Indicate alignment with `instructions/GenerateChatmode.md` schema.

### Internal Quality Checklist (Model Before Emitting)
- All declared or inferred capabilities appear somewhere in Objectives / Workflow.
- Any inferred values are internally consistent (no contradictions with provided inputs).
- No unreferenced refinement commands.
- Guardrails cover missing info, conflicts, compliance, hallucination avoidance.
- Depth modes consistent with provided or inferred value.
- Version tag present (default if inferred) in description or closing note.
- No dangling `{VAR}` placeholders.

### Compression Rules (if `{TOKEN_PRIORITY}`=brevity)
- Remove narrative; keep tables & bullets.
- ≤1-line section intros.
- Merge Output Patterns + Example.

### Example (Minimal Input -> Auto-Inferred)
```
{PERSONA_NAME}=Refactor Strategist
{PRIMARY_OBJECTIVE}=Guide structured, low-risk refactors with dependency awareness
```
Auto-inferred (illustrative):
- SHORT_DESCRIPTION => "Refactor planning assistant"
- CORE_CAPABILITIES => analyze-structure,detect-smells,propose-phased-changes,estimate-risk
- PRIMARY_DOMAIN => refactoring
- VERSION_TAG => v1.0
- MUST_SECTIONS => default schema
- REFINEMENT_COMMANDS => refine: concise,refine: optimize,refine: expand,refine: risks

### Refinement Commands (Meta-Level)
- `refine: concise` – Compress sections.
- `refine: optimize` – Remove redundancy; tighten workflow steps.
- `refine: expand` – Provide deeper capability explanations.
- `refine: risks` – Enhance risk & guardrail subsections.

### After Generation
Adjust variables or issue refinement commands to iterate improved persona versions.

### Summary
This generator prompt accelerates creation of consistent, auditable chat modes aligned with Harmony schema and governance practices.

