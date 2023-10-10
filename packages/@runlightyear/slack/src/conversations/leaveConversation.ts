import { Slack } from "../Slack";
import { HttpProxyResponse } from "@runlightyear/lightyear";

export interface LeaveConversationProps {
  /**
   * ID of conversation to leave
   *
   *   Example
   *   C1234567890
   */
  channel: string;
}

export interface LeaveConversationResponse extends HttpProxyResponse {
  data: {
    ok: boolean;
    notInChannel?: boolean;
    error?: string;
  };
}

export const leaveConversation =
  (self: Slack) =>
  async (props: LeaveConversationProps): Promise<LeaveConversationResponse> => {
    const { channel } = props;

    return self.post({
      url: "conversations.leave",
      data: {
        channel,
      },
    });
  };
