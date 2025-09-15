## Repo Review Instructions (v1.2)

### Context & Objectives
Guide AI agents to audit Copilot customization assets (`*.chatmode.md`, `*.instructions.md`, `*.prompt.md`, `AGENTS.md`) and deliver actionable improvement analysis via `templates/Analysis.template.md`.

**Core Workflow**: Scan repo/folder → prioritize gaps → generate ready-to-run improvement prompts → save structured analysis to `CopilotCustomizer/output/`.

**Scope**: review all included `.github/*` existing files. Always exclude binaries and caches.

### Variable Block (Required Inputs)
- **Target Path**: Repo root or specific folder path
- **Focus Area**: Optional filter (e.g., `chatmodes/`, `prompts/`, `all`)
- **Output Constraints**: Default to exclude `.github/*`, binaries, caches

### Validation Rules  
- Must scan canonical asset paths: `chatmodes/`, `instructions/`, `prompts/`, `AGENTS.md`
- For each asset found: assess completeness, Harmony pattern compliance, versioning
- Assign priority levels (High/Med/Low) based on impact and effort
- Skip missing `.github/prompts/` references gracefully

### Generation Gate
Before analysis generation:
1. Confirm target path exists and is accessible
2. Validate scope aligns with Copilot customization assets
3. Check `templates/Analysis.template.md` is available for output structure

### Output Requirements (ENFORCED)

**File Location**: `CopilotCustomizer/output/<repo-name> - Repo Review - <YYYY-MM-DD>.md`  
**Structure**: Must follow `templates/Analysis.template.md` with these additions:
- Front-matter: `GeneratedAt:` timestamp, `OutputPath:` field
- Section: `Ready-to-run Prompts` with concrete, copy-paste prompts

**Ready-to-run Prompt Standards**:
- Variables replaced with example values or input requirements listed
- Include exact path to source prompt (e.g., `CopilotCustomizer/.github/prompts/NewPrompt.prompt.md`)
- One-line usage instruction for immediate execution
- Priority assignment (High/Med/Low) for each suggested action

### Refinement Commands
| Command | Action |
|---------|--------|
| `refine: enforce-output` | Validate output path/format compliance, regenerate if needed |
| `refine: risks` | Expand risk/mitigation section with specific technical concerns |
| `refine: generators` | Focus on generator prompt quality and completeness |

### Quality Checklist
- [ ] Target path validated and assets inventoried
- [ ] Analysis follows `templates/Analysis.template.md` structure  
- [ ] Output saved to `CopilotCustomizer/output/<smart-title>.md`
- [ ] Ready-to-run prompts section includes concrete examples with paths
- [ ] Priority levels assigned (High/Med/Low) to all recommendations
- [ ] No placeholder variables remain in output
- [ ] Generator prompts reference available prompt files

### Generator Prompts Available
- `prompts/NewAgent.prompt.md` → AGENTS.md creation
- `prompts/NewInstructions.prompt.md` → instruction file creation  
- `prompts/NewPrompt.prompt.md` → prompt file creation
- `prompts/NewChatmode.prompt.md` → chatmode creation

### Example Output Structure
```
# CopilotCustomizer - Repo Review - 2025-09-14
GeneratedAt: 2025-09-14T10:30:00Z
OutputPath: CopilotCustomizer/output/CopilotCustomizer - Repo Review - 2025-09-14.md

## Ready-to-run Prompts
**Create Missing AGENTS.md (High Priority)**
Source: `CopilotCustomizer/.github/prompts/NewAgent.prompt.md`
Prompt: "Generate AGENTS.md for CopilotCustomizer with build commands, coding standards, and PR workflow."
Usage: Copy prompt into Copilot chat and execute.
```
