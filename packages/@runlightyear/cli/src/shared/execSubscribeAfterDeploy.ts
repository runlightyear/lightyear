import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
import getSubscribeList from "./getSubscribeList";
import execSubscribe from "./execSubscribe";

export default async function execSubscribeAfterDeploy() {
  const pkg = readPackage();
  const compiledCode = getCompiledCode(pkg.main);

  const subscribeList = await getSubscribeList();

  for (const webhookName of [
    ...subscribeList.created,
    ...subscribeList.changed,
  ]) {
    await execSubscribe({ webhookName, compiledCode });
  }

  if (subscribeList.skipped && subscribeList.skipped.length > 0) {
    console.info(
      "Skipping subscribe for webhooks that need configuration:",
      subscribeList.skipped.join(", ")
    );
  }
}
