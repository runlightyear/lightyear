import { Slack } from "../Slack";
import { User } from "../types/User";
import { HttpProxyResponse } from "@runlightyear/lightyear";

export interface LookupUserByEmailProps {
  /**
   * An email address belonging to a user in the workspace
   *
   *   Example
   *   spengler@ghostbusters.example.com
   */
  email: string;
}

export interface LookupUserByEmailResponse extends HttpProxyResponse {
  data: LookupUserByEmailResponseData;
}

export interface LookupUserByEmailResponseData {
  ok: true;
  user: User;
}

export const lookupUserByEmail =
  (self: Slack) =>
  async (props: LookupUserByEmailProps): Promise<LookupUserByEmailResponse> => {
    const { email } = props;

    return self.get({
      url: "users.lookupByEmail",
      params: {
        email,
      },
    });
  };
