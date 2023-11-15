/**
 * The message objectBeta
 * Represents a message within a thread.
 *
 * id
 * string
 * The identifier, which can be referenced in API endpoints.
 *
 * object
 * string
 * The object type, which is always thread.message.
 *
 * created_at
 * integer
 * The Unix timestamp (in seconds) for when the message was created.
 *
 * thread_id
 * string
 * The thread ID that this message belongs to.
 *
 * role
 * string
 * The entity that produced the message. One of user or assistant.
 *
 * content
 * array
 * The content of the message in array of text and/or images.
 *
 *
 * Show possible types
 * assistant_id
 * string or null
 * If applicable, the ID of the assistant that authored this message.
 *
 * run_id
 * string or null
 * If applicable, the ID of the run associated with the authoring of this message.
 *
 * file_ids
 * array
 * A list of file IDs that the assistant should use. Useful for tools like retrieval and code_interpreter that can access files. A maximum of 10 files can be attached to a message.
 *
 * metadata
 * map
 * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
 *
 * The message object
 * {
 *   "id": "msg_abc123",
 *   "object": "thread.message",
 *   "created_at": 1698983503,
 *   "thread_id": "thread_abc123",
 *   "role": "assistant",
 *   "content": [
 *     {
 *       "type": "text",
 *       "text": {
 *         "value": "Hi! How can I help you today?",
 *         "annotations": []
 *       }
 *     }
 *   ],
 *   "file_ids": [],
 *   "assistant_id": "asst_abc123",
 *   "run_id": "run_abc123",
 *   "metadata": {}
 * }
 */

export interface Message {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always thread.message.
   */
  object: string;
  /**
   * The Unix timestamp (in seconds) for when the message was created.
   */
  createdAt: number;
  /**
   * The thread ID that this message belongs to.
   */
  threadId: string;
  /**
   * The entity that produced the message. One of user or assistant.
   */
  role: string;
  /**
   * The content of the message in array of text and/or images.
   */
  content: Content[];
  /**
   * If applicable, the ID of the assistant that authored this message.
   */
  assistantId?: string | null;
  /**
   * If applicable, the ID of the run associated with the authoring of this message.
   */
  runId?: string | null;
  /**
   * A list of file IDs that the assistant should use. Useful for tools like retrieval and code_interpreter that can access files. A maximum of 10 files can be attached to a message.
   */
  fileIds: string[];
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
   */
  metadata: Record<string, string>;
}

export type Content = ImageFileContent | TextContent;

export interface ImageFileContent {
  type: "image_file";
  imageFile: {
    fileId: string;
  };
}

export interface TextContent {
  type: "text";
  text: {
    value: string;
    annotations: Annotation[];
  };
}

export type Annotation = FileCitationAnnotation | FilePathAnnotation;

export interface FileCitationAnnotation {
  type: "file_citation";
  text: string;
  fileCitation: {
    fileId: string;
    quote: string;
  };
  startIndex: number;
  endIndex: number;
}

export interface FilePathAnnotation {
  type: "file_path";
  text: string;
  filePath: {
    fileId: string;
  };
  startIndex: number;
  endIndex: number;
}
