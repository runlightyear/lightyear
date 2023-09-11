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
import isWebhookEventType from "./webhooks/webhookEventType";
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
import {
  asCommitCommentPayload,
  CommitCommentPayload,
} from "./webhooks/payloads/asCommitCommentPayload";
import {
  asCreatePayload,
  CreatePayload,
} from "./webhooks/payloads/asCreatePayload";
import {
  asDeletePayload,
  DeletePayload,
} from "./webhooks/payloads/asDeletePayload";
import {
  asIssueCommentPayload,
  IssueCommentPayload,
} from "./webhooks/payloads/asIssueCommentPayload";
import {
  asIssuesPayload,
  IssuesPayload,
} from "./webhooks/payloads/asIssuesPayload";
import {
  asLabelPayload,
  LabelPayload,
} from "./webhooks/payloads/asLabelPayload";
import {
  asMemberPayload,
  MemberPayload,
} from "./webhooks/payloads/asMemberPayload";
import { asPingPayload } from "./webhooks/payloads/asPingPayload";
import {
  asPullRequestPayload,
  PullRequestPayload,
} from "./webhooks/payloads/asPullRequestPayload";
import {
  asPullRequestReviewPayload,
  PullRequestReviewPayload,
} from "./webhooks/payloads/asPullRequestReviewPayload";
import { asPushPayload, PushPayload } from "./webhooks/payloads/asPushPayload";
import {
  asRepositoryPayload,
  RepositoryPayload,
} from "./webhooks/payloads/asRepositoryPayload";
import {
  asStatusPayload,
  StatusPayload,
} from "./webhooks/payloads/asStatusPayload";
import {
  asWorkflowDispatchPayload,
  WorkflowDispatchPayload,
} from "./webhooks/payloads/asWorkflowDispatchPayload";
import {
  asWorkflowJobPayload,
  WorkflowJobPayload,
} from "./webhooks/payloads/asWorkflowJobPayload";
import {
  asWorkflowRunPayload,
  WorkflowRunPayload,
} from "./webhooks/payloads/asWorkflowRunPayload";
import {
  compareTwoCommits,
  CompareTwoCommitsProps,
} from "./commits/compareTwoCommits";
import { GitHubListenerProps } from "./listeners/createListener";
import { onCreate } from "./listeners/onCreate";
import { onIssues } from "./listeners/onIssues";
import { onWorkflowRun } from "./listeners/onWorkflowRun";
import {
  matchAllCommits,
  MatchAllCommitsProps,
} from "./helpers/matchAllCommits";
import { onCommitComment } from "./listeners/onCommitComment";
import { onDelete } from "./listeners/onDelete";
import { onLabel } from "./listeners/onLabel";
import { onMember } from "./listeners/onMember";
import { onPullRequest } from "./listeners/onPullRequest";
import { onPullRequestReview } from "./listeners/onPullRequestReview";
import { onRepository } from "./listeners/onRepository";
import { onStatus } from "./listeners/onStatus";
import { onWorkflowDispatch } from "./listeners/onWorkflowDispatch";
import { onWorkflowJob } from "./listeners/onWorkflowJob";
import { onPush } from "./listeners/onPush";
import { onIssueComment } from "./listeners/onIssueComment";

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
   * Compare two commits
   *
   * @group Commit
   *
   * @param props
   */
  async compareTwoCommits(props: CompareTwoCommitsProps) {
    return compareTwoCommits(this)(props);
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
   * Match all commits
   *
   * @group Helper
   *
   * @example Match Linear identifiers in an array of commits
   * ```typescript
   * const response = await github.compareTwoCommits({
   *   owner: "<owner>",
   *   repo: "<repo>",
   *   basehead: `${prevCommitId}...${newCommitId}`,
   * });
   *
   * const { commits } = response.data;
   *
   * const matches = GitHub.matchAllCommits({ regex: /ENG-[0-9]+/, commits });
   * ```
   */
  static matchAllCommits(props: MatchAllCommitsProps) {
    return matchAllCommits(props);
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
    props?: ListRepositoriesForAuthenticatedUserProps
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
  static asCommitCommentPayload(data: WebhookDeliveryData) {
    return asCommitCommentPayload(data);
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
  static asCreatePayload(data: WebhookDeliveryData) {
    return asCreatePayload(data);
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
  static asDeletePayload(data: WebhookDeliveryData) {
    return asDeletePayload(data);
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
  static asIssueCommentPayload(data: WebhookDeliveryData) {
    return asIssueCommentPayload(data);
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
  static asIssuesPayload(data: WebhookDeliveryData) {
    return asIssuesPayload(data);
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
  static asLabelPayload(data: WebhookDeliveryData) {
    return asLabelPayload(data);
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
  static asMemberPayload(data: WebhookDeliveryData) {
    return asMemberPayload(data);
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
  static asPingPayload(data: WebhookDeliveryData) {
    return asPingPayload(data);
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
  static asPullRequestPayload(data: WebhookDeliveryData) {
    return asPullRequestPayload(data);
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
  static asPullRequestReviewPayload(data: WebhookDeliveryData) {
    return asPullRequestReviewPayload(data);
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
  static asPushPayload(data: WebhookDeliveryData) {
    return asPushPayload(data);
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
  static asRepositoryPayload(data: WebhookDeliveryData) {
    return asRepositoryPayload(data);
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
  static asStatusPayload(data: WebhookDeliveryData) {
    return asStatusPayload(data);
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
  static asWorkflowDispatchPayload(data: WebhookDeliveryData) {
    return asWorkflowDispatchPayload(data);
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
  static asWorkflowJobPayload(data: WebhookDeliveryData) {
    return asWorkflowJobPayload(data);
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
  static asWorkflowRunPayload(data: WebhookDeliveryData) {
    return asWorkflowRunPayload(data);
  }

  /**
   * This event occurs when there is activity relating to commit comments.
   *
   * For activity relating to comments on pull request reviews, use the pull_request_review_comment event. For activity relating to issue comments, use the issue_comment event. For activity relating to discussion comments, use the discussion_comment event.
   *
   * @group Listener
   *
   * @param props
   */
  static onCommitComment(props: GitHubListenerProps<CommitCommentPayload>) {
    return onCommitComment(props);
  }

  /**
   * This event occurs when a Git branch or tag is created.
   *
   * Note: This event will not occur when more than three tags are created at once.
   *
   * @group Listener
   *
   * @param props
   */
  static onCreate(props: GitHubListenerProps<CreatePayload>) {
    return onCreate(props);
  }

  /**
   * This event occurs when a Git branch or tag is deleted.
   *
   * Note: This event will not occur when more than three tags are deleted at once.
   *
   * @group Listener
   *
   * @param props
   */
  static onDelete(props: GitHubListenerProps<DeletePayload>) {
    return onDelete(props);
  }

  /**
   * This event occurs when there is activity relating to a comment on an issue or pull request.
   *
   * For activity relating to an issue as opposed to comments on an issue, use the issue event. For activity related to pull request reviews or pull request review comments, use the pull_request_review or pull_request_review_comment events. For more information about the different types of pull request comments, see "Working with comments."
   *
   * @group Listener
   *
   * @param props
   */
  static onIssueComment(props: GitHubListenerProps<IssueCommentPayload>) {
    return onIssueComment(props);
  }

  /**
   * This event occurs when there is activity relating to an issue.
   *
   * For activity relating to a comment on an issue, use the issue_comment event.
   *
   * @group Listener
   *
   * @param props
   */
  static onIssues(props: GitHubListenerProps<IssuesPayload>) {
    return onIssues(props);
  }

  /**
   * This event occurs when there is activity relating to labels.
   *
   * If you want to receive an event when a label is added to or removed from an issue, pull request, or discussion, use the labeled or unlabeled action type for the issues, pull_request, or discussion events instead.
   *
   * @group Listener
   *
   * @param props
   */
  static onLabel(props: GitHubListenerProps<LabelPayload>) {
    return onLabel(props);
  }

  /**
   * This event occurs when there is activity relating to collaborators in a repository.
   *
   * @group Listener
   *
   * @param props
   */
  static onMember(props: GitHubListenerProps<MemberPayload>) {
    return onMember(props);
  }

  /**
   * On Pull Request
   *
   * @group Listener
   *
   * @param props
   */
  static onPullRequest(props: GitHubListenerProps<PullRequestPayload>) {
    return onPullRequest(props);
  }

  /**
   * This event occurs when there is activity on a pull request.
   *
   * For activity related to pull request reviews, pull request review comments, pull request comments, or pull request review threads, use the pull_request_review, pull_request_review_comment, issue_comment, or pull_request_review_thread events instead.
   *
   * @group Listener
   *
   * @param props
   */
  static onPullRequestReview(
    props: GitHubListenerProps<PullRequestReviewPayload>
  ) {
    return onPullRequestReview(props);
  }

  /**
   * This event occurs when a commit or tag is pushed.
   *
   * Note: An event will not be created when more than three tags are pushed at once.
   *
   * @group Listener
   *
   * @param props
   */
  static onPush(props: GitHubListenerProps<PushPayload>) {
    return onPush(props);
  }

  /**
   * This event occurs when there is activity relating to repositories.
   *
   * @group Listener
   *
   * @param props
   */
  static onRepository(props: GitHubListenerProps<RepositoryPayload>) {
    return onRepository(props);
  }

  /**
   * This event occurs when the status of a Git commit changes. For example, commits can be marked as error, failure, pending, or success.
   *
   * @group Listener
   *
   * @param props
   */
  static onStatus(props: GitHubListenerProps<StatusPayload>) {
    return onStatus(props);
  }

  /**
   * This event occurs when a GitHub Actions workflow is manually triggered.
   *
   * For activity relating to workflow runs, use the workflow_run event.
   *
   * @group Listener
   *
   * @param props
   */
  static onWorkflowDispatch(
    props: GitHubListenerProps<WorkflowDispatchPayload>
  ) {
    return onWorkflowDispatch(props);
  }

  /**
   * This event occurs when there is activity relating to a job in a GitHub Actions workflow.
   *
   * For activity relating to a workflow run instead of a job in a workflow run, use the workflow_run event.
   *
   * @group Listener
   *
   * @param props
   */
  static onWorkflowJob(props: GitHubListenerProps<WorkflowJobPayload>) {
    return onWorkflowJob(props);
  }

  /**
   * This event occurs when there is activity relating to a run of a GitHub Actions workflow.
   *
   * For activity relating to a job in a workflow run, use the workflow_job event.
   *
   * @group Listener
   *
   * @param props
   */
  static onWorkflowRun(props: GitHubListenerProps<WorkflowRunPayload>) {
    return onWorkflowRun(props);
  }
}
