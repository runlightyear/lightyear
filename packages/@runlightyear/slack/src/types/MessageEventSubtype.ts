export type MessageEventSubtype =
  /**
   * A message was posted by an integration
   */
  | "bot_message"

  /**
   * A /me message was sent
   */
  | "me_message"

  /**
   * A message was changed
   */
  | "message_changed"

  /**
   * A message was deleted
   */
  | "message_deleted"

  /**
   * A message thread received a reply
   */
  | "message_replied"

  /**
   * A message thread's reply was broadcast to a channel
   */
  | "thread_broadcast"

  /**
   * A member joined a channel
   */
  | "channel_join"

  /**
   * A member left a channel
   */
  | "channel_leave"

  /**
   * A channel topic was updated
   */
  | "channel_topic"

  /**
   * A channel purpose was updated
   */
  | "channel_purpose"

  /**
   * A channel was renamed
   */
  | "channel_name"

  /**
   * A channel was archived
   */
  | "channel_archive"

  /**
   * A channel was unarchived
   */
  | "channel_unarchive"

  /**
   * A file was shared into a channel
   */
  | "file_share"

  /**
   * Message content redacted due to Enterprise Key Management (EKM)
   */
  | "ekm_access_denied"

  /**
   * The posting permissions for a channel changed
   */
  | "channel_posting_permissions";
