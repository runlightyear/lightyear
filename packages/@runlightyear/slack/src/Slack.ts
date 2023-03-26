import {
  RestConnector,
  AuthConnectorProps,
  HttpProxyRequestProps,
  HttpProxyResponse,
} from "@runlightyear/lightyear";
import postMessage, { PostMessageProps } from "./chat/postMessage";
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
import { asSlackEvent } from "./webhooks/asSlackEvent";
import { asSlackMessageEvent } from "./webhooks/asSlackMessageEvent";
import { actionsBlock } from "./elements/blocks/actionsBlock";
import { contextBlock } from "./elements/blocks/contextBlock";
import { dividerBlock } from "./elements/blocks/dividerBlock";
import { fileBlock } from "./elements/blocks/fileBlock";
import { headerBlock } from "./elements/blocks/headerBlock";
import { imageBlock } from "./elements/blocks/imageBlock";
import { sectionBlock } from "./elements/blocks/sectionBlock";
import { videoBlock } from "./elements/blocks/videoBlock";
import { plainTextObject } from "./elements/objects/plainTextObject";
import { markdownTextObject } from "./elements/objects/markdownTextObject";
import { confirmationDialogObject } from "./elements/objects/confirmationDialogObject";

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
   * });
   * ```
   *
   * @example Use blocks to structure display - alternate
   *
   * ```typescript
   * import { sectionBlock, markdownTextObject } from "@runlightyear/slack";
   *
   * slack.postMessage({
   *   channel: "#general",
   *   blocks: [
   *     sectionBlock("Title section"),
   *     sectionBlock({
   *       fields: [
   *         markdownTextObject("*Data 1*\nvalue A"),
   *         markdownTextObject("*Data 2*\nvalue B"),
   *       ]
   *     }),
   *   ],
   *   text: "Use text as a fallback for notifications that can't display blocks",
   * });
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
   * @group Chat
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
    actions: actionsBlock,
    context: contextBlock,
    divider: dividerBlock,
    file: fileBlock,
    header: headerBlock,
    image: imageBlock,
    section: sectionBlock,
    video: videoBlock,
  };

  static objects = {
    plainText: plainTextObject,
    markdownText: markdownTextObject,
    confirmationDialog: confirmationDialogObject,
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

  static asEvent(data: unknown) {
    return asSlackEvent(data);
  }

  static asMessageEvent(data: unknown) {
    return asSlackMessageEvent(data);
  }
}
