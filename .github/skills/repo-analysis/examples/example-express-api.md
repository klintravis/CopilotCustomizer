---
# Repository Analysis Skill - Example: Analyzing a Node.js/Express API
---

# Example: Repository Analysis (Node.js/Express API)

## Scenario

You're building AI customization for an existing Express.js REST API project. You need to analyze the repository to understand its structure before generating customizations.

## Using This Skill

### In VS Code Copilot Chat

```
I need to analyze my Node.js/Express API repository. 
Path: /Users/dev/my-api-project

Use the repo-analysis skill to:
1. Map the repository structure
2. Identify tech stack
3. Recognize architectural patterns
4. Check dependencies
5. Assess impact for customization
```

### In GitHub Copilot CLI

```bash
copilot --skill repo-analysis \
  --input "Analyze /Users/dev/my-api-project for Node.js Express API"
```

### In Claude Desktop

Attach the repository folder and ask:

```
Analyze this repository using the repo-analysis skill. 
What's the structure, tech stack, and patterns?
```

## Example Analysis Output

### Phase 1: Structure Discovery

**Repository Type**: Node.js / Express REST API

**Key Directories**:
```
my-api-project/
├── src/
│   ├── routes/          # API endpoints
│   ├── controllers/      # Business logic
│   ├── models/          # Database schemas
│   ├── middleware/      # Express middleware
│   ├── utils/           # Utility functions
│   └── config/          # Configuration
├── tests/               # Test files
├── docs/                # API documentation
├── docker/              # Docker configuration
├── .github/workflows/   # GitHub Actions
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── .env.example         # Environment template
```

**Project Type**: Monolithic backend API
**Code Organization**: Feature folders (routes → controllers → models)

### Phase 2: Tech Stack Detection

**Languages**:
- TypeScript (.ts files)
- JSON (configuration)
- Bash (scripts)

**Frameworks**:
- Express.js (web framework)
- TypeORM (ORM)
- Jest (testing)

**Tools**:
```yaml
Build: tsc, ts-node
Test: Jest, supertest
Linting: ESLint, Prettier
Database: PostgreSQL
Containerization: Docker
CI/CD: GitHub Actions
```

**Dependencies Snapshot**:
```json
{
  "express": "^4.18.0",
  "typeorm": "^0.3.0",
  "pg": "^8.10.0",
  "joi": "^17.9.0",
  "jwt-decode": "^3.1.2",
  "helmet": "^7.0.0",
  "cors": "^2.8.5"
}
```

### Phase 3: Pattern Recognition

**Architectural Pattern**: Layered (MVC-like)
- Routes layer (HTTP handlers)
- Controllers layer (business logic)
- Models layer (data access)
- Middleware layer (cross-cutting concerns)

**Code Organization**: Feature-based
- Each feature has: route → controller → model
- Utilities separated into shared folder

**Error Handling**: Try-catch with custom error middleware
```typescript
// Example pattern found:
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.statusCode || 500).json({
    error: err.message
  });
});
```

**Testing Pattern**: Unit + Integration with Jest
- Unit tests: `/tests/unit/`
- Integration tests: `/tests/integration/`
- Test database setup in fixtures

**Security Patterns**:
- JWT authentication
- Helmet for headers
- CORS configuration
- Input validation with Joi

### Phase 4: Dependency Analysis

**External API Integrations**:
- Stripe (payments)
- SendGrid (email)
- AWS S3 (file storage)

**Database**:
- PostgreSQL (primary)
- Redis (caching layer)

**Internal Dependencies**:
```
API Server
  ├── Authentication Service
  ├── Payment Service
  ├── Email Service
  └── File Storage Service
```

### Phase 5: Impact Assessment

**For Copilot Customization**:

✅ **Ready for AI Enhancement**:
- Clear layered architecture
- Consistent naming conventions
- Good test coverage (88%)
- TypeScript provides type safety
- Well-documented endpoints

⚠️ **Consider Before Customization**:
- Multiple external API integrations (teach AI about these)
- Complex business logic in controllers (document patterns)
- Async/await patterns throughout (important for AI understanding)

### Phase 6: Customization Audit

**Recommended Agent Skills to Generate**:
1. 🆕 `api-expert` - Understand Express patterns, routing, middleware
2. 🆕 `database-expert` - TypeORM patterns, migrations, optimization
3. 🆕 `test-specialist` - Jest patterns, testing strategies
4. 🆕 `security-auditor` - JWT, authentication, input validation

**Recommended Instructions**:
- API endpoint conventions (PUT /resource/:id pattern)
- Database migration procedures (TypeORM migrations)
- Error handling standards (custom error middleware)
- Security standards (JWT validation, input sanitization)

**Recommended Prompts**:
- `GenerateAPIEndpoint` - Create new REST endpoints
- `AddAuthenticationGuard` - Add JWT middleware
- `CreateDatabaseMigration` - Generate DB changes
- `WriteUnitTest` - Generate Jest tests

---

## Key Takeaways

This analysis revealed:

1. **TypeScript + Express** - Modern, type-safe API development
2. **Layered Architecture** - Clear separation of concerns
3. **External Integrations** - Stripe, SendGrid, AWS (teach AI about these)
4. **Security-First** - JWT, Helmet, CORS, input validation
5. **Well-Tested** - 88% coverage, Jest + supertest

**Customization Impact**: **READY** - Straightforward analysis and generation possible with AI specialists for API patterns, testing, and security.

---

## Next Steps

After analysis, you'd use **planning skill** to plan which customizations to create, then generate them with agents like `Generator` or `NewAgent`.
