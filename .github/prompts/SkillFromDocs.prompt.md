---
description: Generate a custom Agent Skill by analyzing an external documentation website
instructions:
  - GenerateSkillFromDocs.instructions.md
  - GenerateSkill.instructions.md
---

<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: SkillFromDocs Prompt (Prompt) v1.0
   STATUS: Prompt Ready — Awaiting execution
════════════════════════════════════════════════════════════════════════════ -->

# Skill From Documentation Generator (v1.0)

Creates Agent Skills (agentskills.io open standard) by analyzing external documentation websites and extracting patterns, APIs, and best practices into a reusable cross-platform skill.

## Parameters

- **DOCS_URL** (required): URL to the documentation website to analyze
- **SKILL_NAME** (optional): Custom skill identifier (lowercase-with-hyphens, max 64 chars) - if not provided, will be inferred from documentation
- **PURPOSE** (optional): Override or clarify the skill's purpose - if not provided, will be inferred from documentation
- **TARGET_PATH** (optional): Repository path for skill creation (defaults to current workspace)
- **DEPTH** (optional): Analysis depth: `quick` (overview), `standard` (default), or `comprehensive` (full API coverage)
- **INCLUDE_EXAMPLES** (optional): true/false (default: true) - generate usage examples from docs
- **INCLUDE_SCRIPTS** (optional): true/false (default: false) - generate helper scripts

## Usage Examples

```
# Basic: Generate skill from React documentation
/SkillFromDocs DOCS_URL: "https://react.dev/reference/react"

# With custom name: Generate skill from Tailwind docs
/SkillFromDocs DOCS_URL: "https://tailwindcss.com/docs", SKILL_NAME: "tailwind-styling"

# Comprehensive analysis with scripts
/SkillFromDocs DOCS_URL: "https://docs.pytest.org/en/stable/", DEPTH: "comprehensive", INCLUDE_SCRIPTS: true

# Specify purpose for focused skill
/SkillFromDocs DOCS_URL: "https://fastapi.tiangolo.com/", PURPOSE: "Building REST APIs with automatic OpenAPI docs"

# Target specific repository
/SkillFromDocs DOCS_URL: "https://playwright.dev/docs/intro", TARGET_PATH: "/path/to/project"
```

## What Gets Created

```
TARGET_PATH/.github/skills/
└── [inferred-or-provided-skill-name]/
    ├── SKILL.md                    # Skill definition with extracted patterns
    ├── examples/                   # Example files from documentation
    │   ├── example-01.md           # Common use cases
    │   └── example-02.md           # Advanced patterns
    ├── scripts/                    # Helper scripts (if INCLUDE_SCRIPTS=true)
    │   └── helper.sh
    └── resources/                  # Additional documentation
        ├── api-reference.md        # Key API summary
        └── README.md               # Skill usage guide
```

## Workflow

### Phase 1: Documentation Analysis

1. **Fetch Documentation**
   - Navigate to provided DOCS_URL
   - Identify documentation structure (sidebar, navigation, sections)
   - Detect documentation type (API reference, tutorial, guide, library docs)

2. **Extract Key Information**
   - Library/framework name and purpose
   - Core concepts and terminology
   - API patterns and methods
   - Configuration options
   - Common use cases and examples
   - Best practices and anti-patterns
   - Version information

3. **Map Documentation Structure**
   - Identify main sections and topics
   - Extract code examples
   - Note dependencies and requirements
   - Capture troubleshooting information

### Phase 2: Skill Design

4. **Determine Skill Scope**
   - Define focused purpose based on documentation
   - Identify when developers would use this skill
   - Select most valuable patterns to include
   - Ensure cross-platform compatibility

5. **Validate Skill Name**
   - Use provided SKILL_NAME or infer from documentation
   - Ensure lowercase-with-hyphens format
   - Verify uniqueness against existing skills
   - Keep under 64 characters

6. **Craft Description**
   - Start with what the skill does
   - Include when to use it
   - Mention key capabilities
   - Keep under 1024 characters

### Phase 3: Skill Generation

7. **Create Directory Structure**
   ```
   .github/skills/[skill-name]/
   ├── SKILL.md
   ├── examples/
   ├── scripts/        # if requested
   └── resources/
   ```

8. **Generate SKILL.md Content**
   - YAML frontmatter with name and description
   - Purpose section from documentation overview
   - When to Use section from use cases
   - Instructions extracted from documentation patterns
   - Examples converted from documentation code samples
   - Resources referencing skill directory files
   - Success criteria based on common tasks

9. **Generate Supporting Files**
   - `examples/`: Practical code examples from docs
   - `resources/api-reference.md`: Key API summary
   - `scripts/`: Helper utilities (if INCLUDE_SCRIPTS=true)

### Phase 4: Validation & Integration

10. **Quality Checks**
    - [ ] YAML frontmatter valid
    - [ ] Name is lowercase-with-hyphens (≤64 chars)
    - [ ] Description is clear and specific (≤1024 chars)
    - [ ] Instructions are actionable
    - [ ] Examples are practical and runnable
    - [ ] No platform-specific dependencies
    - [ ] All paths are relative

11. **Integration Steps**
    - Suggest AGENTS.md updates
    - Recommend related agent/instruction integrations
    - Provide activation test scenarios

## Documentation Analysis Guidelines

### Supported Documentation Types

| Doc Type | Analysis Focus | Skill Output |
|----------|----------------|--------------|
| API Reference | Methods, parameters, return types | Code generation patterns |
| Tutorial | Step-by-step workflows | Guided implementation skill |
| Library Docs | Installation, config, usage | Integration patterns |
| Framework Docs | Architecture, components, lifecycle | Development patterns |
| Tool Docs | CLI commands, options, workflows | Automation skill |

### Extraction Patterns

**From Code Examples**:
- Convert inline examples to skill examples
- Extract common patterns and idioms
- Identify best practice implementations

**From Conceptual Content**:
- Summarize core concepts in Purpose section
- Create "When to Use" from use case descriptions
- Build instructions from setup/usage guides

**From API Documentation**:
- List key methods in Resources
- Create quick reference in api-reference.md
- Generate examples showing common API usage

### Depth Modes

| Mode | Coverage | Best For |
|------|----------|----------|
| `quick` | Overview + top 3 use cases | Simple libraries, quick reference |
| `standard` | Core concepts + common patterns | Most documentation |
| `comprehensive` | Full API coverage + advanced topics | Complex frameworks |

## Quality Requirements

### SKILL.md Must Include

1. **Frontmatter**
   ```yaml
   ---
   name: [extracted-skill-name]
   description: [Clear description with usage triggers]
   ---
   ```

2. **Purpose Section**
   - What the library/framework/tool does
   - Why developers use it
   - Key benefits

3. **When to Use Section**
   - Specific scenarios that trigger skill activation
   - Types of tasks this skill helps with
   - Prerequisites or context needed

4. **Instructions Section**
   - Step-by-step patterns from documentation
   - Configuration guidance
   - Integration approaches

5. **Examples Section**
   - At least 2 practical code examples
   - Common use cases covered
   - Working, tested code

6. **Resources Section**
   - Links to skill directory files
   - Reference to original documentation

7. **Success Criteria**
   - Measurable outcomes
   - Validation checkpoints

## Output Summary

After generation, provide:

1. **Skill Overview**
   - Name: `[skill-name]`
   - Location: `.github/skills/[skill-name]/`
   - Source: `[DOCS_URL]`
   - Files created

2. **Documentation Analysis Summary**
   - Library/framework identified
   - Version detected (if available)
   - Key concepts extracted
   - Patterns captured

3. **Usage Guidance**
   ```
   The skill will automatically activate when you:
   - [Trigger from documentation use cases]
   - [Pattern from common tasks]
   - [Scenario from troubleshooting sections]
   ```

4. **Verification Checklist**
   - [ ] Enable chat.useAgentSkills in VS Code
   - [ ] Test skill discovery with relevant prompt
   - [ ] Verify examples execute correctly
   - [ ] Check resource file accessibility

5. **Next Steps**
   - Update AGENTS.md with skill reference
   - Consider related instructions to create
   - Test cross-platform compatibility

## Refinement Commands

| Command | Action |
|---------|--------|
| `refine: concise` | Reduce skill to essential patterns only |
| `refine: expand` | Add more examples and edge cases |
| `refine: api-focus` | Emphasize API reference content |
| `refine: tutorial-focus` | Emphasize step-by-step workflows |
| `refine: troubleshooting` | Add common issues and solutions |

## Example Output Structure

```markdown
---
name: react-hooks
description: React Hooks patterns for state and side effects. Use when building functional React components with useState, useEffect, useContext, or custom hooks.
---

<!-- Invocation banner -->

# React Hooks Skill (v1.0)

## Purpose
Provides patterns and best practices for using React Hooks...

## When to Use This Skill
- Creating functional components with state
- Managing side effects in React
- Building custom hooks
- Migrating class components to hooks

## Instructions

### Step 1: State Management with useState
[Patterns extracted from documentation...]

### Step 2: Side Effects with useEffect
[Patterns extracted from documentation...]

## Examples

### Example 1: Counter Component
\`\`\`jsx
// Extracted from React documentation
\`\`\`

### Example 2: Data Fetching
\`\`\`jsx
// Extracted from React documentation
\`\`\`

## Resources
- [API Reference](./resources/api-reference.md)
- [Custom Hooks Guide](./examples/custom-hooks.md)
- [Original Documentation](https://react.dev/reference/react)

## Success Criteria
- [ ] Component renders without errors
- [ ] State updates trigger re-renders
- [ ] Effects clean up properly
```

## Best Practices

1. **Source Attribution**: Always reference original documentation URL
2. **Focused Extraction**: Don't try to capture everything—focus on most valuable patterns
3. **Practical Examples**: Convert documentation examples to runnable code
4. **Cross-Platform**: Ensure skill works outside VS Code (no terminal dependencies)
5. **Version Awareness**: Note documentation version in resources
6. **Update Path**: Document how to refresh skill when docs update

## Anti-Patterns to Avoid

❌ **Don't copy entire documentation**: Extract patterns and examples, don't duplicate
❌ **Don't include deprecated content**: Focus on current best practices
❌ **Don't create overly broad skills**: Split large frameworks into focused skills
❌ **Don't assume specific versions**: Make patterns version-flexible when possible
❌ **Don't ignore licensing**: Respect documentation licensing and attribution

## Error Handling

| Issue | Resolution |
|-------|------------|
| URL inaccessible | Verify URL, check for redirects, report access error |
| Documentation structure unclear | Fall back to `quick` depth, request user guidance |
| No code examples found | Focus on conceptual content, generate synthetic examples |
| Existing skill conflict | Suggest merge or rename with `-v2` suffix |
| Documentation too large | Suggest splitting into multiple focused skills |

---

## Standards Compliance

**Format**: Agent Skills (agentskills.io)
**VS Code Support**: v1.108+ (Preview)
**File Structure**: `.github/skills/[name]/SKILL.md`
**Frontmatter**: YAML with required fields (name, description)

---

**Created**: 2026-01-14 | **Framework**: CopilotCustomizer
**Purpose**: Generate skills from external documentation

**Log Entry Format**:
```
[YYYY-MM-DD HH:MM:SS UTC] - Invoked by: {user/system} | Context: {brief description}
```

**Recent Invocations**:
_Manual logging - update this section when invoked_
- [2026-01-14] Initial creation

### Usage Guidelines
- This asset should be invoked when: User wants to create a skill from external documentation
- Expected outcome: New skill directory with SKILL.md and supporting files
- Related assets: NewSkill.prompt.md, GenerateSkill.instructions.md

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Initial creation | CopilotCustomizer |

---

---

## Audit
Last invoked: [Manual log]
Change history: v1.0 (2026-01-14) - Initial creation
