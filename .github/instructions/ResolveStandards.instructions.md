---
applyTo: '.github/**/*.{agent.md,instructions.md,prompt.md}'
description: 'Discovers, matches, and integrates enterprise coding standards from .github/standards/ into generated assets'
---

## ResolveStandards Instructions (v1.0)

### Purpose

Teach agents how to discover enterprise coding standards, match them against a target repository's detected tech stack, and integrate the matched principles into generated Copilot assets. Standards influence generated output naturally — they are never copied verbatim, quoted, or referenced by path.

### Discovery Protocol

1. **Scan** `.github/standards/` recursively for `*.md` files (skip `README.md`)
2. **Parse** YAML frontmatter from each file to extract: `name`, `technologies`, `scope`, `priority`
3. **Validate** frontmatter — skip files missing required fields (`name`, `scope`, `priority`)
4. **Catalog** valid standards with their parsed metadata

If `.github/standards/` does not exist or is empty, skip standards resolution entirely and proceed with normal generation.

### Matching Algorithm

```
Input: detectedTechStack[] (from repository-analysis skill)

1. Collect all standards where scope = "always"
2. For each standard where scope = "tech-match":
   a. Compare technologies[] against detectedTechStack[] (case-insensitive)
   b. If any technology matches, include the standard
3. Sort matched standards by priority: high > medium > low
4. Within same priority, sort alphabetically by name
5. Bundle as standardsContext for downstream agents
```

### Edge Cases

- **Empty standards folder**: No standards matched — proceed with normal generation
- **No tech-match hits**: Only `scope: always` standards apply (if any)
- **Conflicting guidance**: Higher-priority standard takes precedence
- **Malformed frontmatter**: Log a warning, skip the file, continue processing
- **Duplicate technology matches**: A standard is included at most once regardless of how many technologies match

### Integration Protocol

When standards are matched, agents must follow this protocol for integrating them into generated assets:

#### Step 1: Extract Principles
Read each matched standard's body content. Identify the core principles, patterns, and conventions it advocates. Do not memorize exact phrasing.

#### Step 2: Treat as Design Constraints
During asset generation, treat extracted principles as design constraints — the same way you would treat a detected architectural pattern or framework convention. They inform decisions, not dictate text.

#### Step 3: Synthesize into Natural Guidance
Weave principles into the generated asset's native structure:
- In **agent files**: Reflect in Role, Core Objectives, and Workflow sections
- In **instruction files**: Incorporate into Coding Standards and Testing Strategy sections
- In **skill files**: Reflect in Instructions and Best Practices sections
- In **prompt files**: Embed in validation rules and quality checks
- In **workflow files**: Align quality gates with standards requirements

#### Step 4: Verify Integration Integrity
- Generated output must **never** reference `.github/standards/` or any standards file by path
- Generated output must **never** quote standards verbatim (paraphrase and adapt)
- Generated output must **never** mention "enterprise standards" or "standards system" as a concept
- Principles should appear as if they are native, project-specific guidance

### Integration Examples

#### Before (without standards)
```markdown
### Coding Standards
- Follow project conventions
- Use consistent formatting
```

#### After (with TypeScript standards matched)
```markdown
### Coding Standards
- Enable strict TypeScript compilation with no exceptions
- Prefer type inference for local variables; add explicit annotations for public API signatures and function return types
- Model expected failures with discriminated union result types rather than throwing for control flow
- Use `readonly` properties for data that should not be mutated after creation
```

#### Before (agent workflow without standards)
```markdown
### Workflow
1. Analyze requirements
2. Generate implementation
3. Validate output
```

#### After (with code review standards matched)
```markdown
### Workflow
1. Analyze requirements
2. Generate implementation
   - Keep changes focused on a single logical concern
   - Include doc comments for public API surfaces
3. Validate output
   - Verify new features include tests for primary use case and edge cases
   - Confirm naming reveals intent and uses consistent vocabulary
```

### Output Format

When reporting matched standards (in analysis reports or handoff context), use this structure:

```yaml
standardsContext:
  matched:
    - name: typescript-standards
      scope: tech-match
      priority: high
      keyPrinciples:
        - Strict mode enforcement
        - Discriminated unions over enums
        - Result types for error handling
    - name: code-review-standards
      scope: always
      priority: medium
      keyPrinciples:
        - Focused PRs under 400 lines
        - Public API documentation required
        - Regression tests for bug fixes
  totalMatched: 2
  alwaysApply: 1
  techMatch: 1
```

### Downstream Handoff

Pass `standardsContext` to downstream agents as part of the context handoff:
- **AssetPlanner**: Uses standards to inform asset specifications and recommendations
- **AssetGenerator**: Uses standards as design constraints during file generation
- **VerificationAgent**: Checks that standards principles are reflected (not copied) in generated output

---

*Standards resolution instruction for the CopilotCustomizer pipeline*
*Integrates with: repository-analysis skill, AssetPlanner, AssetGenerator, VerificationAgent*
