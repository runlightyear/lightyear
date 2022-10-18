import fetch from "node-fetch";
import fse from "fs-extra";
import { program } from "commander";
import { TEMP_TGZ_FILE } from "./constants";

export default async function requestDeploy(envName: string) {
  const baseUrl = process.env.BASE_URL;
  const apiKey = process.env.API_KEY;

  const tgz = await fse.readFile(TEMP_TGZ_FILE);

  const response = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/deploy/request`,
    {
      method: "POST",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/gzip",
      },
      body: tgz,
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log(`Deploy requested: ${data.deployId}`);
    return data;
  } else {
    program.error("Error requesting deploy");
  }
}
