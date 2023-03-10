import { User } from "./User";

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

  open_issues: number;

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

  updated_at: string;

  url: string;
};
