import { program } from "commander";
import { getApiKey, getBaseUrl } from "@runlightyear/lightyear";
import { parseJsonResponse } from "./parseJsonResponse";

export interface PusherCredentials {
  pusherKey: string;
  pusherCluster: string;
  userId: string;
  devEnvId: string;
  prodEnvId: string;
}

export default async function getPusherCredentials(): Promise<PusherCredentials> {
  const baseUrl = getBaseUrl();

  const apiKey = getApiKey();
  if (!apiKey) {
    program.error("Missing LIGHTYEAR_API_KEY env variable");
  }

  const response = await fetch(`${baseUrl}/api/v1/realtime/credentials`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    // parseJsonResponse will show detailed error information
    await parseJsonResponse(response, {
      operationName: "get pusher credentials",
      showResponsePreview: true,
    }).catch(() => {}); // Ignore parsing errors, we'll error out anyway

    program.error(
      `Could not get pusher credentials (HTTP ${response.status})`,
      {
        exitCode: 1,
      }
    );
  }

  return await parseJsonResponse(response, {
    operationName: "get pusher credentials",
    showResponsePreview: false,
  });
}
