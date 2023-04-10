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
import runInContext from "./runInContext";

export default async function execDeployAndSubscribe() {
  const pkg = readPackage();
  const compiledCode = getCompiledCode(pkg.main);
  // const previousCompiledCode = await getPreviouslyDeployedCode();

  try {
    runInContext(compiledCode);
  } catch (error) {
    console.error(String(error));
    return;
  }

  const deployId = await createDeploy({ status: "RUNNING", compiledCode });

  const handlerResult = await execDeploy({ deployId, compiledCode });
  await execSubscribeProps({ deployId, compiledCode });
  await execUnsubscribeAfterDeploy({
    deployId,
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
    endedAt: "now",
  });
}
