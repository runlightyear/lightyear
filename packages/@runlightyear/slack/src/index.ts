/**
 * This is the doc comment for the slack package
 *
 * @packageDocumentation
 */
import { RestConnector } from "@runlightyear/lightyear";
import { Slack } from "./Slack";
import { SlackOAuth } from "./SlackOAuth";

/** Chat **/

import type { PostMessageProps } from "./chat/postMessage";
import type { ScheduleMessageProps } from "./chat/scheduleMessage";

/** Conversations **/

import type { CreateConversationProps } from "./conversations/createConversation";
import type { InviteToConversationProps } from "./conversations/inviteToConversation";
import type {
  JoinConversationProps,
  JoinConversationResponse,
} from "./conversations/joinConversation";
import type {
  LeaveConversationProps,
  LeaveConversationResponse,
} from "./conversations/leaveConversation";

/** Events **/
import type { ChannelJoinEvent } from "./events/ChannelJoinEvent";
import type { ChannelLeaveEvent } from "./events/ChannelLeaveEvent";
import type { ChannelTopicEvent } from "./events/ChannelTopicEvent";

/** Types **/

import type { Channel } from "./types/Channel";
import type { EventType } from "./types/EventType";
import type { MessageEventSubtype } from "./types/MessageEventSubtype";
import type { SlackScope } from "./types/SlackScope";
import type { User } from "./types/User";

/** Users **/

import type { GetUserProps, GetUserResponse } from "./users/getUser";
import type {
  LookupUserByEmailProps,
  LookupUserByEmailResponse,
} from "./users/lookupUserByEmail";

/** Webhooks **/

import type {
  SlackWebhookSubscribeProps,
  SlackWebhookSubscribePropsFunc,
  DefineSlackWebhookProps,
} from "./webhooks/defineSlackWebhook";

/** Http Proxy **/

import type {
  HttpProxyRequestProps,
  HttpProxyResponse,
} from "@runlightyear/lightyear";

export { Slack, SlackOAuth, RestConnector };
export type {
  PostMessageProps,
  ScheduleMessageProps,
  CreateConversationProps,
  InviteToConversationProps,
  JoinConversationProps,
  JoinConversationResponse,
  LeaveConversationProps,
  LeaveConversationResponse,
  ChannelJoinEvent,
  ChannelLeaveEvent,
  ChannelTopicEvent,
  Channel,
  EventType,
  MessageEventSubtype,
  SlackScope,
  User,
  GetUserProps,
  GetUserResponse,
  LookupUserByEmailProps,
  LookupUserByEmailResponse,
  SlackWebhookSubscribeProps,
  SlackWebhookSubscribePropsFunc,
  DefineSlackWebhookProps,
  HttpProxyRequestProps,
  HttpProxyResponse,
};
