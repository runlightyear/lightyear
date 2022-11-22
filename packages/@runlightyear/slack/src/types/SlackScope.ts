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

  /*Add shortcuts and/or slash commands that people can use*/
  | "commands"

  // Grants permission to generate websocket URIs and connect to Socket Mode
  // App level
  | "connections:write"
  // Allows your slack app to manage Slack Connect channels
  | "conversations.connect:manage"
  | "conversations.connect:read"
  // Receive Slack Connect invite events sent to the channels your slack app is in
  /*Create Slack Connect invitations for channels that your slack app has been added to, and accept invitations sent to your slack app*/
  | "conversations.connect:write"
  // View Do Not Disturb settings for people in a workspace
  | "dnd:read"
  // Edit a user’s Do Not Disturb settings
  | "dnd:write"
  // Change the user's Do Not Disturb settings
  | "dnd:write:user"
  // View a user’s email address
  | "email"
  // View custom emoji in a workspace
  | "emoji:read"
  // View files shared in channels and conversations that your slack app has been added to
  | "files:read"
  // Upload, edit, and delete files as your slack app
  | "files:write"
  // Upload, edit, and delete files as your slack app
  | "files:write:user"
  // View messages and other content in private channels that your slack app has been added to
  | "groups:history"
  // View basic information about private channels that your slack app has been added to
  | "groups:read"
  // Manage private channels that your slack app has been added to and create new ones
  | "groups:write"
  // View information about a user’s identity
  | "identify"
  // View a user’s Slack avatar
  | "identity.avatar"
  // View the user's profile picture
  | "identity.avatar:read:user"
  // View information about a user’s identity
  | "identity.basic"
  | "identity.email"
  // View a user’s email address
  | "identity.email:read:user"
  // View a user’s Slack workspace name
  | "identity.team"
  // View the workspace's name, domain, and icon
  | "identity.team:read:user"
  | "identity:read:user"
  // View messages and other content in direct messages that your slack app has been added to
  | "im:history"
  // View basic information about direct messages that your slack app has been added to
  | "im:read"
  // Start direct messages with people
  | "im:write"
  // Create one-way webhooks to post messages to a specific channel
  | "incoming-webhook"
  // Embed video player URLs in messages and app surfaces
  | "links.embed:write"
  // View URLs in messages
  | "links:read"
  // Show previews of URLs in messages
  | "links:write"
  // Allows your slack app to read message metadata in channels that your slack app has been added to
  | "metadata.message:read"
  // View messages and other content in group direct messages that your slack app has been added to
  | "mpim:history"
  // View basic information about group direct messages that your slack app has been added to
  | "mpim:read"
  // Start group direct messages with people
  | "mpim:write"
  // View information about a user’s identity
  | "openid"
  // View pinned content in channels and conversations that your slack app has been added to
  | "pins:read"
  // Add and remove pinned messages and files
  | "pins:write"
  // Post messages to a workspace
  | "post"
  // View a user’s Slack avatar and Slack workspace's basic information
  | "profile"
  // View emoji reactions and their associated content in channels and conversations that your slack app has been added to
  | "reactions:read"
  // Add and edit emoji reactions
  | "reactions:write"
  // View all content in a workspace
  | "read"
  // View reminders created by your slack app
  | "reminders:read"
  // Access reminders created by a user or for a user
  | "reminders:read:user"
  // Add, remove, or mark reminders as complete
  | "reminders:write"
  // Add, remove, or complete reminders for the user
  | "reminders:write:user"
  // View remote files added by the app in a workspace
  | "remote_files:read"
  // Share remote files on a user’s behalf
  | "remote_files:share"
  // Add, edit, and delete remote files on a user’s behalf
  | "remote_files:write"
  // Search a workspace’s content
  | "search:read"
  // View messages and files that your slack app has starred
  | "stars:read"
  // Add or remove stars
  | "stars:write"
  // Allows your slack app to read the billing plan for workspaces your slack app has been installed to
  | "team.billing:read"
  // Allows your slack app to read the preferences for workspaces your slack app has been installed to
  | "team.preferences:read"
  // View the name, email domain, and icon for workspaces your slack app is connected to
  | "team:read"
  // Execute methods without needing a scope
  | "tokens.basic"
  // Read new Platform triggers
  | "triggers:read"
  // Create new Platform triggers
  | "triggers:write"
  // View user groups in a workspace
  | "usergroups:read"
  // Create and manage user groups
  | "usergroups:write"
  // View profile details about people in a workspace
  | "users.profile:read"
  // Edit a user’s profile information and status
  | "users.profile:write"
  // Change the user's profile fields
  | "users.profile:write:user"
  // View people in a workspace
  | "users:read"
  // View email addresses of people in a workspace
  | "users:read.email"
  // Set presence for your slack app
  | "users:write"
  // Add steps that people can use in Workflow Builder
  | "workflow.steps:execute";
