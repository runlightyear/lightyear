/**
 * The thread objectBeta
 * Represents a thread that contains messages.
 *
 * id
 * string
 * The identifier, which can be referenced in API endpoints.
 *
 * object
 * string
 * The object type, which is always thread.
 *
 * created_at
 * integer
 * The Unix timestamp (in seconds) for when the thread was created.
 *
 * metadata
 * map
 * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
 *
 * The thread object
 * {
 *   "id": "thread_abc123",
 *   "object": "thread",
 *   "created_at": 1698107661,
 *   "metadata": {}
 * }
 */

export interface Thread {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always thread.
   */
  object: "thread";
  /**
   * The Unix timestamp (in seconds) for when the thread was created.
   */
  createdAt: number;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
   */
  metadata: Record<string, string>;
}

export interface ThreadMessageInput {
  /**
   * The role of the entity that is creating the message. Currently only user is supported.
   */
  role: "user";
  /**
   * The content of the message in array of text and/or images.
   */
  content: string;
  /**
   * A list of File IDs that the message should use. There can be a maximum of 10 files attached to a message. Useful for tools like retrieval and code_interpreter that can access and use files.
   */
  fileIds?: string[];
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maximum of 512 characters long.
   */
  metadata?: Record<string, string>;
}
