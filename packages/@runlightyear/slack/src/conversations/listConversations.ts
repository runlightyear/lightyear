import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Channel } from "../types/Channel";
import { Slack } from "../Slack";

export interface ListConversationsProps {
  /**
   * Paginate through collections of data by setting the cursor parameter to a next_cursor attribute returned by a previous request's response_metadata. Default value fetches the first "page" of the collection. See pagination for more detail.
   */
  cursor?: string;
  /**
   * Set to true to exclude archived channels from the list.
   */
  excludeArchived?: boolean;
  /**
   * The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer no larger than 1000.
   */
  limit?: number;
  /**
   * encoded team id to list channels in, required if token belongs to org-wide app
   */
  teamId?: string;
  /**
   * Mix and match channel types by providing a list of any combination of public_channel, private_channel, mpim, im
   */
  types?: Array<"public_channel" | "private_channel" | "mpim" | "im">;
}

export interface ListConversationsResponse extends HttpProxyResponse {
  data: ListConversationsResponseData;
}

export interface ListConversationsResponseData {
  ok: true;
  channels: Array<Channel>;
  responseMetadata: {
    nextCursor: string;
  };
}

export const listConversations =
  (self: Slack) =>
  async (
    props?: ListConversationsProps
  ): Promise<ListConversationsResponse> => {
    const { cursor, excludeArchived, limit, teamId, types } = props || {};

    return self.get({
      url: "conversations.list",
      params: {
        cursor,
        exclude_archived: excludeArchived,
        limit,
        team_id: teamId,
        types: types?.join(","),
      },
    });
  };
