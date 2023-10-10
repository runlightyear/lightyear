import { Slack } from "../Slack";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { User } from "../types/User";

export interface GetUserProps {
  /**
   * User to get info on
   *
   *   Example
   *   W1234567890
   */
  user: string;

  /**
   * Set this to true to receive the locale for this user. Defaults to false
   */
  includeLocale?: boolean;
}

export interface GetUserResponse extends HttpProxyResponse {
  data: GetUserResponseData;
}

export interface GetUserResponseData {
  ok: true;
  user: User;
}

export const getUser =
  (self: Slack) =>
  async (props: GetUserProps): Promise<GetUserResponse> => {
    const { user, includeLocale } = props;

    return self.get({
      url: "users.info",
      params: {
        user,
        include_locale: includeLocale,
      },
    });
  };
