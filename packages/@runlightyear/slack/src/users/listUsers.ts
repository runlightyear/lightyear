import { HttpProxyResponse } from "@runlightyear/lightyear";
import { User } from "../types/User";
import { Slack } from "../Slack";

export interface ListUsersProps {
  /**
   * Paginate through collections of data by setting the cursor parameter to a next_cursor attribute returned by a previous request's response_metadata. Default value fetches the first "page" of the collection. See pagination for more detail.
   */
  cursor?: string;
  /**
   * Set this to true to receive the locale for users. Defaults to false
   */
  includeLocale?: boolean;
  /**
   * The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. Providing no limit value will result in Slack attempting to deliver you the entire result set. If the collection is too large you may experience limit_required or HTTP 500 errors.
   */
  limit?: number;
  /**
   * encoded team id to list users in, required if org token is used
   */
  teamId?: string;
}

export interface ListUsersResponse extends HttpProxyResponse {
  data: ListUsersResponseData;
}

export interface ListUsersResponseData {
  ok: true;
  members: Array<User>;
  cacheTs: number;
  responseMetadata: {
    nextCursor: string;
  };
}

export const listUsers =
  (self: Slack) =>
  async (props?: ListUsersProps): Promise<ListUsersResponse> => {
    const { cursor, includeLocale, limit, teamId } = props || {};

    return self.get({
      url: "users.list",
      params: {
        cursor,
        include_locale: includeLocale,
        limit,
        team_id: teamId,
      },
    });
  };
