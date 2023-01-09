import argsToStr from "./argsToStr";
import redactSecrets from "./redactSecrets";

export const logs: string[] = [];
// @ts-ignore
global.logs = logs;

export const secrets: string[] = [];

export const emptyLogs = () => (logs.length = 0);
export const emptySecrets = () => (secrets.length = 0);

export interface Logger {
  log(...msg: any[]): void;
  error(...msg: any[]): void;
  warn(...msg: any[]): void;
  info(...msg: any[]): void;
  debug(...msg: any[]): void;
}

const processArgs =
  (level: string, addPrefix: boolean) =>
  (...msg: any[]): void => {
    const levelInCaps = level.toUpperCase();
    const messageStr = addPrefix
      ? argsToStr(`[${levelInCaps}]:`, ...msg)
      : argsToStr(...msg);
    const redactedMessageStr = redactSecrets(secrets, messageStr);

    logs.push(redactedMessageStr);

    // @ts-ignore Level is already sanitized
    originalConsole[level](redactedMessageStr);
  };

// @ts-ignore
const addPrefix = !global.replacedConsole;

const consoleReplacement: Logger = {
  log: processArgs("log", addPrefix),
  error: processArgs("error", addPrefix),
  warn: processArgs("warn", addPrefix),
  info: processArgs("info", addPrefix),
  debug: processArgs("debug", addPrefix),
};

const originalConsole: Logger = {
  log: global.console.log,
  error: global.console.error,
  warn: global.console.warn,
  info: global.console.info,
  debug: global.console.debug,
};

if (!process.env.IN_VM) {
  global.console.log = consoleReplacement.log;
  global.console.error = consoleReplacement.error;
  global.console.warn = consoleReplacement.warn;
  global.console.info = consoleReplacement.info;
  global.console.debug = consoleReplacement.debug;

  // @ts-ignore
  global.replacedConsole = true;
}
