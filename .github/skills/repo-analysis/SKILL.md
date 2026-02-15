---
name: repo-analysis
description: Deep repository analysis methodology for understanding codebase structure, dependencies, patterns, and change impact. Use when analyzing repositories for customization planning, refactoring, or understanding project architecture.
---

# Repository Analysis Skill

```
✨ SKILL ACTIVATED: repo-analysis
   Purpose: Deep repository analysis methodology
   Functionality: Structure discovery, tech stack detection, pattern recognition, dependency analysis
   Output: Structured analysis report with actionable insights
   Scope: Portable across VS Code, CLI, Claude, Cursor, and compatible agents
```

## Purpose
Provides systematic methodology for comprehensive repository analysis including structure mapping, dependency identification, pattern recognition, and impact assessment. Essential for informed decision-making before making changes.

## When to Use This Skill
- Analyzing repositories for Copilot customization opportunities
- Understanding codebase architecture before refactoring
- Assessing impact of proposed changes
- Identifying existing patterns and conventions
- Planning new feature implementation
- Evaluating tech stack and dependencies

## Analysis Framework

### Phase 1: Structure Discovery
**Objective**: Map repository organization and key components

**Steps**:
1. **Root Analysis**
   - Identify project type (API, CLI, library, web app)
   - Locate configuration files (package.json, tsconfig.json, etc.)
   - Scan for monorepo vs single-project structure

2. **Directory Mapping**
   - Source code organization (src/, lib/, app/)
   - Test structure (tests/, __tests__, spec/)
   - Documentation location (docs/, README files)
   - Build artifacts and configuration

3. **File Patterns**
   - Naming conventions (kebab-case, PascalCase, snake_case)
   - File organization by feature vs by type
   - Module structure and imports

**Output**: Repository structure map with key directories and file patterns

### Phase 2: Tech Stack Detection
**Objective**: Identify languages, frameworks, and tools

**Detection Criteria**:
```yaml
Languages:
  - File extensions (.ts, .py, .rs, .go, .cs)
  - Shebang lines in scripts
  - Language-specific patterns

Frameworks:
  - Package dependencies (package.json, requirements.txt, Cargo.toml)
  - Import statements (import React, from flask, use actix_web)
  - Configuration files (next.config.js, vue.config.js)

Tools:
  - Build systems (webpack, vite, cargo, dotnet)
  - Test frameworks (jest, pytest, xunit)
  - Linters/formatters (eslint, black, rustfmt)
```

**Output**: Complete tech stack inventory with versions

### Phase 2b: Standards Resolution
**Objective**: Discover and match enterprise coding standards

**Steps**:
1. **Scan** `.github/standards/` recursively for `*.md` files (skip `README.md`)
2. **Parse** YAML frontmatter from each file — extract `name`, `technologies`, `scope`, `priority`
3. **Match** standards against detected tech stack:
   - Collect all `scope: always` standards
   - For `scope: tech-match`, compare `technologies[]` against detected stack (case-insensitive)
4. **Sort** matched standards by priority (`high` > `medium` > `low`)
5. **Bundle** as `standardsContext` for downstream agents

**Edge Cases**:
- Empty or missing `.github/standards/` → skip this phase, proceed normally
- No technology matches → only `scope: always` standards apply
- Conflicting guidance → higher-priority standard wins

**Output**: Matched standards summary with key principles per standard

**Reference**: [Standards.instructions.md](../../instructions/Standards.instructions.md)

### Phase 3: Pattern Recognition
**Objective**: Identify architectural patterns and conventions

**Pattern Categories**:

1. **Architectural Patterns**
   - MVC, MVP, MVVM structure
   - Repository pattern usage
   - Dependency injection
   - Middleware chains
   - Plugin/extension systems

2. **Code Organization**
   - Feature folders vs layer folders
   - Module boundaries
   - Separation of concerns
   - Code splitting strategies

3. **Naming Conventions**
   - Function naming (camelCase, snake_case, descriptive)
   - Variable naming patterns
   - File naming standards
   - API endpoint naming

4. **Testing Patterns**
   - Test file co-location vs separation
   - Unit vs integration test organization
   - Test naming conventions
   - Mock/stub patterns

**Output**: Pattern catalog with examples from codebase

### Phase 4: Dependency Analysis
**Objective**: Map internal and external dependencies

**Internal Dependencies**:
- Module import chains
- Cross-feature references
- Shared utility usage
- Common types/interfaces

**External Dependencies**:
- NPM/pip/cargo packages
- Version constraints
- Deprecated dependencies
- Security vulnerabilities

**Dependency Mapping**:
```
Component A
  ├─→ Internal: UtilityB, ServiceC
  └─→ External: express@4.18, axios@1.6

Component B
  ├─→ Internal: SharedTypes, ConfigD
  └─→ External: lodash@4.17, winston@3.11
```

**Output**: Dependency graph with risk assessment

### Phase 5: Impact Assessment
**Objective**: Evaluate change risk and affected areas

**Impact Analysis**:

1. **Direct Impact**
   - Files that would be modified
   - Functions/classes that would change
   - API contracts affected

2. **Indirect Impact**
   - Files that import changed modules
   - Tests that cover changed code
   - Documentation requiring updates

3. **Risk Levels**
   ```
   LOW: Isolated changes, good test coverage
   MEDIUM: Cross-module changes, partial test coverage
   HIGH: Core infrastructure, API contracts, low test coverage
   ```

**Risk Factors**:
- Number of dependents
- Test coverage percentage
- Public API surface changes
- Breaking change potential
- Backward compatibility concerns

**Output**: Impact report with risk classification

### Phase 6: Existing Customization Audit
**Objective**: Identify current Copilot customizations

**Discovery**:
```bash
Check for:
  .github/agents/*.agent.md
  .github/instructions/*.instructions.md
  .github/prompts/*.prompt.md
  .github/skills/*/SKILL.md
  AGENTS.md
```

**Asset Inventory**:
- Count of each asset type
- Coverage analysis (what domains are customized)
- Gaps identification (what's missing)
- Quality assessment (schema compliance, completeness)

**Output**: Customization state report with recommendations

## Analysis Checklist

Use this checklist for comprehensive analysis:

- [ ] **Structure**
  - [ ] Project type identified
  - [ ] Directory structure mapped
  - [ ] Key files located
  - [ ] File naming patterns documented

- [ ] **Tech Stack**
  - [ ] Primary languages detected
  - [ ] Frameworks identified
  - [ ] Build tools documented
  - [ ] Dependencies inventoried

- [ ] **Patterns**
  - [ ] Architectural patterns recognized
  - [ ] Code organization understood
  - [ ] Naming conventions documented
  - [ ] Testing patterns identified

- [ ] **Dependencies**
  - [ ] Internal dependencies mapped
  - [ ] External packages listed
  - [ ] Version constraints noted
  - [ ] Security issues flagged

- [ ] **Impact**
  - [ ] Change scope defined
  - [ ] Affected files listed
  - [ ] Risk level assessed
  - [ ] Mitigation strategies planned

- [ ] **Standards**
  - [ ] Enterprise standards matched (if present)
  - [ ] Always-apply standards collected
  - [ ] Tech-match standards resolved against detected stack

- [ ] **Customization**
  - [ ] Existing assets inventoried
  - [ ] Coverage gaps identified
  - [ ] Quality issues noted
  - [ ] Enhancement opportunities listed

## Output Template

```markdown
## Repository Analysis Report

### Project Overview
- **Type**: [API/CLI/Web App/Library]
- **Primary Languages**: [List]
- **Key Frameworks**: [List with versions]
- **Build System**: [Tool and configuration]

### Structure
**Source Organization**:
- [Description of src/ structure]

**Test Organization**:
- [Description of test structure]

### Tech Stack
| Category | Technology | Version | Notes |
|----------|-----------|---------|-------|
| Language | TypeScript | 5.3 | Strict mode enabled |
| Framework | Express | 4.18 | RESTful API |
| Testing | Jest | 29.7 | Unit + integration |

### Patterns Identified
1. **Repository Pattern**: Data access abstraction
2. **Middleware Chain**: Request processing pipeline
3. **Dependency Injection**: Constructor-based DI

### Dependencies
**Critical Dependencies** (high usage):
- express: REST framework
- prisma: Database ORM
- zod: Runtime validation

**Risk Areas**:
- [List vulnerable or deprecated packages]

### Impact Assessment
**Proposed Change**: [Description]

**Direct Impact**:
- [Files to modify]

**Indirect Impact**:
- [Dependent files]

**Risk Level**: MEDIUM
- [Risk factors]

### Customization Status
**Existing Assets**:
- Agents: 3 (APIExpert, TestGen, Security)
- Instructions: 2 (Coding standards, API patterns)
- Prompts: 2 (Generate endpoint, Document API)
- Skills: 0

**Gaps Identified**:
- No debugging skills
- Missing deployment automation
- Security review workflows needed

### Matched Enterprise Standards
| Standard | Scope | Priority | Key Principles |
|----------|-------|----------|----------------|
| {name} | {always/tech-match} | {high/medium/low} | {summary} |

*Standards matched via Standards instruction. Principles will be integrated into generated assets.*

### Recommendations
1. [Specific recommendation]
2. [Specific recommendation]
3. [Specific recommendation]
```

## Best Practices

### Thoroughness
- Don't skip phases - complete analysis is critical
- Document patterns even if they seem obvious
- Note both good and problematic patterns

### Context Gathering
- Search broadly before narrowing focus
- Follow import chains to understand dependencies
- Check git history for recent change patterns

### Risk Assessment
- Be honest about risk levels
- Consider test coverage in risk evaluation
- Flag potential breaking changes early

### Communication
- Use clear, structured output format
- Provide specific examples from codebase
- Include actionable recommendations

## Integration with Other Skills

**Downstream** (feeds to):
- **planning** — Use analysis results to create implementation strategies
- **asset-design** — Inform design decisions for customization assets
- **documentation** — Document architecture and patterns discovered
- **orchestration** — Plan orchestrated systems based on complexity analysis

**Typical workflow**: 
```
repo-analysis (understand codebase) ← THIS SKILL
  ↓
planning (create strategy)
  ↓
[USER APPROVAL GATE] ✋
  ↓
Implementation
  ↓
documentation (capture outcomes)
```

**Integration benefits**: Analysis output provides essential context for downstream skills, reducing redundant discovery and improving decisions.

## Success Criteria

A complete repository analysis should provide:
- ✅ Clear understanding of project architecture
- ✅ Comprehensive tech stack inventory
- ✅ Documented patterns and conventions
- ✅ Dependency risk assessment
- ✅ Impact analysis for proposed changes
- ✅ Actionable recommendations

---

**Skill Type**: Analysis and Planning  
**Complexity**: Medium  
**Typical Duration**: 5-15 minutes (depending on repository size)  
**Prerequisites**: Repository access, ability to search codebase

**Cross-Platform**: Works in VS Code, GitHub Copilot CLI, Claude, Cursor, and other Skills-compatible agents.

## Integration with Other Skills

**Downstream** (feeds to):
- **planning** — Use analysis results to create implementation strategies
- **asset-design** — Inform design decisions for customization assets
- **documentation** — Document architecture and patterns discovered
- **orchestration** — Plan orchestrated systems based on complexity analysis

**Typical workflow**: 
```
repo-analysis (understand codebase) ← THIS SKILL
  ↓
planning (create strategy)
  ↓
[USER APPROVAL GATE] ✋
  ↓
Implementation
  ↓
documentation (capture outcomes)
```

**Works well with**:
- **planning** — Analyze codebase before creating implementation plan
- **asset-design** — Understand architecture before designing customizations
- **documentation** — Generate technical documentation from analysis
- **orchestration** — Assess complexity to recommend orchestration patterns

**Integration benefits**: Analysis output provides essential context for downstream skills, reducing redundant discovery and improving decisions.

---
