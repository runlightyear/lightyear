import { randomInt } from "crypto";
import {
  defineWebhook,
  SubscribePropsFuncProps,
} from "@runlightyear/lightyear";
import { GoogleCalendar } from "../GoogleCalendar";

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
  variables?: Array<string>;
  secrets?: Array<string>;
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
    subscribe: async ({ auths, endpoint, subscribeProps }) => {
      console.debug("Subscribe to Google Calendar events");
      console.debug("subscribeProps", subscribeProps);

      const gcal = new GoogleCalendar({ auth: auths.gcal });

      const id = String(randomInt(100000000));

      const response = await gcal.watchEvents({
        calendarId: subscribeProps.calendarId,
        id,
        type: "webhook",
        address: endpoint,
      });

      const unsubscribeProps = {
        id,
        resourceId: response.data.resourceId,
      };

      console.log("unsubscribeProps", unsubscribeProps);

      return unsubscribeProps;
    },
    unsubscribe: async ({ auths, unsubscribeProps }) => {
      const gcal = new GoogleCalendar({ auth: auths.gcal });

      await gcal.stopChannel({
        id: unsubscribeProps.id,
        resourceId: unsubscribeProps.resourceId,
      });

      console.info("Unsubscribed from Google Calendar event notifications");
    },
  });
};
