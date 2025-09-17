const assert = require('assert');
const vscode = require('vscode');

describe('Copilot Customizer Extension', function () {
  it('activates and registers commands', async function () {
    const ext = vscode.extensions.getExtension('your-publisher-id.copilot-customizer-extension');
    assert.ok(ext, 'Extension should be found by id');
    if (!ext.isActive) {
      await ext.activate();
    }
    const commands = await vscode.commands.getCommands();
    const hasCmd = commands.some(c => c === 'copilotCustomizer.generatePrompt');
    assert.ok(hasCmd, 'Expected command not registered');
  });
});
