import { WebhookDeliveryData } from "@runlightyear/lightyear";
import { Github } from "../../Github";
import WebhookEvent from "../WebhookEvent";

export interface CommonPayload {
  /**
   * The user that triggered the event.
   */
  sender: {
    login: string;
    id: number;
    nodeId: string;
    avatarUrl: string;
    gravatarId: string;
    url: string;
    htmlUrl: string;
    followersUrl: string;
    followingUrl: string;
    gistsUrl: string;
    starredUrl: string;
    subscriptionsUrl: string;
    organizationsUrl: string;
    reposUrl: string;
    eventsUrl: string;
    receivedEventsUrl: string;
    type: string;
    siteAdmin: boolean;
  };
  /**
   * The repository where the event occurred.
   */
  repository: {
    id: number;
    nodeId: string;
    name: string;
    fullName: string;
    private: boolean;
    owner: {
      login: string;
      id: number;
      nodeId: string;
      avatarUrl: string;
      gravatarId: string;
      url: string;
      htmlUrl: string;
      followersUrl: string;
      followingUrl: string;
      gistsUrl: string;
      starredUrl: string;
      subscriptionsUrl: string;
      organizationsUrl: string;
      reposUrl: string;
      eventsUrl: string;
      receivedEventsUrl: string;
      type: string;
      siteAdmin: boolean;
    };
    htmlUrl: string;
    description: string | null;
    fork: boolean;
    url: string;
    forksUrl: string;
    keysUrl: string;
    collaboratorsUrl: string;
    teamsUrl: string;
    hooksUrl: string;
    issueEventsUrl: string;
    eventsUrl: string;
    assigneesUrl: string;
    branchesUrl: string;
    tagsUrl: string;
    blobsUrl: string;
    gitTagsUrl: string;
    gitRefsUrl: string;
    treesUrl: string;
    statusesUrl: string;
    languagesUrl: string;
    stargazersUrl: string;
    contributorsUrl: string;
    subscribersUrl: string;
    subscriptionUrl: string;
    commitsUrl: string;
    gitCommitsUrl: string;
    commentsUrl: string;
    issueCommentUrl: string;
    contentsUrl: string;
    compareUrl: string;
    mergesUrl: string;
    archiveUrl: string;
    downloadsUrl: string;
    issuesUrl: string;
    pullsUrl: string;
    milestonesUrl: string;
    notificationsUrl: string;
    labelsUrl: string;
    releasesUrl: string;
    deploymentsUrl: string;
    createdAt: string;
    updatedAt: string;
    pushedAt: string;
    gitUrl: string;
    sshUrl: string;
    cloneUrl: string;
    svnUrl: string;
    homepage: string | null;
    size: number;
    stargazersCount: number;
    watchersCount: number;
    language: string | null;
    hasIssues: boolean;
    hasProjects: boolean;
    hasDownloads: boolean;
    hasWiki: boolean;
    hasPages: boolean;
    hasDiscussions: boolean;
    forksCount: number;
    mirrorUrl: string | null;
    archived: boolean;
    disabled: boolean;
    openIssuesCount: number;
    license: string | null;
    allowForking: boolean;
    isTemplate: boolean;
    webCommitSignoffRequired: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    openIssues: number;
    watchers: number;
    defaultBranch: string;
  };
  /**
   * Webhook payloads contain the organization object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization.
   */
  organization?: object;
  /**
   * The GitHub App installation.
   */
  installation?: object;
}

export default function commonPayload(
  expectedEvent: WebhookEvent,
  deliveryData: WebhookDeliveryData
): CommonPayload {
  const event = deliveryData.headers && deliveryData.headers["x-github-event"];
  if (event === "ping") {
    throw "SKIPPED";
  }

  if (event !== expectedEvent) {
    throw new Error(`Expected event: ${expectedEvent}, got: ${event}`);
  }

  const data = Github.processDelivery(deliveryData);
  return data.body as CommonPayload;
}
