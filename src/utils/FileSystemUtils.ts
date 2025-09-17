import * as vscode from 'vscode';

export async function revealInExplorer(uri: vscode.Uri) {
  await vscode.commands.executeCommand('revealInExplorer', uri);
}
