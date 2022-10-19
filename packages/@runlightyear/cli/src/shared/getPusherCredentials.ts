import { program } from "commander";
import fetch from "node-fetch";

export interface PusherCredentials {
  pusherKey: string;
  pusherCluster: string;
  userId: string;
}

export default async function getPusherCredentials(): Promise<PusherCredentials> {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    program.error("Missing BASE_URL env variable");
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    program.error("Missing API_KEY env variable");
  }

  const response = await fetch(`${baseUrl}/api/v1/realtime/credentials`, {
    headers: {
      Authorization: `apiKey ${apiKey}`,
    },
  });

  return await response.json();
}
