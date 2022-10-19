import { program } from "commander";
import { ServerResponse } from "http";
import fetch from "node-fetch";

export default async function fetchApiKey(
  baseUrl: string,
  code: string,
  res: ServerResponse
) {
  try {
    console.log("fetching api key with baseUrl", baseUrl);
    const response = await fetch(`${baseUrl}/api/v1/cli-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const text = await response.text();

    if (response.status !== 200) {
      program.error("Error fetching api key");
    }

    const json = JSON.parse(text);
    const { ENV_NAME, BASE_URL, API_KEY } = json;

    return { ENV_NAME, BASE_URL, API_KEY };
  } catch (error) {
    console.log("error", error);
    res.setHeader("location", `${baseUrl}/prototype/cli-login/failure`);
    res.end();
    program.error("Login failed");
  }
}
