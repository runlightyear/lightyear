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

  const response = await fetch(`${baseUrl}/api/v1/envs/${envName}/deploys`, {
    method: "POST",
    headers: {
      Authorization: `apiKey ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
      logs,
      // compiledCode: compiledCode.toString("utf-8"),
    }),
  });

  if (response.ok) {
    // terminal("Uploaded deploy result\n");
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
