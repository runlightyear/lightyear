import { program } from "commander";
import fetch from "node-fetch";

export default async function fetchDeploy(envName: string, deployId: string) {
  const baseUrl = process.env.BASE_URL;
  const apiKey = process.env.API_KEY;

  const response = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/deploy/${deployId}`,
    {
      method: "GET",
      headers: {
        Authorization: `apiKey ${apiKey}`,
      },
    }
  );

  if (response.ok) {
    return await response.json();
  } else {
    program.error("Error fetching deploy");
  }
}
