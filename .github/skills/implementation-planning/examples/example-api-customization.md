---
# Implementation Planning Skill - Example: Planning API Customization
---

# Example: Implementation Planning (Express API Customization)

## Scenario

After analyzing your Express.js API (using repository-analysis skill), you need to plan how to implement AI customization. You want to add automated API endpoint generation, database migration helpers, and security validation skills.

## Using This Skill

### In VS Code Copilot Chat

```
I analyzed my Express.js API. Now help me plan the implementation:

Current State:
- 45 REST endpoints
- 8 external API integrations
- TypeORM database layer
- Jest test suite (88% coverage)
- JWT authentication

Goal: Add AI specialists to:
1. Generate new API endpoints
2. Create database migrations
3. Validate security patterns
4. Write tests

Use implementation-planning skill to create a roadmap.
```

### In GitHub Copilot CLI

```bash
copilot --skill implementation-planning \
  --input "Plan implementation of 4 AI skills for Express.js API project"
```

### In Claude Desktop

```
Here's my repository analysis. Now plan the implementation of these customizations:
- API Endpoint Generation
- Database Migration Helper
- Security Validator
- Test Generator
```

## Phase 1: Requirements Clarification

**Functional Requirements**:
- Generate RESTful endpoints following existing patterns
- Create database migrations with validation
- Validate API security (JWT, input sanitization)
- Generate Jest test suites with 80%+ coverage

**Technical Constraints**:
- Must work with Express 4.18+
- Must support TypeORM patterns
- Must generate TypeScript (not JavaScript)
- Must be backward compatible

**Context**:
- Why: Accelerate development, ensure consistency, reduce bugs
- Problem: Manual endpoint creation is repetitive and error-prone
- Users: Backend developers on team of 5
- Priority: High (affects all API development)

## Phase 2: Strategy Design

**Chosen Approach**: **Incremental** + **Feature Flags**

**Why Incremental**:
- Test skills one at a time
- Validate quality before team adoption
- Minimize risk of bad generations
- Allow refinement based on feedback

**Why Feature Flags**:
- Optionally enable/disable each skill
- A/B test different generation styles
- Easy rollback if issues arise
- Gradual team adoption

**High-Level Plan**:
```
Week 1: API Endpoint Generation
  Day 1-2: Build skill, test with 3 examples
  Day 3: Team review and feedback
  Day 4: Iterate based on feedback
  Day 5: Deploy as available skill

Week 2: Database & Testing
  (Parallel: Database Migration + Test Generator)
  Same cycle as Week 1

Week 3: Security Validator
  (Parallel: With Week 2)
  Extra day for security review

Week 4: Integration & Docs
  - Document all skills
  - Create usage examples
  - Team training session
```

## Phase 3: Change Specification

### Skill 1: API Endpoint Generation

**Inputs**:
- Resource name (e.g., "User", "Product")
- HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Validation rules
- Authentication requirements
- Related models

**Generation Template**:
```typescript
// Input:
// Resource: User
// Methods: GET, POST, PUT, DELETE
// Auth: JWT required

// Output: routes/users.ts
import { Router } from 'express';
import { validateJWT } from '../middleware/auth';
import { validateUser } from '../middleware/validation';
import { UserController } from '../controllers/userController';

const router = Router();

router.get('/', validateJWT, UserController.getAll);
router.get('/:id', validateJWT, UserController.getById);
router.post('/', validateJWT, validateUser, UserController.create);
router.put('/:id', validateJWT, validateUser, UserController.update);
router.delete('/:id', validateJWT, UserController.delete);

export default router;
```

**Acceptance Criteria**:
- [ ] Follows project's route naming patterns
- [ ] Includes proper middleware (auth, validation)
- [ ] Generates controller methods in controller file
- [ ] Creates corresponding database model references
- [ ] Generated code is TypeScript (not JS)
- [ ] Passes ESLint linter
- [ ] Includes JSDoc comments

### Skill 2: Database Migration Generator

**Inputs**:
- Table name
- Column definitions (name, type, nullable, unique, etc.)
- Indexes to create
- Foreign key relationships

**Generation Template**:
```typescript
// Input:
// Table: users
// Columns: id (uuid), email (string, unique), name (string)

// Output: migrations/{timestamp}-CreateUsersTable.ts
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1234567890 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "name",
            type: "varchar",
          },
        ],
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
```

**Acceptance Criteria**:
- [ ] Generates valid TypeORM migration format
- [ ] Creates index on `id` by default
- [ ] Creates unique constraints properly
- [ ] Generates rollback (down) method
- [ ] Uses UUID for IDs (project pattern)
- [ ] Passes `npm run typeorm migration:generate` validation

### Skill 3: Test Generator

**Inputs**:
- Controller/function to test
- Happy path scenario
- Edge cases to test
- API endpoints involved

**Generation Template**:
```typescript
// Input:
// Test: UserController.create
// Happy path: POST /users with valid data

// Output: tests/unit/controllers/userController.test.ts
import { UserController } from '../../../src/controllers/userController';
import { UserService } from '../../../src/services/userService';

jest.mock('../../../src/services/userService');

describe('UserController.create', () => {
  it('should create user with valid data', async () => {
    const mockReq = {
      body: { email: 'test@example.com', name: 'Test User' }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.create(mockReq as any, mockRes as any);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(UserService.create).toHaveBeenCalledWith(mockReq.body);
  });

  it('should reject duplicate email', async () => {
    UserService.create.mockRejectedValue(
      new Error('Duplicate email')
    );
    // ... test implementation
  });
});
```

**Acceptance Criteria**:
- [ ] Uses Jest syntax (not other frameworks)
- [ ] Includes mock setup for dependencies
- [ ] Tests happy path scenario
- [ ] Tests at least 2 error cases
- [ ] Uses project's assertion patterns
- [ ] Passes `npm test` without errors
- [ ] Achieves 80%+ code coverage on tested function

### Skill 4: Security Validator

**Inputs**:
- Code snippet or endpoint
- Security rules to check
- Compliance level (OWASP, CWE, custom)

**Checks Performed**:
```yaml
Authentication:
  - ✓ JWT validation present
  - ✓ Token expiration checked
  - ✓ Secret rotation compatible

Authorization:
  - ✓ Role-based access control
  - ✓ Resource ownership verified
  - ✓ Scope validation

Input Validation:
  - ✓ Input sanitization
  - ✓ Type checking
  - ✓ Size limits enforced

Data Protection:
  - ✓ Passwords hashed
  - ✓ Sensitive data not logged
  - ✓ HTTPS enforced

SQL Injection:
  - ✓ Parameterized queries (TypeORM)
  - ✓ No string concatenation
```

**Output Format**:
```
Validation Report: /api/users POST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Authentication: PASS
  - JWT validation present
  - Token expiration: 24 hours

⚠️ Authorization: WARNING
  - No role-based access control detected
  - RECOMMENDATION: Add roles to users table

✅ Input Validation: PASS
  - Joi validation on all inputs
  - Email format checked

⚠️ Data Protection: WARNING
  - Sensitive user data logged
  - RECOMMENDATION: Use sanitizer middleware

✅ SQL Injection: PASS
  - Using TypeORM ORM (parameterized)
```

**Acceptance Criteria**:
- [ ] Detects common OWASP Top 10 issues
- [ ] Provides actionable recommendations
- [ ] No false positives on secure code
- [ ] Generates in < 5 seconds

## Phase 4: Testing Strategy

**Unit Testing**:
- Test each skill's generation independently
- Mock project structure to avoid side effects
- Verify generated code passes linting
- Coverage: 95%+

**Integration Testing**:
- Generate endpoint and test that it runs
- Generate migration and test database schema
- Generate tests and verify they pass
- Test skill interactions (e.g., endpoint + test together)

**Manual Testing**:
- Developer uses each skill in real project
- Collect feedback on usability
- Test with different input variations
- Verify generated code matches team standards

**Example Test Scenario**:
```
1. Run: /GenerateAPIEndpoint for "Product" resource
2. Verify: Route file created in src/routes/
3. Verify: Controller method generated
4. Verify: Code passes linter (npm run lint)
5. Verify: TypeScript compiles (npm run build)
6. Manual: Import and test endpoint locally
```

## Phase 5: Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Generated code doesn't match patterns | Medium | High | Test against existing code patterns, user review gate |
| Skills too aggressive with generation | Low | High | Use feature flags, provide conservative defaults |
| Team resists AI-generated code | Medium | Medium | Training session, show examples, gradually roll out |
| Security validator misses issues | Low | Critical | Security expert review, whitelist approved patterns |

**Risk Mitigation Approach**:
1. **Feature Flags** - Enable/disable each skill independently
2. **User Gates** - Generate with `review` status, require approval before applying
3. **Quality Checks** - All generated code must pass linting + compilation
4. **Team Training** - Show how to use, when to use, when not to use
5. **Expert Review** - Security expert reviews security validator rules

## Phase 6: Validation Planning

**Pre-Deployment Validation**:
- [ ] All skills tested with 5+ examples each
- [ ] Generated code passes linting
- [ ] Generated code compiles
- [ ] Generated code passes existing test suite
- [ ] Security patterns verified
- [ ] Performance acceptable
- [ ] Documentation complete

**Post-Deployment Monitoring**:
- [ ] Track skill usage (which endpoints generated?)
- [ ] Collect developer feedback
- [ ] Monitor generated code quality in PRs
- [ ] Track defects in AI-generated code
- [ ] Measure time savings

**Rollback Plan**:
- If adoption < 20% within 2 weeks: Re-evaluate approach
- If defect rate > 5%: Disable that skill, investigate
- If security issues found: Immediate disable + audit

## Phase 7: Handoff & Communication

**Stakeholders**:
- Development Team (users of skills)
- Tech Lead (oversees quality)
- Security Team (approves validator)
- DevOps (infrastructure for testing)

**Communication Plan**:
- Week 1: Brief on initiative and timeline
- Week 2-4: Weekly progress updates
- Week 4: Demo session with all skills
- Week 4: Training on usage
- Week 5+: Gather feedback and iterate

**Documentation Deliverables**:
1. **Skill Usage Guide** - How to use each skill
2. **Generated Code Standards** - What to expect
3. **Troubleshooting Guide** - Common issues
4. **Best Practices** - When to use, when not to use
5. **FAQ** - Common questions

---

## Summary

**Implementation Strategy**: Incremental + Feature Flags
**Duration**: 4 weeks
**Team Size**: 1 developer + code reviews
**Risk Level**: Low (feature flags allow easy disable)
**User Impact**: Positive (faster development, fewer bugs)

**Next Steps**:
1. ✅ Requirements finalized
2. ✅ Strategy selected
3. ✅ Changes specified
4. ⬜ Testing planned
5. ⬜ Begin Week 1: API Endpoint Generation

Ready to proceed? → Schedule kickoff meeting, assign developer, start generation
