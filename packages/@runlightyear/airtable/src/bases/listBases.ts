import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Base } from "../types/Base";
import { Airtable } from "../Airtable";

export interface ListBasesProps {
  offset?: string;
}

export interface ListBasesResponseData {
  offset?: string;
  bases: Array<Base>;
}

export interface ListBasesResponse extends HttpProxyResponse {
  data: ListBasesResponseData;
}

export const listBases =
  (self: Airtable) =>
  async (props?: ListBasesProps): Promise<ListBasesResponse> => {
    const { offset } = props ?? {};

    return self.get({
      url: `/meta/bases`,
      params: {
        offset,
      },
    });
  };
