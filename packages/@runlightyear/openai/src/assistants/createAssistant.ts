/**
 * Create assistantBeta
 * POST
 *
 * https://api.openai.com/v1/assistants
 *
 * Create an assistant with a model and instructions.
 *
 * Request body
 * model
 * Required
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
 * A list of file IDs attached to this assistant. There can be a maximum of 20 files attached to the assistant. Files are ordered by their creation date in ascending order.
 *
 * metadata
 * map
 * Optional
 * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
 *
 * Returns
 * An assistant object.
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
 *   const myAssistant = await openai.beta.assistants.create({
 *     instructions:
 *       "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
 *     name: "Math Tutor",
 *     tools: [{ type: "code_interpreter" }],
 *     model: "gpt-4",
 *   });
 *
 *   console.log(myAssistant);
 * }
 *
 * main();
 * Response
 * {
 *   "id": "asst_abc123",
 *   "object": "assistant",
 *   "created_at": 1698984975,
 *   "name": "Math Tutor",
 *   "description": null,
 *   "model": "gpt-4",
 *   "instructions": "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
 *   "tools": [
 *     {
 *       "type": "code_interpreter"
 *     }
 *   ],
 *   "file_ids": [],
 *   "metadata": {}
 * }
 */
import { Tool } from "../types/Tool";
import { Assistant } from "../types/Assistant";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface CreateAssistantProps {
  /**
   * ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them.
   */
  model: string;
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
  tools?: Array<Tool>;
  /**
   * A list of file IDs attached to this assistant. There can be a maximum of 20 files attached to the assistant. Files are ordered by their creation date in ascending order.
   */
  fileIds?: Array<string>;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
   */
  metadata?: object;
}

export interface CreateAssistantResponse extends HttpProxyResponse {
  data: Assistant;
}

export const createAssistant =
  (self: OpenAI) =>
  async (props: CreateAssistantProps): Promise<CreateAssistantResponse> => {
    const { model, name, description, instructions, tools, fileIds, metadata } =
      props;

    return self.post({
      url: "/assistants",
      data: {
        model,
        name,
        description,
        instructions,
        tools,
        file_ids: fileIds,
        metadata,
      },
    });
  };
