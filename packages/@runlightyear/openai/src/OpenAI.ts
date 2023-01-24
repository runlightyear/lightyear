import { AuthConnectorOptions, RestConnector } from "@runlightyear/lightyear";
import {
  createCompletion,
  CreateCompletionProps,
} from "./completions/createCompletion";

export interface OpenAIProps extends AuthConnectorOptions {}

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
