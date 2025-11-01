# External Repository Bootstrap Workflow

**Version**: 1.0  
**Type**: Fully Autonomous Asset Generation  
**Quality Gate**: Single (After Planning)  
**Created**: 2025-01-15

## Overview

Comprehensive workflow for bootstrapping GitHub Copilot customization assets in external repositories. Orchestrates complete lifecycle from repository analysis through documentation generation with minimal user input.

**Entry Point**: [ExternalRepoBootstrap.prompt.md](../prompts/ExternalRepoBootstrap.prompt.md)

## Architecture

### Workflow Chain
```
┌─────────────────────────────────┐
│ User Input                       │
│ (Repository Path)                │
└───────────┬─────────────────────┘
            ↓
┌───────────────────────────────────────┐
│ ExternalRepoBootstrap Agent           │
│ - Validate repository                 │
│ - Exclude CopilotCustomizer           │
│ - Pre-flight checks                   │
└───────────┬───────────────────────────┘
            ↓ [Auto Handoff]
┌───────────────────────────────────────┐
│ RepoAnalyzer Agent                    │
│ - Detect tech stack                   │
│ - Identify patterns                   │
│ - Assess complexity                   │
└───────────┬───────────────────────────┘
            ↓ [Auto Handoff]
┌───────────────────────────────────────┐
│ AssetPlanner Agent                    │
│ - Generate recommendations            │
│ - Create specifications               │
│ - Present plan                        │
└───────────┬───────────────────────────┘
            ↓ [USER GATE: "confirm"]
┌───────────────────────────────────────┐
│ AssetGenerator Agent                  │
│ - Create agent files                  │
│ - Create instruction files            │
│ - Create prompt files                 │
│ - Generate AGENTS.md                  │
└───────────┬───────────────────────────┘
            ↓ [Auto Handoff]
┌───────────────────────────────────────┐
│ VerificationAgent                     │
│ - Schema compliance                   │
│ - YAML validation                     │
│ - Tool approval check                 │
└───────────┬───────────────────────────┘
            ↓ [Auto Handoff]
┌───────────────────────────────────────┐
│ HarmonizationAgent                    │
│ - Bind cross-references               │
│ - Add metadata                        │
│ - Standardize terminology             │
│ - Validate handoff chains             │
└───────────┬───────────────────────────┘
            ↓ [Auto Handoff]
┌───────────────────────────────────────┐
│ VerificationAgent (Final)             │
│ - Verify cross-references             │
│ - Validate ecosystem                  │
│ - Check completeness                  │
└───────────┬───────────────────────────┘
            ↓ [Auto Handoff]
┌───────────────────────────────────────┐
│ DocumentationGenerator                │
│ - Create bootstrap report             │
│ - Document asset inventory            │
│ - Generate quick start guide          │
└───────────┬───────────────────────────┘
            ↓
┌─────────────────────────────────┐
│ Workflow Complete                │
│ (Ready-to-use Copilot assets)    │
└───────────────────────────────────┘
```

## Agent Specifications

### 1. ExternalRepoBootstrap (Entry Point)
**File**: `.github/agents/ExternalRepoBootstrap.agent.md`

**Responsibilities**:
- Gather repository path from user (single input)
- Validate repository exists
- Exclude CopilotCustomizer repository
- Run pre-flight checks
- Initiate handoff to RepoAnalyzer

**Handoff**: Automatic to RepoAnalyzer

**Tools**: `search`, `search/codebase`, `edit`, `new`

### 2. RepoAnalyzer
**File**: `.github/agents/RepoAnalyzer.agent.md` (existing)

**Responsibilities**:
- Detect tech stack (languages, frameworks)
- Identify architecture patterns
- Assess existing customization assets
- Determine complexity level
- Generate repository context

**Handoff**: Automatic to AssetPlanner

**Tools**: `search`, `search/codebase`, `changes`, `problems`

**Reuses**:
- CopilotFramework.instructions.md
- CopilotAudit.instructions.md
- FormatAssets.instructions.md

### 3. AssetPlanner (Quality Gate)
**File**: `.github/agents/AssetPlanner.agent.md`

**Responsibilities**:
- Analyze repository context
- Recommend agent files needed
- Recommend instruction files needed
- Recommend prompt files needed
- Create detailed specifications
- Risk assessment
- **WAIT FOR USER "confirm"**

**Handoff**: Conditional to AssetGenerator (requires confirmation)

**Tools**: `search`, `search/codebase`

**Reuses**:
- CopilotFramework.instructions.md
- CopilotAudit.instructions.md
- GenerateWorkflow.instructions.md

### 4. AssetGenerator
**File**: `.github/agents/AssetGenerator.agent.md`

**Responsibilities**:
- Parse specifications from AssetPlanner
- Generate all agent files (.agent.md)
- Generate all instruction files (.instructions.md)
- Generate all prompt files (.prompt.md)
- Create/update AGENTS.md
- Follow VS Code v1.105+ schema

**Handoff**: Automatic to VerificationAgent

**Tools**: `edit`, `new`, `search`

**Reuses**:
- GenerateCopilotAgent.instructions.md
- GenerateInstructions.instructions.md
- GeneratePrompt.instructions.md
- GenerateAgentsFile.instructions.md
- CopilotFramework.instructions.md

### 5. VerificationAgent (First Pass)
**File**: `.github/agents/VerificationAgent.agent.md` (existing)

**Responsibilities**:
- Schema compliance validation
- YAML front matter verification
- Tool approval pattern check
- Cross-reference existence check
- Report validation results

**Handoff**: Automatic to HarmonizationAgent

**Tools**: `search`, `problems`

### 6. HarmonizationAgent
**File**: `.github/agents/HarmonizationAgent.agent.md`

**Responsibilities**:
- Establish cross-references between assets
- Add metadata (versions, timestamps)
- Standardize terminology
- Validate handoff chains
- Create coherent asset ecosystem

**Handoff**: Automatic to VerificationAgent (final)

**Tools**: `edit`, `search`

**Reuses**:
- HarmonizeAssets.instructions.md
- CopilotFramework.instructions.md
- CopilotAudit.instructions.md

### 7. VerificationAgent (Final Pass)
**File**: `.github/agents/VerificationAgent.agent.md` (existing)

**Responsibilities**:
- Verify all cross-references resolved
- Validate complete ecosystem
- Check for orphaned assets
- Confirm handoff chain integrity
- Final quality assurance

**Handoff**: Automatic to DocumentationGenerator

**Tools**: `search`, `problems`

### 8. DocumentationGenerator
**File**: `.github/agents/DocumentationGenerator.agent.md` (existing)

**Responsibilities**:
- Create bootstrap summary report
- Document all generated assets
- Generate quick start guide
- Provide next steps
- Archive to output folder

**Handoff**: None (workflow complete)

**Tools**: `new`, `edit`

## Shared Instructions

### Primary Framework
**CopilotFramework.instructions.md** (Universal)
- Workflow standards
- Quality patterns
- Integration guidelines
- Token optimization

**CopilotAudit.instructions.md** (Quality)
- Audit dimensions
- Governance patterns
- Evaluation frameworks
- Metrics and KPIs

**CopilotSecurity.instructions.md** (Safety)
- Security guardrails
- Tool management
- MCP server trust
- Approval workflows

### Generation Instructions
**GenerateCopilotAgent.instructions.md**
- Agent file structure
- YAML schema v1.105+
- Role definitions
- Handoff patterns

**GenerateInstructions.instructions.md**
- Instruction file structure
- ApplyTo patterns
- Workflow templates
- Quality criteria

**GeneratePrompt.instructions.md**
- Prompt file structure
- Variable systems
- Mode selection (ask/agent/generate)
- Usage patterns

**GenerateAgentsFile.instructions.md**
- AGENTS.md structure
- Quick start sections
- Code style guidance
- PR instructions

### Operational Instructions
**RepoReview.instructions.md**
- Repository analysis patterns
- Tech stack detection
- Pattern identification
- Complexity assessment

**HarmonizeAssets.instructions.md**
- Cross-reference binding
- Metadata enhancement
- Terminology standardization
- Ecosystem integration

**FormatAssets.instructions.md**
- Asset formatting standards
- Schema compliance
- Content preservation
- Validation patterns

## Context Transfer Protocol

### 1. ExternalRepoBootstrap → RepoAnalyzer
```yaml
context:
  repositoryPath: string
  validationPassed: boolean
  preFlightChecks:
    exists: boolean
    isGit: boolean
    isVSCode: boolean
```

### 2. RepoAnalyzer → AssetPlanner
```yaml
context:
  repositoryPath: string
  techStack:
    languages: string[]
    frameworks: string[]
    patterns: string[]
  projectType: string
  complexity: 'LOW' | 'MEDIUM' | 'HIGH'
  existingAssets: string[]
  recommendations:
    agents: number
    instructions: number
    prompts: number
```

### 3. AssetPlanner → AssetGenerator
```yaml
context:
  specifications:
    agents: [
      {
        name: string
        role: string
        tools: string[]
        handoffs: object[]
        reusedInstructions: string[]
      }
    ]
    instructions: [
      {
        name: string
        applyTo: string
        purpose: string
        sections: string[]
      }
    ]
    prompts: [
      {
        name: string
        mode: 'ask' | 'agent' | 'generate'
        variables: object[]
        pairedInstructions: string
      }
    ]
  repositoryContext: object
  riskAssessment: object
```

### 4. AssetGenerator → VerificationAgent
```yaml
context:
  generatedFiles: [
    {
      path: string
      type: 'agent' | 'instruction' | 'prompt' | 'agents-md'
      lineCount: number
      status: 'success' | 'failed'
    }
  ]
  crossReferences: string[]
  schemaVersion: string
```

### 5. VerificationAgent → HarmonizationAgent
```yaml
context:
  validationResults:
    schemaCompliance: boolean
    yamlValid: boolean
    toolApprovalsValid: boolean
    issues: string[]
  assetInventory: string[]
  existingReferences: string[]
```

### 6. HarmonizationAgent → VerificationAgent (Final)
```yaml
context:
  harmonizationResults:
    crossReferencesAdded: number
    metadataApplied: boolean
    terminologyStandardized: boolean
    handoffChainsValidated: boolean
  ecosystemStatus:
    totalAssets: number
    totalReferences: number
    orphanedFiles: number
```

### 7. VerificationAgent → DocumentationGenerator
```yaml
context:
  finalValidation:
    allChecked: boolean
    crossReferencesResolved: boolean
    noOrphans: boolean
    ecosystemComplete: boolean
  assetSummary:
    agents: string[]
    instructions: string[]
    prompts: string[]
    agentsMd: string
  workflowMetrics:
    startTime: timestamp
    endTime: timestamp
    userInteractions: number
    handoffSuccess: number
```

## Quality Metrics

### Performance Targets
| Phase | Target Duration | Actual |
|-------|----------------|--------|
| Validation | <5s | - |
| Analysis | <60s | - |
| Planning | <90s | - |
| Generation | <120s/asset | - |
| Validation | <30s | - |
| Harmonization | <45s | - |
| Final Validation | <30s | - |
| Documentation | <30s | - |
| **Total** | **<5 minutes** | - |

### Success Criteria
- [ ] Repository validated as external (not CopilotCustomizer)
- [ ] Tech stack detected or manual input accepted
- [ ] Asset recommendations generated
- [ ] User interactions: <5 total (ideally 2: start + confirm)
- [ ] Handoff success rate: 90%+
- [ ] Schema compliance: 100%
- [ ] Cross-references: 100% resolved
- [ ] Orphaned assets: 0
- [ ] Documentation: Complete report generated

### Efficiency Metrics
- **Instruction Reuse**: 70%+ from CopilotCustomizer framework
- **Autonomy**: 7 autonomous phases out of 9 total
- **User Input**: 1 required (repository path), 1 approval (confirm plan)
- **Handoffs**: 8 automatic, 1 conditional

## Error Handling

### Pre-Flight Failures
**Repository Not Found**:
```
Error: Cannot access {path}
Action: Verify path exists and try again
Recovery: Request corrected path
```

**CopilotCustomizer Detected**:
```
Error: Workflow restricted to external repositories
Action: Use CopilotCustomizer agent for internal work
Recovery: None (abort by design)
```

### Analysis Failures
**Tech Stack Detection Failed**:
```
Warning: Cannot auto-detect project type
Action: Request manual input ("Node.js API with Jest")
Recovery: Use manual context to proceed
```

### Generation Failures
**Partial Asset Creation**:
```
Warning: {X} of {Y} assets created successfully
Failed: {list}
Action: Continuing with available assets
Recovery: Generate missing assets manually or retry
```

**Schema Validation Failed**:
```
Error: Asset {name} failed schema validation
Issues: {list}
Action: Attempting auto-correction
Recovery: Manual correction or regeneration
```

### Harmonization Failures
**Circular Handoffs**:
```
Error: Circular handoff detected: {AgentA} → {AgentB} → {AgentA}
Action: Breaking cycle at {point}
Recovery: Manual handoff chain review required
```

**Missing Cross-Reference Target**:
```
Warning: Reference to {file} but file not found
Action: Using generic framework reference
Recovery: Flagged for manual review
```

## Testing Strategy

### Unit Testing (Per Agent)
- [ ] ExternalRepoBootstrap: Repository validation logic
- [ ] AssetPlanner: Recommendation generation accuracy
- [ ] AssetGenerator: Schema compliance of generated files
- [ ] HarmonizationAgent: Cross-reference binding correctness

### Integration Testing (Handoffs)
- [ ] ExternalRepoBootstrap → RepoAnalyzer context transfer
- [ ] RepoAnalyzer → AssetPlanner context completeness
- [ ] AssetPlanner → AssetGenerator specification accuracy
- [ ] AssetGenerator → VerificationAgent file inventory
- [ ] VerificationAgent → HarmonizationAgent validation results
- [ ] HarmonizationAgent → VerificationAgent ecosystem status
- [ ] VerificationAgent → DocumentationGenerator final context

### End-to-End Testing
**Test Repository Types**:
1. Node.js API (Express + TypeScript + Jest)
2. Python CLI (Click + Pytest)
3. React SPA (Vite + TypeScript + Vitest)
4. .NET Web API (ASP.NET Core + xUnit)

**Success Criteria**:
- Complete workflow in <5 minutes
- <5 user interactions
- 100% asset creation success
- 100% schema compliance
- 0 orphaned assets
- Complete documentation

## Deployment Checklist

### Pre-Deployment
- [ ] All agent files created and validated
- [ ] All instruction files referenced correctly
- [ ] Workflow documentation complete
- [ ] Context transfer protocol validated
- [ ] Error handling implemented
- [ ] Quality metrics defined

### Deployment
- [ ] Files committed to `.github/` structure
- [ ] Entry point prompt accessible
- [ ] Framework integration verified
- [ ] Handoff chains tested
- [ ] Documentation published

### Post-Deployment
- [ ] End-to-end workflow tested
- [ ] Performance metrics collected
- [ ] User feedback gathered
- [ ] Known issues documented
- [ ] Iteration plan created

## Usage Examples

### Example 1: Node.js API Project
```
Input: "Bootstrap Copilot assets for: /Users/dev/my-api"

Analysis: Node.js, TypeScript, Express, Jest detected

Recommendations:
- APIExpert.agent.md
- TestOrchestrator.agent.md
- APIPatterns.instructions.md
- GenerateEndpoint.prompt.md

User: "confirm"

Output: 4 assets generated, validated, harmonized
Duration: 2m 34s
```

### Example 2: Python CLI Tool
```
Input: "Bootstrap Copilot assets for: /home/dev/cli-tool"

Analysis: Python, Click, Pytest detected

Recommendations:
- CLIExpert.agent.md
- TestGenerator.agent.md
- CLIPatterns.instructions.md
- GenerateCommand.prompt.md

User: "confirm"

Output: 4 assets generated, validated, harmonized
Duration: 2m 18s
```

### Example 3: React SPA
```
Input: "Bootstrap Copilot assets for: C:\Projects\my-spa"

Analysis: React, TypeScript, Vite, Vitest detected

Recommendations:
- ComponentExpert.agent.md
- StateArchitect.agent.md
- TestGenerator.agent.md
- ReactPatterns.instructions.md
- GenerateComponent.prompt.md

User: "confirm"

Output: 5 assets generated, validated, harmonized
Duration: 3m 12s
```

## Maintenance

### Version Control
**Workflow Version**: Track in this document header  
**Agent Versions**: Individual v1.0 in each agent file  
**Schema Compatibility**: VS Code Copilot v1.105+

### Update Protocol
1. Test changes in isolated environment
2. Update relevant agent files
3. Validate handoff chains remain functional
4. Update workflow documentation
5. Run end-to-end tests
6. Deploy with version increment

### Monitoring
**Key Metrics to Track**:
- Average workflow completion time
- Handoff success rate
- User interaction count
- Schema compliance rate
- Asset generation success rate
- User satisfaction scores

---

**Created**: 2025-01-15  
**Framework**: CopilotCustomizer v1.0  
**Workflow Type**: Linear with Single Quality Gate  
**Autonomy**: Fully autonomous after confirmation

*Comprehensive autonomous workflow for external repository asset generation*
