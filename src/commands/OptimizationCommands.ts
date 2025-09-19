import * as vscode from 'vscode';
import { BaseCommand } from './BaseCommand';

class OptimizationCommands extends BaseCommand {
  register(): void {
    this.context.subscriptions.push(
      vscode.commands.registerCommand('copilotCustomizer.optimizeAssets', async () => {
        const relativePath = '.github/prompts/AssetOptimization.prompt.md';
        const _fallbackContent = `---\nmode: CopilotCustomizer\ndescription: 'Asset Optimization Template'\n---\n\n# Optimize Assets\n\nProvide inputs and run to optimize.`;
        await this.openPromptFile(relativePath, 'Optimize Assets');
      })
    );
  }
}

export function registerOptimizationCommands(context: vscode.ExtensionContext) {
  const commands = new OptimizationCommands(context);
  commands.register();
}
