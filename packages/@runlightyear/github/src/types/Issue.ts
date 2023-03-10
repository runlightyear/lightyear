import { User } from "./User";
import { Label } from "./Label";
import { Milestone } from "./Milestone";

export type Issue = {
  /**
   * Can be one of: resolved, off-topic, too heated, spam, null
   */
  activeLockReason: "resolved" | "off-topic" | "too heated" | "spam" | null;

  assignee?: User | null;

  assignees: Array<User>;

  /**
   * How the author is associated with the repository.
   *
   * Can be one of: COLLABORATOR, CONTRIBUTOR, FIRST_TIMER, FIRST_TIME_CONTRIBUTOR, MANNEQUIN, MEMBER, NONE, OWNER
   */
  authorAssociation:
    | "COLLABORATOR"
    | "CONTRIBUTOR"
    | "FIRST_TIMER"
    | "FIRST_TIME_CONTRIBUTOR"
    | "MANNEQUIN"
    | "MEMBER"
    | "NONE"
    | "OWNER";

  /**
   * Contents of the issue
   */
  body: string | null;

  closedAt: string | null;

  comments: number;

  commentsUrl: string;

  createdAt: string;

  draft?: boolean;

  eventsUrl: string;

  htmlUrl: string;

  id: number;

  labels?: Array<Label>;

  labelsUrl: string;

  locked: boolean;

  /**
   * A collection of related issues and pull requests.
   */
  milestone: Milestone | null;

  nodeId: string;

  number: number;

  /**
   * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
   */
  performedViaGithubApp: object | null;

  pullRequest?: {
    diffUrl: string;
    htmlUrl: string;
    mergedAt: string | null;
    patchUrl: string;
    url: string;
  };
  reactions: {
    "+1": number;
    "-1": number;
    confused: number;
    eyes: number;
    heart: number;
    hooray: number;
    laugh: number;
    rocket: number;
    totalCount: number;
    url: string;
  };
  repositoryUrl: string;

  /**
   * State of the issue; either 'open' or 'closed'
   *
   * Can be one of: open, closed
   */
  state?: "open" | "closed";

  stateReason?: string | null;

  timelineUrl?: string;

  /**
   * Title of the issue
   */
  title: string;

  updatedAt: string;

  /**
   * URL for the issue
   */
  url: string;

  user: User;
};
