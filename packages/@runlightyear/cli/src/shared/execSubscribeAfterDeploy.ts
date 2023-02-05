import getSubscribeList from "./getSubscribeList";
import execSubscribe from "./execSubscribe";
import updateDeploy from "./updateDeploy";

export interface ExecSubscribeAfterDeployProps {
  deployId: string;
  compiledCode: Buffer;
}

export default async function execSubscribeAfterDeploy(
  props: ExecSubscribeAfterDeployProps
) {
  const { deployId, compiledCode } = props;

  const subscribeList = await getSubscribeList();

  for (const webhookName of [
    ...subscribeList.created,
    ...subscribeList.changed,
  ]) {
    let message;

    message = `Subscribing ${webhookName}`;
    console.debug(message);
    await updateDeploy({
      deployId,
      logs: [`[DEBUG]: ${message}`],
    });

    const status = await execSubscribe({ webhookName, compiledCode, deployId });

    if (status === "SUCCEEDED") {
      message = `Subscribe for ${webhookName} succeeded`;
      console.info(message);
      await updateDeploy({
        deployId,
        logs: [`[INFO]: ${message}`],
      });
    } else {
      message = `Subscribe for ${webhookName} failed`;
      console.error(message);
      await updateDeploy({
        deployId,
        logs: [`[ERROR]: ${message}`],
      });
    }
  }

  if (subscribeList.skipped && subscribeList.skipped.length > 0) {
    const message =
      "Skipping subscribe for webhooks that need configuration: " +
      subscribeList.skipped.join(", ");

    console.info(message);
    await updateDeploy({
      deployId,
      logs: [`[INFO]: ${message}`],
    });
  }
}
