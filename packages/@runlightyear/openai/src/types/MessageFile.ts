/**
 * The message file objectBeta
 * A list of files attached to a message.
 *
 * id
 * string
 * The identifier, which can be referenced in API endpoints.
 *
 * object
 * string
 * The object type, which is always thread.message.file.
 *
 * created_at
 * integer
 * The Unix timestamp (in seconds) for when the message file was created.
 *
 * message_id
 * string
 * The ID of the message that the File is attached to.
 *
 * The message file object
 * {
 *   "id": "file-abc123",
 *   "object": "thread.message.file",
 *   "created_at": 1698107661,
 *   "message_id": "message_QLoItBbqwyAJEzlTy4y9kOMM",
 *   "file_id": "file-abc123"
 * }
 */

export interface MessageFile {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always thread.message.file.
   */
  object: "thread.message.file";
  /**
   * The Unix timestamp (in seconds) for when the message file was created.
   */
  createdAt: number;
  /**
   * The ID of the message that the File is attached to.
   */
  messageId: string;
  /**
   * The ID of the file.
   */
  fileId: string;
}
