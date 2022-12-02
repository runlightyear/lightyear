import {
  AuthConnectorOptions,
  HttpProxyResponse,
  RestConnector,
  WebhookDeliveryData,
} from "@runlightyear/lightyear";
import createGist, { CreateGistOptions } from "./gists/createGist";
import createIssue, { CreateIssueOptions } from "./issues/createIssue";
import updateIssue, { UpdateIssueOptions } from "./issues/updateIssue";
import createPullRequest, {
  CreatePullRequestOptions,
} from "./pulls/createPullRequest";
import createReviewCommentForPullRequest, {
  CreatePullRequestCommentOptions,
} from "./pulls/createReviewCommentForPullRequest";
import updatePullRequest, {
  UpdatePullRequestOptions,
} from "./pulls/updatePullRequest";
import downloadRepoArchiveTar, {
  DownloadRepoArchiveTarOptions,
} from "./repositories/contents/downloadRepoArchiveTar";
import downloadRepoArchiveZip, {
  DownloadRepoArchiveZipOptions,
} from "./repositories/contents/downloadRepoArchiveZip";
import createRepositoryWebhook, {
  CreateRepositoryWebhookOptions,
} from "./webhooks/repositoryWebhooks/createRepositoryWebhook";
import getRepositoryWebhook, {
  GetRepositoryWebhookOptions,
} from "./webhooks/repositoryWebhooks/getRepositoryWebhook";
import listRepositoryWebhooks, {
  ListRepositoryWebhooksOptions,
} from "./webhooks/repositoryWebhooks/listRepositoryWebhooks";
import listRepositoriesForUser, {
  ListRepositoriesForUserOptions,
} from "./repositories/listRepositoriesForUser";
import listOrganizationRepositories, {
  ListOrganizationRepositoriesOptions,
} from "./repositories/listOrganizationRepositories";
import listRepositoriesForAuthenticatedUser, {
  ListRepositoriesForAuthenticatedUserOptions,
} from "./repositories/listRepositoriesForAuthenticatedUser";
import updateRepositoryWebhook, {
  UpdateRepositoryWebhookOptions,
} from "./webhooks/repositoryWebhooks/updateRepositoryWebhook";
import deleteRepositoryWebhook, {
  DeleteRepositoryWebhookOptions,
} from "./webhooks/repositoryWebhooks/deleteRepositoryWebhook";
import pingRepositoryWebhook, {
  PingRepositoryWebhookOptions,
} from "./webhooks/repositoryWebhooks/pingRepositoryWebhook";
import testPushRepositoryWebhook, {
  TestPushRepositoryWebhookOptions,
} from "./webhooks/repositoryWebhooks/testPushRepositoryWebhook";
import pullRequestPayload from "./webhooks/payloads/pullRequestPayload";
import pullRequestReviewPayload from "./webhooks/payloads/pullRequestReviewPayload";
import workflowRunPayload from "./webhooks/payloads/workflowRunPayload";
import pingPayload from "./webhooks/payloads/pingPayload";
import isWebhookEventType from "./webhooks/webhookEventType";
import pushPayload from "./webhooks/payloads/pushPayload";
import WebhookEvent from "./webhooks/WebhookEvent";

export interface GithubConnectorOptions extends AuthConnectorOptions {}

export interface GithubDefineAuthOptions {
  /**
   * The name of the auth
   */
  name: string;
}

/**
 * Connector to the Github API
 *
 * @example Import
 * ```typescript
 * import { Github } from "@runlightyear/github"
 * ```
 *
 * @example Define an auth
 * ```typescript
 * const githubAuth = Github.defineAuth({ name: "github" });
 * ```
 *
 * @example List all github repos
 * ```typescript
 * const github = new Github({ auth: githubAuth });
 * await github.listRepos();
 * ```
 */
export class Github extends RestConnector {
  constructor(options: GithubConnectorOptions) {
    super({ ...options, baseUrl: "https://api.github.com" });
  }

  /**
   * @internal
   */
  authorizationHeaders(): { [p: string]: string } {
    const { accessToken } = this.getAuthData();

    return {
      Authorization: `token ${accessToken}`,
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
   * @param options options
   */
  async createGist(options: CreateGistOptions): Promise<HttpProxyResponse> {
    return createGist(this)(options);
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
   * @param options options
   */
  async createIssue(options: CreateIssueOptions): Promise<HttpProxyResponse> {
    return createIssue(this)(options);
  }

  /**
   * Update an issue
   *
   * @group Issue
   *
   * Issue owners and users with push access can edit an issue.
   *
   * @param options options
   */
  async updateIssue(options: UpdateIssueOptions): Promise<HttpProxyResponse> {
    return updateIssue(this)(options);
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
   * @param options options
   */
  async createPullRequest(
    options: CreatePullRequestOptions
  ): Promise<HttpProxyResponse> {
    return createPullRequest(this)(options);
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
   * @param options options
   */
  async createReviewCommentForPullRequest(
    options: CreatePullRequestCommentOptions
  ) {
    return createReviewCommentForPullRequest(this)(options);
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
   * @param options options
   */
  async updatePullRequest(options: UpdatePullRequestOptions) {
    return updatePullRequest(this)(options);
  }

  /**
   * List organization repositories
   *
   * @group Repo
   *
   * Lists repositories for the specified organization.
   *
   * @param options options
   */
  async listOrganizationRepositories(
    options: ListOrganizationRepositoriesOptions
  ) {
    return listOrganizationRepositories(this)(options);
  }

  /**
   * List repositories for a user
   *
   * @group Repo
   *
   * Lists public repositories for the specified user. Note: For GitHub AE, this endpoint will list internal repositories for the specified user.
   *
   * @param options options
   */
  async listRepositoriesForUser(options: ListRepositoriesForUserOptions) {
    return listRepositoriesForUser(this)(options);
  }

  /**
   * List repositories for the authenticated user
   *
   * @group Repo
   *
   * Lists repositories that the authenticated user has explicit permission (:read, :write, or :admin) to access.
   *
   * The authenticated user has explicit permission to access repositories they own, repositories where they are a collaborator, and repositories that they can access through an organization membership.
   *
   * @param options options
   */
  async listRepositoriesForAuthenticatedUser(
    options: ListRepositoriesForAuthenticatedUserOptions
  ) {
    return listRepositoriesForAuthenticatedUser(this)(options);
  }

  /**
   * Download a repository archive (tar)
   *
   * @group Repo Content
   *
   * Gets a redirect URL to download a tar archive for a repository. If you omit :ref, the repository’s default branch (usually master) will be used. Please make sure your HTTP framework is configured to follow redirects or you will need to use the Location header to make a second GET request.
   *
   * Note: For private repositories, these links are temporary and expire after five minutes.
   *
   * @param options options
   */
  async downloadRepoArchiveTar(options: DownloadRepoArchiveTarOptions) {
    return downloadRepoArchiveTar(this)(options);
  }

  /**
   * Download a repository archive (zip)
   *
   * @group Repo Content
   *
   * Gets a redirect URL to download a zip archive for a repository. If you omit :ref, the repository’s default branch (usually master) will be used. Please make sure your HTTP framework is configured to follow redirects or you will need to use the Location header to make a second GET request.
   *
   * Note: For private repositories, these links are temporary and expire after five minutes. If the repository is empty, you will receive a 404 when you follow the redirect.
   *
   * @param options options
   */
  async downloadRepoArchiveZip(options: DownloadRepoArchiveZipOptions) {
    return downloadRepoArchiveZip(this)(options);
  }

  /**
   * List repository webhooks
   *
   * @group Webhook
   *
   * Lists webhooks for a repository. last response may return null if there have not been any deliveries within 30 days.
   *
   * @param options options
   */
  async listRepositoryWebhooks(options: ListRepositoryWebhooksOptions) {
    return listRepositoryWebhooks(this)(options);
  }

  /**
   * Create a repository webhook
   *
   * @group Webhook
   *
   * Repositories can have multiple webhooks installed. Each webhook should have a unique config. Multiple webhooks can share the same config as long as those webhooks do not have any events that overlap.
   *
   * @param options options
   */
  async createRepositoryWebhook(options: CreateRepositoryWebhookOptions) {
    return createRepositoryWebhook(this)(options);
  }

  /**
   * Get a repository webhook
   *
   * @group Webhook
   *
   * Returns a webhook configured in a repository.
   *
   * @param options options
   */
  async getRepositoryWebhook(options: GetRepositoryWebhookOptions) {
    return getRepositoryWebhook(this)(options);
  }

  /**
   * Update a repository webhook
   *
   * @group Webhook
   *
   * Updates a webhook configured in a repository. If you previously had a secret set, you must provide the same secret or set a new secret or the secret will be removed.
   *
   * @param options options
   */
  async updateRepositoryWebhook(options: UpdateRepositoryWebhookOptions) {
    return updateRepositoryWebhook(this)(options);
  }

  /**
   * Delete a repository webhook
   *
   * @group Webhook
   *
   * @param options options
   */
  async deleteRepositoryWebhook(options: DeleteRepositoryWebhookOptions) {
    return deleteRepositoryWebhook(this)(options);
  }

  /**
   * Ping a repository webhook
   *
   * @group Webhook
   *
   * This will trigger a ping event to be sent to the hook.
   *
   * @param options options
   */
  async pingRepositoryWebhook(options: PingRepositoryWebhookOptions) {
    return pingRepositoryWebhook(this)(options);
  }

  /**
   * Test the push repository webhook
   *
   * @group Webhook
   *
   * This will trigger the hook with the latest push to the current repository if the hook is subscribed to push events. If the hook is not subscribed to push events, the server will respond with 204 but no test POST will be generated.
   *
   * @param options options
   */
  async testPushRepositoryWebhook(options: TestPushRepositoryWebhookOptions) {
    return testPushRepositoryWebhook(this)(options);
  }

  /**
   * Verify type of webhook event
   */
  static isWebhookEventType(
    expectedEvent: WebhookEvent,
    deliveryData: WebhookDeliveryData
  ) {
    return isWebhookEventType(expectedEvent, deliveryData);
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
   * Workflow Run Payload
   *
   * @group Webhook Payload
   *
   * When a GitHub Actions workflow run is requested or completed.
   *
   * @param data webhook delivery data
   */
  static workflowRunPayload(data: WebhookDeliveryData) {
    return workflowRunPayload(data);
  }
}
