import {
  defineWebhook,
  SecretDef,
  setSecret,
  setSubscriptionExpiresAt,
  SubscribePropsFuncProps,
  VariableDef,
} from "@runlightyear/lightyear";
import { Airtable } from "../Airtable";
import { WebhookSpecification } from "../types/WebhookSpecification";

export interface AirtableWebhookSubscribeProps {
  baseId: string;
  specification: WebhookSpecification;
}

export type AirtableWebhookSubscribePropsFunc = (
  props: SubscribePropsFuncProps
) => AirtableWebhookSubscribeProps;

export interface DefineAirtableWebhookProps {
  name: string;
  title: string;
  variables?: Array<VariableDef>;
  secrets?: Array<SecretDef>;
  subscribeProps: AirtableWebhookSubscribePropsFunc;
}

export const defineAirtableWebhook = (props: DefineAirtableWebhookProps) => {
  const { name, title, variables = [], secrets = [], subscribeProps } = props;

  console.debug("in defineAirtableWebhook", props);

  return defineWebhook({
    name,
    title,
    apps: ["airtable"],
    variables,
    secrets: [...secrets, "macSecretBase64?"],
    subscribeProps,
    subscribe: async ({ auths, endpoint, subscribeProps }) => {
      console.debug("Subscribing to Airtable webhook");
      console.debug("subscribeProps", subscribeProps);

      const airtable = new Airtable({ auth: auths.airtable });

      console.debug("in defineAirtableWebhook");

      const response = await airtable.createWebhook({
        baseId: subscribeProps.baseId,
        notificationUrl: endpoint,
        specification: subscribeProps.specification,
      });

      console.debug("response", response);

      await setSecret("macSecretBase64", response.data.macSecretBase64);
      await setSubscriptionExpiresAt(response.data.expirationTime ?? null);

      console.info("Subscribed to Airtable webhook");

      return {
        baseId: subscribeProps.baseId,
        webhookId: response.data.id,
      };
    },
    unsubscribe: async ({ auths, unsubscribeProps }) => {
      console.debug("Unsubscribing from Airtable webhook");
      console.debug("unsubscribeProps", unsubscribeProps);

      const airtable = new Airtable({ auth: auths.airtable });

      console.debug("in defineAirtableWebhook");

      const response = await airtable.deleteWebhook({
        baseId: unsubscribeProps.baseId,
        webhookId: unsubscribeProps.webhookId,
      });

      console.info("Unsubscribed from Airtable webhook");
    },
    refreshSubscription: async ({ auths, unsubscribeProps }) => {
      const airtable = new Airtable({ auth: auths.airtable });

      const response = await airtable.refreshWebhook({
        baseId: unsubscribeProps.baseId,
        webhookId: unsubscribeProps.webhookId,
      });
      console.info("Refreshed Airtable webhook subscription");

      const { expirationTime } = response.data;
      await setSubscriptionExpiresAt(expirationTime);
      console.info("Expires at", expirationTime);

      return unsubscribeProps;
    },
  });
};
