import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";
import { Model } from "../types/Model";

export interface ListModelsResponseData {
  object: "list";
  data: Array<Model>;
}

export interface ListModelsResponse extends HttpProxyResponse {
  data: ListModelsResponseData;
}

export const listModels =
  (self: OpenAI) => async (): Promise<ListModelsResponse> => {
    return self.get({
      url: "/models",
    });
  };
