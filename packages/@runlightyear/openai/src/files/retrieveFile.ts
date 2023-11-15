/**
 * Retrieve file
 * GET
 *
 * https://api.openai.com/v1/files/{file_id}
 *
 * Returns information about a specific file.
 *
 * Path parameters
 * file_id
 * string
 * Required
 * The ID of the file to use for this request.
 *
 * Returns
 * The File object matching the specified ID.
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
 *   const file = await openai.files.retrieve("file-abc123");
 *
 *   console.log(file);
 * }
 *
 * main();
 * Response
 * {
 *   "id": "file-abc123",
 *   "object": "file",
 *   "bytes": 120000,
 *   "created_at": 1677610602,
 *   "filename": "mydata.jsonl",
 *   "purpose": "fine-tune",
 * }
 */
import { FileObject } from "../types/FileObject";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface RetrieveFileProps {
  /**
   * The ID of the file to use for this request.
   */
  fileId: string;
}

export interface RetrieveFileResponse extends HttpProxyResponse {
  data: FileObject;
}

export const retrieveFile =
  (self: OpenAI) =>
  async (props: RetrieveFileProps): Promise<RetrieveFileResponse> => {
    const { fileId } = props;

    return self.get({
      url: `/files/${fileId}`,
    });
  };
