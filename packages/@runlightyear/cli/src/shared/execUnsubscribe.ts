import getUnsubscribeList from "./getUnsubscribeList";
import runInContext from "./runInContext";
import getPreviouslyDeployedCode from "./getPreviouslyDeployedCode";
import uploadUnsubscribeResult from "./uploadUnsubscribeResult";
import { logDisplayLevel } from "./setLogDisplayLevel";
import { prepareConsole } from "../logging";

export default async function execUnsubscribe() {
  const compiledCodeStr = await getPreviouslyDeployedCode();

  if (!compiledCodeStr) {
    console.debug("No previous code found, skipping unsubscribe step");
    return;
  }

  const compiledCode = Buffer.from(compiledCodeStr, "base64");
  const handler = runInContext(compiledCode);

  const unsubscribeList = await getUnsubscribeList();

  const doTheUnsubscribe = async (webhookName: string, removed: boolean) => {
    console.info("Unsubscribing", webhookName);

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
  };

  for (const webhookName of unsubscribeList.removed) {
    await doTheUnsubscribe(webhookName, true);
  }

  for (const webhookName of unsubscribeList.changed) {
    await doTheUnsubscribe(webhookName, false);
  }

  return null;
}
