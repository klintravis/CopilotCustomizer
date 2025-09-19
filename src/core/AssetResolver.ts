import * as vscode from 'vscode';
import { 
  BaseAsset, 
  Asset, 
  AssetType, 
  AssetValidationResult, 
  AssetCollectionOptions, 
  AssetResolverConfig, 
  AssetCacheEntry 
} from '../types/AssetTypes';

// Re-export for backward compatibility
export type InstructionAsset = BaseAsset;

/**
 * Manages asset resolution for workspace and bundled resources.
 * Centralizes all file system operations and asset loading logic.
 */
interface SimpleCacheEntry {
  uri: vscode.Uri;
  timestamp: number;
}

export class AssetResolver {
  private uriCache = new Map<string, SimpleCacheEntry>();
  private assetCache = new Map<string, AssetCacheEntry>();
  private config: AssetResolverConfig;
  private fileWatcher?: vscode.FileSystemWatcher;

  constructor(private context: vscode.ExtensionContext, config?: Partial<AssetResolverConfig>) {
    this.config = {
      cacheTTL: 5000, // 5 seconds
      maxCacheSize: 100,
      enableValidation: true,
      validationStrict: false,
      watchFileChanges: true,
      defaultMaxChars: Infinity,
      enableCompression: false,
      logLevel: 'warn',
      ...config
    };

    this.initializeFileWatcher();
  }

  /**
   * Find the best workspace folder for CopilotCustomizer operations.
   * Prefers folders with 'copilot' or 'customizer' in the name.
   */
  private findBestWorkspaceFolder(): vscode.Uri | undefined {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) return undefined;

    // If only one folder, use it
    if (workspaceFolders.length === 1) {
      return workspaceFolders[0]!.uri;
    }

    // Look for folder with CopilotCustomizer in name
    const copilotFolder = workspaceFolders.find(folder => 
      folder.name.toLowerCase().includes('copilot') ||
      folder.name.toLowerCase().includes('customizer')
    );
    if (copilotFolder) return copilotFolder.uri;

    // Skip obviously wrong folders like "Fantasy Football"
    const goodFolder = workspaceFolders.find(folder => 
      !folder.name.toLowerCase().includes('football') &&
      !folder.name.toLowerCase().includes('fantasy')
    );
    if (goodFolder) return goodFolder.uri;

    // Fallback to first folder
    return workspaceFolders[0]!.uri;
  }

  /**
   * Initialize file system watcher for .github/ asset directories
   */
  private initializeFileWatcher(): void {
    if (!this.config.watchFileChanges) return;

    // Watch for changes in .github/ asset directories
    this.fileWatcher = vscode.workspace.createFileSystemWatcher(
      '**/.github/{instructions,chatmodes,prompts,agents}/**/*.{md,instructions.md,chatmode.md,prompt.md}',
      false, // watchCreate
      false, // watchChange  
      false  // watchDelete
    );

    // Clear relevant cache entries when files change
    this.fileWatcher.onDidCreate((uri) => this.handleFileChange(uri, 'create'));
    this.fileWatcher.onDidChange((uri) => this.handleFileChange(uri, 'change'));
    this.fileWatcher.onDidDelete((uri) => this.handleFileChange(uri, 'delete'));

    this.context.subscriptions.push(this.fileWatcher);
  }

  /**
   * Handle file system changes by invalidating relevant cache entries
   */
  private handleFileChange(uri: vscode.Uri, changeType: 'create' | 'change' | 'delete'): void {
    const relativePath = vscode.workspace.asRelativePath(uri);
    
    if (this.config.logLevel === 'debug') {
      console.log(`AssetResolver: File ${changeType} detected: ${relativePath}`);
    }

    // Clear URI cache entries that might be affected
    const affectedKeys = Array.from(this.uriCache.keys()).filter(key => 
      key.includes(relativePath) || relativePath.includes(key.replace('workspace:', ''))
    );
    
    affectedKeys.forEach(key => {
      this.uriCache.delete(key);
      if (this.config.logLevel === 'debug') {
        console.log(`AssetResolver: Cleared cache entry: ${key}`);
      }
    });

    // Clear asset cache entries that might be affected
    const assetKeys = Array.from(this.assetCache.keys()).filter(key =>
      key.includes(relativePath) || relativePath.includes(key)
    );

    assetKeys.forEach(key => {
      this.assetCache.delete(key);
      if (this.config.logLevel === 'debug') {
        console.log(`AssetResolver: Cleared asset cache entry: ${key}`);
      }
    });
  }

  /**
   * Dispose of resources (called when extension deactivates)
   */
  dispose(): void {
    this.fileWatcher?.dispose();
    this.clearCache();
  }

  /**
   * Map .github/ paths to resources/ paths for bundled assets.
   */
  private mapToResourcePath(relativePath: string): string {
    return relativePath
      .replace(/^[\\/]+/, '')
      .replace(/^\.github\//, 'resources/')
      .replace(/^\.github\\/, 'resources\\');
  }

  /**
   * Find a file in any workspace folder by relative path.
   */
  async findInWorkspace(relativePath: string): Promise<vscode.Uri | undefined> {
    // Check cache first
    const cacheKey = `workspace:${relativePath}`;
    const cached = this.uriCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.config.cacheTTL) {
      try {
        await vscode.workspace.fs.stat(cached.uri);
        return cached.uri;
      } catch {
        // File no longer exists, remove from cache
        this.uriCache.delete(cacheKey);
      }
    }

    const wfs = vscode.workspace.workspaceFolders;
    console.log(`AssetResolver: Workspace folders count: ${wfs?.length || 0}`);
    if (!wfs || wfs.length === 0) {
      console.log(`AssetResolver: No workspace folders found, skipping workspace search for ${relativePath}`);
      return undefined;
    }

    try {
      for (const f of wfs) {
        console.log(`AssetResolver: Searching in workspace folder: ${f.uri.toString()}`);
        const [match] = await vscode.workspace.findFiles(
          new vscode.RelativePattern(f, relativePath),
          undefined,
          1
        );
        if (match) {
          console.log(`AssetResolver: Found match in workspace: ${match.toString()}`);
          // Cache the result
          this.uriCache.set(cacheKey, { uri: match, timestamp: Date.now() });
          return match;
        }
      }
    } catch (error) {
      console.error(`AssetResolver: Error searching workspace for ${relativePath}:`, error);
    }

    console.log(`AssetResolver: No matches found in any workspace folder for ${relativePath}`);
    return undefined;
  }

  /**
   * Read text content from a relative path, trying workspace first, then bundled resources.
   */
  async readText(relativePath: string): Promise<string | undefined> {
    const uri = await this.resolveAssetUri(relativePath);
    if (!uri) return undefined;
    
    try {
      const data = await vscode.workspace.fs.readFile(uri);
      return new TextDecoder().decode(data);
    } catch {
      return undefined;
    }
  }

  /**
   * Resolve an asset path to a URI (workspace-first, fallback to bundled).
   */
  async resolveAssetUri(relPath: string): Promise<vscode.Uri | undefined> {
    // Normalize path
    const norm = relPath.replace(/^[\\/]+/, '');
    
    // Try workspace first
    const ws = await this.findInWorkspace(norm);
    if (ws) {
      console.log(`AssetResolver: Found workspace asset at ${ws.toString()}`);
      return ws;
    }
    
    // Try bundled resources as fallback
    try {
      const mapped = this.mapToResourcePath(norm);
      let bundled = vscode.Uri.joinPath(this.context.extensionUri, mapped);
      
      console.log(`AssetResolver: Trying bundled asset at ${bundled.toString()}`);
      
      // Try the primary location first
      try {
        await vscode.workspace.fs.stat(bundled);
        console.log(`AssetResolver: Found bundled asset at ${bundled.toString()}`);
        return bundled;
      } catch {
        // If that fails, try in the 'out' directory (for development mode)
        bundled = vscode.Uri.joinPath(this.context.extensionUri, 'out', mapped);
        console.log(`AssetResolver: Trying bundled asset in out/ at ${bundled.toString()}`);
        
        await vscode.workspace.fs.stat(bundled);
        console.log(`AssetResolver: Found bundled asset in out/ at ${bundled.toString()}`);
        return bundled;
      }
    } catch (error) {
      // Log debug info for troubleshooting
      const mapped = this.mapToResourcePath(norm);
      const bundled = vscode.Uri.joinPath(this.context.extensionUri, mapped);
      const outBundled = vscode.Uri.joinPath(this.context.extensionUri, 'out', mapped);
      console.log(`AssetResolver: Could not find bundled asset at ${bundled.toString()} or ${outBundled.toString()}`, error);
      console.log(`AssetResolver: Extension URI: ${this.context.extensionUri.toString()}`);
      console.log(`AssetResolver: Mapped path: ${mapped}`);
      return undefined;
    }
  }

  /**
   * Clear the asset cache (useful after file system changes)
   */
  clearCache(): void {
    this.uriCache.clear();
    this.assetCache.clear();
  }

  /**
   * Collect assets of a specific type from workspace and bundled resources
   */
  async collectAssets(assetType: 'instructions' | 'chatmodes' | 'prompts', maxChars = Infinity): Promise<InstructionAsset[]> {
    const extension = this.getAssetExtension(assetType);
    const pattern = `**/.github/${assetType}/*${extension}`;
    const bundledPath = `resources/${assetType}`;
    
    const out: InstructionAsset[] = [];
    const seen = new Set<string>();
    let used = 0;

    try {
      // Workspace first
      const wsUris = await vscode.workspace.findFiles(pattern, undefined, 200);
      for (const uri of wsUris) {
        const base = uri.path.split(/[/\\]/).pop() || uri.toString();
        if (seen.has(base)) continue;
        
        try {
          const data = await vscode.workspace.fs.readFile(uri);
          const txt = new TextDecoder().decode(data);
          if (!txt) continue;
          
          out.push({ name: base, uri, text: txt });
          seen.add(base);
          used += txt.length;
          if (used >= maxChars) break;
        } catch (error) {
          console.warn(`AssetResolver: Failed to read workspace asset ${uri.toString()}:`, error);
        }
      }

      // Bundled resources fallback
      if (used < maxChars) {
        const possibleRoots = [
          vscode.Uri.joinPath(this.context.extensionUri, bundledPath),
          vscode.Uri.joinPath(this.context.extensionUri, 'out', bundledPath)
        ];
        
        for (const root of possibleRoots) {
          try {
            const bundledUris = await this.readAllFilesInDir(root, extension);
            for (const uri of bundledUris) {
              const base = uri.path.split(/[/\\]/).pop() || uri.toString();
              if (seen.has(base)) continue;
              
              try {
                const data = await vscode.workspace.fs.readFile(uri);
                const txt = new TextDecoder().decode(data);
                if (!txt) continue;
                
                out.push({ name: base, uri, text: txt });
                seen.add(base);
                used += txt.length;
                if (used >= maxChars) break;
              } catch (error) {
                console.warn(`AssetResolver: Failed to read bundled asset ${uri.toString()}:`, error);
              }
            }
            if (out.length > 0) break;
          } catch (error) {
            console.warn(`AssetResolver: Failed to access bundled root ${root.toString()}:`, error);
          }
        }
      }
    } catch (error) {
      console.error(`AssetResolver: Failed to collect ${assetType} assets:`, error);
    }

    return out;
  }

  /**
   * Collect instruction assets from workspace and bundled resources with text + URI, de-duped by filename.
   */
  async collectInstructionAssets(maxChars = Infinity): Promise<InstructionAsset[]> {
    return this.collectAssets('instructions', maxChars);
  }

  /**
   * Collect chat mode assets
   */
  async collectChatModeAssets(maxChars = Infinity): Promise<InstructionAsset[]> {
    return this.collectAssets('chatmodes', maxChars);
  }

  /**
   * Collect prompt assets
   */
  async collectPromptAssets(maxChars = Infinity): Promise<InstructionAsset[]> {
    return this.collectAssets('prompts', maxChars);
  }

  /**
   * Get file extension for asset type
   */
  private getAssetExtension(assetType: string): string {
    switch (assetType) {
      case 'instructions': return '.instructions.md';
      case 'chatmodes': return '.chatmode.md';
      case 'prompts': return '.prompt.md';
      default: return '.md';
    }
  }

  /**
   * Legacy method - kept for backwards compatibility
   */
  private async collectInstructionAssetsLegacy(maxChars = Infinity): Promise<InstructionAsset[]> {
    return this.collectAssets('instructions', maxChars);
  }

  /**
   * Recursively read all files in a directory that end with a specific extension.
   */
  async readAllFilesInDir(dir: vscode.Uri, endsWith: string): Promise<vscode.Uri[]> {
    const out: vscode.Uri[] = [];
    try {
      const entries = await vscode.workspace.fs.readDirectory(dir);
      for (const [name, type] of entries) {
        const child = vscode.Uri.joinPath(dir, name);
        if (type === vscode.FileType.Directory) {
          const nested = await this.readAllFilesInDir(child, endsWith);
          out.push(...nested);
        } else if (type === vscode.FileType.File && name.toLowerCase().endsWith(endsWith.toLowerCase())) {
          out.push(child);
        }
      }
    } catch {
      // ignore missing dir
    }
    return out;
  }

  /**
   * Create output directory and return a unique file URI for saving generated content.
   * Preserves original names for existing assets, generates friendly names for new content.
   */
  async ensureOutputUri(prefix: string, ext = 'md', customFileName?: string, originalAssetNames?: string[]): Promise<vscode.Uri | undefined> {
    const root = this.findBestWorkspaceFolder();
    if (!root) {
      console.warn('AssetResolver: No workspace folder found');
      return undefined;
    }

    console.log(`AssetResolver: Using workspace folder: ${root.toString()}`);
    
    // Use .github/output for better organization and asset manager pickup
    const outDir = vscode.Uri.joinPath(root, '.github', 'output');
    try {
      await vscode.workspace.fs.createDirectory(outDir);
      console.log(`AssetResolver: Created/ensured output directory: ${outDir.fsPath}`);
    } catch (error) {
      console.warn(`AssetResolver: Failed to create output directory: ${error}`);
    }
    
    const ts = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const time = new Date().toTimeString().slice(0, 8).replace(/:/g, '-'); // HH-MM-SS
    
    let filename: string;
    if (customFileName) {
      filename = customFileName;
    } else if (originalAssetNames && originalAssetNames.length > 0) {
      // For existing assets (harmonize/optimize), preserve original names or create descriptive names
      if (originalAssetNames.length === 1) {
        // Single asset: preserve original name with prefix
        const baseName = originalAssetNames[0]?.split('/').pop();
        const originalName = baseName?.replace(/\.(chatmode|instructions|prompt)\.md$/, '') || 'Asset';
        switch (prefix) {
          case 'harmonized':
            filename = `${originalName}-Harmonized`;
            break;
          case 'optimized':
            filename = `${originalName}-Optimized`;
            break;
          default:
            filename = `${originalName}-${prefix}`;
        }
      } else {
        // Multiple assets: descriptive batch name
        const assetTypes = originalAssetNames.map(name => {
          if (name.includes('chatmode')) return 'ChatMode';
          if (name.includes('instructions')) return 'Instructions';
          if (name.includes('prompt')) return 'Prompt';
          return 'Asset';
        });
        const uniqueTypes = [...new Set(assetTypes)];
        const typeString = uniqueTypes.join('-');
        
        switch (prefix) {
          case 'harmonized':
            filename = `${uniqueTypes.length > 1 ? 'Mixed' : uniqueTypes[0]}-Assets-Harmonized-${ts}`;
            break;
          case 'optimized':
            filename = `${uniqueTypes.length > 1 ? 'Mixed' : uniqueTypes[0]}-Assets-Optimized-${ts}`;
            break;
          default:
            filename = `${typeString}-${prefix}-${ts}`;
        }
      }
    } else {
      // New generation: use friendly names
      const workspace = this.getWorkspaceFolderName() || 'Generated';
      switch (prefix) {
        case 'chatmode':
          filename = `Generated-${workspace}-Mode`;
          break;
        case 'instructions':
          filename = `Generated-${workspace}-Instructions`;
          break;
        case 'prompt':
          filename = `Generated-${workspace}-Prompt`;
          break;
        case 'repo-review':
          filename = `${workspace}-Repo-Review-${ts}`;
          break;
        default:
          filename = `Generated-${workspace}-${prefix}-${ts}-${time}`;
      }
    }
    
    const safe = filename.replace(/[\\/:*?"<>|]+/g, '-');
    const file = vscode.Uri.joinPath(outDir, `${safe}.${ext}`);
    console.log(`AssetResolver: Generated output file path: ${file.fsPath} (original assets: ${originalAssetNames?.join(', ') || 'none'})`);
    return file;
  }

  /**
   * Get workspace folder name for generating filenames.
   */
  getWorkspaceFolderName(): string | undefined {
    const folder = this.findBestWorkspaceFolder();
    if (!folder) return undefined;
    
    const name = vscode.workspace.workspaceFolders?.find(wf => wf.uri.toString() === folder.toString())?.name;
    if (!name) return undefined;
    
    // If the repo folder name ends with ".github" (e.g., "Fantasy Football.github"), strip that suffix for nicer filenames
    const base = name.replace(/\.github$/i, '').trim();
    // Sanitize for filename use
    return base.replace(/[\/:*?"<>|]+/g, '-');
  }

  /**
   * Check if a filename matches any of the given patterns using simple glob matching.
   */
  matchesAny(name: string, patterns: string[]): boolean {
    if (!patterns.length) return false;
    return patterns.some(p => this.simpleMatch(name, p));
  }

  /**
   * Validate asset structure and schema compliance
   */
  validateAsset(content: string, assetType: 'instructions' | 'chatmodes' | 'prompts'): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    try {
      // Check for YAML front matter
      if (!content.startsWith('---')) {
        errors.push('Missing YAML front matter');
      } else {
        const frontMatterEnd = content.indexOf('---', 3);
        if (frontMatterEnd === -1) {
          errors.push('Malformed YAML front matter - missing closing ---');
        }
      }

      // Asset-specific validation
      switch (assetType) {
        case 'instructions':
          if (!content.includes('applyTo:')) {
            errors.push('Instructions must include applyTo field');
          }
          break;
        case 'chatmodes':
          if (!content.includes('description:')) {
            errors.push('Chat modes must include description field');
          }
          break;
        case 'prompts':
          if (!content.includes('mode:')) {
            errors.push('Prompts should include mode specification');
          }
          break;
      }

      // Check for proper markdown structure
      if (!content.includes('#')) {
        errors.push('Asset should contain markdown headers');
      }

    } catch (error) {
      errors.push(`Validation error: ${error instanceof Error ? error.message : String(error)}`);
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Simple glob pattern matching without external dependencies.
   */
  private simpleMatch(filename: string, pattern: string): boolean {
    if (pattern === '*' || pattern === '**') return true;
    const lower = filename.toLowerCase();
    const lowerPattern = pattern.toLowerCase();
    
    if (pattern.includes('*')) {
      const regex = new RegExp('^' + lowerPattern.replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
      return regex.test(lower);
    }
    return lower.includes(lowerPattern);
  }
}