# Getting Started with GitHub Copilot Agents in VS Code

**Comprehensive Guide for Developers** | Advanced Reference

> **⚡ Quick Start?** For a 5-minute overview, see [GETTING-STARTED-WITH-AGENTS.md](GETTING-STARTED-WITH-AGENTS.md)

---

## What Are Copilot Agents?

**Agents are specialized AI assistants** that live right in your VS Code editor. Think of them as expert teammates who:
- Understand your specific tech stack and coding patterns
- Follow your team's conventions automatically
- Have domain expertise (security, database, testing, etc.)
- Work across your entire codebase seamlessly

**Key Difference**: Instead of generic AI responses, agents give **context-aware, project-specific guidance**.

---

## The 30-Second Setup

### Prerequisites
✅ VS Code (latest version)  
✅ GitHub Copilot subscription  
✅ That's it!

### Quick Test
1. Open any project in VS Code
2. Press `Ctrl+I` (Windows/Linux) or `Cmd+I` (Mac)
3. Type: `@workspace explain this project`
4. 🎉 You just used your first agent!

---

## Core Concepts

### 1. **Chat Panel** - Your AI Command Center
- **Open it**: `Ctrl+Alt+I` or click the chat icon in sidebar
- **Use it for**: Code questions, refactoring, explanations, debugging

### 2. **Inline Chat** - AI Where You Code
- **Open it**: `Ctrl+I` in any file
- **Use it for**: Quick edits, generating code blocks, fixing bugs right in context

### 3. **Agent Modes** - Specialized Experts
- **Switch modes**: Click the mode picker (dropdown) at the top of chat panel
- **Built-in participants**: `@workspace`, `@vscode`, `@terminal` (use with @ in chat)
- **Custom agents**: Appear as selectable modes in the dropdown menu

### 4. **Slash Commands** - Quick Shortcuts
- **Common commands**: `/explain`, `/fix`, `/tests`, `/new`, `/clear`
- **How to use**: Type `/` in chat to see all available commands
- **Benefit**: Skip typing full requests for common tasks

### 5. **Edits UI** - Review Multi-File Changes
- **What it is**: Workspace for reviewing agent-proposed changes across files
- **Access**: Appears automatically when agents suggest edits
- **Controls**: Accept all, accept per-file, or reject changes before applying

---

## Power User Tips

### 💡 **Tip 1: Be Specific About Context**
❌ "Fix this function"  
✅ "Fix this function to handle edge case when user input is null"

### 💡 **Tip 2: Reference Files Directly**
```
You: compare #file:old-api.ts with #file:new-api.ts
Agent: [Shows differences and migration suggestions]
```

### 💡 **Tip 3: Chain Requests**
```
You: explain this code, then suggest optimizations, then write tests
Agent: [Handles all three steps systematically]
```

### 💡 **Tip 4: Use Inline Chat for Quick Fixes**
1. Select problematic code
2. Press `Ctrl+I`
3. Type: "make this more efficient"
4. Review and accept changes

### 💡 **Tip 5: Ask for Alternatives**
```
You: show me 3 different ways to implement this feature
Agent: [Presents multiple approaches with trade-offs]
```

### 💡 **Tip 6: Master Slash Commands**
```
/explain - Explain selected code
/fix     - Fix issues in selection
/tests   - Generate tests
/new     - Create new code/files
/clear   - Clear chat history
```

### 💡 **Tip 7: Use Context References**
```
#selection          - Currently selected code
#editor             - Active file content
#codebase           - Entire workspace
#terminalLastCommand - Last terminal command output

Example: "optimize #selection for performance"
```

### 💡 **Tip 8: Configure Tool Approvals**
Control what agents can do automatically:
- Go to: Settings → GitHub Copilot → Chat: Tool Confirmations
- Options: Auto-approve safe tools, Always ask, Remember per session

---

## Advanced Workflows & Techniques

### 🔄 **Multi-Step Refactoring**

**Pattern**: Break large refactors into agent-guided phases

```
Phase 1: "@workspace analyze all uses of the UserService class"
Phase 2: "create an interface IUserService with these methods" + review
Phase 3: "refactor UserService to implement IUserService" + review
Phase 4: "update all dependencies to use IUserService" + review
Phase 5: "/tests update all tests for the new interface"
```

**Why it works**: Manageable changesets, clear review points, rollback safety

### 🏗️ **Cross-File Architecture Analysis**

**Use Case**: Understanding system design decisions

```
You: @workspace analyze the data flow from API endpoint to database.
     Show me: #file:api/routes.ts #file:services/user.service.ts 
     #file:database/repositories/user.repo.ts

Agent: [Traces request flow, identifies patterns, suggests improvements]

Follow-up: "what happens if the database connection fails?"
Agent: [Analyzes error handling across the stack]
```

### 🔍 **Deep Code Archaeology**

**Pattern**: Investigate legacy code with agent assistance

```
1. Start broad: "@workspace what does this module do?"
2. Narrow down: "/explain this function" [select suspicious code]
3. Find context: "@workspace find all callers of this function"
4. Understand evolution: "@terminal git log --follow thisfile.ts"
5. Plan changes: "suggest how to refactor this for testability"
```

### ⚡ **Performance Profiling Workflow**

```
Step 1: Identify bottleneck
You: @workspace find all database queries in #codebase
Agent: [Lists all query locations]

Step 2: Analyze specific code
You: /explain [select query code] - focus on performance implications
Agent: [Explains N+1 queries, missing indexes, etc.]

Step 3: Optimize
You: rewrite this query to avoid N+1 problem, add proper indexes
Agent: [Proposes optimized version with batch loading]

Step 4: Verify
You: /tests create performance test for this optimization
Agent: [Generates benchmark test]
```

### 🔀 **Large-Scale Migration Patterns**

**Example**: Migrating from JavaScript to TypeScript

```
Phase 1: Assessment
"@workspace list all .js files that would benefit from TypeScript conversion"

Phase 2: Prioritization
"identify files with most complex logic or external dependencies"

Phase 3: Incremental conversion
For each file:
  1. "/new create TypeScript version of #file:legacy.js"
  2. Review types and interfaces
  3. "add proper type definitions for all function parameters"
  4. "/tests migrate tests to TypeScript"
  5. Accept changes, verify build

Phase 4: Cleanup
"@workspace find all remaining 'any' types and suggest proper types"
```

### 🧪 **Test-Driven Development with Agents**

```
1. Write failing test first:
   "/tests create test for user authentication with invalid credentials"
   
2. Review test, accept to file

3. Implement feature:
   "implement the authentication logic to make this test pass: #selection"
   
4. Refactor:
   "refactor this implementation for better readability while keeping tests green"
   
5. Add edge cases:
   "what edge cases are missing from these tests?"
   Agent suggests → iterate
```

### 🎯 **Advanced Context Management**

**Combining Context References for Precision**

```
# Strategic context loading
"Review #selection for security issues, considering the broader 
context in #file:auth/middleware.ts and #file:config/security.ts"

# Large codebase optimization
"@workspace search for TODO comments in src/api/ only"
(Instead of loading entire codebase)

# Terminal integration
"Analyze the errors in #terminalLastCommand and suggest fixes 
for #editor"

# Multi-file comparison
"Compare implementation patterns between 
#file:old-api/user.controller.ts and 
#file:new-api/user.controller.ts - what improved?"
```

**Context Window Optimization Tips**

✅ **Do**:
- Reference specific files instead of entire workspace when possible
- Use `@workspace` with targeted queries ("find all React hooks")
- Break complex tasks into smaller context-focused requests
- Clear chat history (`/clear`) when switching contexts

❌ **Don't**:
- Load entire codebase for simple questions
- Reference unnecessary files in prompts
- Keep long conversation threads with mixed contexts
- Ask about multiple unrelated topics in one prompt

---

## Understanding Tool Approvals & Security

### What Are Tools?
Agents use **tools** to interact with your environment:
- **Read tools**: Search files, read code, analyze workspace
- **Write tools**: Edit files, create new files, delete content
- **Execute tools**: Run terminal commands, start processes
- **External tools**: API calls, database queries (via MCP servers)

### Approval Levels Explained

| Tool Risk | Agent Behavior | Example | Your Control |
|-----------|----------------|---------|-------------|
| **Safe** | May auto-approve | Search workspace, read files | Settings: Auto-approve |
| **Medium** | Ask once per session | Edit existing file | Approve/Deny per session |
| **High** | Always ask | Terminal commands, delete | Approve/Deny each time |
| **External** | Based on trust | MCP server calls | Configure per server |

### How to Review Agent Actions

**In Chat Panel**: Watch for tool usage indicators
```
🔧 Using workspace search...
📝 Proposing edits to 3 files...
⚠️  Requesting terminal access...
```

**In Edits UI**: Review all file changes before applying
1. Agent proposes changes → Edits UI opens
2. See diff view for each file
3. Options: "Accept All", "Accept File", "Discard"
4. Changes only apply when you approve

### Security Best Practices

✅ **Do**:
- Review all edits in Edits UI before accepting
- Read terminal commands before approving
- Start with "Always ask" for tool confirmations
- Use Restricted Mode for untrusted workspaces
- Check tool usage indicators in chat

❌ **Don't**:
- Blindly accept multi-file changes
- Auto-approve tools you don't understand
- Trust workspaces with unknown config files
- Ignore approval prompts

### Configuration Quick Access

**Settings Path**: File → Preferences → Settings → search "copilot tool"

**Key Settings**:
- `github.copilot.chat.toolConfirmation`: Approval behavior
- `github.copilot.chat.allowCodeExecution`: Enable/disable code execution
- `security.workspace.trust.enabled`: Workspace trust feature

---

## Team & Enterprise Patterns

### 👥 **Pair Programming with Agents**

**Pattern**: Agent as a junior pair programmer

```
Driver (You): Writes code
Navigator (Agent): Reviews, suggests, catches issues

Workflow:
1. You: Write function skeleton
2. Agent: "review #selection for edge cases"
3. Agent suggests missing null checks, validation
4. You: Implement suggestions
5. Agent: "/tests create comprehensive tests"
6. Repeat for next function
```

**Role Reversal**: Agent as driver

```
1. You describe requirements in detail
2. Agent generates implementation
3. You review, ask clarifying questions
4. Agent refines based on feedback
5. You accept when satisfied
```

### 🔄 **Code Review Workflow**

**Pre-Review Checklist**

```
Before submitting PR:

1. Self-review with agent:
   "Review all changes in #codebase for:
   - Code quality issues
   - Missing error handling
   - Performance concerns
   - Security vulnerabilities"

2. Documentation check:
   "Are there sufficient comments for complex logic in #selection?"

3. Test coverage:
   "@workspace find untested code in my recent changes"
   
4. Consistency check:
   "Does this implementation follow patterns in #file:similar-feature.ts?"
```

**Reviewing Others' PRs**

```
1. Understand changes:
   "@workspace summarize what changed in this PR" [after git pull]
   
2. Deep dive:
   "/explain this change" [select complex code]
   
3. Spot issues:
   "What could go wrong with this implementation?"
   
4. Suggest improvements:
   "How would you refactor this for better testability?"
```

### 🚀 **CI/CD Integration Patterns**

**Build Script Generation**

```
You: "Create a GitHub Actions workflow that:
- Runs on pull requests
- Executes npm test
- Runs ESLint
- Builds TypeScript
- Fails if any step fails"

Agent: [Generates .github/workflows/ci.yml]
```

**Dockerfile Optimization**

```
You: "Review this Dockerfile for:
- Multi-stage build opportunities
- Layer caching optimization  
- Security best practices
- Size reduction

#file:Dockerfile"

Agent: [Suggests improvements with explanations]
```

**Troubleshooting CI Failures**

```
1. Copy CI error log
2. "Analyze this CI failure and suggest fixes:
   [paste error]
   
   Context: #file:package.json #file:.github/workflows/ci.yml"
   
3. Agent identifies issue (e.g., missing dependency, version conflict)
4. "Show me how to fix this"
5. Apply fix, push, verify
```

### 📚 **Knowledge Capture & Documentation**

**Auto-Generating Documentation**

```
# API documentation
"Generate OpenAPI/Swagger documentation for all endpoints in 
#file:api/routes.ts"

# Architecture docs
"Create a markdown architecture document explaining:
- System components
- Data flow
- Integration points
- Deployment architecture

Based on @workspace analysis"

# Onboarding guide
"Create a GETTING_STARTED.md for new developers covering:
- Project setup
- Development workflow  
- Testing strategy
- Deployment process"
```

**Capturing Tribal Knowledge**

```
# Document complex decisions
"Explain why we chose this architecture pattern: #selection
Write as ADR (Architecture Decision Record)"

# Create runbooks
"Generate troubleshooting guide for common issues in 
#file:monitoring/alerts.ts"

# Pattern library
"Document this reusable pattern: #selection
Include: use cases, examples, gotchas"
```

### 🎯 **Team Conventions & Standards**

**Enforcing Code Style**

```
# Check adherence
"Does #selection follow our team conventions in 
#file:.github/instructions/CodeStyle.instructions.md?"

# Generate style guide
"Analyze our codebase and document common patterns for:
- Error handling
- API response formatting
- Database queries
- Test structure"

# Quick fixes
"Reformat #selection to match team conventions"
```

**Creating Reusable Patterns**

```
1. Identify pattern: "What's the common structure across all our controllers?"
2. Document: "Create a template for new controllers based on this pattern"
3. Generate: "Create a new controller using the team template for 'Products'"
4. Share: Store template in custom agent or instruction file
```

---

## Prompt Engineering for Agents

### 🎨 **Crafting Effective Prompts**

**Bad vs. Good Prompts**

| ❌ Vague | ✅ Specific | Why It Matters |
|---------|-----------|----------------|
| "Fix this" | "Fix the null pointer exception when user.email is undefined" | Clear problem statement |
| "Make it better" | "Refactor for single responsibility principle, extract validation logic" | Specific improvement goal |
| "Add tests" | "Create unit tests covering happy path, null inputs, and boundary conditions" | Clear coverage expectations |
| "Review code" | "Review for OWASP Top 10 vulnerabilities, focus on injection attacks" | Targeted analysis |

### 📋 **The Prompt Template Formula**

**Structure**: `[Action] + [Context] + [Constraints] + [Format]`

```
Action: "Refactor this function"
Context: "#selection from #file:api/auth.ts"
Constraints: "maintain backward compatibility, improve performance"
Format: "provide before/after comparison with explanation"

Full Prompt:
"Refactor #selection from #file:api/auth.ts to improve performance 
while maintaining backward compatibility. Show before/after comparison 
with explanation of improvements."
```

### 🎯 **Advanced Prompt Patterns**

**1. Constrained Generation**

```
"Generate a user registration endpoint that:
- Uses Express.js
- Validates email format with regex
- Hashes passwords with bcrypt (12 rounds)
- Returns 201 on success, 400 on validation error
- Follows REST conventions
- Includes JSDoc comments
- Matches the pattern in #file:api/auth/login.ts"
```

**2. Comparative Analysis**

```
"Compare these two implementations:

Approach A: #file:legacy/user-service.ts
Approach B: #file:new/user-service.ts

Analyze:
- Performance implications
- Maintainability 
- Test coverage
- Error handling

Recommend which to keep and why."
```

**3. Iterative Refinement**

```
Round 1: "Create a caching layer for API responses"
[Review output]

Round 2: "Add TTL configuration and invalidation logic"
[Review output]

Round 3: "Add Redis backend support with fallback to in-memory"
[Review output]

Round 4: "Add comprehensive error handling and logging"
[Final review]
```

**4. Role-Based Prompting**

```
"Act as a senior security engineer. Review this authentication 
implementation: #selection

Focus on:
- OWASP Top 10 compliance
- JWT token security
- Session management
- Input validation
- Rate limiting

Provide security rating (1-10) and actionable fixes."
```

**5. Example-Driven Generation**

```
"Create a new API endpoint following this example:

Example: #file:api/users/get.ts

New endpoint requirements:
- Resource: 'products'
- Method: GET /api/products/:id
- Same error handling pattern
- Same validation approach
- Same response format"
```

### 🔧 **Troubleshooting Prompt Issues**

**Problem**: Agent gives generic advice

```
❌ "How do I optimize this?"
✅ "Profile this function and suggest optimizations for:
   - Reducing database queries (currently 50+ per request)
   - Improving algorithm complexity (currently O(n²))
   - Caching opportunities
   
   #selection"
```

**Problem**: Agent doesn't understand context

```
❌ "Add error handling"
✅ "Add error handling matching our team pattern:
   
   Pattern: #file:utils/error-handler.ts
   Apply to: #selection
   
   Include: try-catch, logging, user-friendly messages, 
   status codes per #file:constants/http-codes.ts"
```

**Problem**: Agent suggests outdated solutions

```
❌ "Create React component"
✅ "Create React component using:
   - React 18+ with hooks (not class components)
   - TypeScript with strict types
   - Functional composition pattern from #file:components/common/Button.tsx
   - Our team's props naming conventions"
```

### 🎪 **Multi-Turn Conversation Strategies**

**Strategy 1: Breadth-First Exploration**

```
Turn 1: "@workspace what are the main modules in this project?"
Turn 2: "Explain the authentication module in detail"
Turn 3: "Show me how JWT tokens are validated"
Turn 4: "What security vulnerabilities exist in this flow?"
```

**Strategy 2: Depth-First Deep Dive**

```
Turn 1: "/explain this function" [select complex function]
Turn 2: "Explain the algorithm used here in detail"
Turn 3: "What's the time complexity and why?"
Turn 4: "Suggest a more efficient algorithm"
Turn 5: "Show implementation of your suggestion"
```

**Strategy 3: Iterative Refinement**

```
Turn 1: "Create user service class"
Turn 2: "Add input validation"
Turn 3: "Add error handling for database failures"
Turn 4: "Add logging"
Turn 5: "Add comprehensive tests"
Turn 6: "Refactor for dependency injection"
```

### 💡 **Pro Tips for Better Results**

**Tip 1: Specify "What Not To Do"**
```
"Refactor this code, but:
- Don't change the public API
- Don't introduce new dependencies
- Don't remove existing comments
- Don't alter error messages"
```

**Tip 2: Request Explanations**
```
"Generate solution AND explain:
- Why this approach over alternatives
- Trade-offs made
- When to use vs. not use this pattern"
```

**Tip 3: Ask for Code Reviews of Agent Output**
```
After agent generates code:
"Review your own suggestion for:
- Edge cases you might have missed
- Performance bottlenecks
- Potential bugs
- Better alternatives"
```

**Tip 4: Use Format Specifications**
```
"Generate TypeScript interface, format as:

interface Name {
  // Property description
  propertyName: Type;
}

Include JSDoc for complex types."
```

---

## Troubleshooting & Performance

### ⚠️ **Common Issues & Solutions**

#### **Issue 1: Agent Gives Incorrect or Outdated Advice**

**Symptoms**: Suggests deprecated APIs, wrong framework versions, obsolete patterns

**Solutions**:
```
✅ Specify versions explicitly:
   "Using React 18 and TypeScript 5, create..."
   
✅ Reference current code as example:
   "Follow the pattern in #file:recent-component.tsx"
   
✅ Provide constraints:
   "Use only ES2023 features, no experimental syntax"
   
✅ Verify suggestions:
   "Is this approach still recommended in 2025?"
```

#### **Issue 2: Agent Doesn't Understand Project Context**

**Symptoms**: Generic solutions that don't fit your architecture

**Solutions**:
```
✅ Use @workspace for project awareness:
   "@workspace how do we handle authentication here?"
   
✅ Reference existing patterns:
   "Create following the pattern in #file:similar-feature.ts"
   
✅ Create custom agent with project knowledge:
   Add .agent.md file with project context
   
✅ Provide explicit context:
   "Our stack: Node.js, Express, PostgreSQL, TypeScript"
```

#### **Issue 3: Slow Response Times**

**Symptoms**: Long waits for agent responses

**Solutions**:
```
✅ Reduce context size:
   - Reference specific files, not entire workspace
   - Use targeted searches instead of broad queries
   - Clear chat history (/clear) regularly
   
✅ Break complex requests into smaller parts:
   Instead of: "Refactor entire module"
   Do: "Refactor function X", then "function Y", etc.
   
✅ Check internet connection:
   - Agents require stable connection
   - Use local VS Code features during outages
   
✅ Verify VS Code performance:
   - Close unused extensions
   - Restart VS Code if sluggish
```

#### **Issue 4: Agent Proposes Breaking Changes**

**Symptoms**: Suggestions that break existing functionality

**Solutions**:
```
✅ Add explicit constraints:
   "Maintain backward compatibility with existing API"
   
✅ Request impact analysis first:
   "What would break if we change this?"
   
✅ Use smaller, safer changes:
   "Refactor internal implementation only, keep public API"
   
✅ Always review in Edits UI:
   Check every file change before accepting
   
✅ Run tests after accepting:
   Verify nothing broke
```

#### **Issue 5: Tool Approval Prompts Are Annoying**

**Symptoms**: Constant permission prompts interrupt flow

**Solutions**:
```
✅ Configure approval levels appropriately:
   Settings → GitHub Copilot → Chat: Tool Confirmations
   
✅ Use "Remember for session" for trusted workspaces:
   Approve once, applies until you close VS Code
   
✅ Auto-approve safe tools:
   Enable auto-approval for read-only operations
   
✅ But stay cautious:
   Always review terminal commands and file deletions
```

#### **Issue 6: Agent Generates Too Much/Too Little Code**

**Symptoms**: Overly verbose or incomplete solutions

**Solutions**:
```
✅ Specify scope explicitly:
   Too much: "Create minimal implementation"
   Too little: "Include error handling, logging, and tests"
   
✅ Reference examples for length:
   "Similar size to #file:reference.ts"
   
✅ Iteratively refine:
   Start minimal, then: "Add error handling", "Add tests", etc.
   
✅ Request specific sections:
   "Just show the function signature and main logic"
```

#### **Issue 7: Can't Find Custom Agents**

**Symptoms**: Custom agents don't appear in mode picker

**Solutions**:
```
✅ Verify file location:
   Must be in .github/agents/*.agent.md
   
✅ Check file format:
   Requires `description:` field in YAML front matter
   
✅ Reload VS Code:
   File → Reload Window (or restart VS Code)
   
✅ Check for errors:
   View → Output → Select "GitHub Copilot" from dropdown
   
✅ Verify workspace trust:
   Custom agents may not load in restricted mode
```

#### **Issue 8: Edits UI Not Appearing**

**Symptoms**: Agent makes changes without showing Edits UI

**Solutions**:
```
✅ Check if using inline chat:
   Inline chat (Ctrl+I) applies directly to file
   Use chat panel (Ctrl+Alt+I) for Edits UI
   
✅ Verify multi-file changes:
   Edits UI appears for multi-file modifications
   Single-file edits may apply inline
   
✅ Look for Edits view:
   May open in side panel or bottom panel
   Check View → Open View → Copilot Edits
```

### 📊 **Performance Optimization**

**Optimizing Agent Response Quality**

```
✅ Warm up context:
   Start with "@workspace summarize this project"
   Then ask specific questions
   
✅ Maintain conversation context:
   Keep related questions in same chat thread
   Don't jump between unrelated topics
   
✅ Provide examples:
   "Like this: [example]" helps agent understand style
   
✅ Iterate and refine:
   "Good, but make it more concise" or "Add error handling"
```

**Optimizing Your Workflow**

```
✅ Learn keyboard shortcuts:
   Faster than mouse for frequent actions
   
✅ Create snippet prompts:
   Save common prompts as VS Code snippets
   
✅ Use custom agents for repeated tasks:
   Instead of explaining context each time
   
✅ Combine tools effectively:
   Agent for generation + human review + tests
```

### 🔍 **When Agents Struggle (And Alternatives)**

**Scenarios Where Agents May Not Help**

| Scenario | Why Agents Struggle | Alternative |
|----------|-------------------|-------------|
| **Highly specialized domain** | Lacks domain expertise | Consult domain expert, use specialized tools |
| **Cutting-edge tech** | Training data may be outdated | Official docs, GitHub issues, community |
| **Complex business logic** | Needs business context | Business analyst, requirements docs |
| **Performance debugging** | Needs runtime profiling | Profiler tools, APM platforms |
| **Visual design** | Can't see UI | Design tools, designer consultation |
| **Network issues** | Can't access external systems | Network monitoring tools |

**Best Practice**: Use agents as **augmentation**, not replacement for:
- Critical thinking
- Domain expertise  
- Testing and validation
- Security reviews
- Performance profiling
- Business decisions

### ⚡ **Rate Limits & Quotas**

**Understanding Limits**

```
GitHub Copilot has usage limits to ensure quality:

- Request rate limits (requests per minute)
- Context size limits (tokens per request)  
- Monthly usage quotas (enterprise plans)
```

**If You Hit Limits**

```
✅ Wait a few minutes before retrying
✅ Reduce context size (fewer file references)
✅ Use more specific queries (less processing needed)
✅ Spread work across day (avoid bursts)
✅ Check organization quota (for enterprise)
```

**Monitoring Your Usage**

```
- Check organization admin dashboard (enterprise)
- Monitor response times (slower = approaching limits)
- Use built-in tools strategically
- Save complex queries for high-priority work
```

---

## Common Questions (FAQ)

### Q: Does the agent send my code to the cloud?
**A**: GitHub Copilot uses secure Azure OpenAI. Your code is not used to train models.

### Q: Can agents modify my code without permission?
**A**: It depends on your tool approval settings. By default:
- **Code edits**: Always shown in Edits UI for review before applying
- **Safe operations** (read files, search): May auto-approve based on settings
- **Risky operations** (terminal commands, file deletion): Always require approval
- You control this in: Settings → GitHub Copilot → Chat: Tool Confirmations

### Q: What are tool approvals?
**A**: Permission gates for agent actions. When an agent wants to:
- Read files → May auto-approve (configurable)
- Run terminal commands → Requires your approval
- Modify files → Shows in Edits UI first
- Access external tools → Depends on trust level

You see approval prompts with "Allow" / "Deny" options.

### Q: How do I control what agents can do automatically?
**A**: Go to **Settings → GitHub Copilot → Chat: Tool Confirmations**:
- **Auto-approve**: Agents can use safe tools without asking
- **Always ask**: You approve every tool use
- **Remember for session**: Approval lasts until you close VS Code

Recommendation: Start with "Always ask" until comfortable.

### Q: What if the agent gives wrong advice?
**A**: Treat agents like junior developers—review their suggestions. They're powerful assistants, not replacements for expertise.

### Q: How do custom agents know our coding standards?
**A**: They read configuration files in your repo (`.github/agents/*.agent.md`) with your team's rules and patterns.

### Q: Can I use agents offline?
**A**: No, agents require internet connection to GitHub Copilot service.

### Q: What is Workspace Trust and why does it matter?
**A**: VS Code's security feature that affects agent capabilities:
- **Trusted workspace**: Agents can run terminal commands, execute scripts
- **Restricted mode**: Agents limited to read-only and safe operations
- You choose trust level when opening folders with config files
- Re-evaluate: File → Preferences → Workspace Trust

### Q: How do I know when to use which agent or participant?
**A**: Quick decision tree:
- **File-specific question** → Open file, use inline chat (`Ctrl+I`)
- **Project-wide question** → Use `@workspace` in chat
- **VS Code feature** → Use `@vscode`
- **Terminal/Git** → Use `@terminal`
- **Domain-specific** (security, DB, etc.) → Use custom agent mode

### Q: Can I use agents with proprietary/sensitive code?
**A**: Check with your organization's policies. GitHub Copilot for Business offers:
- No code used for training
- Enterprise-grade security
- Policy controls for administrators
- Audit logs

For highly sensitive code, consider: restricted mode, air-gapped environments, or consulting security team.

---

## Resources & Links

### Official Documentation
- [VS Code Copilot Overview](https://code.visualstudio.com/docs/copilot/overview)
- [Customization Guide](https://code.visualstudio.com/docs/copilot/customization/overview)
- [Chat Features](https://code.visualstudio.com/docs/copilot/copilot-chat)
- [Tool Management](https://code.visualstudio.com/docs/copilot/chat/chat-tools)
- [Workspace Trust](https://code.visualstudio.com/docs/editor/workspace-trust)

### Video Tutorials
- [GitHub Copilot in VS Code (5 min)](https://www.youtube.com/results?search_query=github+copilot+vscode+quick+start)
- [Agent Modes Deep Dive (15 min)](https://www.youtube.com/results?search_query=github+copilot+agents)

### Community
- [GitHub Community Forum](https://github.com/orgs/community/discussions/categories/copilot)
- VS Code Discord - #copilot channel

---

*Generated for presentation to 50 developers | November 2025*  
*Last Updated: 2025-11-01*
