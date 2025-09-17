import * as vscode from 'vscode';

export class AssetTreeProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData: vscode.Event<void> = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {
    if (!vscode.workspace.workspaceFolders) return [];

    if (!element) {
      // roots: .github and output if exist
  const roots: vscode.TreeItem[] = [];
  const wf = vscode.workspace.workspaceFolders;
  if (!wf || wf.length === 0) return roots;
  const base = wf[0]!.uri;
      for (const folderName of ['.github', 'output']) {
        const folderUri = vscode.Uri.joinPath(base, folderName);
        try {
          const stat = await vscode.workspace.fs.stat(folderUri);
          if (stat.type === vscode.FileType.Directory) {
            const item = new vscode.TreeItem(folderName, vscode.TreeItemCollapsibleState.Collapsed);
            item.resourceUri = folderUri;
            item.iconPath = new vscode.ThemeIcon('folder');
            roots.push(item);
          }
        } catch {
          // folder does not exist; skip
        }
      }
      return roots;
    }

    // children: list files under a folder
    const uri = element.resourceUri;
    if (!uri) return [];
    const entries = await vscode.workspace.fs.readDirectory(uri);
    const children: vscode.TreeItem[] = [];
    for (const [name, type] of entries) {
      const childUri = vscode.Uri.joinPath(uri, name);
      const isDir = type === vscode.FileType.Directory;
      const collapsible = isDir ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None;
      const item = new vscode.TreeItem(name, collapsible);
      item.resourceUri = childUri;
      item.iconPath = isDir ? new vscode.ThemeIcon('folder') : new vscode.ThemeIcon(getIconForFile(name));
      if (!isDir) {
        item.command = {
          command: 'vscode.open',
          title: 'Open',
          arguments: [childUri]
        };
      }
      children.push(item);
    }
    return children;
  }

  // No longer used: root detection now uses fs.stat
  // private async find(relativePath: string): Promise<vscode.Uri | undefined> {
  //   const base = vscode.workspace.workspaceFolders?.[0];
  //   if (!base) return undefined;
  //   const [match] = await vscode.workspace.findFiles(new vscode.RelativePattern(base, relativePath), undefined, 1);
  //   return match;
  // }
}

function getIconForFile(name: string): string {
  if (name.endsWith('.chatmode.md')) return 'comment-discussion';
  if (name.endsWith('.instructions.md')) return 'book';
  if (name.endsWith('.prompt.md')) return 'symbol-parameter';
  return 'file-text';
}
