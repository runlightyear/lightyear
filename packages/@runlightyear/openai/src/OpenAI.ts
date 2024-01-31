import {
  AuthType,
  RestConnector,
  RestConnectorProps,
} from "@runlightyear/lightyear";
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
import {
  createAssistant,
  CreateAssistantProps,
} from "./assistants/createAssistant";
import {
  deleteAssistant,
  DeleteAssistantProps,
} from "./assistants/deleteAssistant";
import {
  listAssistants,
  ListAssistantsProps,
} from "./assistants/listAssistants";
import {
  modifyAssistant,
  ModifyAssistantProps,
} from "./assistants/modifyAssistant";
import {
  retrieveAssistant,
  RetrieveAssistantProps,
} from "./assistants/retrieveAssistant";
import { createMessage, CreateMessageProps } from "./messages/createMessage";
import {
  listMessageFiles,
  ListMessageFilesProps,
} from "./messages/listMessageFiles";
import { listMessages, ListMessagesProps } from "./messages/listMessages";
import { modifyMessage, ModifyMessageProps } from "./messages/modifyMessage";
import {
  retrieveMessage,
  RetrieveMessageProps,
} from "./messages/retrieveMessage";
import {
  retrieveMessageFile,
  RetrieveMessageFileProps,
} from "./messages/retrieveMessageFile";
import { createThread, CreateThreadProps } from "./threads/createThread";
import { deleteThread, DeleteThreadProps } from "./threads/deleteThread";
import { modifyThread, ModifyThreadProps } from "./threads/modifyThread";
import { retrieveThread, RetrieveThreadProps } from "./threads/retrieveThread";
import { cancelRun, CancelRunProps } from "./runs/cancelRun";
import { createRun, CreateRunProps } from "./runs/createRun";
import {
  createThreadAndRun,
  CreateThreadAndRunProps,
} from "./runs/createThreadAndRun";
import { listRuns, ListRunsProps } from "./runs/listRuns";
import { listRunSteps, ListRunStepsProps } from "./runs/listRunSteps";
import { modifyRun, ModifyRunProps } from "./runs/modifyRun";
import { retrieveRun, RetrieveRunProps } from "./runs/retrieveRun";
import { retrieveRunStep, RetrieveRunStepProps } from "./runs/retrieveRunStep";

export interface OpenAIProps extends RestConnectorProps {}

/**
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
  static authType: AuthType = "APIKEY";

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

    return {
      ...super.getDefaultHeaders(),
      Authorization: `Bearer ${apiKey}`,
      "OpenAI-Beta": "assistants=v1",
    };
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
   * @beta
   *
   * Create an assistant.
   *
   * @group Assistants
   */
  async createAssistant(props: CreateAssistantProps) {
    return createAssistant(this)(props);
  }

  /**
   * @beta
   *
   * Delete an assistant
   *
   * @group Assistants
   */
  async deleteAssistant(props: DeleteAssistantProps) {
    return deleteAssistant(this)(props);
  }

  /**
   * @beta
   *
   * List assistants
   *
   * @group Assistants
   */
  async listAssistants(props?: ListAssistantsProps) {
    return listAssistants(this)(props);
  }

  /**
   * @beta
   *
   * Modify an assistant
   *
   * @group Assistants
   */
  async modifyAssistant(props: ModifyAssistantProps) {
    return modifyAssistant(this)(props);
  }

  /**
   * @beta
   *
   * Retrieve an assistant
   *
   * @group Assistants
   */
  async retrieveAssistant(props: RetrieveAssistantProps) {
    return retrieveAssistant(this)(props);
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
   * @beta
   *
   * Create a message
   *
   * @group Messages
   */
  async createMessage(props: CreateMessageProps) {
    return createMessage(this)(props);
  }

  /**
   * @beta
   *
   * List message files
   *
   * @group Messages
   */
  async listMessageFiles(props: ListMessageFilesProps) {
    return listMessageFiles(this)(props);
  }

  /**
   * @beta
   *
   * List messages
   *
   * @group Messages
   */
  async listMessages(props: ListMessagesProps) {
    return listMessages(this)(props);
  }

  /**
   * @beta
   *
   * Modify a message
   *
   * @group Messages
   */
  async modifyMessage(props: ModifyMessageProps) {
    return modifyMessage(this)(props);
  }

  /**
   * @beta
   *
   * Retrieve a message
   *
   * @group Messages
   */
  async retrieveMessage(props: RetrieveMessageProps) {
    return retrieveMessage(this)(props);
  }

  /**
   * @beta
   *
   * Retrieve a message file
   *
   * @group Messages
   */
  async retrieveMessageFile(props: RetrieveMessageFileProps) {
    return retrieveMessageFile(this)(props);
  }

  /**
   * @beta
   *
   * Cancel a run
   *
   * @group Runs
   */
  async cancelRun(props: CancelRunProps) {
    return cancelRun(this)(props);
  }

  /**
   * @beta
   *
   * Create a run
   *
   * @group Runs
   */
  async createRun(props: CreateRunProps) {
    return createRun(this)(props);
  }

  /**
   * @beta
   *
   * Create a thread and run
   *
   * @group Runs
   */
  async createThreadAndRun(props: CreateThreadAndRunProps) {
    return createThreadAndRun(this)(props);
  }

  /**
   * @beta
   *
   * List runs
   *
   * @group Runs
   */
  async listRuns(props: ListRunsProps) {
    return listRuns(this)(props);
  }

  /**
   * @beta
   *
   * List run steps
   *
   * @group Runs
   */
  async listRunSteps(props: ListRunStepsProps) {
    return listRunSteps(this)(props);
  }

  /**
   * @beta
   *
   * Modify a run
   *
   * @group Runs
   */
  async modifyRun(props: ModifyRunProps) {
    return modifyRun(this)(props);
  }

  /**
   * @beta
   *
   * Retrieve a run
   *
   * @group Runs
   */
  async retrieveRun(props: RetrieveRunProps) {
    return retrieveRun(this)(props);
  }

  /**
   * @beta
   *
   * Retrieve a run step
   *
   * @group Runs
   */
  async retrieveRunStep(props: RetrieveRunStepProps) {
    return retrieveRunStep(this)(props);
  }

  /**
   * @beta
   *
   * Create a thread
   *
   * @group Threads
   */
  async createThread(props?: CreateThreadProps) {
    return createThread(this)(props);
  }

  /**
   * @beta
   *
   * Delete a thread
   *
   * @group Threads
   */
  async deleteThread(props: DeleteThreadProps) {
    return deleteThread(this)(props);
  }

  /**
   * @beta
   *
   * Modify a thread
   *
   * @group Threads
   */
  async modifyThread(props: ModifyThreadProps) {
    return modifyThread(this)(props);
  }

  /**
   * @beta
   *
   * Retrieve a thread
   *
   * @group Threads
   */
  async retrieveThread(props: RetrieveThreadProps) {
    return retrieveThread(this)(props);
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
