import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";
import { terminal } from "terminal-kit";

export interface QueuedRunItem {
  id: string;
  actionName: string;
  createdAt: string;
  data?: object;
  deliveryId?: string;
}

export default async function getQueuedRuns(): Promise<Array<QueuedRunItem>> {
  const baseUrl = getBaseUrl();
  const envName = getEnvName();
  const apiKey = getApiKey();

  try {
    const url = `${baseUrl}/api/v1/envs/${envName}/runs?status=QUEUED`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      terminal.red(
        `Failed to retrieve queued runs: ${response.status} ${response.statusText}\n`
      );
      try {
        const text = await response.text();
        console.error(text);
      } catch {}
      return [];
    }

    const items = (await response.json()) as Array<QueuedRunItem>;
    if (!Array.isArray(items)) return [];

    // Sort by creation time ascending to process oldest first
    return items.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching queued runs", error);
    return [];
  }
}
