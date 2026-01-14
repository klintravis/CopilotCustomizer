---
# Technical Documentation Skill - Example: Documenting API Implementation
---

# Example: Technical Documentation (API Endpoint Change Summary)

## Scenario

Your team just completed implementation of 4 new API endpoints for user management. Using the **technical-documentation skill**, you need to create a comprehensive change summary that documents what changed, why, and how to use it.

## Using This Skill

### In VS Code Copilot Chat

```
I just implemented 4 new user management endpoints.
Can you help me document this change using the technical-documentation skill?

Changes made:
- POST /users (create user)
- GET /users/:id (get user details)
- PUT /users/:id (update user)
- DELETE /users/:id (delete user)

Include: Overview, files changed, technical details, testing, risks
```

### In GitHub Copilot CLI

```bash
copilot --skill technical-documentation \
  --input "Document user management API endpoints implementation"
```

### In Claude Desktop

Attach changed files and ask:

```
Generate comprehensive documentation for these API endpoint changes.
Cover: overview, implementation, testing, deployment, rollback.
```

## Generated Change Summary Documentation

---

# Change Summary: User Management API Endpoints

## Overview
**Date**: 2025-01-11  
**Type**: Feature  
**Status**: Completed  
**Impact**: HIGH  
**Components**: User Service, API Routes, Database, Tests

### Quick Summary
Added 4 new RESTful endpoints for user management (CRUD operations) with full authentication, input validation, and test coverage. Enables user creation, retrieval, updates, and deletion through standardized API.

## What Changed

### New Endpoints
| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/users` | POST | Create new user | JWT |
| `/users/:id` | GET | Get user details | JWT |
| `/users/:id` | PUT | Update user | JWT + Ownership |
| `/users/:id` | DELETE | Delete user | JWT + Ownership |

### Changes by Component

**1. API Routes** (`src/routes/users.ts`)
- ✨ New file created
- 65 lines of TypeScript code
- Implements all 4 endpoint handlers
- Includes middleware for auth and validation

**2. User Controller** (`src/controllers/userController.ts`)
- ⚡ Modified (15 new methods added)
- +180 lines, -0 lines
- Implements business logic for each endpoint
- Error handling and validation

**3. User Model** (`src/models/User.ts`)
- ⚡ Modified (2 new fields)
- +5 lines
- Added `createdAt`, `updatedAt` timestamps
- Backward compatible with existing fields

**4. Database** (`migrations/`)
- 📋 New migration: `CreateUsersTable1234567890.ts`
- Creates `users` table with:
  - id (UUID primary key)
  - email (unique, indexed)
  - name (varchar)
  - password (hashed, indexed)
  - createdAt, updatedAt (timestamps)

**5. Tests** (`tests/integration/users.test.ts`)
- ✨ New file created
- 150 lines of Jest test code
- 18 test cases covering happy paths + error scenarios
- 92% code coverage on user endpoints

**6. Documentation** (`docs/api/users.md`)
- ✨ New file created
- Complete endpoint documentation
- Request/response examples
- Error code reference

## Technical Details

### Implementation Approach

#### 1. **Authentication**
Used existing JWT middleware:
```typescript
// src/middleware/auth.ts
export const validateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};
```

#### 2. **Input Validation**
Used Joi for schema validation:
```typescript
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(100).required(),
  password: Joi.string().min(8).required()
});
```

#### 3. **Authorization**
Implemented ownership checks for PUT/DELETE:
```typescript
// Only users can update/delete their own records
if (req.user.id !== req.params.id && req.user.role !== 'admin') {
  return res.status(403).json({ error: 'Forbidden' });
}
```

#### 4. **Error Handling**
Standardized error responses:
```typescript
{
  status: 400,
  error: "Validation failed",
  details: [
    { field: "email", message: "Must be valid email" }
  ]
}
```

### Database Schema

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### Dependencies

**Added**:
- No new dependencies (used existing packages)

**Updated**:
- `@types/express`: ^4.17.0 → ^4.17.21
- `joi`: ^17.8.0 → ^17.9.0 (minor update)

**Used**:
- `express`: ^4.18.0 (existing)
- `typeorm`: ^0.3.0 (existing)
- `jsonwebtoken`: ^9.0.0 (existing)
- `joi`: ^17.9.0 (updated)

### Breaking Changes
**None** - This is a purely additive feature. Existing code continues to work unchanged.

## Testing

### Test Coverage
- **Unit Tests**: 12 tests for controller methods
- **Integration Tests**: 6 tests for full endpoint flows
- **Coverage**: 92% of new code

### Test Scenarios Covered
✅ **Happy Paths**:
- Create user with valid data
- Get existing user
- Update user successfully
- Delete user successfully

✅ **Error Cases**:
- Invalid email format
- Duplicate email address
- Missing required fields
- Unauthorized access (no token)
- Forbidden (user accessing other's data)
- Non-existent user (404)

✅ **Edge Cases**:
- Empty request body
- Extra fields in request
- SQL injection attempts (validated)
- XSS payload in name field (sanitized)

### Test Results
```
PASS  tests/integration/users.test.ts
  UserController
    ✓ POST /users - creates user successfully (45ms)
    ✓ POST /users - rejects duplicate email (32ms)
    ✓ POST /users - validates email format (28ms)
    ✓ POST /users - hashes password before storing (38ms)
    ✓ GET /users/:id - returns user data (22ms)
    ✓ GET /users/:id - returns 404 for non-existent (18ms)
    ✓ PUT /users/:id - updates user (35ms)
    ✓ PUT /users/:id - prevents cross-user updates (30ms)
    ... [18 tests total]

Test Suites: 1 passed, 1 total
Tests: 18 passed, 18 total
Coverage: 92% Statements, 88% Branches, 92% Functions
Time: 2.345s
```

### How to Run Tests
```bash
# Run all tests
npm test

# Run only user endpoint tests
npm test -- users.test.ts

# Generate coverage report
npm test -- --coverage

# Watch mode for development
npm test -- --watch
```

## Security

### Security Measures Implemented
✅ **Authentication**
- JWT token validation on all endpoints
- Token expiration enforced (24 hours)
- Invalid tokens rejected

✅ **Authorization**
- Users can only access/modify their own data
- Admins can access all data
- Role-based access control (RBAC)

✅ **Input Validation**
- Email format validation (RFC 5322)
- Name length constraints (2-100 chars)
- Password strength requirements (8+ chars)

✅ **Data Protection**
- Passwords hashed with bcrypt (10 salt rounds)
- Sensitive fields (password) never logged
- Database queries parameterized (TypeORM ORM)
- No raw SQL strings

✅ **OWASP Compliance**
- A1: Injection - Parameterized queries ✅
- A2: Auth - JWT + password hashing ✅
- A3: Sensitive Data - No exposure in logs ✅
- A4: XML/Injection - N/A (JSON API) ✅
- A5: Broken Access Control - Ownership checks ✅
- A6: Security Misconfiguration - Helmet headers ✅
- A7: XSS - Input sanitization ✅
- A8: Insecure Deserialization - N/A ✅
- A9: Using Components with Known Vulns - Checked ✅
- A10: Insecure Logging - No sensitive data ✅

### Security Review Status
- ✅ Code reviewed by security team
- ✅ SAST scan passed (SonarQube)
- ✅ Dependency audit passed (npm audit)
- ✅ No known vulnerabilities

## Risks and Mitigations

| Risk | Probability | Impact | Mitigation | Status |
|------|-------------|--------|-----------|--------|
| Database performance at scale | Medium | High | Indexes on email, created_at; monitor query times | Mitigated |
| Large user base password hashing overhead | Low | Medium | Async hashing doesn't block event loop | Mitigated |
| Token theft/leakage | Low | Critical | HTTPS required, short expiration, secure storage | Mitigated |
| Password reset vulnerability | Low | High | Separate secure flow (future), email verification | Mitigated |
| Concurrent update conflicts | Low | Medium | Timestamp-based optimistic locking | Mitigated |

## Validation Checklist

### Code Quality
- ✅ Code follows project style guide
- ✅ ESLint passes without warnings
- ✅ TypeScript compiles with no errors
- ✅ Prettier formatting applied
- ✅ Comments and documentation included
- ✅ No dead code or TODOs left

### Testing
- ✅ Unit tests passing
- ✅ Integration tests passing
- ✅ No skipped tests
- ✅ Coverage > 90%
- ✅ Performance benchmarks met

### Documentation
- ✅ README updated
- ✅ API docs generated
- ✅ Migration instructions clear
- ✅ Examples provided
- ✅ Error codes documented

### Security
- ✅ Security review approved
- ✅ SAST scan passed
- ✅ Dependency audit passed
- ✅ No secrets in code
- ✅ OWASP checklist complete

### Deployment
- ✅ Database migration tested
- ✅ Backwards compatibility verified
- ✅ Rollback plan documented
- ✅ On-call team briefed
- ✅ Monitoring configured

## Deployment

### Prerequisites
- Production database backup taken
- Database migrations tested on staging
- All tests passing locally and in CI/CD

### Deployment Steps

```bash
# 1. Deploy API code
git tag v2.1.0
git push origin v2.1.0
# (CI/CD automatically builds and deploys)

# 2. Run database migration
npm run db:migrate -- production

# 3. Verify in staging first (blue-green)
# Monitor metrics for 5 minutes

# 4. Cutover to production
# (Load balancer switches traffic)

# 5. Monitor production metrics
# Alert thresholds:
#   - Error rate > 1%
#   - Response time > 500ms
#   - Database connections > 80%
```

### Rollback Plan

**If issues detected within 1 hour**:
1. Switch load balancer back to previous version
2. Stop using new endpoints (old version doesn't have them)
3. Investigate root cause
4. Prepare hotfix

**Database rollback**:
```bash
# Revert migration (removes users table and restores state)
npm run db:rollback -- production
```

**Risk**: Small window where new endpoints unavailable, old version returns 404. Acceptable since feature is new.

### Monitoring

**Key Metrics to Watch**:
```
POST /users
  - Error rate (target: < 0.1%)
  - Response time p95 (target: < 200ms)
  - Success rate (target: > 99.9%)

GET /users/:id
  - Cache hit rate (target: > 80%)
  - Response time p95 (target: < 50ms)

Database
  - Connection pool utilization (target: < 70%)
  - Query execution time (target: < 10ms avg)
  - Lock wait time (target: < 100ms)
```

**Alerts**:
- Error rate > 1% → Page on-call engineer
- Response time > 500ms → Notify DevOps
- Database connections > 80% → Scale read replicas

## Usage Guide

### Creating a User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "password": "SecurePassword123"
  }'

# Response (201 Created):
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2025-01-11T10:30:00Z"
}
```

### Retrieving a User
```bash
curl http://localhost:3000/users/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Response (200 OK):
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2025-01-11T10:30:00Z",
  "updatedAt": "2025-01-11T10:30:00Z"
}
```

### Updating a User
```bash
curl -X PUT http://localhost:3000/users/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Jane Doe"
  }'

# Response (200 OK): Updated user object
```

### Deleting a User
```bash
curl -X DELETE http://localhost:3000/users/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Response (204 No Content): Success, empty body
```

## Related Documentation
- **API Docs**: See [docs/api/users.md](../docs/api/users.md) for complete endpoint reference
- **Database Schema**: See [migrations/](../migrations/) for DDL
- **Tests**: See [tests/integration/users.test.ts](../tests/integration/users.test.ts) for test examples
- **Architecture Decision**: See [ADR-0005-user-management.md](../docs/adr/)

## Next Steps

1. ✅ Feature complete and tested
2. ⏳ Awaiting security review final sign-off
3. ⏳ Schedule deployment to production (Friday 2:00 PM UTC)
4. ⏳ Post-release: Gather feedback and plan v2.2.0

---

**Prepared by**: John Developer  
**Review Status**: ✅ Code Review Approved | ⏳ Security Review in Progress  
**Last Updated**: 2025-01-11 10:45:00 UTC

