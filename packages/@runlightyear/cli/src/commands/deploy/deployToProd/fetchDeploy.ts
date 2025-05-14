import { program } from "commander";
import { getApiKey, getBaseUrl } from "@runlightyear/lightyear";

export default async function fetchDeploy(envName: string, deployId: string) {
  const baseUrl = getBaseUrl();
  const apiKey = getApiKey();

  const response = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/deploys/${deployId}`,
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
