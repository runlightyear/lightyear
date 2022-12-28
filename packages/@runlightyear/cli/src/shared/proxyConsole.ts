import { terminal } from "terminal-kit";

let rejectLogLevels = ["debug", "trace"];

export function setRejectLogLevels(levels: string[]) {
  rejectLogLevels = [...levels];
}

const handle =
  (level: string) =>
  (message: string): void => {
    let terminalFn = terminal;
    if (level === "error") {
      terminalFn = terminal.red;
    } else if (level === "warn") {
      terminalFn = terminal.yellow;
    } else if (level === "debug") {
      terminalFn = terminal.gray;
    }

    if (!rejectLogLevels.includes(level)) {
      terminalFn(`[${level.toUpperCase()}]: ${message}\n`);
    }
  };

export const proxyConsole = {
  trace: handle("trace"),
  log: handle("log"),
  debug: handle("debug"),
  info: handle("info"),
  warn: handle("warn"),
  error: handle("error"),
};
