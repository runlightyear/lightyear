import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
import runInContext from "./runInContext";
import updateDeploy from "./updateDeploy";
import { terminal } from "terminal-kit";
import { logDisplayLevel } from "./setLogDisplayLevel";
import { prepareConsole } from "../logging";

export interface ExecDeployProps {
  deployId: string;
  compiledCode: Buffer;
}

export default async function execDeploy(props: ExecDeployProps) {
  const { deployId, compiledCode } = props;

  let handler;
  try {
    handler = runInContext(compiledCode);
  } catch (error) {
    prepareConsole();
    console.error(error);
    return;
  }

  const handlerResult = await handler({
    operation: "deploy",
    logDisplayLevel,
  });

  prepareConsole();

  const { statusCode, body } = handlerResult;
  const responseData = JSON.parse(body);
  const { logs } = responseData;
  const status = statusCode >= 300 ? "FAILED" : "SUCCEEDED";

  if (status === "SUCCEEDED") {
    // terminal.green("🚀 Deploy succeeded!\n");
  } else if (status === "FAILED") {
    terminal.red("💥 Deploy failed\n");
  }

  await updateDeploy({
    deployId,
    logs,
  });

  return handlerResult;
}
