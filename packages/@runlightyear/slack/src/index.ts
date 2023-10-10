/**
 * This is the doc comment for the slack package
 *
 * @packageDocumentation
 */
export { RestConnector } from "@runlightyear/lightyear";
export { Slack } from "./Slack";
export { SlackOAuth } from "./SlackOAuth";

/** Chat **/
export type { PostMessageProps } from "./chat/postMessage";
export type { ScheduleMessageProps } from "./chat/scheduleMessage";

/** Conversations **/
export type { CreateConversationProps } from "./conversations/createConversation";
export type { InviteToConversationProps } from "./conversations/inviteToConversation";
export type {
  JoinConversationProps,
  JoinConversationResponse,
} from "./conversations/joinConversation";
export type {
  LeaveConversationProps,
  LeaveConversationResponse,
} from "./conversations/leaveConversation";

/** Events **/
export type { ChannelJoinEvent } from "./events/ChannelJoinEvent";
export type { ChannelLeaveEvent } from "./events/ChannelLeaveEvent";
export type { ChannelTopicEvent } from "./events/ChannelTopicEvent";
export type { SlackEvent } from "./events/SlackEvent";
export type { SlackMessageEvent } from "./events/SlackMessageEvent";

/** Types **/
export type { Channel } from "./types/Channel";
export type { EventType } from "./types/EventType";
export type { MessageEventSubtype } from "./types/MessageEventSubtype";
export type { SlackScope } from "./types/SlackScope";
export type { User } from "./types/User";

/* Types: Blocks */
export type { ContextBlock } from "./types/blocks/ContextBlock";
export type { DividerBlock } from "./types/blocks/DividerBlock";
export type { HeaderBlock } from "./types/blocks/HeaderBlock";
export type { ImageBlock } from "./types/blocks/ImageBlock";
export type { SectionBlock } from "./types/blocks/SectionBlock";

/* Types: Objects */
export type { ConfirmationDialogObject } from "./types/objects/ConfirmationDialogObject";
export type { ConversationFilterObject } from "./types/objects/ConversationFilterObject";
export type { DispatchActionConfigurationObject } from "./types/objects/DispatchActionConfigurationObject";
export type { MarkdownTextObject } from "./types/objects/MarkdownTextObject";
export type { OptionGroupObject } from "./types/objects/OptionGroupObject";
export type { OptionObject } from "./types/objects/OptionObject";
export type { PlainTextObject } from "./types/objects/PlainTextObject";
export type { SlackObject } from "./types/objects/SlackObject";
export type { TextObject } from "./types/objects/TextObject";
export type { TriggerObject } from "./types/objects/TriggerObject";
export type { WorkflowObject } from "./types/objects/WorkflowObject";

/** Users **/
export type { GetUserProps, GetUserResponse } from "./users/getUser";
export type {
  LookupUserByEmailProps,
  LookupUserByEmailResponse,
} from "./users/lookupUserByEmail";

/** Webhooks **/
export type {
  SlackWebhookSubscribeProps,
  SlackWebhookSubscribePropsFunc,
  DefineSlackWebhookProps,
} from "./webhooks/defineSlackWebhook";

/** Http Proxy **/
export type {
  HttpProxyRequestProps,
  HttpProxyResponse,
} from "@runlightyear/lightyear";
