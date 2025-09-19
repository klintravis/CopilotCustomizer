import * as vscode from 'vscode';
import { BaseCommand } from './BaseCommand';

class ValidationCommands extends BaseCommand {
  register(): void {
    this.context.subscriptions.push(
      vscode.commands.registerCommand('copilotCustomizer.formatAssets', async () => {
        // Simple validation: check presence of core assets and report
        const required = [
          '.github/chatmodes/CopilotCustomizer.chatmode.md',
          '.github/instructions/FormatAssets.instructions.md',
          '.github/prompts/NewPrompt.prompt.md'
        ];

        const missing: string[] = [];
        for (const p of required) {
          const uri = await this.resolveWorkspaceUri(p);
          if (!uri) missing.push(p);
        }

        if (missing.length) {
          vscode.window.showWarningMessage(`Validation: Missing ${missing.length} asset(s):\n` + missing.join('\n'));
        } else {
          // Validation passed silently
        }
      })
    );
  }
}

export function registerValidationCommands(context: vscode.ExtensionContext) {
  const commands = new ValidationCommands(context);
  commands.register();
}
