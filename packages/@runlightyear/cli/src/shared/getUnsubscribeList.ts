import fetch from "node-fetch";
import { terminal } from "terminal-kit";
import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";

export default async function getUnsubscribeList() {
  const baseUrl = getBaseUrl();
  const envName = getEnvName();
  const apiKey = getApiKey();

  const response = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/webhooks/unsubscribe-list`,
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
    console.error(
      "Failed to get unsubscribe list: ",
      response.status,
      response.statusText
    );
    console.error(await response.json(), "\n");
    return null;
  }
}
