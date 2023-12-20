import { Assistant } from "../types/Assistant";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

/**
 * Modify assistantBeta
 * POST
 *
 * https://api.openai.com/v1/assistants/{assistant_id}
 *
 * Modifies an assistant.
 *
 * Path parameters
 * assistant_id
 * string
 * Required
 * The ID of the assistant to modify.
 *
 * Request body
 * model
 * Optional
 * ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them.
 *
 * name
 * string or null
 * Optional
 * The name of the assistant. The maximum length is 256 characters.
 *
 * description
 * string or null
 * Optional
 * The description of the assistant. The maximum length is 512 characters.
 *
 * instructions
 * string or null
 * Optional
 * The system instructions that the assistant uses. The maximum length is 32768 characters.
 *
 * tools
 * array
 * Optional
 * Defaults to []
 * A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types code_interpreter, retrieval, or function.
 *
 *
 * Show possible types
 * file_ids
 * array
 * Optional
 * Defaults to []
 * A list of File IDs attached to this assistant. There can be a maximum of 20 files attached to the assistant. Files are ordered by their creation date in ascending order. If a file was previosuly attached to the list but does not show up in the list, it will be deleted from the assistant.
 *
 * metadata
 * map
 * Optional
 * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
 *
 * Returns
 * The modified assistant object.
 */
export interface ModifyAssistantProps {
  /**
   * The ID of the assistant to modify.
   */
  assistantId: string;
  /**
   * ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them.
   */
  model?: string;
  /**
   * The name of the assistant. The maximum length is 256 characters.
   */
  name?: string | null;
  /**
   * The description of the assistant. The maximum length is 512 characters.
   */
  description?: string | null;
  /**
   * The system instructions that the assistant uses. The maximum length is 32768 characters.
   */
  instructions?: string | null;
  /**
   * A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types code_interpreter, retrieval, or function.
   */
  tools?: any[];
  /**
   * A list of File IDs attached to this assistant. There can be a maximum of 20 files attached to the assistant. Files are ordered by their creation date in ascending order. If a file was previosuly attached to the list but does not show up in the list, it will be deleted from the assistant.
   */
  fileIds?: any[];
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
   */
  metadata?: any;
}

export interface ModifyAssistantResponse extends HttpProxyResponse {
  data: Assistant;
}

export const modifyAssistant =
  (self: OpenAI) =>
  async (props: ModifyAssistantProps): Promise<ModifyAssistantResponse> => {
    const {
      assistantId,
      model,
      name,
      description,
      instructions,
      tools,
      fileIds,
      metadata,
    } = props;

    return self.post({
      url: `/assistants/${assistantId}`,
      data: {
        model,
        name,
        description,
        instructions,
        tools,
        fileIds,
        metadata,
      },
    });
  };
