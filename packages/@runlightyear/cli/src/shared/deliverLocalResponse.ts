import terminalKit from "terminal-kit";
const { terminal } = terminalKit;
import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";

export interface DeliverAuthRequestUrlProps {
  localResponseId: string;
  response: string;
}

export async function deliverLocalResponse(props: DeliverAuthRequestUrlProps) {
  const { localResponseId, response } = props;

  const baseUrl = getBaseUrl();
  const envName = getEnvName();
  const apiKey = getApiKey();

  const deliveryResponse = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/local-responses/${localResponseId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        response,
      }),
    }
  );

  if (deliveryResponse.ok) {
    console.debug("Delivered localResponse");
  } else {
    console.error(
      "Failed to deliver localResponse: ",
      deliveryResponse.status,
      deliveryResponse.statusText
    );
    console.error(JSON.stringify(await deliveryResponse.json(), null, 2));
  }
}
