import { run } from "../run";
import { handlerResult } from "./handlerResult";
import { getRunFuncProps } from "../base/run";
import { BaseRequestError } from "../base/BaseRequestError";
import { HttpProxyResponseError } from "../base/http";

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
    return handlerResult(200, "Run successful");
  } catch (error) {
    if (error === "SKIPPED") {
      console.info("Run skipped");
      return handlerResult(202, "Run skipped");
    }

    console.error("Run failed here", String(error));

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

    return handlerResult(500, "Run failed there");
  }
}
