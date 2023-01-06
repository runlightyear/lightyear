import { getActionData } from "../base/action";
import { run } from "../run";
import { handlerResult } from "./handlerResult";

export interface HandleRunProps {
  actionName: string | undefined;
  data: any;
  context: any;
}

export async function handleRun({ actionName, data, context }: HandleRunProps) {
  if (!actionName) {
    return handlerResult(400, "Missing actionName");
  }

  const actionData = await getActionData(actionName);
  const { auths, variables, secrets, webhook } = actionData;

  try {
    console.info(`Running action ${actionName}`);
    await run({
      name: actionName,
      data,
      variables,
      auths,
      secrets,
      webhook,
      context,
    });
    return handlerResult(200, "Run successful");
  } catch (error) {
    console.error("Failed to run action", String(error));
    return handlerResult(500, "Run failed");
  }
}
