/** GitHub **/

import { GitHub } from "./GitHub";
import type { GitHubConnectorProps, GitHubDefineAuthProps } from "./GitHub";

/** GitHubOAuth **/

import { GitHubOAuth } from "./GitHubOAuth";
import type { GitHubOAuthProps } from "./GitHubOAuth";

/** Gists **/

import { CreateGistProps } from "./gists/createGist";

/** Issues **/

import { CreateIssueProps } from "./issues/createIssue";
import { UpdateIssueProps } from "./issues/updateIssue";

/** Pulls **/

import { CreatePullRequestProps } from "./pulls/createPullRequest";
import { CreatePullRequestCommentProps } from "./pulls/createReviewCommentForPullRequest";
import { UpdatePullRequestProps } from "./pulls/updatePullRequest";

/** Repositories **/

import { DownloadRepoArchiveTarProps } from "./repositories/contents/downloadRepoArchiveTar";
import { DownloadRepoArchiveZipProps } from "./repositories/contents/downloadRepoArchiveZip";
import { ListOrganizationRepositoriesProps } from "./repositories/listOrganizationRepositories";
import { ListRepositoriesForAuthenticatedUserProps } from "./repositories/listRepositoriesForAuthenticatedUser";
import { ListRepositoriesForUserProps } from "./repositories/listRepositoriesForUser";

/** Webhooks **/

import type {
  DefineGitHubWebhookProps,
  GitHubWebhookSubscribeProps,
  GitHubWebhookSubscribePropsFunc,
} from "./webhooks/defineGitHubWebhook";

/** Webhooks Payloads **/

import { CommonPayload } from "./webhooks/payloads/commonPayload";
import { PingPayload } from "./webhooks/payloads/pingPayload";
import { PullRequestPayload } from "./webhooks/payloads/pullRequestPayload";
import { PullRequestReviewPayload } from "./webhooks/payloads/pullRequestReviewPayload";
import { PushPayload } from "./webhooks/payloads/pushPayload";
import { WorkflowRunPayload } from "./webhooks/payloads/workflowRunPayload";

/** Webhooks Repositories **/

import {
  CreateRepositoryWebhookProps,
  CreateRepositoryWebhookResponse,
} from "./webhooks/repositoryWebhooks/createRepositoryWebhook";
import { DeleteRepositoryWebhookProps } from "./webhooks/repositoryWebhooks/deleteRepositoryWebhook";
import { GetRepositoryWebhookProps } from "./webhooks/repositoryWebhooks/getRepositoryWebhook";
import {
  ListRepositoryWebhooksProps,
  ListRepositoryWebhooksResponse,
} from "./webhooks/repositoryWebhooks/listRepositoryWebhooks";
import { PingRepositoryWebhookProps } from "./webhooks/repositoryWebhooks/pingRepositoryWebhook";
import { TestPushRepositoryWebhookProps } from "./webhooks/repositoryWebhooks/testPushRepositoryWebhook";
import {
  UpdateRepositoryWebhookProps,
  UpdateRepositoryWebhookResponse,
} from "./webhooks/repositoryWebhooks/updateRepositoryWebhook";

/** Types **/

import type { GitHubScope } from "./types/GitHubScope";
import type WebhookConfig from "./types/WebhookConfig";
import type WebhookEvent from "./types/WebhookEvent";

export { GitHub, GitHubOAuth };
export type {
  GitHubConnectorProps,
  GitHubOAuthProps,
  GitHubDefineAuthProps,
  CreateGistProps,
  CreateIssueProps,
  UpdateIssueProps,
  CreatePullRequestProps,
  CreatePullRequestCommentProps,
  UpdatePullRequestProps,
  DownloadRepoArchiveTarProps,
  DownloadRepoArchiveZipProps,
  ListOrganizationRepositoriesProps,
  ListRepositoriesForAuthenticatedUserProps,
  ListRepositoriesForUserProps,
  DefineGitHubWebhookProps,
  GitHubWebhookSubscribeProps,
  GitHubWebhookSubscribePropsFunc,
  CommonPayload,
  PingPayload,
  PullRequestPayload,
  PullRequestReviewPayload,
  PushPayload,
  WorkflowRunPayload,
  CreateRepositoryWebhookProps,
  CreateRepositoryWebhookResponse,
  DeleteRepositoryWebhookProps,
  GetRepositoryWebhookProps,
  ListRepositoryWebhooksProps,
  ListRepositoryWebhooksResponse,
  PingRepositoryWebhookProps,
  TestPushRepositoryWebhookProps,
  UpdateRepositoryWebhookProps,
  UpdateRepositoryWebhookResponse,
  GitHubScope,
  WebhookConfig,
  WebhookEvent,
};
