```markdown
# Security Review Template (Universal)

**Purpose**: Standardized security assessment and vulnerability analysis for any codebase or system (OWASP Top 10, secure coding, authentication, authorization, data protection, compliance validation, etc.). Provides actionable security findings across technology stacks.

## Summary (≤3 bullets)
- What was reviewed (system, component, codebase scope)
- Security posture assessment (critical/high/medium risk level)
- Top priority findings or recommended actions

## Context (≤2 bullets)
- Technology stack and security frameworks in use
- Compliance requirements (OWASP, SOC2, GDPR, HIPAA, PCI-DSS, etc.)

## Review Scope & Methodology

### Scope
**In Scope**:
- Authentication and authorization mechanisms
- Input validation and data sanitization
- Sensitive data handling and encryption
- API security and access controls
- [Additional components reviewed]

**Out of Scope**:
- Infrastructure security (unless specified)
- Physical security controls
- [Explicitly excluded areas]

### Methodology
**Approach**: [Manual code review, automated scanning, penetration testing, threat modeling]  
**Tools Used**: [e.g., Snyk, SonarQube, OWASP ZAP, Burp Suite, Bandit, ESLint security plugins]  
**Standards Applied**: [e.g., OWASP Top 10 2021, CWE Top 25, SANS Top 25]

## OWASP Top 10 Assessment

### A01:2021 - Broken Access Control
**Status**: ✅ Pass | ⚠️ Warning | ❌ Fail  
**Findings**:
- [Authorization checks present/missing]
- [IDOR vulnerabilities identified]
- [Privilege escalation risks]

**Recommendations**:
- [Specific remediation steps]

### A02:2021 - Cryptographic Failures
**Status**: ✅ Pass | ⚠️ Warning | ❌ Fail  
**Findings**:
- [Encryption in transit (TLS/SSL configuration)]
- [Encryption at rest (database, file storage)]
- [Sensitive data exposure in logs, errors, URLs]

**Recommendations**:
- [Specific remediation steps]

### A03:2021 - Injection
**Status**: ✅ Pass | ⚠️ Warning | ❌ Fail  
**Findings**:
- [SQL injection vulnerabilities]
- [Command injection risks]
- [XSS (Cross-Site Scripting) issues]
- [Input validation completeness]

**Recommendations**:
- [Parameterized queries, sanitization, validation patterns]

### A04:2021 - Insecure Design
**Status**: ✅ Pass | ⚠️ Warning | ❌ Fail  
**Findings**:
- [Threat modeling completeness]
- [Security requirements in design]
- [Attack surface analysis]

**Recommendations**:
- [Design improvements, security patterns]

### A05:2021 - Security Misconfiguration
**Status**: ✅ Pass | ⚠️ Warning | ❌ Fail  
**Findings**:
- [Default credentials or configurations]
- [Unnecessary features enabled]
- [Security headers missing/misconfigured]
- [Error messages exposing sensitive information]

**Recommendations**:
- [Configuration hardening steps]

### A06:2021 - Vulnerable and Outdated Components
**Status**: ✅ Pass | ⚠️ Warning | ❌ Fail  
**Findings**:
- [Outdated dependencies with known CVEs]
- [Unmaintained libraries]
- [License compliance issues]

**Recommendations**:
- [Update strategy, dependency management]

### A07:2021 - Identification and Authentication Failures
**Status**: ✅ Pass | ⚠️ Warning | ❌ Fail  
**Findings**:
- [Password policy strength]
- [Multi-factor authentication implementation]
- [Session management security]
- [Credential storage (hashing, salting)]

**Recommendations**:
- [Authentication improvements]

### A08:2021 - Software and Data Integrity Failures
**Status**: ✅ Pass | ⚠️ Warning | ❌ Fail  
**Findings**:
- [CI/CD pipeline security]
- [Code signing and verification]
- [Insecure deserialization risks]

**Recommendations**:
- [Integrity validation measures]

### A09:2021 - Security Logging and Monitoring Failures
**Status**: ✅ Pass | ⚠️ Warning | ❌ Fail  
**Findings**:
- [Audit logging completeness]
- [Security event monitoring]
- [Incident detection capabilities]
- [Log protection and retention]

**Recommendations**:
- [Logging and monitoring enhancements]

### A10:2021 - Server-Side Request Forgery (SSRF)
**Status**: ✅ Pass | ⚠️ Warning | ❌ Fail  
**Findings**:
- [URL validation for external requests]
- [Network segmentation]
- [Allowlist implementation]

**Recommendations**:
- [SSRF prevention measures]

## Critical Findings

### Finding 1: [Title]
**Severity**: Critical | High | Medium | Low  
**Category**: [OWASP category, CWE identifier]  
**Location**: [File, line number, component]

**Description**:
[Clear explanation of the vulnerability and how it can be exploited]

**Impact**:
- **Confidentiality**: [Data exposure risk]
- **Integrity**: [Data tampering risk]
- **Availability**: [Service disruption risk]

**Proof of Concept**:
```
[Code snippet or exploitation example if applicable]
```

**Remediation**:
1. [Specific step-by-step fix]
2. [Validation approach]
3. [Prevention for future occurrences]

**References**:
- [CVE numbers, OWASP links, documentation]

---

### Finding 2: [Title]
[Follow same structure as Finding 1]

---

## Security Best Practices Review

### Input Validation
- [ ] All user inputs validated and sanitized
- [ ] Type checking and length limits enforced
- [ ] Allowlist approach over blocklist where possible
- [ ] Context-appropriate encoding applied

### Authentication & Authorization
- [ ] Strong password policies enforced
- [ ] Multi-factor authentication available
- [ ] Session management secure (timeouts, secure flags)
- [ ] Authorization checks on all protected resources
- [ ] Principle of least privilege applied

### Data Protection
- [ ] Sensitive data encrypted in transit (TLS 1.2+)
- [ ] Sensitive data encrypted at rest
- [ ] PII handling complies with regulations
- [ ] Secure key management practices
- [ ] Data retention and deletion policies implemented

### API Security
- [ ] Rate limiting and throttling in place
- [ ] API authentication and authorization enforced
- [ ] CORS properly configured
- [ ] API versioning and deprecation strategy
- [ ] Request/response validation

### Code Security
- [ ] No hardcoded secrets or credentials
- [ ] Dependency vulnerability scanning active
- [ ] Static code analysis integrated in CI/CD
- [ ] Code review includes security considerations
- [ ] Security-focused linting rules applied

### Infrastructure Security (if in scope)
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options)
- [ ] HTTPS enforced across all endpoints
- [ ] Database access properly restricted
- [ ] File upload security controls in place
- [ ] Error handling doesn't expose sensitive info

## Compliance Assessment

### Regulatory Compliance
**Requirements**: [GDPR, HIPAA, PCI-DSS, SOC2, etc.]

| Requirement | Status | Gap Analysis |
|------------|---------|--------------|
| [Specific control] | ✅ Compliant / ⚠️ Partial / ❌ Non-compliant | [Details] |
| [Data protection] | ✅ Compliant / ⚠️ Partial / ❌ Non-compliant | [Details] |
| [Audit logging] | ✅ Compliant / ⚠️ Partial / ❌ Non-compliant | [Details] |

### Industry Standards
**Standards**: [OWASP ASVS, NIST, ISO 27001, etc.]

**Maturity Level**: [Level 1 (Basic) / Level 2 (Standard) / Level 3 (Advanced)]  
**Gaps**: [Areas not meeting target maturity level]

## Risk Assessment & Prioritization

### Risk Matrix
| Finding | Severity | Exploitability | Impact | Priority |
|---------|----------|----------------|--------|----------|
| [Finding name] | Critical/High/Med/Low | Easy/Medium/Hard | High/Med/Low | P0/P1/P2/P3 |

### Remediation Priority
**P0 (Critical - Immediate)**:
- [Finding requiring immediate attention]
- **Timeline**: [Hours/Days]
- **Owner**: [Team/Individual]

**P1 (High - This Sprint)**:
- [High-priority findings]
- **Timeline**: [1-2 weeks]
- **Owner**: [Team/Individual]

**P2 (Medium - Next Sprint)**:
- [Medium-priority findings]
- **Timeline**: [2-4 weeks]
- **Owner**: [Team/Individual]

**P3 (Low - Backlog)**:
- [Low-priority improvements]
- **Timeline**: [As capacity allows]
- **Owner**: [Team/Individual]

## Remediation Plan

### Immediate Actions (0-7 days)
1. **[Critical Fix]**: [Specific action, owner, deadline]
2. **[High Priority]**: [Specific action, owner, deadline]
3. **[Security Patch]**: [Specific action, owner, deadline]

### Short-term Actions (1-4 weeks)
1. **[Medium Priority Fix]**: [Action, owner, timeline]
2. **[Process Improvement]**: [Action, owner, timeline]
3. **[Training/Documentation]**: [Action, owner, timeline]

### Long-term Actions (1-3 months)
1. **[Architecture Improvement]**: [Action, owner, timeline]
2. **[Security Program Enhancement]**: [Action, owner, timeline]
3. **[Continuous Security Integration]**: [Action, owner, timeline]

### Ongoing Activities
- Regular dependency updates and vulnerability scanning
- Security training and awareness programs
- Periodic security reviews and penetration testing
- Threat modeling for new features
- Security metrics tracking and reporting

## Quality Checklist
- [ ] Review scope clearly defined with boundaries
- [ ] OWASP Top 10 systematically assessed
- [ ] Critical findings documented with severity and impact
- [ ] Each finding includes specific remediation steps
- [ ] Compliance requirements evaluated if applicable
- [ ] Risk prioritization based on exploitability and impact
- [ ] Remediation plan includes owners and timelines
- [ ] Security best practices checklist completed
- [ ] References to standards and CVEs included where applicable
- [ ] No sensitive information exposed in review document

---

### Generation Notes
**Optimized for**: Universal security assessment across all technology stacks  
**Date**: 2025-11-01  
**Standards**: OWASP Top 10 2021, CWE Top 25  
**Process**: Template creation following CopilotCustomizer framework standards and CopilotSecurity.instructions.md patterns
```
