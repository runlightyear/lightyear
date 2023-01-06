import getUnsubscribeList from "./getUnsubscribeList";
import runInContext from "./runInContext";
import getPreviouslyDeployedCode from "./getPreviouslyDeployedCode";
import { terminal } from "terminal-kit";
import uploadUnsubscribeResult from "./uploadUnsubscribeResult";

export default async function execUnsubscribe() {
  const compiledCodeStr = await getPreviouslyDeployedCode();
  if (compiledCodeStr) {
    const compiledCode = Buffer.from(compiledCodeStr, "utf-8");
    const handler = runInContext(compiledCode);

    const unsubscribeList = await getUnsubscribeList();

    terminal("unsubscribeList");
    terminal(JSON.stringify(unsubscribeList, null, 2));

    for (const webhookName of [
      ...unsubscribeList.removed,
      ...unsubscribeList.changed,
    ]) {
      terminal("About to attempt unsubscribe for ", webhookName, "\n");

      const handlerResult = await handler({
        action: "unsubscribe",
        subscriptionName: webhookName,
        removed: true,
      });

      terminal("handlerResult ", JSON.stringify(handlerResult, null, 2), "\n");

      const { statusCode, body } = handlerResult;
      const responseData = JSON.parse(body);
      const { logs } = responseData;

      const status = statusCode >= 300 ? "FAILED" : "SUCCEEDED";

      await uploadUnsubscribeResult({
        webhookName,
        status,
        logs,
      });
    }
  }

  return null;
}
