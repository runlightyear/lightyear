import {
  RestConnector,
  HttpProxyRequestProps,
  HttpProxyResponse,
  RestConnectorProps,
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
import { setAuthError } from "@runlightyear/lightyear";
import { listUsers, ListUsersProps } from "./users/listUsers";
import {
  listConversations,
  ListConversationsProps,
} from "./conversations/listConversations";
import {
  kickFromConversation,
  KickFromConversationProps,
} from "./conversations/kickFromConversation";

export interface SlackProps extends RestConnectorProps {}

/**
 * Connector to the Slack API
 *
 * @example Post text message
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Slack } from "@runlightyear/slack";
 *
 * defineAction({
 *   name: "postMessage",
 *   title: "Post Message",
 *   apps: ["slack"],
 *   variables: [
 *     {
 *       name: "channel",
 *       description:
 *         "Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name.",
 *     },
 *     {
 *       name: "text",
 *       description: "The formatted text of the message to be published.",
 *     },
 *   ],
 *   run: async ({ auths, variables }) => {
 *     const slack = new Slack({
 *       auth: auths.slack,
 *     });
 *     const response = await slack.postMessage({
 *       channel: variables.channel!,
 *       text: variables.text!,
 *     });
 *     console.log("Response data: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Post message with blocks
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Slack } from "@runlightyear/slack";
 *
 * defineAction({
 *   name: "postMessageWithBlocks",
 *   title: "Post Message With Blocks",
 *   apps: ["slack"],
 *   variables: [
 *     {
 *       name: "channel",
 *       description:
 *         "Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name.",
 *     },
 *   ],
 *   run: async ({ auths, variables }) => {
 *     const slack = new Slack({ auth: auths.slack });
 *
 *     const response = await slack.postMessage({
 *       channel: variables.channel!,
 *       blocks: [
 *         {
 *           type: "header",
 *           text: {
 *             type: "plain_text",
 *             text: "The header of the message",
 *           },
 *         },
 *         {
 *           type: "section",
 *           text: {
 *             type: "mrkdwn",
 *             text: "A message *with some bold text* and _some italicized text_.",
 *           },
 *         },
 *         {
 *           type: "divider",
 *         },
 *         {
 *           type: "section",
 *           fields: [
 *             {
 *               type: "mrkdwn",
 *               text: "*Priority*\nHigh",
 *             },
 *             {
 *               type: "mrkdwn",
 *               text: "*Assignee*\nJohn",
 *             },
 *             {
 *               type: "mrkdwn",
 *               text: "*Labels*\nBug",
 *             },
 *             {
 *               type: "mrkdwn",
 *               text: "*Milestone*\nRelease 1.0",
 *             },
 *           ],
 *         },
 *       ],
 *       text: "Text for screens where blocks are not supported.",
 *     });
 *
 *     console.log("Response data: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Schedule a message
 * ```typescript
 * import { dayjsUtc, defineAction } from "@runlightyear/lightyear";
 * import { Slack } from "@runlightyear/slack";
 *
 * defineAction({
 *   name: "scheduleMessage",
 *   title: "Schedule Message",
 *   apps: ["slack"],
 *   variables: [
 *     {
 *       name: "channel",
 *       description:
 *         "Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name.",
 *     },
 *     {
 *       name: "delay?",
 *       description:
 *         "Amount of time in seconds to delay sending message. Defaults to 60.",
 *     },
 *   ],
 *   run: async ({ auths, variables }) => {
 *     const slack = new Slack({
 *       auth: auths.slack,
 *     });
 *
 *     const delay = variables.delay ? parseInt(variables.delay) : 60;
 *     const response = await slack.scheduleMessage({
 *       channel: variables.channel!,
 *       postAt: dayjsUtc().add(delay, "seconds").unix(),
 *       text: `This message was delayed ${delay} seconds.`,
 *     });
 *
 *     console.log("Response data: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Create a new conversation
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Slack } from "@runlightyear/slack";
 *
 * defineAction({
 *   name: "createPublicChannel",
 *   title: "Create Public Channel",
 *   apps: ["slack"],
 *   variables: [
 *     {
 *       name: "name",
 *       description: "Name of the public channel to create",
 *     },
 *   ],
 *   run: async ({ auths, variables }) => {
 *     const slack = new Slack({
 *       auth: auths.slack,
 *     });
 *     const response = await slack.createConversation({
 *       name: variables.name!,
 *       isPrivate: false,
 *     });
 *     console.log("Response data: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Invite a user to a channel
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Slack } from "@runlightyear/slack";
 *
 * defineAction({
 *   name: "inviteToChannel",
 *   title: "Invite to Channel",
 *   apps: ["slack"],
 *   variables: [
 *     {
 *       name: "channel",
 *       description: "ID of the channel to invite user to. Example: C1234567890",
 *     },
 *     {
 *       name: "user",
 *       description: "ID of the user to invite. Example: U3456789012",
 *     },
 *   ],
 *   run: async ({ auths, variables }) => {
 *     const slack = new Slack({
 *       auth: auths.slack,
 *     });
 *     const response = await slack.inviteToConversation({
 *       channel: variables.channel!,
 *       users: [variables.user!],
 *     });
 *     console.log("Response data: ", response.data);
 *   },
 * });
 * ```
 *
 * @example List users
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Slack } from "@runlightyear/slack";
 *
 * defineAction({
 *   name: "listUsers",
 *   title: "List Users",
 *   apps: ["slack"],
 *   run: async ({ auths }) => {
 *     const slack = new Slack({
 *       auth: auths.slack,
 *     });
 *     const response = await slack.listUsers();
 *     console.log("Response data: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Get user info
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Slack } from "@runlightyear/slack";
 *
 * defineAction({
 *   name: "getUser",
 *   title: "Get User",
 *   apps: ["slack"],
 *   variables: [
 *     {
 *       name: "user",
 *       description: "User to get info on. Example: W1234567890",
 *     },
 *   ],
 *   run: async ({ auths, variables }) => {
 *     const slack = new Slack({
 *       auth: auths.slack,
 *     });
 *     const response = await slack.getUser({
 *       user: variables.user!,
 *     });
 *     console.log("Response data: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Lookup user by email
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Slack } from "@runlightyear/slack";
 *
 * defineAction({
 *   name: "lookupUserByEmail",
 *   title: "Lookup User By Email",
 *   apps: ["slack"],
 *   variables: [
 *     {
 *       name: "email",
 *       description: "Email address of user to look up",
 *     },
 *   ],
 *   run: async ({ auths, variables }) => {
 *     const slack = new Slack({
 *       auth: auths.slack,
 *     });
 *     const response = await slack.lookupUserByEmail({
 *       email: variables.email!,
 *     });
 *     console.log("Response data: ", response.data);
 *   },
 * });
 * ```
 *
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
  constructor(props: SlackProps) {
    super(props);
  }

  getBaseUrl(): string {
    return "https://slack.com/api/";
  }

  /**
   * @internal
   */
  async request(props: HttpProxyRequestProps): Promise<HttpProxyResponse> {
    const response = await super.request(props);
    let data = response.data;

    if (!data.ok) {
      if (
        [
          "invalid_auth",
          "not_authed",
          "not_bearer_token",
          "token_expired",
          "token_revoked",
          "token_rotation_error",
        ].includes(data.error)
      ) {
        const { appName, customAppName, authName } = this.getAuthData();

        await setAuthError({
          appName,
          customAppName,
          authName,
          error: "Unauthorized",
          errorResolution: "REAUTHORIZE",
        });
      }

      throw new Error(data.error);
    }
    return response;
  }

  /**
   * Sends a message to a channel
   *
   * @group Chat
   *
   * @example Post text message
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Slack } from "@runlightyear/slack";
   *
   * defineAction({
   *   name: "postMessage",
   *   title: "Post Message",
   *   apps: ["slack"],
   *   variables: [
   *     {
   *       name: "channel",
   *       description:
   *         "Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name.",
   *     },
   *     {
   *       name: "text",
   *       description: "The formatted text of the message to be published.",
   *     },
   *   ],
   *   run: async ({ auths, variables }) => {
   *     const slack = new Slack({
   *       auth: auths.slack,
   *     });
   *     const response = await slack.postMessage({
   *       channel: variables.channel!,
   *       text: variables.text!,
   *     });
   *     console.log("Response data: ", response.data);
   *   },
   * });
   * ```
   *
   * @example Post message with blocks
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Slack } from "@runlightyear/slack";
   *
   * defineAction({
   *   name: "postMessageWithBlocks",
   *   title: "Post Message With Blocks",
   *   apps: ["slack"],
   *   variables: [
   *     {
   *       name: "channel",
   *       description:
   *         "Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name.",
   *     },
   *   ],
   *   run: async ({ auths, variables }) => {
   *     const slack = new Slack({ auth: auths.slack });
   *
   *     const response = await slack.postMessage({
   *       channel: variables.channel!,
   *       blocks: [
   *         {
   *           type: "header",
   *           text: {
   *             type: "plain_text",
   *             text: "The header of the message",
   *           },
   *         },
   *         {
   *           type: "section",
   *           text: {
   *             type: "mrkdwn",
   *             text: "A message *with some bold text* and _some italicized text_.",
   *           },
   *         },
   *         {
   *           type: "divider",
   *         },
   *         {
   *           type: "section",
   *           fields: [
   *             {
   *               type: "mrkdwn",
   *               text: "*Priority*\nHigh",
   *             },
   *             {
   *               type: "mrkdwn",
   *               text: "*Assignee*\nJohn",
   *             },
   *             {
   *               type: "mrkdwn",
   *               text: "*Labels*\nBug",
   *             },
   *             {
   *               type: "mrkdwn",
   *               text: "*Milestone*\nRelease 1.0",
   *             },
   *           ],
   *         },
   *       ],
   *       text: "Text for screens where blocks are not supported.",
   *     });
   *
   *     console.log("Response data: ", response.data);
   *   },
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
   *
   * @example Schedule a message
   * ```typescript
   * import { dayjsUtc, defineAction } from "@runlightyear/lightyear";
   * import { Slack } from "@runlightyear/slack";
   *
   * defineAction({
   *   name: "scheduleMessage",
   *   title: "Schedule Message",
   *   apps: ["slack"],
   *   variables: [
   *     {
   *       name: "channel",
   *       description:
   *         "Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name.",
   *     },
   *     {
   *       name: "delay?",
   *       description:
   *         "Amount of time in seconds to delay sending message. Defaults to 60.",
   *     },
   *   ],
   *   run: async ({ auths, variables }) => {
   *     const slack = new Slack({
   *       auth: auths.slack,
   *     });
   *
   *     const delay = variables.delay ? parseInt(variables.delay) : 60;
   *     const response = await slack.scheduleMessage({
   *       channel: variables.channel!,
   *       postAt: dayjsUtc().add(delay, "seconds").unix(),
   *       text: `This message was delayed ${delay} seconds.`,
   *     });
   *
   *     console.log("Response data: ", response.data);
   *   },
   * });
   * ```
   */
  async scheduleMessage(props: ScheduleMessageProps) {
    return scheduleMessage(this)(props);
  }

  /**
   * List conversations
   *
   * @group Conversations
   *
   * @example List conversations
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Slack } from "@runlightyear/slack";
   *
   * defineAction({
   *   name: "listChannels",
   *   title: "List Channels",
   *   apps: ["slack"],
   *   run: async ({ auths }) => {
   *     const slack = new Slack({
   *       auth: auths.slack,
   *     });
   *     const response = await slack.listConversations();
   *     console.log("Response data: ", response.data);
   *   },
   * });
   * ```
   */
  async listConversations(props?: ListConversationsProps) {
    return listConversations(this)(props);
  }

  /**
   * Initiates a public or private channel-based conversation
   *
   * @group Conversations
   *
   * @example Create a new conversation
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Slack } from "@runlightyear/slack";
   *
   * defineAction({
   *   name: "createPublicChannel",
   *   title: "Create Public Channel",
   *   apps: ["slack"],
   *   variables: [
   *     {
   *       name: "name",
   *       description: "Name of the public channel to create",
   *     },
   *   ],
   *   run: async ({ auths, variables }) => {
   *     const slack = new Slack({
   *       auth: auths.slack,
   *     });
   *     const response = await slack.createConversation({
   *       name: variables.name!,
   *       isPrivate: false,
   *     });
   *     console.log("Response data: ", response.data);
   *   },
   * });
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
   * @example Invite a user to a channel
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Slack } from "@runlightyear/slack";
   *
   * defineAction({
   *   name: "inviteToChannel",
   *   title: "Invite to Channel",
   *   apps: ["slack"],
   *   variables: [
   *     {
   *       name: "channel",
   *       description: "ID of the channel to invite user to. Example: C1234567890",
   *     },
   *     {
   *       name: "user",
   *       description: "ID of the user to invite. Example: U3456789012",
   *     },
   *   ],
   *   run: async ({ auths, variables }) => {
   *     const slack = new Slack({
   *       auth: auths.slack,
   *     });
   *     const response = await slack.inviteToConversation({
   *       channel: variables.channel!,
   *       users: [variables.user!],
   *     });
   *     console.log("Response data: ", response.data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  async inviteToConversation(props: InviteToConversationProps) {
    return inviteToConversation(this)(props);
  }

  /**
   * Kick a user from a conversation
   *
   * @group Conversations
   *
   * @example Kick a user from a channel
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Slack } from "@runlightyear/slack";
   *
   * defineAction({
   *   name: "kickFromChannel",
   *   title: "Kick From Channel",
   *   apps: ["slack"],
   *   variables: [
   *     {
   *       name: "channel",
   *       description: "ID of conversation to kick user from. Example: C1234567890",
   *     },
   *     {
   *       name: "user",
   *       description: "User ID to be removed. Example: W1234567890",
   *     },
   *   ],
   *   run: async ({ auths, variables }) => {
   *     const slack = new Slack({
   *       auth: auths.slack,
   *     });
   *     const response = await slack.kickFromConversation({
   *       channel: variables.channel!,
   *       user: variables.user!,
   *     });
   *     console.log("Response data: ", response.data);
   *   },
   * });
   * ```
   */
  async kickFromConversation(props: KickFromConversationProps) {
    return kickFromConversation(this)(props);
  }

  /**
   * Join an existing conversation
   *
   * @group Conversations
   *
   * @example Join a channel
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Slack } from "@runlightyear/slack";
   *
   * defineAction({
   *   name: "joinChannel",
   *   title: "Join Channel",
   *   apps: ["slack"],
   *   variables: [
   *     {
   *       name: "channel",
   *       description: "ID of conversation to join. Example: C1234567890",
   *     },
   *   ],
   *   run: async ({ auths, variables }) => {
   *     const slack = new Slack({
   *       auth: auths.slack,
   *     });
   *     const response = await slack.joinConversation({
   *       channel: variables.channel!,
   *     });
   *     console.log("Response data: ", response.data);
   *   },
   * });
   * ```
   */
  async joinConversation(props: JoinConversationProps) {
    return joinConversation(this)(props);
  }

  /**
   * Leave a conversation
   *
   * @group Conversations
   *
   * @example Leave a channel
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Slack } from "@runlightyear/slack";
   *
   * defineAction({
   *   name: "leaveChannel",
   *   title: "Leave Channel",
   *   apps: ["slack"],
   *   variables: [
   *     {
   *       name: "channel",
   *       description: "ID of conversation to leave. Example: C1234567890",
   *     },
   *   ],
   *   run: async ({ auths, variables }) => {
   *     const slack = new Slack({
   *       auth: auths.slack,
   *     });
   *     const response = await slack.leaveConversation({
   *       channel: variables.channel!,
   *     });
   *     console.log("Response data: ", response.data);
   *   },
   * });
   * ```
   */
  async leaveConversation(props: LeaveConversationProps) {
    return leaveConversation(this)(props);
  }

  /**
   * List users
   *
   * @group Users
   *
   * @example List users
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Slack } from "@runlightyear/slack";
   *
   * defineAction({
   *   name: "listUsers",
   *   title: "List Users",
   *   apps: ["slack"],
   *   run: async ({ auths }) => {
   *     const slack = new Slack({
   *       auth: auths.slack,
   *     });
   *     const response = await slack.listUsers();
   *     console.log("Response data: ", response.data);
   *   },
   * });
   * ```
   */
  async listUsers(props?: ListUsersProps) {
    return listUsers(this)(props);
  }

  /**
   * Gets information about a user.
   *
   * @group Users
   *
   * @example Get user info
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Slack } from "@runlightyear/slack";
   *
   * defineAction({
   *   name: "getUser",
   *   title: "Get User",
   *   apps: ["slack"],
   *   variables: [
   *     {
   *       name: "user",
   *       description: "User to get info on. Example: W1234567890",
   *     },
   *   ],
   *   run: async ({ auths, variables }) => {
   *     const slack = new Slack({
   *       auth: auths.slack,
   *     });
   *     const response = await slack.getUser({
   *       user: variables.user!,
   *     });
   *     console.log("Response data: ", response.data);
   *   },
   * });
   * ```
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
   * @example Lookup user by email
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Slack } from "@runlightyear/slack";
   *
   * defineAction({
   *   name: "lookupUserByEmail",
   *   title: "Lookup User By Email",
   *   apps: ["slack"],
   *   variables: [
   *     {
   *       name: "email",
   *       description: "Email address of user to look up",
   *     },
   *   ],
   *   run: async ({ auths, variables }) => {
   *     const slack = new Slack({
   *       auth: auths.slack,
   *     });
   *     const response = await slack.lookupUserByEmail({
   *       email: variables.email!,
   *     });
   *     console.log("Response data: ", response.data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  async lookupUserByEmail(props: LookupUserByEmailProps) {
    return lookupUserByEmail(this)(props);
  }

  /**
   * Define a Slack webhook
   *
   * @alpha
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
   * @alpha
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
   * @alpha
   *
   * @group Webhooks
   *
   * @param data
   */
  static asMessageEvent(data: unknown) {
    return asSlackMessageEvent(data);
  }
}
