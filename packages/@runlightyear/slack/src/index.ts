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

/** Elements **/

/* Elements > Blocks */

import { actionsBlock } from "./elements/blocks/actionsBlock";
import type {
  ActionsProps,
  ActionsBlock,
} from "./elements/blocks/actionsBlock";

import { contextBlock } from "./elements/blocks/contextBlock";
import type {
  ContextProps,
  ContextBlock,
} from "./elements/blocks/contextBlock";

import { dividerBlock } from "./elements/blocks/dividerBlock";
import type {
  DividerProps,
  DividerBlock,
} from "./elements/blocks/dividerBlock";

import { fileBlock } from "./elements/blocks/fileBlock";
import type { FileProps, FileBlock } from "./elements/blocks/fileBlock";

import { headerBlock } from "./elements/blocks/headerBlock";
import type { HeaderProps, HeaderBlock } from "./elements/blocks/headerBlock";

import { imageBlock } from "./elements/blocks/imageBlock";
import type { ImageProps, ImageBlock } from "./elements/blocks/imageBlock";

import { sectionBlock } from "./elements/blocks/sectionBlock";
import type {
  SectionProps,
  SectionBlock,
} from "./elements/blocks/sectionBlock";

import { videoBlock } from "./elements/blocks/videoBlock";
import type { VideoProps, VideoBlock } from "./elements/blocks/videoBlock";

/* Elements > Components */

import { buttonComponent } from "./elements/components/buttonComponent";
import type {
  ButtonComponentProps,
  ButtonComponent,
} from "./elements/components/buttonComponent";

/* Elements > Objects */

import { confirmationDialogObject } from "./elements/objects/confirmationDialogObject";
import type { ConfirmationDialogObject } from "./elements/objects/confirmationDialogObject";

import { markdownTextObject } from "./elements/objects/markdownTextObject";
import type {
  MarkdownTextProps,
  MarkdownTextObject,
} from "./elements/objects/markdownTextObject";

import { plainTextObject } from "./elements/objects/plainTextObject";
import type {
  PlainTextProps,
  PlainTextObject,
} from "./elements/objects/plainTextObject";

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

export {
  Slack,
  SlackOAuth,
  RestConnector,
  actionsBlock,
  contextBlock,
  dividerBlock,
  fileBlock,
  headerBlock,
  imageBlock,
  sectionBlock,
  videoBlock,
  buttonComponent,
  confirmationDialogObject,
  markdownTextObject,
  plainTextObject,
};
export type {
  PostMessageProps,
  ScheduleMessageProps,
  CreateConversationProps,
  InviteToConversationProps,
  JoinConversationProps,
  JoinConversationResponse,
  LeaveConversationProps,
  LeaveConversationResponse,
  ActionsProps,
  ActionsBlock,
  ContextProps,
  ContextBlock,
  DividerProps,
  DividerBlock,
  FileProps,
  FileBlock,
  HeaderProps,
  HeaderBlock,
  ImageProps,
  ImageBlock,
  SectionProps,
  SectionBlock,
  VideoProps,
  VideoBlock,
  ButtonComponentProps,
  ButtonComponent,
  ConfirmationDialogObject,
  MarkdownTextProps,
  MarkdownTextObject,
  PlainTextProps,
  PlainTextObject,
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
