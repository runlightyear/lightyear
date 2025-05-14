import { terminal } from "terminal-kit";
import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";

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
    console.error("Error retrieving subscribe list\n");
    return null;
  }
}
