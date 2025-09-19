import * as vscode from 'vscode';
import { AssetResolver } from '../core/AssetResolver';
import { ConfigurationManager, CommandKey } from '../core/ConfigurationManager';

/**
 * Manages workflow execution for prompt-based asset generation.
 * Handles the orchestration of LLM requests with context and asset creation.
 */
export class WorkflowManager {
  constructor(
    private _context: vscode.ExtensionContext,
    private assetResolver: AssetResolver,
    private configManager: ConfigurationManager
  ) {}

  /**
   * Determine proper file extension based on command type or output prefix.
   */
  private getProperExtensionForCommand(commandOrPrefix: string): string {
    const input = commandOrPrefix.toLowerCase();
    
    if (input.includes('chatmode') || input.includes('chat-mode')) {
      return 'chatmode.md';
    }
    if (input.includes('instruction') || input.includes('generate-instruction')) {
      return 'instructions.md';
    }
    if (input.includes('prompt') || input.includes('generate-prompt')) {
      return 'prompt.md';
    }
    if (input.includes('agent') || input.includes('generate-agent')) {
      return 'md'; // AGENTS.md files use plain .md
    }
    // Default fallback
    return 'md';
  }

  /**
   * Execute a prompt-based workflow with context and save the results.
   * This workflow is deterministic and continues to completion unless explicitly aborted.
   */
  async runPromptWorkflow(
    promptRelPath: string,
    request: vscode.ChatRequest,
    chatContext: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken,
    outPrefix: string,
    customFileName?: string,
    overrideUserText?: string,
    commandKey?: CommandKey
  ): Promise<void> {
    let dest: vscode.Uri | undefined;
    
    try {
      stream.markdown(`🚀 **Starting ${outPrefix} generation workflow...**\n`);
      
      // Phase 1: Load and validate all required context
      stream.markdown(`📋 **Phase 1: Loading context and references...**\n`);
      
      const promptText = await this.assetResolver.readText(promptRelPath);
      if (!promptText) {
        stream.markdown(`❌ **Critical Error**: Unable to load prompt template: ${promptRelPath}\n\n**Workflow aborted** - prompt template is required.`);
        return;
      }

      const cfg = this.configManager.getContextConfig(commandKey);
      
      // Load all context assets upfront
      const modeText = cfg.includeChatMode ? await this.assetResolver.readText('.github/chatmodes/CopilotCustomizer.chatmode.md') : undefined;
      let instrAssets = await this.assetResolver.collectInstructionAssets();
      
      // Filter instruction assets by patterns
      const includes = cfg.instructionInclude.length ? cfg.instructionInclude : ['*.instructions.md'];
      const excludes = cfg.instructionExclude;
      instrAssets = instrAssets.filter(a => this.assetResolver.matchesAny(a.name, includes) && !this.assetResolver.matchesAny(a.name, excludes));

      // Ensure output destination is available - determine proper extension
      const properExt = this.getProperExtensionForCommand(request.command || outPrefix);
      dest = await this.assetResolver.ensureOutputUri(outPrefix, properExt, customFileName);
      if (!dest) {
        stream.markdown(`❌ **Critical Error**: Unable to create output destination for ${outPrefix}\n\n**Workflow aborted** - output path is required.`);
        return;
      }

      // Register all references in Copilot's context panel
      const promptUri = await this.assetResolver.resolveAssetUri(promptRelPath);
      const modeUri = modeText ? await this.assetResolver.resolveAssetUri('.github/chatmodes/CopilotCustomizer.chatmode.md') : undefined;
      
      // Add references (ignore failures for older VS Code versions)
      if (cfg.includePromptTemplate && promptUri) { 
        try { stream.reference(promptUri); } catch { /* ignore */ }
      }
      if (cfg.includeChatMode && modeUri) { 
        try { stream.reference(modeUri); } catch { /* ignore */ }
      }
      for (const a of instrAssets) {
        try { stream.reference(a.uri); } catch { /* ignore */ }
      }

      // Show loaded context summary
      stream.markdown([
        `✅ **Context loaded successfully:**`,
        `- Prompt template: ${promptRelPath.split(/[\/\\]/).pop()}`,
        modeText ? `- Chat mode: CopilotCustomizer.chatmode.md` : null,
        instrAssets.length > 0 ? `- Instructions: ${instrAssets.length} files` : null,
        `- Output destination: ${dest.fsPath}`,
        ''
      ].filter(Boolean).join('\n'));

      // Phase 2: Build comprehensive context message
      stream.markdown(`🔍 **Phase 2: Building AI context with all references...**\n`);
      
      const messages: vscode.LanguageModelChatMessage[] = [];
      
      // Add system context first
      const systemContext = [
        '# Asset Generation Workflow Context',
        '',
        '## Task Overview', 
        `You are helping generate a ${outPrefix} asset using the CopilotCustomizer framework.`,
        `The output will be saved to: ${dest.fsPath}`,
        '',
        '## Available Context',
        '- Prompt template with specific requirements and format',
        modeText ? '- CopilotCustomizer chat mode for behavior context' : null,
        instrAssets.length > 0 ? `- ${instrAssets.length} instruction files for guidance` : null,
        '- User requirements and specifications',
        '',
        '## Workflow Requirements',
        '1. Review ALL provided context thoroughly',
        '2. Understand user requirements completely', 
        '3. Provide a single confirmation message with your understanding',
        '4. After confirmation, generate the complete asset immediately',
        '5. The final asset MUST be saved - no exceptions',
        ''
      ].filter(Boolean).join('\n');
      
      messages.push(vscode.LanguageModelChatMessage.User(systemContext));
      
      // Include all context assets
      if (modeText) {
        messages.push(vscode.LanguageModelChatMessage.User(`# Chat Mode Context\n\n${modeText}`));
      }
      
      for (const instr of instrAssets) {
        messages.push(vscode.LanguageModelChatMessage.User(`# Instruction: ${instr.name}\n\n${instr.text}`));
      }
      
      if (cfg.includePromptTemplate) {
        messages.push(vscode.LanguageModelChatMessage.User(`# Prompt Template\n\n${promptText}`));
      }

      // Include relevant chat history for continuity
      const previousAssistant = chatContext.history.filter(h => h instanceof vscode.ChatResponseTurn) as vscode.ChatResponseTurn[];
      for (const turn of previousAssistant.slice(-2)) { // Only last 2 turns for context
        let acc = '';
        for (const part of turn.response) {
          if ((part as any).value?.value) {
            acc += (part as any).value.value;
          }
        }
        if (acc.trim()) messages.push(vscode.LanguageModelChatMessage.Assistant(acc));
      }

      // Add user requirements
      let userText = (overrideUserText && overrideUserText.trim().length > 0)
        ? overrideUserText
        : (request.prompt ?? '');

      const finalUserMessage = [
        '# User Requirements',
        '',
        userText.trim() || 'Generate according to the prompt template requirements.',
        '',
        '# Instructions',
        '',
        '1. **Review Phase**: Examine all provided context (chat mode, instructions, prompt template, user requirements)',
        '2. **Confirmation Phase**: Provide ONE confirmation message summarizing what you will create',
        '3. **Generation Phase**: After confirmation, immediately generate the complete asset',
        '',
        '**Important**: This is a deterministic workflow. The asset WILL be generated and saved after confirmation.',
        'Proceed with review and confirmation now.'
      ].join('\n');

      messages.push(vscode.LanguageModelChatMessage.User(finalUserMessage));

      // Phase 3: Send request for confirmation
      stream.markdown(`🤖 **Phase 3: Requesting AI review and confirmation...**\n`);
      
      const response = await request.model.sendRequest(messages, {}, token);
      let fullResponse = '';
      
      for await (const chunk of response.text) {
        fullResponse += chunk;
        stream.markdown(chunk);
      }

      // Phase 4: Determine if this is confirmation or generation
      const isConfirmationResponse = this.isConfirmationResponse(fullResponse);
      
      if (isConfirmationResponse) {
        // This is a confirmation - proceed to generation
        stream.markdown(`\n\n✅ **Confirmation received. Proceeding to generation...**\n`);
        
        const generationMessage = [
          '# Generate Asset Now',
          '',
          'Perfect! Now generate the complete asset exactly as confirmed.',
          'Output ONLY the final asset content - no explanations, no code fences, no additional formatting.',
          'The asset will be automatically saved to the output folder.',
          '',
          'Generate now:'
        ].join('\n');

        const generationMessages = [
          ...messages,
          vscode.LanguageModelChatMessage.Assistant(fullResponse),
          vscode.LanguageModelChatMessage.User(generationMessage)
        ];

        const generationResponse = await request.model.sendRequest(generationMessages, {}, token);
        let generatedContent = '';
        
        stream.markdown(`📝 **Generating asset content...**\n\n`);
        
        for await (const chunk of generationResponse.text) {
          generatedContent += chunk;
          stream.markdown(chunk);
        }

        // Clean and save the generated content
        const cleanedContent = this.cleanGeneratedContent(generatedContent);
        await vscode.workspace.fs.writeFile(dest, new TextEncoder().encode(cleanedContent));
        
        stream.markdown(`\n\n💾 **Asset saved successfully to:** ${dest.fsPath}\n`);
        
      } else {
        // This might already be the final asset - save it
        const cleanedContent = this.cleanGeneratedContent(fullResponse);
        await vscode.workspace.fs.writeFile(dest, new TextEncoder().encode(cleanedContent));
        
        stream.markdown(`\n\n💾 **Asset generated and saved to:** ${dest.fsPath}\n`);
      }

      // Phase 5: Show references and handle special cases
      await this.showAssetReferences(stream, cfg, promptRelPath, promptUri, modeText, modeUri, instrAssets);

      // Handle chat mode special case
      if (outPrefix === 'chatmode') {
        const savedContent = new TextDecoder().decode(await vscode.workspace.fs.readFile(dest));
        await this.saveChatModeForDropdown(request, stream, savedContent);
      }
      
      stream.markdown(`\n🎉 **Workflow completed successfully!**`);
      
    } catch (err: any) {
      // Ensure we still try to save something if possible
      if (dest && err?.message?.includes('LanguageModelError')) {
        const fallbackContent = `# ${outPrefix.charAt(0).toUpperCase() + outPrefix.slice(1)} Asset\n\nGeneration failed due to model error: ${err.message}\n\nPlease retry the workflow.`;
        try {
          await vscode.workspace.fs.writeFile(dest, new TextEncoder().encode(fallbackContent));
          stream.markdown(`\n⚠️ **Partial save completed** - fallback content saved to: ${dest.fsPath}`);
        } catch {
          // ignore save failure
        }
      }
      
      if (err?.name === 'LanguageModelError' || err?.code) {
        stream.markdown(`\n❌ **Model error**: ${err.message ?? String(err)}`);
      } else {
        stream.markdown(`\n❌ **Workflow error**: ${err?.message ?? String(err)}`);
      }
    }
  }

  /**
   * Determine if the AI response is a confirmation message or already the final asset.
   */
  private isConfirmationResponse(response: string): boolean {
    const confirmationIndicators = [
      /\b(i will|i'll|let me|i can|i understand|i'll create|i'll generate)\b/i,
      /\b(confirmed|confirmation|proceed|ready to|here's what|summary|understanding)\b/i,
      /\b(based on.*will|according to.*will|following.*will)\b/i,
      /\?\s*$/m, // ends with question
      /\b(shall i|should i|would you like|ready to proceed)\b/i
    ];
    
    const assetIndicators = [
      /^---\s*$/m, // YAML frontmatter
      /^\s*#{1,3}\s+[A-Z]/m, // Headers that look like titles
      /```/g, // code blocks
      /\*\*[A-Z][^*]+\*\*.*:/m, // Bold headers with colons
      /^\s*\d+\.\s+/m // numbered lists
    ];

    // If response has asset indicators and is substantial, likely the final asset
    const hasAssetIndicators = assetIndicators.some(pattern => pattern.test(response));
    const isSubstantial = response.trim().split('\n').length > 10;
    
    if (hasAssetIndicators && isSubstantial) {
      return false; // This is likely the asset itself
    }
    
    // If response has confirmation indicators, it's likely a confirmation
    const hasConfirmationIndicators = confirmationIndicators.some(pattern => pattern.test(response));
    
    return hasConfirmationIndicators || response.trim().split('\n').length <= 5; // Short responses are likely confirmations
  }

  /**
   * Clean up generated content by removing code fences and excessive formatting.
   */
  private cleanGeneratedContent(content: string): string {
    // Enforce single markdown file: strip nested code fences, triple backticks, and redundant markdown tags
    let cleaned = content.replace(/```[a-zA-Z]*\n([\s\S]*?)```/g, '$1'); // remove code fences
    cleaned = cleaned.replace(/<details>[\s\S]*?<summary>[\s\S]*?<\/summary>/gi, ''); // remove details/summary blocks
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n'); // collapse excessive newlines
    // Optionally, remove any stray triple backticks
    cleaned = cleaned.replace(/```/g, '');
    return cleaned;
  }

  /**
   * Show references to assets that were included in the workflow.
   */
  private async showAssetReferences(
    stream: vscode.ChatResponseStream,
    cfg: any,
    promptRelPath: string,
    promptUri: vscode.Uri | undefined,
    modeText: string | undefined,
    modeUri: vscode.Uri | undefined,
    instrAssets: any[]
  ): Promise<void> {
    const assetsSection: string[] = [];
    
    // Link to the prompt template used
    if (cfg.includePromptTemplate && promptUri) {
      assetsSection.push(`- Prompt: [${promptRelPath.split(/[\/\\]/).pop()}](${promptUri.toString()})`);
    }
    
    // Link to chat mode if present
    if (cfg.includeChatMode && modeText && modeUri) {
      assetsSection.push(`- Chat Mode: [CopilotCustomizer.chatmode.md](${modeUri.toString()})`);
    }
    
    // Link to instructions included
    if (instrAssets.length > 0) {
      assetsSection.push('- Instructions:');
      for (const a of instrAssets) {
        // If uri is already a scheme, keep; else resolve workspace URI
        const resolvedUri = a.uri.scheme ? a.uri : await this.assetResolver.resolveAssetUri(`.github/instructions/${a.name}`);
        const link = resolvedUri ? resolvedUri.toString() : `.github/instructions/${a.name}`;
        assetsSection.push(`  - [${a.name}](${link})`);
      }
    }
    
    if (assetsSection.length) {
      stream.markdown(['', 'Assets referenced:', ...assetsSection].join('\n'));
    }
  }

  /**
   * Save generated chat mode to .github/chatmodes for dropdown selection.
   */
  private async saveChatModeForDropdown(request: vscode.ChatRequest, stream: vscode.ChatResponseStream, content: string): Promise<void> {
    const modeName = this.deriveModeNameFromRequest(request.prompt) || 'GeneratedMode';
    const root = vscode.workspace.workspaceFolders?.[0]?.uri;
    if (root) {
      const chatmodesDir = vscode.Uri.joinPath(root, '.github', 'chatmodes');
      try { 
        await vscode.workspace.fs.createDirectory(chatmodesDir); 
      } catch { 
        // ignore 
      }
      const fileUri = vscode.Uri.joinPath(chatmodesDir, `${modeName}.chatmode.md`);
      await vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(content));
      stream.markdown(`\nAlso saved as selectable chat mode: ${fileUri.fsPath}`);
      await this.updateModeContext();
    }
  }

  /**
   * Derive a mode name from the user's request.
   */
  private deriveModeNameFromRequest(text?: string | null): string | undefined {
    if (!text) return undefined;
    // Take first ~6 words, alphanumeric, and convert to PascalCase
    const words = text
      .split(/[\s_-]+/)
      .filter(w => /[A-Za-z0-9]/.test(w))
      .slice(0, 6)
      .map(w => w.replace(/[^A-Za-z0-9]/g, ''))
      .filter(Boolean);
    if (words.length === 0) return undefined;
    const pascal = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    return pascal;
  }

  /**
   * Update VS Code context to reflect available chat modes.
   */
  private async updateModeContext(): Promise<void> {
    const hasMode = !!(await this.assetResolver.findInWorkspace('.github/chatmodes/CopilotCustomizer.chatmode.md'));
    await vscode.commands.executeCommand('setContext', 'copilotCustomizer.hasMode', hasMode);
  }
}