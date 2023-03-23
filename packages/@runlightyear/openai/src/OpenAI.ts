import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";
import {
  createCompletion,
  CreateCompletionProps,
} from "./completions/createCompletion";
import {
  createChatCompletion,
  CreateChatCompletionProps,
} from "./chat/createChatCompletion";
import { createImage, CreateImageProps } from "./images/createImage";
import { listModels } from "./models/listModels";

/**
 * @beta
 */
export interface OpenAIProps extends AuthConnectorProps {}

/**
 * @beta
 *
 * Connector to the OpenAI API
 *
 * @example Import
 * ```typescript
 * import { OpenAI } from "@runlightyear/openAI"
 * ```
 *
 * @example Use in an action
 * ```typescript
 * defineAction({
 *   name: "openAIExample",
 *   title: "OpenAI Example"
 *   apps: ["openai"],
 *   run: async ({ auths }) => {
 *     const openai = new OpenAI({ auth: auths.openai });
 *   }
 * }
 * ```
 *
 * @example Create a completion
 * ```typescript
 * await openAI.createCompletion({
 *   model: "gpt3",
 *   prompt: "I love AI because it"
 * });
 */
export class OpenAI extends RestConnector {
  /**
   * @example
   * ```typescript
   * defineAction({
   *   name: "openAIExample",
   *   title: "OpenAI Example"
   *   apps: ["openai"],
   *   run: async ({ auths }) => {
   *     const openai = new OpenAI({ auth: auths.openai });
   *   }
   * }
   * ```
   *
   * @param props
   */
  constructor(props: OpenAIProps) {
    super({ ...props, baseUrl: "https://api.openai.com/v1" });
  }

  authorizationHeaders(): { [p: string]: string } {
    const { apiKey } = this.getAuthData();

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };
  }

  /**
   * List and describe the various models available in the API. You can refer to the Models documentation to understand what models are available and the differences between them.
   *
   * @param props
   */
  async listModels() {
    return listModels(this)();
  }

  /**
   * Given a chat conversation, the model will return a chat completion response.
   *
   * @param props
   */
  async createChatCompletion(props: CreateChatCompletionProps) {
    return createChatCompletion(this)(props);
  }

  /**
   * Given a prompt, the model will return one or more predicted completions, and can also return the probabilities of alternative tokens at each position.
   *
   * @param props
   */
  async createCompletion(props: CreateCompletionProps) {
    return createCompletion(this)(props);
  }

  /**
   * Given a prompt and/or an input image, the model will generate a new image.
   *
   * @param props
   */
  async createImage(props: CreateImageProps) {
    return createImage(this)(props);
  }
}
