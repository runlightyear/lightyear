import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
import runInContext from "./runInContext";
import getSubscribeList from "./getSubscribeList";
import uploadSubscribeResult from "./uploadSubscribeResult";
import { terminal } from "terminal-kit";
import { restoreConsole } from "./restoreConsole";
import { logDisplayLevel } from "./setLogDisplayLevel";
import { prepareConsole } from "../logging";

export default async function execSubscribe() {
  const pkg = readPackage();

  const compiledCode = getCompiledCode(pkg.main);
  const handler = runInContext(compiledCode);

  const subscribeList = await getSubscribeList();

  for (const webhookName of [
    ...subscribeList.created,
    ...subscribeList.changed,
  ]) {
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

  if (subscribeList.skipped && subscribeList.skipped.length > 0) {
    console.info(
      "Skipping subscribe for webhooks that need configuration:",
      subscribeList.skipped.join(", ")
    );
  }
}
