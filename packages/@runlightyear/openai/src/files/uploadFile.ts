/**
 * Upload file
 * POST
 *
 * https://api.openai.com/v1/files
 *
 * Upload a file that can be used across various endpoints. The size of all the files uploaded by one organization can be up to 100 GB.
 *
 * The size of individual files can be a maximum of 512 MB. See the Assistants Tools guide to learn more about the types of files supported. The Fine-tuning API only supports .jsonl files.
 *
 * Please contact us if you need to increase these storage limits.
 *
 * Request body
 * file
 * string
 * Required
 * The File object (not file name) to be uploaded.
 *
 * purpose
 * string
 * Required
 * The intended purpose of the uploaded file.
 *
 * Use "fine-tune" for Fine-tuning and "assistants" for Assistants and Messages. This allows us to validate the format of the uploaded file is correct for fine-tuning.
 *
 * Returns
 * The uploaded File object.
 *
 * Example request
 * node.js
 *
 * node.js
 * import fs from "fs";
 * import OpenAI from "openai";
 *
 * const openai = new OpenAI();
 *
 * async function main() {
 *   const file = await openai.files.create({
 *     file: fs.createReadStream("mydata.jsonl"),
 *     purpose: "fine-tune",
 *   });
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

export interface UploadFileProps {
  /**
   * The File object (not file name) to be uploaded.
   */
  file: string;

  /**
   * The intended purpose of the uploaded file.
   *
   * Use "fine-tune" for Fine-tuning and "assistants" for Assistants and Messages. This allows us to validate the format of the uploaded file is correct for fine-tuning.
   */
  purpose: "fine-tune" | "assistants";
}

export interface UploadFileResponse extends HttpProxyResponse {
  data: FileObject;
}

export const uploadFile =
  (self: OpenAI) =>
  async (props: UploadFileProps): Promise<UploadFileResponse> => {
    const { file, purpose } = props;

    return self.post({
      url: `/files`,
      data: {
        file,
        purpose,
      },
    });
  };
