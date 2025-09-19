import * as vscode from 'vscode';

export class AssetTreeProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData: vscode.Event<void> = this._onDidChangeTreeData.event;
  private selectedAssets: Set<string> = new Set();

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getSelectedAssets(): string[] {
    return Array.from(this.selectedAssets);
  }

  toggleSelection(resourcePath: string): void {
    if (this.selectedAssets.has(resourcePath)) {
      this.selectedAssets.delete(resourcePath);
    } else {
      this.selectedAssets.add(resourcePath);
    }
    this.refresh();
  }

  clearSelection(): void {
    this.selectedAssets.clear();
    this.refresh();
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
   * Check if the CopilotCustomizer chat mode is installed in the workspace.
   */
  private async checkChatModeInstalled(): Promise<boolean> {
    const workspaceFolder = this.findBestWorkspaceFolder();
    if (!workspaceFolder) return false;

    try {
      const chatModeUri = vscode.Uri.joinPath(workspaceFolder, '.github', 'chatmodes', 'CopilotCustomizer.chatmode.md');
      await vscode.workspace.fs.stat(chatModeUri);
      return true;
    } catch {
      return false;
    }
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {
    if (!vscode.workspace.workspaceFolders) return [];

    if (!element) {
      // Check if chat mode is installed
      const hasChatMode = await this.checkChatModeInstalled();
      
      if (!hasChatMode) {
        // Show only the Install Chat Mode button when chat mode is not installed
        const roots: vscode.TreeItem[] = [];
        
        const installButton = new vscode.TreeItem('📥 Install Chat Mode', vscode.TreeItemCollapsibleState.None);
        installButton.tooltip = 'Install the CopilotCustomizer chat mode to enable full functionality';
        installButton.description = 'Required for asset generation and management';
        installButton.command = {
          command: 'copilotCustomizer.installBundledChatMode',
          title: 'Install Chat Mode'
        };
        installButton.contextValue = 'installChatMode';
        installButton.iconPath = new vscode.ThemeIcon('cloud-download', new vscode.ThemeColor('button.foreground'));
        roots.push(installButton);

        // Add a help item explaining what this does
        const helpItem = new vscode.TreeItem('ℹ️ Why install?', vscode.TreeItemCollapsibleState.None);
        helpItem.tooltip = 'The chat mode enables @CopilotCustomizer commands for generating assets, harmonizing files, and optimization workflows.';
        helpItem.description = 'Enables @CopilotCustomizer chat commands';
        helpItem.contextValue = 'installHelp';
        helpItem.iconPath = new vscode.ThemeIcon('info', new vscode.ThemeColor('foreground'));
        roots.push(helpItem);
        
        return roots;
      }

      // Create structured root items to match webview design (when chat mode is installed)
      const roots: vscode.TreeItem[] = [];

      // Open Customizer button at the top
      const openCustomizerItem = new vscode.TreeItem('🎨 Open Customizer', vscode.TreeItemCollapsibleState.None);
      openCustomizerItem.tooltip = 'Click to open the full Asset Generator interface';
      openCustomizerItem.command = {
        command: 'copilotCustomizer.openGenerator',
        title: 'Open Customizer'
      };
      openCustomizerItem.contextValue = 'openCustomizer';
      openCustomizerItem.iconPath = new vscode.ThemeIcon('rocket', new vscode.ThemeColor('charts.blue'));
      roots.push(openCustomizerItem);

      // Quick Create section
      const quickCreateItem = new vscode.TreeItem('🚀 Quick Create Assets', vscode.TreeItemCollapsibleState.Expanded);
      quickCreateItem.tooltip = 'Create new assets quickly';
      quickCreateItem.contextValue = 'quickCreate';
      roots.push(quickCreateItem);

      // Asset Management section  
      const assetMgmtItem = new vscode.TreeItem('🔗 Asset Management', vscode.TreeItemCollapsibleState.Expanded);
      assetMgmtItem.tooltip = 'Manage existing assets';
      assetMgmtItem.contextValue = 'assetManagement';
      roots.push(assetMgmtItem);

      return roots;
    }

    // Handle Quick Create section
    if (element.contextValue === 'quickCreate') {
      const quickItems: vscode.TreeItem[] = [];

      const chatModeItem = new vscode.TreeItem('💬 Chat Mode');
      chatModeItem.tooltip = 'Create a new chat mode with AI persona and behavior definitions';
      chatModeItem.command = {
        command: 'copilotCustomizer.newChatMode',
        title: 'Create Chat Mode'
      };
      chatModeItem.contextValue = 'quickCreateItem';
      quickItems.push(chatModeItem);

      const instructionsItem = new vscode.TreeItem('📋 Instructions');
      instructionsItem.tooltip = 'Generate instruction files for guiding AI behavior and code generation';
      instructionsItem.command = {
        command: 'copilotCustomizer.newInstructions',
        title: 'Create Instructions'
      };
      instructionsItem.contextValue = 'quickCreateItem';
      quickItems.push(instructionsItem);

      const promptItem = new vscode.TreeItem('⚡ Prompt');
      promptItem.tooltip = 'Create prompt templates for structured AI interactions';
      promptItem.command = {
        command: 'copilotCustomizer.newPrompt',
        title: 'Create Prompt'
      };
      promptItem.contextValue = 'quickCreateItem';
      quickItems.push(promptItem);

      const agentItem = new vscode.TreeItem('🤖 Agent');
      agentItem.tooltip = 'Generate agent files for project-specific AI guidance';
      agentItem.command = {
        command: 'copilotCustomizer.newAgent',
        title: 'Create Agent'
      };
      agentItem.contextValue = 'quickCreateItem';
      quickItems.push(agentItem);

      return quickItems;
    }

    // Handle Asset Management section
    if (element.contextValue === 'assetManagement') {
      const assetItems: vscode.TreeItem[] = [];
      const base = this.findBestWorkspaceFolder();
      if (!base) return assetItems;

      // Scan for assets similar to webview, including output directory
      for (const [subdir, type, icon] of [
        ['chatmodes', 'chatmode', '💬'],
        ['instructions', 'instructions', '📋'], 
        ['prompts', 'prompt', '⚡'],
        ['output', 'output', '📁']
      ] as const) {
        const subdirUri = vscode.Uri.joinPath(base, '.github', subdir);
        try {
          const entries = await vscode.workspace.fs.readDirectory(subdirUri);
          for (const [name, fileType] of entries) {
            if (fileType === vscode.FileType.File && name.endsWith('.md')) {
              const assetPath = `.github/${subdir}/${name}`;
              
              // Handle output files differently - they're preview files, not selectable assets
              if (subdir === 'output') {
                const outputItem = new vscode.TreeItem(`${icon} ${name}`);
                outputItem.resourceUri = vscode.Uri.joinPath(subdirUri, name);
                outputItem.tooltip = `Generated Output: ${name} (Click to open)`;
                outputItem.iconPath = new vscode.ThemeIcon('file-text', new vscode.ThemeColor('charts.blue'));
                outputItem.command = {
                  command: 'copilotCustomizer.openAssetFile',
                  title: 'Open File',
                  arguments: [outputItem]
                };
                outputItem.contextValue = 'outputFile';
                assetItems.push(outputItem);
              } else {
                // Regular asset files - selectable for operations
                const isSelected = this.selectedAssets.has(assetPath);
                const hasMultipleSelections = this.selectedAssets.size > 1;
                const assetItem = new vscode.TreeItem(`${icon} ${name}`);
                assetItem.resourceUri = vscode.Uri.joinPath(subdirUri, name);
                assetItem.tooltip = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${name}${isSelected ? ' (Selected)' : ''}`;
                // Use iconPath for selection indicator
                if (isSelected) {
                  assetItem.iconPath = new vscode.ThemeIcon('check', new vscode.ThemeColor('charts.green'));
                } else {
                  assetItem.iconPath = new vscode.ThemeIcon('circle-outline');
                }
                assetItem.command = {
                  command: 'copilotCustomizer.toggleAssetSelection',
                  title: 'Toggle Selection',
                  arguments: [assetPath]
                };
                // Set context value based on selection state and count
                if (isSelected && hasMultipleSelections) {
                  assetItem.contextValue = 'assetFileMultiSelected';
                } else if (isSelected) {
                  assetItem.contextValue = 'assetFileSelected';
                } else {
                  assetItem.contextValue = 'assetFile';
                }
                assetItems.push(assetItem);
              }
            }
          }
        } catch {
          // Directory doesn't exist
        }
      }

      // Check for AGENTS.md in root
      try {
        const agentFile = vscode.Uri.joinPath(base, 'AGENTS.md');
        await vscode.workspace.fs.stat(agentFile);
        const agentPath = 'AGENTS.md';
        const isSelected = this.selectedAssets.has(agentPath);
        const hasMultipleSelections = this.selectedAssets.size > 1;
        const agentItem = new vscode.TreeItem(`🤖 AGENTS.md`);
        agentItem.resourceUri = agentFile;
        agentItem.tooltip = `Agent: AGENTS.md${isSelected ? ' (Selected)' : ''}`;
        // Use iconPath for selection indicator
        if (isSelected) {
          agentItem.iconPath = new vscode.ThemeIcon('check', new vscode.ThemeColor('charts.green'));
        } else {
          agentItem.iconPath = new vscode.ThemeIcon('circle-outline');
        }
        agentItem.command = {
          command: 'copilotCustomizer.toggleAssetSelection',
          title: 'Toggle Selection',
          arguments: [agentPath]
        };
        // Set context value based on selection state and count
        if (isSelected && hasMultipleSelections) {
          agentItem.contextValue = 'assetFileMultiSelected';
        } else if (isSelected) {
          agentItem.contextValue = 'assetFileSelected';
        } else {
          agentItem.contextValue = 'assetFile';
        }
        assetItems.push(agentItem);
      } catch {
        // AGENTS.md doesn't exist
      }

      return assetItems.sort((a, b) => a.label!.toString().localeCompare(b.label!.toString()));
    }

    // Default: return empty array for unhandled cases
    return [];
  }
}
