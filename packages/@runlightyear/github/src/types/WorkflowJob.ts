/**
 * Documentation: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads?actionType=queued#workflow_job
 */
export type WorkflowJob = {
  check_runUrl: string;
  completedAt: string | null;
  conclusion: string | null;
  createdAt: string;
  head_sha: string;
  htmlUrl: string;
  id: number;
  labels: string[];
  name: string;
  nodeId: string;
  runAttempt: number;
  runId: number;
  runUrl: string;
  runnerGroupId: number | null;
  runnerGroupName: string | null;
  runnerId: number | null;
  runnerName: string | null;
  startedAt: string;
  /**
   * Can be one of: queued, in_progress, completed, waiting
   */
  status: "queued" | "in_progress" | "completed" | "waiting";

  /**
   * The name of the current branch.
   */
  head_branch: string | null;

  /**
   * The name of the workflow.
   */
  workflowName: string | null;

  steps: Array<{
    completedAt: string | null;

    /**
     * Can be one of: failure, skipped, success, cancelled, null
     */
    conclusion: "failure" | "skipped" | "success" | "cancelled" | null;

    name: string;
    number: number;
    startedAt: string | null;
    /**
     * Can be one of: completed, in_progress, queued, pending
     */
    status: "completed" | "in_progress" | "queued" | "pending";
  }>;

  url: string;
};
