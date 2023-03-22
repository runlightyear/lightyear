export type EventType =
  /**
   * User clicked into your App Home
   */
  | "app_home_opened"

  /**
   * Subscribe to only the message events that mention your app or bot
   */
  | "app_mention"

  /**
   * Indicates your app's event subscriptions are being rate limited
   */
  | "app_rate_limited"

  /**
   * User requested an app
   */
  | "app_requested"

  /**
   * Your Slack app was uninstalled.
   */
  | "app_uninstalled"

  /**
   * A Call was rejected
   */
  | "call_rejected"

  /**
   * A channel was archived
   */
  | "channel_archive"

  /**
   * A channel was created
   */
  | "channel_created"

  /**
   * A channel was deleted
   */
  | "channel_deleted"

  /**
   * Bulk updates were made to a channel's history
   */
  | "channel_history_changed"

  /**
   * A channel ID changed
   */
  | "channel_id_changed"

  /**
   * You left a channel
   */
  | "channel_left"

  /**
   * A channel was renamed
   */
  | "channel_rename"

  /**
   * A channel has been shared with an external workspace
   */
  | "channel_shared"

  /**
   * A channel was unarchived
   */
  | "channel_unarchive"

  /**
   * A channel has been unshared with an external workspace
   */
  | "channel_unshared"

  /**
   * Do not Disturb settings changed for the current user
   */
  | "dnd_updated"

  /**
   * Do not Disturb settings changed for a member
   */
  | "dnd_updated_user"

  /**
   * The workspace email domain has changed
   */
  | "email_domain_changed"

  /**
   * A custom emoji has been added or changed
   */
  | "emoji_changed"

  /**
   * A file was changed
   */
  | "file_change"

  /**
   * A file comment was added
   */
  | "file_comment_added"

  /**
   * A file comment was deleted
   */
  | "file_comment_deleted"

  /**
   * A file comment was edited
   */
  | "file_comment_edited"

  /**
   * A file was created
   */
  | "file_created"

  /**
   * A file was deleted
   */
  | "file_deleted"

  /**
   * A file was made public
   */
  | "file_public"

  /**
   * A file was shared
   */
  | "file_shared"

  /**
   * A file was unshared
   */
  | "file_unshared"

  /**
   * An enterprise grid migration has finished on this workspace.
   */
  | "grid_migration_finished"

  /**
   * An enterprise grid migration has started on this workspace.
   */
  | "grid_migration_started"

  /**
   * A private channel was archived
   */
  | "group_archive"

  /**
   * You closed a private channel
   */
  | "group_close"

  /**
   * A private channel was deleted
   */
  | "group_deleted"

  /**
   * Bulk updates were made to a private channel's history
   */
  | "group_history_changed"

  /**
   * You left a private channel
   */
  | "group_left"

  /**
   * You created a group DM
   */
  | "group_open"

  /**
   * A private channel was renamed
   */
  | "group_rename"

  /**
   * A private channel was unarchived
   */
  | "group_unarchive"

  /**
   * You closed a DM
   */
  | "im_close"

  /**
   * A DM was created
   */
  | "im_created"

  /**
   * Bulk updates were made to a DM's history
   */
  | "im_history_changed"

  /**
   * You opened a DM
   */
  | "im_open"

  /**
   * User requested an invite
   */
  | "invite_requested"

  /**
   * A message was posted containing one or more links relevant to your application
   */
  | "link_shared"

  /**
   * A user joined a public channel, private channel or MPDM.
   */
  | "member_joined_channel"

  /**
   * A user left a public or private channel
   */
  | "member_left_channel"

  /**
   * A message was sent to a channel
   */
  | "message"

  /**
   * A user sent a message to your Slack app
   */
  | "message.app_home"

  /**
   * A message was posted to a channel
   */
  | "message.channels"

  /**
   * A message was posted to a private channel
   */
  | "message.groups"

  /**
   * A message was posted in a direct message channel
   */
  | "message.im"

  /**
   * A message was posted in a multiparty direct message channel
   */
  | "message.mpim"

  /**
   * Message metadata was deleted
   */
  | "message_metadata_deleted"

  /**
   * Message metadata was posted
   */
  | "message_metadata_posted"

  /**
   * Message metadata was updated
   */
  | "message_metadata_updated"

  /**
   * A pin was added to a channel
   */
  | "pin_added"

  /**
   * A pin was removed from a channel
   */
  | "pin_removed"

  /**
   * A member has added an emoji reaction to an item
   */
  | "reaction_added"

  /**
   * A member removed an emoji reaction
   */
  | "reaction_removed"

  /**
   * Access to a set of resources was granted for your app
   *
   * @deprecated
   */
  | "resources_added"

  /**
   * Access to a set of resources was removed for your app
   *
   * @deprecated
   */
  | "resources_removed"

  /**
   * OAuth scopes were denied to your app
   */
  | "scope_denied"

  /**
   * OAuth scopes were granted to your app
   */
  | "scope_granted"

  /**
   * A shared channel invite was accepted
   */
  | "shared_channel_invite_accepted"

  /**
   * A shared channel invite was approved
   */
  | "shared_channel_invite_approved"

  /**
   * A shared channel invite was declined
   */
  | "shared_channel_invite_declined"

  /**
   * A shared channel invite was sent to a Slack user
   */
  | "shared_channel_invite_received"

  /**
   * A member has starred an item
   */
  | "star_added"

  /**
   * A member removed a star
   */
  | "star_removed"

  /**
   * A User Group has been added to the workspace
   */
  | "subteam_created"

  /**
   * The membership of an existing User Group has changed
   */
  | "subteam_members_changed"

  /**
   * You have been added to a User Group
   */
  | "subteam_self_added"

  /**
   * You have been removed from a User Group
   */
  | "subteam_self_removed"

  /**
   * An existing User Group has been updated or its members changed
   */
  | "subteam_updated"

  /**
   * Access to a set of teams was granted to your org app
   */
  | "team_access_granted"

  /**
   * Access to a set of teams was revoked from your org app
   */
  | "team_access_revoked"

  /**
   * The workspace domain has changed
   */
  | "team_domain_change"

  /**
   * A new member has joined
   */
  | "team_join"

  /**
   * The workspace name has changed
   */
  | "team_rename"

  /**
   * API tokens for your app were revoked.
   */
  | "tokens_revoked"

  /**
   * Verifies ownership of an  Request URL
   */
  | "url_verification"

  /**
   * A member's data has changed
   */
  | "user_change"

  /**
   * A user's huddle status has changed
   */
  | "user_huddle_changed"

  /**
   * A user's profile data has changed
   */
  | "user_profile_changed"

  /**
   * User resource was denied to your app
   */
  | "user_resource_denied"

  /**
   * User resource was granted to your app
   */
  | "user_resource_granted"

  /**
   * User resource was removed from your app
   */
  | "user_resource_removed"

  /**
   * A user's status has changed
   */
  | "user_status_changed"

  /**
   * A workflow that contains a step supported by your app was deleted
   */
  | "workflow_deleted"

  /**
   * A workflow that contains a step supported by your app was published
   */
  | "workflow_published"

  /**
   * A workflow step supported by your app was removed from a workflow
   */
  | "workflow_step_deleted"

  /**
   * A workflow step supported by your app should execute
   */
  | "workflow_step_execute"

  /**
   * A workflow that contains a step supported by your app was unpublished
   */
  | "workflow_unpublished";
