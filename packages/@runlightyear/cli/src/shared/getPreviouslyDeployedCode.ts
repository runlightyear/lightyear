import fetch from "node-fetch";

export default async function getPreviouslyDeployedCode() {
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
    return data.compiledCode;
  } else {
    console.log("Previous deploy not found");
    return null;
  }
}
