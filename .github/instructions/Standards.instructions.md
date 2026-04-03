---
applyTo: '.github/**/*.{agent.md,instructions.md,prompt.md}'
description: 'Discovers, matches, and integrates enterprise coding standards from .github/standards/ into generated assets'
---

## Standards Resolution (v2.0)

### Purpose
Integrate enterprise coding standards from `.github/standards/` into generated assets.

**Complete methodology**: See [standards-resolution](../skills/standards-resolution/SKILL.md) skill for:
- Discovery protocol (scan, parse, validate, catalog)
- Matching algorithm (always-apply + tech-match + priority sorting)
- Integration protocol (extract → design constraints → synthesize → verify)
- Edge cases and conflict resolution
- Output format (standardsContext YAML)

### Key Rules
1. Standards are **never** copied verbatim — principles are synthesized naturally
2. Generated output must **never** reference `.github/standards/` by path
3. Higher-priority standards take precedence in conflicts
4. If no standards directory exists, skip resolution entirely

### Downstream Flow
- **Planner**: Uses standardsContext to inform asset specifications
- **Generator**: Treats matched principles as design constraints
- **Verifier**: Checks principles are reflected (not copied) in output

---

## Processing Metadata

- **Standards Version**: VS Code Copilot v2026.03 (Agent Files v1.112)
- **Role**: Discovers, matches, and integrates enterprise coding standards
- **Scope**: Standards from .github/standards/ into generated assets
- **Integration**: Provides standardsContext to Planner, Generator, and Verifier

*Generated following CopilotCustomizer instruction generation standards*

---

## Change History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-01-15 | Initial release |

---

*Standards resolution instruction for the CopilotCustomizer pipeline*
*Integrates with: repo-analysis skill, Planner, Generator, Verifier*
