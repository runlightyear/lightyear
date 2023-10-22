import requestDeploy from "./requestDeploy";
import tarSourceCode from "./tarSourceCode";
import getFileList from "./getFileList";
import deleteTgz from "./deleteTgz";
import waitUntilDeployFinishes from "./waitUntilDeployFinishes";
import createDeploy from "../../../shared/createDeploy";
import readPackage from "../../../shared/readPackage";
import getCompiledCode from "../../../shared/getCompiledCode";
import execa from "execa";

export default async function deployToProd() {
  console.info("Deploying to prod");

  // const fileList = await getFileList();
  // await tarSourceCode(fileList);
  // const { deployId } = await requestDeploy("prod");
  // await deleteTgz();

  try {
    await execa("npm", ["run", "build"]);
    console.info("Successful build");
  } catch (error) {
    console.log(error);
    throw error;
  }

  const pkg = readPackage();
  const compiledCode = getCompiledCode(pkg.main);

  const deployId = await createDeploy({
    envName: "prod",
    status: "QUEUED",
    compiledCode,
  });

  console.debug("deployId", deployId);

  await waitUntilDeployFinishes(deployId);
}
