import { User } from "./User";
import { Repository } from "./Repository";

/**
 * Documentation:https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads?actionType=requested#workflow_run
 */
export type WorkflowRun = {
  actor: User | null;
  artifactsUrl: string;
  cancelUrl: string;
  checkSuiteId: number;
  checkSuiteNodeId: string;
  checkSuiteUrl: string;
  conclusion:
    | "success"
    | "failure"
    | "neutral"
    | "cancelled"
    | "timed_out"
    | "action_required"
    | "stale"
    | "skipped"
    | "startup_failure"
    | null;
  createdAt: string;
  event: string;
  headBranch: string | null;
  headCommit: {
    /**
     * Metaproperties for Git author/committer information.
     */
    author: {
      date: string;
      email: string | null;
      /**
       * The git author's name.
       */
      name: string;
      username: string;
    };

    /**
     * Metaproperties for Git author/committer information.
     */
    committer: {
      date: string;
      email: string | null;
      /**
       * The git author's name.
       */
      name: string;
      username: string;
    };

    id: string;
    message: string;
    timestamp: string;
    tree_id: string;
  };
  headRepository: Repository;
  headSha: string;
  htmlUrl: string;
  id: number;
  jobsUrl: string;
  logsUrl: string;
  name: string | null;
  nodeId: string;
  path: string;
  previousAttemptUrl: string | null;
  pullRequests: Array<{
    base: {
      ref: string;
      repo: {
        id: number;
        name: string;
        url: string;
      };
      sha: string;
    };
    head: {
      ref: string;
      repo: {
        id: number;
        name: string;
        url: string;
      };
      sha: string;
    };
    id: number;
    number: number;
    url: string;
  }>;
  referencedWorkflows: Array<{
    path: string;
    ref: string;
    sha: string;
  }>;
  repository: Repository;
  rerunUrl: string;
  runAttempt: number;
  runNumber: number;
  runStartedAt: string;
  status:
    | "requested"
    | "in_progress"
    | "completed"
    | "queued"
    | "pending"
    | "waiting";
  triggeringActor: User | null;
  updatedAt: string;
  url: string;
  workflowId: number;
  workflowUrl: string;
  displayTitle: string;
};
