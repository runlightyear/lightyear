import vm from "vm";
import { program } from "commander";

interface OurContext {
  exports: {
    handler?: (options: any) => any;
    getDeployList?: () => any;
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
    console,
    process,
    Buffer,
    setTimeout,
    clearTimeout,
  };

  vm.createContext(context);

  const script = new vm.Script(code.toString());

  script.runInContext(context);

  if (!context.exports.handler) {
    program.error("Can't find export 'handler'");
  }

  // return context.exports.getDeployList;
  return {
    handler: context.exports.handler,
    getDeployList: context.exports.getDeployList,
  };
}
