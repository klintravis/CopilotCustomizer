# Stdin Captures

This folder contains raw JSON data that VS Code sends to agent hooks via stdin for each lifecycle event.

## File Naming

Files are named: `<sequence>-<timestamp>-<EventName>.json`

Example: `001-2026-02-15T20-42-41-SessionStart.json`

## Purpose

These captures allow you to inspect exactly what data VS Code provides to hooks, including:

- **SessionStart**: Session initialization data
- **UserPromptSubmit**: User prompt text and context
- **SubagentStart**: Agent identity and invocation details
- **SubagentStop**: Agent completion status
- **PreToolUse**: Tool name, input parameters, and invocation ID
- **PostToolUse**: Tool name, input, response, and results
- **PreCompact**: Context compaction triggers
- **Stop**: Session termination data

## Fields Reference

See the VS Code documentation for complete field descriptions:
https://code.visualstudio.com/docs/copilot/customization/hooks

Common fields across all events:
- `timestamp` - ISO timestamp of the event
- `cwd` - Workspace directory path
- `sessionId` - Unique session identifier
- `hookEventName` - Event type name
- `transcript_path` - Path to conversation transcript JSON

## Disabling Capture

To disable stdin capture, edit `.github/scripts/log-orchestration.js` and set:
```javascript
const CAPTURE_STDIN = false;
```

## Privacy Note

These files may contain sensitive data from your conversations and file paths. Do not commit them to version control or share publicly if they contain private information.
