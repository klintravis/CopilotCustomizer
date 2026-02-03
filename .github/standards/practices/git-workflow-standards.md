---
name: git-workflow-standards
description: Git workflow standards covering branching strategy, commit hygiene, merge policies, and release management
version: "1.0"
technologies: [github-actions, gitlab-ci]
categories: [practices, devops]
scope: tech-match
priority: medium
---

## Branching Strategy

- Use a trunk-based development model with short-lived feature branches merged frequently to the main branch
- Name branches with a consistent convention: `feature/`, `fix/`, `chore/` prefixes followed by a descriptive kebab-case name
- Keep feature branches short-lived — merge within a few days to avoid large, difficult-to-review diffs
- Use release branches only when maintaining multiple production versions simultaneously
- Delete branches after merging to keep the repository clean and avoid stale branch accumulation

## Commit Hygiene

- Write commit messages in imperative mood with a concise summary line (50 characters or less) followed by an explanatory body
- Follow Conventional Commits format (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`) for automated changelog generation
- Keep each commit as a single logical change that compiles and passes tests independently
- Avoid commits that mix unrelated changes — separate refactoring, feature work, and formatting changes
- Reference issue or ticket numbers in commit messages for traceability between code changes and requirements

## Merge Policies

- Require pull request reviews before merging to the main branch; enforce minimum reviewer count
- Require CI checks to pass before merging — all tests, linting, and security scans must succeed
- Prefer squash-and-merge for feature branches to maintain a clean main branch history
- Use merge commits for release branches and long-running integration branches to preserve branch history
- Protect the main branch from force pushes and direct commits through branch protection rules

## Release Management

- Tag releases with semantic version numbers that reflect the nature of changes (major, minor, patch)
- Automate release creation from CI pipelines triggered by version tags or release branch merges
- Generate release notes from commit messages or PR descriptions to document what each release includes
- Deploy releases through progressive rollout (canary, blue-green) rather than full cutover
- Maintain the ability to quickly rollback to the previous release if critical issues are discovered

## Repository Hygiene

- Keep the repository clean by removing stale branches, outdated tags, and abandoned experiments
- Use `.gitignore` files to prevent committing build artifacts, secrets, IDE configuration, and OS-specific files
- Avoid committing large binary files; use Git LFS or external artifact storage for binaries and media
- Review repository access permissions periodically; follow least-privilege principles for collaborator access
- Document the repository's contribution workflow in a CONTRIBUTING guide accessible to all team members
