import fetch from "node-fetch";

export interface CreateDeployProps {
  compiledCode: Buffer;
}

export default async function createDeploy(
  props: CreateDeployProps
): Promise<string> {
  const { compiledCode } = props;

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
        status: "RUNNING",
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
    console.error(
      "Failed to create deploy",
      response.status,
      response.statusText
    );
    console.error(await response.json());
    throw new Error("Failed to create deploy");
  }
}
