import fetch from "node-fetch";

export default async function uploadDeployResult({
  status,
  logs,
  compiledCode,
}: {
  status: string;
  logs: any;
  compiledCode: any;
}) {
  const baseUrl = process.env.BASE_URL;
  const envName = process.env.ENV_NAME;
  const apiKey = process.env.API_KEY;

  let response;

  try {
    response = await fetch(`${baseUrl}/api/v1/envs/${envName}/deploys`, {
      method: "POST",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        logs,
        compiledCode: Buffer.from(compiledCode).toString("base64"),
      }),
    });
  } catch (error) {
    console.error("Exception thrown ", error);
    return;
  }

  if (response.ok) {
  } else {
    console.error(
      "Failed to upload deploy result",
      response.status,
      response.statusText
    );
    console.error(await response.json());
  }
}
