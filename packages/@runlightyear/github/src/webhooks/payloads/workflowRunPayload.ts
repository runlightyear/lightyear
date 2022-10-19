import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";

export interface WorkflowRunPayload extends CommonPayload {
  /**
   * The workflow run. Includes information such as artifacts_url, check_suite_id, conclusion, head_branch, and head_sha.
   */
  workflowRun: {
    artifactsUrl: string;
    checkSuiteId: string;
    conclusion?: "success" | string;
    headBranch: string;
    headSha: string;
    [name: string]: any;
  };
  /**
   * The workflow that generated the workflow run.
   */
  workflow: object;
}

export default function workflowRunPayload(
  data: WebhookDeliveryData
): WorkflowRunPayload {
  const payload = commonPayload("workflow_run", data) as unknown;
  return payload as WorkflowRunPayload;
}
