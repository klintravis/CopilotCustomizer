# Example: GitHub Actions CI/CD Pipeline Design

## Scenario

You're building a Node.js/Express REST API and need to set up a complete CI/CD pipeline using GitHub Actions.

**Requirements**:
- Automated testing on every push
- Staging deployment on merges to `develop`
- Production deployment with manual approval
- Automated versioning and releases
- Rollback capability

**Platforms**: VS Code (Copilot), GitHub Copilot CLI, Claude, Cursor

---

## Phase 1: Pipeline Architecture Design

Using **deployment-automation** skill to design the pipeline structure.

**Analysis**:
- Tech Stack: Node.js 18+, Express, PostgreSQL, Jest tests, Docker
- Current State: Manual deployment to staging/production
- Goal: Fully automated pipeline with approval gates
- Risk Level: Medium (production impacts)

**Design Decision**: Multi-stage pipeline with:
1. **CI Stage** (Every push)
   - Run tests on Node.js 18, 20
   - Generate coverage reports
   - Run security scans (npm audit, SonarQube)
   - Build Docker image for staging

2. **Staging Deployment** (Push to develop)
   - Deploy to staging environment
   - Run smoke tests
   - Health check monitoring

3. **Production Deployment** (Manual from main)
   - Manual approval required
   - Blue-green deployment strategy
   - Automatic rollback on failure
   - Slack notification on success

---

## Phase 2: Implementation - GitHub Actions Workflow

**File**: `.github/workflows/ci-cd-pipeline.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
      - develop
      - 'feature/**'
  pull_request:
    branches:
      - main
      - develop

jobs:
  # ============================================
  # BUILD & TEST STAGE
  # ============================================
  build:
    name: Build and Test
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests with coverage
        run: npm run test:coverage
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb
          NODE_ENV: test

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests
          fail_ci_if_error: false

      - name: Run security audit
        run: npm audit --audit-level=moderate

      - name: Build Docker image (for staging preview)
        if: github.event_name == 'push' && github.ref == 'refs/heads/develop'
        run: |
          docker build -t myapp:${{ github.sha }} .
          docker tag myapp:${{ github.sha }} myapp:develop-latest

  # ============================================
  # STAGING DEPLOYMENT STAGE
  # ============================================
  deploy-staging:
    name: Deploy to Staging
    needs: build
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/develop'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: us-east-1

      - name: Deploy to Staging (ECS)
        run: |
          aws ecs update-service \
            --cluster myapp-staging \
            --service myapp-service \
            --force-new-deployment \
            --region us-east-1

      - name: Wait for deployment
        run: |
          aws ecs wait services-stable \
            --cluster myapp-staging \
            --services myapp-service \
            --region us-east-1

      - name: Run smoke tests
        run: |
          npm run test:smoke -- \
            --baseUrl https://staging-api.myapp.com

      - name: Health check
        run: |
          curl -f https://staging-api.myapp.com/health || exit 1

      - name: Notify Slack (Success)
        if: success()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "✅ Staging Deployment Successful",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "Deploy to Staging succeeded\nCommit: ${{ github.sha }}\nAuthor: ${{ github.actor }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

      - name: Notify Slack (Failure)
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "❌ Staging Deployment Failed",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "Deploy to Staging FAILED\nCommit: ${{ github.sha }}\nAuthor: ${{ github.actor }}\nView: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

  # ============================================
  # VERSIONING & RELEASE STAGE
  # ============================================
  release:
    name: Create Release
    needs: build
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    permissions:
      contents: write
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: Bump version (semver)
        id: version
        run: |
          LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
          BUMP_TYPE=$(git log $LAST_TAG..HEAD --pretty=format:"%B" | grep -q "BREAKING" && echo "major" || (git log $LAST_TAG..HEAD --pretty=format:"%B" | grep -q "^feat" && echo "minor" || echo "patch"))
          npm version $BUMP_TYPE --no-git-tag-version
          NEW_VERSION=$(node -p "require('./package.json').version")
          echo "version=$NEW_VERSION" >> $GITHUB_OUTPUT

      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: v${{ steps.version.outputs.version }}
          release_name: Release v${{ steps.version.outputs.version }}
          body: |
            See changelog for details
          draft: false
          prerelease: false

      - name: Publish to npm
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

  # ============================================
  # PRODUCTION DEPLOYMENT STAGE
  # ============================================
  deploy-production:
    name: Deploy to Production
    needs: release
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://api.myapp.com

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN_PROD }}
          aws-region: us-east-1

      - name: Blue-Green Deployment
        run: |
          # Get current active environment (blue or green)
          ACTIVE=$(aws elbv2 describe-target-groups \
            --names myapp-blue \
            --query 'TargetGroups[0].TargetGroupName' \
            --output text)
          
          if [ "$ACTIVE" = "myapp-blue" ]; then
            NEXT="myapp-green"
          else
            NEXT="myapp-blue"
          fi
          
          # Deploy to inactive environment
          aws ecs update-service \
            --cluster myapp-prod \
            --service myapp-$NEXT \
            --force-new-deployment

      - name: Wait for deployment
        run: |
          aws ecs wait services-stable \
            --cluster myapp-prod \
            --services myapp-blue myapp-green

      - name: Smoke tests on new deployment
        run: npm run test:smoke -- --baseUrl https://api.myapp.com

      - name: Switch traffic to new environment
        run: |
          # Update load balancer to route to new environment
          aws elbv2 modify-rule \
            --rule-arn ${{ secrets.ALB_RULE_ARN }} \
            --conditions Field=path-pattern,Values=/api

      - name: Monitor for errors (5 minute soak period)
        run: |
          for i in {1..60}; do
            ERROR_RATE=$(aws cloudwatch get-metric-statistics \
              --namespace AWS/ApplicationELB \
              --metric-name HTTPCode_Target_5XX_Count \
              --statistics Sum \
              --start-time $(date -u -d '1 minute ago' +%Y-%m-%dT%H:%M:%S) \
              --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
              --period 60 | jq -r '.Datapoints[0].Sum // 0')
            
            if (( $(echo "$ERROR_RATE > 10" | bc -l) )); then
              echo "High error rate detected! Rolling back..."
              exit 1
            fi
            
            echo "Monitor check $i/60: Error rate = $ERROR_RATE"
            sleep 5
          done

      - name: Rollback on failure
        if: failure()
        run: |
          echo "Deployment failed! Executing rollback..."
          aws elbv2 modify-rule \
            --rule-arn ${{ secrets.ALB_RULE_ARN }} \
            --conditions Field=path-pattern,Values=/api \
            --actions Type=forward,TargetGroupArn=$PREVIOUS_TARGET_GROUP_ARN
          
          echo "Traffic reverted to previous environment"

      - name: Notify Slack (Success)
        if: success()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "🚀 Production Deployment Successful",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "✅ Production deployment completed successfully\nVersion: ${{ github.ref_name }}\nCommit: ${{ github.sha }}\nAuthor: ${{ github.actor }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_PROD }}

      - name: Notify Slack (Failure/Rollback)
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "🚨 Production Deployment FAILED - Rollback Executed",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "❌ Production deployment FAILED\nRollback executed automatically\nVersion: ${{ github.ref_name }}\nAuthor: ${{ github.actor }}\nView: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_PROD }}
```

---

## Phase 3: Configuration - Secrets & Environment Setup

**Required Secrets** (Add to GitHub repository settings):

```yaml
AWS_ROLE_ARN                 # IAM role for staging (ECS access)
AWS_ROLE_ARN_PROD           # IAM role for production (ECS + ALB access)
NPM_TOKEN                    # npm registry authentication
SLACK_WEBHOOK_URL           # Slack notifications (staging)
SLACK_WEBHOOK_PROD          # Slack notifications (production)
ALB_RULE_ARN                # AWS Application Load Balancer rule
```

**Environment Files**:

```bash
# .env.staging
DATABASE_URL=postgresql://user:pass@staging-db.rds.amazonaws.com:5432/myapp
REDIS_URL=redis://staging-cache.elasticache.amazonaws.com:6379
NODE_ENV=staging
LOG_LEVEL=info

# .env.production (managed by AWS Secrets Manager)
# Loaded via AWS Systems Manager Parameter Store
```

---

## Phase 4: Testing & Validation

**Local Testing**:

```bash
# Test workflow syntax locally
docker run -it -v "$(pwd)":/app ghcr.io/rhysd/actionlint -oneline /app/.github/workflows/ci-cd-pipeline.yml

# Simulate workflow execution
act -j build -P ubuntu-latest=ghcr.io/catthehacker/ubuntu:full-latest
```

**Validation Checklist**:
- ✅ All secrets configured in GitHub
- ✅ IAM roles grant necessary permissions
- ✅ ECS services exist for blue/green deployment
- ✅ Database migrations run before deployment
- ✅ Health check endpoints respond correctly
- ✅ Slack webhooks configured and tested

---

## Phase 5: Monitoring & Observability

**CloudWatch Metrics**:

```bash
# Error rate monitoring
aws cloudwatch get-metric-statistics \
  --namespace AWS/ApplicationELB \
  --metric-name HTTPCode_Target_5XX_Count \
  --statistics Sum \
  --start-time 2024-01-12T00:00:00Z \
  --end-time 2024-01-12T01:00:00Z \
  --period 300

# Deployment duration
aws cloudwatch get-metric-statistics \
  --namespace AWS/ECS \
  --metric-name DeploymentDuration \
  --statistics Average \
  --start-time 2024-01-12T00:00:00Z \
  --end-time 2024-01-12T01:00:00Z \
  --period 300
```

**Alerting**:
- High error rate → Automatic rollback + Slack alert
- Deployment timeout → Investigate + manual approval required
- Database migration failure → Block deployment

---

## Phase 6: Rollback Procedures

**Automatic Rollback Triggers**:

1. **Health Check Failure**: If `/health` endpoint fails, revert to previous environment
2. **Error Rate Spike**: If 5XX errors exceed threshold during soak period
3. **Timeout**: If deployment doesn't complete in 30 minutes

**Manual Rollback**:

```bash
# Switch traffic back to blue (if currently on green)
aws elbv2 modify-rule \
  --rule-arn arn:aws:elasticloadbalancing:... \
  --conditions Field=path-pattern,Values=/api \
  --actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:...:targetgroup/myapp-blue

# Or revert ECS service to previous task definition
aws ecs update-service \
  --cluster myapp-prod \
  --service myapp-blue \
  --task-definition myapp:42
```

**Communication**:
- Slack notification sent immediately
- Incident post-mortem scheduled
- Deployment approval required before retry

---

## Summary

This comprehensive GitHub Actions pipeline demonstrates:

✅ **Automated Testing** - Run tests on multiple Node versions  
✅ **Staging Deployment** - Automatic on develop branch  
✅ **Blue-Green Strategy** - Zero-downtime production deployments  
✅ **Rollback Capability** - Automatic or manual rollback  
✅ **Monitoring** - Error rate tracking and alerts  
✅ **Team Notification** - Slack integration for visibility  
✅ **Security** - Secrets management and audit logging  

**Cross-Platform Usage**:
- **VS Code**: Ask "Create a GitHub Actions pipeline using deployment-automation skill"
- **CLI**: `copilot --skill deployment-automation --input "Design CI/CD pipeline"`
- **Claude**: Attach this example and ask Claude to customize for your project
- **Cursor**: Use in codebase to generate `ci-cd-pipeline.yml` for your project

---

*Real-world GitHub Actions CI/CD pipeline demonstrating the deployment-automation skill in practice*
