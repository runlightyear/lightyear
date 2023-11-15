/**
 * The run objectBeta
 * Represents an execution run on a thread.
 *
 * id
 * string
 * The identifier, which can be referenced in API endpoints.
 *
 * object
 * string
 * The object type, which is always thread.run.
 *
 * created_at
 * integer
 * The Unix timestamp (in seconds) for when the run was created.
 *
 * thread_id
 * string
 * The ID of the thread that was executed on as a part of this run.
 *
 * assistant_id
 * string
 * The ID of the assistant used for execution of this run.
 *
 * status
 * string
 * The status of the run, which can be either queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired.
 *
 * required_action
 * object or null
 * Details on the action required to continue the run. Will be null if no action is required.
 *
 *
 * Show properties
 * last_error
 * object or null
 * The last error associated with this run. Will be null if there are no errors.
 *
 *
 * Show properties
 * expires_at
 * integer
 * The Unix timestamp (in seconds) for when the run will expire.
 *
 * started_at
 * integer or null
 * The Unix timestamp (in seconds) for when the run was started.
 *
 * cancelled_at
 * integer or null
 * The Unix timestamp (in seconds) for when the run was cancelled.
 *
 * failed_at
 * integer or null
 * The Unix timestamp (in seconds) for when the run failed.
 *
 * completed_at
 * integer or null
 * The Unix timestamp (in seconds) for when the run was completed.
 *
 * model
 * string
 * The model that the assistant used for this run.
 *
 * instructions
 * string
 * The instructions that the assistant used for this run.
 *
 * tools
 * array
 * The list of tools that the assistant used for this run.
 *
 *
 * Show possible types
 * file_ids
 * array
 * The list of File IDs the assistant used for this run.
 *
 * metadata
 * map
 * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
 */

export interface Run {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always thread.run.
   */
  object: "thread.run";
  /**
   * The Unix timestamp (in seconds) for when the run was created.
   */
  createdAt: number;
  /**
   * The ID of the thread that was executed on as a part of this run.
   */
  threadId: string;
  /**
   * The ID of the assistant used for execution of this run.
   */
  assistantId: string;
  /**
   * The status of the run, which can be either queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired.
   */
  status:
    | "queued"
    | "in_progress"
    | "requires_action"
    | "cancelling"
    | "cancelled"
    | "failed"
    | "completed"
    | "expired";
  /**
   * Details on the action required to continue the run. Will be null if no action is required.
   */
  requiredAction: Record<string, any> | null;
  /**
   * The last error associated with this run. Will be null if there are no errors.
   */
  lastError: Record<string, any> | null;
  /**
   * The Unix timestamp (in seconds) for when the run will expire.
   */
  expiresAt: number;
  /**
   * The Unix timestamp (in seconds) for when the run was started.
   */
  startedAt: number | null;
  /**
   * The Unix timestamp (in seconds) for when the run was cancelled.
   */
  cancelledAt: number | null;
  /**
   * The Unix timestamp (in seconds) for when the run failed.
   */
  failedAt: number | null;
  /**
   * The Unix timestamp (in seconds) for when the run was completed.
   */
  completedAt: number | null;
  /**
   * The model that the assistant used for this run.
   */
  model: string;
  /**
   * The instructions that the assistant used for this run.
   */
  instructions: string;
  /**
   * The list of tools that the assistant used for this run.
   */
  tools: string[];
  /**
   * The list of File IDs the assistant used for this run.
   */
  fileIds: string[];
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
   */
  metadata: Record<string, string>;
}
