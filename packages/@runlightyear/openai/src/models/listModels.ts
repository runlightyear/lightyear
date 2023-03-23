import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface ListModelsResponse extends HttpProxyResponse {
  data: {
    object: "list";
    data: Array<{
      id: string;
      object: "model";
      ownedBy: string;
      permission: unknown;
    }>;
  };
}

export const listModels =
  (self: OpenAI) => async (): Promise<ListModelsResponse> => {
    return self.get({
      url: "/models",
    });
  };
