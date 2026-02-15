---
applyTo: '.github/**/*.instructions.md'
description: 'Reusable framework for creating high-quality instruction files with consistency, guardrails, and maintainability'
---

## Instruction Authoring Guide (v1.1)

**⚠️ YAML**: Only `applyTo` and `description` supported. Move custom metadata to markdown.

**Paired Prompt**: [NewInstructions.prompt.md](../prompts/NewInstructions.prompt.md)

### Purpose
Framework for creating high-quality `*.instructions.md` files with consistency, guardrails, and maintainability.

### Core Principles
1. Clarity over verbosity
2. Single source of truth
3. Explicit iteration loop (clarify → confirm → generate → refine)
4. Guardrails for missing info
5. Version discipline

### Required Sections
| Section | Required | Notes |
|---------|----------|-------|
| Front Matter | Yes | `applyTo`, optional `description` |
| Context Overview | Yes | Domain summary |
| Constraints | Yes | Tech stack, compliance |
| Coding Standards | Code projects | Style, lint, format |
| Testing Strategy | Yes | Frameworks, coverage |
| Documentation | Yes | What to document |
| Acceptance Criteria | Yes | Definition of done |
| Change Management | Yes | Versioning |### Front Matter Template
```yaml
---
applyTo: '**'
description: 'Brief description'
---
```

### Refinement Commands
- `refine: concise` - Compress prose
- `refine: expand` - Add detail
- `refine: security` - Add threat model
- `refine: test` - Add test cases

### Guardrails
- Request missing context before generating
- Surface contradictions
- Don't fabricate policy
- Mark assumptions `(assumed)`

### Quality Checklist
- [ ] All required sections present
- [ ] No ambiguous placeholders
- [ ] Terminology consistent
- [ ] Acceptance criteria measurable
- [ ] Version tracking included

### Instruction Template Skeleton
```markdown
---
applyTo: '**'
description: 'Brief description'
---

## <Domain> Instructions

**Version**: 1.0

### Context Overview
Domain summary & objective

### Project Constraints
- Tech Stack | Performance | Compliance

### Coding Standards
- Language/Framework | Style | Lint

### Testing Strategy
- Unit | Integration | E2E

### Documentation Requirements
- What to document | Format

### Acceptance Criteria
- Definition of done

### Change Management
- Change log location | Versioning
```

### Project Discovery (Required)
Before generating, scan for:
- Package files: `package.json`, `requirements.txt`, `pyproject.toml`, `Gemfile`, `pom.xml`, `Cargo.toml`
- Config files: `.eslintrc`, `tsconfig.json`, `jest.config.*`, `Dockerfile`
- Runtime: `.nvmrc`, `.python-version`, `.ruby-version`

Append discovered tool documentation links to generated instructions.

### Output Requirements
- Save to: `CopilotCustomizer/output/instructions/`
- Pattern: `<name> - instructions - <YYYY-MM-DD>.md`
- Include: `OutputPath`, `GeneratedAt`, `SourceInstruction`, `Type` in front matter

### Standards Compliance
**VS Code Copilot v2025.11** - [Documentation](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

**Processing Metadata**:
- **Standards Version**: VS Code Copilot v2025.11 (Custom Instructions latest)
- **Harmonization**: comprehensive-harmony-v1.1 (enhanced cross-references)
- **Content Preservation**: 100% functionality maintained with enhanced standards
- **Formatting Applied**: 2025-09-15 | Standards compliance verified

### Example
- Generated file path: `CopilotCustomizer/output/instructions/CopilotCustomizer - instructions - 2025-09-13.md`
- Front-matter example:
  ```yaml
  OutputPath: CopilotCustomizer/output/instructions/CopilotCustomizer - instructions - 2025-09-13.md
  GeneratedAt: 2025-09-13T12:00:00Z
  SourceInstruction: instructions/GenerateInstructions.instructions.md
  Type: instructions
  ```

### Standards Integration

When generating this asset type, integrate matched enterprise standards via [Standards.instructions.md](Standards.instructions.md). Weave principles naturally into the generated content without verbatim copying or direct references to `.github/standards/`.

### Conformance Note
This instruction file aligns with the broader Copilot customization ecosystem and integrates with [NewInstructions.prompt.md](../prompts/NewInstructions.prompt.md) for execution workflow. Focuses on maintainable, high-quality instruction file generation following established patterns.

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Added traceability system | CopilotCustomizer |
