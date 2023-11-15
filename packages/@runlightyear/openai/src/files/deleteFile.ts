/**
 * Delete file
 * DELETE
 *
 * https://api.openai.com/v1/files/{file_id}
 *
 * Delete a file.
 *
 * Path parameters
 * file_id
 * string
 * Required
 * The ID of the file to use for this request.
 *
 * Returns
 * Deletion status.
 *
 * Example request
 * node.js
 *
 * node.js
 * import OpenAI from "openai";
 *
 * const openai = new OpenAI();
 *
 * async function main() {
 *   const file = await openai.files.del("file-abc123");
 *
 *   console.log(file);
 * }
 *
 * main();
 * Response
 * {
 *   "id": "file-abc123",
 *   "object": "file",
 *   "deleted": true
 * }
 */
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface DeleteFileProps {
  /**
   * The ID of the file to use for this request.
   */
  fileId: string;
}

export interface DeleteFileResponseData {
  id: string;
  object: "file";
  deleted: boolean;
}

export interface DeleteFileResponse extends HttpProxyResponse {
  data: DeleteFileResponseData;
}

export const deleteFile =
  (self: OpenAI) =>
  async (props: DeleteFileProps): Promise<DeleteFileResponse> => {
    const { fileId } = props;

    return await self.delete({
      url: `/files/${fileId}`,
    });
  };
