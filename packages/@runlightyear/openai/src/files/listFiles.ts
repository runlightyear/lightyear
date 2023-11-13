/**
 * List files
 * GET
 *
 * https://api.openai.com/v1/files
 *
 * Returns a list of files that belong to the user's organization.
 *
 * Query parameters
 * purpose
 * string
 * Optional
 * Only return files with the given purpose.
 *
 * Returns
 * A list of File objects.
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
 *   const list = await openai.files.list();
 *
 *   for await (const file of list) {
 *     console.log(file);
 *   }
 * }
 *
 * main();
 * Response
 * {
 *   "data": [
 *     {
 *       "id": "file-abc123",
 *       "object": "file",
 *       "bytes": 175,
 *       "created_at": 1613677385,
 *       "filename": "salesOverview.pdf",
 *       "purpose": "assistants",
 *     },
 *     {
 *       "id": "file-abc123",
 *       "object": "file",
 *       "bytes": 140,
 *       "created_at": 1613779121,
 *       "filename": "puppy.jsonl",
 *       "purpose": "fine-tune",
 *     }
 *   ],
 *   "object": "list"
 * }
 */
import { FileObject } from "../types/FileObject";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface ListFilesProps {
  /**
   * Only return files with the given purpose.
   */
  purpose?: string;
}

export interface ListFilesResponseData {
  object: "list";
  data: FileObject[];
}

export interface ListFilesResponse extends HttpProxyResponse {
  data: ListFilesResponseData;
}

export const listFiles =
  (self: OpenAI) =>
  async (props: ListFilesProps): Promise<ListFilesResponse> => {
    const { purpose } = props;

    return self.get({
      url: `/files`,
      params: {
        purpose,
      },
    });
  };
