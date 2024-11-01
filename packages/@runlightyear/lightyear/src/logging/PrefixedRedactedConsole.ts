import argsToStr from "./argsToStr";
import redactSecrets from "./redactSecrets";
import isString from "../util/isString";
import * as process from "process";
import { dayjsUtc } from "../util/dayjsUtc";
import baseRequest from "../base/baseRequest";
import { getEnvName } from "../util/getEnvName";

export type LogDisplayLevel = "DEBUG" | "INFO";

/**
 * @internal
 */
export class PrefixedRedactedConsole {
  globalPrefix: string = "";
  secrets: Array<string> = [];
  history: Array<string> = [];
  logDisplayLevel: LogDisplayLevel = "DEBUG";
  streamLogsTo: { runId?: string } | null = null;
  streamCursor: number = 0;
  logQueue: Array<{
    message: string;
    level: "INFO" | "DEBUG" | "WARN" | "ERROR" | "LOG" | "TRACE";
    timestamp: string;
  }> = [];

  setGlobalPrefix(prefix: string) {
    this.globalPrefix = prefix;
  }

  setStreamLogsTo(props: { runId?: string }) {
    this.streamLogsTo = props;
  }

  initialize() {
    this.secrets = [];
    this.history = [];
    this.logQueue = [];
  }

  addSecrets(secrets: Array<string | null>) {
    this.secrets = [
      ...this.secrets,
      ...(secrets.filter((str) => isString(str)) as string[]),
    ];
  }

  setLogDisplayLevel(level: LogDisplayLevel) {
    this.logDisplayLevel = level;
  }

  log(...params: any[]) {
    this._log({ color: "", prefix: "LOG", params, display: true });
  }

  debug(...params: any[]) {
    this._log({
      color: "\x1b[38;5;244m",
      prefix: "DEBUG",
      params,
      display: this.logDisplayLevel === "DEBUG",
    });
  }

  info(...params: any[]) {
    this._log({ color: "", prefix: "INFO", params, display: true });
  }

  warn(...params: any[]) {
    this._warn({ color: "\x1b[33m", prefix: "WARN", params, display: true });
  }

  error(...params: any[]) {
    this._warn({ color: "\x1b[31m", prefix: "ERROR", params, display: true });
  }

  dir(...params: any[]) {
    this.error(
      "console.dir not supported. Objects are pretty-printed if possible by console.log, .debug, .info, .warn, and .error"
    );
  }
  dirxml(...params: any[]) {
    this.error("console.dirxml not supported.");
  }
  group(...params: any[]) {
    this.error("console.group not supported.");
  }
  groupCollapsed(...params: any[]) {
    this.error("console.groupCollapsed not supported.");
  }
  groupEnd(...params: any[]) {
    this.error("console.groupEnd not supported.");
  }
  table(...params: any[]) {
    this.error("console.table not supported.");
  }

  _redactParams(params: any[]) {
    return redactSecrets(this.secrets, argsToStr(params));
  }

  _log(props: {
    params: any[];
    color: string;
    prefix: string;
    display: boolean;
  }) {
    this._write({ ...props, stream: process.stdout });
  }

  _warn(props: {
    params: any[];
    color: string;
    prefix: string;
    display: boolean;
  }) {
    this._write({ ...props, stream: process.stderr });
  }

  _write(props: {
    params: any[];
    color: string;
    prefix: string;
    stream: typeof process.stdout | typeof process.stderr;
    display: boolean;
  }) {
    const { params, color, prefix, stream, display } = props;
    const message = `[${prefix}]: ${this._redactParams(params)}`;
    this.history.push(message);
    this._enqueue({
      message: this._redactParams(params),
      prefix,
      timestamp: dayjsUtc().toISOString(),
    });
    if (display) {
      stream.write(
        `${
          this.globalPrefix ? this.globalPrefix + " " : ""
        }${color}${message}\x1b[0m\n`
      );
    }
  }

  _enqueue(props: { message: string; prefix: string; timestamp: string }) {
    if (this.streamLogsTo) {
      this.logQueue.push({
        message: props.message,
        level: props.prefix as any,
        timestamp: props.timestamp,
      });
    }

    if (this.logQueue.length === 50) {
      // do not await this so we can stream in the background
      this.flushQueue();
    }
  }

  async flushQueue() {
    if (this.logQueue.length > 0) {
      const envName = getEnvName();
      const logsToStream = [...this.logQueue];
      this.logQueue = [];
      await baseRequest({
        method: "POST",
        uri: `/api/v1/envs/${envName}/logs`,
        data: { ...this.streamLogsTo, logs: logsToStream },
        suppressLogs: true,
      });
    }
  }
}
