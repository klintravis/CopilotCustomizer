import * as vscode from 'vscode';

/**
 * Base interface for all asset types with common properties
 */
export interface BaseAsset {
  name: string;
  uri: vscode.Uri;
  text: string;
  lastModified?: Date;
  size?: number;
}

/**
 * YAML front matter structure common to all assets
 */
export interface AssetFrontMatter {
  description?: string;
  schemaVersion?: string;
  applyTo?: string;
  tools?: string[];
  depthModes?: string[];
  refinementCommands?: string[];
  mode?: 'ask' | 'agent' | 'generate';
  [key: string]: any; // Allow additional properties
}

/**
 * Instruction asset interface with required applyTo field
 */
export interface InstructionAsset extends BaseAsset {
  type: 'instructions';
  frontMatter: AssetFrontMatter & {
    applyTo: string; // Required for instructions
  };
  content: string;
  sections: InstructionSection[];
}

/**
 * Chat mode asset interface with required description
 */
export interface ChatModeAsset extends BaseAsset {
  type: 'chatmodes';
  frontMatter: AssetFrontMatter & {
    description: string; // Required for chat modes
    tools?: string[];
  };
  content: string;
  sections: ChatModeSection[];
}

/**
 * Prompt asset interface with mode specification
 */
export interface PromptAsset extends BaseAsset {
  type: 'prompts';
  frontMatter: AssetFrontMatter & {
    mode?: 'ask' | 'agent' | 'generate';
  };
  content: string;
  variables: PromptVariable[];
  sections: PromptSection[];
}

/**
 * Agent configuration asset interface
 */
export interface AgentAsset extends BaseAsset {
  type: 'agents';
  content: string;
  workflows: AgentWorkflow[];
  guidelines: string[];
}

/**
 * Union type for all asset types
 */
export type Asset = InstructionAsset | ChatModeAsset | PromptAsset | AgentAsset;

/**
 * Asset type enumeration
 */
export type AssetType = 'instructions' | 'chatmodes' | 'prompts' | 'agents';

/**
 * Instruction section structure
 */
export interface InstructionSection {
  heading: string;
  level: number;
  content: string;
  subsections?: InstructionSection[];
}

/**
 * Chat mode section structure
 */
export interface ChatModeSection {
  heading: string;
  level: number;
  content: string;
  type: 'role' | 'objective' | 'workflow' | 'guideline' | 'example' | 'other';
}

/**
 * Prompt section structure
 */
export interface PromptSection {
  heading: string;
  level: number;
  content: string;
  hasVariables: boolean;
}

/**
 * Prompt variable definition
 */
export interface PromptVariable {
  name: string;
  description?: string;
  required: boolean;
  defaultValue?: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
}

/**
 * Agent workflow definition
 */
export interface AgentWorkflow {
  name: string;
  description: string;
  steps: AgentWorkflowStep[];
  examples?: string[];
}

/**
 * Agent workflow step
 */
export interface AgentWorkflowStep {
  name: string;
  description: string;
  action: string;
  inputs?: string[];
  outputs?: string[];
}

/**
 * Asset validation result
 */
export interface AssetValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  score: number; // 0-100 quality score
}

/**
 * Validation error details
 */
export interface ValidationError {
  type: 'schema' | 'structure' | 'content' | 'reference';
  message: string;
  line?: number;
  column?: number;
  severity: 'error' | 'warning';
}

/**
 * Validation warning details
 */
export interface ValidationWarning {
  type: 'style' | 'optimization' | 'compatibility';
  message: string;
  suggestion?: string;
  line?: number;
  column?: number;
}

/**
 * Asset collection options
 */
export interface AssetCollectionOptions {
  maxChars?: number;
  includeMetadata?: boolean;
  validateSchema?: boolean;
  sortBy?: 'name' | 'modified' | 'size';
  sortOrder?: 'asc' | 'desc';
  filter?: AssetFilter;
}

/**
 * Asset filtering options
 */
export interface AssetFilter {
  patterns?: string[];
  excludePatterns?: string[];
  minSize?: number;
  maxSize?: number;
  modifiedAfter?: Date;
  modifiedBefore?: Date;
  hasErrors?: boolean;
}

/**
 * Asset cache entry
 */
export interface AssetCacheEntry {
  asset: Asset;
  timestamp: number;
  hits: number;
  lastAccess: number;
  metadata: AssetMetadata;
}

/**
 * Asset metadata
 */
export interface AssetMetadata {
  checksum: string;
  dependencies: string[];
  references: AssetReference[];
  tags: string[];
  category: string;
}

/**
 * Asset reference (cross-references between assets)
 */
export interface AssetReference {
  type: 'link' | 'include' | 'dependency';
  target: string;
  description?: string;
  line?: number;
}

/**
 * Asset harmonization result
 */
export interface HarmonizationResult {
  assets: Asset[];
  crossReferences: CrossReference[];
  conflicts: HarmonizationConflict[];
  suggestions: HarmonizationSuggestion[];
}

/**
 * Cross-reference between assets
 */
export interface CrossReference {
  from: string;
  to: string;
  type: 'complement' | 'extends' | 'conflicts' | 'references';
  strength: number; // 0-1 relationship strength
}

/**
 * Harmonization conflict
 */
export interface HarmonizationConflict {
  assets: string[];
  type: 'naming' | 'content' | 'structure' | 'purpose';
  description: string;
  resolution?: string;
}

/**
 * Harmonization suggestion
 */
export interface HarmonizationSuggestion {
  type: 'merge' | 'split' | 'rename' | 'restructure' | 'crossReference';
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  benefits: string[];
}

/**
 * Configuration for AssetResolver
 */
export interface AssetResolverConfig {
  cacheTTL: number;
  maxCacheSize: number;
  enableValidation: boolean;
  validationStrict: boolean;
  watchFileChanges: boolean;
  defaultMaxChars: number;
  enableCompression: boolean;
  logLevel: 'none' | 'error' | 'warn' | 'info' | 'debug';
}

/**
 * Type guards for asset types
 */
export function isInstructionAsset(asset: Asset): asset is InstructionAsset {
  return asset.type === 'instructions';
}

export function isChatModeAsset(asset: Asset): asset is ChatModeAsset {
  return asset.type === 'chatmodes';
}

export function isPromptAsset(asset: Asset): asset is PromptAsset {
  return asset.type === 'prompts';
}

export function isAgentAsset(asset: Asset): asset is AgentAsset {
  return asset.type === 'agents';
}

/**
 * Utility type for asset creation
 */
export type CreateAssetData<T extends AssetType> = 
  T extends 'instructions' ? Partial<InstructionAsset> :
  T extends 'chatmodes' ? Partial<ChatModeAsset> :
  T extends 'prompts' ? Partial<PromptAsset> :
  T extends 'agents' ? Partial<AgentAsset> :
  never;

/**
 * Asset processing status
 */
export interface AssetProcessingStatus {
  total: number;
  processed: number;
  errors: number;
  warnings: number;
  startTime: Date;
  endTime?: Date;
  elapsedMs?: number;
}