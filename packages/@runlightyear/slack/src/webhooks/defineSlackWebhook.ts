import {
  defineWebhook,
  SubscribePropsFuncProps,
} from "@runlightyear/lightyear";
import { Slack } from "../Slack";
import { EventType } from "../types/EventType";
import { MessageEventSubtype } from "../types/MessageEventSubtype";

export type SlackWebhookSubscribeProps = {
  /**
   * ID of the channel to receive events from.
   *
   * One place to find this is to right-mouse-click on the channel and select `View channel details`. You should see the Channel ID and it should look something like this: `C03KYBE0WRD`
   *
   * Note: the Lightyear bot must be joined to the channel in order to receive events. If you are not receiving events, double check to make sure the bot is in the channel.
   */
  channel: string;

  /**
   * Slack events to listen for
   *
   * Default: ["message"]
   */
  events?: Array<EventType>;

  /**
   * Slack message subevents to listen for
   *
   * Default: []
   */
  subevents?: Array<MessageEventSubtype>;

  /**
   * Receive bot events.
   *
   * Default: false
   */
  botEvents?: boolean;
};

export type SlackWebhookSubscribePropsFunc = (
  props: SubscribePropsFuncProps
) => SlackWebhookSubscribeProps;

export interface DefineSlackWebhookProps {
  name: string;
  title: string;
  variables?: Array<string>;
  secrets?: Array<string>;
  subscribeProps: SlackWebhookSubscribePropsFunc;
}

export const defineSlackWebhook = (props: DefineSlackWebhookProps) => {
  console.log("in defineSlackWebhook", props);
  const { name, title, variables, secrets, subscribeProps } = props;

  return defineWebhook({
    name,
    title,
    apps: ["slack"],
    variables,
    secrets,
    subscribeProps,
    subscribe: async ({ auths, subscribeProps }) => {
      const slack = new Slack({ auth: auths.slack });

      await slack.joinConversation({ channel: subscribeProps.channel });

      console.info("Joined channel", subscribeProps.channel);

      return { channel: subscribeProps.channel };
    },
    unsubscribe: async ({ auths, unsubscribeProps }) => {
      const slack = new Slack({ auth: auths.slack });

      await slack.leaveConversation({ channel: unsubscribeProps.channel });

      console.info("Left channel", unsubscribeProps.channel);
    },
  });
};
