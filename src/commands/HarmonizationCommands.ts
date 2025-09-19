import * as vscode from 'vscode';
import { BaseCommand } from './BaseCommand';

class HarmonizationCommands extends BaseCommand {
  register(): void {
    this.context.subscriptions.push(
      vscode.commands.registerCommand('copilotCustomizer.harmonizeAssets', async () => {
        const relativePath = '.github/prompts/HarmonizeAssets.prompt.md';
        await this.openPromptFile(relativePath, 'Harmonize Assets');
      })
    );
  }
}

export function registerHarmonizationCommands(context: vscode.ExtensionContext) {
  const commands = new HarmonizationCommands(context);
  commands.register();
}
