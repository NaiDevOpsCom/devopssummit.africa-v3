import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const LHCI_COMMANDS = new Set([
  "assert",
  "autorun",
  "collect",
  "healthcheck",
  "open",
  "server",
  "upload",
  "wizard",
]);

const WINDOWS_CHROME_PATHS = [
  String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`, // stable by default
  String.raw`C:\Program Files\Google\Chrome Dev\Application\chrome.exe`,
  String.raw`C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`,
  String.raw`C:\Program Files\Google\Chrome SxS\Application\chrome.exe`,
];

const MACOS_CHROME_PATHS = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // stable by default
  "/Applications/Google Chrome Dev.app/Contents/MacOS/Google Chrome Dev",
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
];

const LINUX_CHROME_PATHS = [
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
];

function getCandidateChromePaths() {
  if (process.platform === "win32") return WINDOWS_CHROME_PATHS;
  if (process.platform === "darwin") return MACOS_CHROME_PATHS;
  return LINUX_CHROME_PATHS;
}

function resolveChromePath() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }

  return getCandidateChromePaths().find((candidate) => existsSync(candidate));
}

function resolveLhciInvocation(argv) {
  const [maybeCommand, ...rest] = argv;

  if (maybeCommand && LHCI_COMMANDS.has(maybeCommand)) {
    return { command: maybeCommand, args: rest };
  }

  return { command: "autorun", args: argv };
}

const chromePath = resolveChromePath();
const env = chromePath ? { ...process.env, CHROME_PATH: chromePath } : process.env;

// ── Resilient path resolution for @lhci/cli ─────────────────────────────────────
let lhciCliPath;
try {
  lhciCliPath = path.join(path.dirname(require.resolve("@lhci/cli/package.json")), "src", "cli.js");
} catch {
  process.stderr.write("❌ Error: @lhci/cli not found. Please run 'npm install' first.\n");
  process.exit(1);
}

const { command, args } = resolveLhciInvocation(process.argv.slice(2));

if (chromePath) {
  process.stdout.write(`Using Chrome at ${chromePath}\n`);
} else {
  process.stdout.write(
    "Chrome was not auto-detected in the repo helper. Falling back to LHCI discovery.\n",
  );
}

// ── Pre-flight check ──────────────────────────────────────────────────────────
if (!existsSync(lhciCliPath)) {
  process.stderr.write(
    `❌ Error: LHCI binary not found at ${lhciCliPath}.\nCheck your node_modules installation.\n`,
  );
  process.exit(1);
}

const result = spawnSync(process.execPath, [lhciCliPath, command, ...args], {
  stdio: "inherit",
  env,
});

if (result.error) {
  process.stderr.write(`${result.error.message}\n`);
}

if (typeof result.status === "number") {
  process.exit(result.status);
}

process.exit(1);
