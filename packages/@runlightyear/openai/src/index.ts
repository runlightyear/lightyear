/* OpenAI */
import { OpenAI } from "./OpenAI";

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

export { OpenAI };
export type {
  CreateChatCompletionProps,
  CreateChatCompletionResponse,
  CreateCompletionProps,
  CreateCompletionResponse,
  CreateImageProps,
  CreateImageResponse,
};
