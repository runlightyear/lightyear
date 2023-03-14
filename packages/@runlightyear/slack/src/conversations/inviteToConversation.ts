import { Slack } from "../Slack";

export interface InviteToConversationProps {
  /**
   * The ID of the public or private channel to invite user(s) to.
   *
   * Example
   *   C1234567890
   */
  channel: string;

  /**
   * A list of user IDs. Up to 1000 users may be listed.
   *
   * Example
   *   ["W1234567890", "U2345678901", "U3456789012"]
   */
  users: Array<string>;
}

export const inviteToConversation =
  (self: Slack) => async (props: InviteToConversationProps) => {
    const { channel, users } = props;

    return self.post({
      url: "conversations.invite",
      data: {
        channel,
        users: users.join(","),
      },
    });
  };
