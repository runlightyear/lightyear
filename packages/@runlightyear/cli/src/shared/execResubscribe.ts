import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
import execSubscribeProps from "./execSubscribeProps";
import createDeploy from "./createDeploy";
import execUnsubscribeAfterDeploy from "./execUnsubscribeAfterDeploy";
import execSubscribeAfterDeploy from "./execSubscribeAfterDeploy";
import updateDeploy from "./updateDeploy";
import execUnsubscribe from "./execUnsubscribe";
import execSubscribe from "./execSubscribe";

export interface ExecResubscribeProps {
  webhookName: string;
  manual: boolean;
}

export default async function execResubscribe(props: ExecResubscribeProps) {
  const { webhookName, manual } = props;

  const pkg = readPackage();
  const compiledCode = getCompiledCode(pkg.main);

  console.info("Resubscribing", webhookName);

  if (manual) {
    await execUnsubscribe({ webhookName, compiledCode, removed: false });
    await execSubscribe({ webhookName, compiledCode });
  } else {
    const deployId = await createDeploy({ compiledCode });

    await execSubscribeProps({ deployId, compiledCode });

    await execUnsubscribeAfterDeploy({ deployId, compiledCode });
    await execSubscribeAfterDeploy({ deployId, compiledCode });

    await updateDeploy({
      deployId,
      status: "SUCCEEDED",
    });
  }
}
