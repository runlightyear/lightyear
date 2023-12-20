/**
 * Retrieve message fileBeta
 * GET
 *
 * https://api.openai.com/v1/threads/{thread_id}/messages/{message_id}/files/{file_id}
 *
 * Retrieves a message file.
 *
 * Path parameters
 * thread_id
 * string
 * Required
 * The ID of the thread to which the message and File belong.
 *
 * message_id
 * string
 * Required
 * The ID of the message the file belongs to.
 *
 * file_id
 * string
 * Required
 * The ID of the file being retrieved.
 *
 * Returns
 * The message file object.
 *
 * Example request
 * node.js
 *
 * node.js
 * import OpenAI from "openai";
 * const openai = new OpenAI();
 *
 * async function main() {
 *   const messageFile = await openai.beta.threads.messages.files.retrieve(
 *     "thread_abc123",
 *     "msg_abc123",
 *     "file-abc123"
 *   );
 *   console.log(messageFile);
 * }
 *
 * main();
 * Response
 * {
 *   "id": "file-abc123",
 *   "object": "thread.message.file",
 *   "created_at": 1699061776,
 *   "message_id": "msg_abc123"
 * }
 */
import { MessageFile } from "../types/MessageFile";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface RetrieveMessageFileProps {
  /**
   * The ID of the thread to which the message and File belong.
   */
  threadId: string;
  /**
   * The ID of the message the file belongs to.
   */
  messageId: string;
  /**
   * The ID of the file being retrieved.
   */
  fileId: string;
}

export interface RetrieveMessageFileResponse extends HttpProxyResponse {
  data: MessageFile;
}

export const retrieveMessageFile =
  (self: OpenAI) =>
  async (
    props: RetrieveMessageFileProps
  ): Promise<RetrieveMessageFileResponse> => {
    const { threadId, messageId, fileId } = props;

    return self.get({
      url: `/threads/${threadId}/messages/${messageId}/files/${fileId}`,
    });
  };
