import getUnsubscribeList from "./getUnsubscribeList";
import runInContext from "./runInContext";
import getPreviouslyDeployedCode from "./getPreviouslyDeployedCode";

export default async function unsubscribe() {
  const compiledCodeStr = await getPreviouslyDeployedCode();
  if (compiledCodeStr) {
    const compiledCode = Buffer.from(compiledCodeStr, "utf-8");
    // const compiledCode = compiledCodeStr;
    // run in context
    const handler = runInContext(compiledCode);

    const unsubscribeList = await getUnsubscribeList();

    console.log("unsubscribeList", unsubscribeList);

    for (const subscriptionName of unsubscribeList.removed) {
      const handlerResult = await handler({
        action: "unsubscribe",
        subscriptionName,
        removed: true,
      });
    }

    for (const subscriptionName of unsubscribeList.changed) {
      const handlerResult = await handler({
        action: "unsubscribe",
        subscriptionName,
        removed: false,
      });
    }

    // return handlerResult;
  }

  return null;
}
