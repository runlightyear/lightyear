import { program } from "commander";
import fetch from "node-fetch";
import { getApiKey, getBaseUrl } from "@runlightyear/lightyear";

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
      Authorization: `apiKey ${apiKey}`,
    },
  });

  if (!response.ok) {
    program.error("Could not get pusher credentials");
  }

  return await response.json();
}
