import { logDisplayLevel } from "./setLogDisplayLevel";
import { prepareConsole } from "../logging";
import runInContext from "./runInContext";
import uploadUnsubscribeResult from "./uploadUnsubscribeResult";

export interface ExecUnsubscribeProps {
  webhookName: string;
  compiledCode: Buffer;
  removed: boolean;
}

export default async function execUnsubscribe(props: ExecUnsubscribeProps) {
  const { webhookName, compiledCode, removed } = props;

  console.info("Unsubscribing", webhookName);

  const handler = runInContext(compiledCode);

  const handlerResult = await handler({
    operation: "unsubscribe",
    webhookName,
    // removed: true,
    logDisplayLevel,
  });

  prepareConsole();

  const { statusCode, body } = handlerResult;
  const responseData = JSON.parse(body);
  const { logs } = responseData;

  const status = statusCode >= 300 ? "FAILED" : "SUCCEEDED";

  console.debug("about to upload unsubscribe result");

  await uploadUnsubscribeResult({
    webhookName,
    status,
    logs,
    removed,
  });
}
