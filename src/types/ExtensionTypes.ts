import type * as vscode from 'vscode';

export type CommandRegistrar = (
	context: vscode.ExtensionContext,
	output: vscode.OutputChannel
) => void;
