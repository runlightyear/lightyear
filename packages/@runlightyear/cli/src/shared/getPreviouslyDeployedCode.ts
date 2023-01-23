import fetch from "node-fetch";

export default async function getPreviouslyDeployedCode(): Promise<Buffer | null> {
  const baseUrl = process.env.BASE_URL;
  const envName = process.env.ENV_NAME;
  const apiKey = process.env.API_KEY;

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
