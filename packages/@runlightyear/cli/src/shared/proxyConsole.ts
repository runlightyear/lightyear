import { terminal } from "terminal-kit";

const reject = ["debug", "trace"];

const handle =
  (level: string) =>
  (message: string): void => {
    let terminalFn = terminal;
    if (level === "error") {
      terminalFn = terminal.red;
    } else if (level === "warn") {
      terminalFn = terminal.yellow;
    }

    if (!reject.includes(level)) {
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
