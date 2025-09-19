# CopilotCustomizer: AI Coding Agent Instructions

## Big Picture Architecture
- **Purpose**: This repo is a VS Code extension and asset framework for customizing GitHub Copilot via chat modes, instructions, prompts, and templates.
- **Major Components**:
  - `.github/chatmodes/` — Defines custom Copilot chat modes (personas, behaviors)
  - `.github/instructions/` — Markdown files guiding Copilot's code generation and agent behavior
  - `.github/prompts/` — Structured prompt templates for asset generation and analysis
  - `.github/templates/` — Standardized document formats for planning and review
  - `src/` — Extension source code (TypeScript): registers chat participant, asset commands, tree views, webviews, and workflow logic
  - `output/` — Generated assets and analysis results

## Developer Workflows
- **Build**: Use `npm run compile` (dev) or `npm run vscode:prepublish` (production)
- **Install/Setup**: Copy `.github/` to your target repo; open in VS Code; extension auto-detects assets
- **Chat Usage**: In Copilot Chat, use `@CopilotCustomizer` and slash commands (e.g., `/generate-chatmode`, `/repo-review`)
- **Asset Generation**: All asset creation is driven by prompt/instruction files; outputs saved to `output/` and `.github/chatmodes/` as needed
- **Validation**: Run `@CopilotCustomizer refine: audit` to check asset schema and cross-references
- **Harmonization**: Use `/harmonize` command or `HarmonizeAssets.prompt.md` to bind related assets

## Project-Specific Conventions
- **Asset Naming**: PascalCase for all asset files (e.g., `GenerateAgent.instructions.md`)
- **Front Matter**: YAML block at top of each asset with `applyTo`, `schemaVersion`, and optional refinement commands
- **Cross-References**: Use relative markdown links; extension rewrites links to virtual scheme for bundled assets
- **Depth Modes**: Most assets support `quick`, `standard`, and `deep` modes for varying analysis depth
- **Refinement Commands**: Use `refine: audit`, `refine: optimize`, etc. in chat or asset files for targeted improvements

## Integration Points & Patterns
- **Extension APIs**: See `src/extension.ts` for chat participant registration, asset resolution, and workflow orchestration
- **Bundled vs Workspace Assets**: Extension prefers workspace `.github/` assets; falls back to bundled resources if missing
- **Output Handling**: All generated files are saved to `output/` with friendly names; chat modes also saved to `.github/chatmodes/`
- **Testing**: Validate assets in a clean VS Code environment; use asset validation commands before PRs

## Examples
- **Generate a new chat mode**:
  ```bash
  @CopilotCustomizer /generate-chatmode Create a security-focused reviewer
  ```
- **Run a repo review**:
  ```bash
  @CopilotCustomizer /repo-review
  ```
- **Audit all assets**:
  ```bash
  @CopilotCustomizer refine: audit
  ```

## Key Files & Directories
- `.github/chatmodes/`, `.github/instructions/`, `.github/prompts/`, `.github/templates/` — All customization assets
- `src/extension.ts` — Main extension logic and workflow orchestration
- `AGENTS.md` — Project-specific agent guidance and workflow examples
- `README.md`, `HOW-TO.md` — General documentation and usage guides

---
*For more details, see AGENTS.md and README.md. Update this file as new workflows or conventions are added.*
