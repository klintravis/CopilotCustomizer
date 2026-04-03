---
name: standards-resolution
description: Discover, match, and integrate enterprise coding standards from a standards library into generated AI assets. Use when generating customizations for repositories with coding standards defined.
---

# Standards Resolution

## Purpose
Portable methodology for discovering enterprise coding standards, matching them against a repository's tech stack, and naturally integrating matched principles into generated AI customization assets.

## When to Use This Skill
- Generating AI customization assets for a repository with `.github/standards/`
- Analyzing which coding standards apply to a detected tech stack
- Integrating organizational conventions into generated agents, skills, instructions, or prompts

## Discovery Protocol

1. **Scan** the standards directory recursively for `*.md` files (skip README.md)
2. **Parse** YAML frontmatter from each file: `name`, `technologies`, `scope`, `priority`
3. **Validate** — skip files missing required fields
4. **Catalog** valid standards with parsed metadata

If no standards directory exists or is empty, skip resolution entirely.

## Matching Algorithm

```
Input: detectedTechStack[] (from repository analysis)

1. Collect all standards where scope = "always"
2. For each standard where scope = "tech-match":
   a. Compare technologies[] against detectedTechStack[] (case-insensitive)
   b. If any technology matches, include the standard
3. Sort by priority: high > medium > low
4. Within same priority, sort alphabetically by name
5. Bundle as standardsContext for downstream use
```

## Edge Cases
- **Empty standards folder**: No standards matched — proceed normally
- **No tech-match hits**: Only `scope: always` standards apply
- **Conflicting guidance**: Higher-priority standard takes precedence
- **Malformed frontmatter**: Log warning, skip file, continue
- **Duplicate matches**: A standard included at most once regardless of match count

## Integration Protocol

### Step 1: Extract Principles
Read each matched standard's body. Identify core principles, patterns, and conventions. Do not memorize exact phrasing.

### Step 2: Treat as Design Constraints
During generation, treat principles as design constraints — like architectural patterns or framework conventions. They inform decisions, not dictate text.

### Step 3: Synthesize Naturally
Weave principles into the generated asset's native structure:
- **Agent files**: Reflect in Role, Core Objectives, Workflow sections
- **Instruction files**: Incorporate into Coding Standards, Testing Strategy
- **Skill files**: Reflect in Instructions, Best Practices
- **Prompt files**: Embed in validation rules, quality checks

### Step 4: Verify Integration Integrity
- **Never** reference the standards directory or file paths in generated output
- **Never** quote standards verbatim — paraphrase and adapt
- **Never** mention "enterprise standards" as a concept
- Principles should appear as native, project-specific guidance

## Standards YAML Schema

```yaml
name: kebab-case-identifier
description: What this standard covers
version: "1.0"
technologies: [typescript, react]  # Empty [] for scope: always
categories: [language, framework]
scope: "always" | "tech-match"
priority: "high" | "medium" | "low"
```

## Priority Levels
- **high**: Critical standards (security, architecture) — override conflicts
- **medium**: Important conventions (language idioms, framework patterns)
- **low**: Recommended practices (style guides, naming)

## Output Format

When reporting matched standards in analysis or handoff context:

```yaml
standardsContext:
  matched:
    - name: typescript-standards
      scope: tech-match
      priority: high
      keyPrinciples:
        - Strict mode enforcement
        - Result types for error handling
    - name: code-review-standards
      scope: always
      priority: medium
      keyPrinciples:
        - Focused PRs under 400 lines
        - Public API documentation required
  totalMatched: 2
  alwaysApply: 1
  techMatch: 1
```

## Integration Examples

### Before (without standards)
```markdown
### Coding Standards
- Follow project conventions
- Use consistent formatting
```

### After (with TypeScript standards matched)
```markdown
### Coding Standards
- Enable strict TypeScript compilation
- Prefer type inference for locals; explicit annotations for public APIs
- Model failures with discriminated union result types
- Use readonly properties for immutable data
```
