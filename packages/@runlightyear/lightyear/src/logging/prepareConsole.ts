import { prefixedRedactedConsole } from "./index";
import { LogDisplayLevel } from "./PrefixedRedactedConsole";

export function prepareConsole(logDisplayLevel: LogDisplayLevel) {
  prefixedRedactedConsole.setLogDisplayLevel(logDisplayLevel);

  console.log = (...args: any[]) => prefixedRedactedConsole.log(...args);
  console.debug = (...args: any[]) => prefixedRedactedConsole.debug(...args);
  console.info = (...args: any[]) => prefixedRedactedConsole.info(...args);
  console.warn = (...args: any[]) => prefixedRedactedConsole.warn(...args);
  console.error = (...args: any[]) => prefixedRedactedConsole.error(...args);

  // console.info("Made a new console");
  // console.debug("Debug test", { hi: "there" });
  // console.info("Info test", { hi: "there" });
  // console.log("Log test", { hi: "there" });
  // console.warn("Warning test", { hi: "there" });
  // console.error("Error error", { hi: "there" });
  // const obj = { hi: "there" };
  // console.error("Another error test", obj);
  // console.error("Error error", new Error("this is a new error"));
}
