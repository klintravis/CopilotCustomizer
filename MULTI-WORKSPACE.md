# Multi-Workspace Usage Guide

> Use CopilotCustomizer to enhance ANY repository without copying files

## Why Multi-Workspace?

Keep CopilotCustomizer separate as a "toolbox" workspace while working on your actual project. This approach:

✅ **No file copying** - Keep CopilotCustomizer pristine  
✅ **Works with any repo** - Python, Node.js, .NET, Go, Rust, Java, PHP, any stack  
✅ **Easy cleanup** - Just close the workspace folder when done  
✅ **Reusable** - Use same CopilotCustomizer for multiple projects  
✅ **Stay updated** - Pull latest improvements without affecting your projects

## VS Code Multi-Root Workspaces

VS Code supports opening multiple folders in one workspace. This is the recommended way to use CopilotCustomizer.

### How It Works

```
VS Code Workspace
├── 📁 your-project/          (Your actual repository)
│   ├── src/
│   ├── package.json
│   └── ...
└── 📁 CopilotCustomizer/     (The AI toolbox)
    ├── .github/
    │   ├── agents/
    │   ├── prompts/
    │   └── instructions/
    └── ...
```

## Setup Instructions

### Step 1: Open Your Project in VS Code

```bash
# Open your existing project normally
code /path/to/your-project
```

### Step 2: Add CopilotCustomizer as Second Folder

**Option A: Via Menu**
1. In VS Code, go to `File` → `Add Folder to Workspace...`
2. Browse to your CopilotCustomizer directory
3. Click `Select Folder`

**Option B: Via Command Palette**
1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type "Add Folder to Workspace"
3. Select your CopilotCustomizer directory

**Option C: Save as Workspace File**
```json
// your-project.code-workspace
{
  "folders": [
    {
      "path": "/path/to/your-project"
    },
    {
      "path": "/path/to/CopilotCustomizer"
    }
  ],
  "settings": {}
}
```

### Step 3: Verify Setup

You should now see both folders in VS Code's Explorer sidebar:

```
EXPLORER
├── YOUR-PROJECT
│   └── [your files]
└── COPILOTCUSTOMIZER
    └── [framework files]
```

## Usage Patterns

### Pattern 1: Bootstrap Complete Customization

Use when starting fresh with a new repository.

**Steps**:
1. Open Copilot Chat (`Ctrl+Shift+I` or `Cmd+Shift+I`)
2. Type the `/BootstrapRepo` slash command:
   ```
   /BootstrapRepo REPOSITORY_PATH: "/path/to/your-project"
   ```
3. Review analysis and recommendations
4. Type `confirm` when prompted to generate assets
5. Assets created in `your-project/.github/` folders

**Result**: Complete AI customization tailored to your tech stack

### Pattern 2: Create Individual Assets

Use when you need specific agents, instructions, or prompts.

**For a New Agent**:
1. Open Copilot Chat
2. Type the `/NewCopilotAgent` slash command:
   ```
   /NewCopilotAgent AGENT_NAME: "DatabaseOptimizer", 
   DOMAIN: "PostgreSQL performance"
   ```
3. Review details and type `confirm` when prompted
4. Agent created in your project's `.github/agents/` folder

**For New Instructions**:
1. Open Copilot Chat
2. Type the `/NewInstructions` slash command with requirements
3. Instructions created in your project's `.github/instructions/` folder

**For New Prompts**:
1. Open Copilot Chat
2. Type the `/NewPrompt` slash command with template structure
3. Prompt created in your project's `.github/prompts/` folder

### Pattern 3: Repository Analysis

Use when you want to understand what customizations would help.

**Steps**:
1. Open Copilot Chat
2. Type the `/RepoReview` slash command:
   ```
   /RepoReview TARGET_PATH: "/path/to/your-project"
   ```
3. Review analysis and recommendations
4. Decide which assets to generate

### Pattern 4: Optimize Existing Assets

Use when your project already has Copilot customizations.

**Steps**:
1. Open Copilot Chat
2. Type the `/AssetOptimization` slash command:
   ```
   /AssetOptimization TARGET_PATH: "/path/to/your-project/.github"
   ```
3. Review optimization suggestions
4. Type `confirm` to apply improvements

## Working with Generated Assets

### Where Assets Are Created

Assets are always created in **your project**, not in CopilotCustomizer:

```
your-project/
├── .github/
│   ├── agents/           ← New agents created here
│   ├── instructions/     ← New instructions here
│   ├── prompts/          ← New prompts here
│   └── templates/        ← New templates here
├── AGENTS.md            ← Project guidance file
└── [your existing files]
```

### Testing Your New Assets

After generation:

1. **Reload VS Code Window** (may be needed for new agents)
   - `Ctrl+Shift+P` → "Reload Window"

2. **Test Agent Modes** (when available)
   - Open Copilot Chat
   - Type `@` to see available agents
   - Try your new agent

3. **Verify Instructions Apply**
   - Check that AI follows your custom rules
   - Request code in affected file types
   - Confirm behavior matches expectations

4. **Use Prompts**
   - Use slash commands directly in Copilot Chat
   - Follow variable instructions
   - Generate content with templates

## Cleanup

### When You're Done

Simply close the CopilotCustomizer folder:

**Option A: Remove from Workspace**
1. Right-click `CopilotCustomizer` in Explorer
2. Select "Remove Folder from Workspace"

**Option B: Close Workspace**
1. `File` → `Close Workspace`
2. Reopen just your project: `File` → `Open Folder`

### Your Project Keeps Everything

All generated assets remain in your project:
- `.github/agents/` - Your custom agents
- `.github/instructions/` - Your custom instructions
- `.github/prompts/` - Your custom prompts
- `AGENTS.md` - Your project guidance

You can use these without CopilotCustomizer being open.

## Advanced Usage

### Use Same CopilotCustomizer for Multiple Projects

Open different workspaces with different projects:

```
Project 1 Workspace:
├── my-api-project/
└── CopilotCustomizer/

Project 2 Workspace:
├── my-web-app/
└── CopilotCustomizer/

Project 3 Workspace:
├── my-cli-tool/
└── CopilotCustomizer/
```

Each gets custom assets while sharing the same CopilotCustomizer framework.

### Keep CopilotCustomizer Updated

Since it's a separate folder, you can update it without affecting your projects:

```bash
# Update CopilotCustomizer
cd /path/to/CopilotCustomizer
git pull origin main

# Your projects are unaffected
```

### Share CopilotCustomizer Across Team

**Option 1: Clone Once, Use Everywhere**
```bash
# Clone to shared location
git clone https://internal/CopilotCustomizer.git ~/copilot-framework

# Each team member adds from same location
```

**Option 2: Each Developer Clones**
```bash
# Each developer has their own copy
git clone https://internal/CopilotCustomizer.git ~/my-copilot-framework
```

## Troubleshooting

To keep this guide concise, all troubleshooting is centralized in:

- `HOW-TO.md` → Troubleshooting
- Direct link: HOW-TO.md section “Troubleshooting”

That section covers prompt visibility, output locations, approvals, performance, and handoff buttons.

## Examples

### Example 1: New React Project

```bash
# Create new React app
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app

# Open in VS Code
code .

# Add CopilotCustomizer
# File → Add Folder to Workspace → select CopilotCustomizer

# Bootstrap customization
# In Copilot Chat, type:
/BootstrapRepo REPOSITORY_PATH: "/path/to/my-react-app"
## Examples

For runnable, stack-specific examples (React, Python, .NET, Node.js, Monorepo), see:

- `EXAMPLES.md` — Real-world walkthroughs with copy/paste commands
- **Don't mix assets** - Keep CopilotCustomizer's assets separate from yours
- **Don't use relative paths** - Can be ambiguous with multiple folders

## Next Steps

Now that you understand multi-workspace usage:

1. **[README.md](README.md)** - Quick start guide
2. **[HOW-TO.md](HOW-TO.md)** - Detailed usage examples
3. **[AGENTS.md](AGENTS.md)** - Project development guidance
4. **[.github/prompts/](.github/prompts/)** - Browse available prompts

---

**Framework**: CopilotCustomizer v1.0  
**Pattern**: Multi-Workspace Toolbox Model  
**Works With**: Any tech stack, any repository size
