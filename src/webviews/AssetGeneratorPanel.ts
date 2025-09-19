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
<title>Copilot Customizer</title>
<style>
  body { 
    font-family: var(--vscode-editor-font-family, 'Segoe UI', system-ui, sans-serif);
    padding: 1rem; 
    background: var(--vscode-editor-background);
    color: var(--vscode-editor-foreground);
    margin: 0;
  }
  .section {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid var(--vscode-panel-border);
    border-radius: 8px;
    background: var(--vscode-panel-background);
  }
  .section-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--vscode-textLink-foreground);
  }
  .grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem; 
  }
  .create-button {
    padding: 1rem;
    border: 1px solid var(--vscode-button-border);
    background: var(--vscode-button-secondaryBackground);
    color: var(--vscode-button-secondaryForeground);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 500;
  }
  .create-button:hover {
    background: var(--vscode-button-secondaryHoverBackground);
    transform: translateY(-1px);
  }
  .create-button .icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    display: block;
  }
  .help-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .help-item {
    padding: 1rem;
    background: var(--vscode-input-background);
    border: 1px solid var(--vscode-input-border);
    border-radius: 6px;
  }
  .help-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--vscode-textLink-foreground);
  }
  .help-content {
    font-size: 0.85rem;
    line-height: 1.4;
  }
  .help-content code {
    background: var(--vscode-textCodeBlock-background);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: var(--vscode-editor-font-family, 'Courier New', monospace);
    font-size: 0.8rem;
  }
  .help-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .help-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--vscode-button-border);
    background: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: background-color 0.2s ease;
  }
  .help-button:hover {
    background: var(--vscode-button-hoverBackground);
  }
</style>
</head>
<body>
  <div class="section">
    <div class="section-title">🚀 Quick Create Assets</div>
    <div class="grid">
      <button class="create-button" id="chatmode">
        <span class="icon">💬</span>
        Chat Mode<br>
        <small>Start /generate-chatmode</small>
      </button>
      <button class="create-button" id="instructions">
        <span class="icon">📋</span>
        Instructions<br>
        <small>Start /generate-instructions</small>
      </button>
      <button class="create-button" id="prompt">
        <span class="icon">⚡</span>
        Prompt Template<br>
        <small>Start /generate-prompt</small>
      </button>
      <button class="create-button" id="agent">
        <span class="icon">🤖</span>
        Agent Guide<br>
        <small>Start /generate-agent</small>
      </button>
    </div>
  </div>

  <div class="section">
    <div class="section-title">📚 Quick Reference</div>
    <div class="help-grid">
      <div class="help-item">
        <div class="help-title">💬 Chat Commands (when in @CopilotCustomizer)</div>
        <div class="help-content">
          <code>/generate-chatmode</code> - Create AI persona<br>
          <code>/generate-instructions</code> - Coding guidelines<br>
          <code>/generate-prompt</code> - Reusable templates<br>
          <code>/help</code> - Show all commands
        </div>
      </div>
      <div class="help-item">
        <div class="help-title">⌨️ Keyboard Shortcuts</div>
        <div class="help-content">
          <code>Ctrl+Shift+I</code> - Open Copilot Chat<br>
          <code>Ctrl+Shift+P</code> - Command Palette<br>
          <strong>Tip:</strong> Search "Copilot Customizer"
        </div>
      </div>
    </div>
    <div class="help-actions">
      <button class="help-button" id="openUserGuide">📘 Complete User Guide</button>
      <button class="help-button" id="openQuickRef">🚀 Quick Reference Card</button>
      <button class="help-button" id="openCopilotChat">💬 Open Copilot Chat</button>
    </div>
  </div>
  <script>
    const vscode = acquireVsCodeApi();
    
    // Quick create buttons - insert commands into chat
    document.getElementById('chatmode').onclick = () => vscode.postMessage({ type: 'insertCommand', command: '/generate-chatmode ' });
    document.getElementById('instructions').onclick = () => vscode.postMessage({ type: 'insertCommand', command: '/generate-instructions ' });
    document.getElementById('prompt').onclick = () => vscode.postMessage({ type: 'insertCommand', command: '/generate-prompt ' });
    document.getElementById('agent').onclick = () => vscode.postMessage({ type: 'insertCommand', command: '/generate-agent ' });
    
    // Help buttons
    document.getElementById('openUserGuide').onclick = () => vscode.postMessage({ type: 'open', path: 'USER-GUIDE.md' });
    document.getElementById('openQuickRef').onclick = () => vscode.postMessage({ type: 'open', path: 'QUICK-REFERENCE.md' });
    document.getElementById('openCopilotChat').onclick = () => vscode.postMessage({ type: 'openChat' });
  </script>
</body>
</html>`;

    panel.webview.onDidReceiveMessage(async (msg: { type: string; path?: string; command?: string }) => {
      if (msg?.type === 'insertCommand' && typeof msg.command === 'string') {
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
            await vscode.commands.executeCommand(cmd, msg.command);
            success = true;
            break;
          } catch {
            // Continue trying other commands
          }
        }

        if (!success) {
          // Fallback: Just open chat, let user type command manually
          await vscode.commands.executeCommand('workbench.action.chat.open');
        }
        return;
      }
      
      if (msg?.type === 'openChat') {
        await vscode.commands.executeCommand('workbench.action.chat.open');
        return;
      }
      
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
