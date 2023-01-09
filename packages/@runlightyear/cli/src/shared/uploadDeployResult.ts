import fetch from "node-fetch";
import { terminal } from "terminal-kit";

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
    terminal("Exception thrown ", error, "\n");
    return;
  }

  if (response.ok) {
  } else {
    terminal.red(
      "Failed to upload deploy result",
      response.status,
      response.statusText,
      "\n"
    );
    terminal.red(await response.json(), "\n");
  }
}
