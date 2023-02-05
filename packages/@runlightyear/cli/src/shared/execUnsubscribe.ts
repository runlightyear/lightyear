import { logDisplayLevel } from "./setLogDisplayLevel";
import { prepareConsole } from "../logging";
import runInContext from "./runInContext";
import uploadUnsubscribeResult from "./uploadUnsubscribeResult";
import getPreviouslyDeployedCode from "./getPreviouslyDeployedCode";

export interface ExecUnsubscribeProps {
  webhookName: string;
  removed: boolean;
}

export default async function execUnsubscribe(props: ExecUnsubscribeProps) {
  const { webhookName, removed } = props;

  console.debug("Unsubscribing", webhookName);

  const compiledCode = await getPreviouslyDeployedCode({ webhookName });

  console.debug("Back from getPreviouslyDeployedCode");

  if (!compiledCode) {
    console.debug(
      "No previously deployed code found, skipping unsubscribe for",
      webhookName
    );
    throw new Error("No previously deployed code found");
  }

  console.debug("About to run unsubscribe in VM");

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
