# HOW-TO: Copilot Customizer Guide

A comprehensive guide for using, customizing, and extending the Copilot Customizer system for VS Code GitHub Copilot.

## 📖 Table of Contents

1. [Getting Started](#-getting-started)
2. [Understanding Asset Types](#-understanding-asset-types)
3. [Creating Custom Assets](#-creating-custom-assets)
4. [Advanced Workflows](#-advanced-workflows)
5. [Best Practices](#-best-practices)
6. [Troubleshooting](#-troubleshooting)
7. [Examples](#-examples)

## 🚀 Getting Started

### Setting Up Your Development Environment

1. **Install Prerequisites**:
   ```bash
   # Ensure you have VS Code with Copilot extension
   # No additional dependencies required
   ```

2. **Initialize in Your Project**:
   ```bash
   # Option 1: Copy entire system
   cp -r .github /path/to/your/project/

   # Option 2: Selective asset copying
   mkdir -p your-project/.github/{agents,instructions,prompts,templates}
   cp .github/agents/CopilotCustomizer.agent.md your-project/.github/agents/
   ```

3. **Verify Installation**:
   - Open VS Code in your project directory
   - Open Copilot Chat (`Ctrl+Shift+I`)
   - Access CopilotCustomizer chat mode
   - You should see the customizer respond

### First Steps with the Customizer

1. **Basic Health Check**:
   ```
   Use CopilotCustomizer mode: "refine: audit"
   ```

2. **Explore Capabilities**:
   ```
   Use CopilotCustomizer mode: "What can you help me with?"
   ```

3. **Generate Your First Asset**:
   ```
   Use CopilotCustomizer mode: "Create a simple code reviewer chat mode"
   ```

## 🧩 Understanding Asset Types

### Agent Files (`*.agent.md`)

Agent files define AI personas with specific behaviors, capabilities, and interaction patterns.

**Structure**:
```markdown
description: 'Brief description'
schemaVersion: '1.0'
depthModes: ['quick-advice', 'standard', 'deep-architecture']
refinementCommands: ['refine: audit', 'refine: optimize']
tools: []

## Copilot Agent: [Name]

### Role
[Persona definition and capabilities]

### Core Objectives
1. **Objective 1**: Description
2. **Objective 2**: Description

### Workflow
[Step-by-step process]

### Depth Modes
| Mode | Use Case | Output |
|------|----------|--------|
| quick-advice | Fast help | Brief responses |
| standard | Normal use | Full analysis |
| deep-architecture | Complex tasks | Comprehensive output |
```

**Key Features**:
- **Depth Modes**: Different levels of detail (quick-advice, standard, deep-architecture)
- **Refinement Commands**: Interactive improvement options
- **Structured Workflows**: Clear step-by-step processes
- **Quality Checklists**: Built-in validation criteria

### Instruction Files (`*.instructions.md`)

Instructions provide detailed guidance for AI behavior and code generation rules.

**Structure**:
```markdown
applyTo: ['**/*']  # File patterns
schemaVersion: '1.2'
refinementCommands: ['refine: validate', 'refine: optimize']
depthModes: ['standard']

## [Instruction Set Name]

### Context Overview
[Background and purpose]

### Objective
[Clear goal statement]

### Rules and Guidelines
[Detailed behavioral instructions]
```

### Prompt Files (`*.prompt.md`)

Prompts are structured templates for consistent AI interactions.

**Structure**:
```markdown
mode: ask  # or 'generate', 'analyze'
## [Prompt Name]
Agent Mode Binding: `agents/[AgentMode].agent.md`
Paired Instructions: `instructions/[Instructions].instructions.md`

Task Intent: [Clear purpose statement]

### Usage Instructions
1. [Step 1]
2. [Step 2]

### Variable Block
---
Required Field [REQUIRED]: "{VARIABLE_NAME}"
Optional Field (default: value): "{OPTIONAL_VARIABLE}"
---
```

### Agent Files (`AGENTS.md`, `.agent.md`)

Agent files provide project-specific guidance for AI coding assistants.

**Structure**:
```markdown
## Project Overview
[One-paragraph summary]

## Quick Start
### Install & Build
```bash
npm install
npm run build
```

### Testing
```bash
npm test
npm run lint
```

## Code Style
- Use TypeScript strict mode
- Follow ESLint configuration
- Prefer functional patterns

## PR Instructions
- Title format: `type(scope): description`
- Run tests before submitting
- Include changeset for releases
```

### Template Files (`*.template.md`)

Templates provide standardized formats for analysis and documentation.

## 🎯 Creating Custom Assets

### Method 1: Using the Customizer Chat Mode

This is the recommended approach for most users.

#### Creating a New Agent File

1. **Basic Generation**:
   ```
   Use CopilotCustomizer mode: "I need an agent for database optimization"
   ```

2. **With Specific Requirements**:
   ```
   Use CopilotCustomizer mode: "Create an agent with these requirements:
   - Focus: PostgreSQL performance tuning
   - Depth modes: quick-advice, standard, expert
   - Capabilities: query analysis, index optimization, explain plan review"
   ```

3. **Using the Structured Prompt**:
   ```
   Use CopilotCustomizer mode with NewCopilotAgent prompt:
   Persona Name: Database Performance Expert
   Primary Objective: Optimize PostgreSQL databases for maximum performance
   ```

#### Creating Instruction Files

1. **Direct Request**:
   ```
   Use CopilotCustomizer mode: "Generate instructions for React component testing"
   ```

2. **With Context**:
   ```
   Use CopilotCustomizer mode: "Create instructions that enforce:
   - Jest + React Testing Library
   - 90% test coverage requirement
   - Accessibility testing with jest-axe
   - Snapshot testing for UI components"
   ```

#### Creating Prompt Files

1. **Interactive Creation**:
   ```
   Use CopilotCustomizer mode: "I need a prompt for generating API documentation"
   ```

2. **Structured Approach**:
   ```
   Use CopilotCustomizer mode with NewPrompt template:
   Purpose: Generate OpenAPI 3.0 specifications
   Input: TypeScript interfaces and route handlers
   Output: Complete API documentation
   ```

### Method 2: Manual Creation

For advanced users who want full control over the asset structure.

#### Step-by-Step Manual Process

1. **Create the File Structure**:
   ```bash
   mkdir -p .github/{agents,instructions,prompts}
   ```

2. **Follow the Schema**:
   - Copy an existing asset as a template
   - Update the metadata (description, schemaVersion, etc.)
   - Customize the content sections
   - Validate against the schema requirements

3. **Test the Asset**:
   - Reload VS Code or restart Copilot
   - Test the new functionality
   - Use CopilotCustomizer mode with "refine: audit" to validate

### Asset Naming Conventions

| Asset Type | Pattern | Example |
|------------|---------|---------||
| Agent Files | `[PascalCase].agent.md` | `DatabaseExpert.agent.md` |
| Instructions | `[PascalCase].instructions.md` | `ReactTesting.instructions.md` |
| Prompts | `[PascalCase].prompt.md` | `APIDocumentation.prompt.md` |
| Templates | `[PascalCase].template.md` | `ProjectAnalysis.template.md` |
| Agent Files | `AGENTS.md` or `.agent.md` | `AGENTS.md` |

## 🔧 Advanced Workflows

### Asset Optimization and Maintenance

#### Running Quality Audits

1. **Full Repository Audit**:
   ```
   Use CopilotCustomizer mode: "refine: audit"
   ```

2. **Focused Asset Review**:
   ```
   Use CopilotCustomizer mode: "Audit only the chat modes in this repository"
   ```

3. **Optimization Analysis**:
   ```
   Use CopilotCustomizer mode: "refine: optimize"
   ```

#### Batch Asset Updates

1. **Version Migration**:
   ```
   Use CopilotCustomizer mode: "Update all assets to schema version 1.2"
   ```

2. **Standard Alignment**:
   ```
   Use CopilotCustomizer mode: "Ensure all chat modes follow the latest Harmony conventions"
   ```

### Repository Analysis and Enhancement

#### Comprehensive Repository Review

1. **Initial Analysis**:
   ```
   Use CopilotCustomizer mode: "Analyze this repository and recommend Copilot customizations"
   ```

2. **Gap Analysis**:
   ```
   Use CopilotCustomizer mode: "What customizations are missing for a TypeScript/React project?"
   ```

3. **Integration Planning**:
   ```
   Use CopilotCustomizer mode: "How can I integrate this with my existing CI/CD pipeline?"
   ```

### Custom Workflow Creation

#### Building Specialized Pipelines

1. **Development Workflow**:
   ```markdown
   # Example: Test-Driven Development Mode
   Use CopilotCustomizer mode: "Create a chat mode that:
   - Always asks for test cases first
   - Generates failing tests
   - Implements code to pass tests
   - Refactors for clean code"
   ```

2. **Code Review Workflow**:
   ```markdown
   # Example: Security-First Review Mode
   Use CopilotCustomizer mode: "Design a reviewer that:
   - Scans for security vulnerabilities
   - Checks OWASP Top 10 issues  
   - Validates input sanitization
   - Reviews authentication/authorization"
   ```

### Integration with External Tools

#### CI/CD Pipeline Integration

1. **Asset Validation in CI**:
   ```yaml
   # .github/workflows/validate-assets.yml
   name: Validate Copilot Assets
   on: [push, pull_request]
   jobs:
     validate:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Validate Asset Schemas
           run: |
             # Custom validation script
             ./scripts/validate-copilot-assets.sh
   ```

2. **Automated Asset Generation**:
   ```yaml
   # .github/workflows/generate-assets.yml
   name: Generate Missing Assets
   on:
     schedule:
       - cron: '0 0 * * 0'  # Weekly
   jobs:
     generate:
       runs-on: ubuntu-latest
       steps:
         - name: Generate missing customizations
           run: |
             # Use the customizer to create assets
             # based on repository analysis
   ```

## 💡 Best Practices

### Asset Design Principles

1. **Single Responsibility**: Each asset should have a clear, focused purpose
2. **Composability**: Assets should work well together and reference each other appropriately
3. **Versioning**: Always include schema versions and update systematically
4. **Documentation**: Include clear descriptions and usage examples
5. **Testing**: Validate assets in real scenarios before deployment

### Performance Optimization

1. **Token Efficiency**:
   - Use concise language in prompts and instructions
   - Avoid unnecessary repetition
   - Leverage references instead of duplicating content

2. **Response Speed**:
   - Design depth modes for different use cases
   - Implement quick-advice modes for simple queries
   - Use refinement commands for iterative improvement

3. **Memory Management**:
   - Keep instruction files focused and specific
   - Use modular design to avoid large monolithic assets
   - Reference external documentation instead of embedding

### Security and Privacy

1. **Sensitive Information**:
   - Never embed API keys or secrets in assets
   - Use environment variables or secure vaults
   - Review generated content for accidental information leakage

2. **Access Control**:
   - Consider who has access to custom chat modes
   - Implement appropriate guardrails for sensitive operations
   - Document security considerations in agent files

### Maintenance and Evolution

1. **Regular Auditing**:
   ```bash
   # Weekly asset health check
   Use CopilotCustomizer mode: "refine: audit"
   ```

2. **Version Management**:
   - Track schema versions across all assets
   - Plan migration strategies for major updates
   - Maintain backward compatibility when possible

3. **Documentation Updates**:
   - Keep README and HOW-TO guides current
   - Update examples when patterns change
   - Document breaking changes and migration paths

## 🔍 Troubleshooting

### Common Issues and Solutions

#### Agent Mode Not Recognized

**Symptoms**: Agent mode doesn't autocomplete or respond

**Solutions**:
1. **Check File Location**: Ensure the `.agent.md` file is in `.github/agents/`
2. **Verify Syntax**: Use CopilotCustomizer mode with "refine: audit" to check for errors
3. **Restart VS Code**: Sometimes required after adding new modes
4. **Check Permissions**: Ensure Copilot has access to the workspace

#### Instructions Not Applied

**Symptoms**: AI behavior doesn't follow custom instructions

**Solutions**:
1. **Validate File Pattern**: Check `applyTo` patterns in instruction files
2. **Schema Compliance**: Ensure proper YAML frontmatter format
3. **Precedence Issues**: Review instruction priority and conflicts
4. **File Encoding**: Ensure UTF-8 encoding without BOM

#### Prompts Not Working

**Symptoms**: Prompt files don't provide expected structure

**Solutions**:
1. **Mode Configuration**: Verify the `mode:` field (ask, generate, analyze)
2. **Variable Syntax**: Check `{VARIABLE_NAME}` formatting
3. **Binding References**: Ensure linked chat modes and instructions exist
4. **Template Validation**: Test variable substitution manually

#### Performance Issues

**Symptoms**: Slow responses or timeouts

**Solutions**:
1. **Optimize Assets**: Use CopilotCustomizer mode with "refine: optimize"
2. **Reduce Complexity**: Simplify overly detailed instructions
3. **Use Depth Modes**: Implement quick-advice modes for fast responses
4. **Cache Strategy**: Consider caching frequently used responses

### Debugging Techniques

#### Asset Validation

1. **Syntax Checking**:
   ```
   Use CopilotCustomizer mode: "Validate the syntax of all my agent files"
   ```

2. **Cross-Reference Analysis**:
   ```
   Use CopilotCustomizer mode: "Check for broken references between assets"
   ```

3. **Schema Compliance**:
   ```
   Use CopilotCustomizer mode: "Verify all assets follow the latest schema requirements"
   ```

#### Behavior Testing

1. **Isolated Testing**:
   - Test each asset individually
   - Use minimal examples to isolate issues
   - Compare behavior with and without customizations

2. **Integration Testing**:
   - Test asset interactions and dependencies
   - Verify depth modes and refinement commands
   - Check end-to-end workflows

#### Performance Profiling

1. **Response Time Analysis**:
   - Measure time to first response
   - Compare simple vs. complex queries
   - Monitor token usage and efficiency

2. **Resource Usage**:
   - Check VS Code memory usage
   - Monitor Copilot extension performance
   - Analyze asset loading times

### Getting Help

#### Community Resources

1. **Documentation**:
   - [VS Code Copilot Customization Docs](https://code.visualstudio.com/docs/copilot/customization/overview)
   - [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
   - [VS Code Extension API](https://code.visualstudio.com/api)

2. **Support Channels**:
   - Internal issue tracking for bug reports
   - VS Code documentation for technical questions
   - Enterprise support for VS Code and Copilot issues

3. **Professional Support**:
   - GitHub Support for Copilot issues
   - Microsoft Support for VS Code problems
   - Internal training and development resources

## 📝 Examples

### Example 1: Creating a Test-Driven Development Agent

#### Step 1: Generate the Agent File
```
Use CopilotCustomizer mode:
"Create an agent with:
Persona Name: TDD Coach
Primary Objective: Guide developers through test-driven development practices
Depth Modes: quick-advice, standard, comprehensive
Capabilities: test planning, test writing, implementation guidance, refactoring advice"
```

#### Step 2: Customize the Generated Asset
```markdown
description: 'Test-Driven Development coaching and guidance'
schemaVersion: '1.0'
depthModes: ['quick-advice', 'standard', 'comprehensive']
refinementCommands: ['refine: test-focus', 'refine: coverage', 'refine: patterns']

## Copilot Agent: TDD Coach

### Role
Expert in test-driven development practices, guiding developers through the Red-Green-Refactor cycle with emphasis on writing effective tests first, implementing minimal code to pass, and refactoring for clean, maintainable solutions.

### Core Objectives
1. **Test Planning**: Help design comprehensive test suites before implementation
2. **Red Phase**: Guide writing of failing tests that define desired behavior
3. **Green Phase**: Assist with minimal implementation to make tests pass
4. **Refactor Phase**: Improve code quality while maintaining test coverage

### Workflow
1. **Understand Requirements**: Clarify what needs to be built
2. **Design Test Cases**: Plan test scenarios covering edge cases
3. **Write Failing Tests**: Create tests that define expected behavior
4. **Implement Code**: Write minimal code to make tests pass
5. **Refactor**: Improve code quality and design
6. **Repeat**: Continue cycle for additional features
```

#### Step 3: Create Supporting Instructions
```
Use CopilotCustomizer mode:
"Generate instructions for TDD practices that enforce:
- Tests must be written before implementation
- Each test should focus on a single behavior
- Implementation should be minimal to pass tests
- Refactoring should preserve all existing test behavior
- Code coverage should be maintained above 90%"
```

### Example 2: API Documentation Generator

#### Step 1: Create the Prompt File
```markdown
mode: generate
## API Documentation Generator
Agent Mode Binding: `agents/APIExpert.agent.md`
Paired Instructions: `instructions/APIDocumentation.instructions.md`

Task Intent: Generate comprehensive API documentation from TypeScript interfaces and route handlers.

### Usage Instructions
1. Provide TypeScript interface definitions
2. Include route handler implementations  
3. Specify output format (OpenAPI, Markdown, etc.)
4. Indicate any special requirements

### Variable Block
---
API Name [REQUIRED]: "{API_NAME}"
Input Files [REQUIRED]: "{INPUT_FILES}"
Output Format (default: OpenAPI 3.0): "{OUTPUT_FORMAT}"
Include Examples (default: true): "{INCLUDE_EXAMPLES}"
Authentication Method (default: none): "{AUTH_METHOD}"
---
```

#### Step 2: Use the Prompt
```
Use CopilotCustomizer mode with API Documentation Generator:
API Name: User Management API
Input Files: src/routes/users.ts, src/models/User.ts
Output Format: OpenAPI 3.0
Include Examples: true
Authentication Method: JWT Bearer
```

### Example 3: Security Review Workflow

#### Step 1: Create Security-Focused Agent
```
Use CopilotCustomizer mode:
"Create a security reviewer agent that:
- Scans code for OWASP Top 10 vulnerabilities
- Checks for proper input validation
- Reviews authentication and authorization
- Validates secure coding practices
- Provides remediation guidance"
```

#### Step 2: Set Up Automated Reviews
```markdown
# In your AGENTS.md file
## Security Review Process

### Pre-commit Security Check
```bash
# Run security analysis
npm run security-scan

# Use Copilot for additional review
Use SecurityReviewer mode for commit review
```

### Code Review Checklist
- [ ] Input validation implemented
- [ ] SQL injection prevention verified  
- [ ] XSS protection in place
- [ ] Authentication properly implemented
- [ ] Authorization checks present
- [ ] Sensitive data properly handled
```

### Example 4: Custom Template Usage

#### Creating a Project Analysis Template
```markdown
# ProjectAnalysis.template.md
## Project Analysis Report

### Overview
**Project Name**: {PROJECT_NAME}
**Analysis Date**: {ANALYSIS_DATE}
**Analyst**: {ANALYST_NAME}

### Technical Stack
**Languages**: {LANGUAGES}
**Frameworks**: {FRAMEWORKS}
**Dependencies**: {DEPENDENCIES}

### Architecture Analysis
**Pattern**: {ARCHITECTURE_PATTERN}
**Strengths**: 
{STRENGTHS}

**Areas for Improvement**:
{IMPROVEMENTS}

### Recommendations
1. **Priority 1**: {HIGH_PRIORITY}
2. **Priority 2**: {MEDIUM_PRIORITY}
3. **Priority 3**: {LOW_PRIORITY}

### Implementation Plan
{IMPLEMENTATION_PLAN}
```

#### Using the Template
```
Use CopilotCustomizer mode with ProjectAnalysis template to analyze this React TypeScript project
```

## 🎓 Advanced Topics

### Custom Schema Development

For organizations that need specialized schemas:

1. **Define Schema Requirements**:
   ```yaml
   # custom-schema.yml
   schemaVersion: "2.0"
   organizationStandards:
     - complianceLevel: "enterprise"
     - securityRequirements: "high"
     - auditingEnabled: true
   ```

2. **Implement Validation Rules**:
   ```
   Use CopilotCustomizer mode:
   "Create instructions for validating against our custom enterprise schema"
   ```

### Multi-Repository Management

For managing customizations across multiple projects:

1. **Centralized Asset Repository**:
   ```bash
   # Create a shared customizations repository
   git submodule add https://github.com/org/copilot-customizations .github/shared
   ```

2. **Asset Synchronization**:
   ```
   Use CopilotCustomizer mode:
   "Generate a workflow for syncing customizations across 20+ repositories"
   ```

### Performance Monitoring

Track the effectiveness of your customizations:

1. **Usage Analytics**:
   ```
   Use CopilotCustomizer mode:
   "Create instructions for tracking chat mode usage and effectiveness"
   ```

2. **Quality Metrics**:
   - Response accuracy rates
   - User satisfaction scores  
   - Task completion times
   - Asset utilization statistics

---

## 📚 Additional Resources

- **[VS Code Copilot Customization Documentation](https://code.visualstudio.com/docs/copilot/customization/overview)**
- **[GitHub Copilot Best Practices](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot)**
- **[Agents.md Examples](https://agents.md/#examples)**

---

*Enterprise customization framework for VS Code GitHub Copilot*