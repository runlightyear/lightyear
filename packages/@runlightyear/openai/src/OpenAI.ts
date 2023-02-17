import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";
import {
  createCompletion,
  CreateCompletionProps,
} from "./completions/createCompletion";

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
 * @example Crate an issue
 * ```typescript
 * await openAI.createCompletion({
 *   model: "gpt3",
 *   prompt: "I love AI because it"
 * });
 */
export class OpenAI extends RestConnector {
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

  async createCompletion(props: CreateCompletionProps) {
    return createCompletion(this)(props);
  }
}
