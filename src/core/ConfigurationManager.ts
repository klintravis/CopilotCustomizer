import * as vscode from 'vscode';

export type CommandKey = 'newChatMode' | 'newInstructions' | 'newPrompt' | 'newAgent' | 'harmonize' | 'optimize' | 'repoReview';

export interface ContextConfig {
  includeChatMode: boolean;
  includePromptTemplate: boolean;
  instructionInclude: string[];
  instructionExclude: string[];
  autoConfirm: boolean;
  autoConfirmToken: string;
}

/**
 * Manages configuration settings for the CopilotCustomizer extension.
 * Handles the consolidated configuration schema from Phase 1 refactoring.
 */
export class ConfigurationManager {
  /**
   * Get configuration for a specific command with base settings + overrides.
   * @param commandKey Optional command key for command-specific overrides
   * @returns Configuration object with all settings resolved
   */
  getContextConfig(commandKey?: CommandKey): ContextConfig {
    const contextCfg = vscode.workspace.getConfiguration('copilotCustomizer.context');
    const overridesCfg = vscode.workspace.getConfiguration('copilotCustomizer.commandOverrides');
    
    // Get base configuration from consolidated context object
    const base: ContextConfig = {
      includeChatMode: contextCfg.get<boolean>('includeChatMode', true),
      includePromptTemplate: contextCfg.get<boolean>('includePromptTemplate', true),
      instructionInclude: contextCfg.get<string[]>('instructionInclude', ['*.instructions.md']),
      instructionExclude: contextCfg.get<string[]>('instructionExclude', []),
      autoConfirm: contextCfg.get<boolean>('autoConfirm', true),
      autoConfirmToken: contextCfg.get<string>('autoConfirmToken', 'confirm')
    };
    
    if (!commandKey) return base;
    
    // Apply command-specific overrides if they exist
    const overrides = overridesCfg.get<any>(commandKey);
    if (!overrides) return base;
    
    return {
      includeChatMode: overrides.includeChatMode ?? base.includeChatMode,
      includePromptTemplate: overrides.includePromptTemplate ?? base.includePromptTemplate,
      instructionInclude: overrides.instructionInclude ?? base.instructionInclude,
      instructionExclude: overrides.instructionExclude ?? base.instructionExclude,
      autoConfirm: overrides.autoConfirm ?? base.autoConfirm,
      autoConfirmToken: overrides.autoConfirmToken ?? base.autoConfirmToken
    };
  }

  /**
   * Get extension-wide settings that aren't command-specific.
   */
  getGlobalSettings() {
    return {
      // Add any global settings here as needed
    };
  }
}