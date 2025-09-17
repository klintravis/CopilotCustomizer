import * as vscode from 'vscode';
// import { revealInExplorer } from '../utils/FileSystemUtils';

export function registerAssetCommands(context: vscode.ExtensionContext, _output: vscode.OutputChannel) {
  context.subscriptions.push(
    vscode.commands.registerCommand('copilotCustomizer.generateChatMode', async () => {
      await openPromptFile('.github/prompts/NewChatmode.prompt.md', 'Generate Chat Mode');
    }),
    vscode.commands.registerCommand('copilotCustomizer.generateInstructions', async () => {
      await openPromptFile('.github/prompts/NewInstructions.prompt.md', 'Generate Instructions');
    }),
    vscode.commands.registerCommand('copilotCustomizer.generatePrompt', async () => {
      await openPromptFile('.github/prompts/NewPrompt.prompt.md', 'Generate Prompt');
    })
  );

  async function openPromptFile(relativePath: string, title: string) {
    // 1) Try to open from current workspace
    const found = await resolveWorkspaceUri(relativePath);
    if (found) {
      const doc = await vscode.workspace.openTextDocument(found);
      await vscode.window.showTextDocument(doc, { preview: false });
      return;
    }

    // 2) Not found — scaffold from extension template if available
    const primary = vscode.workspace.workspaceFolders?.[0]?.uri;
    if (!primary) {
      vscode.window.showWarningMessage(`${title}: No workspace is open to create ${relativePath}`);
      return;
    }

    const dest = vscode.Uri.joinPath(primary, relativePath.replace(/^[\\/]+/, ''));
    const destDir = vscode.Uri.joinPath(dest, '..');

    // Template location within the extension (dev mode: repo root)
    const template = vscode.Uri.joinPath((context as any).extensionUri, relativePath.replace(/^[\\/]+/, ''));
    let content: Uint8Array | undefined;
    try {
      content = await vscode.workspace.fs.readFile(template);
    } catch {
      // Fallback minimal content if template not packaged
      const fallback = `---\nmode: generate\ndescription: '${title} Template'\n---\n\n# ${title}\n\nFill out variables and run to generate assets.`;
      content = new TextEncoder().encode(fallback);
    }

    try {
      await vscode.workspace.fs.createDirectory(destDir);
      await vscode.workspace.fs.writeFile(dest, content);
      const doc = await vscode.workspace.openTextDocument(dest);
      await vscode.window.showTextDocument(doc, { preview: false });
      vscode.window.showInformationMessage(`${title}: Created ${relativePath} from template.`);
    } catch (err: any) {
      vscode.window.showErrorMessage(`${title}: Failed to create ${relativePath}: ${err?.message ?? String(err)}`);
    }
  }
}

async function resolveWorkspaceUri(relativePath: string): Promise<vscode.Uri | undefined> {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) return undefined;
  // First, try direct fs.stat for each folder (handles files that might be excluded from search)
  for (const f of folders) {
    const candidate = vscode.Uri.joinPath(f.uri, relativePath.replace(/^[\\/]+/, ''));
    try {
      const stat = await vscode.workspace.fs.stat(candidate);
      if (stat.type === vscode.FileType.File) {
        return candidate;
      }
    } catch {
      // not found in this folder; continue
    }
  }
  // Fallback to findFiles with RelativePattern
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
