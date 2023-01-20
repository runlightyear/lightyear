import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
import execSubscribe from "./execSubscribe";
import execUnsubscribe from "./execUnsubscribe";

export interface ExecResubscribeProps {
  webhookName: string;
}

export default async function execResubscribe(props: ExecResubscribeProps) {
  const { webhookName } = props;

  const pkg = readPackage();
  const compiledCode = getCompiledCode(pkg.main);

  console.info("Resubscribing", webhookName);

  await execUnsubscribe({ webhookName, compiledCode, removed: false });
  await execSubscribe({ webhookName, compiledCode });
}
