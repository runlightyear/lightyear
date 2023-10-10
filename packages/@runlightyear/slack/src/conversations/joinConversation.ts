import { Slack } from "../Slack";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Channel } from "../types/Channel";

export interface JoinConversationProps {
  /**
   * ID of conversation to join
   *
   *   Example
   *   C1234567890
   */
  channel: string;
}

export interface JoinConversationResponse extends HttpProxyResponse {
  data: JoinConversationResponseData;
}

export interface JoinConversationResponseData {
  ok: true;
  channel: Channel;
  warning?: string;
  responseMetadata: {
    warnings?: Array<string>;
  };
}

export const joinConversation =
  (self: Slack) =>
  async (props: JoinConversationProps): Promise<JoinConversationResponse> => {
    const { channel } = props;

    return self.post({
      url: "conversations.join",
      data: {
        channel,
      },
    });
  };
