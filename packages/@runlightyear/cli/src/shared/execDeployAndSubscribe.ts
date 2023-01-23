import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
import createDeploy from "./createDeploy";
import execDeploy from "./execDeploy";
import execSubscribeProps from "./execSubscribeProps";
import execUnsubscribeAfterDeploy from "./execUnsubscribeAfterDeploy";
import execSubscribeAfterDeploy from "./execSubscribeAfterDeploy";
import { terminal } from "terminal-kit";
import updateDeploy from "./updateDeploy";
import getPreviouslyDeployedCode from "./getPreviouslyDeployedCode";

export default async function execDeployAndSubscribe() {
  const pkg = readPackage();
  const compiledCode = getCompiledCode(pkg.main);
  const previousCompiledCode = await getPreviouslyDeployedCode();

  const deployId = await createDeploy({ compiledCode });

  const handlerResult = await execDeploy({ deployId, compiledCode });
  await execSubscribeProps({ deployId, compiledCode });
  await execUnsubscribeAfterDeploy({
    deployId,
    compiledCode: previousCompiledCode,
  });
  await execSubscribeAfterDeploy({ deployId, compiledCode });

  const { statusCode } = handlerResult;
  const status = statusCode >= 300 ? "FAILED" : "SUCCEEDED";

  if (status === "SUCCEEDED") {
    // terminal.green("🚀 Deploy succeeded!\n");
  } else if (status === "FAILED") {
    terminal.red("💥 Deploy failed\n");
  }

  await updateDeploy({
    deployId,
    status,
  });
}
