import execDeploy from "../../../shared/execDeploy";
import unsubscribe from "../../../shared/unsubscribe";
import subscribe from "../../../shared/subscribe";

export default async function index() {
  console.log("ready to deploy to dev");
  await execDeploy();
  await unsubscribe();
  await subscribe();
}
