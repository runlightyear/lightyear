import { logDisplayLevel } from "./setLogDisplayLevel";
import { prepareConsole } from "../logging";
import uploadSubscribeResult from "./uploadSubscribeResult";
import runInContext from "./runInContext";

export interface ExecSubscribeProps {
  webhookName: string;
  compiledCode: Buffer;
}

export default async function execSubscribe(props: ExecSubscribeProps) {
  const { webhookName, compiledCode } = props;

  const handler = runInContext(compiledCode);

  console.info("Subscribing", webhookName);
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

  await uploadSubscribeResult({
    webhookName,
    status,
    logs,
    unsubscribeProps,
  });
}
