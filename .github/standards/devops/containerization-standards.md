---
name: containerization-standards
description: Containerization standards covering image design, build optimization, security hardening, orchestration, and local development
version: "1.0"
technologies: [docker, kubernetes]
categories: [devops, infrastructure]
scope: tech-match
priority: medium
---

## Image Design

- Use minimal base images (Alpine, distroless, slim variants) to reduce attack surface and image size
- Run containers as a non-root user; create a dedicated application user in the Dockerfile
- Include only runtime dependencies in the final image; exclude build tools, compilers, and development packages
- Use explicit image tags with digests for base images rather than `latest` to ensure reproducible builds
- Define a single process per container; use orchestration for multi-process coordination

## Build Optimization

- Use multi-stage builds to separate build dependencies from the runtime image
- Order Dockerfile instructions from least to most frequently changing to maximize layer cache effectiveness
- Copy dependency manifests (package.json, requirements.txt) and install dependencies before copying application code
- Use `.dockerignore` to exclude unnecessary files (node_modules, .git, tests, docs) from the build context
- Keep the build context small — a large context slows down every build even if files are not used

## Security Hardening

- Scan container images for known vulnerabilities in CI pipelines before deployment
- Never store secrets (API keys, passwords, certificates) in images or Dockerfiles; inject them at runtime through environment variables or secret mounts
- Set filesystem to read-only where possible using `--read-only` flag; use tmpfs for writable temporary directories
- Drop all Linux capabilities and add back only those explicitly needed with `--cap-drop ALL --cap-add ...`
- Keep base images updated to include the latest security patches; rebuild images on a regular cadence

## Orchestration Patterns

- Define resource requests and limits (CPU, memory) for all containers to enable effective scheduling and prevent resource starvation
- Implement liveness and readiness probes that accurately reflect application health and ability to serve traffic
- Use rolling deployments with appropriate surge and unavailability settings for zero-downtime updates
- Store configuration in ConfigMaps and secrets in Secret resources; never hardcode environment-specific values in images
- Design applications to handle graceful termination signals (SIGTERM) and complete in-flight work before shutting down

## Local Development

- Provide Docker Compose configurations that replicate the production service topology for local development
- Use bind mounts for source code to enable hot reloading without rebuilding images during development
- Keep local development containers consistent with production images — use the same base images and dependency versions
- Document the local development setup including prerequisites, startup commands, and common troubleshooting steps
- Seed local development databases and services with representative test data automatically on startup
