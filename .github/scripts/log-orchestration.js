#!/usr/bin/env node
/**
 * Orchestration Logger — Agent Hooks Script
 *
 * Logs subagent lifecycle events to session-specific folders in .github/logs/sessions/
 * Triggered by VS Code Agent Hooks (all 8 lifecycle events)
 *
 * Usage: node .github/scripts/log-orchestration.js <EventName>
 *
 * Session Management:
 *   - SessionStart creates a new session folder: .github/logs/sessions/YYYY-MM-DDTHH-MM-SS/
 *   - All events write to: sessions/<timestamp>/orchestration.log
 *   - Metrics saved to: sessions/<timestamp>/metrics.json
 *   - Current session tracked via: .github/logs/current-session.txt
 *   - Active subagent stack tracked via: sessions/<timestamp>/session-state.json
 *
 * Stdin Capture (Debug Mode):
 *   - Raw stdin JSON from VS Code saved to: sessions/<timestamp>/stdin/
 *   - Each event creates a numbered file: 001-<timestamp>-<EventName>.json
 *   - Useful for inspecting exactly what data VS Code provides to hooks
 *   - Enable/disable via CAPTURE_STDIN constant (default: true)
 *
 * Skill Invocation Tracking:
 *   - Detects when SKILL.md files are read via read_file tool (PostToolUse hook)
 *   - Logs skill invocations with agent attribution
 *   - Tracks unique skills used and total invocation counts
 *   - Includes skill statistics in session summary and metrics.json
 *
 * VS Code Hook Stdin JSON Fields (per https://code.visualstudio.com/docs/copilot/customization/hooks):
 *   Common (all events):
 *     timestamp       — ISO timestamp of the event
 *     cwd             — Workspace directory path
 *     sessionId       — Session identifier
 *     hookEventName   — Event name (e.g., "PreToolUse")
 *     transcript_path — Path to conversation transcript JSON
 *   SessionStart:
 *     source          — How the session started (currently always "new")
 *   PreToolUse:
 *     tool_name       — Name of the tool being invoked
 *     tool_input      — Tool input/arguments object
 *     tool_use_id     — Unique tool invocation ID
 *   PostToolUse:
 *     tool_name       — Name of the tool
 *     tool_input      — Tool input/arguments object
 *     tool_use_id     — Unique tool invocation ID
 *     tool_response   — Tool execution result string
 *   SubagentStart:
 *     agent_id        — Unique subagent identifier
 *     agent_type      — Subagent name (e.g., "Plan", "Editor")
 *   SubagentStop:
 *     agent_id        — Unique subagent identifier
 *     agent_type      — Subagent name
 *     stop_hook_active — Whether subagent is continuing from a previous stop hook
 *   Stop:
 *     stop_hook_active — Whether agent is continuing from a previous stop hook
 *   UserPromptSubmit:
 *     prompt          — The user's submitted prompt text
 *   PreCompact:
 *     trigger         — How compaction was triggered (e.g., "auto")
 */

const fs = require("fs");
const path = require("path");

// --- Configuration ---
const LOG_DIR = path.join(__dirname, "..", "logs");
const SESSIONS_DIR = path.join(LOG_DIR, "sessions");
const CURRENT_SESSION_FILE = path.join(LOG_DIR, "current-session.txt");
const SEPARATOR = "\u2500".repeat(72);
const SUBAGENT_REGISTRY = [
  "Bootstrap",
  "Planner",
  "Generator",
  "Editor",
  "Verifier",
  "Evolve",
];
const CAPTURE_STDIN = false; // Set to false to disable stdin capture

// Global to store event context from stdin and current session info
let eventContext = {};
let currentSessionDir = null;
let LOG_FILE = null;
let METRICS_FILE = null;
let STATE_FILE = null;
let STDIN_DIR = null;
let rawStdinData = ""; // Store raw stdin for later capture

// --- Session Management ---
function createSessionDir() {
  // Create session folder with timestamp
  const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  currentSessionDir = path.join(SESSIONS_DIR, ts);

  if (!fs.existsSync(currentSessionDir)) {
    fs.mkdirSync(currentSessionDir, { recursive: true });
  }

  // Create stdin capture directory if enabled
  STDIN_DIR = path.join(currentSessionDir, "stdin");
  if (CAPTURE_STDIN && !fs.existsSync(STDIN_DIR)) {
    fs.mkdirSync(STDIN_DIR, { recursive: true });
  }

  // Write current session marker
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
  fs.writeFileSync(CURRENT_SESSION_FILE, ts, "utf8");

  // Set log paths for this session
  LOG_FILE = path.join(currentSessionDir, "orchestration.log");
  METRICS_FILE = path.join(currentSessionDir, "metrics.json");
  STATE_FILE = path.join(currentSessionDir, "session-state.json");
}

function loadCurrentSession() {
  // Read current session from marker file
  if (fs.existsSync(CURRENT_SESSION_FILE)) {
    const sessionTimestamp = fs.readFileSync(CURRENT_SESSION_FILE, "utf8").trim();
    currentSessionDir = path.join(SESSIONS_DIR, sessionTimestamp);
    LOG_FILE = path.join(currentSessionDir, "orchestration.log");
    METRICS_FILE = path.join(currentSessionDir, "metrics.json");
    STATE_FILE = path.join(currentSessionDir, "session-state.json");
    STDIN_DIR = path.join(currentSessionDir, "stdin");
    
    // Create stdin directory if it doesn't exist
    if (CAPTURE_STDIN && !fs.existsSync(STDIN_DIR)) {
      fs.mkdirSync(STDIN_DIR, { recursive: true });
    }
  } else {
    // Fallback: create new session if marker missing
    createSessionDir();
  }
}

// --- Session State (tracks active subagent stack) ---
// VS Code does not include agent identity in PreToolUse/PostToolUse stdin,
// so we maintain a subagent stack in session-state.json to correlate tool
// calls with their invoking subagent.

function readSessionState() {
  try {
    if (STATE_FILE && fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
    }
  } catch (e) { /* ignore */ }
  return { active_subagents: [], prompt_count: 0, skills_invoked: [] };
}

function writeSessionState(state) {
  ensureLogDir();
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n", "utf8");
}

function getActiveAgent() {
  var state = readSessionState();
  var stack = state.active_subagents || [];
  return stack.length > 0 ? stack[stack.length - 1] : "CopilotCustomizer";
}

// --- Skill Detection ---
function extractSkillName(filePath) {
  // Extract skill name from paths like:
  // .github/skills/repo-analysis/SKILL.md -> repo-analysis
  // c:\...\skills\planning\SKILL.md -> planning
  var normalized = filePath.replace(/\\/g, "/");
  var match = normalized.match(/\/skills\/([^\/]+)\/SKILL\.md$/i);
  return match ? match[1] : null;
}

function isSkillInvocation(toolName, toolInput) {
  if (toolName !== "read_file") return false;
  if (!toolInput || !toolInput.filePath) return false;
  return extractSkillName(toolInput.filePath) !== null;
}

// --- Stdin Capture ---
var stdinCaptureCounter = 0;

function captureStdin(eventName, rawStdinData) {
  if (!CAPTURE_STDIN || !STDIN_DIR) return;
  
  try {
    stdinCaptureCounter++;
    var timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    var filename = stdinCaptureCounter.toString().padStart(3, "0") + "-" + 
                   timestamp + "-" + eventName + ".json";
    var filepath = path.join(STDIN_DIR, filename);
    
    // Try to parse and pretty-print the JSON, or save raw if it fails
    var content;
    try {
      var parsed = JSON.parse(rawStdinData);
      content = JSON.stringify(parsed, null, 2);
    } catch (e) {
      content = rawStdinData;
    }
    
    fs.writeFileSync(filepath, content, "utf8");
  } catch (e) {
    // Silently fail - stdin capture is best-effort debugging
  }
}

// --- Helpers ---
function ensureLogDir() {
  if (currentSessionDir && !fs.existsSync(currentSessionDir)) {
    fs.mkdirSync(currentSessionDir, { recursive: true });
  }
}

function extractAgentNameFromTranscript() {
  // Try to extract actual agent name from transcript file
  // VS Code often reports "default" as agent_type, but the transcript contains
  // the actual agent identity in phrases like "You are the [AgentName] agent"
  try {
    if (!eventContext.transcript_path) return null;
    
    var transcriptPath = eventContext.transcript_path;
    if (!fs.existsSync(transcriptPath)) return null;
    
    var transcript = JSON.parse(fs.readFileSync(transcriptPath, "utf8"));
    
    // Look at the most recent messages for agent identity
    if (transcript.messages && transcript.messages.length > 0) {
      // Check the last few messages for agent name patterns
      var recentMessages = transcript.messages.slice(-5);
      for (var i = recentMessages.length - 1; i >= 0; i--) {
        var msg = recentMessages[i];
        var text = msg.content || "";
        
        // Look for patterns like "You are the Bootstrap agent"
        var match = text.match(/You are the (\w+) agent/i);
        if (match) {
          var agentName = match[1];
          // Validate it's a known subagent
          if (SUBAGENT_REGISTRY.indexOf(agentName) !== -1) {
            return agentName;
          }
        }
        
        // Also check for direct agent references in system messages
        for (var j = 0; j < SUBAGENT_REGISTRY.length; j++) {
          var agent = SUBAGENT_REGISTRY[j];
          // Look for agent name in context
          if (text.includes(agent + " agent") || text.includes(agent + " subagent")) {
            return agent;
          }
        }
      }
    }
  } catch (e) {
    // Silently fail - transcript parsing is best-effort
  }
  return null;
}

function isoTimestamp() {
  return new Date().toISOString();
}

function shortTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function append(text) {
  ensureLogDir();
  fs.appendFileSync(LOG_FILE, text + "\n", "utf8");
}

function readLog() {
  if (!fs.existsSync(LOG_FILE)) return "";
  return fs.readFileSync(LOG_FILE, "utf8");
}

function countInLog(pattern) {
  var content = readLog();
  return (content.match(pattern) || []).length;
}

// --- Event Handlers ---

function onSessionStart() {
  // Create new session directory
  createSessionDir();

  var sessionId = eventContext.sessionId || "unknown";
  var source = eventContext.source || "new";
  var sessionName = path.basename(currentSessionDir);

  // Initialize session state
  writeSessionState({ active_subagents: [], prompt_count: 0, skills_invoked: [] });

  var header = [
    "",
    SEPARATOR,
    "  ORCHESTRATION LOG \u2014 " + isoTimestamp(),
    "  Session: " + sessionName,
    "  Session ID: " + sessionId,
    "  Source: " + source,
    "  Orchestrator: CopilotCustomizer",
    "  Registered Subagents: " + SUBAGENT_REGISTRY.join(", "),
    SEPARATOR,
    "",
    "[" + shortTime() + "]  SESSION_START",
    '              Orchestrator "CopilotCustomizer" initialized',
    "              Session folder: sessions/" + sessionName + "/",
    "              Awaiting workflow routing...",
    "",
  ].join("\n");

  append(header);
}

function onUserPromptSubmit() {
  var prompt = eventContext.prompt || "";
  var state = readSessionState();
  state.prompt_count = (state.prompt_count || 0) + 1;
  writeSessionState(state);

  // Truncate long prompts for the log
  var displayPrompt = prompt.length > 120
    ? prompt.substring(0, 117) + "..."
    : prompt;

  var entry = [
    "[" + shortTime() + "]  \u25C6 USER_PROMPT (#" + state.prompt_count + ")",
    '              "' + displayPrompt.replace(/\n/g, " ") + '"',
    "",
  ].join("\n");

  append(entry);
}

function onSubagentStart() {
  // Try to extract actual agent name from transcript first
  var agentType = extractAgentNameFromTranscript() || eventContext.agent_type || "Unknown";
  var agentId = eventContext.agent_id || "unknown";

  // Push onto active subagent stack
  var state = readSessionState();
  state.active_subagents = state.active_subagents || [];
  state.active_subagents.push(agentType);
  writeSessionState(state);

  var invocationCount =
    countInLog(new RegExp("SUBAGENT_START.*" + agentType, "g")) + 1;

  var entry = [
    "[" +
      shortTime() +
      "]  \u25B6 SUBAGENT_START  \u2500  " +
      agentType,
    "              Agent ID: " + agentId,
    "              Invoked by: " + (state.active_subagents.length > 1
      ? state.active_subagents[state.active_subagents.length - 2]
      : "CopilotCustomizer"),
    "              Invocation #" + invocationCount + " this session",
    "              Status: RUNNING",
    "",
  ].join("\n");

  append(entry);
}

function onSubagentStop() {
  // Try to extract actual agent name from transcript first
  var agentType = extractAgentNameFromTranscript() || eventContext.agent_type || "Unknown";
  var agentId = eventContext.agent_id || "unknown";
  var stopHookActive = eventContext.stop_hook_active || false;
  var status = stopHookActive ? "CONTINUING" : "COMPLETED";
  var icon = stopHookActive ? "\u25B7" : "\u25A0";

  // Pop from active subagent stack
  var state = readSessionState();
  state.active_subagents = state.active_subagents || [];
  // Remove the last occurrence of this agent type
  var idx = state.active_subagents.lastIndexOf(agentType);
  if (idx !== -1) {
    state.active_subagents.splice(idx, 1);
  }
  writeSessionState(state);

  var entry = [
    "[" +
      shortTime() +
      "]  " +
      icon +
      " SUBAGENT_STOP   \u2500  " +
      agentType,
    "              Agent ID: " + agentId,
    "              Status: " + status,
    "",
  ].join("\n");

  append(entry);
}

function onPreToolUse() {
  var toolName = eventContext.tool_name || "unknown";
  var toolUseId = eventContext.tool_use_id || "";
  var activeAgent = getActiveAgent();

  var entry = [
    "[" + shortTime() + "]    \u251C\u2500 TOOL_START: " + toolName,
    "              Agent: " + activeAgent,
  ];

  // Add tool_use_id for traceability if present
  if (toolUseId) {
    entry.push("              Tool ID: " + toolUseId);
  }

  append(entry.join("\n"));
}

function onPostToolUse() {
  var toolName = eventContext.tool_name || "unknown";
  var toolInput = eventContext.tool_input;
  var toolResponse = eventContext.tool_response;
  // If tool_response exists and is non-empty, consider it a success
  var success = toolResponse !== undefined && toolResponse !== null;
  var icon = success ? "\u2713" : "\u2717";

  var entry =
    "[" + shortTime() + "]    \u2514\u2500 TOOL_DONE:  " + toolName + " (" + icon + ")";

  append(entry);

  // Detect and log skill invocations
  if (isSkillInvocation(toolName, toolInput)) {
    var skillName = extractSkillName(toolInput.filePath);
    var activeAgent = getActiveAgent();

    // Track skill usage in session state
    var state = readSessionState();
    state.skills_invoked = state.skills_invoked || [];
    if (state.skills_invoked.indexOf(skillName) === -1) {
      state.skills_invoked.push(skillName);
    }
    writeSessionState(state);

    // Log skill invocation
    var skillEntry = [
      "[" + shortTime() + "]    \u2728 SKILL_INVOKED: " + skillName,
      "              Invoked by: " + activeAgent,
      "",
    ].join("\n");

    append(skillEntry);
  }
}

function onPreCompact() {
  var trigger = eventContext.trigger || "auto";

  var entry = [
    "[" + shortTime() + "]  \u26A0 PRE_COMPACT",
    "              Trigger: " + trigger,
    "              Context window compaction imminent",
    "",
  ].join("\n");

  append(entry);
}

function onStop() {
  var content = readLog();
  var stopHookActive = eventContext.stop_hook_active || false;

  // Count subagent invocations from the log
  var starts = (content.match(/SUBAGENT_START/g) || []).length;
  var stops = (content.match(/SUBAGENT_STOP/g) || []).length;
  var failures = (content.match(/Status: FAILED/g) || []).length;

  // Count tool usage from the log
  var toolMatches = content.match(/TOOL_START: (\S+)/g) || [];
  var toolCounts = {};
  toolMatches.forEach(function (match) {
    var name = match.replace("TOOL_START: ", "");
    toolCounts[name] = (toolCounts[name] || 0) + 1;
  });
  var totalToolCalls = toolMatches.length;
  var toolFailures = (content.match(/TOOL_DONE:.*\(\u2717\)/g) || []).length;

  // Count skill invocations from the log
  var skillMatches = content.match(/SKILL_INVOKED: ([^\n]+)/g) || [];
  var skillCounts = {};
  var uniqueSkills = [];
  skillMatches.forEach(function (match) {
    var name = match.replace("SKILL_INVOKED: ", "").trim();
    if (uniqueSkills.indexOf(name) === -1) {
      uniqueSkills.push(name);
    }
    skillCounts[name] = (skillCounts[name] || 0) + 1;
  });
  var totalSkillInvocations = skillMatches.length;

  // Count user prompts
  var promptMatches = content.match(/USER_PROMPT/g) || [];
  var promptCount = promptMatches.length;

  // Count compactions
  var compactMatches = content.match(/PRE_COMPACT/g) || [];
  var compactCount = compactMatches.length;

  // Identify which subagents were used
  var usedAgents = SUBAGENT_REGISTRY.filter(function (name) {
    return content.includes("SUBAGENT_START  \u2500  " + name);
  });
  var unusedAgents = SUBAGENT_REGISTRY.filter(function (name) {
    return !content.includes("SUBAGENT_START  \u2500  " + name);
  });

  // Build tool usage display
  var toolLines = Object.keys(toolCounts).map(function (name) {
    return "    " + name + ": " + toolCounts[name];
  });

  // Build skill usage display
  var skillLines = uniqueSkills.map(function (name) {
    return "    " + name + ": " + skillCounts[name];
  });

  // Extract session start time and compute duration
  var startMatch = content.match(/ORCHESTRATION LOG \u2014 ([^\n]+)/);
  var durationSec = 0;
  if (startMatch) {
    durationSec = Math.round(
      (Date.now() - new Date(startMatch[1].trim()).getTime()) / 1000
    );
  }

  // Detect workflow type from subagent chain
  var workflowType = "unknown";
  if (usedAgents.indexOf("Bootstrap") !== -1) workflowType = "bootstrap";
  else if (usedAgents.indexOf("Evolve") !== -1) workflowType = "self-improvement";
  else if (usedAgents.indexOf("Generator") !== -1 && usedAgents.indexOf("Planner") !== -1) workflowType = "plan-and-generate";
  else if (usedAgents.indexOf("Generator") !== -1) workflowType = "generate";
  else if (usedAgents.indexOf("Editor") !== -1) workflowType = "edit";
  else if (usedAgents.indexOf("Verifier") !== -1) workflowType = "verify";
  else if (usedAgents.indexOf("Planner") !== -1) workflowType = "plan";

  var summary = [
    "[" + shortTime() + "]  SESSION_STOP" + (stopHookActive ? " (continuing from previous stop hook)" : ""),
    "",
    SEPARATOR,
    "  SESSION SUMMARY \u2014 " + isoTimestamp(),
    SEPARATOR,
    "  Duration:              " + durationSec + "s",
    "  Workflow type:         " + workflowType,
    "  User prompts:          " + promptCount,
    "  Context compactions:   " + compactCount,
    "  Subagent invocations:  " + starts,
    "  Subagent completions:  " + stops,
    "  Subagent failures:     " + failures,
    "  Tool calls:            " + totalToolCalls,
    "  Tool failures:         " + toolFailures,
    "  Skills invoked:        " + totalSkillInvocations + " (" + uniqueSkills.length + " unique)",
    "  Active subagents:      " +
      (usedAgents.length > 0 ? usedAgents.join(", ") : "(none)"),
    "  Unused subagents:      " +
      (unusedAgents.length > 0 ? unusedAgents.join(", ") : "(none)"),
  ];

  if (toolLines.length > 0) {
    summary.push("  Tool breakdown:");
    summary = summary.concat(toolLines);
  }

  if (skillLines.length > 0) {
    summary.push("  Skills used:");
    summary = summary.concat(skillLines);
  }

  summary.push(SEPARATOR);
  summary.push("");

  append(summary.join("\n"));

  // Clean up session state
  try {
    if (STATE_FILE && fs.existsSync(STATE_FILE)) {
      fs.unlinkSync(STATE_FILE);
    }
  } catch (e) { /* ignore */ }

  // --- Write metrics.json ---
  var metrics = {
    timestamp: isoTimestamp(),
    session_id: eventContext.sessionId || "unknown",
    duration_seconds: durationSec,
    workflow_type: workflowType,
    orchestrator: "CopilotCustomizer",
    user_prompts: promptCount,
    context_compactions: compactCount,
    subagents: {
      invoked: usedAgents,
      unused: unusedAgents,
      total_invocations: starts,
      total_completions: stops,
      failures: failures,
    },
    tools: {
      total_calls: totalToolCalls,
      failures: toolFailures,
      breakdown: toolCounts,
    },
    skills: {
      total_invocations: totalSkillInvocations,
      unique_skills: uniqueSkills.length,
      invoked: uniqueSkills,
      breakdown: skillCounts,
    },
  };

  ensureLogDir();
  fs.writeFileSync(METRICS_FILE, JSON.stringify(metrics, null, 2) + "\n", "utf8");
}

// --- Stdin Reader ---
function readStdin(callback) {
  var data = "";

  process.stdin.setEncoding("utf8");

  process.stdin.on("readable", function () {
    var chunk;
    while ((chunk = process.stdin.read()) !== null) {
      data += chunk;
    }
  });

  process.stdin.on("end", function () {
    // Store raw stdin for later capture (after session directory is loaded)
    rawStdinData = data;
    
    try {
      eventContext = data.trim() ? JSON.parse(data) : {};
    } catch (e) {
      // If parsing fails, use empty context
      eventContext = {};
    }
    callback();
  });
}

// --- Main ---
var event = process.argv[2] || "Unknown";

function executeEvent() {
  // Load current session (except for SessionStart which creates it)
  if (event !== "SessionStart") {
    loadCurrentSession();
  }

  switch (event) {
    case "SessionStart":
      onSessionStart();
      break;
    case "UserPromptSubmit":
      onUserPromptSubmit();
      break;
    case "SubagentStart":
      onSubagentStart();
      break;
    case "SubagentStop":
      onSubagentStop();
      break;
    case "PreToolUse":
      onPreToolUse();
      break;
    case "PostToolUse":
      onPostToolUse();
      break;
    case "PreCompact":
      onPreCompact();
      break;
    case "Stop":
      onStop();
      break;
    default:
      loadCurrentSession();
      append("[" + shortTime() + "]  UNKNOWN_EVENT: " + event);
  }

  // Capture stdin after all event processing (session directory now exists)
  captureStdin(event, rawStdinData);
}

// Read stdin for event context, then execute
readStdin(executeEvent);
