import getUnsubscribeList from "./getUnsubscribeList";
import getPreviouslyDeployedCode from "./getPreviouslyDeployedCode";
import execUnsubscribe from "./execUnsubscribe";
import updateDeploy from "./updateDeploy";

export interface ExecUnsubscribeAfterDeployProps {
  deployId: string;
  compiledCode: Buffer | null;
}

export default async function execUnsubscribeAfterDeploy(
  props: ExecUnsubscribeAfterDeployProps
) {
  const { deployId, compiledCode } = props;

  if (!compiledCode) {
    console.debug("No previous code found, skipping unsubscribe step");
    return;
  }

  const unsubscribeList = await getUnsubscribeList();

  const doTheUnsubscribe = async (webhookName: string, removed: boolean) => {
    await execUnsubscribe({ webhookName, compiledCode, removed });

    const message = `unsubscribed ${webhookName}`;

    console.info(message);
    await updateDeploy({
      deployId,
      logs: [`[INFO]: ${message}`],
    });
  };

  for (const webhookName of unsubscribeList.removed) {
    await doTheUnsubscribe(webhookName, true);
  }

  for (const webhookName of unsubscribeList.changed) {
    await doTheUnsubscribe(webhookName, false);
  }

  if (unsubscribeList.skipped && unsubscribeList.skipped.length > 0) {
    const message =
      "Skipping unsubscribe for webhooks that need configuration: " +
      unsubscribeList.skipped.join(", ");

    console.info(message);
    await updateDeploy({
      deployId,
      logs: [`[INFO]: ${message}`],
    });
  }

  return null;
}
