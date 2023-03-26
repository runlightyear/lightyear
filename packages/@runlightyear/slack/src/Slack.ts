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
import { contextBlock, ContextProps } from "./elements/blocks/contextBlock";
import { dividerBlock, DividerProps } from "./elements/blocks/dividerBlock";
import { headerBlock, HeaderProps } from "./elements/blocks/headerBlock";
import { imageBlock, ImageProps } from "./elements/blocks/imageBlock";
import { sectionBlock, SectionProps } from "./elements/blocks/sectionBlock";
import {
  plainTextObject,
  PlainTextProps,
} from "./elements/objects/plainTextObject";
import {
  markdownTextObject,
  MarkdownTextProps,
} from "./elements/objects/markdownTextObject";

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
   *     Slack.sectionBlock("Title section"),
   *     Slack.sectionBlock({
   *       fields: [
   *         Slack.markdownTextObject("*Data 1*\nvalue A"),
   *         Slack.markdownTextObject("*Data 2*\nvalue B"),
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

  /**
   * Treat incoming action data as a Slack Event
   *
   * @group Webhooks
   *
   * @param data
   */
  static asEvent(data: unknown) {
    return asSlackEvent(data);
  }

  /**
   * Treat incoming action data as a Slack Message Event
   *
   * @group Webhooks
   *
   * @param data
   */
  static asMessageEvent(data: unknown) {
    return asSlackMessageEvent(data);
  }

  /**
   * Displays message context, which can include both images and text.
   *
   * @group Elements: Blocks
   *
   * @param props
   */
  static contextBlock(props: ContextProps) {
    return contextBlock(props);
  }

  /**
   * A content divider, like an html hr tag, to split up different blocks inside of a message. The divider block is nice and neat, requiring only a type.
   *
   * @group Elements: Blocks
   *
   * @param props
   */
  static dividerBlock(props?: DividerProps) {
    return dividerBlock(props);
  }

  /**
   * A header is a plain-text block that displays in a larger, bold font. Use it to delineate between different groups of content in your app's surfaces.
   *
   * @group Elements: Blocks
   *
   * @example Simple text header
   * ```typescript
   * Slack.headerBlock("The Header");
   * ```
   *
   * @param propsOrText
   */
  static headerBlock(propsOrText: HeaderProps | string) {
    return headerBlock(propsOrText);
  }

  /**
   * A simple image block, designed to make those cat photos really pop.
   *
   * @group Elements: Blocks
   *
   * @param props
   */
  static imageBlock(props: ImageProps) {
    return imageBlock(props);
  }

  /**
   * A section is one of the most flexible blocks available - it can be used as a simple text block, in combination with text fields, or side-by-side with any of the available block elements.
   *
   * @group Elements: Blocks
   *
   * @example Simple text block
   * ```typescript
   * Slack.sectionBlock("Title");
   * ```
   *
   * @example Section with fields
   * ```typescript
   * Slack.sectionBlock({
   *   fields: [
   *     Slack.markdownTextObject("*Data 1*\nvalue A"),
   *     Slack.markdownTextObject("*Data 2*\nvalue B"),
   *   ],
   * });
   * ```
   *
   * @param propsOrText
   */
  static sectionBlock(propsOrText: SectionProps | string) {
    return sectionBlock(propsOrText);
  }

  /**
   * A text object containing markdown formatting.
   *
   * @group Elements: Objects
   *
   * @param propsOrText
   */
  static markdownTextObject(propsOrText: MarkdownTextProps | string) {
    return markdownTextObject(propsOrText);
  }

  /**
   * A plain text object.
   *
   * @group Elements: Objects
   *
   * @param propsOrText
   */
  static plainTextObject(propsOrText: PlainTextProps | string) {
    return plainTextObject(propsOrText);
  }
}
