import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
import runInContext from "./runInContext";
import uploadDeployResult from "./uploadDeployResult";
import { terminal } from "terminal-kit";

export default async function execDeploy() {
  const pkg = readPackage();
  const compiledCode = getCompiledCode(pkg.main);
  const handler = runInContext(compiledCode);
  const handlerResult = await handler({ operation: "deploy" });

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
    compiledCode: compiledCode.toString("utf-8"),
  });

  return handlerResult;
}
