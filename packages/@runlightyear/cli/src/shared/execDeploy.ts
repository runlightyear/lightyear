import runInContext from "./runInContext";
import updateDeploy from "./updateDeploy";
import { logDisplayLevel } from "./setLogDisplayLevel";
import { prepareConsole } from "../logging";

export interface ExecDeployProps {
  deployId: string;
  compiledCode: Buffer;
}

export default async function execDeploy(props: ExecDeployProps) {
  const { deployId, compiledCode } = props;

  let handler;
  let getDeployList;

  try {
    const runInContextResult = runInContext(compiledCode);
    handler = runInContextResult.handler;
    getDeployList = runInContextResult.getDeployList;
  } catch (error) {
    prepareConsole();
    console.error(error);
    return;
  }

  if (getDeployList) {
    console.debug(
      "Before the deploy operation, getDeployList()",
      JSON.stringify(getDeployList(), null, 2)
    );
  } else {
    console.debug("getDeployList not returned");
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

  await updateDeploy({
    deployId,
    logs,
  });

  return handlerResult;
}
