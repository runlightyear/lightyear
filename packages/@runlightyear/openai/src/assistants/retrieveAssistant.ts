import { Assistant } from "../types/Assistant";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

/**
 * Retrieve assistantBeta
 * GET
 *
 * https://api.openai.com/v1/assistants/{assistant_id}
 *
 * Retrieves an assistant.
 *
 * Path parameters
 * assistant_id
 * string
 * Required
 * The ID of the assistant to retrieve.
 *
 * Returns
 * The assistant object matching the specified ID.
 */
export interface RetrieveAssistantProps {
  /**
   * The ID of the assistant to retrieve.
   */
  assistantId: string;
}

export interface RetrieveAssistantResponse extends HttpProxyResponse {
  data: Assistant;
}

export const retrieveAssistant =
  (self: OpenAI) =>
  async (props: RetrieveAssistantProps): Promise<RetrieveAssistantResponse> => {
    const { assistantId } = props;

    return self.get({
      url: `/assistants/${assistantId}`,
    });
  };
