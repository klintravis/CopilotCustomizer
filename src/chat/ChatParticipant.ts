import * as vscode from 'vscode';
import { AssetResolver } from '../core/AssetResolver';
import { ConfigurationManager } from '../core/ConfigurationManager';
import { WorkflowManager } from '../workflows/WorkflowManager';

/**
 * Manages the GitHub Copilot Chat participant for CopilotCustomizer.
 * Handles slash commands, workflow execution, and default chat behavior.
 */
export class ChatParticipant {
  private lastFlow: { promptRelPath: string; outPrefix: string; lastUserPrompt?: string; customFileName?: string } | undefined;

  constructor(
    private context: vscode.ExtensionContext,
    private assetResolver: AssetResolver,
    private workflowManager: WorkflowManager,
    private output: vscode.OutputChannel
  ) {}

  /**
   * Register the chat participant with VS Code.
   */
  register(): void {
    try {
      const participant = vscode.chat?.createChatParticipant?.('copilot-customizer', this.handleRequest);
      if (participant) {
        participant.iconPath = vscode.Uri.joinPath(this.context.extensionUri, 'resources', 'icons', 'copilot-customizer.svg');
        this.context.subscriptions.push(participant);
        this.output.appendLine('Chat participant registered (id=copilot-customizer).');
      } else {
        this.output.appendLine('Chat participant API not available in this VS Code build.');
      }
    } catch (err) {
      this.output.appendLine(`Failed to register chat participant: ${String(err)}`);
    }
  }

  /**
   * Main chat request handler.
   */
  private handleRequest = async (
    request: vscode.ChatRequest,
    chatContext: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken
  ) => {
    const _prompt = (request.prompt || '').trim().toLowerCase();
    const cmd = (request as any).command as string | undefined; // slash command if provided
    const help = cmd === 'help' || /^\s*(help|commands)\s*$/i.test(request.prompt ?? '');
    
    if (help) {
      await this.showHelp(stream);
      return;
    }

    // Explicit open via slash command
    if (cmd === 'open') {
      await vscode.commands.executeCommand('copilotCustomizer.openGenerator');
      stream.markdown('Opened the Asset Generator panel.');
      return;
    }

    // Handle slash commands
    if (await this.handleSlashCommand(cmd, request, chatContext, stream, token)) {
      return;
    }

    // Handle confirmation/continuation
    if (await this.handleConfirmation(request, chatContext, stream, token)) {
      return;
    }

    // Default: normal assistant behavior (no hijack) — pass through to model
    await this.defaultChat(request, chatContext, stream, token);
  }

  /**
   * Show help information and available commands.
   */
  private async showHelp(stream: vscode.ChatResponseStream): Promise<void> {
    stream.markdown([
      '# Copilot Customizer: Available Commands',
      '',
      '## Chat Slash Commands',
      'Use `@CopilotCustomizer` followed by these commands:',
      '',
      '- `/generate-chatmode` — Generate a new chat mode with AI workflow',
      '- `/generate-instructions` — Generate new instruction files with AI workflow', 
      '- `/generate-prompt` — Generate a new prompt template with AI workflow',
      '- `/generate-agent` — Generate a new agent file with AI workflow',
      '- `/harmonize` — Harmonize and cross-reference related assets',
      '- `/optimize` — Optimize and improve existing assets',
      '- `/repo-review` — Run comprehensive repository analysis',
      '- `/open` — Open the Asset Generator webview panel',
      '- `/help` — Show this help information',
      '',
      '## VS Code Commands',
      'Available in Command Palette (Ctrl+Shift+P):',
      '',
      '- `Copilot Customizer: New Chat Mode` — Open chat mode prompt template',
      '- `Copilot Customizer: New Instructions` — Open instructions prompt template', 
      '- `Copilot Customizer: New Prompt` — Open prompt template',
      '- `Copilot Customizer: Harmonize Assets` — Open harmonization prompt',
      '- `Copilot Customizer: Optimize Assets` — Open optimization prompt',
      '- `Copilot Customizer: Format Assets` — Validate core asset presence',
      '- `Copilot Customizer: Open Generator` — Open asset generator webview',
      '- `Copilot Customizer: Use Chat Mode Now` — Open chat and focus on mode selection',
      '- `Copilot Customizer: Open Copilot Chat` — Open chat with setup guidance',
      '- `Copilot Customizer: Install Bundled Chat Mode` — Install default CopilotCustomizer mode',
      '- `Copilot Customizer: Refresh Asset Explorer` — Refresh asset tree view',
      '',
      '## UI Features',
      '',
      '- **Status Bar**: Click "Copilot: Generator" or "Copilot: Chat" for quick access',
      '- **Asset Explorer**: Browse .github/ structure in sidebar (if available)',
      '- **Asset Generator Panel**: Interactive webview for asset creation and management',
      '',
      '## Usage Tips',
      '',
      '- For AI-powered generation, use slash commands with `@CopilotCustomizer`',
      '- For template-based creation, use VS Code commands or status bar buttons', 
      '- You can say "confirm", "continue", or "yes" to proceed with previous workflows',
      '- Normal chat messages (without slash commands) work as regular Copilot assistance',
      '- Select chat modes from the dropdown in chat input (from `.github/chatmodes/`)',
      ''
    ].join('\n'));
    await this.listAvailableModes(stream);
  }

  /**
   * Handle slash commands and return true if handled.
   */
  private async handleSlashCommand(
    cmd: string | undefined,
    request: vscode.ChatRequest,
    chatContext: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken
  ): Promise<boolean> {
    if (!cmd) return false;

    // Map slash commands to LM-driven workflows (no UI file opens)
    switch (cmd) {
      case 'generate-chatmode':
        this.lastFlow = { promptRelPath: '.github/prompts/NewChatmode.prompt.md', outPrefix: 'chatmode', lastUserPrompt: request.prompt };
        await this.workflowManager.runPromptWorkflow('.github/prompts/NewChatmode.prompt.md', request, chatContext, stream, token, 'chatmode', undefined, undefined, 'newChatMode');
        return true;
        
      case 'generate-instructions':
        this.lastFlow = { promptRelPath: '.github/prompts/NewInstructions.prompt.md', outPrefix: 'instructions', lastUserPrompt: request.prompt };
        await this.workflowManager.runPromptWorkflow('.github/prompts/NewInstructions.prompt.md', request, chatContext, stream, token, 'instructions', undefined, undefined, 'newInstructions');
        return true;
        
      case 'generate-prompt':
        this.lastFlow = { promptRelPath: '.github/prompts/NewPrompt.prompt.md', outPrefix: 'prompt', lastUserPrompt: request.prompt };
        await this.workflowManager.runPromptWorkflow('.github/prompts/NewPrompt.prompt.md', request, chatContext, stream, token, 'prompt', undefined, undefined, 'newPrompt');
        return true;
        
      case 'generate-agent':
        this.lastFlow = { promptRelPath: '.github/prompts/NewAgent.prompt.md', outPrefix: 'agent', lastUserPrompt: request.prompt };
        await this.workflowManager.runPromptWorkflow('.github/prompts/NewAgent.prompt.md', request, chatContext, stream, token, 'agent', undefined, undefined, 'newAgent');
        return true;
        
      case 'harmonize':
        this.lastFlow = { promptRelPath: '.github/prompts/HarmonizeAssets.prompt.md', outPrefix: 'harmonized', lastUserPrompt: request.prompt };
        await this.workflowManager.runPromptWorkflow('.github/prompts/HarmonizeAssets.prompt.md', request, chatContext, stream, token, 'harmonized', undefined, undefined, 'harmonize');
        return true;
        
      case 'optimize':
        this.lastFlow = { promptRelPath: '.github/prompts/AssetOptimization.prompt.md', outPrefix: 'optimized', lastUserPrompt: request.prompt };
        await this.workflowManager.runPromptWorkflow('.github/prompts/AssetOptimization.prompt.md', request, chatContext, stream, token, 'optimized', undefined, undefined, 'optimize');
        return true;
        
      case 'repo-review':
        const repo = this.assetResolver.getWorkspaceFolderName() || 'Repository';
        const custom = `${repo} - Repo Review - ${new Date().toISOString().slice(0,10)}`;
        this.lastFlow = { promptRelPath: '.github/prompts/RepoReview.prompt.md', outPrefix: 'repo-review', lastUserPrompt: request.prompt, customFileName: custom };
        await this.workflowManager.runPromptWorkflow('.github/prompts/RepoReview.prompt.md', request, chatContext, stream, token, 'repo-review', custom, undefined, 'repoReview');
        return true;
        
      default:
        return false;
    }
  }

  /**
   * Handle confirmation/continuation commands and return true if handled.
   */
  private async handleConfirmation(
    request: vscode.ChatRequest,
    chatContext: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken
  ): Promise<boolean> {
    const cmd = (request as any).command as string | undefined;
    
    // If the user replies with plain "confirm" or "continue", re-run the previous workflow with the original user text
    if (
      !cmd &&
      /^\s*(confirm|continue|yes|y|ok|okay|proceed|go|do\s*it)\s*[.!]?$/i.test((request.prompt || '').trim()) &&
      this.lastFlow
    ) {
      const combined = `${(this.lastFlow.lastUserPrompt ?? '').trim()}\n\n${(request.prompt ?? '').trim()}`.trim();
      await this.workflowManager.runPromptWorkflow(
        this.lastFlow.promptRelPath,
        request,
        chatContext,
        stream,
        token,
        this.lastFlow.outPrefix,
        this.lastFlow.customFileName,
        combined,
        undefined
      );
      return true;
    }
    
    return false;
  }

  /**
   * Default chat behavior when no specific command is matched.
   */
  private async defaultChat(
    request: vscode.ChatRequest,
    chatContext: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken
  ): Promise<void> {
    try {
      const messages: vscode.LanguageModelChatMessage[] = [];
      // Provide limited prior assistant context for continuity
      const previousAssistant = chatContext.history.filter(h => h instanceof vscode.ChatResponseTurn) as vscode.ChatResponseTurn[];
      for (const turn of previousAssistant) {
        let acc = '';
        for (const part of turn.response) {
          if ((part as any).value?.value) {
            acc += (part as any).value.value;
          }
        }
        if (acc) messages.push(vscode.LanguageModelChatMessage.Assistant(acc));
      }
      if (request.prompt && request.prompt.trim().length > 0) {
        messages.push(vscode.LanguageModelChatMessage.User(request.prompt));
      }
      const response = await request.model.sendRequest(messages, {}, token);
      for await (const chunk of response.text) {
        stream.markdown(chunk);
      }
    } catch (err: any) {
      stream.markdown(`Failed to respond: ${err?.message ?? String(err)}`);
    }
  }

  /**
   * List available chat modes in the workspace.
   */
  private async listAvailableModes(stream: vscode.ChatResponseStream): Promise<void> {
    const uris = await vscode.workspace.findFiles('**/.github/chatmodes/*.chatmode.md', undefined, 50);
    if (uris.length === 0) return;
    const names = uris.map(u => u.path.split(/[/\\]/).pop() || '').filter(Boolean);
    if (names.length) {
      stream.markdown(['', 'Available chat modes:', ...names.map(n => `- ${n}`)].join('\n'));
    }
  }
}