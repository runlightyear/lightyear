import requestDeploy from "./requestDeploy";
import tarSourceCode from "./tarSourceCode";
import getFileList from "./getFileList";
import deleteTgz from "./deleteTgz";
import waitUntilDeployFinishes from "./waitUntilDeployFinishes";

export default async function deployToProd() {
  console.log("Deploying to to prod");

  const fileList = await getFileList();
  await tarSourceCode(fileList);
  const { deployId } = await requestDeploy("prod");
  await deleteTgz();
  await waitUntilDeployFinishes(deployId);
}
