import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
import runInContext from "./runInContext";
import getSubscribeList from "./getSubscribeList";
import uploadSubscribeResult from "./uploadSubscribeResult";
import { terminal } from "terminal-kit";

export default async function execSubscribe() {
  const pkg = readPackage();

  const compiledCode = getCompiledCode(pkg.main);
  const handler = runInContext(compiledCode);

  const subscribeList = await getSubscribeList();

  for (const webhookName of [
    ...subscribeList.created,
    ...subscribeList.changed,
  ]) {
    terminal("About to attempt subscribe for ", webhookName, "\n");
    const handlerResult = await handler({
      operation: "subscribe",
      webhookName,
    });

    terminal("handlerResult ", JSON.stringify(handlerResult, null, 2), "\n");

    const { statusCode, body } = handlerResult;
    const responseData = JSON.parse(body);
    const { unsubscribeProps, logs } = responseData;

    const status = statusCode >= 300 ? "FAILED" : "SUCCEEDED";

    await uploadSubscribeResult({
      webhookName,
      status,
      logs,
      unsubscribeProps,
    });
  }
}
