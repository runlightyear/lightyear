import {
  defineWebhook,
  SecretDef,
  SubscribePropsFuncProps,
  VariableDef,
} from "@runlightyear/lightyear";
import { Slack } from "../Slack";
import { EventType } from "../types/EventType";
import { MessageEventSubtype } from "../types/MessageEventSubtype";
import { SlackAppWebhook } from "../SlackAppWebhook";

export interface SlackWebhookSubscribeMessageProps {
  event: "message";
  channelId: string;
}

export interface SlackWebhookSubscribeOtherProps {
  event: Omit<EventType, "message">;
}

export type SlackWebhookSubscribeProps =
  | SlackWebhookSubscribeMessageProps
  | SlackWebhookSubscribeOtherProps;

// export type SlackWebhookSubscribeProps = {
//   /**
//    * ID of the channel to receive events from.
//    *
//    * One place to find this is to right-mouse-click on the channel and select `View channel details`. You should see the Channel ID and it should look something like this: `C03KYBE0WRD`
//    *
//    * Note: the Lightyear bot must be joined to the channel in order to receive events. If you are not receiving events, double check to make sure the bot is in the channel.
//    */
//   channelId?: string;
//
//   /**
//    * Slack events to listen for
//    */
//   event: EventType;
//
//   /**
//    * Slack message subevents to listen for
//    *
//    * Default: undefined
//    */
//   subevent?: MessageEventSubtype;
//
//   /**
//    * Receive bot events.
//    *
//    * Default: false
//    */
//   botEvents?: boolean;
// };

export type SlackWebhookSubscribePropsFunc = (
  props: SubscribePropsFuncProps
) => SlackWebhookSubscribeProps;

export interface DefineSlackWebhookProps {
  name: string;
  title: string;
  slackCustomAppName?: string;
  variables?: Array<VariableDef>;
  secrets?: Array<SecretDef>;
  subscribeProps: SlackWebhookSubscribePropsFunc;
}

const CHANNEL_EVENTS: Array<EventType> = [
  "message",
  "message.channels",
  "message.groups",
  "message.im",
  "message.mpim",
];

export const defineSlackWebhook = (props: DefineSlackWebhookProps) => {
  const {
    name,
    title,
    slackCustomAppName,
    variables,
    secrets,
    subscribeProps,
  } = props;

  return defineWebhook({
    name,
    title,
    apps: !slackCustomAppName ? ["slack"] : undefined,
    customApps: slackCustomAppName ? [slackCustomAppName] : undefined,
    variables,
    secrets,
    subscribeProps,
    subscribe: async ({ auths, subscribeProps }) => {
      const slackAuth = auths[slackCustomAppName || "slack"];

      const slack = new Slack({ auth: slackAuth });
      const slackAppWebhook = new SlackAppWebhook({
        auth: slackAuth,
      });

      await slackAppWebhook.subscribe({
        event: subscribeProps.event,
        channelId: subscribeProps.channelId,
      });

      if (CHANNEL_EVENTS.includes(subscribeProps.event)) {
        if (!subscribeProps.channelId) {
          throw new Error("channelId is required for channel events");
        }
        await slack.joinConversation({ channel: subscribeProps.channelId });

        console.info("Joined channel", subscribeProps.channelId);
      }

      return {
        event: subscribeProps.event,
        channelId: subscribeProps.channelId,
      };
    },
    unsubscribe: async ({ auths, unsubscribeProps }) => {
      const slackAuth = auths[slackCustomAppName || "slack"];

      const slack = new Slack({ auth: slackAuth });
      const slackAppWebhook = new SlackAppWebhook({ auth: slackAuth });

      if (CHANNEL_EVENTS.includes(unsubscribeProps.event)) {
        await slack.leaveConversation({ channel: unsubscribeProps.channelId });

        console.info("Left channel", unsubscribeProps.channelId);
      }

      await slackAppWebhook.unsubscribe();
    },
  });
};
