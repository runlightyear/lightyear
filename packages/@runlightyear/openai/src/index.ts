/* OpenAI */

import { OpenAI } from "./OpenAI";

/** Audio **/

export type {
  CreateTranscriptionProps,
  CreateTranscriptionResponse,
  CreateTranscriptionResponseData,
} from "./audio/createTranscription";

/** Chat **/

import type {
  CreateChatCompletionProps,
  CreateChatCompletionResponse,
} from "./chat/createChatCompletion";

/** Completion **/

import type {
  CreateCompletionProps,
  CreateCompletionResponse,
} from "./completions/createCompletion";

/** Images **/

import type {
  CreateImageProps,
  CreateImageResponse,
} from "./images/createImage";

/** Models **/

import type { ListModelsResponse } from "./models/listModels";

/** Types **/

import type { ChatMessage } from "./types/ChatMessage";

export { OpenAI };
export type {
  CreateChatCompletionProps,
  CreateChatCompletionResponse,
  CreateCompletionProps,
  CreateCompletionResponse,
  CreateImageProps,
  CreateImageResponse,
  ListModelsResponse,
  ChatMessage,
};
