mode: ask
## Meta Prompt Generator (Harmony v1.0)

Chat Mode Binding: `chatmodes/CopilotCustomizer.chatmode.md`

Paired Instructions: `instructions/GeneratePrompt.instructions.md`

Task Intent: Generate a new, high-quality `{PROMPT_DOMAIN}` prompt file (`*.prompt.md`) aligned with existing chat modes & instructions.

### Usage Instructions
1. Optionally review `instructions/GeneratePrompt.md`.
2. Provide required variables and send.
3. Respond to clarifiers or `ready-to-generate`; then reply `confirm`.
4. Use refinement commands to iterate.

### Variable Block (Only 2 required; rest inferred)
---
Prompt Domain (e.g., Test Generation, Code Refactor, Incident RCA) [REQUIRED]: "{PROMPT_DOMAIN}"
Primary Goal (≤18 words) [REQUIRED]: "{PRIMARY_GOAL}"
Target Artifacts (default: generic target from domain): "{TARGET_ARTIFACTS}"  
Key Constraints (default: none or inferred from goal verbs): "{KEY_CONSTRAINTS}"  
Critical Variables (comma list | default: CORE_INPUT,CONTEXT if omitted): "{CRITICAL_VARS}"  
Optional Variables (comma list | default: none): "{OPTIONAL_VARS}"  
Depth Mode Support (quick|standard|deep|none | default: standard): {DEPTH_MODE_SUPPORT}
Refinement Commands (comma list | default: refine: concise,refine: expand,refine: optimize,refine: risks): "{REFINEMENT_COMMANDS}"  
Output Sections (ordered | default: Task Intent,Usage,Variable Block,Clarification,Output Specification,Refinement Commands,Quality Checklist,Example,Version Note): "{OUTPUT_SECTIONS}"  
Risk Sensitivity (low|medium|high | default: medium): {RISK_SENSITIVITY}
Quality Emphasis (clarity|concise|completeness|balanced | default: balanced): {QUALITY_EMPHASIS}
Existing Related Chat Mode (name or none | default: none): "{RELATED_CHATMODE}"  
Version Tag (default: v1.0): "{VERSION_TAG}"  
---

### Validation Rules
- Required: `{PROMPT_DOMAIN}`, `{PRIMARY_GOAL}`.
- Defaults if missing: `{CRITICAL_VARS}`=`CORE_INPUT,CONTEXT`, `{OUTPUT_SECTIONS}` (default list), `{VERSION_TAG}`=`v1.0`, `{TARGET_ARTIFACTS}` (infer from domain), `{KEY_CONSTRAINTS}` (extract keywords or none).
- `{DEPTH_MODE_SUPPORT}`=none -> omit depth table.
- `{RISK_SENSITIVITY}`=high -> include Risk Mitigation Notes.
- Goal length 4–90 chars after trimming.
- If critical vars >10 -> request prune or auto-trim to first 10.
- Keep ordering per schema/guide; conflicts -> clarifiers.

### Generation Gate
Respond first with either:
- A list of clarifying questions (if any required fields weak or missing), or
- `ready-to-generate` and a compact summary of intended structure.
Only after I reply `confirm` should you output the full prompt file markdown.

### Output Requirements (When Confirmed)
Produce a complete `*.prompt.md` file (schema-aligned with `instructions/GeneratePrompt.md`) containing:
1. Mode line (`mode: ask` or `mode: agent` if autonomy justified)
2. Title: `## {PROMPT_DOMAIN} Prompt ({VERSION_TAG})`
3. Task Intent (1 line)
4. Usage Instructions
5. Variable Block (fenced) with critical + optional variables & hints
6. Clarification Phase guidance
7. Output Specification (enumerate `{OUTPUT_SECTIONS}`)
8. Refinement Commands table (command -> action)
9. Internal Quality Checklist
10. Example Filled Prompt
11. Notes / Tips (optional)
12. Version Note
13. Risk Mitigation Notes (only if high risk)
14. Conformance note referencing `instructions/GeneratePrompt.md`.

### Default Refinement Commands (if none provided)
`refine: concise`, `refine: expand`, `refine: optimize`, `refine: risks`

### Internal Quality Checklist (Model Must Apply Before Emitting)
- Mandatory inputs present (domain & goal).
- All variable placeholders (declared + inferred) defined & referenced.
- No dangling `{VAR}` placeholders.
- Output sections match specified or default order.
- ≥3 refinement commands present (defaults if omitted).
- Example uses realistic dummy values.
- Version tag included in title.
- Conformance note included.

### Token Efficiency Guidance
- Prefer bullets; tables only when they improve scan speed.
- Summarize constraints instead of repeating variable block verbatim.

### Refinement Commands (Meta-Level)
- `refine: concise` – Compress generated prompt (retain variable block & sections list).
- `refine: expand` – Add more detailed usage guidance & extended example.
- `refine: optimize` – Remove redundancy & tighten variable descriptions.
- `refine: risks` – Add risk considerations & fallback behaviors.

### Example (Minimal Input -> Auto Inference)
```
{PROMPT_DOMAIN}=Test Generation
{PRIMARY_GOAL}=Produce comprehensive test suite blueprint
```
Auto-inferred (illustrative):
- CRITICAL_VARS => CORE_INPUT,CONTEXT
- OUTPUT_SECTIONS => Task Intent,Usage,Variable Block,Clarification,Output Specification,Refinement Commands,Quality Checklist,Example,Version Note
- VERSION_TAG => v1.0
- TARGET_ARTIFACTS => tests/
- REFINEMENT_COMMANDS => refine: concise,refine: expand,refine: optimize,refine: risks

### After Generation (User Options)
Issue refinement commands or tweak variables and resend to regenerate.

### Summary
Minimizes required inputs (domain & goal), auto-inferring structure and defaults with explicit schema conformance to `instructions/GeneratePrompt.md`.

