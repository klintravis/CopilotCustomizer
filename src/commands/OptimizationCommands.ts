import * as vscode from 'vscode';

export function registerOptimizationCommands(context: vscode.ExtensionContext, _output: vscode.OutputChannel) {
  context.subscriptions.push(
    vscode.commands.registerCommand('copilotCustomizer.optimizeAssets', async () => {
      const relativePath = '.github/prompts/AssetOptimization.prompt.md';
      const uri = await resolveWorkspaceUri(relativePath);
      if (uri) {
        const doc = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(doc, { preview: false });
        return;
      }

      // Scaffold if missing
      const primary = vscode.workspace.workspaceFolders?.[0]?.uri;
      if (!primary) {
        vscode.window.showWarningMessage(`Optimize Assets: No workspace is open to create ${relativePath}`);
        return;
      }
      const dest = vscode.Uri.joinPath(primary, relativePath.replace(/^[\\/]+/, ''));
      const destDir = vscode.Uri.joinPath(dest, '..');

      const template = vscode.Uri.joinPath(context.extensionUri, relativePath.replace(/^[\\/]+/, ''));
      let content: Uint8Array | undefined;
      try {
        content = await vscode.workspace.fs.readFile(template);
      } catch {
        const fallback = `---\nmode: CopilotCustomizer\ndescription: 'Asset Optimization Template'\n---\n\n# Optimize Assets\n\nProvide inputs and run to optimize.`;
        content = new TextEncoder().encode(fallback);
      }

      try {
        await vscode.workspace.fs.createDirectory(destDir);
        await vscode.workspace.fs.writeFile(dest, content);
        const doc = await vscode.workspace.openTextDocument(dest);
        await vscode.window.showTextDocument(doc, { preview: false });
        vscode.window.showInformationMessage(`Optimize Assets: Created ${relativePath} from template.`);
      } catch (err: any) {
        vscode.window.showErrorMessage(`Optimize Assets: Failed to create ${relativePath}: ${err?.message ?? String(err)}`);
      }
    })
  );
}

async function resolveWorkspaceUri(relativePath: string): Promise<vscode.Uri | undefined> {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) return undefined;
  // Direct fs.stat first
  for (const f of folders) {
    const candidate = vscode.Uri.joinPath(f.uri, relativePath.replace(/^[\\/]+/, ''));
    try {
      const stat = await vscode.workspace.fs.stat(candidate);
      if (stat.type === vscode.FileType.File) {
        return candidate;
      }
    } catch {}
  }
  // Fallback to findFiles
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
