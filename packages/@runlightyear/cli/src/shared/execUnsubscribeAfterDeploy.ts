import getUnsubscribeList from "./getUnsubscribeList";
import getPreviouslyDeployedCode from "./getPreviouslyDeployedCode";
import execUnsubscribe from "./execUnsubscribe";

export default async function execUnsubscribeAfterDeploy() {
  const compiledCodeStr = await getPreviouslyDeployedCode();

  if (!compiledCodeStr) {
    console.debug("No previous code found, skipping unsubscribe step");
    return;
  }

  const compiledCode = Buffer.from(compiledCodeStr, "base64");

  const unsubscribeList = await getUnsubscribeList();

  const doTheUnsubscribe = async (webhookName: string, removed: boolean) => {
    await execUnsubscribe({ webhookName, compiledCode, removed });
  };

  for (const webhookName of unsubscribeList.removed) {
    await doTheUnsubscribe(webhookName, true);
  }

  for (const webhookName of unsubscribeList.changed) {
    await doTheUnsubscribe(webhookName, false);
  }

  if (unsubscribeList.skipped && unsubscribeList.skipped.length > 0) {
    console.info(
      "Skipping unsubscribe for webhooks that need configuration:",
      unsubscribeList.skipped.join(", ")
    );
  }

  return null;
}
