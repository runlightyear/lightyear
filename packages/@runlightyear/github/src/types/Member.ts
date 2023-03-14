/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#member
 */
export type Member = {
  avatarUrl?: string;

  deleted?: boolean;

  email?: string | null;

  eventsUrl?: string;

  followersUrl?: string;

  followingUrl?: string;

  gistsUrl?: string;

  gravatar_id?: string;

  htmlUrl?: string;

  id: number;

  login: string;

  name?: string;

  nodeId?: string;

  organizationsUrl?: string;

  receivedEventsUrl?: string;

  reposUrl?: string;

  siteAdmin?: boolean;

  starredUrl?: string;

  subscriptionsUrl?: string;

  type?: "Bot" | "User" | "Organization";

  url?: string;
};
