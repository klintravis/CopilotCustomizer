import * as vscode from 'vscode';

/**
 * Base class for all command modules.
 * Provides shared utilities like workspace URI resolution and template scaffolding.
 */
export abstract class BaseCommand {
  constructor(protected context: vscode.ExtensionContext) {}

  /**
   * Resolve a relative path to a workspace URI.
   * Tries direct file system access first, then fallback to workspace search.
   */
  protected async resolveWorkspaceUri(relativePath: string): Promise<vscode.Uri | undefined> {
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

  /**
   * Create a file from template with fallback content.
   * Used for scaffolding new assets when templates aren't found.
   */
  protected async scaffoldFromTemplate(
    relativePath: string,
    title: string,
    fallbackContent?: string
  ): Promise<vscode.Uri | undefined> {
    const primary = vscode.workspace.workspaceFolders?.[0]?.uri;
    if (!primary) {
      vscode.window.showWarningMessage(`${title}: No workspace is open to create ${relativePath}`);
      return undefined;
    }

    const dest = vscode.Uri.joinPath(primary, relativePath.replace(/^[\\/]+/, ''));
    const destDir = vscode.Uri.joinPath(dest, '..');

    // Try to load template from extension resources
    const resourcePath = relativePath
      .replace(/^[\\/]+/, '')
      .replace(/^\.github\//, 'resources/')
      .replace(/^\.github\\/, 'resources\\');
    const template = vscode.Uri.joinPath(this.context.extensionUri, resourcePath);
    let content: Uint8Array;
    
    try {
      content = await vscode.workspace.fs.readFile(template);
    } catch {
      // Fallback to provided content or minimal template
      const fallback = fallbackContent || 
        `---\nmode: generate\ndescription: '${title} Template'\n---\n\n# ${title}\n\nFill out variables and run to generate assets.`;
      content = new TextEncoder().encode(fallback);
    }

    try {
      await vscode.workspace.fs.createDirectory(destDir);
      await vscode.workspace.fs.writeFile(dest, content);
      // File created successfully
      return dest;
    } catch (err: any) {
      vscode.window.showErrorMessage(`${title}: Failed to create ${relativePath}: ${err?.message ?? String(err)}`);
      return undefined;
    }
  }

  /**
   * Open a prompt file, creating it from template if needed.
   * Common pattern used across asset generation commands.
   */
  protected async openPromptFile(relativePath: string, title: string): Promise<void> {
    // 1) Try to open from current workspace
    const found = await this.resolveWorkspaceUri(relativePath);
    if (found) {
      const doc = await vscode.workspace.openTextDocument(found);
      await vscode.window.showTextDocument(doc, { preview: false });
      return;
    }

    // 2) Not found — scaffold from extension template if available
    const dest = await this.scaffoldFromTemplate(relativePath, title);
    if (dest) {
      const doc = await vscode.workspace.openTextDocument(dest);
      await vscode.window.showTextDocument(doc, { preview: false });
    }
  }

  /**
   * Abstract method for command registration.
   * Each command class must implement this to register its specific commands.
   */
  abstract register(): void;
}