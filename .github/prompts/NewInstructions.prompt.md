mode: ask
## Instruction File Generator Prompt (Harmony v1.0)

Chat Mode Binding: `chatmodes/CopilotCustomizer.chatmode.md`

Paired Instructions: `instructions/GenerateInstructions.instructions.md`

Task Intent: Generate a new, high-quality `*.instructions.md` file tailored to a specific project or domain, aligned with existing chat modes & prompt patterns.

### Usage Instructions
1. Review `instructions/GenerateInstructions.md` (optional).
2. Fill required variables and send.
3. Respond to clarifiers or `ready-to-generate`; then reply `confirm` for the file.
4. Use refinement commands to adjust depth/focus.

### Variable Block (Only 2 required; others inferred if omitted)
---
Instruction Domain (e.g., API Service, Data Pipeline, Front-End UI, ML Model Lifecycle) [REQUIRED]: "{INSTRUCTION_DOMAIN}"
Primary Objective (≤25 words) [REQUIRED]: "{PRIMARY_OBJECTIVE}"
Tech Stack (comma list | default: inferred from domain keywords): "{TECH_STACK}"
Key Constraints (perf, compliance, budget, latency | default: inferred or none): "{KEY_CONSTRAINTS}"
Critical Sections (ordered | default: schema standard): "{CRITICAL_SECTIONS}"  
Optional Sections (default: Monitoring & Observability): "{OPTIONAL_SECTIONS}"  
Security Level (low|medium|high|regulated | default: medium): {SECURITY_LEVEL}
Performance Sensitivity (low|medium|high | default: medium): {PERFORMANCE_SENSITIVITY}
Compliance Keywords (comma list or none | default: none): "{COMPLIANCE_KEYWORDS}"  
Refinement Commands (comma list | default: refine: concise,refine: expand,refine: security,refine: performance): "{REFINEMENT_COMMANDS}"  
Depth Modes (quick|standard|deep|none | default: standard): {DEPTH_MODES}
Version Tag (default: v1.0): "{VERSION_TAG}"  
Audience (roles | default: engineers,reviewers): "{AUDIENCE}"  
Success Criteria (measurable | default: derived from objective verbs -> KPIs): "{SUCCESS_CRITERIA}"  
Known Risks (default: inferred risk or omitted): "{KNOWN_RISKS}"  
---

### Validation Rules
- Required: `{INSTRUCTION_DOMAIN}`, `{PRIMARY_OBJECTIVE}`.
- Defaults if missing: `{CRITICAL_SECTIONS}` (use Default list), `{TECH_STACK}` (infer from domain/objective), `{KEY_CONSTRAINTS}` (derive or mark none), `{VERSION_TAG}` (`v1.0`), `{SUCCESS_CRITERIA}` (2–4 measurable targets), `{REFINEMENT_COMMANDS}` (Default set).
- `{SECURITY_LEVEL}`=high/regulated or compliance keywords -> include Security & Compliance + Compliance subsection.
- `{DEPTH_MODES}`=none -> omit Depth Modes table and front matter key.
- If critical sections <3 -> append defaults until ≥3.
- Keep ordering per schema/guide; conflicts -> clarifiers (do not generate).

### Generation Gate
First respond with clarifying questions OR `ready-to-generate` + structure summary. Do not output full instructions before explicit `confirm` response.

### Output Requirements (On Confirm)
Produce a complete `*.instructions.md` with ordered sections (schema aligned with `instructions/GenerateInstructions.md`):
1. Front Matter (`applyTo`, `schemaVersion`, optional refinement commands, depth modes if used)
2. Title: `## {INSTRUCTION_DOMAIN} Instructions ({VERSION_TAG})`
3. Context Overview
4. Objective (refined)
5. Tech Stack & Constraints
6. Architecture / Design Conventions (if relevant)
7. Coding Standards
8. Security & Compliance (conditional)
9. Performance Expectations (conditional)
10. Testing Strategy
11. Tooling & Automation
12. Documentation Requirements
13. Monitoring & Observability (conditional)
14. Deployment / Release Strategy (conditional)
15. Review & Acceptance Criteria
16. Refinement Commands (table) (if any)
17. Depth Modes (table) (if any)
18. Change Management (version tracking only)
19. Appendix / Templates (optional)
20. Summary & Next Actions
21. Risk Register (if high/regulated security or risks provided)
22. Conformance Note (alignment with `instructions/GenerateInstructions.md`).

Respect `{CRITICAL_SECTIONS}` order by merging them into the above where names align; add any unmatched as additional numbered sections before Summary.

### Default Critical Sections (If unspecified) Suggestion
`Context Overview,Objective,Tech Stack & Constraints,Security & Compliance,Testing Strategy,Tooling & Automation,Review & Acceptance Criteria,Change Management`

### Default Refinement Commands (If Not Provided)
`refine: concise`, `refine: expand`, `refine: security`, `refine: performance`

### Internal Quality Checklist (Model Must Pass Before Emitting)
- Mandatory inputs satisfied (domain & objective).
- Inferred values integrated without contradiction; optionally list inferred block if token budget allows.
- All required/triggered sections present; conditional ones only when triggers exist.
- No dangling raw placeholders like `{VAR}`.
- Success criteria measurable (numbers, %, latency, throughput, etc.).
 
- Refinement commands listed if declared in front matter.

### Refinement Commands (Meta-Level)
- `refine: concise` – Collapse verbose prose & remove optional narrative.
- `refine: expand` – Provide deeper examples & elaborations in specified section(s).
- `refine: security` – Enrich Security & Compliance with threat model bullets.
- `refine: performance` – Enrich performance section with load tiers & test approaches.

### Example (Minimal Input -> Auto Inference)
```
{INSTRUCTION_DOMAIN}=Data Pipeline
{PRIMARY_OBJECTIVE}=Define standards for building resilient ETL jobs
```
Auto-inferred (illustrative):
- TECH_STACK => Python,Airflow,PostgreSQL
- KEY_CONSTRAINTS => daily SLA 06:00 UTC,data PII handling
- CRITICAL_SECTIONS => default schema
- SECURITY_LEVEL => high (due to PII inference)
- COMPLIANCE_KEYWORDS => GDPR (if PII mention)
- SUCCESS_CRITERIA => SLA adherence 99%,<1% failed DAG runs,lineage documented
- VERSION_TAG => v1.0

### Token Efficiency Guidance
- Prefer bullets over prose; use tables only when they add value.
- Summarize variable block content instead of repeating verbatim.

### After Generation
Issue refinement commands or tweak variables and resend to regenerate.

### Summary
Standardizes `*.instructions.md` creation with minimal inputs, smart inference, and strict schema conformance to `instructions/GenerateInstructions.md`.

