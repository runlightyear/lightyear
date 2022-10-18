import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
import runInContext from "./runInContext";
import getSubscribeList from "./getSubscribeList";

export default async function subscribe() {
  const pkg = readPackage();

  const compiledCode = getCompiledCode(pkg.main);
  // run in context
  const handler = runInContext(compiledCode);

  const subscribeList = await getSubscribeList();

  console.log("subscribeList", subscribeList);

  for (const subscriptionName of subscribeList.created) {
    const handlerResult = await handler({
      action: "subscribe",
      subscriptionName,
    });
  }

  for (const subscriptionName of subscribeList.changed) {
    const handlerResult = await handler({
      action: "subscribe",
      subscriptionName,
    });
  }

  // return handlerResult;

  return null;
}
