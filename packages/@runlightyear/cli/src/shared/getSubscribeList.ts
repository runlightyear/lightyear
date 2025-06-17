import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";
import chalk from "chalk";

export default async function getSubscribeList() {
  const baseUrl = getBaseUrl();
  const envName = getEnvName();
  const apiKey = getApiKey();

  const response = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/webhooks/subscribe-list`,
    {
      method: "GET",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    return await response.json();
  } else {
    console.error(chalk.red("Error retrieving subscribe list"));
    return null;
  }
}
