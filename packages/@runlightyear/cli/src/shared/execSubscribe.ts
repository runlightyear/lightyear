import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
import runInContext from "./runInContext";
import getSubscribeList from "./getSubscribeList";
import uploadSubscribeResult from "./uploadSubscribeResult";
import { terminal } from "terminal-kit";
import { restoreConsole } from "./restoreConsole";

export default async function execSubscribe() {
  const pkg = readPackage();

  const compiledCode = getCompiledCode(pkg.main);
  const handler = runInContext(compiledCode);

  restoreConsole();

  const subscribeList = await getSubscribeList();

  for (const webhookName of [
    ...subscribeList.created,
    ...subscribeList.changed,
  ]) {
    terminal("Subscribing ", webhookName, "\n");
    const handlerResult = await handler({
      operation: "subscribe",
      webhookName,
    });

    const { statusCode, body } = handlerResult;
    const responseData = JSON.parse(body);
    const { unsubscribeProps, logs } = responseData;

    terminal(
      "XXX unsubscribeProps",
      JSON.stringify(unsubscribeProps, null, 2),
      "\n"
    );

    const status = statusCode >= 300 ? "FAILED" : "SUCCEEDED";

    await uploadSubscribeResult({
      webhookName,
      status,
      logs,
      unsubscribeProps,
    });
  }
}
