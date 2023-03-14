import {
  AuthConnectorProps,
  HttpProxyResponse,
  RestConnector,
  WebhookDeliveryData,
} from "@runlightyear/lightyear";
import createGist, { CreateGistProps } from "./gists/createGist";
import createIssue, { CreateIssueProps } from "./issues/createIssue";
import updateIssue, { UpdateIssueProps } from "./issues/updateIssue";
import createPullRequest, {
  CreatePullRequestProps,
} from "./pulls/createPullRequest";
import createReviewCommentForPullRequest, {
  CreatePullRequestCommentProps,
} from "./pulls/createReviewCommentForPullRequest";
import updatePullRequest, {
  UpdatePullRequestProps,
} from "./pulls/updatePullRequest";
import downloadRepoArchiveTar, {
  DownloadRepoArchiveTarProps,
} from "./repositories/contents/downloadRepoArchiveTar";
import downloadRepoArchiveZip, {
  DownloadRepoArchiveZipProps,
} from "./repositories/contents/downloadRepoArchiveZip";
import createRepositoryWebhook, {
  CreateRepositoryWebhookProps,
} from "./webhooks/repositoryWebhooks/createRepositoryWebhook";
import getRepositoryWebhook, {
  GetRepositoryWebhookProps,
} from "./webhooks/repositoryWebhooks/getRepositoryWebhook";
import listRepositoryWebhooks, {
  ListRepositoryWebhooksProps,
} from "./webhooks/repositoryWebhooks/listRepositoryWebhooks";
import listRepositoriesForUser, {
  ListRepositoriesForUserProps,
} from "./repositories/listRepositoriesForUser";
import listOrganizationRepositories, {
  ListOrganizationRepositoriesProps,
} from "./repositories/listOrganizationRepositories";
import listRepositoriesForAuthenticatedUser, {
  ListRepositoriesForAuthenticatedUserProps,
} from "./repositories/listRepositoriesForAuthenticatedUser";
import updateRepositoryWebhook, {
  UpdateRepositoryWebhookProps,
} from "./webhooks/repositoryWebhooks/updateRepositoryWebhook";
import deleteRepositoryWebhook, {
  DeleteRepositoryWebhookProps,
} from "./webhooks/repositoryWebhooks/deleteRepositoryWebhook";
import pingRepositoryWebhook, {
  PingRepositoryWebhookProps,
} from "./webhooks/repositoryWebhooks/pingRepositoryWebhook";
import testPushRepositoryWebhook, {
  TestPushRepositoryWebhookProps,
} from "./webhooks/repositoryWebhooks/testPushRepositoryWebhook";
import pullRequestPayload from "./webhooks/payloads/pullRequestPayload";
import pullRequestReviewPayload from "./webhooks/payloads/pullRequestReviewPayload";
import workflowRunPayload from "./webhooks/payloads/workflowRunPayload";
import pingPayload from "./webhooks/payloads/pingPayload";
import isWebhookEventType from "./webhooks/webhookEventType";
import pushPayload from "./webhooks/payloads/pushPayload";
import WebhookEvent from "./types/WebhookEvent";
import defineGitHubWebhook, {
  DefineGitHubWebhookProps,
} from "./webhooks/defineGitHubWebhook";
import {
  createIssueComment,
  CreateIssueCommentProps,
} from "./issues/createIssueComment";
import {
  searchIssuesAndPullRequests,
  SearchIssuesAndPullRequestsProps,
} from "./search/searchIssuesAndPullRequests";
import {
  searchRepositories,
  SearchRepositoriesProps,
} from "./search/searchRepositories";
import { searchUsers, SearchUsersProps } from "./search/searchUsers";
import { createPayload } from "./webhooks/payloads/createPayload";
import { deletePayload } from "./webhooks/payloads/deletePayload";
import { issuesPayload } from "./webhooks/payloads/issuesPayload";
import { commitCommentPayload } from "./webhooks/payloads/commitCommentPayload";
import { issueCommentPayload } from "./webhooks/payloads/issueCommentPayload";
import { labelPayload } from "./webhooks/payloads/labelPayload";
import { memberPayload } from "./webhooks/payloads/memberPayload";
import { repositoryPayload } from "./webhooks/payloads/repositoryPayload";
import { statusPayload } from "./webhooks/payloads/statusPayload";
import workflowDispatchPayload from "./webhooks/payloads/workflowDispatchPayload";
import workflowJobPayload from "./webhooks/payloads/workflowJobPayload";

export interface GitHubConnectorProps extends AuthConnectorProps {}

export interface GitHubDefineAuthProps {
  /**
   * The name of the auth
   */
  name: string;
}

/**
 * @beta
 *
 * Connector to the GitHub API
 *
 * @example Import
 * ```typescript
 * import { GitHub } from "@runlightyear/github"
 * ```
 *
 * @example Use in an action
 * ```typescript
 * defineAction({
 *   name: "githubExample",
 *   title: "GitHub Example",
 *   apps: ["github"],
 *   run: ({ auths }) => {
 *     const github = new GitHub({ auth: auths.github });
 *   }
 * })
 * ```
 *
 * @example Create an issue
 * ```typescript
 * await github.createIssue({
 *   owner: "<owner>",
 *   repo: "<repo name>",
 *   title: "New Issue",
 * })
 * ```
 *
 * @example Subscribe to push events
 * ```typescript
 * GitHub.defineWebhook({
 *   name: "githubPushes",
 *   title: "GitHub Pushes",
 *   subscribeProps: () => {
 *     return {
 *       owner: "<owner>",
 *       repo: "<repo name>",
 *       events: ["push"],
 *     }
 *   },
 * });
 *
 * ``` */
export class GitHub extends RestConnector {
  /**
   * @example
   * ```typescript
   * defineAction({
   *   name: "githubExample",
   *   title: "GitHub Example",
   *   apps: ["github"],
   *   run: ({ auths }) => {
   *     const github = new GitHub({ auth: auths.github });
   *   }
   * })
   * ```
   *
   * @param props
   */
  constructor(props: GitHubConnectorProps) {
    super({ ...props, baseUrl: "https://api.github.com" });
  }

  /**
   * @internal
   */
  authorizationHeaders(): { [p: string]: string } {
    const { accessToken } = this.getAuthData();

    return {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
    };
  }

  /**
   * Create a gist
   *
   * @group Gist
   *
   * Allows you to add a new gist with one or more files.
   *
   * Note: Don't name your files "gistfile" with a numerical suffix. This is the format of the automatic naming scheme that Gist uses internally.
   *
   * @param props props
   */
  async createGist(props: CreateGistProps): Promise<HttpProxyResponse> {
    return createGist(this)(props);
  }

  /**
   * Create an issue
   *
   * @group Issue
   *
   * Any user with pull access to a repository can create an issue. If issues are disabled in the repository, the API returns a 410 Gone status.
   *
   * This endpoint triggers notifications. Creating content too quickly using this endpoint may result in secondary rate limiting. See "Secondary rate limits" and "Dealing with secondary rate limits" for details.
   *
   * @param props props
   */
  async createIssue(props: CreateIssueProps): Promise<HttpProxyResponse> {
    return createIssue(this)(props);
  }

  /**
   * Update an issue
   *
   * @group Issue
   *
   * Issue owners and users with push access can edit an issue.
   *
   * @param props props
   */
  async updateIssue(props: UpdateIssueProps): Promise<HttpProxyResponse> {
    return updateIssue(this)(props);
  }

  /**
   * Create an issue comment
   *
   * @group Issue
   *
   * You can use the REST API to create comments on issues and pull requests. Every pull request is an issue, but not every issue is a pull request.
   *
   * This endpoint triggers notifications. Creating content too quickly using this endpoint may result in secondary rate limiting. See "Secondary rate limits" and "Dealing with secondary rate limits" for details.
   *
   * @param props
   */
  async createIssueComment(props: CreateIssueCommentProps) {
    return createIssueComment(this)(props);
  }

  /**
   * Create a pull request
   *
   * @group Pull Request
   *
   * Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see GitHub's products in the GitHub Help documentation.
   *
   * To open or update a pull request in a public repository, you must have write access to the head or the source branch. For organization-owned repositories, you must be a member of the organization that owns the repository to open or update a pull request.
   *
   * This endpoint triggers notifications. Creating content too quickly using this endpoint may result in secondary rate limiting. See "Secondary rate limits" and "Dealing with secondary rate limits" for details.
   *
   * @param props props
   */
  async createPullRequest(
    props: CreatePullRequestProps
  ): Promise<HttpProxyResponse> {
    return createPullRequest(this)(props);
  }

  /**
   * Create a review comment for a pull request
   *
   * @group Pull Request
   *
   * Creates a review comment in the pull request diff. To add a regular comment to a pull request timeline, see "Create an issue comment." We recommend creating a review comment using line, side, and optionally start_line and start_side if your comment applies to more than one line in the pull request diff.
   *
   * The position parameter is deprecated. If you use position, the line, side, start_line, and start_side parameters are not required.
   *
   * Note: The position value equals the number of lines down from the first "@@" hunk header in the file you want to add a comment. The line just below the "@@" line is position 1, the next line is position 2, and so on. The position in the diff continues to increase through lines of whitespace and additional hunks until the beginning of a new file.
   *
   * This endpoint triggers notifications. Creating content too quickly using this endpoint may result in secondary rate limiting. See "Secondary rate limits" and "Dealing with secondary rate limits" for details.
   *
   * @param props props
   */
  async createReviewCommentForPullRequest(
    props: CreatePullRequestCommentProps
  ) {
    return createReviewCommentForPullRequest(this)(props);
  }

  /**
   * Update a pull request
   *
   * @group Pull Request
   *
   * Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see GitHub's products in the GitHub Help documentation.
   *
   * To open or update a pull request in a public repository, you must have write access to the head or the source branch. For organization-owned repositories, you must be a member of the organization that owns the repository to open or update a pull request.
   *
   * @param props props
   */
  async updatePullRequest(props: UpdatePullRequestProps) {
    return updatePullRequest(this)(props);
  }

  /**
   * List organization repositories
   *
   * @group Repository
   *
   * Lists repositories for the specified organization.
   *
   * @param props props
   */
  async listOrganizationRepositories(props: ListOrganizationRepositoriesProps) {
    return listOrganizationRepositories(this)(props);
  }

  /**
   * List repositories for the authenticated user
   *
   * @group Repository
   *
   * Lists repositories that the authenticated user has explicit permission (:read, :write, or :admin) to access.
   *
   * The authenticated user has explicit permission to access repositories they own, repositories where they are a collaborator, and repositories that they can access through an organization membership.
   *
   * @param props props
   */
  async listRepositoriesForAuthenticatedUser(
    props: ListRepositoriesForAuthenticatedUserProps
  ) {
    return listRepositoriesForAuthenticatedUser(this)(props);
  }

  /**
   * List repositories for a user
   *
   * @group Repository
   *
   * Lists public repositories for the specified user. Note: For GitHub AE, this endpoint will list internal repositories for the specified user.
   *
   * @param props props
   */
  async listRepositoriesForUser(props: ListRepositoriesForUserProps) {
    return listRepositoriesForUser(this)(props);
  }

  /**
   * Download a repository archive (tar)
   *
   * @group Repository Content
   *
   * Gets a redirect URL to download a tar archive for a repository. If you omit :ref, the repository’s default branch (usually master) will be used. Please make sure your HTTP framework is configured to follow redirects or you will need to use the Location header to make a second GET request.
   *
   * Note: For private repositories, these links are temporary and expire after five minutes.
   *
   * @param props props
   */
  async downloadRepoArchiveTar(props: DownloadRepoArchiveTarProps) {
    return downloadRepoArchiveTar(this)(props);
  }

  /**
   * Download a repository archive (zip)
   *
   * @group Repository Content
   *
   * Gets a redirect URL to download a zip archive for a repository. If you omit :ref, the repository’s default branch (usually master) will be used. Please make sure your HTTP framework is configured to follow redirects or you will need to use the Location header to make a second GET request.
   *
   * Note: For private repositories, these links are temporary and expire after five minutes. If the repository is empty, you will receive a 404 when you follow the redirect.
   *
   * @param props props
   */
  async downloadRepoArchiveZip(props: DownloadRepoArchiveZipProps) {
    return downloadRepoArchiveZip(this)(props);
  }

  /**
   * Search issues and pull requests
   *
   * @group Search
   *
   * Find issues by state and keyword. This method returns up to 100 results per page.
   *
   * When searching for issues, you can get text match metadata for the issue title, issue body, and issue comment body fields when you pass the text-match media type. For more details about how to receive highlighted search results, see Text match metadata.
   *
   * For example, if you want to find the oldest unresolved Python bugs on Windows. Your query might look something like this.
   *
   * q=windows+label:bug+language:python+state:open&sort=created&order=asc
   *
   * This query searches for the keyword windows, within any open issue that is labeled as bug. The search runs across repositories whose primary language is Python. The results are sorted by creation date in ascending order, which means the oldest issues appear first in the search results.
   *
   * Note: For user-to-server GitHub App requests, you can't retrieve a combination of issues and pull requests in a single query. Requests that don't include the is:issue or is:pull-request qualifier will receive an HTTP 422 Unprocessable Entity response. To get results for both issues and pull requests, you must send separate queries for issues and pull requests. For more information about the is qualifier, see "Searching only issues or pull requests."
   */
  async searchIssuesAndPullRequests(props: SearchIssuesAndPullRequestsProps) {
    return searchIssuesAndPullRequests(this)(props);
  }

  /**
   * Search repositories
   *
   * @group Search
   *
   * Find repositories via various criteria. This method returns up to 100 results per page.
   *
   * When searching for repositories, you can get text match metadata for the name and description fields when you pass the text-match media type. For more details about how to receive highlighted search results, see Text match metadata.
   *
   * For example, if you want to search for popular Tetris repositories written in assembly code, your query might look like this:
   *
   * q=tetris+language:assembly&sort=stars&order=desc
   *
   * This query searches for repositories with the word tetris in the name, the description, or the README. The results are limited to repositories where the primary language is assembly. The results are sorted by stars in descending order, so that the most popular repositories appear first in the search results.
   */
  async searchRepositories(props: SearchRepositoriesProps) {
    return searchRepositories(this)(props);
  }

  /**
   * Search users
   *
   * @group Search
   *
   * Find users via various criteria. This method returns up to 100 results per page.
   *
   * When searching for users, you can get text match metadata for the issue login, public email, and name fields when you pass the text-match media type. For more details about highlighting search results, see Text match metadata. For more details about how to receive highlighted search results, see Text match metadata.
   *
   * For example, if you're looking for a list of popular users, you might try this query:
   *
   * q=tom+repos:%3E42+followers:%3E1000
   *
   * This query searches for users with the name tom. The results are restricted to users with more than 42 repositories and over 1,000 followers.
   */
  async searchUsers(props: SearchUsersProps) {
    return searchUsers(this)(props);
  }

  /**
   * Define a GitHub repository webhook
   *
   * @group Webhook
   *
   * @example Subscribe to push events
   * ```typescript
   * GitHub.defineWebhook({
   *   name: "githubPushes",
   *   title: "GitHub Pushes",
   *   subscribeProps: () => {
   *     return {
   *       owner: "<owner>",
   *       repo: "<repo>",
   *       events: ["push"],
   *     }
   *   },
   * });
   * ```
   */
  static defineWebhook(props: DefineGitHubWebhookProps) {
    return defineGitHubWebhook(props);
  }

  /**
   * List repository webhooks
   *
   * @group Webhook
   *
   * Lists webhooks for a repository. last response may return null if there have not been any deliveries within 30 days.
   *
   * @param props props
   */
  async listRepositoryWebhooks(props: ListRepositoryWebhooksProps) {
    return listRepositoryWebhooks(this)(props);
  }

  /**
   * Create a repository webhook
   *
   * @group Webhook
   *
   * Repositories can have multiple webhooks installed. Each webhook should have a unique config. Multiple webhooks can share the same config as long as those webhooks do not have any events that overlap.
   *
   * @param props props
   */
  async createRepositoryWebhook(props: CreateRepositoryWebhookProps) {
    return createRepositoryWebhook(this)(props);
  }

  /**
   * Get a repository webhook
   *
   * @group Webhook
   *
   * Returns a webhook configured in a repository.
   *
   * @param props props
   */
  async getRepositoryWebhook(props: GetRepositoryWebhookProps) {
    return getRepositoryWebhook(this)(props);
  }

  /**
   * Update a repository webhook
   *
   * @group Webhook
   *
   * Updates a webhook configured in a repository. If you previously had a secret set, you must provide the same secret or set a new secret or the secret will be removed.
   *
   * @param props props
   */
  async updateRepositoryWebhook(props: UpdateRepositoryWebhookProps) {
    return updateRepositoryWebhook(this)(props);
  }

  /**
   * Delete a repository webhook
   *
   * @group Webhook
   *
   * @param props props
   */
  async deleteRepositoryWebhook(props: DeleteRepositoryWebhookProps) {
    return deleteRepositoryWebhook(this)(props);
  }

  /**
   * Ping a repository webhook
   *
   * @group Webhook
   *
   * This will trigger a ping event to be sent to the hook.
   *
   * @param props props
   */
  async pingRepositoryWebhook(props: PingRepositoryWebhookProps) {
    return pingRepositoryWebhook(this)(props);
  }

  /**
   * Test the push repository webhook
   *
   * @group Webhook
   *
   * This will trigger the hook with the latest push to the current repository if the hook is subscribed to push events. If the hook is not subscribed to push events, the server will respond with 204 but no test POST will be generated.
   *
   * @param props props
   */
  async testPushRepositoryWebhook(props: TestPushRepositoryWebhookProps) {
    return testPushRepositoryWebhook(this)(props);
  }

  /**
   * Verify type of webhook event
   *
   * @internal
   */
  static isWebhookEventType(
    expectedEvent: WebhookEvent,
    deliveryData: WebhookDeliveryData
  ) {
    return isWebhookEventType(expectedEvent, deliveryData);
  }

  /**
   * Commit Comment Payload
   *
   * @group Webhook Payload
   *
   * This event occurs when there is activity relating to commit comments. For more information about commit comments, see "Commenting on a pull request." For information about the APIs to manage commit comments, see the GraphQL API documentation or "Commit comments" in the REST API documentation.
   *
   * For activity relating to comments on pull request reviews, use the pull_request_review_comment event. For activity relating to issue comments, use the issue_comment event. For activity relating to discussion comments, use the discussion_comment event.
   *
   * To subscribe to this event, a GitHub App must have at least read-level access for the "Contents" repository permission.
   *
   * Availability for commit_comment
   * Repositories
   * Organizations
   * GitHub Apps
   */
  static commitCommentPayload(data: WebhookDeliveryData) {
    return commitCommentPayload(data);
  }

  /**
   * Create Payload
   *
   * @group Webhook Payload
   *
   * This event occurs when a Git branch or tag is created.
   *
   * To subscribe to this event, a GitHub App must have at least read-level access for the "Contents" repository permission.
   *
   * Note: This event will not occur when more than three tags are created at once.
   */
  static createPayload(data: WebhookDeliveryData) {
    return createPayload(data);
  }

  /**
   * Delete Payload
   *
   * @group Webhook Payload
   *
   * This event occurs when a Git branch or tag is deleted.
   *
   * To subscribe to this event, a GitHub App must have at least read-level access for the "Contents" repository permission.
   *
   * Note: This event will not occur when more than three tags are deleted at once.
   *
   * @param data
   */
  static deletePayload(data: WebhookDeliveryData) {
    return deletePayload(data);
  }

  /**
   * Issue Comment Payload
   *
   * @group Webhook Payload
   *
   * This event occurs when there is activity relating to a comment on an issue or pull request. For more information about issues and pull requests, see "About issues" and "About pull requests." For information about the APIs to manage issue comments, see the GraphQL documentation or "Issue comments" in the REST API documentation.
   *
   * For activity relating to an issue as opposed to comments on an issue, use the issue event. For activity related to pull request reviews or pull request review comments, use the pull_request_review or pull_request_review_comment events. For more information about the different types of pull request comments, see "Working with comments."
   *
   * To subscribe to this event, a GitHub App must have at least read-level access for the "Issues" or "Pull requests" repository permissions.
   *
   * @param data
   */
  static issueCommentPayload(data: WebhookDeliveryData) {
    return issueCommentPayload(data);
  }

  /**
   * Issues Payload
   *
   * @group Webhook Payload
   *
   * This event occurs when there is activity relating to an issue. For more information about issues, see "About issues." For information about the APIs to manage issues, see the GraphQL documentation or "Issues" in the REST API documentation.
   *
   * For activity relating to a comment on an issue, use the issue_comment event.
   *
   * To subscribe to this event, a GitHub App must have at least read-level access for the "Issues" repository permission.
   *
   * @param data
   */
  static issuesPayload(data: WebhookDeliveryData) {
    return issuesPayload(data);
  }

  /**
   * Label Payload
   *
   * @group Webhook Payload
   *
   * This event occurs when there is activity relating to labels. For more information, see "Managing labels." For information about the APIs to manage labels, see the GraphQL documentation or "Labels" in the REST API documentation.
   *
   * If you want to receive an event when a label is added to or removed from an issue, pull request, or discussion, use the labeled or unlabeled action type for the issues, pull_request, or discussion events instead.
   *
   * To subscribe to this event, a GitHub App must have at least read-level access for the "Metadata" repository permission.
   *
   * @param data
   */
  static labelPayload(data: WebhookDeliveryData) {
    return labelPayload(data);
  }

  /**
   * Member Payload
   *
   * @group Webhook Payload
   *
   * This event occurs when there is activity relating to collaborators in a repository. For more information, see "Adding outside collaborators to repositories in your organization." For more information about the API to manage repository collaborators, see the GraphQL API documentation or "Collaborators" in the REST API documentation.
   *
   * To subscribe to this event, a GitHub App must have at least read-level access for the "Members" organization permission.
   *
   * @param data
   */
  static memberPayload(data: WebhookDeliveryData) {
    return memberPayload(data);
  }

  /**
   * Ping Payload
   *
   * @group Webhook Payload
   *
   * Verifies data contains a ping payload.
   *
   * When you create a new webhook, we'll send you a simple ping event to let you know you've set up the webhook correctly. This event isn't stored so it isn't retrievable via the Events API endpoint.
   *
   * @param data webhook delivery data
   */
  static pingPayload(data: WebhookDeliveryData) {
    return pingPayload(data);
  }

  /**
   * Pull Request Payload
   *
   * @group Webhook Payload
   *
   * Verifies data contains a pull request payload
   *
   * Activity related to pull requests. The type of activity is specified in the action property of the payload object.
   *
   * @param data webhook delivery data
   */
  static pullRequestPayload(data: WebhookDeliveryData) {
    return pullRequestPayload(data);
  }

  /**
   * Pull Request Review Payload
   *
   * @group Webhook Payload
   *
   * Activity related to pull request reviews. The type of activity is specified in the action property of the payload object.
   *
   * @param data webhook delivery data
   */
  static pullRequestReviewPayload(data: WebhookDeliveryData) {
    return pullRequestReviewPayload(data);
  }

  /**
   * Push Payload
   *
   * @group Webhook Payload
   *
   * One or more commits are pushed to a repository branch or tag.
   *
   * Note: You will not receive a webhook for this event when you push more than three tags at once.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the contents permission
   *
   * @param data webhook delivery data
   */
  static pushPayload(data: WebhookDeliveryData) {
    return pushPayload(data);
  }

  /**
   * Repository Payload
   *
   * @group Webhook Payload
   *
   * This event occurs when there is activity relating to repositories. For more information, see "About repositories." For information about the APIs to manage repositories, see the GraphQL documentation or "Repositories" in the REST API documentation.
   *
   * To subscribe to this event, a GitHub App must have at least read-level access for the "Metadata" repository permission.
   */
  static repositoryPayload(data: WebhookDeliveryData) {
    return repositoryPayload(data);
  }

  /**
   * Status Payload
   *
   * @group Webhook Payload
   *
   * This event occurs when the status of a Git commit changes. For example, commits can be marked as error, failure, pending, or success. For more information, see "About status checks." For information about the APIs to manage commit statuses, see the GraphQL documentation or "Statuses" in the REST API documentation.
   *
   * To subscribe to this event, a GitHub App must have at least read-level access for the "Commit statuses" repository permission.
   */
  static statusPayload(data: WebhookDeliveryData) {
    return statusPayload(data);
  }

  /**
   * Workflow Dispatch Payload
   *
   * @group Webhook Payload
   *
   * This event occurs when a GitHub Actions workflow is manually triggered. For more information, see "Manually running a workflow."
   *
   * For activity relating to workflow runs, use the workflow_run event.
   *
   * To subscribe to this event, a GitHub App must have at least read-level access for the "Contents" repository permission.
   */
  static workflowDispatchPayload(data: WebhookDeliveryData) {
    return workflowDispatchPayload(data);
  }

  /**
   * Workflow Job Payload
   *
   * @group Webhook Payload
   *
   * This event occurs when there is activity relating to a job in a GitHub Actions workflow. For more information, see "Using jobs in a workflow." For information about the API to manage workflow jobs, see "Workflow jobs" in the REST API documentation.
   *
   * For activity relating to a workflow run instead of a job in a workflow run, use the workflow_run event.
   *
   * To subscribe to this event, a GitHub App must have at least read-level access for the "Actions" repository permission.
   */
  static workflowJobPayload(data: WebhookDeliveryData) {
    return workflowJobPayload(data);
  }

  /**
   * Workflow Run Payload
   *
   * @group Webhook Payload
   *
   * This event occurs when there is activity relating to a run of a GitHub Actions workflow. For more information, see "About workflows." For information about the APIs to manage workflow runs, see the GraphQL documentation or "Workflow runs" in the REST API documentation.
   *
   * For activity relating to a job in a workflow run, use the workflow_job event.
   *
   * To subscribe to this event, a GitHub App must have at least read-level access for the "Actions" repository permission.
   */
  static workflowRunPayload(data: WebhookDeliveryData) {
    return workflowRunPayload(data);
  }
}
