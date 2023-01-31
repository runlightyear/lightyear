import fetch from "node-fetch";
import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";

export default async function getPreviouslyDeployedCode(): Promise<Buffer | null> {
  const baseUrl = getBaseUrl();
  const envName = getEnvName();
  const apiKey = getApiKey();

  const response = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/deploys/previous-code`,
    {
      method: "GET",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    if (!data.compiledCode) {
      throw new Error("Missing compiledCode");
    }
    return Buffer.from(data.compiledCode, "base64");
  } else {
    console.log("Previous deploy not found");
    return null;
  }
}
