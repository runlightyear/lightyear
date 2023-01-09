import fetch from "node-fetch";
import { terminal } from "terminal-kit";

export default async function getUnsubscribeList() {
  const baseUrl = process.env.BASE_URL;
  const envName = process.env.ENV_NAME;
  const apiKey = process.env.API_KEY;

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
    terminal.red(
      "Failed to get unsubscribe list: ",
      response.status,
      " ",
      response.statusText,
      "\n"
    );
    terminal.red(await response.json(), "\n");
    return null;
  }
}
