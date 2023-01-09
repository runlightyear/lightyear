import fetch from "node-fetch";
import { terminal } from "terminal-kit";

export default async function getSubscribeList() {
  const baseUrl = process.env.BASE_URL;
  const envName = process.env.ENV_NAME;
  const apiKey = process.env.API_KEY;

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
    terminal.red("Error retrieving subscribe list\n");
    return null;
  }
}
