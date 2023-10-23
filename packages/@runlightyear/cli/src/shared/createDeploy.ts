import fetch from "node-fetch";
import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";
import { program } from "commander";

export interface CreateDeployProps {
  envName?: "dev" | "prod";
  status: "QUEUED" | "RUNNING" | "SUCCEEDED" | "FAILED";
  compiledCode: Buffer;
}

export default async function createDeploy(
  props: CreateDeployProps
): Promise<string> {
  const { envName = getEnvName(), status, compiledCode } = props;

  const baseUrl = getBaseUrl();
  const apiKey = getApiKey();

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
        startedAt: "now",
        compiledCode,
      }),
    });
  } catch (error) {
    console.error("Exception thrown ", error);
    throw error;
  }

  if (response.ok) {
    const json = await response.json();
    if (!json.id) {
      throw new Error("Missing deploy id");
    }
    return json.id as string;
  } else {
    const json = await response.json();
    if (response.status === 403) {
      console.error(json.message);
      program.error("", { exitCode: 1 });
    }
    console.error(
      "Failed to create deploy",
      response.status,
      response.statusText
    );
    console.error(await response.json());
    throw new Error("Failed to create deploy");
  }
}
