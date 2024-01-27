/**
 * WEBHOOK
 * chat_channel.created
 * WEBHOOK
 * chat_channel.deleted
 * WEBHOOK
 * chat_channel.member_invited
 * WEBHOOK
 * chat_channel.member_joined
 * WEBHOOK
 * chat_channel.member_left
 * WEBHOOK
 * chat_channel.member_removed
 * WEBHOOK
 * chat_channel.updated
 * Chat_message
 * WEBHOOK
 * chat_message.deleted
 * WEBHOOK
 * chat_message.replied
 * WEBHOOK
 * chat_message.sent
 * WEBHOOK
 * chat_message.updated
 * Docs
 * /
 * API
 * /
 * Zoom API Events - Team Chat
 * Zoom API Events - Team Chat 1.0.0
 *  */

export type WebhookTeamChatEvent =
  | "chat_channel.created"
  | "chat_channel.deleted"
  | "chat_channel.member_invited"
  | "chat_channel.member_joined"
  | "chat_channel.member_left"
  | "chat_channel.member_removed"
  | "chat_channel.updated"
  | "chat_message.deleted"
  | "chat_message.replied"
  | "chat_message.sent"
  | "chat_message.updated";
