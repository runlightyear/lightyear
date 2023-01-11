import argsToStr from "./argsToStr";
import redactSecrets from "./redactSecrets";
import isString from "../util/isString";
import * as process from "process";

export class PrefixedRedactedConsole {
  secrets: Array<string> = [];
  history: Array<string> = [];

  addSecrets(secrets: Array<string | null>) {
    this.secrets = [
      ...this.secrets,
      ...(secrets.filter((str) => isString(str)) as string[]),
    ];
  }

  redactParams(params: any[]) {
    return redactSecrets(this.secrets, argsToStr(params));
  }

  _log(props: { params: any[]; color: string; prefix: string }) {
    this._write({ ...props, stream: process.stdout });
  }
  // _log(props: { params: any[]; color: string; prefix: string }) {
  //   const { params, color = "", prefix } = props;
  //
  //   const message = this.redactParams(params);
  //   this.history.push(message);
  //   process.stdout.write(`${color}VM:[${prefix}] ${message}\x1b[0m\n`);
  // }

  _warn(props: { params: any[]; color: string; prefix: string }) {
    this._write({ ...props, stream: process.stderr });
  }

  _write(props: {
    params: any[];
    color: string;
    prefix: string;
    stream: typeof process.stdout | typeof process.stderr;
  }) {
    const { params, color, prefix, stream } = props;
    const message = `[${prefix}]: ${this.redactParams(params)}`;
    this.history.push(message);
    stream.write(`${color}VM:${message}\x1b[0m\n`);
  }

  log(...params: any[]) {
    this._log({ color: "", prefix: "LOG", params });
  }

  debug(...params: any[]) {
    this._log({ color: "\x1b[38;5;244m", prefix: "DEBUG", params });
  }

  info(...params: any[]) {
    this._log({ color: "", prefix: "INFO", params });
  }

  warn(...params: any[]) {
    this._warn({ color: "\x1b[33m", prefix: "WARN", params });
  }

  error(...params: any[]) {
    this._warn({ color: "\x1b[31m", prefix: "ERROR", params });
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
}
