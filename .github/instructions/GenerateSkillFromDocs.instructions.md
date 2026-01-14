---
applyTo: '.github/skills/**/*'
description: 'Framework for generating Agent Skills by analyzing external documentation websites'
---

<!-- ════════════════════════════════════════════════════════════════════════════
📢 INVOCATION: GenerateSkillFromDocs Instructions (Instructions) v1.0
   STATUS: Instructions Applied — Context loaded
════════════════════════════════════════════════════════════════════════════ -->

# Generate Skill from Documentation Instructions (v1.0)

## Purpose

Framework for creating Agent Skills (agentskills.io open standard) by analyzing external documentation websites. This instruction set guides the extraction of patterns, APIs, and best practices from documentation into reusable cross-platform skills.

**Paired Prompt**: [SkillFromDocs.prompt.md](../prompts/SkillFromDocs.prompt.md)

## When to Apply

Use these instructions when:
- User provides a documentation URL to generate a skill from
- Converting library/framework documentation into AI capabilities
- Creating skills from API references
- Building development assistance from tool documentation

## Documentation Analysis Framework

### Phase 1: URL Processing and Validation

1. **Validate Documentation URL**
   - Confirm URL is accessible
   - Detect documentation platform (GitBook, Docusaurus, ReadTheDocs, custom)
   - Identify main entry point vs deep link

2. **Map Site Structure**
   - Locate navigation/sidebar elements
   - Identify section hierarchy
   - Note versioning (if present)
   - Find API reference sections
   - Locate examples and tutorials

3. **Determine Documentation Type**
   | Type | Indicators | Analysis Approach |
   |------|------------|-------------------|
   | API Reference | Method signatures, parameters, returns | Extract method patterns |
   | Tutorial | Numbered steps, "Getting Started" | Extract workflow patterns |
   | Conceptual | Architecture diagrams, explanations | Extract mental models |
   | Library | Installation, imports, usage | Extract integration patterns |
   | CLI Tool | Commands, flags, options | Extract command patterns |

### Phase 2: Content Extraction

4. **Core Information Extraction**

   **Required Extractions**:
   - Project/library name
   - Primary purpose (1-2 sentences)
   - Target audience (developers, devops, data scientists)
   - Key concepts and terminology
   - Installation/setup requirements

   **Pattern Extraction**:
   - Common code patterns (3-5 most important)
   - Configuration patterns
   - Integration patterns
   - Error handling patterns

   **Example Extraction**:
   - Working code examples (prioritize "getting started")
   - Complete, runnable snippets
   - Real-world use cases

5. **API Surface Analysis**

   For API documentation, extract:
   ```
   - Primary functions/methods
   - Key classes/types
   - Configuration options
   - Event handlers/callbacks
   - Return value patterns
   ```

6. **Best Practices Identification**

   Look for:
   - "Best Practices" or "Recommendations" sections
   - "Common Mistakes" or "Pitfalls" sections
   - Performance optimization tips
   - Security considerations
   - Testing approaches

### Phase 3: Skill Design

7. **Scope Determination**

   **Focused Skill Principle**: One skill should address one capability area.

   For large documentation sets, consider splitting:
   ```
   react-docs → react-hooks, react-components, react-context
   aws-docs → aws-s3, aws-lambda, aws-dynamodb
   django-docs → django-models, django-views, django-rest
   ```

   **Decision Criteria**:
   - If documentation has 5+ major sections → Consider multiple skills
   - If API has 50+ methods → Focus on most common 10-15
   - If framework has distinct features → One skill per feature area

8. **Name Derivation**

   **If SKILL_NAME not provided**, derive from:
   1. Library/framework name
   2. Primary capability
   3. Technology stack

   **Naming Rules**:
   - Lowercase with hyphens: `react-hooks`, `fastapi-endpoints`
   - Be specific: `playwright-testing` not `testing`
   - Include technology: `python-asyncio` not `async-programming`
   - Maximum 64 characters

9. **Description Crafting**

   **Formula**:
   ```
   [What it does] for/with [technology/domain].
   Use when [primary trigger scenario].
   Provides [key capabilities list].
   ```

   **Example**:
   ```
   Automated API endpoint testing with Playwright and TypeScript.
   Use when creating end-to-end tests for REST APIs.
   Provides request patterns, assertion helpers, and test organization.
   ```

   **Requirements**:
   - Maximum 1024 characters
   - Must include trigger conditions (for AI activation)
   - Action-oriented language

### Phase 4: Content Generation

10. **SKILL.md Structure**

    ```markdown
    ---
    name: [derived-or-provided-name]
    description: [crafted description with triggers]
    ---

    <!-- Invocation banner -->

    # [Display Name] Skill (v1.0)

    ## Purpose
    [2-3 sentences summarizing library purpose from docs]

    ## When to Use This Skill
    - [Scenario 1 from use cases]
    - [Scenario 2 from common tasks]
    - [Scenario 3 from troubleshooting]

    ## Prerequisites
    - [Installation requirements from docs]
    - [Dependencies from docs]
    - [Environment setup from docs]

    ## Instructions

    ### Step 1: [Setup/Installation]
    [From getting started section]

    ### Step 2: [Core Usage Pattern]
    [From primary documentation]

    ### Step 3: [Common Workflow]
    [From tutorials/guides]

    ### Step 4: [Advanced Pattern] (if applicable)
    [From advanced sections]

    ## Examples

    ### Example 1: [Basic Use Case]
    \`\`\`[language]
    [Code from documentation - adapted for completeness]
    \`\`\`

    ### Example 2: [Common Scenario]
    \`\`\`[language]
    [Code from documentation - adapted for completeness]
    \`\`\`

    ### Example 3: [Real-World Application]
    \`\`\`[language]
    [Code combining patterns from documentation]
    \`\`\`

    ## Configuration Reference

    | Option | Default | Description |
    |--------|---------|-------------|
    | [option1] | [default] | [from docs] |
    | [option2] | [default] | [from docs] |

    ## Common Patterns

    ### [Pattern Name 1]
    [Pattern description and code]

    ### [Pattern Name 2]
    [Pattern description and code]

    ## Troubleshooting

    | Issue | Solution |
    |-------|----------|
    | [Common error 1] | [Solution from docs] |
    | [Common error 2] | [Solution from docs] |

    ## Resources

    - [API Reference](./resources/api-reference.md)
    - [Example Files](./examples/)
    - [Original Documentation]([DOCS_URL])

    ## Success Criteria

    - [ ] [Measurable outcome 1]
    - [ ] [Measurable outcome 2]
    - [ ] [Measurable outcome 3]

    ## Source Attribution

    This skill was generated from: [DOCS_URL]
    Documentation version: [version if detected]
    Generated: [date]

    [Traceability sections...]
    ```

11. **Supporting File Generation**

    **resources/api-reference.md**:
    ```markdown
    # [Library] API Quick Reference

    ## Core Functions
    | Function | Parameters | Returns | Description |
    |----------|------------|---------|-------------|
    | func1() | param1, param2 | ReturnType | Brief description |

    ## Key Types
    | Type | Fields | Usage |
    |------|--------|-------|
    | Type1 | field1, field2 | When to use |

    ## Configuration
    | Option | Type | Default | Description |
    |--------|------|---------|-------------|
    ```

    **examples/example-01.md**:
    ```markdown
    # [Use Case Title]

    ## Scenario
    [When you would use this pattern]

    ## Code
    \`\`\`[language]
    [Complete, runnable example]
    \`\`\`

    ## Explanation
    [Step-by-step breakdown]

    ## Variations
    [Alternative approaches]
    ```

### Phase 5: Quality Assurance

12. **Validation Checklist**

    **Frontmatter**:
    - [ ] Name is lowercase-with-hyphens
    - [ ] Name ≤ 64 characters
    - [ ] Description includes trigger words
    - [ ] Description ≤ 1024 characters

    **Content**:
    - [ ] Purpose clearly states library function
    - [ ] When to Use has 3+ specific scenarios
    - [ ] Instructions are step-by-step actionable
    - [ ] Examples are complete and runnable
    - [ ] Code examples have correct syntax highlighting

    **Portability**:
    - [ ] No VS Code-specific tool references
    - [ ] All paths are relative
    - [ ] No platform-specific commands
    - [ ] Works conceptually outside VS Code

    **Attribution**:
    - [ ] Source URL included
    - [ ] Version noted (if available)
    - [ ] Generated date recorded

13. **Cross-Platform Verification**

    Ensure skill content works for:
    - VS Code GitHub Copilot
    - GitHub Copilot CLI
    - Claude (Anthropic)
    - Cursor
    - Other agentskills.io compatible tools

## Depth Mode Specifications

### Quick Mode
- Extract: Name, purpose, top 3 use cases, 2 examples
- Skip: Full API reference, advanced patterns, troubleshooting
- Output: Minimal SKILL.md (~200 lines)
- Time: Fastest generation

### Standard Mode (Default)
- Extract: Core concepts, common patterns, 3-5 examples
- Include: Configuration reference, basic troubleshooting
- Output: Complete SKILL.md (~400 lines)
- Time: Balanced

### Comprehensive Mode
- Extract: Full API surface, all patterns, extensive examples
- Include: Complete API reference, advanced troubleshooting, edge cases
- Output: Full skill with extensive resources (~600+ lines)
- Time: Most thorough

## Documentation Platform Handling

### GitBook
- Look for sidebar navigation in left panel
- Follow chapter/page structure
- Code blocks in triple backticks

### Docusaurus
- Navigation in docs/ folder structure
- Category index pages
- MDX component examples

### ReadTheDocs
- Table of contents in sidebar
- Sphinx-style references
- Code-block directives

### MkDocs
- Navigation in mkdocs.yml
- Markdown with extensions
- Admonitions for notes/warnings

### Custom/Unknown
- Look for sitemap.xml
- Follow main navigation links
- Prioritize "Getting Started" and "API" sections

## Error Handling Procedures

| Scenario | Action |
|----------|--------|
| URL returns 404 | Report error, suggest checking URL |
| URL requires authentication | Report limitation, suggest public docs |
| Documentation in non-English | Attempt translation, note limitation |
| No code examples found | Generate synthetic examples from API descriptions |
| Incomplete documentation | Focus on available content, note gaps |
| Documentation too large | Suggest splitting into multiple skills |
| Conflicting information | Use most recent/versioned content |

## Integration Requirements

After skill generation:

1. **Update AGENTS.md** (if exists):
   ```markdown
   ### Skills
   - [new-skill-name] - [description] (Generated from [source])
   ```

2. **Suggest Related Assets**:
   - Instructions for coding standards related to library
   - Agent for automated workflows using library
   - Prompts for common library tasks

3. **Provide Test Scenarios**:
   ```
   Test skill activation by asking:
   - "How do I [common task] with [library]?"
   - "Show me [library] patterns for [use case]"
   - "Help me debug [library] [error type]"
   ```

## Best Practices Summary

1. **Extract, don't duplicate**: Patterns and examples, not entire docs
2. **Prioritize practicality**: Focus on what developers actually use
3. **Maintain attribution**: Always credit source documentation
4. **Ensure runnability**: Examples should work without modification
5. **Consider updates**: Note documentation version for future refreshes
6. **Respect scope**: One skill = one focused capability

---

**Generated**: 2026-01-14 | **Framework**: CopilotCustomizer
**Standard**: Agent Skills (agentskills.io) | **Scope**: Documentation-to-skill conversion

**Log Entry Format**:
```
[YYYY-MM-DD HH:MM:SS UTC] - Invoked by: {user/system} | Context: {brief description}
```

**Recent Invocations**:
_Manual logging - update this section when invoked_
- [2026-01-14] Initial creation

### Usage Guidelines
- This asset should be invoked when: Generating skills from external documentation
- Expected outcome: Structured skill extraction from documentation URLs
- Related assets: GenerateSkill.instructions.md, SkillFromDocs.prompt.md

### Change History
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-14 | v1.0 | Initial creation | CopilotCustomizer |

---

---

## Audit
Last invoked: [Manual log]
Change history: v1.0 (2026-01-14) - Initial creation
