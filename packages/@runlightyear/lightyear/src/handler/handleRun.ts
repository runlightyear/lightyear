import { run } from "../run";
import { handlerResult } from "./handlerResult";
import { finishRun, getRunFuncProps } from "../base/run";
import { BaseRequestError } from "../base/BaseRequestError";
import { HttpProxyResponseError } from "../base/http";
import { getEnvName } from "../util/getEnvName";

export interface HandleRunProps {
  actionName: string | undefined;
  runId: string | undefined;
  data: any;
  context: any;
}

export async function handleRun({
  actionName,
  runId,
  data,
  context,
}: HandleRunProps) {
  if (!actionName) {
    console.error("Missing actionName");
    return handlerResult(400, "Missing actionName");
  }

  if (!runId) {
    console.error("Missing runId");
    return handlerResult(400, "Missing runId");
  }

  console.debug("context", context);

  console.debug("getEnvName()", getEnvName());

  const runFuncProps = await getRunFuncProps(runId);

  // const actionData = await getActionData(actionName);
  // const { auths, variables, secrets, webhook } = actionData;
  const { auths, variables, secrets, webhook, integration, managedUser } =
    runFuncProps;

  try {
    console.info(`Running action ${actionName}`);
    await run({
      name: actionName,
      integration,
      managedUser,
      data,
      variables,
      auths,
      secrets,
      webhook,
      context,
    });
    await finishRun({ runId, status: "SUCCEEDED" });
    return handlerResult(200, "Run successful");
  } catch (error) {
    if (error === "SKIPPED") {
      console.info("Run skipped");
      await finishRun({ runId, status: "SKIPPED" });
      return handlerResult(202, "Run skipped");
    } else if (error === "RERUN") {
      console.info("Rerun");
      await finishRun({ runId, status: "SUCCEEDED", rerun: true });
      return handlerResult(202, "Rerun");
    }

    console.error("Run failed", String(error));

    if (error instanceof HttpProxyResponseError) {
      console.error(error.response);
    }

    if (error instanceof BaseRequestError) {
      const body = await error.response.text();
      try {
        const jsonData = JSON.parse(body);
        console.error(jsonData);
      } catch (e2) {
        console.error(body);
      }
    }

    await finishRun({ runId, status: "FAILED" });
    return handlerResult(500, "Run failed there");
  }
}
