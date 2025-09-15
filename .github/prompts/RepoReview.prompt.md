mode: ask
## Repo Audit & Scaffolding Prompt (v1.1)

Chat Mode Binding: `chatmodes/CopilotCustomizer.chatmode.md`
Paired Instructions: `instructions/RepoReview.instructions.md`

**Task Intent**: Audit Copilot customization assets in repo/folder → generate structured analysis via `templates/Analysis.template.md` → deliver ready-to-run improvement prompts with priorities → save to `CopilotCustomizer/output/`.

### Usage Instructions
1. Fill minimal required variables below and send.
2. Respond to clarifiers or `ready-to-generate`; then reply `confirm` for the analysis.
3. Use refinement commands to iterate or focus on specific code areas.

### Variable Block
---
**Target Path** [REQUIRED]: "{TARGET_PATH}"
**Focus Area** (default: all assets): "{FOCUS_AREA}"  
**Output Constraints** (default: exclude binaries/caches): "{KNOWN_CONSTRAINTS}"
---

### Validation Rules
- `{TARGET_PATH}` required and must be accessible
- Default scope: all Copilot assets (`*.chatmode.md`, `*.instructions.md`, `*.prompt.md`, `AGENTS.md`)  
- Default constraints: exclude binaries, caches (review existing `.github/*` files)
- Path validation failure → request clarification

### Generation Gate
Respond `ready-to-generate` + scope summary, then await `confirm` before generating full analysis.

### Output Requirements (On Confirm)
**ENFORCED Structure**:
- Use `templates/Analysis.template.md` format
- Save to: `CopilotCustomizer/output/<repo-name> - Repo Review - <YYYY-MM-DD>.md`
- Include front-matter: `GeneratedAt`, `OutputPath` fields
- Add section: `Ready-to-run Prompts` with concrete examples

**Per Asset Type** (AGENTS.md, instructions, prompts, chatmodes):
- Priority level (High/Med/Low)
- Ready-to-run generator prompt with source path
- Usage instruction for immediate execution

### Refinement Commands
- `refine: enforce-output` – Validate output path/format compliance, regenerate if needed
- `refine: risks` – Expand risk/mitigation section with technical concerns  
- `refine: generators` – Focus on generator prompt quality and completeness

### Examples

**Minimal Input**:
```
{TARGET_PATH}=c:\Source\CopilotCustomizer
{FOCUS_AREA}=(all assets)
{KNOWN_CONSTRAINTS}=(standard exclusions)
```

**Focused Review**:
```
{TARGET_PATH}=c:\Source\MyProject  
{FOCUS_AREA}=chatmodes/
{KNOWN_CONSTRAINTS}=exclude .github/*, focus on canonical paths only
```
