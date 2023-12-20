/**
 * Delete assistantBeta
 * DELETE
 *
 * https://api.openai.com/v1/assistants/{assistant_id}
 *
 * Delete an assistant.
 *
 * Path parameters
 * assistant_id
 * string
 * Required
 * The ID of the assistant to delete.
 *
 * Returns
 * Deletion status
 */
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface DeleteAssistantProps {
  /**
   * The ID of the assistant to delete.
   */
  assistantId: string;
}

export interface DeleteAssistantResponseData {
  id: string;
  object: "assistant.deleted";
  deleted: boolean;
}

export interface DeleteAssistantResponse extends HttpProxyResponse {
  data: DeleteAssistantResponseData;
}

export const deleteAssistant =
  (self: OpenAI) =>
  async (props: DeleteAssistantProps): Promise<DeleteAssistantResponse> => {
    const { assistantId } = props;

    return self.delete({
      url: `/assistants/${assistantId}`,
    });
  };
