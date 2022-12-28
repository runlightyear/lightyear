import vm from "vm";
import { program } from "commander";
import { proxyConsole } from "./proxyConsole";

interface OurContext {
  exports: {
    handler?: (options: any) => any;
  };
  [name: string]: unknown;
}

export default function runInContext(code: any) {
  const context: OurContext = {
    exports: {},
    require,
    URL,
    URLSearchParams,
    TextDecoder,
    global,
    console: proxyConsole,
    process,
    Buffer,
    clearTimeout,
  };

  vm.createContext(context);

  const script = new vm.Script(code.toString());

  script.runInContext(context);

  // console.log = originalConsole.log;

  if (!context.exports.handler) {
    program.error("Can't find export 'handler'");
  }

  return context.exports.handler;
}
