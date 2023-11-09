import { RestConnector, RestConnectorProps } from "@runlightyear/lightyear";
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
export interface OpenAIProps extends RestConnectorProps {}

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
 * @example List models
 * ```typescript
 * const result = await openai.listModels();
 * const models = result.data.data;
 * console.log("Model ids: ", models.map((model) => model.id).join(", "));
 * ```
 *
 *
 * @example Create a completion
 * ```typescript
 * const result = await openai.createCompletion({
 *   model: "text-davinci-003",
 *   prompt: "Say this is a test",
 *   maxTokens: 7,
 *   temperature: 0,
 * });
 * const choice = result.data.choices[0];
 * const completion = choice.text;
 * console.log("Completion: ", completion);
 * ```
 *
 * @example Create a chat completion
 * ```typescript
 * const result = await openai.createChatCompletion({
 *   model: "gpt-3.5-turbo",
 *   messages: [
 *     {
 *       role: "system",
 *       content: "You are a helpful assistant.",
 *     },
 *     {
 *       role: "user",
 *       content: "Hello!",
 *     },
 *   ],
 * });
 * const choice = result.data.choices[0];
 * const completion = choice.message.content;
 * console.log("Completion: ", completion);
 * ```
 *
 * @example Create an image
 * ```typescript
 * const result = await openai.createImage({
 *   prompt: "A cute baby sea otter",
 *   n: 2,
 *   size: "1024x1024",
 * });
 * const images = result.data.data;
 * console.log("Url: ", images[0].url);
 * ```
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
    super(props);
  }

  getBaseUrl(): string {
    return "https://api.openai.com/v1";
  }

  getDefaultHeaders() {
    const { apiKey } = this.getAuthData();

    return { ...super.getDefaultHeaders(), Authorization: `Bearer ${apiKey}` };
  }

  /**
   * List and describe the various models available in the API. You can refer to the Models documentation to understand what models are available and the differences between them.
   *
   * @group Models
   *
   * @example List models
   * ```typescript
   * const result = await openai.listModels();
   * const models = result.data.data;
   * console.log("Model ids: ", models.map((model) => model.id).join(", "));
   * ```
   */
  async listModels() {
    return listModels(this)();
  }

  /**
   * Given a chat conversation, the model will return a chat completion response.
   *
   * @group Chat
   *
   * @example Create a chat completion
   * ```typescript
   * const result = await openai.createChatCompletion({
   *   model: "gpt-3.5-turbo",
   *   messages: [
   *     {
   *       role: "system",
   *       content: "You are a helpful assistant.",
   *     },
   *     {
   *       role: "user",
   *       content: "Hello!",
   *     },
   *   ],
   * });
   * const choice = result.data.choices[0];
   * const completion = choice.message.content;
   * console.log("Completion: ", completion);
   * ```
   *
   * @param props
   */
  async createChatCompletion(props: CreateChatCompletionProps) {
    return createChatCompletion(this)(props);
  }

  /**
   * Given a prompt, the model will return one or more predicted completions, and can also return the probabilities of alternative tokens at each position.
   *
   * @group Completions
   *
   * @example Create a completion
   * ```typescript
   * const result = await openai.createCompletion({
   *   model: "text-davinci-003",
   *   prompt: "Say this is a test",
   *   maxTokens: 7,
   *   temperature: 0,
   * });
   * const choice = result.data.choices[0];
   * const completion = choice.text;
   * console.log("Completion: ", completion);
   * ```
   *
   * @param props
   */
  async createCompletion(props: CreateCompletionProps) {
    return createCompletion(this)(props);
  }

  /**
   * Given a prompt and/or an input image, the model will generate a new image.
   *
   * @group Images
   *
   * @example Create an image
   * ```typescript
   * const result = await openai.createImage({
   *   prompt: "A cute baby sea otter",
   *   n: 2,
   *   size: "1024x1024",
   * });
   * const images = result.data.data;
   * console.log("Url: ", images[0].url);
   * ```
   *
   * @param props
   */
  async createImage(props: CreateImageProps) {
    return createImage(this)(props);
  }

  /**
   * Transcribes audio into the input language.
   *
   * @group Audio
   */
  // async createTranscription(props: CreateTranscriptionProps) {
  //   return createTranscription(this)(props);
  // }
}
