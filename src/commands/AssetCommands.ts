import * as vscode from 'vscode';
import { BaseCommand } from './BaseCommand';

class AssetCommands extends BaseCommand {
  register(): void {
    this.context.subscriptions.push(
      vscode.commands.registerCommand('copilotCustomizer.newChatMode', async () => {
        await this.insertChatCommand('/generate-chatmode');
      }),
      vscode.commands.registerCommand('copilotCustomizer.newInstructions', async () => {
        await this.insertChatCommand('/generate-instructions');
      }),
      vscode.commands.registerCommand('copilotCustomizer.newPrompt', async () => {
        await this.insertChatCommand('/generate-prompt');
      }),
      vscode.commands.registerCommand('copilotCustomizer.newAgent', async () => {
        await this.insertChatCommand('/generate-agent');
      })
    );
  }

  private async insertChatCommand(command: string): Promise<void> {
    try {
      // Try various commands to insert text into chat and focus
      const insertCommands = [
        'workbench.action.chat.insertText',
        'chat.action.insertText', 
        'workbench.action.chat.sendMessage',
        'github.copilotChat.insertText'
      ];
      
      let success = false;
      for (const cmd of insertCommands) {
        try {
          await vscode.commands.executeCommand(cmd, command);
          success = true;
          break;
        } catch {
          // Continue trying other commands
        }
      }

      if (!success) {
        // Fallback: Just open chat silently
        await vscode.commands.executeCommand('workbench.action.chat.open');
      }
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to insert chat command: ${error}`);
    }
  }
}

export function registerAssetCommands(context: vscode.ExtensionContext) {
  const commands = new AssetCommands(context);
  commands.register();
}
