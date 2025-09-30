import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";
import { program } from "commander";
import { terminal } from "terminal-kit";
import { parseJsonResponse } from "./parseJsonResponse";

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
        Authorization: `Bearer ${apiKey}`,
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
    const json = await parseJsonResponse(response, {
      operationName: "create deploy",
      showResponsePreview: false,
    });
    if (!json.id) {
      throw new Error("Missing deploy id");
    }
    return json.id as string;
  } else {
    // For error responses, we want to show more details
    const json = await parseJsonResponse(response, {
      operationName: "create deploy",
      showResponsePreview: true,
    }).catch(() => null); // If JSON parsing fails, continue with null

    if (response.status === 403) {
      if (json?.message) {
        console.error(json.message);
      }
      terminal.red("Deploy failed 💥\n");
      program.error("Deploy forbidden", { exitCode: 1 });
    }

    console.error(
      "Failed to create deploy",
      response.status,
      response.statusText
    );
    if (json) {
      console.error(json);
    }
    throw new Error("Failed to create deploy");
  }
}
