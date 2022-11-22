import invariant from "tiny-invariant";
import baseRequest from "./baseRequest";
import { deployList } from "./deploy";

export interface WebhookProps {
  name: string;
}

function validateWebhookProps({ name }: WebhookProps) {
  invariant(name, "Missing required name");
  invariant(typeof name === "string", "Name must be a string");
}

export function defineWebhook(props: WebhookProps) {
  deployList.push({
    type: "webhook",
    // data: props
  });

  return props.name;
}

export async function deployWebhook(envName: string, props: WebhookProps) {
  validateWebhookProps(props);

  const { name } = props;

  const response = await baseRequest({
    uri: `/api/v1/envs/${envName}/webhooks`,
    data: {
      name,
    },
  });

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`deployWebhook failed: ${name}`);
  }

  console.info(`Deployed webhook: ${name}`);
}

export type WebhookData = {
  id: string;
  url: string;
};

export async function getWebhookData(name: string): Promise<WebhookData> {
  const envName = process.env.ENV_NAME;
  invariant(envName, "Missing ENV_NAME");

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/webhooks/${name}/data`,
  });

  const data = <WebhookData>await response.json();

  const { id, url } = data;

  return {
    id,
    url,
  };
}
