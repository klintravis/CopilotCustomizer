# Real-World Examples

See CopilotCustomizer in action with different tech stacks.

---

## Example 1: React TypeScript Project

### Scenario
New React + TypeScript + Vite project needs AI assistance for component development and testing.

### Setup
```bash
# Create React project
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install

# Open in VS Code
code .

# Add CopilotCustomizer
# File → Add Folder to Workspace → select CopilotCustomizer
```

### Generate Assets
```bash
# In Copilot Chat, type the slash command:
/Bootstrap REPOSITORY_PATH: "/Users/dev/my-react-app"

# Review analysis and recommendations
# Type: confirm
```

### What You Get
```
my-react-app/.github/
├── agents/
│   ├── ComponentExpert.agent.md      # React component specialist
│   ├── StateArchitect.agent.md       # State management expert
│   └── TestOrchestrator.agent.md     # RTL + Vitest testing
├── instructions/
│   ├── ReactPatterns.instructions.md # Component best practices
│   └── TestingPatterns.instructions.md
├── prompts/
│   ├── GenerateComponent.prompt.md   # Component scaffolding
│   └── GenerateTest.prompt.md
├── skills/
│   └── react-testing/SKILL.md        # Cross-platform testing skill
└── AGENTS.md                         # Project guidance
```

### Usage
```typescript
// Ask Copilot: "Create a reusable Button component with variants"
// Result: Gets React + TypeScript best practices automatically
// - Proper typing
// - Accessibility attributes
// - Component composition patterns
// - Test file generated
```

### Time to Value
**3 minutes** from npm create to working AI customization

---

## Example 2: Python FastAPI Backend

### Scenario
REST API project needs help with endpoints, testing, and security.

### Setup
```bash
# Create FastAPI project
mkdir my-api && cd my-api
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install fastapi uvicorn pytest

# Open in VS Code
code .

# Add CopilotCustomizer workspace
```

### Generate Assets
```bash
# In Copilot Chat, type the slash command:
/Bootstrap REPOSITORY_PATH: "/home/dev/my-api"

# Review analysis and recommendations
# Type: confirm
```

### What You Get
```
my-api/.github/
├── agents/
│   ├── APIExpert.agent.md           # FastAPI specialist
│   ├── TestGenerator.agent.md       # Pytest expert
│   └── SecurityReviewer.agent.md    # Python security
├── instructions/
│   ├── APIPatterns.instructions.md  # REST conventions
│   ├── FastAPIPatterns.instructions.md
│   └── PytestPatterns.instructions.md
├── prompts/
│   ├── GenerateEndpoint.prompt.md   # Endpoint scaffolding
│   └── GenerateTest.prompt.md
└── AGENTS.md
```

### Usage
```python
# Ask Copilot: "Create a CRUD endpoint for users with validation"
# Result: Gets FastAPI patterns automatically
# - Pydantic models
# - Async route handlers
# - Error handling
# - Input validation
# - Pytest fixtures and tests
```

### Time to Value
**2 minutes** from pip install to AI-assisted development

---

## Example 3: .NET Core Web API

### Scenario
Enterprise .NET 8 API needs customization for xUnit testing and security.

### Setup
```bash
# Create .NET project
dotnet new webapi -n MyApi
cd MyApi

# Open in VS Code
code .

# Add CopilotCustomizer
```

### Generate Assets
```bash
# In Copilot Chat, type the slash command:
/Bootstrap REPOSITORY_PATH: "C:\Projects\MyApi"

# Review analysis and recommendations
# Type: confirm
```

### What You Get
```
MyApi/.github/
├── agents/
│   ├── APIExpert.agent.md           # ASP.NET Core specialist
│   ├── TestGenerator.agent.md       # xUnit expert
│   └── SecurityReviewer.agent.md    # .NET security
├── instructions/
│   ├── DotNetPatterns.instructions.md
│   ├── APIPatterns.instructions.md
│   └── XUnitPatterns.instructions.md
├── prompts/
│   ├── GenerateController.prompt.md
│   └── GenerateTest.prompt.md
└── AGENTS.md
```

### Usage
```csharp
// Ask Copilot: "Create a product controller with repository pattern"
// Result: Gets .NET best practices
// - Dependency injection
// - Async/await patterns
// - Entity Framework integration
// - xUnit test setup
// - Moq mocking patterns
```

### Time to Value
**3 minutes** from dotnet new to production-ready patterns

---

## Example 4: Node.js Express API

### Scenario
JavaScript/Express backend with Jest testing needs AI assistance.

### Setup
```bash
# Create Express project
mkdir my-express-api && cd my-express-api
npm init -y
npm install express jest supertest

# Open in VS Code
code .

# Add CopilotCustomizer
```

### Generate Assets
```bash
# In Copilot Chat, type the slash command:
/Bootstrap REPOSITORY_PATH: "/Users/dev/my-express-api"

# Review analysis and recommendations
# Type: confirm
```

### What You Get
```
my-express-api/.github/
├── agents/
│   ├── APIExpert.agent.md           # Express specialist
│   ├── SecurityReviewer.agent.md    # Node.js security
│   └── TestOrchestrator.agent.md    # Jest/Supertest
├── instructions/
│   ├── ExpressPatterns.instructions.md
│   ├── NodeSecurity.instructions.md
│   └── JestPatterns.instructions.md
├── prompts/
│   ├── GenerateRoute.prompt.md
│   └── GenerateMiddleware.prompt.md
└── AGENTS.md
```

### Usage
```javascript
// Ask Copilot: "Create authentication middleware with JWT"
// Result: Gets Node.js patterns
// - Express middleware structure
// - JWT validation
// - Error handling
// - Security best practices (helmet, rate limiting)
// - Jest test suites
```

### Time to Value
**2 minutes** from npm init to secure API patterns

---

## Example 5: Existing Large Codebase

### Scenario
Legacy PHP Laravel application needs gradual AI enhancement.

### Setup
```bash
# Open existing project
cd /var/www/my-laravel-app
code .

# Add CopilotCustomizer (doesn't modify existing code)
```

### Generate Assets
```bash
# In Copilot Chat, analyze first:
/Review TARGET_PATH: "/var/www/my-laravel-app"

# Review recommendations, then bootstrap:
/Bootstrap REPOSITORY_PATH: "/var/www/my-laravel-app"

# Type: confirm
```

### What You Get
```
my-laravel-app/.github/
├── agents/
│   ├── LaravelExpert.agent.md       # Laravel specialist
│   ├── BladeExpert.agent.md         # Templating expert
│   └── TestGenerator.agent.md       # PHPUnit expert
├── instructions/
│   ├── LaravelPatterns.instructions.md
│   ├── EloquentPatterns.instructions.md
│   └── PHPUnitPatterns.instructions.md
├── prompts/
│   ├── GenerateMigration.prompt.md
│   ├── GenerateController.prompt.md
│   └── GenerateTest.prompt.md
└── AGENTS.md
```

### Usage
```php
// Ask Copilot: "Refactor this controller to use service layer"
// Result: Gets Laravel best practices
// - Service layer pattern
// - Repository pattern
// - Dependency injection
// - PHPUnit tests
// - Respects existing architecture
```

### Key Benefit
**Non-invasive** - Adds AI assistance without modifying existing codebase

---

## Example 6: Multi-Language Monorepo

### Scenario
Monorepo with TypeScript frontend, Python backend, and Go services.

### Setup
```bash
my-monorepo/
├── frontend/        # React + TypeScript
├── backend/         # FastAPI + Python
└── services/        # Go microservices

code my-monorepo
# Add CopilotCustomizer
```

### Generate Assets
```bash
# In Copilot Chat, type the slash command:
# Bootstrap detects ALL languages automatically
/Bootstrap REPOSITORY_PATH: "/Users/dev/my-monorepo"

# Review multi-language analysis
# Type: confirm
```

### What You Get
```
my-monorepo/.github/
├── agents/
│   ├── FrontendExpert.agent.md      # React/TS specialist
│   ├── BackendExpert.agent.md       # FastAPI specialist
│   ├── GoExpert.agent.md            # Go specialist
│   └── MonorepoArchitect.agent.md   # Overall structure
├── instructions/
│   ├── ReactPatterns.instructions.md
│   ├── FastAPIPatterns.instructions.md
│   ├── GoPatterns.instructions.md
│   └── MonorepoPatterns.instructions.md
├── prompts/
│   └── [language-specific prompts]
└── AGENTS.md
```

### Usage
AI understands context based on **which file you're editing**:
- Edit `.tsx` file → React patterns apply
- Edit `.py` file → FastAPI patterns apply
- Edit `.go` file → Go patterns apply

### Time to Value
**4 minutes** for complete multi-language setup

---

## Common Patterns Across Examples

### 1. Tech Stack Auto-Detection
Framework identifies languages, frameworks, and tools automatically.

### 2. Zero Code Modification
CopilotCustomizer **never modifies your existing code**—only adds AI guidance.

### 3. Instant Cleanup
Close CopilotCustomizer workspace folder when done. Assets stay in your project.

### 4. Incremental Enhancement
Start with bootstrap, add specific agents later as needed.

### 5. Team Consistency
All team members get same AI behavior when `.github/` folder committed to repo.

---

## Next Steps

**Try it yourself:**
1. Pick your tech stack above
2. Follow the setup steps
3. Generate assets (2-3 minutes)
4. Experience AI that understands your project

**Need help?**
- **[QUICKSTART.md](QUICKSTART.md)** - Step-by-step guide
- **[HOW-TO.md](HOW-TO.md)** - Detailed setup & technical reference

---

**Universal**: Works with any stack | **Fast**: 2-5 minute setup | **Non-invasive**: Adds AI, doesn't modify code
