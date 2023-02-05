import getUnsubscribeList from "./getUnsubscribeList";
import execUnsubscribe from "./execUnsubscribe";
import updateDeploy from "./updateDeploy";

export interface ExecUnsubscribeAfterDeployProps {
  deployId: string;
}

export default async function execUnsubscribeAfterDeploy(
  props: ExecUnsubscribeAfterDeployProps
) {
  const { deployId } = props;

  const unsubscribeList = await getUnsubscribeList();

  const doTheUnsubscribe = async (webhookName: string, removed: boolean) => {
    let message, level;

    try {
      await execUnsubscribe({ webhookName, removed });
      message = `Unsubscribed ${webhookName}`;
      level = "INFO";
    } catch (err) {
      message = `Problem unsubscribing ${webhookName}: ${err}`;
      level = "WARN";
    }

    if (level === "INFO") {
      console.info(message);
    } else if (level === "WARN") {
      console.warn(message);
    }
    await updateDeploy({
      deployId,
      logs: [`[${level}]: ${message}`],
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
