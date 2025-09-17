import * as vscode from 'vscode';

export class AssetGeneratorPanel {
  public static createOrShow() {
    const panel = vscode.window.createWebviewPanel(
      'assetGenerator',
      'Asset Generator',
      vscode.ViewColumn.One,
      { enableScripts: true, retainContextWhenHidden: true }
    );

    panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Asset Generator</title>
<style>
  body { font-family: sans-serif; padding: 1rem; }
  .grid { display: grid; gap: .75rem; }
  label { font-weight: 600; }
</style>
</head>
<body>
  <h2>Quick Create</h2>
  <div class="grid">
    <button id="chatmode">Open NewChatmode.prompt.md</button>
    <button id="instructions">Open NewInstructions.prompt.md</button>
    <button id="prompt">Open NewPrompt.prompt.md</button>
  </div>
  <script>
    const vscode = acquireVsCodeApi();
    document.getElementById('chatmode').onclick = () => vscode.postMessage({ type: 'open', path: '.github/prompts/NewChatmode.prompt.md' });
    document.getElementById('instructions').onclick = () => vscode.postMessage({ type: 'open', path: '.github/prompts/NewInstructions.prompt.md' });
    document.getElementById('prompt').onclick = () => vscode.postMessage({ type: 'open', path: '.github/prompts/NewPrompt.prompt.md' });
  </script>
</body>
</html>`;

    panel.webview.onDidReceiveMessage(async (msg: { type: string; path?: string }) => {
      if (msg?.type === 'open' && typeof msg.path === 'string') {
        const folders = vscode.workspace.workspaceFolders;
        if (!folders || folders.length === 0) return;

        // Try direct fs.stat first
        const candidate = vscode.Uri.joinPath(folders[0]!.uri, msg.path.replace(/^[\\/]+/, ''));
        try {
          const stat = await vscode.workspace.fs.stat(candidate);
          if (stat.type === vscode.FileType.File) {
            const doc = await vscode.workspace.openTextDocument(candidate);
            await vscode.window.showTextDocument(doc, { preview: false });
            return;
          }
        } catch {
          // continue to fallback
        }

        // Fallback to findFiles
        const [match] = await vscode.workspace.findFiles(
          new vscode.RelativePattern(folders[0]!, msg.path),
          undefined,
          1
        );
        if (match) {
          const doc = await vscode.workspace.openTextDocument(match);
          await vscode.window.showTextDocument(doc, { preview: false });
          return;
        }

        vscode.window.showWarningMessage(`Could not find ${msg.path}`);
      }
    });
  }
}
