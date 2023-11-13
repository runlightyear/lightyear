/**
 * The File object
 * The File object represents a document that has been uploaded to OpenAI.
 *
 * id
 * string
 * The file identifier, which can be referenced in the API endpoints.
 *
 * bytes
 * integer
 * The size of the file, in bytes.
 *
 * created_at
 * integer
 * The Unix timestamp (in seconds) for when the file was created.
 *
 * filename
 * string
 * The name of the file.
 *
 * object
 * string
 * The object type, which is always file.
 *
 * purpose
 * string
 * The intended purpose of the file. Supported values are fine-tune, fine-tune-results, assistants, and assistants_output.
 *
 * status
 * Deprecated
 * string
 * Deprecated. The current status of the file, which can be either uploaded, processed, or error.
 *
 * status_details
 * Deprecated
 * string
 * Deprecated. For details on why a fine-tuning training file failed validation, see the error field on fine_tuning.job.
 */

export interface FileObject {
  /**
   * The file identifier, which can be referenced in the API endpoints.
   */
  id: string;
  /**
   * The size of the file, in bytes.
   */
  bytes: number;
  /**
   * The Unix timestamp (in seconds) for when the file was created.
   */
  createdAt: number;
  /**
   * The name of the file.
   */
  filename: string;
  /**
   * The object type, which is always file.
   */
  object: "file";
  /**
   * The intended purpose of the file. Supported values are fine-tune, fine-tune-results, assistants, and assistants_output.
   */
  purpose: string;
  /**
   * Deprecated. The current status of the file, which can be either uploaded, processed, or error.
   */
  status: string;
  /**
   * Deprecated. For details on why a fine-tuning training file failed validation, see the error field on fine_tuning.job.
   *
   * @deprecated
   */
  statusDetails: string;
}
