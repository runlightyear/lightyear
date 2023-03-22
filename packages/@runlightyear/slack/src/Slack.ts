import {
  RestConnector,
  AuthConnectorProps,
  HttpProxyRequestProps,
  HttpProxyResponse,
} from "@runlightyear/lightyear";
import postMessage, { PostMessageProps } from "./chat/postMessage";
import section from "./elements/blocks/section";
import plainText from "./elements/objects/plainText";
import markdownText from "./elements/objects/markdownText";
import actions from "./elements/blocks/actions";
import context from "./elements/blocks/context";
import divider from "./elements/blocks/divider";
import file from "./elements/blocks/file";
import header from "./elements/blocks/header";
import image from "./elements/blocks/image";
import video from "./elements/blocks/video";
import confirmationDialog from "./elements/objects/confirmationDialog";
import { SlackScope } from "./types/SlackScope";
import { scheduleMessage, ScheduleMessageProps } from "./chat/scheduleMessage";
import {
  createConversation,
  CreateConversationProps,
} from "./conversations/createConversation";
import {
  inviteToConversation,
  InviteToConversationProps,
} from "./conversations/inviteToConversation";
import {
  lookupUserByEmail,
  LookupUserByEmailProps,
} from "./users/lookupUserByEmail";
import { getUser, GetUserProps } from "./users/getUser";
import {
  leaveConversation,
  LeaveConversationProps,
} from "./conversations/leaveConversation";
import {
  joinConversation,
  JoinConversationProps,
} from "./conversations/joinConversation";
import {
  defineSlackWebhook,
  DefineSlackWebhookProps,
} from "./webhooks/defineSlackWebhook";

/**
 * Connector to the Slack API
 *
 * @example Import
 * ```typescript
 * import { Slack } from "@runlightyear/slack";
 * ```
 *
 * @example Use in an action
 * ```typescript
 * defineAction({
 *   name: "slackExample",
 *   title: "Slack Example",
 *   apps: ["slack"],
 *   run: ({ auths }) => {
 *     const slack = new Slack({ auth: auths.slack });
 *   }
 * })
 * ```
 *
 * @example Post a message
 *
 * ```typescript
 * await slack.postMessage({ channel: '#general', text: 'Hello Slack'})
 * ```
 */
export class Slack extends RestConnector {
  /**
   * Create a new slack connector
   *
   * @example
   * ```typescript
   * defineAction({
   *   name: "slackExample",
   *   title: "Slack Example",
   *   apps: ["slack"],
   *   run: ({ auths }) => {
   *     const slack = new Slack({ auth: auths.slack });
   *   }
   * })
   * ```
   *
   * @param props
   */
  constructor(props: AuthConnectorProps) {
    super({ ...props, baseUrl: "https://slack.com/api/" });
  }

  /**
   * @internal
   */
  authorizationHeaders(): { [p: string]: string } {
    const { accessToken } = this.getAuthData();

    return {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
  }

  /**
   * @internal
   */
  async request(props: HttpProxyRequestProps): Promise<HttpProxyResponse> {
    const response = await super.request(props);
    let data = response.data;

    if (!data.ok && data.error === "token_expired") {
      await this.refreshToken();
      const responseAfterRefresh = await super.request(props);
      data = responseAfterRefresh.data;
    }

    if (!data.ok) {
      throw new Error(data.error);
    }
    return response;
  }

  /**
   * Sends a message to a channel
   *
   * @group Chat
   *
   * @example Basic hello world as text
   *
   * ```typescript
   * slack.postMessage({ channel: "#general", text: "hello world" });
   * ```
   *
   * @example Use blocks to structure display
   *
   * ```typescript
   * slack.postMessage({
   *   channel: "#general",
   *   blocks: [
   *     Slack.blocks.section("Title section"),
   *     Slack.blocks.section({
   *       fields: [
   *         Slack.objects.markdownText("*Data 1*\nvalue A"),
   *         Slack.objects.markdownText("*Data 2*\nvalue B"),
   *       ]
   *     }),
   *   ],
   *   text: "Use text as a fallback for notifications that can't display blocks",
   * })
   * ```
   *
   * @param props
   */
  async postMessage(props: PostMessageProps): Promise<HttpProxyResponse> {
    return postMessage(this)(props);
  }

  /**
   * Schedules a message to be sent to a channel.
   *
   * This method schedules a message for delivery to a public channel, private channel, or direct message/IM channel at a specified time in the future.
   *
   * The post_at argument is a Unix timestamp, representing the time the message should post to Slack in the future.
   *
   * Think of chat.scheduleMessage and chat.postMessage as two siblings in the Slack family. They share a lot of similarities, like their ability to send messages and include various features like attachments and emojis. But just like siblings, they also have their differences.
   *
   * The usage of the text field changes depending on whether you're using blocks. If you are using blocks, this is used as a fallback string to display in notifications. If you aren't, this is the main body text of the message. It can be formatted as plain text, or with mrkdwn.
   *
   * Restrictions
   * You will only be able to schedule a message up to 120 days into the future. If you specify a post_at timestamp beyond this limit, you’ll receive a time_too_far error response. Additionally, you cannot schedule more than 30 messages to post within a 5-minute window to the same channel. Exceeding this will result in a restricted_too_many error.
   *
   * The response includes the scheduled_message_id assigned to your message. Use it with the chat.deleteScheduledMessage method to delete the message before it is sent.
   *
   * For details on formatting, usage in threads, and rate limiting, check out chat.postMessage documentation.
   *
   * Channels
   * You must specify a public channel, private channel, or IM channel with the channel argument. Each one behaves slightly differently based on the authenticated user's permissions and additional arguments:
   *
   * Post to a channel
   * You can either pass the channel's name (#general) or encoded ID (C123456), and the message will be posted to that channel. The channel's ID can be retrieved through the channels.list API method.
   *
   * Post to a DM
   * Pass the IM channel's ID (D123456) or a user's ID (U123456) as the value of channel to post to that IM channel as the app. The IM channel's ID can be retrieved through the im.list API method.
   *
   * You might receive a channel_not_found error if your app doesn't have permission to enter into an IM with the intended user.
   */
  async scheduleMessage(props: ScheduleMessageProps) {
    return scheduleMessage(this)(props);
  }

  /**
   * Initiates a public or private channel-based conversation
   *
   * @group Conversations
   *
   * @example Create a new conversation
   *
   * ```typescript
   * await slack.createConversation({ name: "newchannel" });
   * ```
   */
  async createConversation(props: CreateConversationProps) {
    return createConversation(this)(props);
  }

  /**
   * Invites users to a channel.
   *
   * @group Conversations
   *
   * @param props
   */
  async inviteToConversation(props: InviteToConversationProps) {
    return inviteToConversation(this)(props);
  }

  /**
   * Join an existing conversation
   *
   * @group Conversations
   */
  async joinConversation(props: JoinConversationProps) {
    return joinConversation(this)(props);
  }

  /**
   * Leave a conversation
   *
   * @group Conversations
   */
  async leaveConversation(props: LeaveConversationProps) {
    return leaveConversation(this)(props);
  }

  /**
   * Gets information about a user.
   *
   * @group Users
   *
   * @param props
   */
  async getUser(props: GetUserProps) {
    return getUser(this)(props);
  }

  /**
   * Find a user with an email address.
   *
   * @group Users
   *
   * @param props
   */
  async lookupUserByEmail(props: LookupUserByEmailProps) {
    return lookupUserByEmail(this)(props);
  }

  static blocks = {
    actions: actions,
    context: context,
    divider: divider,
    file: file,
    header: header,
    image: image,
    section: section,
    video: video,
  };

  static objects = {
    plainText: plainText,
    markdownText: markdownText,
    confirmationDialog: confirmationDialog,
  };

  /**
   * Define a Slack webhook
   *
   * @group Webhooks
   *
   * @example Subscribe to events on a channel
   * ```typescript
   * Slack.defineWebhook({
   *   name: "slackEventsOnGeneral",
   *   title: "Slack Events on General",
   *   subscribeProps: () => {
   *     return {
   *       channel: "#general",
   *       events: ["message"],
   *     }
   *   }
   * });
   * ```
   */
  static defineWebhook(props: DefineSlackWebhookProps) {
    return defineSlackWebhook(props);
  }
}
