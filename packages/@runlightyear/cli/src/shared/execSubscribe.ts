import { logDisplayLevel } from "./setLogDisplayLevel";
import { prepareConsole } from "../logging";
import updateSubscribeResult from "./updateSubscribeResult";
import runInContext from "./runInContext";
import createSubscribeActivity from "./createSubscribeActivity";

export interface ExecSubscribeProps {
  webhookName: string;
  compiledCode: Buffer;
  deployId: string;
}

export default async function execSubscribe(props: ExecSubscribeProps) {
  const { webhookName, compiledCode, deployId } = props;

  const activityId = await createSubscribeActivity({
    webhookName,
    deployId,
  });

  const handler = runInContext(compiledCode);

  const handlerResult = await handler({
    operation: "subscribe",
    webhookName,
    logDisplayLevel,
  });

  prepareConsole();

  const { statusCode, body } = handlerResult;
  const responseData = JSON.parse(body);
  const { unsubscribeProps, logs } = responseData;

  const status = statusCode >= 300 ? "FAILED" : "SUCCEEDED";

  console.debug("about to upload subscribe result");
  console.debug("deployId", deployId);

  await updateSubscribeResult({
    subscriptionActivityId: activityId,
    webhookName,
    status,
    logs,
    unsubscribeProps,
    deployId,
  });

  return status;
}
