/**
 * Documentation: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads
 */

export type WebhookEvent =
  /**
   * Activity related to a branch protection rule.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with at least read-only access on repositories administration
   */
  | "branch_protection_rule"
  /**
   * Check run activity has occurred. The type of activity is specified in the action property of the payload object. For more information, see the "check runs" REST API.
   *
   * Note: The Checks API only looks for pushes in the repository where the check suite or check run were created. Pushes to a branch in a forked repository are not detected and return an empty pull_requests array and a null value for head_branch.
   *
   * Availability
   *   Repository webhooks only receive payloads for the created and completed event types in a repository
   *   Organization webhooks only receive payloads for the created and completed event types in repositories
   *   GitHub Apps with the checks:read permission receive payloads for the created and completed events that occur in the repository where the app is installed. The app must have the checks:write permission to receive the rerequested and requested_action event types. The rerequested and requested_action event type payloads are only sent to the GitHub App being requested. GitHub Apps with the checks:write are automatically subscribed to this webhook event.
   */
  | "check_run"
  /**
   * Check suite activity has occurred. The type of activity is specified in the action property of the payload object. For more information, see the "check suites" REST API.
   *
   * Note: The Checks API only looks for pushes in the repository where the check suite or check run were created. Pushes to a branch in a forked repository are not detected and return an empty pull_requests array and a null value for head_branch.
   *
   * Availability
   *   Repository webhooks only receive payloads for the completed event types in a repository
   *   Organization webhooks only receive payloads for the completed event types in repositories
   *   GitHub Apps with the checks:read permission receive payloads for the created and completed events that occur in the repository where the app is installed. The app must have the checks:write permission to receive the requested and rerequested event types. The requested and rerequested event type payloads are only sent to the GitHub App being requested. GitHub Apps with the checks:write are automatically subscribed to this webhook event.
   */
  | "check_suite"
  /**
   * Activity related to code scanning alerts in a repository. The type of activity is specified in the action property of the payload object. For more information, see "About code scanning."
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the security_events :read permission
   */
  | "code_scanning_alert"
  /**
   * A commit comment is created. The type of activity is specified in the action property of the payload object. For more information, see the "commit comment" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the contents permission
   */
  | "commit_comment"
  /**
   * A Git branch or tag is created. For more information, see the "Git database" REST API.
   *
   * Note: You will not receive a webhook for this event when you create more than three tags at once.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the contents permission
   */
  | "create"
  /**
   * A Git branch or tag is deleted. For more information, see the "Git database" REST API.
   *
   * Note: You will not receive a webhook for this event when you delete more than three tags at once.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the contents permission
   */
  | "delete"
  /**
   * A deploy key is added or removed from a repository. The type of activity is specified in the action property of the payload object. For more information, see the "Deploy keys" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   */
  | "deploy_key"
  /**
   * A deployment is created. The type of activity is specified in the action property of the payload object. For more information, see the "deployment" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the deployments permission
   */
  | "deployment"
  /**
   * A deployment is created. The type of activity is specified in the action property of the payload object. For more information, see the "deployments" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the deployments permission
   */
  | "deployment_status"
  /**
   * Note: Webhook events for GitHub Discussions are currently in beta and subject to change.
   *
   * Activity related to a discussion. For more information, see the "Using the GraphQL API for discussions."
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the discussions permission
   */
  | "discussion"
  /**
   * Note: Webhook events for GitHub Discussions are currently in beta and subject to change.
   *
   * Activity related to a comment in a discussion. For more information, see "Using the GraphQL API for discussions."
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the discussions permission
   */
  | "discussion_comment"
  /**
   * A user forks a repository. For more information, see the "forks" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the contents permission
   */
  | "fork"
  /**
   * When someone revokes their authorization of a GitHub App, this event occurs. A GitHub App receives this webhook by default and cannot unsubscribe from this event.
   *
   * Anyone can revoke their authorization of a GitHub App from their GitHub account settings page. Revoking the authorization of a GitHub App does not uninstall the GitHub App. You should program your GitHub App so that when it receives this webhook, it stops calling the API on behalf of the person who revoked the token. If your GitHub App continues to use a revoked access token, it will receive the 401 Bad Credentials error. For details about user-to-server requests, which require GitHub App authorization, see "Identifying and authorizing users for GitHub Apps."
   *
   * Availability
   *   GitHub Apps
   */
  | "github_app_authorization"
  /**
   * A wiki page is created or updated. For more information, see "About wikis."
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the contents permission
   */
  | "gollum"
  /**
   * Activity related to a GitHub App installation. The type of activity is specified in the action property of the payload object. For more information, see the "GitHub App installation" REST API.
   *
   * Availability
   *   GitHub Apps
   */
  | "installation"
  /**
   * Activity related to repositories being added to a GitHub App installation. The type of activity is specified in the action property of the payload object. For more information, see the "GitHub App installation" REST API.
   *
   * Availability
   *   GitHub Apps
   */
  | "installation_repositories"
  /**
   * Activity related to an issue or pull request comment. The type of activity is specified in the action property of the payload object. For more information, see the "issue comments" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the issues permission
   */
  | "issue_comment"
  /**
   * Activity related to an issue. The type of activity is specified in the action property of the payload object. For more information, see the "issues" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the issues permission
   */
  | "issues"
  /**
   * Activity related to a label. The type of activity is specified in the action property of the payload object. For more information, see the "labels" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the metadata permission
   */
  | "label"
  /**
   * Activity related to a GitHub Marketplace purchase. The type of activity is specified in the action property of the payload object. For more information, see the "GitHub Marketplace."
   *
   * Availability
   *   GitHub Apps
   */
  | "marketplace_purchase"
  /**
   * Activity related to repository collaborators. The type of activity is specified in the action property of the payload object. For more information, see the "collaborators" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the members permission
   */
  | "member"
  /**
   * Activity related to team membership. The type of activity is specified in the action property of the payload object. For more information, see the "team members" REST API.
   *
   * Availability
   *   Organization webhooks
   *   GitHub Apps with the members permission
   */
  | "membership"
  /**
   * Note: The pull request merge queue feature is currently in limited public beta and subject to change.
   *
   * Activity related to merge groups in a merge queue. The type of activity is specified in the action property of the payload object.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the merge_queues permission
   */
  | "merge_group"
  /**
   * The webhook this event is configured on was deleted. This event will only listen for changes to the particular hook the event is installed on. Therefore, it must be selected for each hook that you'd like to receive meta events for.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   */
  | "meta"
  /**
   * Activity related to milestones. The type of activity is specified in the action property of the payload object. For more information, see the "milestones" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the pull_requests permission
   */
  | "milestone"
  /**
   * Activity related to an organization and its members. The type of activity is specified in the action property of the payload object. For more information, see the "organizations" REST API.
   *
   * Availability
   *   Organization webhooks only receive the deleted, added, removed, renamed, and invited events
   *   GitHub Apps with the members permission
   */
  | "organization"
  /**
   * Activity related to people being blocked in an organization. The type of activity is specified in the action property of the payload object. For more information, see the "blocking organization users" REST API.
   *
   * Availability
   *   Organization webhooks
   *   GitHub Apps with the organization_administration permission
   */
  | "org_block"
  /**
   * Activity related to GitHub Packages. The type of activity is specified in the action property of the payload object. For more information, see "Managing packages with GitHub Packages" to learn more about GitHub Packages.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   */
  | "package"
  /**
   * Represents an attempted build of a GitHub Pages site, whether successful or not. A push to a GitHub Pages enabled branch (gh-pages for project pages, the default branch for user and organization pages) triggers this event.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the pages permission
   */
  | "page_build"
  /**
   * When you create a new webhook, we'll send you a simple ping event to let you know you've set up the webhook correctly. This event isn't stored so it isn't retrievable via the Events API endpoint.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps receive a ping event with an app_id used to register the app
   */
  | "ping"
  /**
   * Activity related to classic projects. The type of activity is specified in the action property of the payload object. For more information, see the "projects" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the repository_projects or organization_projects permission
   *
   * Note: This event only occurs for projects (classic).
   */
  | "project"
  /**
   * Activity related to cards in a classic project. The type of activity is specified in the action property of the payload object. For more information, see the "project cards" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the repository_projects or organization_projects permission
   *
   * Note: This event only occurs for projects (classic).
   */
  | "project_card"
  /**
   * Activity related to columns in a classic project. The type of activity is specified in the action property of the payload object. For more information, see the "project columns" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the repository_projects or organization_projects permission
   *
   * Note: This event only occurs for projects (classic).
   */
  | "project_column"
  /**
   * Note: Webhook events for projects are currently in beta and subject to change. To share feedback about projects webhooks with GitHub, see the Projects webhook feedback discussion.
   *
   * Activity related to items in a project. The type of activity is specified in the action property of the payload object. For more information, see "About projects."
   *
   * Availability
   *   Organization webhooks
   *   GitHub Apps with the organization_projects permission
   */
  | "projects_v2_item"
  /**
   * When a private repository is made public. Without a doubt: the best GitHub event.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the metadata permission
   */
  | "public"
  /**
   * Activity related to pull requests. The type of activity is specified in the action property of the payload object. For more information, see the "pull requests" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the pull_requests permission
   */
  | "pull_request"
  /**
   * Activity related to pull request reviews. The type of activity is specified in the action property of the payload object. For more information, see the "pull request reviews" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the pull_requests permission
   */
  | "pull_request_review"
  /**
   * Activity related to pull request review comments in the pull request's unified diff. The type of activity is specified in the action property of the payload object. For more information, see the "pull request review comments" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the pull_requests permission
   */
  | "pull_request_review_comment"
  /**
   * Activity related to a comment thread on a pull request being marked as resolved or unresolved. The type of activity is specified in the action property of the payload object.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the pull_requests permission
   */
  | "pull_request_review_thread"
  /**
   * One or more commits are pushed to a repository branch or tag.
   *
   * Note: You will not receive a webhook for this event when you push more than three tags at once.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the contents permission
   */
  | "push"
  /**
   * Activity related to a release. The type of activity is specified in the action property of the payload object. For more information, see the "releases" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the contents permission
   */
  | "release"
  /**
   * This event occurs when a GitHub App sends a POST request to the "Create a repository dispatch event" endpoint.
   *
   * Availability
   *   GitHub Apps must have the contents permission to receive this webhook.
   */
  | "repository_dispatch"
  /**
   * Activity related to a repository. The type of activity is specified in the action property of the payload object. For more information, see the "repositories" REST API.
   *
   * Availability
   *   Repository webhooks receive all event types except deleted
   *   Organization webhooks
   *   GitHub Apps with the metadata permission receive all event types except deleted
   */
  | "repository"
  /**
   * Activity related to a repository being imported to GitHub. The type of activity is specified in the action property of the payload object. For more information, see the "source imports" REST API. To receive this event for a personal repository, you must create an empty repository prior to the import. This event can be triggered using either the GitHub Importer or the Source imports API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   */
  | "repository_import"
  /**
   * Activity related to security vulnerability alerts in a repository. The type of activity is specified in the action property of the payload object. For more information, see the "About Dependabot alerts".
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   */
  | "repository_vulnerability_alert"
  /**
   * Activity related to a security advisory that has been reviewed by GitHub. A GitHub-reviewed security advisory provides information about security-related vulnerabilities in software on GitHub.
   *
   * The security advisory dataset also powers the GitHub Dependabot alerts. For more information, see "About Dependabot alerts."
   *
   * Availability
   *   GitHub Apps with the security_events permission
   */
  | "security_advisory"
  /**
   * Activity related to a sponsorship listing. The type of activity is specified in the action property of the payload object. For more information, see "About GitHub Sponsors".
   *
   * You can only create a sponsorship webhook on GitHub. For more information, see "Configuring webhooks for events in your sponsored account".
   *
   * Availability
   *   Sponsored accounts
   */
  | "sponsorship"
  /**
   * Activity related to a repository being starred. The type of activity is specified in the action property of the payload object. For more information, see the "starring" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   */
  | "star"
  /**
   * When the status of a Git commit changes. For more information, see the "statuses" REST API.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the statuses permission
   */
  | "status"
  /**
   * Activity related to an organization's team. The type of activity is specified in the action property of the payload object. For more information, see the "teams" REST API.
   *
   * Availability
   *   Organization webhooks
   *   GitHub Apps with the members permission
   */
  | "team"
  /**
   * When a repository is added to a team.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the members permission
   */
  | "team_add"
  /**
   * When someone stars a repository. The type of activity is specified in the action property of the payload object. For more information, see the "starring" REST API.
   *
   * The event’s actor is the user who starred a repository, and the event’s repository is the repository that was starred.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the metadata permission
   */
  | "watch"
  /**
   * This event occurs when someone triggers a workflow run on GitHub or sends a POST request to the "Create a workflow dispatch event" endpoint. For more information, see "Events that trigger workflows."
   *
   * Availability
   *   GitHub Apps must have the contents permission to receive this webhook.
   */
  | "workflow_dispatch"
  /**
   * A GitHub Actions workflow job has been queued, is in progress, or has been completed on a repository. The type of activity is specified in the action property of the payload object.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   Enterprise webhooks
   */
  | "workflow_job"
  /**
   * When a GitHub Actions workflow run is requested or completed. For more information, see "Events that trigger workflows."
   *
   * Availability
   *   GitHub Apps with the actions or contents permissions.
   */
  | "workflow_run";

export default WebhookEvent;
