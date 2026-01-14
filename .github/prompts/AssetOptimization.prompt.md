---
agent: CopilotCustomizer
---

<!-- ASSET: AssetOptimization | TYPE: Prompt | VERSION: v1.1 -->

# Asset Optimization Engine (v1.1)

## Metadata
Asset ID: prompt/assetoptimization | Created: 2026-01-14 | Status: Active

**Paired Instructions**: [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md)

### Task
Optimize Copilot assets for token efficiency, clarity, and maintainability. Supports all asset types (agents, prompts, instructions, skills) with configurable optimization targets.

### Usage
1. Provide `TARGET` (file path or asset type filter)
2. Set optimization `GOAL` (token|clarity|both)
3. Set `TARGET_TYPE` to filter specific asset types
4. Confirm when ready
5. Review optimization report

### Variables
---
**Target** [REQUIRED]: "{TARGET}"
**Goal** (token|clarity|both) [default: both]: "{GOAL}"
**Target Type** (all|agents|prompts|instructions|skills|prompts-instructions) [default: all]: "{TARGET_TYPE}"
**Aggressiveness** (conservative|standard|aggressive) [default: standard]: "{AGGRESSIVENESS}"
**Preserve Functionality** [default: true]: "{PRESERVE_FUNCTIONALITY}"
---

### Validation
- Supported: All Copilot asset types
- Preserves functionality and cross-references
- Optimizations are reversible via git

### Workflow Phases
**Phase 1: Analysis** (Auto) - Analyze verbosity, redundancy, token usage
**Phase 2: Planning** (Auto) - Propose optimization strategies
**Phase 3: Preview** (Auto) - Show before/after comparison with token savings
**Phase 4: Implementation** (After confirm) - Apply optimizations
**Phase 5: Verification** (Auto) - Validate functionality preserved
**Phase 6: Documentation** (Auto) - Report savings and changes

### Optimization Strategies

**Token Optimization**:
- Remove redundant sections
- Simplify verbose explanations
- Consolidate repetitive patterns
- Streamline traceability format
- Externalize large examples

**Clarity Optimization**:
- Improve section organization
- Enhance readability
- Clarify variable descriptions
- Strengthen examples
- Better cross-references

**Combined (both)**:
- Balance token efficiency with clarity
- Preserve essential documentation
- Optimize without sacrificing usability

### Generation Gate
Respond with:
- Current token count
- Optimization opportunities identified
- Estimated token savings
- Clarity improvements
- `ready-to-optimize`

Wait for `confirm`.

### Output Requirements
1. Optimization analysis report
2. Before/after preview
3. **Optimized files** (MANDATORY - all saved)
4. Token savings calculation
5. Functionality verification results
6. Success confirmation with paths

### Refinement Commands
- `refine: token` - Focus on token reduction
- `refine: clarity` - Focus on readability
- `refine: preserve` - More conservative approach
- `refine: aggressive` - More aggressive optimization
- `refine: scope` - Adjust target files

### Quality Checklist
- [ ] Files written successfully
- [ ] Functionality preserved
- [ ] Token savings achieved
- [ ] Cross-references still resolve
- [ ] Clarity maintained or improved
- [ ] Schema compliance validated

### Expected Savings
- **Conservative**: 10-15% token reduction
- **Standard**: 20-30% token reduction
- **Aggressive**: 30-40% token reduction (requires careful review)

*Framework: [CopilotCustomizer.agent.md](../agents/CopilotCustomizer.agent.md)*
*VS Code: [Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)*

**Generated using**: [AssetOptimization.instructions.md](../instructions/AssetOptimization.instructions.md)

---

## Audit
Last invoked: [Manual log]
Change history: v1.1 (2026-01-14) - Merged with PromptAndInstructionOptimizer, added TARGET_TYPE and GOAL modes | v1.0 (2026-01-14) - Initial creation
