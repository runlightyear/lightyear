import execDeploy from "../../../shared/execDeploy";
import execUnsubscribe from "../../../shared/execUnsubscribe";
import execSubscribe from "../../../shared/execSubscribe";

export default async function index() {
  console.log("ready to deploy to dev");
  await execDeploy();
  await execUnsubscribe();
  await execSubscribe();
}
