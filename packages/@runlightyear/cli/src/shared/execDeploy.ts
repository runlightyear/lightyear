import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
import runInContext from "./runInContext";
import uploadDeployResult from "./uploadDeployResult";
import { terminal } from "terminal-kit";
import { restoreConsole } from "./restoreConsole";

export default async function execDeploy() {
  const pkg = readPackage();
  const compiledCode = getCompiledCode(pkg.main);
  let handler;
  try {
    handler = runInContext(compiledCode);
  } catch (error) {
    restoreConsole();
    terminal.red(error);
    return;
  }

  const handlerResult = await handler({ operation: "deploy" });

  restoreConsole();

  const { statusCode, body } = handlerResult;

  const responseData = JSON.parse(body);

  const { logs } = responseData;

  const status = statusCode >= 300 ? "FAILED" : "SUCCEEDED";

  if (status === "SUCCEEDED") {
    terminal.green("🚀 Deploy succeeded!\n");
  } else if (status === "FAILED") {
    terminal.red("💥 Deploy failed\n");
  }

  await uploadDeployResult({
    status,
    logs,
    compiledCode,
  });

  return handlerResult;
}
