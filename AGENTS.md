# CopilotCustomizer Architecture

A VS Code GitHub Copilot customization framework for generating tech-stack-specific agents, instructions, prompts, and skills. Uses a **unified orchestrator architecture**: the **CopilotCustomizer** orchestrator routes all workflows — both external user repository operations and toolkit self-improvement — through specialized subagents via programmatic orchestration.

## Documentation

- [QUICKSTART.md](docs/QUICKSTART.md) — Get started in 5 minutes
- [HOW-TO.md](docs/HOW-TO.md) — Complete commands reference
- [README.md](README.md) — Overview and key commands

## Unified Orchestrator Architecture

**CopilotCustomizer** (single entry point for all workflows):
- `CopilotCustomizer.agent.md` — Unified orchestrator for all workflows
  - `Bootstrap.agent.md` — Repository bootstrap workflow (subagent)
  - `Planner.agent.md` — Asset recommendation and specification (subagent)
  - `Generator.agent.md` — Multi-asset creation engine (subagent)
  - `Editor.agent.md` — Precise file operations (subagent)
  - `Verifier.agent.md` — Schema validation + harmonization (subagent)
  - `Evolve.agent.md` — Toolkit self-improvement specialist (subagent)

**Orchestration model**: All workflows are driven programmatically via the `agent` tool. No manual handoff buttons — the orchestrator manages the full subagent chain autonomously.

## Architecture & Asset Inventory

For the full asset inventory, design patterns, and contributor details, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
