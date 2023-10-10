/**
 * channel
 * ·Required
 * ID of conversation to remove user from.
 *
 * Example
 * C1234567890
 * user
 * ·Required
 * User ID to be removed.
 *
 * Example
 * W1234567890
 */
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Slack } from "../Slack";

export interface KickFromConversationProps {
  /**
   * ID of conversation to remove user from.
   *
   * Example
   * C1234567890
   */
  channel: string;
  /**
   * User ID to be removed.
   *
   * Example
   * W1234567890
   */
  user: string;
}

export interface KickFromConversationResponse extends HttpProxyResponse {
  data: {
    ok: true;
  };
}

export const kickFromConversation =
  (self: Slack) =>
  async (
    props: KickFromConversationProps
  ): Promise<KickFromConversationResponse> => {
    const { channel, user } = props;

    return self.post({
      url: "conversations.kick",
      data: {
        channel,
        user,
      },
    });
  };
