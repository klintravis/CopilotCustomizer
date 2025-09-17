import * as vscode from 'vscode';

export function registerValidationCommands(context: vscode.ExtensionContext, _output: vscode.OutputChannel) {
  context.subscriptions.push(
    vscode.commands.registerCommand('copilotCustomizer.validateAssets', async () => {
      // Simple validation: check presence of core assets and report
      const required = [
        '.github/chatmodes/CopilotCustomizer.chatmode.md',
        '.github/instructions/FormatAssets.instructions.md',
        '.github/prompts/NewPrompt.prompt.md'
      ];

      const missing: string[] = [];
      for (const p of required) {
        const uri = await resolveWorkspaceUri(p);
        if (!uri) missing.push(p);
      }

      if (missing.length) {
        vscode.window.showWarningMessage(`Validation: Missing ${missing.length} asset(s):\n` + missing.join('\n'));
      } else {
        vscode.window.showInformationMessage('Validation: Core assets detected.');
      }
    })
  );
}

async function resolveWorkspaceUri(relativePath: string): Promise<vscode.Uri | undefined> {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) return undefined;
  for (const f of folders) {
    const [match] = await vscode.workspace.findFiles(
      new vscode.RelativePattern(f, relativePath),
      undefined,
      1
    );
    if (match) return match;
  }
  return undefined;
}
