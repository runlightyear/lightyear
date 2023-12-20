/**
 * The run step objectBeta
 * Represents a step in execution of a run.
 *
 * id
 * string
 * The identifier of the run step, which can be referenced in API endpoints.
 *
 * object
 * string
 * The object type, which is always `thread.run.step``.
 *
 * created_at
 * integer
 * The Unix timestamp (in seconds) for when the run step was created.
 *
 * assistant_id
 * string
 * The ID of the assistant associated with the run step.
 *
 * thread_id
 * string
 * The ID of the thread that was run.
 *
 * run_id
 * string
 * The ID of the run that this run step is a part of.
 *
 * type
 * string
 * The type of run step, which can be either message_creation or tool_calls.
 *
 * status
 * string
 * The status of the run step, which can be either in_progress, cancelled, failed, completed, or expired.
 *
 * step_details
 * object
 * The details of the run step.
 *
 *
 * Show possible types
 * last_error
 * object or null
 * The last error associated with this run step. Will be null if there are no errors.
 *
 *
 * Show properties
 * expired_at
 * integer or null
 * The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.
 *
 * cancelled_at
 * integer or null
 * The Unix timestamp (in seconds) for when the run step was cancelled.
 *
 * failed_at
 * integer or null
 * The Unix timestamp (in seconds) for when the run step failed.
 *
 * completed_at
 * integer or null
 * The Unix timestamp (in seconds) for when the run step completed.
 *
 * metadata
 * map
 * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
 */

export interface RunStep {
  /**
   * The identifier of the run step, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always `thread.run.step``.
   */
  object: "thread.run.step";
  /**
   * The Unix timestamp (in seconds) for when the run step was created.
   */
  createdAt: number;
  /**
   * The ID of the assistant associated with the run step.
   */
  assistantId: string;
  /**
   * The ID of the thread that was run.
   */
  threadId: string;
  /**
   * The ID of the run that this run step is a part of.
   */
  runId: string;
  /**
   * The type of run step, which can be either message_creation or tool_calls.
   */
  type: "message_creation" | "tool_calls";
  /**
   * The status of the run step, which can be either in_progress, cancelled, failed, completed, or expired.
   */
  status: "in_progress" | "cancelled" | "failed" | "completed" | "expired";
  /**
   * The details of the run step.
   */
  stepDetails: MessageCreationStepDetails | ToolCallsStepDetails;
  /**
   * The last error associated with this run step. Will be null if there are no errors.
   */
  lastError: RunStepLastError | null;
  expiredAt: number | null;
  cancelledAt: number | null;
  failedAt: number | null;
  completedAt: number | null;
  metadata: Record<string, string>;
}

export interface MessageCreationStepDetails {
  type: "message_creation";
  messageCreation: {
    messageId: string;
  };
}

export interface ToolCallsStepDetails {
  type: "tool_calls";
  toolCalls: Array<
    CodeInterpreterToolCall | RetrievalToolCall | FunctionToolCall
  >;
}

export interface CodeInterpreterToolCall {
  type: "code_interpreter";
  id: string;
  codeInterpreter: {
    input: string;
    outputs: LogOutput | ImageOutput;
  };
}

export interface LogOutput {
  type: "log";
  logs: string;
}

export interface ImageOutput {
  type: "image";
  image: {
    fileId: string;
  };
}

export interface RetrievalToolCall {
  type: "retrieval";
  id: string;
  retrieval: {};
}

export interface FunctionToolCall {
  type: "function";
  id: string;
  function: FunctionDefinition;
}

export interface FunctionDefinition {
  name: string;
  arguments: string;
  output: string | null;
}

export interface RunStepLastError {
  code: "server_error" | "rate_limit_exceeded";
  message: string;
}
