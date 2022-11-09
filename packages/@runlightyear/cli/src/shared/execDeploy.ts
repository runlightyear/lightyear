import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
import runInContext from "./runInContext";
import uploadDeployResult from "./uploadDeployResult";

export default async function execDeploy() {
  const pkg = readPackage();
  const compiledCode = getCompiledCode(pkg.main);
  const handler = runInContext(compiledCode);
  const handlerResult = await handler({ action: "deploy" });

  console.log("back from handler");

  const { statusCode, body } = handlerResult;

  const responseData = JSON.parse(body);

  const { logs } = responseData;

  const status = statusCode >= 300 ? "FAILED" : "SUCCEEDED";

  console.log("about to upload deploy result");

  await uploadDeployResult({
    status,
    logs,
    compiledCode: compiledCode.toString("utf-8"),
  });

  console.log("back from uploading");

  return handlerResult;
}
