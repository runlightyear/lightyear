import { Airtable } from "../Airtable";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { AirtableScope } from "../types/AirtableScope";

export interface WhoamiResponse extends HttpProxyResponse {
  data: {
    id: string;
    scopes?: Array<AirtableScope>;
  };
}

export const whoami = (self: Airtable) => async (): Promise<WhoamiResponse> => {
  return await self.get({ url: "/meta/whoami" });
};
