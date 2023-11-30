import { randomInt } from "crypto";
import {
  defineWebhook,
  SubscribeFunc,
  SubscribePropsFuncProps,
  UnsubscribeFunc,
  RefreshSubscriptionFunc,
  VariableDef,
  SecretDef,
  AppName,
  dayjsUtc,
  setSubscriptionExpiresAt,
  setSecret,
} from "@runlightyear/lightyear";
import { GoogleCalendar } from "../GoogleCalendar";
import { ReceiveWebhookFunc } from "@runlightyear/lightyear/src/base/webhook";

export interface DefineEventsWebhookSubscribeProps {
  /**
   * Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  calendarId: "primary" | string;
}

export type DefineEventsWebhookSubscribePropsFunc = (
  props: SubscribePropsFuncProps
) => DefineEventsWebhookSubscribeProps;

export interface DefineEventsWebhookProps {
  name: string;
  title: string;
  apps?: Array<AppName>;
  customApps?: Array<string>;
  variables?: Array<VariableDef>;
  secrets?: Array<SecretDef>;
  subscribeProps: DefineEventsWebhookSubscribePropsFunc;
}

export const defineEventsWebhook = (props: DefineEventsWebhookProps) => {
  const { name, title, variables, secrets, subscribeProps } = props;

  return defineWebhook({
    name,
    title,
    apps: ["gcal"],
    variables,
    secrets,
    subscribeProps,
    subscribe,
    unsubscribe,
    refreshSubscription,
  });
};

const subscribe: SubscribeFunc = async ({
  auths,
  endpoint,
  subscribeProps,
}) => {
  console.debug("Subscribe to Google Calendar events");
  console.debug("subscribeProps", subscribeProps);

  const gcal = new GoogleCalendar({ auth: auths.gcal });

  const id = String(randomInt(100000000));

  const token = "1234";
  await setSecret("token", token);

  const response = await gcal.watchEvents({
    calendarId: subscribeProps.calendarId,
    id,
    type: "webhook",
    address: endpoint,
    token,
  });

  const unsubscribeProps = {
    id,
    resourceId: response.data.resourceId,
  };

  console.info("Subscribed to Google Calendar event notifications");
  if (response.data.expiration) {
    const expiresAt = dayjsUtc(
      parseInt(response.data.expiration)
    ).toISOString();
    console.info(`Will auto-refresh before ${expiresAt}`);
    await setSubscriptionExpiresAt(expiresAt);
  }

  console.debug("unsubscribeProps", unsubscribeProps);

  return unsubscribeProps;
};

const receive: ReceiveWebhookFunc = async ({ delivery, secrets }) => {
  console.debug("Verifying Google Calendar event notification");

  const { token } = secrets;

  if (delivery.data.token === token) {
    return {
      response: {
        statusCode: 200,
      },
      triggerActions: true,
    };
  }

  return {
    response: {
      statusCode: 401,
    },
    triggerActions: false,
  };
};

const unsubscribe: UnsubscribeFunc = async ({ auths, unsubscribeProps }) => {
  const gcal = new GoogleCalendar({ auth: auths.gcal });

  await gcal.stopChannel({
    id: unsubscribeProps.id,
    resourceId: unsubscribeProps.resourceId,
  });

  console.info("Unsubscribed from Google Calendar event notifications");
};

const refreshSubscription: RefreshSubscriptionFunc = async (props) => {
  await unsubscribe(props);
  return await subscribe(props);
};
