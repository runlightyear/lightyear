import execDeploy from "../../../shared/execDeploy";
import execUnsubscribeAfterDeploy from "../../../shared/execUnsubscribeAfterDeploy";
import execSubscribeAfterDeploy from "../../../shared/execSubscribeAfterDeploy";

export default async function index() {
  console.log("ready to deploy to dev");
  await execDeploy();
  await execUnsubscribeAfterDeploy();
  await execSubscribeAfterDeploy();
}
