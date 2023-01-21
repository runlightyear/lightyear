import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
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
    await execSubscribe({ webhookName, compiledCode });

    const message = `subscribed ${webhookName}`;

    console.info(message);
    await updateDeploy({
      deployId,
      logs: [`[INFO]: ${message}`],
    });
  }

  if (subscribeList.skipped && subscribeList.skipped.length > 0) {
    const message =
      "Skipping subscribe for webhooks that need configuration:" +
      subscribeList.skipped.join(", ");

    console.info(message);
    await updateDeploy({
      deployId,
      logs: [`[INFO]: ${message}`],
    });
  }
}
