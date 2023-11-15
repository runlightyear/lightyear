/**
 * Retrieve file content
 * GET
 *
 * https://api.openai.com/v1/files/{file_id}/content
 *
 * Returns the contents of the specified file.
 *
 * Path parameters
 * file_id
 * string
 * Required
 * The ID of the file to use for this request.
 *
 * Returns
 * The file content.
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
 *   const file = await openai.files.retrieveContent("file-abc123");
 *
 *   console.log(file);
 * }
 *
 * main();
 */
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface RetrieveFileContentProps {
  /**
   * The ID of the file to use for this request.
   */
  fileId: string;
}

export interface RetrieveFileContentResponse extends HttpProxyResponse {
  data: string;
}

export const retrieveFileContent =
  (self: OpenAI) =>
  async (
    props: RetrieveFileContentProps
  ): Promise<RetrieveFileContentResponse> => {
    const { fileId } = props;

    return self.get({
      url: `/files/${fileId}/content`,
    });
  };
