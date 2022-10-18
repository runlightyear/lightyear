export type SlackScope =
  /**
   * Administer a workspace
   */
  | "admin"
  /**
   * Access analytics data about the organization
   *
   */
  | "admin.analytics:read"
  /**
   * View apps and app requests in a workspace
   */
  | "admin.apps:read"
  /**
   *  Manage apps in a workspace
   */
  | "admin.apps:write"
  /**
   *  Read information barriers in the organization
   */
  | "admin.barriers:read"
  /**
   * Manage information barriers in the organization
   */
  | "admin.barriers:write"
  /**
   *  View the channel’s member list, topic, purpose and channel name
   */
  | "admin.conversations:read"
  /**
   *  Start a new conversation, modify a conversation and modify channel details
   */
  | "admin.conversations:write"
  /**
   * Gain information about invite requests in a Grid organization.
   */
  | "admin.invites:read"
  /**
   * Approve or deny invite requests in a Grid organization.
   */
  | "admin.invites:write"
  /**
   * Access information about a workspace
   */
  | "admin.teams:read"
  /**
   * Make changes to a workspace
   */
  | "admin.teams:write"
  /**
   * Access information about user groups
   */
  | "admin.usergroups:read"
  /**
   * Make changes to your usergroups
   */
  | "admin.usergroups:write"
  /**
   * Access a workspace’s profile information
   */
  | "admin.users:read"
  /**
   * Modify account information
   */
  | "admin.users:write"
  /**
   * Read app configuration info via App Manifest APIs
   */
  | "app_configurations:read"
  /**
   * Write app configuration info and create apps via App Manifest APIs
   */
  | "app_configurations:write"
  /**
   * View messages that directly mention @your_slack_app in conversations that the app is in
   */
  | "app_mentions:read"
  /**
   * View events from all workspaces, channels and users (Enterprise Grid only)
   */
  | "auditlogs:read"
  /**
   * Grants permission to list authorizations associated with the Events API
   */
  | "authorizations:read"
  /**
   * List bookmarks
   */
  | "bookmarks:read"
  /**
   * Create, edit, and remove bookmarks
   */
  | "bookmarks:write"
  /**
   * Add the ability for people to direct message or mention @your_slack_app
   */
  | "bot"
  /**
   * View information about ongoing and past calls
   */
  | "calls:read"
  /**
   * Start and manage calls in a workspace
   */
  | "calls:write"
  /**
   * View messages and other content in public channels that your slack app has been added to
   */
  | "channels:history"
  /**
   * Join public channels in a workspace
   */
  | "channels:join"
  /**
   * Manage public channels that your slack app has been added to and create new ones
   */
  | "channels:manage"
  /**
   * View basic information about public channels in a workspace
   */
  | "channels:read"
  /**
   * Manage a user’s public channels and create new ones on a user’s behalf
   */
  | "channels:write"
  /**
   * Post messages in approved channels & conversations
   */
  | "chat:write"
  /**
   * Send messages as @your_slack_app with a customized username and avatar
   */
  | "chat:write.customize"
  /**
   * Send messages to channels @your_slack_app isn't a member of
   */
  | "chat:write.public"
  /**
   * Send messages as your slack app
   */
  | "chat:write:bot"
  /**
   * Send messages on a user’s behalf
   */
  | "chat:write:user"
  /**
   * Receive all events from a workspace in real time
   */
  | "client";
