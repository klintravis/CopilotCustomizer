import * as vscode from 'vscode';
import { minimatch } from 'minimatch';
import { registerAssetCommands } from './commands/AssetCommands';
import { registerOptimizationCommands } from './commands/OptimizationCommands';
import { registerValidationCommands } from './commands/ValidationCommands';
import { registerHarmonizationCommands } from './commands/HarmonizationCommands';
import { AssetTreeProvider } from './providers/AssetTreeProvider';
import { AssetGeneratorPanel } from './webviews/AssetGeneratorPanel';

export function activate(context: vscode.ExtensionContext) {
  const output = vscode.window.createOutputChannel('Copilot Customizer');
  context.subscriptions.push(output);

  // Track the last executed workflow so plain "confirm"/"continue" can re-run with the original subject
  let lastFlow: { promptRelPath: string; outPrefix: string; lastUserPrompt?: string; customFileName?: string } | undefined;

  // Register a virtual content provider so links like copilot-customizer:/instructions/XYZ work from installed chatmode
  const providerEmitter = new vscode.EventEmitter<vscode.Uri>();
  const contentProvider: vscode.TextDocumentContentProvider = {
    onDidChange: providerEmitter.event,
    provideTextDocumentContent(uri: vscode.Uri): vscode.ProviderResult<string> {
      // Map copilot-customizer:/<segment>/<file> to:
      // 1) extension resources/<segment>/<file>
      // 2) fallback to workspace .github/<segment>/<file>
      const rel = uri.path.replace(/^\//, ''); // remove leading slash
      const tryRead = async (from: vscode.Uri): Promise<string | undefined> => {
        try {
          const buf = await vscode.workspace.fs.readFile(from);
          return new TextDecoder().decode(buf);
        } catch {
          return undefined;
        }
      };

      const bundled = vscode.Uri.joinPath(context.extensionUri, 'resources', rel);
      return (async () => {
        const fromBundled = await tryRead(bundled);
        if (fromBundled !== undefined) return fromBundled;

        const wf = vscode.workspace.workspaceFolders?.[0]?.uri;
        if (wf) {
          const wsUri = vscode.Uri.joinPath(wf, '.github', ...rel.split('/'));
          const fromWs = await tryRead(wsUri);
          if (fromWs !== undefined) return fromWs;
        }

        return `Resource not found: ${uri.toString()}\nTried: ${bundled.fsPath}${wf ? ` and ${vscode.Uri.joinPath(wf, '.github', ...rel.split('/')).fsPath}` : ''}`;
      })();
    }
  };
  context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider('copilot-customizer', contentProvider));

  // Helper: resolve an asset path to a clickable URI (workspace-first, fallback to copilot-customizer:/ scheme)
  async function resolveAssetUri(relPath: string): Promise<vscode.Uri> {
    // Normalize
    const norm = relPath.replace(/^[\\/]+/, '');
    // Try workspace
    const ws = await findInWorkspace(norm);
    if (ws) return ws;
    // Map .github/* to scheme path segments
    const schemePath = norm
      .replace(/^\.github[\\/]/i, '')
      .replace(/^resources[\\/]/i, '')
      .replace(/^\/?/, '');
    return vscode.Uri.parse(`copilot-customizer:/${schemePath.replace(/\\/g, '/')}`);
  }

  type InstructionAsset = { name: string; uri: vscode.Uri; text: string };

  // Collect instructions from workspace and bundled resources with text + URI, de-duped by filename, within a char budget
  async function collectInstructionAssets(maxChars = Infinity): Promise<InstructionAsset[]> {
    const out: InstructionAsset[] = [];
    const seen = new Set<string>();
    let used = 0;

    // Workspace first
    const wsUris = await vscode.workspace.findFiles('**/.github/instructions/*.instructions.md', undefined, 200);
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
      } catch {
        // ignore
      }
    }

    // Bundled resources fallback
    try {
      const extUri = vscode.extensions.getExtension(context.extension.id)!.extensionUri;
      const root = vscode.Uri.joinPath(extUri, 'resources', 'instructions');
      const bundledUris = await readAllFilesInDir(root, '.instructions.md');
      for (const uri of bundledUris) {
        const base = uri.path.split(/[/\\]/).pop() || uri.toString();
        if (seen.has(base)) continue;
        try {
          const data = await vscode.workspace.fs.readFile(uri);
          const txt = new TextDecoder().decode(data);
          if (!txt) continue;
          // Provide a scheme URI so it opens from bundle if clicked
          const schemeUri = vscode.Uri.parse(`copilot-customizer:/instructions/${base}`);
          out.push({ name: base, uri: schemeUri, text: txt });
          seen.add(base);
          used += txt.length;
        } catch {
          // ignore
        }
      }
    } catch {
      // ignore
    }

    return out;
  }

  // Register commands
  registerAssetCommands(context, output);
  registerOptimizationCommands(context, output);
  registerValidationCommands(context, output);
  registerHarmonizationCommands(context, output);

  // Register tree view
  const provider = new AssetTreeProvider();
  const treeView = vscode.window.createTreeView('assetExplorer', { treeDataProvider: provider });
  context.subscriptions.push(treeView);

  // FS watcher to refresh view
  const watcher = vscode.workspace.createFileSystemWatcher('**/{.github,output}/**/*');
  const onFsEvent = async () => {
    provider.refresh();
    await updateModeContext();
  };
  watcher.onDidChange(onFsEvent);
  watcher.onDidCreate(onFsEvent);
  watcher.onDidDelete(onFsEvent);
  context.subscriptions.push(watcher);

  output.appendLine('Copilot Customizer activated');

  // Register a chat participant (@CopilotCustomizer) so users can invoke commands via chat
  try {
    const handler: vscode.ChatRequestHandler = async (request, chatContext, stream, token) => {
      const prompt = (request.prompt || '').trim().toLowerCase();
      const cmd = (request as any).command as string | undefined; // slash command if provided
      const help = cmd === 'help' || /^\s*(help|commands)\s*$/i.test(request.prompt ?? '');
      if (help) {
        stream.markdown([
          'Copilot Customizer: available commands:',
          '',
          '- `/generate-chatmode` — generate a new chat mode',
          '- `/generate-instructions` — generate new instructions',
          '- `/generate-prompt` — generate a new prompt',
          '- `/harmonize` — harmonize related assets',
          '- `/optimize` — optimize assets',
          '- `/repo-review` — run a repository review',
          '- `/open` — open the Asset Generator panel',
          '',
          'Tip: Use `@CopilotCustomizer` with the slash commands above. For a normal chat, just type your message (no slash command). To select a chat mode in the input dropdown, pick one from your workspace `.github/chatmodes`.'
        ].join('\n'));
        await listAvailableModes(stream);
        return;
      }

      // Explicit open via slash command
      if (cmd === 'open') {
        await vscode.commands.executeCommand('copilotCustomizer.openGenerator');
        stream.markdown('Opened the Asset Generator panel.');
        return;
      }

      // Map slash commands to LM-driven workflows (no UI file opens)
      if (cmd === 'generate-chatmode') {
        lastFlow = { promptRelPath: '.github/prompts/NewChatmode.prompt.md', outPrefix: 'chatmode', lastUserPrompt: request.prompt };
        await runPromptWorkflow('.github/prompts/NewChatmode.prompt.md', request, chatContext, stream, token, 'chatmode', undefined, undefined, 'generateChatMode');
        return;
      }
      if (cmd === 'generate-instructions') {
        lastFlow = { promptRelPath: '.github/prompts/NewInstructions.prompt.md', outPrefix: 'instructions', lastUserPrompt: request.prompt };
        await runPromptWorkflow('.github/prompts/NewInstructions.prompt.md', request, chatContext, stream, token, 'instructions', undefined, undefined, 'generateInstructions');
        return;
      }
      if (cmd === 'generate-prompt') {
        lastFlow = { promptRelPath: '.github/prompts/NewPrompt.prompt.md', outPrefix: 'prompt', lastUserPrompt: request.prompt };
        await runPromptWorkflow('.github/prompts/NewPrompt.prompt.md', request, chatContext, stream, token, 'prompt', undefined, undefined, 'generatePrompt');
        return;
      }
      if (cmd === 'harmonize') {
        lastFlow = { promptRelPath: '.github/prompts/HarmonizeAssets.prompt.md', outPrefix: 'harmonized', lastUserPrompt: request.prompt };
        await runPromptWorkflow('.github/prompts/HarmonizeAssets.prompt.md', request, chatContext, stream, token, 'harmonized', undefined, undefined, 'harmonize');
        return;
      }
      if (cmd === 'optimize') {
        lastFlow = { promptRelPath: '.github/prompts/AssetOptimization.prompt.md', outPrefix: 'optimized', lastUserPrompt: request.prompt };
        await runPromptWorkflow('.github/prompts/AssetOptimization.prompt.md', request, chatContext, stream, token, 'optimized', undefined, undefined, 'optimize');
        return;
      }
      if (cmd === 'repo-review') {
        const repo = getWorkspaceFolderName() || 'Repository';
        const custom = `${repo} - Repo Review - ${new Date().toISOString().slice(0,10)}`;
        lastFlow = { promptRelPath: '.github/prompts/RepoReview.prompt.md', outPrefix: 'repo-review', lastUserPrompt: request.prompt, customFileName: custom };
        await runPromptWorkflow('.github/prompts/RepoReview.prompt.md', request, chatContext, stream, token, 'repo-review', custom, undefined, 'repoReview');
        return;
      }

      // If the user replies with plain "confirm" or "continue", re-run the previous workflow with the original user text
      if (
        !cmd &&
        /^\s*(confirm|continue|yes|y|ok|okay|proceed|go|do\s*it)\s*[.!]?$/i.test((request.prompt || '').trim()) &&
        lastFlow
      ) {
        const combined = `${(lastFlow.lastUserPrompt ?? '').trim()}\n\n${(request.prompt ?? '').trim()}`.trim();
        await runPromptWorkflow(
          lastFlow.promptRelPath,
          request,
          chatContext,
          stream,
          token,
          lastFlow.outPrefix,
          lastFlow.customFileName,
          combined,
          undefined
        );
        return;
      }

      // Default: normal assistant behavior (no hijack) — pass through to model
      await defaultChat(request, chatContext, stream, token);
      return;
    };

    const participant = vscode.chat?.createChatParticipant?.('copilot-customizer', handler);
    if (participant) {
      participant.iconPath = vscode.Uri.joinPath(context.extensionUri, 'resources', 'icons', 'copilot-customizer.svg');
      context.subscriptions.push(participant);
      output.appendLine('Chat participant registered (id=copilot-customizer).');
    } else {
      output.appendLine('Chat participant API not available in this VS Code build.');
    }
  } catch (err) {
    output.appendLine(`Failed to register chat participant: ${String(err)}`);
  }

  // Command to open generator webview
  context.subscriptions.push(
    vscode.commands.registerCommand('copilotCustomizer.openGenerator', () => AssetGeneratorPanel.createOrShow())
  );

  // Status bar quick action: Open Asset Generator
  const statusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusItem.text = '$(rocket) Copilot: Generator';
  statusItem.tooltip = 'Open Copilot Customizer Asset Generator';
  statusItem.command = 'copilotCustomizer.openGenerator';
  statusItem.show();
  context.subscriptions.push(statusItem);

  // Status bar quick action: Open Chat (one-click use now)
  const chatStatusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 99);
  chatStatusItem.text = '$(comment-discussion) Copilot: Chat';
  chatStatusItem.tooltip = 'Open Chat and use CopilotCustomizer mode';
  chatStatusItem.command = 'copilotCustomizer.useChatModeNow';
  chatStatusItem.show();
  context.subscriptions.push(chatStatusItem);

  // Refresh command for Asset Explorer
  context.subscriptions.push(
    vscode.commands.registerCommand('copilotCustomizer.refreshAssetExplorer', () => provider.refresh())
  );

  // Install the bundled chat mode into the workspace (rewriting internal links to virtual scheme)
  context.subscriptions.push(
    vscode.commands.registerCommand('copilotCustomizer.installBundledChatMode', async () => {
      const root = vscode.workspace.workspaceFolders?.[0]?.uri;
      if (!root) {
        vscode.window.showErrorMessage('No workspace folder open. Open a folder to install the chat mode.');
        return;
      }
      const destDir = vscode.Uri.joinPath(root, '.github', 'chatmodes');
      try { await vscode.workspace.fs.createDirectory(destDir); } catch {}
      const src = vscode.Uri.joinPath(context.extensionUri, 'resources', 'chatmodes', 'CopilotCustomizer.chatmode.md');
      const dest = vscode.Uri.joinPath(destDir, 'CopilotCustomizer.chatmode.md');
      try {
        const data = await vscode.workspace.fs.readFile(src);
        let text = new TextDecoder().decode(data);
        // Single-pass rewrite: any link to ../instructions|prompts or .github/instructions|prompts → copilot-customizer:/<seg>/<file>
        text = text.replace(/\]\((?:\.\.\/|(?:\.github\/|\.github\\))(instructions|prompts)\/([^\)]+)\)/gi,
          (_m, seg, file) => `](${`copilot-customizer:/${seg}/${file}`})`);

        await vscode.workspace.fs.writeFile(dest, new TextEncoder().encode(text));
        vscode.window.showInformationMessage('Installed CopilotCustomizer chat mode to .github/chatmodes/');
        await updateModeContext();
      } catch (e: any) {
        vscode.window.showErrorMessage(`Failed to install chat mode: ${e?.message ?? String(e)}`);
      }
    })
  );

  // Open Copilot Chat and guide user to select custom chat mode
  context.subscriptions.push(
    vscode.commands.registerCommand('copilotCustomizer.openCopilotChat', async () => {
      await openChat();

      // Look for our primary chat mode file
      const modeUri = await findInWorkspace('.github/chatmodes/CopilotCustomizer.chatmode.md');
      const openMode = 'Open Mode Definition';
      const selection = await vscode.window.showInformationMessage(
        "Chat opened. In the chat input's mode dropdown, select 'CopilotCustomizer'.",
        openMode
      );
      if (selection === openMode && modeUri) {
        const doc = await vscode.workspace.openTextDocument(modeUri);
        await vscode.window.showTextDocument(doc, { preview: false, viewColumn: vscode.ViewColumn.Beside });
      }
    })
  );

  // One-click: open chat, focus input, and copy tip to clipboard
  context.subscriptions.push(
    vscode.commands.registerCommand('copilotCustomizer.useChatModeNow', async () => {
      await openChat();
      // Try to focus the chat input
      const focusCandidates = [
        'workbench.action.chat.focus',
        'github.copilotChat.focus',
        'workbench.action.focusChat'
      ];
      for (const cmd of focusCandidates) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await vscode.commands.executeCommand(cmd);
          break;
        } catch {
          // keep trying
        }
      }

      const tip = "Tip: In the Chat input, open the mode dropdown (left of the input) and select 'CopilotCustomizer'. Then ask your question.";
      await vscode.env.clipboard.writeText(tip);
      const modeUri = await findInWorkspace('.github/chatmodes/CopilotCustomizer.chatmode.md');
      const openMode = 'Open Mode Definition';
      vscode.window.showInformationMessage('Chat opened. Tip copied to clipboard — paste with Ctrl+V. Select the CopilotCustomizer mode from the dropdown.', openMode)
        .then(async (choice) => {
          if (choice === openMode && modeUri) {
            const doc = await vscode.workspace.openTextDocument(modeUri);
            await vscode.window.showTextDocument(doc, { preview: false, viewColumn: vscode.ViewColumn.Beside });
          }
        });
    })
  );

  // First-run popup: show once when mode exists
  (async () => {
    await updateModeContext();
    const hasMode = !!(await findInWorkspace('.github/chatmodes/CopilotCustomizer.chatmode.md'));
    const flagKey = 'copilotCustomizer.firstRunShown';
    const shown = context.globalState.get<boolean>(flagKey, false);
    if (hasMode && !shown) {
      const useNow = 'Use Now';
      const openMode = 'Open Mode';
      const choice = await vscode.window.showInformationMessage(
        "CopilotCustomizer chat mode detected. Open Chat and select it from the mode dropdown.",
        useNow,
        openMode
      );
      if (choice === useNow) {
        await vscode.commands.executeCommand('copilotCustomizer.useChatModeNow');
      } else if (choice === openMode) {
        const modeUri = await findInWorkspace('.github/chatmodes/CopilotCustomizer.chatmode.md');
        if (modeUri) {
          const doc = await vscode.workspace.openTextDocument(modeUri);
          await vscode.window.showTextDocument(doc, { preview: false });
        }
      }
      await context.globalState.update(flagKey, true);
    }
  })();

  async function openChat(): Promise<void> {
    // Try several known commands to open chat view
    const candidates = [
      'workbench.action.chat.open',
      'github.copilotChat.open',
      'workbench.action.openChat',
      'workbench.view.extension.chatView'
    ];
    for (const cmd of candidates) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await vscode.commands.executeCommand(cmd);
        break;
      } catch {
        // continue trying other commands
      }
    }
  }

  async function findInWorkspace(relativePath: string): Promise<vscode.Uri | undefined> {
    const wfs = vscode.workspace.workspaceFolders;
    if (!wfs || wfs.length === 0) return undefined;
    for (const f of wfs) {
      const [match] = await vscode.workspace.findFiles(
        new vscode.RelativePattern(f, relativePath),
        undefined,
        1
      );
      if (match) return match;
    }
    return undefined;
  }

  async function readText(relativePath: string): Promise<string | undefined> {
    const wfs = vscode.workspace.workspaceFolders;
    if (!wfs || wfs.length === 0) return undefined;
    for (const f of wfs) {
      const candidate = vscode.Uri.joinPath(f.uri, relativePath.replace(/^[\\/]+/, ''));
      try {
        const data = await vscode.workspace.fs.readFile(candidate);
        return new TextDecoder().decode(data);
      } catch {
        // continue
      }
    }
    // try extension-bundled fallback
    try {
      const extUri = vscode.extensions.getExtension(context.extension.id)!.extensionUri;
      const mapped = relativePath
        .replace(/^[\\/]+/, '')
        .replace(/^\.github\//, 'resources/')
        .replace(/^\.github\\/, 'resources\\');
      const bundled = vscode.Uri.joinPath(extUri, mapped);
      const data = await vscode.workspace.fs.readFile(bundled);
      return new TextDecoder().decode(data);
    } catch {
      return undefined;
    }
  }

  // readAllInstructions removed in favor of collectInstructionAssets

  async function readAllFilesInDir(dir: vscode.Uri, endsWith: string): Promise<vscode.Uri[]> {
    const out: vscode.Uri[] = [];
    try {
      const entries = await vscode.workspace.fs.readDirectory(dir);
      for (const [name, type] of entries) {
        const child = vscode.Uri.joinPath(dir, name);
        if (type === vscode.FileType.Directory) {
          const nested = await readAllFilesInDir(child, endsWith);
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

  async function ensureOutputUri(prefix: string, ext = 'md', customFileName?: string): Promise<vscode.Uri | undefined> {
    const root = vscode.workspace.workspaceFolders?.[0]?.uri;
    if (!root) return undefined;
    const outDir = vscode.Uri.joinPath(root, 'output');
    try {
      await vscode.workspace.fs.createDirectory(outDir);
    } catch {
      // ignore
    }
    const ts = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const base = customFileName ? customFileName : `${prefix}-${ts}`;
    const safe = base.replace(/[\\/:*?"<>|]+/g, '-');
    const file = vscode.Uri.joinPath(outDir, `${safe}.${ext}`);
    return file;
  }

  async function runPromptWorkflow(
    promptRelPath: string,
    request: vscode.ChatRequest,
    chatContext: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken,
    outPrefix: string,
    customFileName?: string,
    overrideUserText?: string,
    commandKey?: 'generateChatMode' | 'generateInstructions' | 'generatePrompt' | 'harmonize' | 'optimize' | 'repoReview'
  ) {
    try {
      // Load prompt content
      const promptText = await readText(promptRelPath);
      if (!promptText) {
        stream.markdown(`Unable to load prompt template: ${promptRelPath}`);
        return;
      }

      // Read context configuration
      const cfg = getContextConfig(commandKey);

      // Optionally: include core chatmode/instructions as context if available
      const modeText = cfg.includeChatMode ? await readText('.github/chatmodes/CopilotCustomizer.chatmode.md') : undefined;
      let instrAssets = await collectInstructionAssets();
      // Filter by include/exclude patterns on base name
      const includes = cfg.instructionInclude.length ? cfg.instructionInclude : ['*.instructions.md'];
      const excludes = cfg.instructionExclude;
      instrAssets = instrAssets.filter(a => matchesAny(a.name, includes) && !matchesAny(a.name, excludes));

      // Register references early so they appear in Copilot's context panel
      const promptUri = await resolveAssetUri(promptRelPath);
      if (cfg.includePromptTemplate) { try { stream.reference(promptUri); } catch { /* ignore for older API */ } }
      const modeUri = await resolveAssetUri('.github/chatmodes/CopilotCustomizer.chatmode.md');
      if (cfg.includeChatMode && modeText) { try { stream.reference(modeUri); } catch { /* ignore */ } }
      for (const a of instrAssets) {
        try { stream.reference(a.uri); } catch { /* ignore */ }
      }

      const messages: vscode.LanguageModelChatMessage[] = [];
  // Include shipped assets as context before the prompt
  if (modeText) messages.push(vscode.LanguageModelChatMessage.User(modeText));
  for (const instr of instrAssets) messages.push(vscode.LanguageModelChatMessage.User(instr.text));
  if (cfg.includePromptTemplate) messages.push(vscode.LanguageModelChatMessage.User(promptText));

      // Include prior assistant context from this session (optional, lightweight)
      const previousAssistant = chatContext.history.filter(h => h instanceof vscode.ChatResponseTurn) as vscode.ChatResponseTurn[];
      for (const turn of previousAssistant) {
        let acc = '';
        for (const part of turn.response) {
          if ((part as any).value?.value) {
            acc += (part as any).value.value;
          }
        }
        if (acc) messages.push(vscode.LanguageModelChatMessage.Assistant(acc));
      }

      // Add the user's current (or overridden) prompt as the final instruction/input
      let userText = (overrideUserText && overrideUserText.trim().length > 0)
        ? overrideUserText
        : (request.prompt ?? '');

      // Auto-confirm: reduce back-and-forth by appending a directive and token
      if (cfg.autoConfirm) {
        const token = cfg.autoConfirmToken || 'confirm';
        const directive = '\n\nProceed immediately and do not ask for confirmation. Use the confirm token when required.';
        if (!userText.toLowerCase().includes(token.toLowerCase())) {
          userText = `${userText}${directive}\n${token}`.trim();
        } else {
          userText = `${userText}${directive}`.trim();
        }
      }
      if (userText.trim().length > 0) {
        messages.push(vscode.LanguageModelChatMessage.User(userText));
      }

      // Send to the selected chat model
      const response = await request.model.sendRequest(messages, {}, token);
      let full = '';
      for await (const chunk of response.text) {
        full += chunk;
        stream.markdown(chunk);
      }

      // Save output
      const dest = await ensureOutputUri(outPrefix, 'md', customFileName);
      if (dest) {
        // If autoConfirm is enabled but the response looks like an acknowledgment without the final artifact,
        // issue a second pass with a stronger directive and confirm token to produce the final output immediately.
        const looksLikeAck = cfg.autoConfirm && /\b(confirmed|proceed immediately|no confirmation prompts|ready to process|example)/i.test(full)
          && !(/```/.test(full) || /^---\s*$/m.test(full) || /^\s*#{1,6}\s+/m.test(full));

        if (looksLikeAck) {
          stream.markdown(`\n\nAuto-confirm: generating final output now…`);
          const token = cfg.autoConfirmToken || 'confirm';
          const reinforce = `Generate the final artifact now, as complete Markdown. Do not ask for confirmation, questions, or examples. Output only the final artifact. Token: ${token}`;
          const messages2 = [
            ...messages,
            vscode.LanguageModelChatMessage.User(reinforce)
          ];
          const response2 = await request.model.sendRequest(messages2, {}, token as unknown as vscode.CancellationToken);
          let full2 = '';
          for await (const chunk of response2.text) {
            full2 += chunk;
            stream.markdown(chunk);
          }
          full = full2 || full; // prefer the second pass if non-empty
        }

        await vscode.workspace.fs.writeFile(dest, new TextEncoder().encode(full));
        stream.markdown(`\n\nSaved to: ${dest.fsPath}`);
      }

      // Register references for Copilot's context UI and stream a short reference section with clickable links
  const assetsSection: string[] = [];
  // Link to the prompt template used
  if (cfg.includePromptTemplate) assetsSection.push(`- Prompt: [${promptRelPath.split(/[\/\\]/).pop()}](${promptUri.toString()})`);
  // Link to chat mode if present
  if (cfg.includeChatMode && modeText) assetsSection.push(`- Chat Mode: [CopilotCustomizer.chatmode.md](${modeUri.toString()})`);
      // Link to instructions included
      if (instrAssets.length > 0) {
        assetsSection.push('- Instructions:');
        for (const a of instrAssets) {
          // If uri is already a scheme, keep; else resolve workspace URI
          const link = a.uri.scheme ? a.uri.toString() : (await resolveAssetUri(`.github/instructions/${a.name}`)).toString();
          assetsSection.push(`  - [${a.name}](${link})`);
        }
      }
      if (assetsSection.length) {
        stream.markdown(['', 'Assets referenced:', ...assetsSection].join('\n'));
      }

      // If generating a chat mode, also save under .github/chatmodes for dropdown selection
      if (outPrefix === 'chatmode') {
        const modeName = deriveModeNameFromRequest(request.prompt) || 'GeneratedMode';
        const root = vscode.workspace.workspaceFolders?.[0]?.uri;
        if (root) {
          const chatmodesDir = vscode.Uri.joinPath(root, '.github', 'chatmodes');
          try { await vscode.workspace.fs.createDirectory(chatmodesDir); } catch {}
          const fileUri = vscode.Uri.joinPath(chatmodesDir, `${modeName}.chatmode.md`);
          await vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(full));
          stream.markdown(`\nAlso saved as selectable chat mode: ${fileUri.fsPath}`);
          await updateModeContext();
        }
      }
    } catch (err: any) {
      if (err?.name === 'LanguageModelError' || (err?.code)) {
        stream.markdown(`Model error: ${err.message ?? String(err)}`);
      } else {
        stream.markdown(`Failed to run workflow: ${err?.message ?? String(err)}`);
      }
    }
  }

  async function defaultChat(request: vscode.ChatRequest, chatContext: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken) {
    try {
      const messages: vscode.LanguageModelChatMessage[] = [];
      // Provide limited prior assistant context for continuity
      const previousAssistant = chatContext.history.filter(h => h instanceof vscode.ChatResponseTurn) as vscode.ChatResponseTurn[];
      for (const turn of previousAssistant) {
        let acc = '';
        for (const part of turn.response) {
          if ((part as any).value?.value) {
            acc += (part as any).value.value;
          }
        }
        if (acc) messages.push(vscode.LanguageModelChatMessage.Assistant(acc));
      }
      if (request.prompt && request.prompt.trim().length > 0) {
        messages.push(vscode.LanguageModelChatMessage.User(request.prompt));
      }
      const response = await request.model.sendRequest(messages, {}, token);
      for await (const chunk of response.text) {
        stream.markdown(chunk);
      }
    } catch (err: any) {
      stream.markdown(`Failed to respond: ${err?.message ?? String(err)}`);
    }
  }

  function deriveModeNameFromRequest(text?: string | null): string | undefined {
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

  type ContextConfig = {
    includeChatMode: boolean;
    includePromptTemplate: boolean;
    instructionInclude: string[];
    instructionExclude: string[];
    autoConfirm: boolean;
    autoConfirmToken: string;
  };

  function getContextConfig(commandKey?: 'generateChatMode' | 'generateInstructions' | 'generatePrompt' | 'harmonize' | 'optimize' | 'repoReview'): ContextConfig {
    const cfg = vscode.workspace.getConfiguration('copilotCustomizer.context');
    const base: ContextConfig = {
      includeChatMode: cfg.get<boolean>('includeChatMode', true),
      includePromptTemplate: cfg.get<boolean>('includePromptTemplate', true),
      instructionInclude: cfg.get<string[]>('instructionInclude', ['*.instructions.md']),
      instructionExclude: cfg.get<string[]>('instructionExclude', []),
      autoConfirm: cfg.get<boolean>('autoConfirm', true),
      autoConfirmToken: cfg.get<string>('autoConfirmToken', 'confirm')
    };
    if (!commandKey) return base;
    const cmdPrefix = `commands.${commandKey}`;
    return {
      includeChatMode: cfg.get<boolean>(`${cmdPrefix}.includeChatMode`, base.includeChatMode),
      includePromptTemplate: cfg.get<boolean>(`${cmdPrefix}.includePromptTemplate`, base.includePromptTemplate),
      instructionInclude: cfg.get<string[]>(`${cmdPrefix}.instructionInclude`, base.instructionInclude),
      instructionExclude: cfg.get<string[]>(`${cmdPrefix}.instructionExclude`, base.instructionExclude),
      autoConfirm: cfg.get<boolean>(`${cmdPrefix}.autoConfirm`, base.autoConfirm),
      autoConfirmToken: cfg.get<string>(`${cmdPrefix}.autoConfirmToken`, base.autoConfirmToken)
    };
  }

  function matchesAny(name: string, patterns: string[]): boolean {
    if (!patterns.length) return false;
    return patterns.some(p => minimatch(name, p, { nocase: true }));
  }

  async function listAvailableModes(stream: vscode.ChatResponseStream) {
    const uris = await vscode.workspace.findFiles('**/.github/chatmodes/*.chatmode.md', undefined, 50);
    if (uris.length === 0) return;
    const names = uris.map(u => u.path.split(/[/\\]/).pop() || '').filter(Boolean);
    if (names.length) {
      stream.markdown(['', 'Available chat modes:', ...names.map(n => `- ${n}`)].join('\n'));
    }
  }

  async function updateModeContext() {
    const hasMode = !!(await findInWorkspace('.github/chatmodes/CopilotCustomizer.chatmode.md'));
    await vscode.commands.executeCommand('setContext', 'copilotCustomizer.hasMode', hasMode);
  }
}

export function deactivate() {}

function extractSubjectFromPrompt(text?: string | null): string | undefined {
  if (!text) return undefined;
  // Try to pull a short, human-friendly subject from quotes or leading phrase
  const quoted = text.match(/"([^"]{3,80})"|\'([^\']{3,80})\'/);
  if (quoted) return (quoted[1] || quoted[2])?.trim();
  // Fallback: first clause up to delimiter
  const m = text.split(/[\.;\n]|\s+-\s+/)[0]?.trim();
  if (m && m.length >= 3) return m.slice(0, 80);
  return undefined;
}

function getWorkspaceFolderName(): string | undefined {
  const name = vscode.workspace.workspaceFolders?.[0]?.name;
  if (!name) return undefined;
  // If the repo folder name ends with ".github" (e.g., "Fantasy Football.github"), strip that suffix for nicer filenames
  const base = name.replace(/\.github$/i, '').trim();
  // Sanitize for filename use
  return base.replace(/[\/:*?"<>|]+/g, '-');
}
