import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";

export interface UpdateDeployProps {
  deployId: string;
  status?: string;
  endedAt?: "now";
  logs?: any;
  compiledCode?: any;
}

export default async function updateDeploy(props: UpdateDeployProps) {
  const { deployId, status, endedAt, logs, compiledCode } = props;

  const baseUrl = getBaseUrl();
  const envName = getEnvName();
  const apiKey = getApiKey();

  let response;

  try {
    response = await fetch(
      `${baseUrl}/api/v1/envs/${envName}/deploys/${deployId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `apiKey ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          endedAt,
          logs,
          compiledCode:
            compiledCode && Buffer.from(compiledCode).toString("base64"),
        }),
      }
    );
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
