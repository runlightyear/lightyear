import { User } from "./User";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#milestone
 */
export type Milestone = {
  closedAt: string | null;

  closedIssues: number;

  createdAt: string;

  creator: User | null;

  description: string | null;

  dueOn: string | null;

  htmlUrl: string;

  id: number;

  labelsUrl: string;

  nodeId: string;

  /**
   * The number of the milestone.
   */
  number: number;

  openIssues: number;

  /**
   * The state of the milestone.
   *
   * Can be one of: open, closed
   */

  state: "open" | "closed";

  /**
   * The title of the milestone.
   */
  title: string;

  updatedAt: string;

  url: string;
};
